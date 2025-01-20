#include "ClientTooltipExtensions.h"
#include "windows.h"
#include "Logger.h"

void TooltipExtensions::Apply() {
    SpellTooltipVariableExtension();
    return;
}

void TooltipExtensions::SpellTooltipVariableExtension() {
    DWORD flOldProtect = 0;

    // change pointer to table with variables
    VirtualProtect((LPVOID)0x576B63, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *(uint32_t*)0x576B63 = reinterpret_cast<uint32_t>(&spellVariables);
    VirtualProtect((LPVOID)0x576B63, 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    // update number of entries value
    VirtualProtect((LPVOID)0x576B7C, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *(uint32_t*)0x576B7C = (sizeof(spellVariables) / 4);
    VirtualProtect((LPVOID)0x576B7C, 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    // copy table of pointers from address to spellVariables vector and add new entries
    memcpy(&spellVariables, (const void*)0xACE8F8, sizeof(uint32_t) * 140);
    SetNewVariablePointers();
    // change pointer of GetVariableTableValue to pointer to extended function
    VirtualProtect((LPVOID)0x578E8B, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *(uint32_t*)0x578E8B = (reinterpret_cast<uint32_t>(&GetVariableValueEx) - 0x578E8F);
    VirtualProtect((LPVOID)0x578E8B, 0x4, PAGE_EXECUTE_READ, &flOldProtect);

    return;
}

int TooltipExtensions::GetVariableValueEx(uint32_t a0, uint32_t a1, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9) {
    uint32_t result = 0;

    if (spellVariable < SPELLVARIABLE_hp)
        result = GetVariableValue(a0, a1, spellVariable, a3, spell, a5, a6, a7, a8, a9);
    else {
        float value = 0.f;
        uint32_t* ActivePlayer = reinterpret_cast<uint32_t*>(ClntObjMgrObjectPtr(ClntObjMgrGetActivePlayer(), TYPEMASK_PLAYER));

        if (ActivePlayer) {
            switch (spellVariable) {
                case SPELLVARIABLE_hp:
                    // $hp = current hp
                    value = static_cast<float>(*(int32_t*)(*(ActivePlayer + 52) + 72));
                    break;
                case SPELLVARIABLE_HP:
                    // $HP = max hp
                    value = static_cast<float>(*(int32_t*)(*(ActivePlayer + 52) + 104));
                    break;
                case SPELLVARIABLE_ppl1:
                case SPELLVARIABLE_PPL1:
                    value = *((float*)(spell + 308));
                    break;
                case SPELLVARIABLE_ppl2:
                case SPELLVARIABLE_PPL2:
                    value = *((float*)(spell + 312));
                    break;
                case SPELLVARIABLE_ppl3:
                case SPELLVARIABLE_PPL3:
                    value = *((float*)(spell + 316));
                    break;
                default:
                    break;
            }
        }

        result = a3;
        --*(uint32_t*)(a3 + 128);
        *(float*)(a3 + 4 * *(uint32_t*)(a3 + 128)) = value;
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

    return;
}
