#include "ClientLua.h"
#include "SharedDefines.h"
#include "CustomDBCMgr/CustomDBCMgr.h"
#include "CustomDBCMgr/DBCDefs/SpellCustomAttributes.h"

LUA_FUNCTION(GetSpellDescription, (lua_State* L)) {

    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        char buffer[680];
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

    if (!unitFromName)
        return 0;

    if (!ClientDB::GetLocalizedRow((void*)0xAD49D0, unitFromName->currentCastId, &buffer))
        return 0;

    spellId = static_cast<float>(buffer.m_ID);

    SpellCustomAttributesRow* customAttributesRow = GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", buffer.m_ID);

    if (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR))
        hideCastbar = true;

    ClientLua::PushNumber(L, spellId);
    ClientLua::PushBoolean(L, hideCastbar);
    return 2;
}

LUA_FUNCTION(UnitCustomChannelData, (lua_State* L)) {
    if (!ClientLua::IsString(L, 1))
        ClientLua::DisplayError(L, "Usage: UnitCustomChannelData(\"unit\")", "");

    CGUnit* unitFromName = ClntObjMgr::GetUnitFromName(ClientLua::ToLString(L, 1, 0));

    SpellRow buffer;
    float spellId = 0.f;
    bool hideCastbar = 0.f;

    if (!unitFromName)
        return 0;

    if (!ClientDB::GetLocalizedRow((void*)0xAD49D0, unitFromName->currentChannelId, &buffer))
        return 0;

    spellId = static_cast<float>(buffer.m_ID);

    SpellCustomAttributesRow* customAttributesRow =
        GlobalDBCMap.getRow<SpellCustomAttributesRow>("SpellCustomAttributes", buffer.m_ID);

    if (customAttributesRow && (customAttributesRow->customAttr0 & SPELL_ATTR0_CU_FORCE_HIDE_CASTBAR))
        hideCastbar = true;

    ClientLua::PushNumber(L, spellId);
    ClientLua::PushBoolean(L, hideCastbar);
    return 2;
}
