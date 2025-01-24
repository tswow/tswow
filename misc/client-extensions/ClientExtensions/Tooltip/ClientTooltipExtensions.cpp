#include "ClientTooltipExtensions.h"
#include "windows.h"
#include "Logger.h"

void TooltipExtensions::Apply() {
    SpellTooltipVariableExtension();
    SpellTooltipRuneCostExtension();
    return;
}

void TooltipExtensions::SpellTooltipVariableExtension() {
    DWORD flOldProtect = 0;

    // change pointer to table with variables
    VirtualProtect((LPVOID)0x576B63, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(0x576B63) = reinterpret_cast<uint32_t>(&spellVariables);
    VirtualProtect((LPVOID)0x576B63, 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    // update number of entries value
    VirtualProtect((LPVOID)0x576B7C, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(0x576B7C) = (sizeof(spellVariables) / 4);
    VirtualProtect((LPVOID)0x576B7C, 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    // copy table of pointers from address to spellVariables vector and add new entries
    memcpy(&spellVariables, (const void*)0xACE8F8, sizeof(uint32_t) * 140);
    SetNewVariablePointers();
    // change pointer of GetVariableTableValue to pointer to extended function
    VirtualProtect((LPVOID)0x578E8B, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(0x578E8B) = (reinterpret_cast<uint32_t>(&GetVariableValueEx) - 0x578E8F);
    VirtualProtect((LPVOID)0x578E8B, 0x4, PAGE_EXECUTE_READ, &flOldProtect);

    return;
}

void TooltipExtensions::SpellTooltipRuneCostExtension() {
    DWORD flOldProtect = 0;
    // used code is stored as an array of literals, deal with it lol
    uint8_t characters[34] = {
        0x8D, 0x9D, 0xB8, 0xFD, 0xFF, 0xFF, 0x53, 0x8D, 0x06, 0x50, 0x8D, 0x8D, 0xA0, 0xFE, 0xFF, 0xFF,
        0x51, 0x8D, 0x95, 0x20, 0xFF, 0xFF, 0xFF, 0x52, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0x4B, 0x02,
        0x00, 0x00
    };

    // patch memory to skip existing code printing rune display and call dll function instead
    // used code:               // some explainations may not be really correct but whatever
    // lea ebx, [ebp - 0x248]   // ebp - 584 = address in memory of m_SpellClassSet of currently checked spell 
    // push ebx                 // spellFamily
    // lea eax, [esi];          // esi = address of used SpellRuneCost.dbc row
    // push eax;                // row
    // lea ecx, [ebp - 0x160];  // ebp - 352 = address where loaded string is stored
    // push ecx;                // buff
    // lea edx, [ebp - 0xE0];   // ebp - 224 = address where tooltip text is copied char by char
    // push edx;                // dest
    // call function;           // SetRuneCostTooltip(dest, buff, row, spellFamily)
    // jmp loc_623CD9;          // skip remaining code to loc_623CD9

    VirtualProtect((LPVOID)0x623C71, 0x22, PAGE_EXECUTE_READWRITE, &flOldProtect);
    for (uint8_t i = 0; i < 34; i++)
        *reinterpret_cast<uint8_t*>(0x623C71 + i) = characters[i];
    // now write proper address for call function
    *reinterpret_cast<uint32_t*>(0x623C8A) = (reinterpret_cast<uint32_t>(&SetRuneCostTooltip) - 0x623C8E);
    VirtualProtect((LPVOID)0x623C71, 0x22, PAGE_EXECUTE_READ, &flOldProtect);

    return;
}

int TooltipExtensions::GetVariableValueEx(uint32_t a0, uint32_t a1, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9) {
    uint32_t result = 0;

    if (spellVariable < SPELLVARIABLE_hp)
        result = CFormula__GetVariableValue(a0, a1, spellVariable, a3, spell, a5, a6, a7, a8, a9);
    else {
        float value = 0.f;
        uint32_t* ActivePlayer = reinterpret_cast<uint32_t*>(ClntObjMgrObjectPtr(ClntObjMgrGetActivePlayer(), TYPEMASK_PLAYER));

        if (ActivePlayer) {
            switch (spellVariable) {
                case SPELLVARIABLE_hp:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_HP));
                    break;
                case SPELLVARIABLE_HP:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_HP));
                    break;
                case SPELLVARIABLE_ppl1:
                case SPELLVARIABLE_PPL1:
                    // Real points per level, EFFECT_0
                    value = *reinterpret_cast<float*>(spell + 308);
                    break;
                case SPELLVARIABLE_ppl2:
                case SPELLVARIABLE_PPL2:
                    // Real points per level, EFFECT_1
                    value = *reinterpret_cast<float*>(spell + 312);
                    break;
                case SPELLVARIABLE_ppl3:
                case SPELLVARIABLE_PPL3:
                    // Real points per level, EFFECT_2
                    value = *reinterpret_cast<float*>(spell + 316);
                    break;
                case SPELLVARIABLE_power1:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_MANA));
                    break;
                case SPELLVARIABLE_power2:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_RAGE));
                    break;
                case SPELLVARIABLE_power3:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_FOCUS));
                    break;
                case SPELLVARIABLE_power4:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_ENERGY));
                    break;
                case SPELLVARIABLE_power5:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_HAPPINESS));
                    break;
                case SPELLVARIABLE_power6:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_RUNES));
                    break;
                case SPELLVARIABLE_power7:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_RUNIC_POWER));
                    break;
                case SPELLVARIABLE_POWER1:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_MANA));
                    break;
                case SPELLVARIABLE_POWER2:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_RAGE));
                    break;
                case SPELLVARIABLE_POWER3:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_FOCUS));
                    break;
                case SPELLVARIABLE_POWER4:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_ENERGY));
                    break;
                case SPELLVARIABLE_POWER5:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_HAPPINESS));
                    break;
                case SPELLVARIABLE_POWER6:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_RUNES));
                    break;
                case SPELLVARIABLE_POWER7:
                    value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_RUNIC_POWER));
                    break;
                default:
                    a1 = 1;
                    break;
            }
        }

        result = a3;
        uint32_t* offset = reinterpret_cast<uint32_t*>(a3 + 128);
        --*offset;
        *reinterpret_cast<float*>(a3 + 4 * *offset) = value;
    }

    return result;
}

void TooltipExtensions::SetNewVariablePointers() {
    spellVariables[140] = reinterpret_cast<uint32_t>(&"hp");
    spellVariables[141] = reinterpret_cast<uint32_t>(&"HP");
    spellVariables[142] = reinterpret_cast<uint32_t>(&"ppl1");
    spellVariables[143] = reinterpret_cast<uint32_t>(&"ppl2");
    spellVariables[144] = reinterpret_cast<uint32_t>(&"ppl3");
    spellVariables[145] = reinterpret_cast<uint32_t>(&"PPL1");
    spellVariables[146] = reinterpret_cast<uint32_t>(&"PPL2");
    spellVariables[147] = reinterpret_cast<uint32_t>(&"PPL3");
    spellVariables[148] = reinterpret_cast<uint32_t>(&"power1");
    spellVariables[149] = reinterpret_cast<uint32_t>(&"power2");
    spellVariables[150] = reinterpret_cast<uint32_t>(&"power3");
    spellVariables[151] = reinterpret_cast<uint32_t>(&"power4");
    spellVariables[152] = reinterpret_cast<uint32_t>(&"power5");
    spellVariables[153] = reinterpret_cast<uint32_t>(&"power6");
    spellVariables[154] = reinterpret_cast<uint32_t>(&"power7");
    spellVariables[155] = reinterpret_cast<uint32_t>(&"POWER1");
    spellVariables[156] = reinterpret_cast<uint32_t>(&"POWER2");
    spellVariables[157] = reinterpret_cast<uint32_t>(&"POWER3");
    spellVariables[158] = reinterpret_cast<uint32_t>(&"POWER4");
    spellVariables[159] = reinterpret_cast<uint32_t>(&"POWER5");
    spellVariables[160] = reinterpret_cast<uint32_t>(&"POWER6");
    spellVariables[161] = reinterpret_cast<uint32_t>(&"POWER7");

    return;
}

void TooltipExtensions::SetRuneCostTooltip(uint32_t dest, uint32_t buff, uint32_t* row, uint32_t* spellFamily) {
    if (*(spellFamily) == 15) {
        if (*(row + 1)) {
            SStrPrintf(buff, 128, FrameScript_GetText("RUNE_COST_DEATH", -1, 0), *(row + 1));
            SStrCopy_0(dest, buff, 0x7FFFFFFF);
            if (*(row + 1) != 1)
                SStrCopy_0(dest, (int)"s", 0x7FFFFFFF);
            if (*reinterpret_cast<int32_t*>(row + 4) < 0) {
                SStrCopy_0(dest, (int)" + ", 0x7FFFFFFF);
                SStrPrintf(buff, 128, FrameScript_GetText("RUNIC_POWER_COST", -1, 0), (*(row + 4) * -1 / 10));
                SStrCopy_0(dest, buff, 0x7FFFFFFF);
            }
        }
    }
    else {
        if (*(row + 1)) {
            SStrPrintf(buff, 128, FrameScript_GetText("RUNE_COST_BLOOD", -1, 0), *(row + 1));
            SStrCopy_0(dest, buff, 0x7FFFFFFF);
            if (*(row + 2) || *(row + 3))
                SStrCopy_0(dest, 0x9E1050, 0x7FFFFFFF);
        }
        if (*(row + 2)) {
            SStrPrintf(buff, 128, FrameScript_GetText("RUNE_COST_UNHOLY", -1, 0), *(row + 2));
            SStrCopy_0(dest, buff, 0x7FFFFFFF);
            if (*(row + 2) || *(row + 3))
                SStrCopy_0(dest, 0x9E1050, 0x7FFFFFFF);
        }
        if (*(row + 3)) {
            SStrPrintf(buff, 128, FrameScript_GetText("RUNE_COST_FROST", -1, 0), *(row + 3));
            SStrCopy_0(dest, buff, 0x7FFFFFFF);
        }
    }

    return;
};
