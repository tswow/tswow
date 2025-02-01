#pragma once

#include "SharedDefines.h"
#include "CustomDBCMgr/CustomDBC.h"

class ClientDB {
private:
    static void Load();
    friend class ClientExtensions;
};
