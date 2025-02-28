#include "MiscFixes.h"
#include "Logger.h"

#include <ctime>

void MiscFixes::Apply() {
    UpdateObjectVtable();
    UpdateWoWTimeFunctions();
}

void MiscFixes::UpdateObjectVtable() {
    Util::OverwriteUInt32AtAddress(0x9F3B54, reinterpret_cast<uint32_t>(&ShouldObjectFadeIn));
}

void MiscFixes::UpdateWoWTimeFunctions() {
    // Makes WoWTime::PackToDword call MiscFixes::PackWoWTimeToDword from within instead of running original code
    uint8_t byteArray[] = {0x8B, 0x55, 0x08, 0x50, 0x52, 0xE8, 0x00, 0x00, 0x00, 0x00, 0x83, 0xC4, 0x08, 0x5D, 0xC3};
    Util::OverwriteBytesAtAddress(0x76CA56, byteArray, sizeof(byteArray));
    Util::OverwriteUInt32AtAddress(0x76CA5C, (uint32_t)&PackWoWTimeToDword - 0x76CA60);
    // Changes all sub_76C970 calls to MiscFixes::PackWoWTimeToDword
    Util::OverwriteUInt32AtAddress(0x76CAD4, (uint32_t)&UnpackWoWTime - 0x76CAD8);
    Util::OverwriteUInt32AtAddress(0x76CB19, (uint32_t)&UnpackWoWTime - 0x76CB1D);
    Util::OverwriteUInt32AtAddress(0x76CB93, (uint32_t)&UnpackWoWTime - 0x76CB97);
}

bool MiscFixes::ShouldObjectFadeIn(CGObject* _this, uint32_t unused) {
    uint32_t type = _this->ObjectData->OBJECT_FIELD_TYPE;

    if (type == TYPEMASK_UNIT)
        return CGUnit_C::ShouldFadeIn(reinterpret_cast<CGUnit*>(_this));
    else
        return 1;
}

void MiscFixes::PackWoWTimeToDword(uint32_t* dword, WoWTime* time) {
    uint32_t temp = 0;
    temp += time->minute & 63;
    temp += (time->hour & 31) << 6;
    temp += (time->weekDay & 7) << 11;
    temp += (time->monthDay & 63) << 14;
    temp += (time->month & 15) << 20;
    temp += time->year >= 31 ? 31 << 24 : (time->year & 31) << 24;
    temp += (time->flags & 3) << 29;

    *dword = temp;
}

void MiscFixes::UnpackWoWTime(uint32_t packedTime, uint32_t* minute, uint32_t* hour, uint32_t* weekDay, uint32_t* monthDay, uint32_t* month, uint32_t* year, uint32_t* flags) {
    time_t now = time(0);
    tm* ltm = localtime(&now);

    if (minute) {
        if ((packedTime & 63) == 63)
            *minute = -1;
        else
            *minute = packedTime & 63;
    }

    if (hour) {
        if (((packedTime >> 6) & 31) == 31)
            *hour = -1;
        else
            *hour = (packedTime >> 6) & 31;
    }

    if (weekDay) {
        if (((packedTime >> 11) & 7) == 7)
            *weekDay = -1;
        else
            *weekDay = (packedTime >> 11) & 7;
    }

    if (monthDay) {
        if (((packedTime >> 14) & 63) == 63)
            *monthDay = -1;
        else
            *monthDay = (packedTime >> 14) & 63;
    }

    if (month) {
        if (((packedTime >> 20) & 15) == 15)
            *month = -1;
        else
            *month = (packedTime >> 20) & 15;
    }

    if (year) {
        if (((packedTime >> 24) & 31) == 31)
            *year = ltm->tm_year - 100;
        else
            *year = (packedTime >> 24) & 31;
    }

    if (flags) {
        if (((packedTime >> 29) & 3) == 3)
            *flags = -1;
        else
            *flags = (packedTime >> 29) & 3;
    }
}
