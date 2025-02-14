#pragma once
#include "TooltipDefines.h"

class SpellTooltipExtensions {
private:
    static void Apply();
    static void SetPowerCostTooltip(char* dest, SpellRow* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRow* powerDisplayRow);
    static void SetRuneCostTooltip(char* dest, char* buff, SpellRuneCostRow* row, uint32_t* spellFamily);
    static void SetSpellCooldownTooltip(char* dest, SpellRow* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost);
    static void SpellTooltipCooldownExtension();
    static void SpellTooltipPowerCostExtension();
    static void SpellTooltipRuneCostExtension();
    static void AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer);
    friend class ClientExtensions;
};

struct RuneData
{
    char* costKey;
    int count;
};
