#pragma once
#include "TooltipDefines.h"

class TooltipExtensions {
private:
    static void Apply();
    static void SetRuneCostTooltip(char* dest, char* buff, uint32_t* row, uint32_t* spellFamily);
    static void SpellTooltipRuneCostExtension();
    friend class ClientExtensions;
};
