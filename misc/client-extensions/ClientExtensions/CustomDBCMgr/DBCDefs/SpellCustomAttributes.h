#pragma once
#include "CustomDBCMgr/CustomDBC.h"

struct SpellCustomAttributesRow {
    int spellId;
    uint64_t customAttr0;
};

class SpellCustomAttributes : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellCustomAttributes.dbc";
    SpellCustomAttributes() {
        this->numColumns = 2;
        this->rowSize = 12;
    }

    SpellCustomAttributes* LoadDB() {
        CustomDBC::LoadDB(this->fileName);
        return this;
    }

    int handleLuaRow(lua_State* L, void* rowPtr) override {
        SpellCustomAttributesRow row = *(SpellCustomAttributesRow*)rowPtr;
        ClientLua::PushNumber(L, row.spellId);
        ClientLua::PushNumber(L, row.customAttr0);
        return numColumns;
    }
};
