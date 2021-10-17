# project
cmake_minimum_required(VERSION 3.12)
Include(FetchContent)
set(CMAKE_GENERATOR_PLATFORM Win32)
cmake_policy(SET CMP0048 NEW)

project(ClientExtensions)

# lua

FILE(GLOB lua-sources lua-5.1/src/*.h lua-5.1/src/*.c)
add_library(lua STATIC ${lua-sources})
target_compile_options(lua PRIVATE -w)

add_subdirectory(messages)
add_subdirectory(messages-lua)
add_subdirectory(tests)
add_subdirectory(ClientExtensions)