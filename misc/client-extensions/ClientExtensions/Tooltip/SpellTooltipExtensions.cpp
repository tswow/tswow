#include "SpellTooltipExtensions.h"
#include "windows.h"

void SpellTooltipExtensions::Apply()
{
    SpellTooltipRuneCostExtension();
}

// Assembly patch bytes
constexpr uint8_t PATCH_BYTES[34] = {0x8D, 0x9D, 0xB8, 0xFD, 0xFF, 0xFF, 0x53, 0x8D, 0x06, 0x50, 0x8D, 0x8D,
                                     0xA0, 0xFE, 0xFF, 0xFF, 0x51, 0x8D, 0x95, 0x20, 0xFF, 0xFF, 0xFF, 0x52,
                                     0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0x4B, 0x02, 0x00, 0x00};

    // patch memory to skip existing code printing rune display and call dll function instead
    // patched code:            // some explainations may not be really correct but whatever
    // lea ebx, [ebp - 0x248]   // ebp - 584 = address in memory of m_SpellClassSet of currently checked spell 
    // push ebx                 // spellFamily
    // lea eax, [esi];          // esi = address of used SpellRuneCost.dbc row
    // push eax;                // row
    // lea ecx, [ebp - 0x160];  // ebp - 352 = address where loaded string is stored
    // push ecx;                // buff
    // lea edx, [ebp - 0xE0];   // ebp - 224 = address where tooltip text is copied char by char
    // push edx;                // dest
    // call function;           // SetRuneCostTooltip(dest, buff, row, spellFamily)
    // jmp loc_623EDE;          // skip remaining code to loc_623EDE

void SpellTooltipExtensions::SpellTooltipRuneCostExtension() {
    DWORD oldProtect;
    // Change memory protection to allow writing
    VirtualProtect(reinterpret_cast<void*>(0x623C71), 0x22, PAGE_EXECUTE_READWRITE, &oldProtect);
    // Apply the patch bytes
    std::memcpy(reinterpret_cast<void*>(0x623C71), PATCH_BYTES, sizeof(PATCH_BYTES));
    // Calculate and write the relative address for the function call
    uintptr_t callAddress = reinterpret_cast<uintptr_t>(&SetRuneCostTooltip) - 0x623C8E;
    *reinterpret_cast<uint32_t*>(0x623C8A) = static_cast<uint32_t>(callAddress);
    // Restore the original memory protection
    VirtualProtect(reinterpret_cast<void*>( 0x623C71), 0x22, oldProtect, &oldProtect); 
}

void SpellTooltipExtensions::AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer) {
    char* sRuneCost = FrameScript_GetText(runeCostKey, -1, 0);
    SStrPrintf(buff, 128, sRuneCost, runeCount); // sizeof(buff)
    SStrCopy_0(destBuffer, buff, 0x7FFFFFFF);
}

void SpellTooltipExtensions::SetRuneCostTooltip(char* dest, char* buff, uint32_t* row, uint32_t* spellFamily) {
    int32_t m_RuneBlood = *(row + 1);
    int32_t m_RuneUnholy = *(row + 2);
    int32_t m_RuneFrost  = *(row + 3);
    int32_t m_RunicPower = *(row + 4); // unused in stock code but defining it anywas

    RuneData dkRunes[] = {
        {"RUNE_COST_BLOOD", m_RuneBlood},
        {"RUNE_COST_UNHOLY", m_RuneUnholy},
        {"RUNE_COST_FROST", m_RuneFrost}
    };

    bool addSpace = false;

    for (const auto& rune : dkRunes) {
        if (rune.count > 0)
        {
            if (addSpace)
                SStrCopy_0(dest, sSpace, 0x7FFFFFFF);

            AppendRuneCost(rune.costKey, rune.count, buff, dest);
            addSpace = true;
        }
    }
};
