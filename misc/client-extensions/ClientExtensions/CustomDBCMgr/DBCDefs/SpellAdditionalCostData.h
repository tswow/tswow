#pragma once
#include "CustomDBCMgr/CustomDBC.h"

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
        this->rowSize = 16;
    }
    
    SpellAdditionalCostData* LoadDB() {
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalCostData::setupStrings();
        return this;
    };

    void SpellAdditionalCostData::setupStrings() {
        uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)ptr;
            row->resourceName = reinterpret_cast<char*>(reinterpret_cast<uintptr_t>(this->stringTable) + reinterpret_cast<uintptr_t>(row->resourceName));
            ptr += this->numColumns;
        }
    };

    int handleLuaRow(lua_State* L, void* rowPtr) override {
        SpellAdditionalCostDataRow row = *(SpellAdditionalCostDataRow*)rowPtr;        
        ClientLua::PushNumber(L, row.spellID);
        ClientLua::PushString(L, row.resourceName);
        ClientLua::PushNumber(L, row.cost);
        ClientLua::PushNumber(L, row.flag);
        return numColumns;
    }
};

