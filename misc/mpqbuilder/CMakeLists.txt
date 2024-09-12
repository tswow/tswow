cmake_minimum_required(VERSION 3.22)
project(mpqbuilder)
set( Boost_USE_STATIC_LIBS ON )
FIND_PACKAGE( Boost 1.60 COMPONENTS filesystem REQUIRED )
add_executable(mpqbuilder mpqbuilder.cpp)
add_executable(luaxmlreader luaxmlreader.cpp)

include (FetchContent)
FetchContent_Declare(
  storm
  GIT_REPOSITORY https://github.com/ladislav-zezula/StormLib.git
  GIT_TAG 60c2dd0fa16d3506722e25fee9b6fa4082b0c1e5
)
FetchContent_GetProperties (storm)
if (NOT storm_POPULATED)
  message (STATUS "Installing StormLib...")
  FetchContent_Populate (storm)
endif()
add_subdirectory (${storm_SOURCE_DIR} ${storm_BINARY_DIR} EXCLUDE_FROM_ALL)
set (storm_warning_disable_flags "")
TARGET_LINK_LIBRARIES(mpqbuilder
  Boost::filesystem
  storm
)
TARGET_LINK_LIBRARIES(luaxmlreader
  Boost::filesystem
  storm
)
