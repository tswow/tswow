#pragma once

#include "SharedDefines.h"
#include "CustomDBC.h"
#include <iostream>
#include <map>
#include <string>

class ClientDB {
private:
    static void Load();
    static CustomDBC* GetDBC(char* dbcName);
    int handleLua(lua_State* L, char* dbcName, int index);
    friend class ClientExtensions;
};
