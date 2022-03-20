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
}
