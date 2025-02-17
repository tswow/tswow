#include "ClientLua.h"
#include "SharedDefines.h"
#include "CDBCMgr/CDBCMgr.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalAttributes.h"
#include "Logger.h"

LUA_FUNCTION(GetSpellDescription, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        SpellRow buffer;
        char dest[1024];

        if (ClientDB::GetLocalizedRow((void*)0xAD49D0, spellId, &buffer)) { // hex address is g_SpellRec struct
            SpellParser::ParseText(&buffer, &dest, 1024, 0, 0, 0, 0, 1, 0);
            ClientLua::PushString(L, dest);
            return 1;
        }
    }

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(UnitCustomCastingData, (lua_State* L)) {
    if (!ClientLua::IsString(L, 1))
        ClientLua::DisplayError(L, "Usage: UnitCustomCastingData(\"unit\")", "");

    CGUnit* unitFromName = ClntObjMgr::GetUnitFromName(ClientLua::ToLString(L, 1, 0));

    SpellRow buffer;
    float spellId = 0.f;
    bool hideCastbar = false;
    bool invertCastbar = false;
    uint32_t currentCast = 0;

    if (!unitFromName)
        return 0;

    if (unitFromName->currentCastId)
        currentCast = unitFromName->currentCastId;

    if (!currentCast && unitFromName->currentChannelId)
        currentCast = unitFromName->currentChannelId;

    if (!currentCast || !ClientDB::GetLocalizedRow((void*)0xAD49D0, currentCast, &buffer))
        return 0;

    spellId = static_cast<float>(buffer.m_ID);
    double castTime = SpellRec_C::GetCastTime(&buffer, 0, 0, 1);
    SpellAdditionalAttributesRow* customAttributesRow = GlobalDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", buffer.m_ID);

    if (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR))
        hideCastbar = true;

    if (castTime <= 250 && (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_LOW_TIME_FORCE_HIDE_CASTBAR)))
        hideCastbar = true;

    if (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_INVERT_CASTBAR))
        invertCastbar = true;

    ClientLua::PushNumber(L, spellId);
    ClientLua::PushBoolean(L, hideCastbar);
    ClientLua::PushBoolean(L, invertCastbar);
    return 3;
}

LUA_FUNCTION(FindSpellActionBarSlot, (lua_State* L)) {
    uint32_t spellID = ClientLua::GetNumber(L, 1);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uint8_t count = 0;

    for (uint8_t i = 0; i < 144; i++)
        if (actionBarSpellIDs[i] == spellID) {
            ClientLua::PushNumber(L, i);
            count++;
        }

    if (!count) {
        ClientLua::PushNil(L);
        return 1;
    }
    else
        return count;
}

LUA_FUNCTION(SetSpellInActionBarSlot, (lua_State* L)) {
    uint32_t spellID = ClientLua::GetNumber(L, 1);
    uint8_t slotID = ClientLua::GetNumber(L, 2);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uintptr_t* actionButtons = reinterpret_cast<uintptr_t*>(0xC1DED8);

    if (slotID < 144) {
        if (!actionButtons[slotID])
            actionButtons[slotID] = 1;

        actionBarSpellIDs[slotID] = spellID;
        ClientPacket::MSG_SET_ACTION_BUTTON(slotID, 1, 0);
    }

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(ReplaceActionBarSpell, (lua_State* L)) {
    uint32_t oldSpellID = ClientLua::GetNumber(L, 1);
    uint32_t newSpellID = ClientLua::GetNumber(L, 2);
    uintptr_t* actionBarSpellIDs = reinterpret_cast<uintptr_t*>(0xC1E358);
    uintptr_t* actionButtons = reinterpret_cast<uintptr_t*>(0xC1DED8);

    for (uint8_t i = 0; i < 144; i++)
        if (actionBarSpellIDs[i] == oldSpellID) {
            actionBarSpellIDs[i] = newSpellID;
            ClientPacket::MSG_SET_ACTION_BUTTON(i, 1, 0);

            for (uint8_t j = i + 72; j < 144; j += 12) {
                if (!actionButtons[j]) {
                    actionBarSpellIDs[i] = newSpellID;
                    actionButtons[j] = 1;
                    ClientPacket::MSG_SET_ACTION_BUTTON(j, 1, 0);
                }
            }
        }

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(FireActionBarSlotUpdateEvent, (lua_State* L)) {
    uint8_t slotID = ClientLua::GetNumber(L, 1);

    if (slotID < 144)
        FrameScript::SignalEvent(EVENT_ACTIONBAR_SLOT_CHANGED, "%d", slotID + 1);

    ClientLua::PushNil(L);
    return 1;
}
