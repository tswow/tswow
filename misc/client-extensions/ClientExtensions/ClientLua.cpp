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

    CLIENT_ADDRESS(lua_State*, _state, 0x00d3f78c);
    CLIENT_FUNCTION(UnregisterGlobal,0x00817FD0, __cdecl,void,(char const* name))
    CLIENT_FUNCTION(FrameScriptRegisterFunction, 0x00817F90, __cdecl, void, (char const* name, lua_CFunction fn))
}

namespace ClientLua {
    lua_State* State(){ return *_state; }

    void RegisterLua(std::string const& lua, std::string const& filename, size_t line)
    {
        LUA_FILES.push_back({filename+":"+std::to_string(line), lua});
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

    void allowOutOfBoundsPointer()
    {
        *(uint32_t*)0x00D415B8 = 1;
        *(uint32_t*)0x00D415BC = 0x7FFFFFFF;
    }
}

#define LUA_GLOBALSINDEX (-10002)
CLIENT_FUNCTION(GetLuaState, 0x00817DB0, __cdecl, lua_State*, ())
CLIENT_FUNCTION(lua_pushcclosure_s, 0x0084E400, __cdecl, void, (lua_State*, lua_CFunction, int))
CLIENT_FUNCTION(lua_setfield_s, 0x0084E900, __cdecl, void, (lua_State*, int, const char*))

void customLua()
{
    lua_State* L = GetLuaState();
    for (size_t i = 0; i < luaRegistry().size(); ++i)
    {
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
        lua_pushcclosure_s(L, fn.func, 0);
        lua_setfield_s(L, LUA_GLOBALSINDEX, fn.name.c_str());
    }
}

CLIENT_DETOUR(LoadScriptFunctionsEarly, 0x004D95C0, __cdecl, int, ()) {
    LOG_DEBUG << "Loading early script functions";
    customLua();
    return LoadScriptFunctionsEarly();
}

CLIENT_DETOUR(LoadScriptFunctions, 0x5120E0, __cdecl, int, ()) {
    LOG_DEBUG << "Loading script functions";
    customLua();
    int funcs = LoadScriptFunctions();
    for (auto const& pair : LUA_FILES)
    {
        LOG_DEBUG << "Running lua file " << pair.first;
        ClientLua::DoString(pair.second.c_str(), *_state);
    }
    return funcs;
}