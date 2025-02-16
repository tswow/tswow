#include "CDBCMgr.h"
#include "CDBCDefs/SpellAdditionalAttributes.h"
#include "CDBCDefs/SpellAdditionalCostData.h"

CDBCMgr GlobalDBCMap;
std::unordered_map<std::string, std::function<int(lua_State*,int)>> dbcLuaHandlers = {};

void CDBCMgr::Load() {
    SpellAdditionalAttributes().LoadDB();
    SpellAdditionalCostData().LoadDB();
}

void CDBCMgr::addDBC(std::string dbcName){
    allCDBCs[dbcName] = CDBC();
}

void CDBCMgr::addDBCLuaHandler(std::string dbcName,  std::function<int(lua_State*,int)> func){
    dbcLuaHandlers[dbcName] = func;
}

int CDBCMgr::handleLua(lua_State* L, std::string dbcName, int row) {
    auto it = dbcLuaHandlers.find(dbcName);
    if (it != dbcLuaHandlers.end()) {
        return it->second(L,row);
    }
    return 0;
}
