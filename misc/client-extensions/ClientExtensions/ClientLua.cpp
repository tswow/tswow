#include "ClientLua.h"
#include "Logger.h"
#include "ClientDetours.h"
#include "SharedDefines.h"
#include "FSRoot.h"

#include <vector>
#include <string>
#include <cstdint>
#include <windows.h>

#include "luafiles.generated.h"

// new custom range
CLIENT_ADDRESS(void, CAVE_START, 0x7743d2)
constexpr int CAVE_SIZE = 0x26; // space for 7 functions

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

    std::vector<LuaFunction>& luaRegistry()
    {
        static std::vector<LuaFunction> _luaRegistry;
        return _luaRegistry;
    }

    size_t lastCave = 0;

    CLIENT_ADDRESS(lua_State*, _state, 0x00d3f78c);
    bool isInitialized = false;

    CLIENT_FUNCTION(UnregisterGlobal,0x00817FD0, __cdecl,void,(char const* name))
    CLIENT_FUNCTION(FrameScriptRegisterFunction
        , 0x00817F90
        , __cdecl
        , void
        , (char const* name, lua_CFunction fn)
    )
}

namespace ClientLua {
    lua_State* State()
    {
        return *_state;
    }

    void RegisterLua(std::string const& lua, std::string const& filename, size_t line)
    {
        LUA_FILES.push_back({filename+":"+std::to_string(line),lua});
    }

    int AddFunction(char const* name, lua_CFunction fn, std::string const& file, size_t line)
    {
        luaRegistry().push_back({ name, fn, file, line });
        return 0;
    }

    CLIENT_FUNCTION(_GetString, 0x0084E0E0, __cdecl, char const*, (lua_State* L, int32_t, int32_t))
    CLIENT_FUNCTION(_GetNumber, 0x0084E030, __cdecl, double, (lua_State* L, int32_t))

    std::string GetString(lua_State* L, int32_t offset, std::string const& defValue)
    {
        return IsString(L, offset) ? _GetString(L, offset, 0) : defValue;
    }

    double GetNumber(lua_State* L, int32_t offset, double defValue)
    {
        return IsNumber(L, offset) ? _GetNumber(L, offset) : defValue;
    }
}
//HandleCharEnum internal function
//this is for char select screen lua stuff
CLIENT_DETOUR(LoadScriptFunctionsEarly, 0x004D95C0, __cdecl, int, ()) {
    LOG_DEBUG << "Loading script functions";
    DWORD old;
    VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry().size(), PAGE_EXECUTE_READWRITE, &old);
    memset(CAVE_START, NOP, JMP_SIZE * luaRegistry().size());

    // write a jmp
    *((unsigned char*)CAVE_START    ) = 0xed;
    *((unsigned char*)CAVE_START + 1) = 0x26;

    for (size_t i = 0; i < luaRegistry().size(); ++i)
    {
        size_t cur_cave = uint32_t(CAVE_START) + 2 + i * JMP_SIZE;
        LuaFunction& fn = luaRegistry()[i];
        LOG_DEBUG
            << "Registering Lua function: "
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
    VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry().size(), old, &dummy);
    lastCave = luaRegistry().size();
    for (auto const& pair : LUA_FILES)
    {
        LOG_DEBUG << "Running lua file " << pair.first;
        ClientLua::DoString(pair.second.c_str(), *_state);
    }

    return LoadScriptFunctionsEarly();
}

CLIENT_DETOUR(LoadScriptFunctions, 0x5120E0, __cdecl, int, ()) {
    LOG_DEBUG << "Loading script functions";
    DWORD old;
    VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry().size(), PAGE_EXECUTE_READWRITE, &old);
    memset(CAVE_START, NOP, JMP_SIZE * luaRegistry().size());

    // write a jmp
    *((unsigned char*)CAVE_START    ) = 0xed;
    *((unsigned char*)CAVE_START + 1) = 0x26;

    for (size_t i = 0; i < luaRegistry().size(); ++i)
    {
        size_t cur_cave = uint32_t(CAVE_START) + 2 + i * JMP_SIZE;
        LuaFunction& fn = luaRegistry()[i];
        LOG_DEBUG
            << "Registering Lua function: "
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
    VirtualProtect((LPVOID)CAVE_START, JMP_SIZE * luaRegistry().size(), old, &dummy);
    lastCave = luaRegistry().size();

    // so we have them available in the scripts below
    int funcs = LoadScriptFunctions();

    for (auto const& pair : LUA_FILES)
    {
        LOG_DEBUG << "Running lua file " << pair.first;
        ClientLua::DoString(pair.second.c_str(), *_state);
    }

    return funcs;
}

CLIENT_DETOUR(UnloadScriptFunctions, 0x00512280, __cdecl, int, ()) {
    if (lastCave > 0)
        WriteBytesAtAddress(CAVE_START, NOP, JMP_SIZE * lastCave);

    return UnloadScriptFunctions();
}

// Aleist3r: should probably be in its own file but cba
LUA_FUNCTION(GetSpellDescription, (lua_State* L)) {

    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        char buffer[680];
        char dest[1024];

        if (ClientDB__GetLocalizedRow((void*)0xAD49D0, spellId, &buffer)) { // hex address is g_SpellRec struct
            SpellRec__sub_57ABC0(&buffer, &dest, 1024, 0, 0, 0, 0, 1, 0);
            ClientLua::PushString(L, dest);
            LOG_DEBUG << dest;
            return 1;
        }
    }

    ClientLua::PushNil(L);
    return 1;
}
