#pragma once

#include "SharedDefines.h"

class MiscFixes {
private:
    static void Apply();
    static bool __fastcall ShouldObjectFadeIn(CGObject* _this, uint32_t unused);
    static void UpdateObjectVtable();
    static void UpdateWoWTimeFunctions();

    static void PackWoWTimeToDword(uint32_t* dword, WoWTime* time);
    static void UnpackWoWTime(uint32_t packedTime, uint32_t* minute, uint32_t* hour, uint32_t* weekDay, uint32_t* monthDay, uint32_t* month, uint32_t* year, uint32_t* flags);

    friend class ClientExtensions;
};
