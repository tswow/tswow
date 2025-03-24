#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct ZoneLightPointRow {
    int32_t ID;
    int32_t zoneLightID;
    float positionX;
    float positionY;
    int32_t pointOrder;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, ID);
        ClientLua::PushNumber(L, zoneLightID);
        ClientLua::PushNumber(L, positionX);
        ClientLua::PushNumber(L, positionY);
        ClientLua::PushNumber(L, pointOrder);
        return 5;
    }
};

class ZoneLightPoint : public CDBC {
public:
    const char* fileName = "ZoneLightPoint";
    ZoneLightPoint() : CDBC() {
        this->numColumns = sizeof(ZoneLightPointRow) / 4;
        this->rowSize = sizeof(ZoneLightPointRow);
    }

    ZoneLightPoint* LoadDB() {
        GlobalCDBCMap.addCDBC(this->fileName);
        CDBC::LoadDB(this->fileName);
        ZoneLightPoint::setupTable();
        CDBCMgr::addCDBCLuaHandler(this->fileName, [this](lua_State* L, int row) {return this->handleLua(L, row); });
        GlobalCDBCMap.setIndexRange(this->fileName, this->minIndex, this->maxIndex);
        return this;
    }

    void ZoneLightPoint::setupTable() {
        ZoneLightPointRow* row = static_cast<ZoneLightPointRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalCDBCMap.addRow(this->fileName, row->ID, *row);
            ++row;
        }
    };

    int handleLua(lua_State* L, int row) {
        ZoneLightPointRow* r = GlobalCDBCMap.getRow<ZoneLightPointRow>(this->fileName, row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};

#pragma optimize("", on)
