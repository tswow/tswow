#pragma once
#include "TooltipDefines.h"

namespace CFormula {
    CLIENT_FUNCTION(GetVariableValue, 0x5782D0, __thiscall, int, (uint32_t*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))
}

namespace CGTooltip {
    CLIENT_FUNCTION(GetDurationString, 0x61A9E0, __cdecl, void, (char*, uint32_t, uint64_t, char*, uint32_t, uint32_t, uint32_t))
}

class TooltipExtensions {
private:
    static void Apply();
    static void SetNewVariablePointers();
    static void SetRuneCostTooltip(char* dest, char* buff, SpellRuneCostRec* row, uint32_t* spellFamily);
    static void SetPowerCostTooltip(char* dest, SpellRec* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRec* powerDisplayRow);
    static void SetSpellCooldownTooltip(char* dest, SpellRec* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost);
    static void SetSpellRemainingCooldownTooltip(char* dest, SpellRec* spell, void* _this, uint32_t currentCooldown);
    static void SpellTooltipVariableExtension();
    static void SpellTooltipRuneCostExtension();
    static void SpellTooltipPowerCostExtension();
    static void SpellTooltipCooldownExtension();
    static void SpellTooltipRemainingCooldownExtension();
    
    static void AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer);
    static int __fastcall GetVariableValueEx(uint32_t* _this, uint32_t edx, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9);
    friend class ClientExtensions;
};

struct RuneData {
    char* costKey;
    int count;
};
