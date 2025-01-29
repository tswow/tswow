#pragma once

#include "SharedDefines.h"
#include "CustomDBC.h"

CLIENT_FUNCTION(ClientDB__RegisterBase, 0x6337D0, __fastcall, uint32_t, (uint32_t))

class ClientDB {
private:
    static void Apply();
    static uint32_t __fastcall RegisterBaseEx(uint32_t a);
    friend class ClientExtensions;
};
