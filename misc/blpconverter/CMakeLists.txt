cmake_minimum_required (VERSION 2.8.11)
project (BLPConverter)
file(GLOB_RECURSE sources *.cpp *.hpp *.c *.h)
add_executable (blpconverter main.cpp ${sources})
set_target_properties(blpconverter PROPERTIES CXX_STANDARD 17)
target_include_directories(blpconverter PUBLIC
	blp2png
	png2blp
	include/libimagequant
	include/libpng
	include/libtxc_dxtn
	include/pngpp
	include/zlib
	include/thread_pool
)

if(UNIX)
	set(THREADS_PREFER_PTHREAD_FLAG ON)
	find_package(Threads REQUIRED)
	target_link_libraries(blpconverter PRIVATE Threads::Threads)
endif()