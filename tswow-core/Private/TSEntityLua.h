#pragma once

#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSEntity.h"
#include "TSJsonLua.h"

template <typename T>
void TSLua::load_entity_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& name)
{
    load_json_methods_t<TSEntityProvider, T>(state, target, name);
    LUA_FIELD(target, TSEntityProvider, SetUInt);
    LUA_FIELD(target, TSEntityProvider, HasUInt);
    LUA_FIELD(target, TSEntityProvider, SetInt);
    LUA_FIELD(target, TSEntityProvider, HasInt);
    LUA_FIELD(target, TSEntityProvider, SetFloat);
    LUA_FIELD(target, TSEntityProvider, HasFloat);
    LUA_FIELD(target, TSEntityProvider, HasObject);
    
    LUA_FIELD_OVERLOAD_RET_1_1(target, TSEntityProvider, GetUInt, std::string const&, uint32_t);
    LUA_FIELD_OVERLOAD_RET_1_1(target, TSEntityProvider, GetInt, std::string const&, int32_t);
    LUA_FIELD_OVERLOAD_RET_1_1(target, TSEntityProvider, GetFloat, std::string const&, float);

    target.set_function("GetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table def) {
        return prov.LGetObject(key, def);
    });
    target.set_function("SetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table val) {
        prov.LSetObject(key, val);
    });
}
