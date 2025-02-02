#pragma once

#include "SharedDefines.h"
#include "CustomDBC.h"
#include <iostream>
#include <map>
#include <string>

class ClientDB {
private:
    static void Load();
    static CustomDBC getDBC(char* dbcName);
    friend class ClientExtensions;
};
