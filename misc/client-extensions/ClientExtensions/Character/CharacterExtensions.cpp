#include "CharacterExtensions.h"
#include "CDBCMgr/CDBCMgr.h"
#include "CDBCMgr/CDBCDefs/LFGRoles.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalAttributes.h"
#include "Logger.h"

void CharacterExtensions::Apply() {
    ChangeLFGRoleFunctionPointers();
    SpellLearnExtension();
    SpellUnlearnExtension();
}

void CharacterExtensions::ChangeLFGRoleFunctionPointers() {
    Util::OverwriteUInt32AtAddress(0x553E90, Util::CalculateAddress(reinterpret_cast<uint32_t>(&CheckLFGRoles), 0x553E94));
    Util::OverwriteUInt32AtAddress(0x55736D, Util::CalculateAddress(reinterpret_cast<uint32_t>(&CheckLFGRoles), 0x557371));
    Util::OverwriteUInt32AtAddress(0x4E0B12, Util::CalculateAddress(reinterpret_cast<uint32_t>(&GetClassRoles), 0x4E0B16));
    // Lua_GetAvailableRoles pointer, we want direct address not offset in this case 
    Util::OverwriteUInt32AtAddress(0xACD7FC, Util::CalculateAddress(reinterpret_cast<uint32_t>(&Lua_GetAvailableRoles), 0));
    // Lua_SetLFGRole pointer, ditto
    Util::OverwriteUInt32AtAddress(0xACD72C, Util::CalculateAddress(reinterpret_cast<uint32_t>(&Lua_SetLFGRole), 0));
}

void CharacterExtensions::SpellLearnExtension() {
    uint8_t patchBytes[] = {
        0x8D, 0x4D, 0x0C, 0x8D, 0x85, 0x28, 0xFD, 0xFF, 0xFF, 0x51, 0x50, 0xE8, 0x00, 0x00, 0x00, 0x00,
        0xEB, 0x5B
    };

    Util::OverwriteBytesAtAddress(0x5427E9, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x5427F5, Util::CalculateAddress(reinterpret_cast<uint32_t>(&OnSpellLearnEx), 0x5427F9));
}

void CharacterExtensions::SpellUnlearnExtension() {
    uint8_t patchBytes[] = {
        0x8D, 0x4D, 0x0C, 0x8D, 0x85, 0x58, 0xFD, 0xFF, 0xFF, 0x51, 0x50, 0xE8, 0x00, 0x00, 0x00, 0x00,
        0xEB, 0x48
    };

    Util::OverwriteBytesAtAddress(0x6E7304, patchBytes, sizeof(patchBytes));
    Util::OverwriteUInt32AtAddress(0x6E7310, Util::CalculateAddress(reinterpret_cast<uint32_t>(&OnSpellUnlearnEx), 0x6E7314));
}

uint32_t CharacterExtensions::CheckLFGRoles(uint32_t roles) {
    uint32_t classId = sub_6B1080();

    if (classId > *reinterpret_cast<uint32_t*>(0xAD3410) || classId < *reinterpret_cast<uint32_t*>(0xAD3414)) // ChrClasses.dbc max/min indexes
        classId = 0;

    LFGRolesRow* cdbcRoles = GlobalCDBCMap.getRow<LFGRolesRow>("LFGRoles", classId);

    return roles & cdbcRoles->Roles;
}

uint32_t CharacterExtensions::GetClassRoles(uint32_t classId) {
    LFGRolesRow* cdbcRoles = GlobalCDBCMap.getRow<LFGRolesRow>("LFGRoles", classId);

    return cdbcRoles->Roles;
}

int CharacterExtensions::Lua_GetAvailableRoles(lua_State* L) {
    ChrClassesRow* row = reinterpret_cast<ChrClassesRow*>(ClientDB::GetRow(reinterpret_cast<void*>(0xAD341C), sub_6B1080()));
    uint32_t classId = 0;
    LFGRolesRow* cdbcRole = 0;

    if (row)
        classId = row->m_ID;

    cdbcRole = GlobalCDBCMap.getRow<LFGRolesRow>("LFGRoles", classId);

    ClientLua::PushBoolean(L, cdbcRole->Roles & 2);
    ClientLua::PushBoolean(L, cdbcRole->Roles & 4);
    ClientLua::PushBoolean(L, cdbcRole->Roles & 8);
    return 3;
}

int CharacterExtensions::Lua_SetLFGRole(lua_State* L) {
    ChrClassesRow* row = reinterpret_cast<ChrClassesRow*>(ClientDB::GetRow(reinterpret_cast<void*>(0xAD341C), sub_6B1080()));
    LFGRolesRow* cdbcRole = 0;
    uint32_t roles = FrameScript::GetParam(L, 1, 0) != 0;
    uint32_t classId = 0;
    uintptr_t ptr = *reinterpret_cast<uintptr_t*>(0xBD0A28);

    if (FrameScript::GetParam(L, 2, 0))
        roles |= 2;
    if (FrameScript::GetParam(L, 3, 0))
        roles |= 4;
    if (FrameScript::GetParam(L, 4, 0))
        roles |= 8;

    if (row)
        classId = row->m_ID;

    cdbcRole = GlobalCDBCMap.getRow<LFGRolesRow>("LFGRoles", classId);

    CVar_C::sub_766940(reinterpret_cast<void*>(ptr), roles & cdbcRole->Roles, 1, 0, 0, 1);
    FrameScript::SignalEvent(EVENT_LFG_ROLE_UPDATE, 0);
    return 0;
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

int CharacterExtensions::SpecToIndex(uint32_t specID) {
    uint32_t spec1[] = { 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 34 };
    uint32_t spec2[] = { 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 35 };
    uint32_t spec3[] = { 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 36 };
    uint32_t spec4[] = { 31, 32, 33 };

    for (uint8_t i = 0; i < sizeof(spec1) / 4; i++)
        if (spec1[i] == CharacterDefines::getCharActiveSpec())
            return 0;

    for (uint8_t i = 0; i < sizeof(spec2) / 4; i++)
        if (spec2[i] == CharacterDefines::getCharActiveSpec())
            return 1;

    for (uint8_t i = 0; i < sizeof(spec3) / 4; i++)
        if (spec3[i] == CharacterDefines::getCharActiveSpec())
            return 2;

    for (uint8_t i = 0; i < sizeof(spec4) / 4; i++)
        if (spec4[i] == CharacterDefines::getCharActiveSpec())
            return 3;

    return 0xFFFFFFFF;
}
