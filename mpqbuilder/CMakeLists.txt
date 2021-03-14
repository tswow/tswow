cmake_minimum_required(VERSION 3.3)
project(mpqbuilder)
FIND_PACKAGE( Boost 1.60 COMPONENTS filesystem REQUIRED )
FIND_PACKAGE(ZLIB)
FIND_PACKAGE(BZip2)

add_executable(mpqbuilder mpqbuilder.cpp)
add_executable(luaxmlreader luaxmlreader.cpp)

TARGET_LINK_LIBRARIES (mpqbuilder
  Boost::filesystem
  ZLIB::ZLIB
  ${BZIP2_LIBRARIES}
  ${STORM_LIB}
)

TARGET_LINK_LIBRARIES (luaxmlreader
  Boost::filesystem
  ZLIB::ZLIB
  ${BZIP2_LIBRARIES}
  ${STORM_LIB}
)

TARGET_INCLUDE_DIRECTORIES(mpqbuilder PRIVATE
  ${STORM_INCLUDE}
  ${Boost_INCLUDE_DIRS}
)

TARGET_INCLUDE_DIRECTORIES(luaxmlreader PRIVATE
  ${STORM_INCLUDE}
  ${Boost_INCLUDE_DIRS}
)