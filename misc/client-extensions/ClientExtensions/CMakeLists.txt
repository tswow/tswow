# Detours library
FetchContent_Declare(
  detours
  GIT_REPOSITORY https://github.com/microsoft/Detours.git
  GIT_TAG        v4.0.1
)
FetchContent_MakeAvailable(detours)
FILE(GLOB detours_sources
    ${detours_SOURCE_DIR}/src/*.h
    ${detours_SOURCE_DIR}/src/*.cpp
)
set_property (
    SOURCE ${detours_SOURCE_DIR}/src/uimports.cpp
    APPEND PROPERTY HEADER_FILE_ONLY true
)
add_library(detours STATIC ${detours_sources})
target_compile_options(detours PRIVATE /W4 /WX /Zi /MT /Gy /Gm- /Zl /Od)
target_include_directories(detours PUBLIC ${detours_SOURCE_DIR})

# ClientExtensions
file(GLOB_RECURSE CLIENT_EXTENSIONS_SOURCES CONFIGURE_DEPENDS "*.cpp" "*.h" "*.lua")

add_library(ClientExtensions SHARED ${CLIENT_EXTENSIONS_SOURCES})
set_property(TARGET ClientExtensions PROPERTY CXX_STANDARD 17)

target_link_libraries(ClientExtensions PRIVATE detours CustomPackets)
target_include_directories(ClientExtensions PUBLIC
    ${CMAKE_SOURCE_DIR}/lua-5.1/src
    ${CMAKE_SOURCE_DIR}/CustomPackets
    ${detours_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR} # so "Scripts" can include it
)

set_property(TARGET ClientExtensions PROPERTY USE_FOLDERS true)

option(LUA_LOGGING "Allow logging from client lua" ON)
if(LUA_LOGGING)
    target_compile_definitions(ClientExtensions PRIVATE LUA_LOGGING)
endif()

set(CLIENT_PATH "" CACHE PATH "Path to your wow client")
if(NOT CLIENT_PATH STREQUAL "")
    add_custom_command(
        TARGET ClientExtensions POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
        $<TARGET_FILE:ClientExtensions>
        ${CLIENT_PATH}
    )
    message("ClientExtensions.dll will be written to ${CLIENT_PATH} on build")
endif()

set(LOG_LEVELS DEBUG INFO WARN ERROR NONE)
set(LOG_LEVEL DEBUG CACHE STRING "Logging level")
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
    message(FATAL_ERROR "Invalid LOG_LEVEL ${LOG_LEVEL}")
endif()

# client-header-builder
add_executable(client-header-builder client_header_builder.cpp)
set_property(TARGET client-header-builder PROPERTY CXX_STANDARD 17)

add_custom_target(client-header-builder-run
    COMMAND client-header-builder
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "Generating client lua headers"
    SOURCES client_header_builder.cpp
)
add_dependencies(ClientExtensions client-header-builder-run)
add_dependencies(client-header-builder-run client-header-builder)