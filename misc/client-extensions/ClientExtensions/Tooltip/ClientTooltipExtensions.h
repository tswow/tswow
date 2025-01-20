#pragma once
#include "ClientTooltipDefines.h"

CLIENT_FUNCTION(GetVariableValue, 0x5782D0, __fastcall, int, (uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))

class TooltipExtensions {
private:
    static void Apply();
    static void SetNewVariablePointers();
    static void SpellTooltipVariableExtension();
    static int __fastcall GetVariableValueEx(uint32_t a0, uint32_t a1, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9);
    friend class ClientExtensions;
};
