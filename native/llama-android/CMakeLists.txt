cmake_minimum_required(VERSION 3.22.1)
project(vidyabot-llama)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Build llama.cpp as static library
set(LLAMA_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_SERVER OFF CACHE BOOL "" FORCE)
set(BUILD_SHARED_LIBS OFF CACHE BOOL "" FORCE)

add_subdirectory(llama.cpp)

# Our JNI bridge
add_library(
    vidyabot-llama
    SHARED
    src/llama_jni.cpp
)

target_include_directories(vidyabot-llama PRIVATE
    llama.cpp
    llama.cpp/common
    llama.cpp/include
    llama.cpp/ggml/include
)

target_link_libraries(vidyabot-llama
    llama
    ggml
    android
    log
)
