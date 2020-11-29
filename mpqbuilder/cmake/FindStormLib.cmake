# This file is part of Noggit3, licensed under GNU General Public License (version 3).
# ^ (tswow) -- I copied the file from noggit, but we're also GPLv3 so it's all good.

# adds target StormLib

find_path (STORM_INCLUDE_DIR StormLib.h StormPort.h)

find_library (_storm_release_lib NAMES StormLibRAD StormLibRAS StormLibRUD StormLibRUS)

list (APPEND STORM_LIBRARIES ${_storm_release_lib})

include (FindPackageHandleStandardArgs)
find_package_handle_standard_args (StormLib DEFAULT_MSG STORM_LIBRARIES STORM_INCLUDE_DIR)
mark_as_advanced (STORM_INCLUDE_DIR _storm_release_lib STORM_LIBRARIES)

add_library (StormLib INTERFACE)
target_link_libraries (StormLib INTERFACE ${STORM_LIBRARIES})
set_property  (TARGET StormLib APPEND PROPERTY INTERFACE_SYSTEM_INCLUDE_DIRECTORIES ${STORM_INCLUDE_DIR})
set_property  (TARGET StormLib APPEND PROPERTY INTERFACE_INCLUDE_DIRECTORIES ${STORM_INCLUDE_DIR})

#! \note on Windows, storm tries to auto-link. There is no proper flag to disable that, so abuse this one.
target_compile_definitions (StormLib INTERFACE -D__STORMLIB_SELF__)