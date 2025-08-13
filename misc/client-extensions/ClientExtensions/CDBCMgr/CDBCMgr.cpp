#include "CDBCMgr.h"
#include "CDBCDefs/LFGRoles.h"
#include "CDBCDefs/SpellAdditionalAttributes.h"
#include "CDBCDefs/SpellAdditionalCostData.h"
#include "CDBCDefs/ZoneLight.h"
#include "CDBCDefs/ZoneLightPoint.h"
#include "CDBCDefs/SpellEffectScalars.h"

CDBCMgr GlobalCDBCMap;
std::unordered_map<std::string, std::function<int(lua_State*,int)>> cdbcLuaHandlers = {};

void CDBCMgr::Load() {
    LFGRoles().LoadDB();
    SpellAdditionalAttributes().LoadDB();
    SpellAdditionalCostData().LoadDB();
    ZoneLight().LoadDB();
    ZoneLightPoint().LoadDB();
    SpellEffectScalars().LoadDB();
}

void CDBCMgr::addCDBC(std::string cdbcName) {
    allCDBCs[cdbcName] = CDBC();
    cdbcIndexRanges[cdbcName] = { 0, 0 };
}

CDBCMgr::CDBC CDBCMgr::getCDBC(std::string cdbcName) {
    return allCDBCs[cdbcName];
}

void CDBCMgr::addCDBCLuaHandler(std::string cdbcName, std::function<int(lua_State*,int)> func) {
    cdbcLuaHandlers[cdbcName] = func;
}

int CDBCMgr::handleLua(lua_State* L, std::string cdbcName, int row) {
    auto it = cdbcLuaHandlers.find(cdbcName);
    if (it != cdbcLuaHandlers.end()) {
        return it->second(L, row);
    }
    return 0;
}
