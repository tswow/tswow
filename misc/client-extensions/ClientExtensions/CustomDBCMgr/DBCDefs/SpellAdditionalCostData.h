#pragma once
#include "CustomDBCMgr/CustomDBC.h"
#include "CustomDBCMgr/CustomDBCMgr.h"

struct SACDRow {
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
        SpellAdditionalCostData::setupTable();
        return this;
    };

    void SpellAdditionalCostData::setupStrings() {
        uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            SACDRow* row = (SACDRow*)ptr;
            row->resourceName = reinterpret_cast<char*>(reinterpret_cast<uintptr_t>(this->stringTable) + reinterpret_cast<uintptr_t>(row->resourceName));
            ptr += this->numColumns;
        }
    };

     void SpellAdditionalCostData::setupTable() {
        uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            SACDRow* row = (SACDRow*)ptr;
            GlobalMapContainer.addRow("SpellAdditionalCostData", row->spellID, SACDRow{row->spellID, row->resourceName,row->cost,row->flag});
            ptr += this->numColumns;
        }
    };

    int handleLuaRow(lua_State* L, void* rowPtr) override {
        SACDRow row = *(SACDRow*)rowPtr;        
        ClientLua::PushNumber(L, row.spellID);
        ClientLua::PushString(L, row.resourceName);
        ClientLua::PushNumber(L, row.cost);
        ClientLua::PushNumber(L, row.flag);
        return numColumns;
    }
};

