#pragma once
#include "CustomDBCMgr/CustomDBC.h"
#include <string>
#include "Logger.h"

class SpellAdditionalCostData : public CustomDBC {
public:
    const char* fileName = "DBFilesClient\\SpellAdditionalCostData.dbc";
     SpellAdditionalCostData() : CustomDBC(){
        this->numColumns = 4;
        this->rowSize = 16;
    }
    void LoadDB(){
        LOG_DEBUG << "PRELOAD";
        CustomDBC::LoadDB(this->fileName);
        LOG_DEBUG << "POSTLOAD";
        };
};
