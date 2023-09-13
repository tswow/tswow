cmake_minimum_required(VERSION 3.12)
project(mpqbuilder)
set(Boost_USE_STATIC_LIBS ON)
find_package(
  Boost 1.71
  COMPONENTS filesystem
  REQUIRED)
add_executable(mpqbuilder mpqbuilder.cpp)
add_executable(luaxmlreader luaxmlreader.cpp)

include(FetchContent)
FetchContent_Declare(
  storm
  GIT_REPOSITORY https://github.com/ladislav-zezula/StormLib.git
  GIT_TAG v9.25)
FetchContent_GetProperties(storm)
if(NOT storm_POPULATED)
  message(STATUS "Installing StormLib...")
  FetchContent_Populate(storm)
endif()
add_subdirectory(${storm_SOURCE_DIR} ${storm_BINARY_DIR} EXCLUDE_FROM_ALL)
set(storm_warning_disable_flags "")
target_link_libraries(mpqbuilder Boost::filesystem storm)
target_link_libraries(luaxmlreader Boost::filesystem storm)
