#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct SpellAdditionalCostDataRow {
    int spellID;
    char* resourceName;
    int cost;
    int flag;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, spellID);
        ClientLua::PushString(L, resourceName);
        ClientLua::PushNumber(L, cost);
        ClientLua::PushNumber(L, flag);
        return 4;
    }
};

class SpellAdditionalCostData : public CDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.cdbc";
    SpellAdditionalCostData() : CDBC() {
        this->numColumns = sizeof(SpellAdditionalCostDataRow)/4;
        this->rowSize = sizeof(SpellAdditionalCostDataRow);
    }
    
    SpellAdditionalCostData* LoadDB() { 
        GlobalCDBCMap.addCDBC("SpellAdditionalCostData");
        CDBC::LoadDB(this->fileName);
        SpellAdditionalCostData::setupStringsAndTable();
        CDBCMgr::addCDBCLuaHandler("SpellAdditionalCostData", SpellAdditionalCostData::handleLua);
        return this;
    };

    void SpellAdditionalCostData::setupStringsAndTable() {
        SpellAdditionalCostDataRow* row = static_cast<SpellAdditionalCostDataRow*>(this->rows);
        uintptr_t stringTable = reinterpret_cast<uintptr_t>(this->stringTable);
        for (uint32_t i = 0; i < this->numRows; i++) {
            row->resourceName = reinterpret_cast<char*>(stringTable + reinterpret_cast<uintptr_t>(row->resourceName));
            GlobalCDBCMap.addRow("SpellAdditionalCostData", row->spellID, *row);
            ++row;
        }
    };

    static int handleLua(lua_State* L, int row) {
        SpellAdditionalCostDataRow* r = GlobalCDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)
