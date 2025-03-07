#include "ClientLua.h"
#include "SharedDefines.h"
#include "CDBCMgr/CDBCMgr.h"
#include "CDBCMgr/CDBCDefs/SpellAdditionalAttributes.h"
#include "Logger.h"

LUA_FUNCTION(GetSpellDescription, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        SpellRow row;
        char dest[1024];

        if (ClientDB::GetLocalizedRow((void*)0xAD49D0, spellId, &row)) { // hex address is g_SpellRec struct
            SpellParser::ParseText(&row, &dest, 1024, 0, 0, 0, 0, 1, 0);
            ClientLua::PushString(L, dest);
            return 1;
        }
    }

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(GetSpellNameById, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        SpellRow row;

        if (ClientDB::GetLocalizedRow((void*)0xAD49D0, spellId, &row)) {
            ClientLua::PushString(L, row.m_name_lang);
            ClientLua::PushString(L, row.m_nameSubtext_lang);
            return 2;
        }
    }

    ClientLua::PushNil(L);
    ClientLua::PushNil(L);
    return 2;
}
#pragma optimize("", off)
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
    SpellAdditionalAttributesRow* customAttributesRow = GlobalCDBCMap.getRow<SpellAdditionalAttributesRow>("SpellAdditionalAttributes", buffer.m_ID);

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
#pragma optimize("", on)
