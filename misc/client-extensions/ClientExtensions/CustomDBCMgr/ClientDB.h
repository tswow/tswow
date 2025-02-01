#pragma once

#include "SharedDefines.h"
#include "DBCDefs/SpellAdditionalCostData.h"

class ClientDB {
private:
    static void Load();
    friend class ClientExtensions;
};
