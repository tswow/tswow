#pragma once

#include "TSLua.h"
#include "TSEntity.h"
#include "TSJsonLua.h"

template <typename T>
void TSLuaState::load_entity_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name)
{
    load_json_methods_t<TSEntityProvider, T>(target, modid, name);
    LUA_FIELD(target, TSEntityProvider, SetRawUInt8);
    LUA_FIELD(target, TSEntityProvider, GetRawUInt8);
    LUA_FIELD(target, TSEntityProvider, SetRawInt8);
    LUA_FIELD(target, TSEntityProvider, GetRawInt8);
    LUA_FIELD(target, TSEntityProvider, SetRawUInt16);
    LUA_FIELD(target, TSEntityProvider, GetRawUInt16);
    LUA_FIELD(target, TSEntityProvider, SetRawInt16);
    LUA_FIELD(target, TSEntityProvider, GetRawInt16);
    LUA_FIELD(target, TSEntityProvider, SetRawUInt32);
    LUA_FIELD(target, TSEntityProvider, GetRawUInt32);
    LUA_FIELD(target, TSEntityProvider, SetRawInt32);
    LUA_FIELD(target, TSEntityProvider, GetRawInt32);
    LUA_FIELD(target, TSEntityProvider, SetRawUInt64);
    LUA_FIELD(target, TSEntityProvider, GetRawUInt64);
    LUA_FIELD(target, TSEntityProvider, GetRawInt64);
    LUA_FIELD(target, TSEntityProvider, SetRawInt64);
    LUA_FIELD(target, TSEntityProvider, SetRawFloat);
    LUA_FIELD(target, TSEntityProvider, GetRawFloat);
    LUA_FIELD(target, TSEntityProvider, SetRawDouble);
    target.set_function("SetUInt", &TSEntityProvider::LSetUInt);
    target.set_function("GetUInt", sol::overload(&TSEntityProvider::LGetUInt0, &TSEntityProvider::LGetUInt1));
    target.set_function("HasUInt", &TSEntityProvider::LSetUInt);
    target.set_function("SetInt", &TSEntityProvider::LSetInt);
    target.set_function("GetInt", sol::overload(&TSEntityProvider::LGetInt0, &TSEntityProvider::LGetInt1));
    target.set_function("HasInt", &TSEntityProvider::LSetInt);
    target.set_function("SetFloat", &TSEntityProvider::LSetFloat);
    target.set_function("GetFloat", sol::overload(&TSEntityProvider::LGetFloat0, &TSEntityProvider::LGetFloat1));
    target.set_function("HasFloat", &TSEntityProvider::LSetFloat);
    target.set_function("HasObject", &TSEntityProvider::LHasObject);
    target.set_function("GetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table def) {
        return prov.LGetObject(modid, key, def);
    });
    target.set_function("SetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table val) {
        prov.LSetObject(modid, key, val);
    });
}
