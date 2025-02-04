#include "ClientDB.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "DBCDefs/SpellCustomAttributes.h"
#include "CustomDBCMgr.h"
#include "Logger.h"

static std::map<std::string, CustomDBC*> dbcMap;

void ClientDB::Load() {
    GlobalMapContainer.addDBC("SpellAdditionalCostData");
    dbcMap["SpellAdditionalCostData"] = SpellAdditionalCostData().LoadDB();
    GlobalMapContainer.addDBC("SpellCustomAttributes");
    dbcMap["SpellCustomAttributes"] = SpellCustomAttributes().LoadDB();
    SACDRow* row = GlobalMapContainer.getRow<SACDRow>("SpellAdditionalCostData", 2);
    if (row) {
        LOG_DEBUG << "Spell ID: " << row->spellID << " resourceName: " << row->resourceName<< " Cost: " << row->cost<< " flag: " << row->flag;
    } else {
         LOG_DEBUG << "Row not found!";
    }

    LOG_DEBUG << row->spellID;
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
