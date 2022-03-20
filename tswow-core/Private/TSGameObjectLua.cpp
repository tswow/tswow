#include "TSLua.h"
#include "TSGameObject.h"
#include "TSWorldObjectLua.h"

#include "TSPlayer.h"
#include "TSGroup.h"
#include "TSWorldObject.h"
#include "TSGameObject.h"
#include "TSSpellInfo.h"
#include "TSCreature.h"
#include "TSMap.h"
#include "TSVehicle.h"
#include "TSCorpse.h"

void TSLuaState::load_gameobject_methods(uint32_t modid)
{
    auto ts_gameobject = new_usertype<TSGameObject>("TSGameObject");
    load_world_object_methods_t(ts_gameobject, modid, "TSGameObject");
    LUA_FIELD(ts_gameobject, TSGameObject, HasQuest);
    LUA_FIELD(ts_gameobject, TSGameObject, IsSpawned);
    LUA_FIELD(ts_gameobject, TSGameObject, IsTransport);
    LUA_FIELD(ts_gameobject, TSGameObject, IsActive);
    LUA_FIELD(ts_gameobject, TSGameObject, GetDisplayID);
    LUA_FIELD(ts_gameobject, TSGameObject, GetGoState);
    LUA_FIELD(ts_gameobject, TSGameObject, GetLootState);
    LUA_FIELD(ts_gameobject, TSGameObject, GetLootRecipient);
    LUA_FIELD(ts_gameobject, TSGameObject, GetLootRecipientGroup);
    LUA_FIELD(ts_gameobject, TSGameObject, GetDBTableGUIDLow);
    LUA_FIELD(ts_gameobject, TSGameObject, SetGoState);
    LUA_FIELD(ts_gameobject, TSGameObject, SetLootState);
    LUA_FIELD(ts_gameobject, TSGameObject, SaveToDB);
    LUA_FIELD(ts_gameobject, TSGameObject, RemoveFromWorld);
    LUA_FIELD(ts_gameobject, TSGameObject, UseDoorOrButton);
    LUA_FIELD(ts_gameobject, TSGameObject, Despawn);
    LUA_FIELD(ts_gameobject, TSGameObject, Respawn);
    LUA_FIELD(ts_gameobject, TSGameObject, SetRespawnTime);
    LUA_FIELD(ts_gameobject, TSGameObject, GetLoot);
    LUA_FIELD(ts_gameobject, TSGameObject, FireSmartEvent);
    LUA_FIELD(ts_gameobject, TSGameObject, IsAIEnabled);
}
