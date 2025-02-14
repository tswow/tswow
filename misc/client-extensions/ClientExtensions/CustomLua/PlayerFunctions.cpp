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
    CharacterDefines::setMasteryRatingSpec(0, ClientLua::GetNumber(L, 1));
    CharacterDefines::setMasteryRatingSpec(1, ClientLua::GetNumber(L, 2));
    CharacterDefines::setMasteryRatingSpec(2, ClientLua::GetNumber(L, 3));
    CharacterDefines::setMasteryRatingSpec(3, ClientLua::GetNumber(L, 4));

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(UpdateMasteryAmount, (lua_State* L)) {
    CharacterDefines::setMasteryPct(ClientLua::GetNumber(L, 1));
    CharacterDefines::setMasteryAmount(ClientLua::GetNumber(L, 2));

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(GetShapeshiftFormID, (lua_State* L)) {
    uint64_t activePlayer = ClntObjMgr::GetActivePlayer();

    if (activePlayer) {
        void* activeObjectPtr = ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT);
        ClientLua::PushNumber(L, CGUnit_C::GetShapeshiftFormId(activeObjectPtr));
        return 1;
    }

    ClientLua::PushNumber(L, 0);
    return 1;
}

LUA_FUNCTION(FireTalentUpdateEvent, (lua_State* L)) {
    FrameScript::SignalEvent(625, 0);

    ClientLua::PushNil(L);
    return 1;
}

LUA_FUNCTION(UpdateSpellChargeMap, (lua_State* L)) {
    uint32_t spellID = ClientLua::GetNumber(L, 1);
    CharacterDefines::SpellCharge temp;

    temp.currentCharges = ClientLua::GetNumber(L, 2);
    temp.maxCharges = ClientLua::GetNumber(L, 3);
    temp.async = OsGetAsyncTimeMs();
    temp.remainingCooldown = ClientLua::GetNumber(L, 4);
    temp.cooldown = ClientLua::GetNumber(L, 4);

    auto it = CharacterDefines::spellChargeMap.find(spellID);

    if (it != CharacterDefines::spellChargeMap.end()) {
        CharacterDefines::SpellCharge temp2 = it->second;

        if (!temp.cooldown)
            temp.cooldown = temp2.cooldown;

        it->second = temp;
    }
    else
        CharacterDefines::spellChargeMap.insert(std::make_pair(spellID, temp));

    ClientLua::PushNil(L);
    return 1;
}
