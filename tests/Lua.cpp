#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >
#include <iostream>
#include "MessageStore.h"

extern "C" {
	#include "lua.h"
	#include "lualib.h"
	#include "lauxlib.h"

	static void lua_fn(lua_State* L, const char* name, lua_CFunction fn)
	{
		lua_pushcfunction(L, fn);
		lua_setglobal(L, name);
	}

	static lua_State* create_lua()
	{
		lua_State* L = luaL_newstate();
		return L;
	}

	TEST_CASE("[lua] lua starts") {
		lua_State* L = create_lua();
	}
}
