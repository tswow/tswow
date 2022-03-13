#include "ClientLua.h"
#include "ClientDetours.h"
#include "Logger.h"

LUA_FUNCTION(luainject, (lua_State* L)) {
    LOG_DEBUG << "Hi from lua ping";
    return 0;
}

CLIENT_DETOUR(GameObjectInitialize, 0x007140A0, __cdecl, int, ()) {
    LOG_DEBUG << "GameObject Initialization";
    return GameObjectInitialize();
}
