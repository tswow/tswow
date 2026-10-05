cmake_minimum_required (VERSION 3.22)
set(CMAKE_POLICY_VERSION_MINIMUM 3.5 CACHE STRING "" FORCE)
project (BLPConverter)
file(GLOB_RECURSE sources *.cpp *.hpp *.c *.h)
add_executable (blpconverter main.cpp ${sources})
set_target_properties(blpconverter PROPERTIES CXX_STANDARD 17)
# Bundled zlib/libpng/libimagequant use K&R-style declarations and POSIX
# functions without including <unistd.h>. GCC 16 / C23 rejects both as
# errors. Pin them to gnu89 + downgrade implicit-decl + define
# Z_HAVE_UNISTD_H so zlib pulls in unistd.h.
set_source_files_properties(${sources} PROPERTIES LANGUAGE_DEPENDENT_COMPILE_DEFINITIONS "")
target_compile_definitions(blpconverter PRIVATE Z_HAVE_UNISTD_H=1 _LARGEFILE64_SOURCE=1)
target_compile_options(blpconverter PRIVATE
	$<$<COMPILE_LANGUAGE:C>:-std=gnu11>
	$<$<COMPILE_LANGUAGE:C>:-Wno-implicit-function-declaration>
	$<$<COMPILE_LANGUAGE:C>:-Wno-implicit-int>
	$<$<COMPILE_LANGUAGE:C>:-Wno-old-style-definition>
)
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
