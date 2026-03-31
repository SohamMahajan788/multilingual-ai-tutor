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
    cp.n_ctx = 4096;
    cp.n_threads = 8;
    cp.n_threads_batch = 8;

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
    LOGI("Starting generation, max_tokens=%d", (int)max_tokens);
    g_stop.store(false);

    const llama_vocab* vocab = llama_model_get_vocab(g_model);

    // Tokenize prompt
    int n = -llama_tokenize(vocab, prompt, strlen(prompt), nullptr, 0, true, false);
    std::vector<llama_token> tokens(n);
    llama_tokenize(vocab, prompt, strlen(prompt), tokens.data(), n, true, false);
    env->ReleaseStringUTFChars(prompt_j, prompt);
    LOGI("Tokenized: %d tokens", n);

    // Evaluate prompt
    llama_batch batch = llama_batch_get_one(tokens.data(), n);
    if (llama_decode(g_ctx, batch)) {
        LOGE("Prompt decode failed");
        return env->NewStringUTF("Error: decode failed");
    }

    // Sampler with temperature to avoid loops
    llama_sampler* sampler = llama_sampler_chain_init(llama_sampler_chain_default_params());
    llama_sampler_chain_add(sampler, llama_sampler_init_top_k(40));
    llama_sampler_chain_add(sampler, llama_sampler_init_top_p(0.9f, 1));
    llama_sampler_chain_add(sampler, llama_sampler_init_temp(0.7f));
    llama_sampler_chain_add(sampler, llama_sampler_init_dist(42));

    LOGI("Generating...");

    std::string result;
    llama_token eos = llama_vocab_eos(vocab);

    // Find <|im_end|> token
    llama_token im_end_token = -1;
    {
        std::vector<llama_token> tmp(8);
        const char* im_end = "<|im_end|>";
        int nt = llama_tokenize(vocab, im_end, strlen(im_end), tmp.data(), 8, false, true);
        if (nt > 0) im_end_token = tmp[0];
    }

    for (int i = 0; i < max_tokens && !g_stop.load(); i++) {
        llama_token token = llama_sampler_sample(sampler, g_ctx, -1);

        if (token == eos || token == im_end_token) {
            LOGI("Stop token at step %d", i);
            break;
        }

        char buf[256] = {};
        int nb = llama_token_to_piece(vocab, token, buf, sizeof(buf), 0, false);
        if (nb > 0) result.append(buf, nb);

        if (i % 10 == 0) LOGI("Step %d: %s", i, result.c_str());

        llama_batch next = llama_batch_get_one(&token, 1);
        if (llama_decode(g_ctx, next)) break;
    }

    llama_sampler_free(sampler);
    LOGI("Generation complete: %d chars", (int)result.size());
    return env->NewStringUTF(result.c_str());
}

} // extern "C"