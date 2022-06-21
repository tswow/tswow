#pragma once

#include "TSLua.h"
#include "TSEntity.h"
#include "TSJsonLua.h"

template <typename T>
void TSLua::load_entity_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& name)
{
    load_json_methods_t<TSEntityProvider, T>(state, target, name);
    target.set_function("SetUInt", &TSEntityProvider::LSetUInt);
    target.set_function("GetUInt", sol::overload(&TSEntityProvider::LGetUInt0, &TSEntityProvider::LGetUInt1));
    target.set_function("HasUInt", &TSEntityProvider::LHasUInt);
    target.set_function("SetInt", &TSEntityProvider::LSetInt);
    target.set_function("GetInt", sol::overload(&TSEntityProvider::LGetInt0, &TSEntityProvider::LGetInt1));
    target.set_function("HasInt", &TSEntityProvider::LHasInt);
    target.set_function("SetFloat", &TSEntityProvider::LSetFloat);
    target.set_function("GetFloat", sol::overload(&TSEntityProvider::LGetFloat0, &TSEntityProvider::LGetFloat1));
    target.set_function("HasFloat", &TSEntityProvider::LHasFloat);
    target.set_function("HasObject", &TSEntityProvider::LHasObject);
    target.set_function("GetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table def) {
        return prov.LGetObject(key, def);
    });
    target.set_function("SetObject", [=](TSEntityProvider& prov, std::string const& key, sol::table val) {
        prov.LSetObject(key, val);
    });
}
