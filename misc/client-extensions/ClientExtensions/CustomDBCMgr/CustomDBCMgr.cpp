#include "CustomDBCMgr.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "DBCDefs/SpellCustomAttributes.h"

CustomDBCMgr GlobalDBCMap;

void CustomDBCMgr::addDBC(std::string dbcName){
    allCustomDBCs[dbcName] = CustomDBC();
}

void CustomDBCMgr::Load() {
    SpellAdditionalCostData().LoadDB();
    SpellCustomAttributes().LoadDB();
}
