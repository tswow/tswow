#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers_all.hpp >
#include <iostream>
#include "MessageStore.h"
#include "MessageLuaRegistry.h"
#include "MessageWrite.h"
#include "MessageRead.h"

extern "C" {
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"

	static void lua_fn(lua_State* L, const char* name, lua_CFunction fn)
	{
		lua_pushcfunction(L, fn);
		lua_setglobal(L, name);
	}

	int getOutput(lua_State* L)
	{
		lua_getglobal(L,"output");
		if (lua_isnumber(L, -1))
		{
			return lua_tonumber(L, -1);
		}
		return 0;
	}

	static lua_State* create_lua()
	{
		lua_State* L = luaL_newstate();
		luaL_openlibs(L);
		RegisterMessages([&](char const* name, lua_CFunction func) {
			lua_fn(L, name, func);
		});
		RegisterMessagePolyfill([&](char const* fill) {
			luaL_dostring(L, fill);
		});
		return L;
	}

	static lua_State* run_lua(char const* str)
	{
		lua_State* L = create_lua();
		luaL_dostring(L, str);
		return L;
	}

	TEST_CASE("lua") {
		SECTION("basics") {
			SECTION("output") {
				lua_State* L = run_lua("output = 1007688");
				REQUIRE(getOutput(L) == 1007688);
			}
		}

		SECTION("Messages") {
			InitializeMessageStore(100);

			SECTION("creates a message") {
				run_lua("WriteMessage(10)");
				REQUIRE(GetLastWrite()->Size() == 10);
			}

			SECTION("writes a message") {
				run_lua("WriteMessage(10):WriteUInt8(25)");
				REQUIRE(MessageRead(*GetLastWrite()).ReadUInt8() == 25);
			}

			SECTION("reads a message") {
				lua_State* L = create_lua();
				luaL_dostring(L,"OnMessage(function (v) output = v:ReadUInt8() end)");
				MessageWrite write(sizeof(MessageHeader)+1, 1);
				write.WriteUInt8(30);
				StageRead(MessageRead(write));
				luaL_dostring(L,"__FireMessage()");
				UnstageRead();
				REQUIRE(getOutput(L) == 30);
			}
		}
	}
}
