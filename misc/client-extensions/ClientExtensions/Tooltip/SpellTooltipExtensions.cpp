#include "SpellTooltipExtensions.h"
#include "Character/CharacterExtensions.h"
#include "CDBCMgr/CDBCMgr.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalCostData.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalAttributes.h"
#include "CDBCMgr/CDBCDefs/SpellEffectScalars.h"
#include "windows.h"
#include "Logger.h"
#include <algorithm>

void TooltipExtensions::Apply() {
    SpellTooltipVariableExtension();
    SpellTooltipRuneCostExtension();
    //SpellTooltipPowerCostExtension();
    //SpellTooltipCooldownExtension();
    // SpellTooltipRemainingCooldownExtension();
}

void TooltipExtensions::SpellTooltipVariableExtension() {
    DWORD flOldProtect = 0;

    // change pointer to table with variables
    Util::OverwriteUInt32AtAddress(0x576B63, reinterpret_cast<uint32_t>(&spellVariables));
    // update number of entries value
    Util::OverwriteUInt32AtAddress(0x576B7C, (sizeof(spellVariables) / 4));
    // copy table of pointers from address to spellVariables vector and add new entries
    memcpy(&spellVariables, (const void*)0xACE8F8, sizeof(uint32_t) * 140);
    SetNewVariablePointers();
    // change pointer of GetVariableTableValue to pointer to extended function
    Util::OverwriteUInt32AtAddress(0x578E8B, Util::CalculateAddress(reinterpret_cast<uint32_t>(&GetVariableValueEx), 0x578E8F));
}

void TooltipExtensions::SpellTooltipRuneCostExtension() {
    uint8_t patchBytes[] = {
        0x8D, 0x9D, 0xB8, 0xFD, 0xFF, 0xFF, 0x53, 0x8D, 0x06, 0x50, 0x8D, 0x8D, 0xA0, 0xFE, 0xFF, 0xFF,
        0x51, 0x8D, 0x95, 0x20, 0xFF, 0xFF, 0xFF, 0x52, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0x4B, 0x02,
        0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x623C71, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x623C8A, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetRuneCostTooltip), 0x623C8E));
}

void GetSpellScalarsForEffect(int SpellId, int idx, float& ap, float& sp, float& bv)
{
    auto scalars = GlobalCDBCMap.getCDBC("SpellEffectScalars");
    for (auto scalar : scalars)
    {
        if (SpellEffectScalarsRow* row = std::any_cast<SpellEffectScalarsRow>(&scalar.second))
        {
            if (row->spellID == SpellId && row->effectIdx == idx) {
                ap += row->ap;
                sp += row->sp;
                bv += row->bv;

                break;
            }
        }
    }
}

float ApplyScalarsForPlayer(CGPlayer* activePlayer, SpellRow* spell, int index, float ap, float sp, float bv)
{
    float total = 0.0;
    if (ap) {
        uint8_t attType = (spell->m_equippedItemClass == 2 && spell->m_equippedItemSubclass & 262156 && spell->m_defenseType != 2) ? 2 : spell->m_attributesExC & SPELL_ATTR3_MAIN_HAND ? 0 : 1;
        total += ap * CharacterDefines::GetTotalAttackPowerValue(attType, activePlayer);
    }
    if (sp) {
        int32_t spBonus = 0;
        uint32_t schoolMask = spell->m_schoolMask;
        for (uint32_t i = SPELL_SCHOOL_HOLY; i < MAX_SPELL_SCHOOL; ++i) {
            if (schoolMask & (1 << i)) {
                int32_t tempBonus = activePlayer->PlayerData->SPPos[i];
                if (tempBonus > spBonus)
                    spBonus = tempBonus;
            }
        }
        total += sp * spBonus;
    }
    if (bv) {
        total += bv * static_cast<float>(activePlayer->PlayerData->shieldBlock);
    }

    return total;
}

int TooltipExtensions::GetVariableValueEx(void* _this, uint32_t edx, uint32_t spellVariable, uint32_t a3, SpellRow* spell, uint32_t a5, uint32_t a6, uint32_t a7, uint32_t a8, uint32_t a9) {
    uint32_t result = 0;

    if (spellVariable < SPELLVARIABLE_hp)
        result = CFormula::GetVariableValue(_this, spellVariable, a3, spell, a5, a6, a7, a8, a9);
    else {
        float value = 0.f;
        CGPlayer* activePlayer = reinterpret_cast<CGPlayer*>(ClntObjMgr::ObjectPtr(ClntObjMgr::GetActivePlayer(), TYPEMASK_PLAYER));

        if (activePlayer) {
            // Arrays for current and max power fields
            if (spellVariable >= SPELLVARIABLE_power1 && spellVariable <= SPELLVARIABLE_power7) {
                uint32_t var = spellVariable - SPELLVARIABLE_power1;
                value = static_cast<float>(activePlayer->unitBase.unitData->unitCurrPowers[var]);
            }
            else if (spellVariable >= SPELLVARIABLE_POWER1 && spellVariable <= SPELLVARIABLE_POWER7) {
                uint32_t var = spellVariable - SPELLVARIABLE_POWER1;
                value = static_cast<float>(activePlayer->unitBase.unitData->unitMaxPowers[var]);
            }
            else {
                switch (spellVariable) {
                    case SPELLVARIABLE_hp:
                        value = static_cast<float>(activePlayer->unitBase.unitData->unitCurrHealth);
                        break;
                    case SPELLVARIABLE_HP:
                        value = static_cast<float>(activePlayer->unitBase.unitData->unitMaxHealth);
                        break;
                    case SPELLVARIABLE_ppl1:
                        value = spell->m_effectRealPointsPerLevel[0];
                        break;
                    case SPELLVARIABLE_ppl2:
                        value = spell->m_effectRealPointsPerLevel[1];
                        break;
                    case SPELLVARIABLE_ppl3:
                        value = spell->m_effectRealPointsPerLevel[2];
                        break;
                    case SPELLVARIABLE_PPL1:
                        value = spell->m_effectRealPointsPerLevel[0] * activePlayer->unitBase.unitData->level;
                        break;
                    case SPELLVARIABLE_PPL2:
                        value = spell->m_effectRealPointsPerLevel[1] * activePlayer->unitBase.unitData->level;
                        break;
                    case SPELLVARIABLE_PPL3:
                        value = spell->m_effectRealPointsPerLevel[2] * activePlayer->unitBase.unitData->level;
                        break;
                    case SPELLVARIABLE_mastery1:
                        value = CharacterDefines::getMasteryForSpec(0);
                        break;
                    case SPELLVARIABLE_mastery2:
                        value = CharacterDefines::getMasteryForSpec(1);
                        break;
                    case SPELLVARIABLE_mastery3:
                        value = CharacterDefines::getMasteryForSpec(2);
                        break;
                    case SPELLVARIABLE_mastery4:
                        value = CharacterDefines::getMasteryForSpec(3);
                        break;
                    case SPELLVARIABLE_MASTERY:
                        value = CharacterDefines::getMasteryRatingSpec(CharacterExtensions::SpecToIndex(CharacterDefines::getCharActiveSpec()));
                        break;
                    case SPELLVARIABLE_dpct:
                        value = activePlayer->PlayerData->dodgePct;
                        break;
                    case SPELLVARIABLE_ppct:
                        value = activePlayer->PlayerData->parryPct;
                        break;
                    case SPELLVARIABLE_bon1: {
                        float ap = 0.0;
                        float sp = 0.0;
                        float bv = 0.0;
                        GetSpellScalarsForEffect(spell->m_ID, 0, ap, sp, bv);
                        value = ApplyScalarsForPlayer(activePlayer, spell, 0, ap, sp, bv);
                        value += spell->m_effectRealPointsPerLevel[0] * activePlayer->unitBase.unitData->level;
                    } break;
                    case SPELLVARIABLE_bon2: {
                        float ap = 0.0;
                        float sp = 0.0;
                        float bv = 0.0;
                        GetSpellScalarsForEffect(spell->m_ID, 1, ap, sp, bv);
                        value = ApplyScalarsForPlayer(activePlayer, spell, 1, ap, sp, bv);
                        value += spell->m_effectRealPointsPerLevel[1] * activePlayer->unitBase.unitData->level;
                    }
                    break;
                    case SPELLVARIABLE_bon3: {
                        float ap = 0.0;
                        float sp = 0.0;
                        float bv = 0.0;
                        GetSpellScalarsForEffect(spell->m_ID, 2, ap, sp, bv);
                        value = ApplyScalarsForPlayer(activePlayer, spell, 2, ap, sp, bv);
                        value += spell->m_effectRealPointsPerLevel[2] * activePlayer->unitBase.unitData->level;
                    }
                    break;
                    default:
                        *reinterpret_cast<uint32_t*>(_this) = 1;
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
    const char* tooltipSpellVariablesExtensions[] = {
        "hp", "HP", "ppl1", "ppl2", "ppl3", "PPL1", "PPL2", "PPL3",
        "power1", "power2", "power3", "power4", "power5", "power6", "power7",
        "POWER1", "POWER2", "POWER3", "POWER4", "POWER5", "POWER6", "POWER7",
        "mastery1", "mastery2", "mastery3", "mastery4", "MASTERY",
        "dpct", "ppct", "bon1", "bon2", "bon3"
    };

    for (size_t i = 0; i < sizeof(tooltipSpellVariablesExtensions) / sizeof(tooltipSpellVariablesExtensions[0]); i++)
        spellVariables[140 + i] = reinterpret_cast<uint32_t>(tooltipSpellVariablesExtensions[i]);
}

void TooltipExtensions::AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer) {
    char* sRuneCost = FrameScript::GetText(runeCostKey, -1, 0);
    SStr::Printf(buff, 128, sRuneCost, runeCount);//sizeof(buff)
    SStr::Copy_0(destBuffer, buff, 0x7FFFFFFF);      
}

void TooltipExtensions::SetRuneCostTooltip(char* dest, char* buff, SpellRuneCostRow* row, uint32_t* spellFamily) {
    if (*spellFamily == SPELLFAMILY_DEATHKNIGHT) {
        if (row->m_blood) {
            AppendRuneCost("RUNE_COST_DEATH", row->m_blood, buff, dest);
            if (row->m_blood != 1)
                SStr::Copy_0(dest, sPluralS, 0x7FFFFFFF);

            if (row->m_runicPower < 0) {
                int32_t m_Amount = -row->m_runicPower / 10;
                SStr::Copy_0(dest, sConnectorPlus, 0x7FFFFFFF);
                AppendRuneCost("RUNIC_POWER_COST", m_Amount, buff, dest);
            }
        }
    }
    else {
        RuneData runes[] = {
            {"RUNE_COST_BLOOD", row->m_blood},
            {"RUNE_COST_UNHOLY", row->m_unholy},
            {"RUNE_COST_FROST", row->m_frost}
        };

        bool addSpace = false;
        for (const auto& rune : runes) {
            if (rune.count > 0) {
                if (addSpace) {
                    SStr::Copy_0(dest, sSpace, 0x7FFFFFFF);
                }
                AppendRuneCost(rune.costKey, rune.count, buff, dest);
                addSpace = true;
            }
        }
    }
}

void TooltipExtensions::SpellTooltipPowerCostExtension() {
    uint8_t patchBytes[] = {
        0x57, 0x51, 0x56, 0x8B, 0x4D, 0x2C, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF, 0xFF, 0x8D, 0x8D, 0x20,
        0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0xFC, 0xFF, 0x00, 0x00, 0xE9, 0x3A, 0x01, 0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x623D8A, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x623DA0, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetPowerCostTooltip), 0x623DA4));
}

void TooltipExtensions::SetPowerCostTooltip(char* dest, SpellRow* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRow* powerDisplayRow) {
    SpellAdditionalCostDataRow* additionalCostRow = GlobalCDBCMap.getRow<SpellAdditionalCostDataRow>("SpellAdditionalCostData", spell->m_ID);
    SpellAdditionalAttributesRow* customAttributesRow = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", spell->m_ID);
    bool hasPowerCost = (powerCost != 0 || powerCostPerSec != 0);
    char buffer[128];

    if (!customAttributesRow || !(customAttributesRow->customAttr0 & SPELL_ATTR0_CU_DO_NOT_DISPLAY_POWER_COST)) {
        if (powerCost && !powerCostPerSec) {
            if (powerDisplayRow) {
                SStr::Copy(buffer, FrameScript::GetText(powerDisplayRow->m_globalStringBaseTag, -1, 0), 128);
                SStr::Printf(dest, 128, FrameScript::GetText("POWER_DISPLAY_COST", -1, 0), powerCost, buffer);
            }
            else {
                SStr::Copy(buffer, FrameScript::GetText(powerString, -1, 0), 128);
                SStr::Printf(dest, 128, buffer, powerCost);
            }
        }
        else if (powerCostPerSec > 0) {
            if (powerDisplayRow) {
                SStr::Copy(buffer, FrameScript::GetText(powerDisplayRow->m_globalStringBaseTag, -1, 0), 128);
                SStr::Printf(dest, 128, FrameScript::GetText("POWER_DISPLAY_COST_PER_TIME", -1, 0), powerCost, buffer, powerCostPerSec);
            }
            else {
                SStr::Printf(buffer, 128, "%s_PER_TIME", powerString);
                SStr::Printf(dest, 128, FrameScript::GetText(buffer, -1, 0), powerCost, powerCostPerSec);
            }
        }

        if (additionalCostRow && additionalCostRow->cost) {
            if (hasPowerCost)
                SStr::Copy_0(dest, " + ", 0x7FFFFFFF);

            SStr::Printf(buffer, 128, "%d %s", additionalCostRow->cost, additionalCostRow->resourceName);
            SStr::Copy_0(dest, buffer, 0x7FFFFFFF);

            if (additionalCostRow->flag == 1 && additionalCostRow->cost != 1)
                SStr::Copy_0(dest, sPluralS, 0x7FFFFFFF);
        }
    }
}

void TooltipExtensions::SpellTooltipCooldownExtension() {
    uint8_t patchBytes[] = {
        0x8B, 0x4D, 0x2C, 0x8B, 0x45, 0xE4, 0x51, 0x50, 0x8D, 0x8D, 0x20, 0xFE, 0xFF, 0xFF, 0x51, 0x8B,
        0x55, 0x1C, 0x8B, 0x45, 0x14, 0x52, 0x50, 0x8D, 0x4D, 0x18, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF,
        0xFF, 0x8D, 0x8D, 0x20, 0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0xD8,
        0x01, 0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x62443B, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x624465, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetSpellCooldownTooltip), 0x624469));
}

void TooltipExtensions::SetSpellCooldownTooltip(char* dest, SpellRow* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost) {
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
    SpellAdditionalAttributesRow* customAttributesRow = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", spell->m_ID);
    bool treatAsInstant = customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_TREAT_AS_INSTANT);

    double castTime = SpellRec_C::GetCastTime(spell, a6, a8, 1);

    if (castTime <= 250 && (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_LOW_TIME_TREAT_AS_INSTANT)))
        treatAsInstant = true;

    if (castTime && !treatAsInstant) {
        bool isLongCast = castTime >= MILLISECONDS_IN_MINUTE;
        char* castFlag = isLongCast ? "SPELL_CAST_TIME_MIN" : "SPELL_CAST_TIME_SEC";
        double divisor = isLongCast ? MILLISECONDS_IN_MINUTE : MILLISECONDS_IN_SECOND;

        SStr::Copy(buffer, FrameScript::GetText(castFlag, -1, 0), 128);
        SStr::Printf(dest, 128, buffer, castTime / divisor);
    } else {
        char* castFlag = "SPELL_CAST_TIME_INSTANT_NO_MANA";
        if ((spell->m_attributesEx & (SPELL_ATTR1_CHANNELED_1 | SPELL_ATTR1_CHANNELED_2)) != 0) {
            castFlag = "SPELL_CAST_CHANNELED";
        }
        else if ((spell->m_attributes & (SPELL_ATTR0_ON_NEXT_SWING | SPELL_ATTR0_ON_NEXT_SWING_2)) != 0) {
            castFlag = "SPELL_ON_NEXT_SWING";
        }
        else if ((spell->m_attributesEx & SPELL_ATTR0_REQ_AMMO) != 0) {
            castFlag = "SPELL_ON_NEXT_RANGED";
        }
        else if (!spell->m_powerType && powerCost > 0) {
            castFlag = "SPELL_CAST_TIME_INSTANT";
        }   
        SStr::Copy(dest, FrameScript::GetText(castFlag, -1, 0), 128);
    }

    double recoveryTime = 0;
    auto it = CharacterDefines::spellChargeMap.find(spell->m_ID);

    if (it != CharacterDefines::spellChargeMap.end()) {
        CharacterDefines::SpellCharge temp = it->second;
        recoveryTime = temp.cooldown;
    }
    else
        recoveryTime = spell->m_categoryRecoveryTime > spell->m_recoveryTime ? spell->m_categoryRecoveryTime : spell->m_recoveryTime;

    if (recoveryTime > 0) {
        bool isLongRecovery = recoveryTime >= MILLISECONDS_IN_MINUTE;
        char* str = isLongRecovery ? "SPELL_RECAST_TIME_MIN" : "SPELL_RECAST_TIME_SEC";
        double divider = isLongRecovery ? MILLISECONDS_IN_MINUTE : MILLISECONDS_IN_SECOND;
        SStr::Copy(buffer, FrameScript::GetText(str, -1, 0), 128);
        SStr::Printf(src, 128, buffer, recoveryTime / divider);
    }
    else {
        //Al really had src[0] = 0;
        //then tried to blame IDA for that.
        *src = 0;
    }

    void* ptr = reinterpret_cast<void*>(0xAD2D30);
    sub_61FEC0(_this, dest, src, ptr, ptr, 0);
}

void TooltipExtensions::SpellTooltipRemainingCooldownExtension() {
    uint8_t patchBytes[] = {
        0x8B, 0x45, 0x10, 0x89, 0xF9, 0x8D, 0x95, 0x78, 0xFB, 0xFF, 0xFF, 0x50, 0x51, 0x52, 0x8D, 0x95,
        0x20, 0xFF, 0xFF, 0xFF, 0x52, 0xE8, 0x00, 0x00, 0x00, 0x00, 0x31, 0xDB, 0xBB, 0x01, 0x00, 0x00,
        0x00, 0xEB, 0x24
    };

    Util::OverwriteBytesAtAddress(0x624FF0, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x625006, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetSpellRemainingCooldownTooltip), 0x62500A));
}

void TooltipExtensions::SetSpellRemainingCooldownTooltip(char* dest, SpellRow* spell, void* _this, uint32_t currentCooldown) {
    void* ptr = reinterpret_cast<void*>(0xAD2D30);
    uint32_t recoveryTime = 0;
    auto it = CharacterDefines::spellChargeMap.find(spell->m_ID);

    if (it != CharacterDefines::spellChargeMap.end())
    {
        CharacterDefines::SpellCharge temp = it->second;
        if (temp.remainingCooldown >= currentCooldown) {
            uint32_t currAsync = OsGetAsyncTimeMs();

            if (temp.remainingCooldown > (currAsync - temp.async))
                recoveryTime = temp.remainingCooldown + (temp.async - currAsync);
            else
                recoveryTime = 0;

            temp.remainingCooldown = recoveryTime;
            temp.async = currAsync;
            it->second = temp;
        }
        else
            recoveryTime = currentCooldown;
    }
    else
        recoveryTime = currentCooldown;

    if (recoveryTime) {
        CGTooltip::GetDurationString(dest, 128, recoveryTime, "ITEM_COOLDOWN_TIME", 0, 1, 0);
        sub_61FEC0(_this, dest, 0, ptr, ptr, 0);
    }
}
