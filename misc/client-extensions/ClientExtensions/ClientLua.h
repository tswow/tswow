#pragma once

#include "ClientMacros.h"
#include "lua.hpp"

#include <string>

namespace ClientLua {
    int AddFunction(char const* fnName, lua_CFunction fn, std::string const& file, size_t line);

    lua_State* State();
    // Registers lua that will fire on reload
    void RegisterLua(std::string const& lua, std::string const& filename = "", size_t line = 0);

    CLIENT_FUNCTION(DoString, 0x00819210, __cdecl, void, (char const* code, lua_State* L))
    CLIENT_FUNCTION(GetTop, 0x0084DBD0, __cdecl, int, (lua_State* L))

    CLIENT_FUNCTION(IsString, 0x0084DF60, __cdecl, uint32_t, (lua_State* L, int32_t))
    CLIENT_FUNCTION(IsNumber, 0x0084DF20, __cdecl, int32_t, (lua_State* L, int32_t))

    CLIENT_FUNCTION(PushNumber, 0x0084E2A0, __cdecl, int, (lua_State* L, double value))
    CLIENT_FUNCTION(PushString, 0x0084E350, __cdecl, int, (lua_State* L, char const* value))

    CLIENT_FUNCTION(PushNil, 0x84E280, __cdecl, int, (lua_State* L))

    std::string GetString(lua_State* L, int32_t offset, std::string const& defValue = "");
    double GetNumber(lua_State* L, int32_t offset, double defValue = 0);
}

// do NOT refactor this name
// without also changing the name in client_header_builder.cpp

#define LUA_FUNCTION(__lua_function_name, arg) \
    int __lua_function_name##Fn##arg;\
    int __lua_function_name##__Result = \
        ClientLua::AddFunction(\
            #__lua_function_name\
            ,__lua_function_name##Fn\
            ,__FILE__\
            ,__LINE__\
            );\
    int __lua_function_name##Fn##arg
