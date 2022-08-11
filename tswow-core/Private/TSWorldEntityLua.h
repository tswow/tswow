#pragma once

#include "TSLua.h"
#include "TSEntityLua.h"
#include "TSWorldEntity.h"

template <typename C, typename T>
void TSLua::load_world_entity_methods_t(sol::state & state, sol::usertype<T> & target, std::string const& name)
{
    load_entity_methods_t(state, target, name);
    LUA_FIELD(target, TSWorldEntityProvider<C>, GetEntityGroup);
    LUA_FIELD(target, TSWorldEntityProvider<C>, RemoveEntityGroup);
    LUA_FIELD(target, TSWorldEntityProvider<C>, ClearEntityGroup);
        target.set_function("AddTimer", sol::overload(
            [=](T & prov, uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback) {
                prov.LAddTimer0(time, loops, flags, callback);
            },
            [=](T & prov, uint32_t time, int32_t loops, sol::protected_function callback) {
                prov.LAddTimer1(time, loops, callback);
            },
            [=](T & prov, uint32_t time, sol::protected_function callback) {
                prov.LAddTimer2(time, callback);
            }
        ));
        target.set_function("AddNamedTimer", sol::overload(
            [=](T & prov, std::string const& name, uint32_t time, int32_t loops, uint32_t flags, sol::protected_function callback) {
                prov.LAddNamedTimer0(name, time, loops, flags, callback);
            },
            [=](T & prov, std::string const& name, uint32_t time, int32_t loops, sol::protected_function callback) {
                prov.LAddNamedTimer1(name, time, loops, callback);
            },
            [=](T & prov, std::string const& name, uint32_t time, sol::protected_function callback) {
                prov.LAddNamedTimer2(name, time, callback);
            }
        ));
    auto timer = state.new_usertype<TSTimer<C>>(name+"Timer");
    LUA_FIELD(timer, TSTimer<C>, Stop);
    LUA_FIELD(timer, TSTimer<C>, GetDiff);
    LUA_FIELD(timer, TSTimer<C>, GetFlags);
    LUA_FIELD(timer, TSTimer<C>, SetFlags);
    LUA_FIELD(timer, TSTimer<C>, GetRepeats);
    LUA_FIELD(timer, TSTimer<C>, SetRepeats);
    LUA_FIELD(timer, TSTimer<C>, GetDelay);
    LUA_FIELD(timer, TSTimer<C>, SetDelay);
    timer.set_function("GetName", &TSTimer<C>::LGetName);
}
