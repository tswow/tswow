#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct SpellAdditionalAttributesRow {
    int spellID;
    uint32_t customAttr0;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, spellID);
        ClientLua::PushNumber(L, customAttr0);
        return 2;
    }
};

class SpellAdditionalAttributes : public CDBC {
public:
    const char* fileName = "SpellAdditionalAttributes";
    SpellAdditionalAttributes() : CDBC() {
        this->numColumns = sizeof(SpellAdditionalAttributesRow)/4;
        this->rowSize = sizeof(SpellAdditionalAttributesRow);
    }

    SpellAdditionalAttributes* LoadDB() {
        GlobalCDBCMap.addCDBC(this->fileName);
        CDBC::LoadDB(this->fileName);
        SpellAdditionalAttributes::setupTable();
        CDBCMgr::addCDBCLuaHandler(this->fileName, [this](lua_State* L, int row) {return this->handleLua(L, row); });
        GlobalCDBCMap.setIndexRange(this->fileName, this->minIndex, this->maxIndex);
        return this;
    }

    void SpellAdditionalAttributes::setupTable() {
        SpellAdditionalAttributesRow* row = static_cast<SpellAdditionalAttributesRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalCDBCMap.addRow(this->fileName, row->spellID, *row);
            ++row;
        }
    };

    int handleLua(lua_State* L, int row) {
        SpellAdditionalAttributesRow* r = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>(this->fileName, row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)
