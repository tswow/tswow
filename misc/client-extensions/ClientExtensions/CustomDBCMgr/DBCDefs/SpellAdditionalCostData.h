#pragma optimize("", off)
#include "CustomDBCMgr/CustomDBC.h"
#include "CustomDBCMgr/CustomDBCMgr.h"

struct SpellAdditionalCostDataRow {
    int spellID;
    char* resourceName;
    int cost;
    int flag;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L,spellID);
        ClientLua::PushString(L,resourceName);
        ClientLua::PushNumber(L,cost);
        ClientLua::PushNumber(L,flag);
        return 4;
    }
};

class SpellAdditionalCostData : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.dbc";
    SpellAdditionalCostData() : CustomDBC() {
        this->numColumns = 4;
        this->rowSize = 16;
    }
    
    SpellAdditionalCostData* LoadDB() { 
        GlobalDBCMap.addDBC("SpellAdditionalCostData");
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalCostData::setupStringsAndTable();
        CustomDBCMgr::addDBCLuaHandler("SpellAdditionalCostData",  SpellAdditionalCostData::handleLua);
        return this;
    };

    void SpellAdditionalCostData::setupStringsAndTable() {
        uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)ptr;
            row->resourceName = reinterpret_cast<char*>(reinterpret_cast<uintptr_t>(this->stringTable) + reinterpret_cast<uintptr_t>(row->resourceName));
            GlobalDBCMap.addRow("SpellAdditionalCostData", row->spellID, *row);
            ptr += this->numColumns;
        }
    };

    static int handleLua(lua_State* L, int row) {
        auto* r = GlobalDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)