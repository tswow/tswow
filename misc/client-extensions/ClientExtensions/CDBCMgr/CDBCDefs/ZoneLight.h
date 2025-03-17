#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct ZoneLightRow {
    int32_t ID;
    char* name;
    int32_t mapID;
    int32_t lightID;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, ID);
        ClientLua::PushString(L, name);
        ClientLua::PushNumber(L, mapID);
        ClientLua::PushNumber(L, lightID);
        return 4;
    }
};

class ZoneLight : public CDBC {
public:
    const char* fileName = "DBFilesClient\\ZoneLight.cdbc";
    ZoneLight() : CDBC() {
        this->numColumns = sizeof(ZoneLightRow) / 4;
        this->rowSize = sizeof(ZoneLightRow);
    }

    ZoneLight* LoadDB() { 
        GlobalCDBCMap.addCDBC("ZoneLight");
        CDBC::LoadDB(this->fileName);
        ZoneLight::setupStringsAndTable();
        CDBCMgr::addCDBCLuaHandler("ZoneLight", ZoneLight::handleLua);
        GlobalCDBCMap.setIndexRange("ZoneLight", this->minIndex, this->maxIndex);
        return this;
    };

    void ZoneLight::setupStringsAndTable() {
        ZoneLightRow* row = static_cast<ZoneLightRow*>(this->rows);
        uintptr_t stringTable = reinterpret_cast<uintptr_t>(this->stringTable);
        for (uint32_t i = 0; i < this->numRows; i++) {
            row->name = reinterpret_cast<char*>(stringTable + reinterpret_cast<uintptr_t>(row->name));
            GlobalCDBCMap.addRow("ZoneLight", row->ID, *row);
            ++row;
        }
    };

    static int handleLua(lua_State* L, int row) {
        ZoneLightRow* r = GlobalCDBCMap.getRow<ZoneLightRow>("ZoneLight", row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};

#pragma optimize("", on)
