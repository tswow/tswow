#include "ClientLua.h"
#include "CDBCMgr/CDBCMgr.h"
#include "Logger.h"

LUA_FUNCTION(GetCDBCRow, (lua_State* L)) {
    return CDBCMgr::handleLua(L, ClientLua::GetString(L, 1), ClientLua::GetNumber(L, 2));
}