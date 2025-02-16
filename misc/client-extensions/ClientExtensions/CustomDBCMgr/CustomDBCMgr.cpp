#include "CustomDBCMgr.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "DBCDefs/SpellAdditionalAttributes.h"

CustomDBCMgr GlobalDBCMap;
std::unordered_map<std::string, std::function<int(lua_State*,int)>> dbcLuaHandlers = {};

void CustomDBCMgr::Load() {
    SpellAdditionalCostData().LoadDB();
    SpellAdditionalAttributes().LoadDB();
}

void CustomDBCMgr::addDBC(std::string dbcName){
    allCustomDBCs[dbcName] = CustomDBC();
}

void CustomDBCMgr::addDBCLuaHandler(std::string dbcName,  std::function<int(lua_State*,int)> func){
    dbcLuaHandlers[dbcName] = func;
}

int CustomDBCMgr::handleLua(lua_State* L, std::string dbcName, int row) {
    auto it = dbcLuaHandlers.find(dbcName);
    if (it != dbcLuaHandlers.end()) {
        return it->second(L,row);
    }
    return 0;
}
