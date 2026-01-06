cmake_minimum_required(VERSION 3.22)
include(FetchContent)

project(BLPConverter)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

FetchContent_Declare(
    zlib
    URL file://${CMAKE_SOURCE_DIR}/deps/zlib-1.3.1.tar.xz
    DOWNLOAD_EXTRACT_TIMESTAMP TRUE
)
set(ZLIB_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(zlib)

FetchContent_Declare(
    libpng
    URL file://${CMAKE_SOURCE_DIR}/deps/libpng-1.6.50.tar.xz
    DOWNLOAD_EXTRACT_TIMESTAMP TRUE
)
set(PNG_TOOLS OFF CACHE BOOL "" FORCE)
set(PNG_TESTS OFF CACHE BOOL "" FORCE)
set(PNG_SHARED OFF CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(libpng)

file(GLOB_RECURSE LIBIMAGEQUANT_SOURCES
    include/libimagequant/*.c
    include/libimagequant/*.cpp
)
add_library(libimagequant STATIC ${LIBIMAGEQUANT_SOURCES})
target_include_directories(libimagequant PUBLIC include/libimagequant)

file(GLOB_RECURSE LIBTXC_DXTN_SOURCES
    include/libtxc_dxtn/*.c
    include/libtxc_dxtn/*.cpp
)
add_library(libtxc_dxtn STATIC ${LIBTXC_DXTN_SOURCES})
target_include_directories(libtxc_dxtn PUBLIC include/libtxc_dxtn)

file(GLOB_RECURSE SOURCES
    blp2png/*.cpp
    png2blp/*.cpp
    main.cpp
)

add_executable(blpconverter ${SOURCES})

target_include_directories(blpconverter PRIVATE
    blp2png
    png2blp
    include/libimagequant
    include/libtxc_dxtn
    include/pngpp
    include/thread_pool
)

target_link_libraries(blpconverter PRIVATE
    zlibstatic
    png_static
    libimagequant
    libtxc_dxtn
)

if(UNIX)
    set(THREADS_PREFER_PTHREAD_FLAG ON)
    find_package(Threads REQUIRED)
    target_link_libraries(blpconverter PRIVATE Threads::Threads)
endif()
