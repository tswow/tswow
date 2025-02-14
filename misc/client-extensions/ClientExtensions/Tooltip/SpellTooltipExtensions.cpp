#include "SpellTooltipExtensions.h"
#include "CustomDBCMgr/CustomDBCMgr.h"
#include "CustomDBCMgr/DBCDefs/SpellCustomAttributes.h"
#include "windows.h"

void SpellTooltipExtensions::Apply() {
    SpellTooltipRuneCostExtension();
    SpellTooltipPowerCostExtension();
    SpellTooltipCooldownExtension();
}

void SpellTooltipExtensions::SpellTooltipRuneCostExtension() {
    uint8_t patchBytes[34] = {
        0x8D, 0x9D, 0xB8, 0xFD, 0xFF, 0xFF, 0x53, 0x8D, 0x06, 0x50, 0x8D, 0x8D,
        0xA0, 0xFE, 0xFF, 0xFF, 0x51, 0x8D, 0x95, 0x20, 0xFF, 0xFF, 0xFF, 0x52,
        0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0x4B, 0x02, 0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x623C71, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x623C8A, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetRuneCostTooltip), 0x623C8E)); 
}

void SpellTooltipExtensions::AppendRuneCost(char* runeCostKey, int runeCount, char* buff, char* destBuffer) {
    char* sRuneCost = FrameScript::GetText(runeCostKey, -1, 0);
    SStr::Printf(buff, 128, sRuneCost, runeCount); // sizeof(buff)
    SStr::Copy_0(destBuffer, buff, 0x7FFFFFFF);
}

void SpellTooltipExtensions::SetRuneCostTooltip(char* dest, char* buff, SpellRuneCostRow* row, uint32_t* spellFamily) {
    RuneData dkRunes[] = {
        {"RUNE_COST_BLOOD", row->m_blood},
        {"RUNE_COST_UNHOLY", row->m_unholy},
        {"RUNE_COST_FROST", row->m_frost}
    };

    bool addSpace = false;

    for (const auto& rune : dkRunes) {
        if (rune.count > 0) {
            if (addSpace)
                SStr::Copy_0(dest, sSpace, 0x7FFFFFFF);

            AppendRuneCost(rune.costKey, rune.count, buff, dest);
            addSpace = true;
        }
    }
};

void SpellTooltipExtensions::SpellTooltipPowerCostExtension() {
    uint8_t patchBytes[31] = {
        0x57, 0x51, 0x56, 0x8B, 0x4D, 0x2C, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF, 0xFF, 0x8D, 0x8D, 0x20,
        0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0xFC, 0xFF, 0x00, 0x00, 0xE9, 0x3A, 0x01, 0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x623D8A, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x623DA0, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetPowerCostTooltip), 0x623DA4));
}

void SpellTooltipExtensions::SetPowerCostTooltip(char* dest, SpellRow* spell, uint32_t powerCost, uint32_t powerCostPerSec, char* powerString, PowerDisplayRow* powerDisplayRow) {
    SpellCustomAttributesRow* customAttributesRow = GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", spell->m_ID);
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
    }
}

void SpellTooltipExtensions::SpellTooltipCooldownExtension() {
    uint8_t patchBytes[51] = {
        0x8B, 0x4D, 0x2C, 0x8B, 0x45, 0xE4, 0x51, 0x50, 0x8D, 0x8D, 0x20, 0xFE, 0xFF, 0xFF, 0x51, 0x8B,
        0x55, 0x1C, 0x8B, 0x45, 0x14, 0x52, 0x50, 0x8D, 0x4D, 0x18, 0x51, 0x8D, 0x95, 0x78, 0xFB, 0xFF,
        0xFF, 0x8D, 0x8D, 0x20, 0xFF, 0xFF, 0xFF, 0x52, 0x51, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xE9, 0xD8,
        0x01, 0x00, 0x00
    };

    Util::OverwriteBytesAtAddress(0x62443B, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x624465, Util::CalculateAddress(reinterpret_cast<uint32_t>(&SetSpellCooldownTooltip), 0x624469));
}

void SpellTooltipExtensions::SetSpellCooldownTooltip(char* dest, SpellRow* spell, uintptr_t* a7, uint32_t a6, uint32_t a8, char* src, void* _this, uint32_t powerCost) {
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

    double castTime = SpellRec::GetCastTime(spell, a6, a8, 1);
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

    double recoveryTime = spell->m_categoryRecoveryTime > spell->m_recoveryTime ? spell->m_categoryRecoveryTime : spell->m_recoveryTime;

    if (recoveryTime > 0) {
        bool isLongRecovery = recoveryTime >= MILLISECONDS_IN_MINUTE;
        char* str = isLongRecovery ? "SPELL_RECAST_TIME_MIN" : "SPELL_RECAST_TIME_SEC";
        double divider = isLongRecovery ? MILLISECONDS_IN_MINUTE : MILLISECONDS_IN_SECOND;
        SStr::Copy(buffer, FrameScript::GetText(str, -1, 0), 128);
        SStr::Printf(src, 128, buffer, recoveryTime / divider);
    }
    else
        *src = 0;

    void* ptr = reinterpret_cast<void*>(0xAD2D30);
    sub_61FEC0(_this, dest, src, ptr, ptr, 0);
}
