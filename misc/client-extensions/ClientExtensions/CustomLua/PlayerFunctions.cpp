#include "ClientLua.h"
#include "Character/CharacterDefines.h"
#include "Logger.h"

LUA_FUNCTION(GetActiveSpec, (lua_State* L)) {
    ClientLua::PushNumber(L, CharacterDefines::getCharActiveSpec());
    return 1;
}

LUA_FUNCTION(SetActiveSpec, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1))
        CharacterDefines::setCharActiveSpec(ClientLua::GetNumber(L, 1));

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(SetMasteryRatings, (lua_State* L)) {
    CharacterDefines::setMasteryRatingSpec(0,ClientLua::GetNumber(L, 1));
    CharacterDefines::setMasteryRatingSpec(1,ClientLua::GetNumber(L, 2));
    CharacterDefines::setMasteryRatingSpec(2,ClientLua::GetNumber(L, 3));
    CharacterDefines::setMasteryRatingSpec(3,ClientLua::GetNumber(L, 4));

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(UpdateMasteryAmount, (lua_State* L)) {
    CharacterDefines::setMasteryPct(ClientLua::GetNumber(L, 1));
    CharacterDefines::setMasteryAmount(ClientLua::GetNumber(L, 2));

    ClientLua::PushNil(L);
    return 1;
}
