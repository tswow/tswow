#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct SpellEffectScalarsRow {
    int spellID;
    int effectIdx;
    float sp;
    float ap;
    float bv;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, spellID);
        ClientLua::PushNumber(L, effectIdx);
        ClientLua::PushNumber(L, sp);
        ClientLua::PushNumber(L, ap);
        ClientLua::PushNumber(L, bv);
        return 5;
    }
};

class SpellEffectScalars : public CDBC {
public:
    const char* fileName = "SpellEffectScalars";
    SpellEffectScalars() : CDBC() {
        this->numColumns = sizeof(SpellEffectScalarsRow)/4;
        this->rowSize = sizeof(SpellEffectScalarsRow);
    }

    SpellEffectScalars* LoadDB() {
        GlobalCDBCMap.addCDBC(this->fileName);
        CDBC::LoadDB(this->fileName);
        SpellEffectScalars::setupTable();
        CDBCMgr::addCDBCLuaHandler(this->fileName, [this](lua_State* L, int row) {return this->handleLua(L, row); });
        GlobalCDBCMap.setIndexRange(this->fileName, this->minIndex, this->maxIndex);
        return this;
    }

    void SpellEffectScalars::setupTable() {
        SpellEffectScalarsRow* row = static_cast<SpellEffectScalarsRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalCDBCMap.addRow(this->fileName, i, *row);
            ++row;
        }
    };

    int handleLua(lua_State* L, int row) {
        SpellEffectScalarsRow* r = GlobalCDBCMap.getRow<SpellEffectScalarsRow>(this->fileName, row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)
