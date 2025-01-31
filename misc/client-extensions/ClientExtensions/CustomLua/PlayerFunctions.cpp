#include "ClientLua.h"
#include "Character/CharacterDefines.h"
#include "Logger.h"

LUA_FUNCTION(GetActiveSpec, (lua_State* L)) {
    ClientLua::PushNumber(L, activeSpec);
    return 1;
}

LUA_FUNCTION(SetActiveSpec, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1))
        activeSpec = ClientLua::GetNumber(L, 1);

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(SetMasteryRatings, (lua_State* L)) {
    masteryRatingSpec1 = ClientLua::GetNumber(L, 1);
    masteryRatingSpec2 = ClientLua::GetNumber(L, 2);
    masteryRatingSpec3 = ClientLua::GetNumber(L, 3);
    masteryRatingSpec4 = ClientLua::GetNumber(L, 4);

    LOG_DEBUG << "Mastery1:" << masteryRatingSpec1;
    LOG_DEBUG << "Mastery2:" << masteryRatingSpec2;
    LOG_DEBUG << "Mastery3:" << masteryRatingSpec3;
    LOG_DEBUG << "Mastery4:" << masteryRatingSpec4;

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(UpdateMasteryAmount, (lua_State* L)) {
    masteryAmount = ClientLua::GetNumber(L, 1);
    masteryPct = ClientLua::GetNumber(L, 2);

    ClientLua::PushNil(L);
    return 1;
}
