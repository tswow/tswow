#include "ClientLua.h"
#include "SharedDefines.h"

LUA_FUNCTION(GetSpellDescription, (lua_State* L)) {

    if (ClientLua::IsNumber(L, 1)) {
        uint32_t spellId = ClientLua::GetNumber(L, 1);
        char buffer[680];
        char dest[1024];

        if (ClientDB__GetLocalizedRow((void*)0xAD49D0, spellId, &buffer)) { // hex address is g_SpellRec struct
            SpellParserParseText(&buffer, &dest, 1024, 0, 0, 0, 0, 1, 0);
            ClientLua::PushString(L, dest);
            return 1;
        }
    }

    ClientLua::PushNil(L);
    return 1;
}
