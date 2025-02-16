#include "ClientLua.h"
#include "CustomDBCMgr/CustomDBCMgr.h"
#include "Logger.h"

LUA_FUNCTION(GetCustomDBCRow, (lua_State* L)) {
    return CustomDBCMgr::handleLua(L, ClientLua::GetString(L, 1), ClientLua::GetNumber(L, 2));
}