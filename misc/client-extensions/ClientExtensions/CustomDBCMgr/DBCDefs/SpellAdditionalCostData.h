#pragma optimize("", off)
#include "CustomDBCMgr/CustomDBC.h"
#include "CustomDBCMgr/CustomDBCMgr.h"

struct SpellAdditionalCostDataRow {
    int spellID;
    char* resourceName;
    int cost;
    int flag;
};

class SpellAdditionalCostData : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.dbc";
    SpellAdditionalCostData() : CustomDBC() {
        this->numColumns = 4;
        this->rowSize = sizeof(SpellAdditionalCostDataRow);
    }
    
    SpellAdditionalCostData* LoadDB() { 
        GlobalDBCMap.addDBC("SpellAdditionalCostData");
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalCostData::setupStringsAndTable();
        return this;
    };

    void SpellAdditionalCostData::setupStringsAndTable() {
        SpellAdditionalCostDataRow* row = static_cast<SpellAdditionalCostDataRow*>(this->rows);
        uintptr_t stringTable = reinterpret_cast<uintptr_t>(this->stringTable);
        for (uint32_t i = 0; i < this->numRows; i++) {
            row->resourceName = reinterpret_cast<char*>(stringTable + reinterpret_cast<uintptr_t>(row->resourceName));
            GlobalDBCMap.addRow("SpellAdditionalCostData", row->spellID, *row);
            ++row;
        }
    };
};
#pragma optimize("", on)