#include "TSLua.h"
#include "TSWorldEntity.h"

void TSLuaState::load_worldentity_methods(uint32_t modid)
{
    auto ts_worldobjectgroup = new_usertype<TSWorldObjectGroup>("TSWorldObjectGroup");
    LUA_FIELD(ts_worldobjectgroup, TSWorldObjectGroup, Add);
    LUA_FIELD(ts_worldobjectgroup, TSWorldObjectGroup, Remove);
    LUA_FIELD(ts_worldobjectgroup, TSWorldObjectGroup, RemovedByObject);
    LUA_FIELD(ts_worldobjectgroup, TSWorldObjectGroup, Clear);

    auto ts_worldobjectgroups = new_usertype<TSWorldObjectGroups>("TSWorldObjectGroups");
    LUA_FIELD(ts_worldobjectgroups, TSWorldObjectGroups, GetGroup);
    LUA_FIELD(ts_worldobjectgroups, TSWorldObjectGroups, RemoveGroup);
    LUA_FIELD(ts_worldobjectgroups, TSWorldObjectGroups, ClearGroups);
}
