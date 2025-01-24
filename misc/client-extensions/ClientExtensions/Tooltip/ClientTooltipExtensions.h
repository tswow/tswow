#pragma once
#include "ClientTooltipDefines.h"

CLIENT_FUNCTION(CFormula__GetVariableValue, 0x5782D0, __fastcall, int, (uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))

class TooltipExtensions {
private:
    static void Apply();
    static void SetNewVariablePointers();
    static void SetRuneCostTooltip(char* dest, char* buff, uint32_t* row, uint32_t* spellFamily);
    static void SpellTooltipVariableExtension();
    static void SpellTooltipRuneCostExtension();
    static void AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer);
    static int __fastcall GetVariableValueEx(uint32_t a0, uint32_t a1, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9);
    friend class ClientExtensions;
};

struct RuneData {
    char* costKey;
    int count;
};