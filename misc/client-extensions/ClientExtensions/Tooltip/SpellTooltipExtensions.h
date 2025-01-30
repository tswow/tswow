#pragma once
#include "TooltipDefines.h"

class SpellTooltipExtensions {
private:
    static void Apply();
    static void SetRuneCostTooltip(char* dest, char* buff, uint32_t* row, uint32_t* spellFamily);
    static void SpellTooltipRuneCostExtension();
    static void AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer);
    friend class ClientExtensions;
};

struct RuneData
{
    char* costKey;
    int count;
};
