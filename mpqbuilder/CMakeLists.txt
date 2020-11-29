cmake_minimum_required(VERSION 3.3)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
project(mpqbuilder)
SET(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake/")
FIND_PACKAGE( StormLib REQUIRED )

add_executable(mpqbuilder mpqbuilder.cpp)
add_executable(luaxmlreader luaxmlreader.cpp)

TARGET_LINK_LIBRARIES (mpqbuilder
  StormLib
)

TARGET_LINK_LIBRARIES (luaxmlreader
  StormLib
)