#include "CharacterExtensions.h"
#include "CDBCMgr/CDBCMgr.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalAttributes.h"
#include "Logger.h"

void CharacterExtensions::Apply() {
    SpellLearnExtension();
    SpellUnlearnExtension();
}

void CharacterExtensions::SpellLearnExtension() {
    uint8_t patchBytes[18] = {
        0x8D, 0x4D, 0x0C, 0x8D, 0x85, 0x28, 0xFD, 0xFF, 0xFF, 0x51, 0x50, 0xE8, 0x00, 0x00, 0x00, 0x00,
        0xEB, 0x5B
    };

    Util::OverwriteBytesAtAddress(0x5427E9, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x5427F5, Util::CalculateAddress(reinterpret_cast<uint32_t>(&OnSpellLearnEx), 0x5427F9));
}

void CharacterExtensions::SpellUnlearnExtension() {
    uint8_t patchBytes[18] = {
        0x8D, 0x4D, 0x0C, 0x8D, 0x85, 0x58, 0xFD, 0xFF, 0xFF, 0x51, 0x50, 0xE8, 0x00, 0x00, 0x00, 0x00,
        0xEB, 0x48
    };

    Util::OverwriteBytesAtAddress(0x6E7304, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x6E7310, Util::CalculateAddress(reinterpret_cast<uint32_t>(&OnSpellUnlearnEx), 0x6E7314));
}

void CharacterExtensions::OnSpellLearnEx(SpellRow* spellRow, uint32_t* a5) {
    bool displayMsg;
    char buffer[512];
    SpellAdditionalAttributesRow* customAttributesRow = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", spellRow->m_ID);

    if (customAttributesRow && ((customAttributesRow->customAttr0 & SPELL_ATTR0_CU_SUPPRESS_LEARN_MSG) != 0))
        displayMsg = false;
    else
        displayMsg = (*a5 != 0);

    if (displayMsg) {
        uint32_t message = GERR_LEARN_SPELL_S;

        if (spellRow->m_attributes & SPELL_ATTR0_ABILITY)
            message = GERR_LEARN_ABILITY_S;

        if (*spellRow->m_nameSubtext_lang)
            SStr::Printf(buffer, 512, "%s (%s)", spellRow->m_name_lang, spellRow->m_nameSubtext_lang);
        else
            SStr::Copy(buffer, spellRow->m_name_lang, 512);

        CGGameUI::DisplayError(message, buffer);
    }
}

void CharacterExtensions::OnSpellUnlearnEx(SpellRow* spellRow, uint32_t* a3) {
    bool displayMsg;
    char buffer[512];
    SpellAdditionalAttributesRow* customAttributesRow = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", spellRow->m_ID);

    if (customAttributesRow && ((customAttributesRow->customAttr0 & SPELL_ATTR0_CU_SUPPRESS_UNLEARN_MSG) != 0))
        displayMsg = false;
    else
        displayMsg = (*a3 == 0);

    if (displayMsg && !(spellRow->m_attributes & SPELL_ATTR0_HIDDEN_CLIENTSIDE)) {
        if (*spellRow->m_nameSubtext_lang) {
            SStr::Printf(buffer, 512, "%s (%s)", spellRow->m_name_lang, spellRow->m_nameSubtext_lang);
            CGGameUI::DisplayError(GERR_SPELL_UNLEARNED_S, buffer);
        }
        else
            CGGameUI::DisplayError(GERR_SPELL_UNLEARNED_S, spellRow->m_name_lang);
    }
}
