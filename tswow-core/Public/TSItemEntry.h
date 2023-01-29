#pragma once

#include "TSMain.h"

class TC_GAME_API TSItemEntry
{
public:
    TSItemEntry(uint32 entry, uint32 count);
    TSItemEntry() = default;
    TSNumber<uint32> GetEntry();
    TSNumber<uint32> GetCount();
private:
    uint32 m_entry;
    uint32 m_count;
};

TC_GAME_API TSItemEntry CreateItemEntry(uint32 entry, uint32 count);