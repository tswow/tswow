# Synthetic Boost::system / boost_system target for distros that ship Boost
# without a per-component config file.
#
# Starting with Boost 1.87 boost_system was made header-only. Several distros
# (notably Arch, but also some other rolling-release setups) stopped shipping
# boost_system-<version>/boost_system-config.cmake as a result, while the
# rest of Boost's CMake configs are still installed. TrinityCore still calls
# find_package(Boost ... COMPONENTS system) and then fails to locate the
# target, even though everything that boost_system used to provide is now in
# Boost::headers.
#
# When the parent build adds this directory to CMAKE_PREFIX_PATH and
# find_package(boost_system CONFIG) is invoked, this file is picked up and
# creates an INTERFACE IMPORTED target that re-exports Boost::headers, which
# matches what the modern boost_system component does in practice.
#
# If/when TrinityCore grows an inline fallback for this in
# dep/boost/CMakeLists.txt, this directory can be removed.

if(TARGET Boost::system)
  set(boost_system_FOUND TRUE)
  return()
endif()

if(NOT TARGET Boost::headers)
  find_package(boost_headers CONFIG REQUIRED)
endif()

add_library(Boost::system INTERFACE IMPORTED)
set_target_properties(Boost::system PROPERTIES
  INTERFACE_LINK_LIBRARIES "Boost::headers"
  INTERFACE_COMPILE_DEFINITIONS "BOOST_SYSTEM_NO_DEPRECATED;BOOST_ALL_NO_LIB"
)

if(NOT TARGET boost_system)
  add_library(boost_system INTERFACE IMPORTED)
  set_target_properties(boost_system PROPERTIES
    INTERFACE_LINK_LIBRARIES "Boost::headers"
  )
endif()

set(boost_system_FOUND TRUE)
