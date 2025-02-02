# detours library
FetchContent_Declare(
  detours
  GIT_REPOSITORY https://github.com/microsoft/Detours.git
  GIT_TAG        v4.0.1
)
FetchContent_MakeAvailable(detours)
FILE(GLOB detours-sources
    ${detours_SOURCE_DIR}/src/*.h
    ${detours_SOURCE_DIR}/src/*.cpp
)
set_property (
    SOURCE ${detours_SOURCE_DIR}/src/uimports.cpp
    APPEND PROPERTY HEADER_FILE_ONLY true
)
add_library(detours STATIC ${detours-sources})
target_compile_options(detours PRIVATE /W4 /WX /Zi /MT /Gy /Gm- /Zl /Od)
target_include_directories(detours PUBLIC ${detours_SOURCE_DIR})

# ClientExtensions
FILE(GLOB ClientExtenisons ${CMAKE_CURRENT_SOURCE_DIR}/*)
SET(CLIENT_EXTENSIONS_H
    Logger.h
    ClientDetours.h
    ClientMacros.h
    ClientLua.h
    ClientArguments.h
    ClientNetwork.h
    ClientMPQ.h
    FSRoot.h
    lua.hpp
    ClientExtensions.h
    SharedDefines.h
    Characters/CharacterDefines.h
    Characters/CharacterFixes.h
    Tooltip/TooltipDefines.h
    Tooltip/SpellTooltipExtensions.h
)

SET(CLIENT_EXTENSIONS_CPP
    Main.cpp
    ClientDetours.cpp
    Logger.cpp
    ClientLua.cpp
    ClientArguments.cpp
    FSRoot.cpp
    TestModule.cpp
    ClientNetwork.cpp
    ClientMPQ.cpp
    ClientExtensions.cpp
    Characters/CharacterFixes.cpp
    CustomLua/SpellFunctions.cpp
    Tooltip/SpellTooltipExtensions.cpp
)

SET(CLIENT_EXTENSIONS_LUA
    ClientNetwork.lua
    Logger.lua
)

FILE(GLOB_RECURSE CLIENT_EXTENSIONS_SCRIPTS
    ${CMAKE_CURRENT_SOURCE_DIR}/Scripts/*
)

add_library(ClientExtensions SHARED
    ${CLIENT_EXTENSIONS_H}
    ${CLIENT_EXTENSIONS_CPP}
    ${CLIENT_EXTENSIONS_LUA}
    ${CLIENT_EXTENSIONS_SCRIPTS}
)
set_property(TARGET ClientExtensions PROPERTY CXX_STANDARD 17)
target_link_libraries(ClientExtensions detours CustomPackets)
target_include_directories(ClientExtensions PUBLIC
    ${CMAKE_SOURCE_DIR}/lua-5.1/src
    ${CMAKE_SOURCE_DIR}/CustomPackets
    ${detours_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR} # so "Scripts" can include it
)

set_property(TARGET ClientExtensions PROPERTY USE_FOLDERS true)
source_group(Scripts FILES ${CLIENT_EXTENSIONS_SCRIPTS})

set(LUA_LOGGING true CACHE BOOL "Allow logging from client lua")
if(LUA_LOGGING)
    target_compile_definitions(ClientExtensions PRIVATE LUA_LOGGING)
endif()

set(CLIENT_PATH "" CACHE FILEPATH "Path to your wow client")
if(NOT CLIENT_PATH STREQUAL "")
    add_custom_command(
        TARGET ClientExtensions POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
        $<TARGET_FILE_DIR:ClientExtensions>/ClientExtensions.dll
        ${CLIENT_PATH}
    )
    message("ClientExtensions.dll will be written to ${CLIENT_PATH} on build")
endif()

set(LOG_LEVELS DEBUG INFO WARN ERROR NONE)
set(LOG_LEVEL DEBUG CACHE STRING "")
set_property(CACHE LOG_LEVEL PROPERTY STRINGS ${LOG_LEVELS})

if(LOG_LEVEL STREQUAL "DEBUG")
    target_compile_definitions(ClientExtensions PRIVATE LOG_LEVEL=4)
elseif(LOG_LEVEL STREQUAL "INFO")
    target_compile_definitions(ClientExtensions PRIVATE LOG_LEVEL=3)
elseif(LOG_LEVEL STREQUAL "WARN")
    target_compile_definitions(ClientExtensions PRIVATE LOG_LEVEL=2)
elseif(LOG_LEVEL STREQUAL "ERROR")
    target_compile_definitions(ClientExtensions PRIVATE LOG_LEVEL=1)
elseif(LOG_LEVEL STREQUAL "NONE")
    target_compile_definitions(ClientExtensions PRIVATE LOG_LEVEL=0)
else()
    message( SEND_ERROR "Invalid LOG_LEVEL ${LOG_LEVEL}" )
endif()

add_executable(client-header-builder client_header_builder.cpp)
add_custom_target(client-header-builder-run
    COMMAND client-header-builder
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "Generating client lua headers"
    SOURCES client_header_builder.cpp
)
add_dependencies(ClientExtensions client-header-builder-run)
add_dependencies(client-header-builder-run client-header-builder)
set_property(TARGET client-header-builder PROPERTY CXX_STANDARD 17)