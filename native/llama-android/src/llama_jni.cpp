#include <jni.h>
#include <string>
#include <vector>
#include <thread>
#include <atomic>
#include <android/log.h>
#include "llama.h"

#define TAG "VidyaBotLlama"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

static llama_model* g_model = nullptr;
static llama_context* g_ctx = nullptr;
static std::atomic<bool> g_stop_generation{false};

extern "C" {

JNIEXPORT jboolean JNICALL
Java_com_vidyabot_llama_LlamaModule_loadModel(
    JNIEnv* env,
    jobject /* this */,
    jstring model_path
) {
    const char* path = env->GetStringUTFChars(model_path, nullptr);
    LOGI("Loading model from: %s", path);

    llama_backend_init();

    llama_model_params model_params = llama_model_default_params();
    model_params.n_gpu_layers = 0;

    g_model = llama_model_load_from_file(path, model_params);
    env->ReleaseStringUTFChars(model_path, path);

    if (g_model == nullptr) {
        LOGE("Failed to load model");
        return JNI_FALSE;
    }

    llama_context_params ctx_params = llama_context_default_params();
    ctx_params.n_ctx = 2048;
    ctx_params.n_threads = 4;
    ctx_params.n_threads_batch = 4;

    g_ctx = llama_init_from_model(g_model, ctx_params);
    if (g_ctx == nullptr) {
        LOGE("Failed to create context");
        llama_model_free(g_model);
        g_model = nullptr;
        return JNI_FALSE;
    }

    LOGI("Model loaded successfully");
    return JNI_TRUE;
}

JNIEXPORT void JNICALL
Java_com_vidyabot_llama_LlamaModule_unloadModel(
    JNIEnv* /* env */,
    jobject /* this */
) {
    if (g_ctx) {
        llama_free(g_ctx);
        g_ctx = nullptr;
    }
    if (g_model) {
        llama_model_free(g_model);
        g_model = nullptr;
    }
    llama_backend_free();
    LOGI("Model unloaded");
}

JNIEXPORT void JNICALL
Java_com_vidyabot_llama_LlamaModule_stopGeneration(
    JNIEnv* /* env */,
    jobject /* this */
) {
    g_stop_generation.store(true);
}

JNIEXPORT jstring JNICALL
Java_com_vidyabot_llama_LlamaModule_generate(
    JNIEnv* env,
    jobject /* this */,
    jstring prompt_str,
    jint max_tokens
) {
    if (!g_model || !g_ctx) {
        return env->NewStringUTF("Error: Model not loaded");
    }

    const char* prompt = env->GetStringUTFChars(prompt_str, nullptr);
    g_stop_generation.store(false);

    // Tokenize
    std::vector<llama_token> tokens(2048);
    const llama_vocab* vocab = llama_model_get_vocab(g_model);
    int n_tokens = llama_tokenize(
        vocab, prompt, strlen(prompt),
        tokens.data(), tokens.size(), true, false
    );
    env->ReleaseStringUTFChars(prompt_str, prompt);

    if (n_tokens < 0) {
        return env->NewStringUTF("Error: Tokenization failed");
    }
    tokens.resize(n_tokens);

    // Create batch
    llama_batch batch = llama_batch_get_one(tokens.data(), tokens.size());
    if (llama_decode(g_ctx, batch) != 0) {
        return env->NewStringUTF("Error: Decode failed");
    }

    // Generate
    std::string result;
    for (int i = 0; i < max_tokens && !g_stop_generation.load(); i++) {
        llama_token new_token = llama_sampler_sample(
            llama_sampler_chain_init(llama_sampler_chain_default_params()),
            g_ctx, -1
        );

        if (llama_vocab_is_eog(vocab, new_token)) break;

        char buf[256];
        int n = llama_token_to_piece(vocab, new_token, buf, sizeof(buf), 0, false);
        if (n > 0) {
            result.append(buf, n);
        }

        llama_batch next = llama_batch_get_one(&new_token, 1);
        if (llama_decode(g_ctx, next) != 0) break;
    }

    return env->NewStringUTF(result.c_str());
}

JNIEXPORT jboolean JNICALL
Java_com_vidyabot_llama_LlamaModule_isModelLoaded(
    JNIEnv* /* env */,
    jobject /* this */
) {
    return (g_model != nullptr && g_ctx != nullptr) ? JNI_TRUE : JNI_FALSE;
}

} // extern "C"
