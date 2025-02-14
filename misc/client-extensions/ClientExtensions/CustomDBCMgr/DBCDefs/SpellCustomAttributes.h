#pragma optimize("", off)
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
        SpellCustomAttributesRow* row = static_cast<SpellCustomAttributesRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalDBCMap.addRow("SpellCustomAttributes", row->spellID, *row);
            ++row;
        }
    };
};
#pragma optimize("", on)
