#include "CDBCMgr.h"
#include "CDBCDefs/SpellAdditionalAttributes.h"

CDBCMgr GlobalCDBCMap;
std::unordered_map<std::string, std::function<int(lua_State*, int)>> cdbcLuaHandlers = {};

void CDBCMgr::Load() {
    SpellAdditionalAttributes().LoadDB();
}

void CDBCMgr::addCDBC(std::string cdbcName) {
    allCDBCs[cdbcName] = CDBC();
}

void CDBCMgr::addCDBCLuaHandler(std::string cdbcName, std::function<int(lua_State*,int)> func) {
    cdbcLuaHandlers[cdbcName] = func;
}

int CDBCMgr::handleLua(lua_State* L, std::string cdbcName, int row) {
    auto it = cdbcLuaHandlers.find(cdbcName);
    if (it != cdbcLuaHandlers.end()) {
        return it->second(L,row);
    }
    return 0;
}
