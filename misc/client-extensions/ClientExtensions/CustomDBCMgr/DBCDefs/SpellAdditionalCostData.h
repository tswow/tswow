#pragma once
#include "CustomDBCMgr/CustomDBC.h"
#include <string>
#include "Logger.h"

struct SpellAdditionalCostDataRow {
    int entry;
    void* name;
    int playerKillingAllowed;
    int roleplaying;
};

class SpellAdditionalCostData : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.dbc";
     SpellAdditionalCostData() : CustomDBC(){
        this->numColumns = 4;
        this->rowSize = 16;
    }
    void LoadDB(){
        CustomDBC::LoadDB(this->fileName);
        SpellAdditionalCostDataRow* row = (SpellAdditionalCostDataRow*)CustomDBC::GetRow(2);
        LOG_DEBUG << row->entry;
        //LOG_DEBUG << (char*)this->stringTable[row->name];// idk how to get strings yet. this is just an idea.
        LOG_DEBUG << row->playerKillingAllowed;
        LOG_DEBUG << row->roleplaying;
        };
};

