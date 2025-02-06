#include "SpellTooltipExtensions.h"
#include "Character/CharacterDefines.h"
#include "CustomDBCMgr/CustomDBCMgr.h"
#include "CustomDBCMgr/DBCDefs/SpellAdditionalCostData.h"
#include "CustomDBCMgr/DBCDefs/SpellCustomAttributes.h"
#include "windows.h"
#include "Logger.h"
#include <algorithm>
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
    SpellTooltipPowerCostExtension();
    SpellCooldownExtension();
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

constexpr uint8_t PATCH_BYTES2[31] = {
    0x57, 0x51, 0x56, 0x8B, 0x4D, 0x2C, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF, 0xFF, 0x8D, 0x8D, 0x20,
    0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0xFC, 0xFF, 0x00, 0x00, 0xE9, 0x3A, 0x01, 0x00, 0x00
};

void TooltipExtensions::SpellTooltipPowerCostExtension()
{
    DWORD oldProtect;
    // Change memory protection to allow writing
    VirtualProtect(reinterpret_cast<void*>(0x623D8A), 0x1F, PAGE_EXECUTE_READWRITE, &oldProtect);
    // Apply the patch bytes
    memcpy(reinterpret_cast<void*>(0x623D8A), PATCH_BYTES2, sizeof(PATCH_BYTES2));
    // Calculate and write the relative address for the function call
    *reinterpret_cast<uint32_t*>(0x623DA0) = CalculateAddress(reinterpret_cast<uint32_t>(&SetPowerCostTooltip), 0x623DA4);
    // Restore the original memory protection
    VirtualProtect(reinterpret_cast<void*>(0x623D8A), 0x1F, oldProtect, &oldProtect);
}

void TooltipExtensions::SetPowerCostTooltip(char* dest, SpellRec* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRec* powerDisplayRow) {
    SpellAdditionalCostDataRow* additionalCostRow = GlobalDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", spell->m_ID);
    SpellCustomAttributesRow* customAttributesRow = GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", spell->m_ID);
    bool hasPowerCost = (powerCost != 0 || powerCostPerSec != 0);
    char buffer[128];

    if (!customAttributesRow || !(customAttributesRow->customAttr0 & SPELL_ATTR0_CU_DO_NOT_DISPLAY_POWER_COST)) {
        if (powerCost && !powerCostPerSec) {
            if (powerDisplayRow) {
                SStrCopy(buffer, FrameScript__GetText(powerDisplayRow->m_globalStringBaseTag, -1, 0), 128);
                SStrPrintf(dest, 128, FrameScript__GetText("POWER_DISPLAY_COST", -1, 0), powerCost, buffer);
            }
            else {
                SStrCopy(buffer, FrameScript__GetText(powerString, -1, 0), 128);
                SStrPrintf(dest, 128, buffer, powerCost);
            }
        }
        else if (powerCostPerSec > 0) {
            if (powerDisplayRow) {
                SStrCopy(buffer, FrameScript__GetText(powerDisplayRow->m_globalStringBaseTag, -1, 0), 128);
                SStrPrintf(dest, 128, FrameScript__GetText("POWER_DISPLAY_COST_PER_TIME", -1, 0), powerCost, buffer, powerCostPerSec);
            }
            else {
                SStrPrintf(buffer, 128, "%s_PER_TIME", powerString);
                SStrPrintf(dest, 128, FrameScript__GetText(buffer, -1, 0), powerCost, powerCostPerSec);
            }
        }

        if (additionalCostRow && additionalCostRow->cost) {
            if (hasPowerCost)
                SStrCopy_0(dest, " + ", 0x7FFFFFFF);

            SStrPrintf(buffer, 128, "%d %s", additionalCostRow->cost, additionalCostRow->resourceName);
            SStrCopy_0(dest, buffer, 0x7FFFFFFF);

            if (additionalCostRow->flag == 1 && additionalCostRow->cost != 1)
                SStrCopy_0(dest, sPluralS, 0x7FFFFFFF);
        }
    }
}

constexpr uint8_t PATCH_BYTES3[51] = {
    0x8B, 0x4D, 0x2C, 0x8B, 0x45, 0xE4, 0x51, 0x50, 0x8D, 0x8D, 0x20, 0xFE, 0xFF, 0xFF, 0x51, 0x8B,
    0x55, 0x1C, 0x8B, 0x45, 0x14, 0x52, 0x50, 0x8D, 0x4D, 0x18, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF,
    0xFF, 0x8D, 0x8D, 0x20, 0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0xD8,
    0x01, 0x00, 0x00
};

void TooltipExtensions::SpellCooldownExtension() {
    DWORD oldProtect;
    // Change memory protection to allow writing
    VirtualProtect(reinterpret_cast<void*>(0x62443B), 0x33, PAGE_EXECUTE_READWRITE, &oldProtect);
    // Apply the patch bytes
    memcpy(reinterpret_cast<void*>(0x62443B), PATCH_BYTES3, sizeof(PATCH_BYTES3));
    // Calculate and write the relative address for the function call
    *reinterpret_cast<uint32_t*>(0x624465) = CalculateAddress(reinterpret_cast<uint32_t>(&SetSpellCooldownTooltip), 0x624469);
    // Restore the original memory protection
    VirtualProtect(reinterpret_cast<void*>(0x62443B), 0x33, oldProtect, &oldProtect);
}

void TooltipExtensions::SetSpellCooldownTooltip(char* dest, SpellRec* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost) {
    const uint32_t MILLISECONDS_IN_MINUTE = 60000;
    const uint32_t MILLISECONDS_IN_SECOND = 1000;

    if (spell->m_effect[0] == SPELL_EFFECT_TRADE_SKILL || (spell->m_attributes & SPELL_ATTR0_PASSIVE) != 0) {
        *a7 = 1;
        return;
    }
    if (spell->m_effect[0] == SPELL_EFFECT_ATTACK) {
        return;
    }

    char buffer[128];
    SpellCustomAttributesRow* customAttributesRow = GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", spell->m_ID);
    bool treatAsInstant = customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_TREAT_AS_INSTANT);

    double castTime = SpellRec__GetCastTime(spell, a6, a8, 1);    
    if (castTime && !treatAsInstant) {
        bool isLongCast = castTime >= MILLISECONDS_IN_MINUTE;
        char* castFlag = isLongCast ? "SPELL_CAST_TIME_MIN" : "SPELL_CAST_TIME_SEC";
        double divisor = isLongCast ? MILLISECONDS_IN_MINUTE : MILLISECONDS_IN_SECOND;

        SStrCopy(buffer, FrameScript__GetText(castFlag, -1, 0), 128);
        SStrPrintf(dest, 128, buffer, castTime / divisor);
    } else {
        char* castFlag = "SPELL_CAST_TIME_INSTANT_NO_MANA";
        if ((spell->m_attributesEx & (SPELL_ATTR1_CHANNELED_1 | SPELL_ATTR1_CHANNELED_2)) != 0) {
            castFlag = "SPELL_CAST_CHANNELED";
        } else if ((spell->m_attributes & (SPELL_ATTR0_ON_NEXT_SWING | SPELL_ATTR0_ON_NEXT_SWING_2)) != 0) {
            castFlag = "SPELL_ON_NEXT_SWING";
        } else if ((spell->m_attributesEx & SPELL_ATTR0_REQ_AMMO) != 0) {
            castFlag = "SPELL_ON_NEXT_RANGED";
        } else if (!spell->m_powerType && powerCost > 0) {
            castFlag = "SPELL_CAST_TIME_INSTANT";
        }   
        SStrCopy(dest, FrameScript__GetText(castFlag, -1, 0), 128);
    } 

    double recoveryTime = spell->m_categoryRecoveryTime > spell->m_recoveryTime ? spell->m_categoryRecoveryTime : spell->m_recoveryTime;
    if (recoveryTime > 0) {
        bool isLongRecovery = recoveryTime >= MILLISECONDS_IN_MINUTE;
        char* str = isLongRecovery ? "SPELL_RECAST_TIME_MIN" : "SPELL_RECAST_TIME_SEC";
        double divider = isLongRecovery ? MILLISECONDS_IN_MINUTE : MILLISECONDS_IN_SECOND;
        SStrCopy(buffer, FrameScript__GetText(str, -1, 0), 128);
        SStrPrintf(src, 128, buffer, recoveryTime / divider);
    } else {
        //Al really had src[0] = 0;
        //then tried to blame IDA for that.
        *src = 0;
    }

    void* ptr = reinterpret_cast<void*>(0xAD2D30);
    sub_61FEC0(_this, dest, src, ptr, ptr, 0);

    //LOG_DEBUG << "Stack: " << dest << " | " << spell << " | " << a7 << " | " << a6 << " | " << a8 << " | " << src << " | " << _this << " | " << powerCost;
}
