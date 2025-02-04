#include "ClientDB.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "DBCDefs/SpellCustomAttributes.h"
#include "Logger.h"

static std::map<std::string, CustomDBC*> dbcMap;

void ClientDB::Load() {
    dbcMap["SpellAdditionalCostData"] = SpellAdditionalCostData().LoadDB();
    dbcMap["SpellCustomAttributes"] = SpellCustomAttributes().LoadDB();
 LOG_DEBUG << "1";
    SpellAdditionalCostData* dbc = (SpellAdditionalCostData*)ClientDB::GetDBC("SpellAdditionalCostData");
     LOG_DEBUG << "2";
    SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)(dbc->GetRow(2));
    LOG_DEBUG << row->spellID;
    LOG_DEBUG << row->resourceName;
    LOG_DEBUG << row->cost;
    LOG_DEBUG << row->flag;
}

CustomDBC* ClientDB::GetDBC(char* dbcName)
{
    return dbcMap[dbcName];
}

int ClientDB::handleLua(lua_State* L, char* dbcName, int index)
{
    CustomDBC* dbc = ClientDB::GetDBC(dbcName);
    void* row = dbc->GetRow(index);
    return dbc->handleLuaRow(L, row);
}
