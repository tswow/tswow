#pragma once

#include "TSLua.h"
#include "TSLuaVarargs.h"

template <typename V, typename T>
void TSLua::load_json_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& /*name*/)
{
    LUA_FIELD(target, V, SetNumber);
    LUA_FIELD(target, V, HasNumber);
    LUA_FIELD(target, V, SetBool);
    LUA_FIELD(target, V, HasBool);
    LUA_FIELD(target, V, SetString);
    LUA_FIELD(target, V, HasString);
    LUA_FIELD(target, V, HasJsonObject);
    LUA_FIELD(target, V, HasJsonArray);
    LUA_FIELD(target, V, Remove);

    LUA_FIELD_OVERLOAD_RET_1_1(target, V, GetNumber, std::string const&, double);
    LUA_FIELD_OVERLOAD_RET_1_1(target, V, GetBool, std::string const&, bool);
    LUA_FIELD_OVERLOAD_RET_1_1(target, V, GetString, std::string const&, std::string const&);
    LUA_FIELD_OVERLOAD_RET_1_1(target, V, GetJsonObject, std::string const&, TSJsonObject);
    LUA_FIELD_OVERLOAD_RET_1_1(target, V, SetJsonObject, std::string const&, TSJsonObject);

    target.set_function("GetJsonArray", sol::overload(
        [](V& v, std::string const& key, TSJsonArray value) { return v.GetJsonArray(key, value); },
        [](V& v, std::string const& key) { return v.GetJsonArray(key, TSJsonArray()); }
    ));

    target.set_function("SetJsonArray", sol::overload(
        [](V& v, std::string const& key, TSJsonArray value) { return v.SetJsonArray(key, value); },
        [](V& v, std::string const& key) { return v.SetJsonArray(key, TSJsonArray()); }
    ));
}
