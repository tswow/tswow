#pragma once

#include "TSLua.h"
#include "TSObject.h"
#include "TSEntityLua.h"

template <typename T>
void TSLua::load_object_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& name)
{
    load_entity_methods_t<T>(state, target, name);
    LUA_FIELD(target, TSObject, IsNull);
    LUA_FIELD(target, TSObject, IsInWorld);
    LUA_FIELD(target, TSObject, GetScale);
    LUA_FIELD(target, TSObject, GetEntry);
    LUA_FIELD(target, TSObject, GetGUID);
    LUA_FIELD(target, TSObject, GetGUIDLow);
    LUA_FIELD(target, TSObject, GetTypeID);
    LUA_FIELD(target, TSObject, SetScale);
    LUA_FIELD(target, TSObject, SetFlag);
    LUA_FIELD(target, TSObject, RemoveFlag);
    LUA_FIELD(target, TSObject, HasFlag);
    LUA_FIELD(target, TSObject, SetCoreInt32);
    LUA_FIELD(target, TSObject, SetCoreUInt32);
    LUA_FIELD(target, TSObject, UpdateCoreUInt32);
    LUA_FIELD(target, TSObject, SetCoreFloat);
    LUA_FIELD(target, TSObject, SetCoreByte);
    LUA_FIELD(target, TSObject, SetCoreUInt16);
    LUA_FIELD(target, TSObject, SetCoreUInt64);
    LUA_FIELD(target, TSObject, GetCoreByte);
    LUA_FIELD(target, TSObject, GetCoreInt32);
    LUA_FIELD(target, TSObject, GetCoreUInt32);
    LUA_FIELD(target, TSObject, GetCoreFloat);
    LUA_FIELD(target, TSObject, GetCoreUInt16);
    LUA_FIELD(target, TSObject, GetCoreUInt64);
    LUA_FIELD(target, TSObject, ToPlayer);
    LUA_FIELD(target, TSObject, ToUnit);
    LUA_FIELD(target, TSObject, ToCreature);
    LUA_FIELD(target, TSObject, ToWorldObject);
    LUA_FIELD(target, TSObject, ToGameObject);
    LUA_FIELD(target, TSObject, ToCorpse);
    LUA_FIELD(target, TSObject, ToItem);
    LUA_FIELD(target, TSObject, GetEffectiveOwner);
    LUA_FIELD(target, TSObject, IsPlayer);
    LUA_FIELD(target, TSObject, IsGameObject);
    LUA_FIELD(target, TSObject, IsCreature);
    LUA_FIELD(target, TSObject, IsUnit);
    LUA_FIELD(target, TSObject, IsCorpse);
    LUA_FIELD(target, TSObject, IsItem);
}
