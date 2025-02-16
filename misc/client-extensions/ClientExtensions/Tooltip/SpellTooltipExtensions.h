#pragma once
#include "TooltipDefines.h"

namespace CFormula {
    CLIENT_FUNCTION(GetVariableValue, 0x5782D0, __thiscall, int, (void*, uint32_t, uint32_t, SpellRow*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))
}

namespace CGTooltip {
    CLIENT_FUNCTION(GetDurationString, 0x61A9E0, __cdecl, void, (char*, uint32_t, uint64_t, char*, uint32_t, uint32_t, uint32_t))
}

class TooltipExtensions {
private:
    static void Apply();
    static void SetNewVariablePointers();
    static void SetRuneCostTooltip(char* dest, char* buff, SpellRuneCostRow* row, uint32_t* spellFamily);
    static void SetPowerCostTooltip(char* dest, SpellRow* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRow* powerDisplayRow);
    static void SetSpellCooldownTooltip(char* dest, SpellRow* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost);
    static void SetSpellRemainingCooldownTooltip(char* dest, SpellRow* spell, void* _this, uint32_t currentCooldown);
    static void SpellTooltipVariableExtension();
    static void SpellTooltipRuneCostExtension();
    static void SpellTooltipPowerCostExtension();
    static void SpellTooltipCooldownExtension();
    static void SpellTooltipRemainingCooldownExtension();
    
    static void AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer);
    static int __fastcall GetVariableValueEx(void* _this, uint32_t edx, uint32_t spellVariable, uint32_t a3, SpellRow* spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9);
    friend class ClientExtensions;
};

struct RuneData {
    char* costKey;
    int count;
};
