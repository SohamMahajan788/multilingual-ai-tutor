cmake_minimum_required(VERSION 3.22.1)
project(vidyabot-llama)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(LLAMA_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_SERVER OFF CACHE BOOL "" FORCE)
set(BUILD_SHARED_LIBS OFF CACHE BOOL "" FORCE)

if(ANDROID_ABI STREQUAL "arm64-v8a")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -march=armv8.2-a+fp16+dotprod")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O3 -march=armv8.2-a+fp16+dotprod")
endif()

add_subdirectory(llama.cpp)

add_library(vidyabot-llama SHARED src/llama_jni.cpp)

target_include_directories(vidyabot-llama PRIVATE
    llama.cpp/include
    llama.cpp/ggml/include
)

target_link_libraries(vidyabot-llama
    llama
    android
    log
)