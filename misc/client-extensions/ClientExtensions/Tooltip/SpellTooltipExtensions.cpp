#include "SpellTooltipExtensions.h"
#include "Character/CharacterDefines.h"
#include "CustomDBCMgr/CustomDBCMgr.h"
#include "CustomDBCMgr/DBCDefs/SpellAdditionalCostData.h"
#include "windows.h"
#include "Logger.h"

// Aleist3r: keeping it here as an example how to grab custom data
// SpellAdditionalCostDataRow* row = GlobalDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", 2);
// if (row) {
//     LOG_DEBUG << "Spell ID: " << row->spellID << " resourceName: " << row->resourceName<< " Cost: " << row->cost<< " flag: " << row->flag;
// } else {
//      LOG_DEBUG << "Row not found!";
// }

void TooltipExtensions::Apply() {
    SpellTooltipVariableExtension();
    SpellTooltipRuneCostExtension();
}

void TooltipExtensions::SpellTooltipVariableExtension() {
    DWORD flOldProtect = 0;

    // change pointer to table with variables
    OverwriteUInt32AtAddress(0x576B63, reinterpret_cast<uint32_t>(&spellVariables));
    // update number of entries value
    OverwriteUInt32AtAddress(0x576B7C, (sizeof(spellVariables) / 4));
    // copy table of pointers from address to spellVariables vector and add new entries
    memcpy(&spellVariables, (const void*)0xACE8F8, sizeof(uint32_t) * 140);
    SetNewVariablePointers();
    // change pointer of GetVariableTableValue to pointer to extended function
    OverwriteUInt32AtAddress(0x578E8B, CalculateAddress(reinterpret_cast<uint32_t>(&GetVariableValueEx), 0x578E8F));
}

// Assembly patch bytes
constexpr uint8_t PATCH_BYTES[34] = {
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

void TooltipExtensions::SpellTooltipRuneCostExtension() {
    DWORD oldProtect;
    // Change memory protection to allow writing
    VirtualProtect(reinterpret_cast<void*>(0x623C71), 0x22, PAGE_EXECUTE_READWRITE, &oldProtect);
    // Apply the patch bytes
    memcpy(reinterpret_cast<void*>(0x623C71), PATCH_BYTES, sizeof(PATCH_BYTES));
    // Calculate and write the relative address for the function call
    *reinterpret_cast<uint32_t*>(0x623C8A) = CalculateAddress(reinterpret_cast<uint32_t>(&SetRuneCostTooltip), 0x623C8E);
    // Restore the original memory protection
    VirtualProtect(reinterpret_cast<void*>(0x623C71), 0x22, oldProtect, &oldProtect); 
}
static uint32_t CURRENT_AND_MAX_FIELDS[] = {
    CURRENT_MANA, CURRENT_RAGE, CURRENT_FOCUS, CURRENT_ENERGY,
    CURRENT_HAPPINESS, CURRENT_RUNES, CURRENT_RUNIC_POWER,
    MAX_MANA, MAX_RAGE, MAX_FOCUS, MAX_ENERGY,
    MAX_HAPPINESS, MAX_RUNES, MAX_RUNIC_POWER
};
int TooltipExtensions::GetVariableValueEx(uint32_t* _this, uint32_t edx, uint32_t spellVariable, uint32_t a3, uint32_t spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9) {
    uint32_t result = 0;

    if (spellVariable < SPELLVARIABLE_hp)
        result = CFormula__GetVariableValue(_this, spellVariable, a3, spell, a5, a6, a7, a8, a9);
    else {
        float value = 0.f;
        uint32_t* ActivePlayer = reinterpret_cast<uint32_t*>(ClntObjMgrObjectPtr(ClntObjMgrGetActivePlayer(), TYPEMASK_PLAYER));

        if (ActivePlayer) {
            // Arrays for current and max power fields
            if (spellVariable >= SPELLVARIABLE_power1 && spellVariable <= SPELLVARIABLE_POWER7) {//the <= check saves if you extend later
                value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_AND_MAX_FIELDS[spellVariable - SPELLVARIABLE_power1]));
            } else {
                switch (spellVariable) {
                    case SPELLVARIABLE_hp:
                        value = static_cast<float>(GetPlayerField(ActivePlayer, CURRENT_HP));
                        break;
                    case SPELLVARIABLE_HP:
                        value = static_cast<float>(GetPlayerField(ActivePlayer, MAX_HP));
                        break;
                    case SPELLVARIABLE_ppl1:
                    case SPELLVARIABLE_PPL1:
                        value = *reinterpret_cast<float*>(spell + 308);
                        break;
                    case SPELLVARIABLE_ppl2:
                    case SPELLVARIABLE_PPL2:
                        value = *reinterpret_cast<float*>(spell + 312);
                        break;
                    case SPELLVARIABLE_ppl3:
                    case SPELLVARIABLE_PPL3:
                        value = *reinterpret_cast<float*>(spell + 316);
                        break;
                    case SPELLVARIABLE_mastery1:
                    case SPELLVARIABLE_MASTERY1:
                        value = CharacterDefines::getMasteryForSpec(0);
                        break;
                    case SPELLVARIABLE_mastery2:
                    case SPELLVARIABLE_MASTERY2:
                        value = CharacterDefines::getMasteryForSpec(1);
                        break;
                    case SPELLVARIABLE_mastery3:
                    case SPELLVARIABLE_MASTERY3:
                        value = CharacterDefines::getMasteryForSpec(2);
                        break;
                    case SPELLVARIABLE_mastery4:
                    case SPELLVARIABLE_MASTERY4:
                        value = CharacterDefines::getMasteryForSpec(3);
                        break;
                    default:
                        *_this = 1;
                        break;
                }
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
    const char* tooltipSpellVariablesExtensions[30] = {
        "hp", "HP", "ppl1", "ppl2", "ppl3", "PPL1", "PPL2", "PPL3",
        "power1", "power2", "power3", "power4", "power5", "power6", "power7",
        "POWER1", "POWER2", "POWER3", "POWER4", "POWER5", "POWER6", "POWER7",
        "mastery1", "mastery2", "mastery3", "mastery4",
        "MASTERY1", "MASTERY2", "MASTERY3", "MASTERY4",
    };

    for (size_t i = 0; i < sizeof(tooltipSpellVariablesExtensions) / sizeof(tooltipSpellVariablesExtensions[0]); i++)
        spellVariables[140 + i] = reinterpret_cast<uint32_t>(tooltipSpellVariablesExtensions[i]);
}

void TooltipExtensions::AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer)
{
    char* sRuneCost = FrameScript__GetText(runeCostKey, -1, 0);
    SStrPrintf(buff, 128, sRuneCost, runeCount);//sizeof(buff)
    SStrCopy_0(destBuffer, buff, 0x7FFFFFFF);      
}

void TooltipExtensions::SetRuneCostTooltip(char* dest, char* buff, uint32_t* row, uint32_t* spellFamily) {
    int32_t m_RuneBlood = *(row + 1);
    int32_t m_RuneUnholy = *(row + 2);
    int32_t m_RuneFrost = *(row + 3);
    int32_t m_RunicPower = *(row + 4);

    if (*spellFamily == SPELLFAMILY_DEATHKNIGHT) {
        if (m_RuneBlood) {
            AppendRuneCost("RUNE_COST_DEATH", m_RuneBlood, buff, dest);
            if (m_RuneBlood != 1)
                SStrCopy_0(dest, sPluralS, 0x7FFFFFFF);

            if (m_RunicPower < 0) {
                int32_t m_Amount = -m_RunicPower / 10;
                SStrCopy_0(dest, sConnectorPlus, 0x7FFFFFFF);
                AppendRuneCost("RUNIC_POWER_COST", m_Amount, buff, dest);
            }
        }
    }
    else {
        RuneData runes[] = {
            {"RUNE_COST_BLOOD", m_RuneBlood},
            {"RUNE_COST_UNHOLY", m_RuneUnholy},
            {"RUNE_COST_FROST", m_RuneFrost}
        };

        bool addSpace = false;
        for (const auto& rune : runes) {
            if (rune.count > 0) {
                if (addSpace) {
                    SStrCopy_0(dest, sSpace, 0x7FFFFFFF);
                }
                AppendRuneCost(rune.costKey, rune.count, buff, dest);
                addSpace = true;
            }
        }
    }
}
