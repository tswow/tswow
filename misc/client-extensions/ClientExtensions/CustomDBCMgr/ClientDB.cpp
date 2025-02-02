#include "ClientDB.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "Logger.h"

static std::map<std::string, CustomDBC> dbcMap;

void ClientDB::Load() {
    dbcMap["SpellAdditionalCostData"] = SpellAdditionalCostData().LoadDB();

    SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)(ClientDB::getDBC("SpellAdditionalCostData").GetRow(2));
    LOG_DEBUG << row->spellID;
    LOG_DEBUG << row->resourceName;
    LOG_DEBUG << row->cost;
    LOG_DEBUG << row->flag;
}

CustomDBC ClientDB::getDBC(char* dbcName)
{
    return dbcMap[dbcName];
}