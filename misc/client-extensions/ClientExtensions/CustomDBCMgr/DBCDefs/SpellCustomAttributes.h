#pragma optimize("", off)
#include "CustomDBCMgr/CustomDBC.h"

struct SpellCustomAttributesRow {
    int spellID;
    uint32_t customAttr0;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, spellID);
        ClientLua::PushNumber(L, customAttr0);
        return 2;
    }
};

class SpellCustomAttributes : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellCustomAttributes.dbc";
    SpellCustomAttributes() {
        this->numColumns = 2;
        this->rowSize = sizeof(SpellCustomAttributesRow);
    }

    SpellCustomAttributes* LoadDB() {
        GlobalDBCMap.addDBC("SpellCustomAttributes");
        CustomDBC::LoadDB(this->fileName);
        SpellCustomAttributes::setupTable();
        CustomDBCMgr::addDBCLuaHandler("SpellCustomAttributes", SpellCustomAttributes::handleLua);
        return this;
    }

    void SpellCustomAttributes::setupTable() {
        SpellCustomAttributesRow* row = static_cast<SpellCustomAttributesRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalDBCMap.addRow("SpellCustomAttributes", row->spellID, *row);
            ++row;
        }
    };

    static int handleLua(lua_State* L, int row) {
        SpellCustomAttributesRow* r = GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", row);
        if (r)
            return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)
