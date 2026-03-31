#include <jni.h>
#include <string>
#include <vector>
#include <atomic>
#include <android/log.h>
#include "llama.h"
#include "ggml.h"

#define TAG "VidyaBotLlama"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

static llama_model* g_model = nullptr;
static llama_context* g_ctx = nullptr;
static std::atomic<bool> g_stop{false};

static void llama_log_callback(ggml_log_level level, const char* text, void*) {
    if (level == GGML_LOG_LEVEL_ERROR) {
        LOGE("llama.cpp: %s", text);
    } else {
        LOGI("llama.cpp: %s", text);
    }
}

extern "C" {

JNIEXPORT jboolean JNICALL
Java_com_vidyabot_llama_LlamaModule_loadModel(
    JNIEnv* env, jobject, jstring model_path_j
) {
    const char* path = env->GetStringUTFChars(model_path_j, nullptr);
    LOGI("Loading model from: %s", path);

    llama_backend_init();
    llama_log_set(llama_log_callback, nullptr);

    llama_model_params mp = llama_model_default_params();
    mp.n_gpu_layers = 0;

    g_model = llama_model_load_from_file(path, mp);
    env->ReleaseStringUTFChars(model_path_j, path);

    if (!g_model) {
        LOGE("Failed to load model");
        return JNI_FALSE;
    }

    llama_context_params cp = llama_context_default_params();
    cp.n_ctx = 512;
    cp.n_threads = 2;
    cp.n_threads_batch = 2;

    g_ctx = llama_init_from_model(g_model, cp);

    if (!g_ctx) {
        LOGE("Failed to create context");
        llama_model_free(g_model);
        g_model = nullptr;
        return JNI_FALSE;
    }

    LOGI("Model loaded successfully");
    return JNI_TRUE;
}

JNIEXPORT void JNICALL
Java_com_vidyabot_llama_LlamaModule_unloadModel(JNIEnv*, jobject) {
    if (g_ctx) { llama_free(g_ctx); g_ctx = nullptr; }
    if (g_model) { llama_model_free(g_model); g_model = nullptr; }
    llama_backend_free();
    LOGI("Model unloaded");
}

JNIEXPORT void JNICALL
Java_com_vidyabot_llama_LlamaModule_stopGeneration(JNIEnv*, jobject) {
    g_stop.store(true);
}

JNIEXPORT jboolean JNICALL
Java_com_vidyabot_llama_LlamaModule_isModelLoaded(JNIEnv*, jobject) {
    return (g_model && g_ctx) ? JNI_TRUE : JNI_FALSE;
}

JNIEXPORT jstring JNICALL
Java_com_vidyabot_llama_LlamaModule_generate(
    JNIEnv* env, jobject, jstring prompt_j, jint max_tokens
) {
    if (!g_model || !g_ctx) {
        return env->NewStringUTF("Error: model not loaded");
    }

    const char* prompt = env->GetStringUTFChars(prompt_j, nullptr);
    g_stop.store(false);

    const llama_vocab* vocab = llama_model_get_vocab(g_model);

    int n = -llama_tokenize(vocab, prompt, strlen(prompt), nullptr, 0, true, false);
    std::vector<llama_token> tokens(n);
    llama_tokenize(vocab, prompt, strlen(prompt), tokens.data(), n, true, false);
    env->ReleaseStringUTFChars(prompt_j, prompt);

    llama_batch batch = llama_batch_get_one(tokens.data(), n);
    if (llama_decode(g_ctx, batch)) {
        return env->NewStringUTF("Error: decode failed");
    }

    std::string result;
    llama_token eos = llama_vocab_eos(vocab);
    int n_vocab = llama_vocab_n_tokens(vocab);

    for (int i = 0; i < max_tokens && !g_stop.load(); i++) {
        float* logits = llama_get_logits_ith(g_ctx, -1);
        llama_token best = 0;
        float best_val = logits[0];
        for (int j = 1; j < n_vocab; j++) {
            if (logits[j] > best_val) {
                best_val = logits[j];
                best = j;
            }
        }

        if (best == eos) break;

        char buf[256] = {};
        int nb = llama_token_to_piece(vocab, best, buf, sizeof(buf), 0, false);
        if (nb > 0) result.append(buf, nb);

        llama_batch next = llama_batch_get_one(&best, 1);
        if (llama_decode(g_ctx, next)) break;
    }

    return env->NewStringUTF(result.c_str());
}

} // extern "C"