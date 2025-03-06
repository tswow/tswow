#pragma once

#include "SharedDefines.h"

class MiscFixes {
public:
    static void SetYearOffsetMultiplier();
private:
    static void Apply();
    static bool __fastcall ShouldObjectFadeIn(CGObject* _this, uint32_t unused);
    static void UpdateObjectVtable();
    static void UpdateWoWTimeFunctions();

    static char* GetTimeString(WoWTime* a1, char* a2, uint32_t a3);
    static void PackTimeDataToDword(uint32_t* packedTime, int32_t minute, int32_t hour, int32_t weekDay, int32_t monthDay, int32_t month, int32_t year, int32_t flags);
    static void PackWoWTimeToDword(uint32_t* dword, WoWTime* time);
    static void UnpackWoWTime(uint32_t packedTime, int32_t* minute, int32_t* hour, int32_t* weekDay, int32_t* monthDay, int32_t* month, int32_t* year, int32_t* flags);

    friend class ClientExtensions;

    static inline uint32_t yearOffsetMult = 0;
};
