#pragma once

#include "TSLua.h"

template <typename V, typename T>
void TSLuaState::load_json_methods_t(sol::usertype<T> & target, uint32_t /*modid*/, std::string const& /*name*/)
{
    target.set_function("SetNumber", &V::LSetNumber);
    target.set_function("GetNumber", sol::overload(&V::LGetNumber0, &V::LGetNumber1));
    target.set_function("HasNumber", &V::LSetNumber);
    target.set_function("SetBool", &V::LSetBool);
    target.set_function("GetBool", sol::overload(&V::LGetBool0, &V::LGetBool1));
    target.set_function("HasBool", &V::LSetBool);
    target.set_function("SetString", &V::LSetString);
    target.set_function("GetString", sol::overload(&V::LGetString0, &V::LGetString1));
    target.set_function("HasString", &V::LSetString);
    target.set_function("SetJsonObject", &V::LSetJsonObject);
    target.set_function("GetJsonObject", sol::overload(&V::LGetJsonObject0, &V::LGetJsonObject1));
    target.set_function("HasJsonObject", &V::LSetJsonObject);
    target.set_function("SetJsonArray", &V::LSetJsonArray);
    target.set_function("GetJsonArray", sol::overload(&V::LGetJsonArray0, &V::LGetJsonArray1));
    target.set_function("HasJsonArray", &V::LSetJsonArray);
    target.set_function("Remove", &V::LRemove);
}
