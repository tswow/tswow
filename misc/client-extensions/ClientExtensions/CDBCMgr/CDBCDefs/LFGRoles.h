#pragma optimize("", off)
#include "CDBCMgr/CDBC.h"
#include "CDBCMgr/CDBCMgr.h"

struct LFGRolesRow {
    uint32_t ClassID;
    uint32_t Roles;

    int handleLuaPush(lua_State* L) {
        ClientLua::PushNumber(L, ClassID);
        ClientLua::PushNumber(L, Roles);
        return 2;
    }
};

class LFGRoles : public CDBC {
public:
    const char* fileName = "DBFilesClient\\LFGRoles.cdbc";
    LFGRoles() : CDBC() {
        this->numColumns = sizeof(LFGRolesRow) / 4;
        this->rowSize = sizeof(LFGRolesRow);
    }

    LFGRoles* LoadDB() {
        GlobalCDBCMap.addCDBC("LFGRoles");
        CDBC::LoadDB(this->fileName);
        LFGRoles::setupTable();
        CDBCMgr::addCDBCLuaHandler("LFGRoles", LFGRoles::handleLua);
        return this;
    };

    void LFGRoles::setupTable() {
        LFGRolesRow* row = static_cast<LFGRolesRow*>(this->rows);
        for (uint32_t i = 0; i < this->numRows; i++) {
            GlobalCDBCMap.addRow("LFGRoles", row->ClassID, *row);
            ++row;
        }
    };

    static int handleLua(lua_State* L, int row) {
        LFGRolesRow* r = GlobalCDBCMap.getRow<LFGRolesRow>("LFGRoles", row);
        if (r) return r->handleLuaPush(L);
        return 0;
    }
};
#pragma optimize("", on)
