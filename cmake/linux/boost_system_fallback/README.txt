Boost::system fallback for distros without per-component config

This directory holds a tiny CMake "config package" that synthesises a
Boost::system / boost_system INTERFACE target. It exists because, starting
with Boost 1.87, boost_system was made header-only and a few Linux distros
stopped shipping boost_system-<version>/boost_system-config.cmake even though
the rest of the Boost CMake configs are present. TrinityCore still uses
find_package(Boost ... COMPONENTS system), which then fails to locate the
target.

The Linux branch of tswow-scripts/compile/TrinityCore.ts adds this directory
to CMAKE_PREFIX_PATH when configuring the TrinityCore subproject. If the
real boost_system config is found first (older Boost, or distros that still
package it), this fallback is never loaded.

If/when TrinityCore grows an inline fallback for the same situation in
dep/boost/CMakeLists.txt, this directory can be removed.
