#include "TSLua.h"
#include "TSWorldObject.h"
#include "TSWorldObjectLua.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSCorpse.h"

void TSLuaState::load_world_object_methods(sol::state& state)
{
    auto ts_worldobject = state.new_usertype<TSWorldObject>("TSWorldObject", sol::base_classes, sol::bases<TSObject,TSWorldEntityProvider<TSWorldObject>, TSEntityProvider>());
    load_world_object_methods_t(state, ts_worldobject, "TSWorldObject");

    auto ts_mutable_worldobject = state.new_usertype<TSMutableWorldObject>("TSMutableWorldObject");
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, get);
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, set);

    auto ts_worldobject_collection = state.new_usertype<TSWorldObjectCollection>("TSWorldObjectCollection");
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, filterInPlace);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, forEach);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, find);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get_length);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get);
}
