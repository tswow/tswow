#pragma once
#include "CustomDBCMgr/CustomDBC.h"

struct SpellCustomAttributesRow {
    int spellID;
    uint32_t customAttr0;
};

class SpellCustomAttributes : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellCustomAttributes.dbc";
    SpellCustomAttributes() {
        this->numColumns = 2;
        this->rowSize = 8;
    }

    SpellCustomAttributes* LoadDB() {
        GlobalDBCMap.addDBC("SpellCustomAttributes");
        CustomDBC::LoadDB(this->fileName);
        SpellCustomAttributes::setupTable();
        return this;
    }

    void SpellCustomAttributes::setupTable() {
        uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            SpellCustomAttributesRow* row = (SpellCustomAttributesRow*)ptr;
            GlobalDBCMap.addRow("SpellCustomAttributes", row->spellID, *row);
            ptr += this->numColumns;
        }
    };
};
