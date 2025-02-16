#pragma optimize("", off)
#include "CustomDBCMgr/CustomDBC.h"

struct SpellAdditionalAttributesRow {
    int spellID;
    uint32_t customAttr0;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L,spellID);
        ClientLua::PushNumber(L,customAttr0);
        return 2;
    }
};

class SpellAdditionalAttributes : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalAttributes.cdbc";
    SpellAdditionalAttributes() {
        this->numColumns = sizeof(SpellAdditionalAttributesRow)/4;
        this->rowSize = sizeof(SpellAdditionalAttributesRow);
    }

    SpellAdditionalAttributes* LoadDB() {
        GlobalDBCMap.addDBC("SpellAdditionalAttributes");
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalAttributes::setupTable();
        CustomDBCMgr::addDBCLuaHandler("SpellAdditionalAttributes",  SpellAdditionalAttributes::handleLua);
        return this;
    }

    void SpellAdditionalAttributes::setupTable() {
        SpellAdditionalAttributesRow* row = static_cast<SpellAdditionalAttributesRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalDBCMap.addRow("SpellAdditionalAttributes", row->spellID, *row);
            ++row;
        }
    };

    static int handleLua(lua_State* L, int row) {
        SpellAdditionalAttributesRow* r = GlobalDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)