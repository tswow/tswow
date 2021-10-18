#include "ClientLua.h"
#include "Logger.h"
#include "ClientDetours.h"
#include "FSRoot.h"

#include <vector>
#include <string>
#include <cstdint>
#include <windows.h>

#include "luafiles.generated.h"

// This segment has over 56kb of 0s
// that's space for over 11k lua functions
CLIENT_ADDR(void,CAVE_START,0x6ddf80)

#define JMP_SIZE 5
#define NOP 0x90
#define JMP 0xe9

namespace
{
	struct LuaFunction {
		std::string const name;
		lua_CFunction func;

		std::string const file;
		size_t line;
	};
	std::vector<LuaFunction> luaRegistry;
	size_t lastCave = 0;
	lua_State** _state = (lua_State**)0x00D3F78C;
	bool isInitialized = false;

	CLIENT_FUNC(UnregisterGlobal,0x00817FD0,void,(char const* name))
	CLIENT_FUNC(FrameScriptRegisterFunction
		, 0x00817F90
		, void
		, (char const* name, lua_CFunction fn)
	)

	CLIENT_DETOUR(FrameScriptReloaded, 0x008167E0, int, (int a, int b, int c)) {
		if (b != 11334016) return FrameScriptReloaded(a, b, c);

		LOG_DEBUG << "Reloading Lua";

		if (lastCave > 0)
		{
			DWORD old;
			VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * lastCave, PAGE_EXECUTE_READWRITE, &old);
			memset(CAVE_START, NOP, JMP_SIZE * lastCave);
			DWORD dummy;
			VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * lastCave, old,&dummy);
		}

		DWORD old;
		VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry.size(), PAGE_EXECUTE_READWRITE, &old);
		memset(CAVE_START, NOP, JMP_SIZE * luaRegistry.size());
		for (size_t i = 0; i < luaRegistry.size(); ++i)
		{
			size_t cur_cave = uint32_t(CAVE_START) + i * JMP_SIZE;
			LuaFunction& fn = luaRegistry[i];
			LOG_DEBUG
				<< "Lua: "
				<< fn.name
				<< "@"
				<< fn.func
				<< " -> "
				<< relProjectPath(fn.file)
				<< ":"
				<< fn.line;
			// write jmp
			*(uint8_t*)cur_cave = JMP;
			*(uint32_t*)(cur_cave + 1) = int32_t(fn.func) - ((int32_t)cur_cave) - JMP_SIZE;
			FrameScriptRegisterFunction(fn.name.c_str(), (lua_CFunction)cur_cave);
		}
		DWORD dummy;
		VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry.size(), old, &dummy);
		lastCave = luaRegistry.size();

		for (std::string const& lua : LUA_FILES)
		{
			ClientLua::DoString(lua.c_str(), *_state);
		}

		return FrameScriptReloaded(a, b, c);
	}
}

namespace ClientLua {
	int AddFunction(char const* name, lua_CFunction fn, std::string const& file, size_t line)
	{
		luaRegistry.push_back({ name, fn, file, line });
		return 0;
	}
}