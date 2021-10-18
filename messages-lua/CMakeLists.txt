set(MESSAGES_LUA_H
    MessageStore.h
    MessageLuaRegistry.h
    messages.lua.h
    lua.hpp
)

set(MESSAGES_LUA_CPP
    MessageStore.cpp
    MessageLuaRegistry.cpp
)

set(MESSAGES_LUA_LUA
    messages.lua
)

add_library(messages-lua STATIC ${MESSAGES_LUA_H} ${MESSAGES_LUA_CPP} ${MESSAGES_LUA_LUA})
target_link_libraries(messages-lua lua messages)
target_include_directories(messages-lua PUBLIC
    ${CMAKE_SOURCE_DIR}/lua-5.1/src
    ${CMAKE_SOURCE_DIR}/messages
)

# Generate messages.lua.h
add_executable(luabuilder build_lua_header.cpp)
add_custom_target(luabuilder-run
    COMMAND luabuilder
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "Generating lua header"
    SOURCES build_lua_header.cpp
)
add_dependencies(messages-lua luabuilder-run)
add_dependencies(luabuilder-run luabuilder)