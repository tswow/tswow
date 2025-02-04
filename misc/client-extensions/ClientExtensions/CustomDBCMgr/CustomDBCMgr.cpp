#include "CustomDBCMgr.h"
#include "DBCDefs/SpellAdditionalCostData.h"
#include "DBCDefs/SpellCustomAttributes.h"

CustomDBCMgr GlobalDBCMap;

void CustomDBCMgr::addDBC(std::string key){
    allCustomDBCs[key] = CustomDBC();
}

void CustomDBCMgr::Load() {
    SpellAdditionalCostData().LoadDB();
    SpellCustomAttributes().LoadDB();
    SpellAdditionalCostDataRow* row = GlobalDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", 2);
    if (row) {
        LOG_DEBUG << "Spell ID: " << row->spellID << " resourceName: " << row->resourceName<< " Cost: " << row->cost<< " flag: " << row->flag;
    } else {
         LOG_DEBUG << "Row not found!";
    }
}
