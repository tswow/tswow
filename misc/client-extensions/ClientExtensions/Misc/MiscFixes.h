#pragma once

#include "SharedDefines.h"

class MiscFixes {
private:
    static void Apply();
    static bool __fastcall ShouldObjectFadeIn(CGObject* _this, uint32_t unused);
    static void UpdateObjectVtable();
    friend class ClientExtensions;
};
