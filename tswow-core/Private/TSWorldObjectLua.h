#pragma once

#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSWorldObject.h"
#include "TSEntityLua.h"
#include "TSWorldEntityLua.h"
#include "TSObjectLua.h"

template <typename T>
void TSLua::load_world_object_methods_t(sol::state& state, sol::usertype<T> & target, std::string const& name)
{
    load_object_methods_t<T>(state, target, name);
    load_world_entity_methods_t<TSWorldObject, T>(state, target, name);
}
