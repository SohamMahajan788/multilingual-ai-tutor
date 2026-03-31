cmake_minimum_required(VERSION 3.22.1)
project(vidyabot-llama)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(LLAMA_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(LLAMA_BUILD_SERVER OFF CACHE BOOL "" FORCE)
set(BUILD_SHARED_LIBS OFF CACHE BOOL "" FORCE)

add_subdirectory(llama.cpp)

add_library(vidyabot-llama SHARED src/llama_jni.cpp)

# Detect which API version llama.cpp has
include(CheckCXXSourceCompiles)
set(CMAKE_REQUIRED_INCLUDES ${CMAKE_CURRENT_SOURCE_DIR}/llama.cpp/include)
check_cxx_source_compiles("
#include \"llama.h\"
int main() { llama_model_load_from_file(nullptr, llama_model_default_params()); return 0; }
" LLAMA_HAS_NEW_API)

if(LLAMA_HAS_NEW_API)
    target_compile_definitions(vidyabot-llama PRIVATE LLAMA_API_NEW)
    message(STATUS "Using new llama.cpp API")
else()
    message(STATUS "Using old llama.cpp API")
endif()

target_include_directories(vidyabot-llama PRIVATE
    llama.cpp/include
    llama.cpp/ggml/include
)

target_link_libraries(vidyabot-llama
    llama
    android
    log
)