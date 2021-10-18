#pragma once

#include "ClientMacros.h"
#include "lua.hpp"

#include <string>

namespace ClientLua {
	int AddFunction(char const* fnName, lua_CFunction fn, std::string const& file, size_t line);
	CLIENT_FUNC(DoString, 0x00819210, void, (char const* code,lua_State* L))
}

#define CLIENT_LUA(name) \
	int name##Fn(lua_State * L);\
	int name##Dummy = ClientLua::AddFunction(#name,name##Fn,__FILE__,__LINE__);\
	int name##Fn(lua_State * L)