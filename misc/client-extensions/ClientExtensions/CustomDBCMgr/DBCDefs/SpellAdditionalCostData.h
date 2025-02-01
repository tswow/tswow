#pragma once
#include "CustomDBCMgr/CustomDBC.h"
#include <string>
#include "Logger.h"

struct SpellAdditionalCostDataRow {
    int spellID;
    void* resourceName;
    int cost;
    int flag;
};

class SpellAdditionalCostData : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.dbc";
    SpellAdditionalCostData() : CustomDBC() {
        this->numColumns = 4;
        this->rowSize = 16;
    }
    void LoadDB(){
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)CustomDBC::GetRow(2);
        LOG_DEBUG << row->spellID;
        LOG_DEBUG << reinterpret_cast<uintptr_t*>(this->stringTable);
        LOG_DEBUG << reinterpret_cast<void*>(reinterpret_cast<uintptr_t>(this->stringTable) + reinterpret_cast<uintptr_t>(row->resourceName));
        LOG_DEBUG << row->cost;
        LOG_DEBUG << row->flag;
    };
};

