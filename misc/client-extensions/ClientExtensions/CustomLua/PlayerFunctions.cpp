#include "ClientLua.h"
#include "Character/CharacterExtensions.h"
#include "Logger.h"

LUA_FUNCTION(GetShapeshiftFormID, (lua_State* L)) {
    uint64_t activePlayer = ClntObjMgr::GetActivePlayer();

    if (activePlayer) {
        CGUnit* activeObjectPtr = reinterpret_cast<CGUnit*>(ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT));
        ClientLua::PushNumber(L, CGUnit_C::GetShapeshiftFormId(activeObjectPtr));
        return 1;
    }

    ClientLua::PushNumber(L, 0);
    return 1;
}

LUA_FUNCTION(GetActiveSpec, (lua_State* L)) {
    ClientLua::PushNumber(L, CharacterDefines::getCharActiveSpec());
    return 1;
}

LUA_FUNCTION(SetActiveSpec, (lua_State* L)) {
    if (ClientLua::IsNumber(L, 1))
        CharacterDefines::setCharActiveSpec(ClientLua::GetNumber(L, 1));

    return 0;
}

LUA_FUNCTION(GetMasteryRating, (lua_State* L)) {
    uint64_t activePlayer = ClntObjMgr::GetActivePlayer();

    if (!activePlayer)
        return 0;

    CGPlayer* activeObjectPtr = reinterpret_cast<CGPlayer*>(ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT));
    uint32_t activeSpecIndex = CharacterExtensions::SpecToIndex(CharacterDefines::getCharActiveSpec());
    uint32_t masteryAmount = CharacterDefines::getMasteryAmount() + activeObjectPtr->PlayerData->crMastery;
    float Pct = CharacterDefines::getMasteryForSpec(activeSpecIndex) + (activeObjectPtr->PlayerData->crMastery / CharacterDefines::getMasteryRatingSpec(activeSpecIndex));

    ClientLua::PushNumber(L, masteryAmount ? masteryAmount : 0);
    ClientLua::PushNumber(L, Pct ? Pct : 0);
    return 2;
}

LUA_FUNCTION(SetMasteryRatings, (lua_State* L)) {
    float num1 = ClientLua::GetNumber(L, 1);
    float num2 = ClientLua::GetNumber(L, 2);
    float num3 = ClientLua::GetNumber(L, 3);
    float num4 = ClientLua::GetNumber(L, 4);

    CharacterDefines::setMasteryRatingSpec(0, num1 ? num1 : 1.f);
    CharacterDefines::setMasteryRatingSpec(1, num2 ? num2 : 1.f);
    CharacterDefines::setMasteryRatingSpec(2, num3 ? num3 : 1.f);
    CharacterDefines::setMasteryRatingSpec(3, num4 ? num4 : 1.f);

    return 0;
}

LUA_FUNCTION(UpdateMasteryAmount, (lua_State* L)) {
    CharacterDefines::setMasteryAmount(ClientLua::GetNumber(L, 1));
    CharacterDefines::setMasteryPct(ClientLua::GetNumber(L, 2));

    return 0;
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

    return 0;
}

LUA_FUNCTION(GetCombatRatingMult, (lua_State* L)) {
    uint64_t activePlayer = ClntObjMgr::GetActivePlayer();
    uint32_t rating = ClientLua::GetNumber(L, 1);
    float value = 0.f;

    if (activePlayer) {
        CGPlayer* activeObjectPtr = reinterpret_cast<CGPlayer*>(ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT));
        uint32_t level = activeObjectPtr->unitBase.unitData->level;
        gtCombatRatingsRow* row = reinterpret_cast<gtCombatRatingsRow*>(ClientDB::GetRow(reinterpret_cast<void*>(0xAD3B48), (rating - 1) * 100 + level));
        value = row->data;
    }

    ClientLua::PushNumber(L, value);
    return 1;
}

LUA_FUNCTION(GetCombatRatingScalar, (lua_State* L)) {
    uint64_t activePlayer = ClntObjMgr::GetActivePlayer();
    uint32_t rating = ClientLua::GetNumber(L, 1);
    float value = 0.f;

    if (activePlayer) {
        CGPlayer* activeObjectPtr = reinterpret_cast<CGPlayer*>(ClntObjMgr::ObjectPtr(activePlayer, TYPEMASK_UNIT));
        uint32_t classID = activeObjectPtr->unitBase.unitData->unitBytes0.classID;
        gtOCTClassCombatRatingScalarRow* row = reinterpret_cast<gtOCTClassCombatRatingScalarRow*>(ClientDB::GetRow(reinterpret_cast<void*>(0xAD3C20), (classID - 1) * 32 + rating));
        value = row->data;
    }

    ClientLua::PushNumber(L, value);
    return 1;
}
