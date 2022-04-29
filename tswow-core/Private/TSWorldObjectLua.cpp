#include "TSLua.h"
#include "TSWorldObject.h"
#include "TSWorldObjectLua.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSCorpse.h"

void TSLuaState::load_world_object_methods(uint32_t modid)
{
    auto ts_worldobject = new_usertype<TSWorldObject>("TSWorldObject");
    load_world_object_methods_t(ts_worldobject, modid, "TSWorldObject");

    auto ts_mutable_worldobject = new_usertype<TSMutableWorldObject>("TSMutableWorldObject");
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, get);
    LUA_FIELD(ts_mutable_worldobject, TSMutableWorldObject, set);

    auto ts_worldobject_collection = new_usertype<TSWorldObjectCollection>("TSWorldObjectCollection");
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, filterInPlace);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, forEach);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, find);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get_length);
    LUA_FIELD(ts_worldobject_collection, TSWorldObjectCollection, get);
}
