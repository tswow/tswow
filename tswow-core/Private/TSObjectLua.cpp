#include "TSLua.h"
#include "TSObject.h"
#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSCreature.h"
#include "TSUnit.h"
#include "TSCorpse.h"


void TSLua::load_object_methods(sol::state& state)
{
    auto ts_object = state.new_usertype<TSObject>("TSObject", sol::base_classes, sol::bases<TSEntityProvider>());
    LUA_FIELD(ts_object, TSObject, IsNull);
    LUA_FIELD(ts_object, TSObject, IsInWorld);
    LUA_FIELD(ts_object, TSObject, GetScale);
    LUA_FIELD(ts_object, TSObject, GetEntry);
    LUA_FIELD(ts_object, TSObject, GetGUID);
    LUA_FIELD(ts_object, TSObject, GetGUIDLow);
    LUA_FIELD(ts_object, TSObject, GetTypeID);
    LUA_FIELD(ts_object, TSObject, SetScale);
    LUA_FIELD(ts_object, TSObject, SetFlag);
    LUA_FIELD(ts_object, TSObject, RemoveFlag);
    LUA_FIELD(ts_object, TSObject, HasFlag);
    LUA_FIELD(ts_object, TSObject, SetCoreInt32);
    LUA_FIELD(ts_object, TSObject, SetCoreUInt32);
    LUA_FIELD(ts_object, TSObject, UpdateCoreUInt32);
    LUA_FIELD(ts_object, TSObject, SetCoreFloat);
    LUA_FIELD(ts_object, TSObject, SetCoreByte);
    LUA_FIELD(ts_object, TSObject, SetCoreUInt16);
    LUA_FIELD(ts_object, TSObject, SetCoreUInt64);
    LUA_FIELD(ts_object, TSObject, GetCoreByte);
    LUA_FIELD(ts_object, TSObject, GetCoreInt32);
    LUA_FIELD(ts_object, TSObject, GetCoreUInt32);
    LUA_FIELD(ts_object, TSObject, GetCoreFloat);
    LUA_FIELD(ts_object, TSObject, GetCoreUInt16);
    LUA_FIELD(ts_object, TSObject, GetCoreUInt64);
    LUA_FIELD(ts_object, TSObject, ToPlayer);
    LUA_FIELD(ts_object, TSObject, ToUnit);
    LUA_FIELD(ts_object, TSObject, ToCreature);
    LUA_FIELD(ts_object, TSObject, ToWorldObject);
    LUA_FIELD(ts_object, TSObject, ToGameObject);
    LUA_FIELD(ts_object, TSObject, ToCorpse);
    LUA_FIELD(ts_object, TSObject, ToItem);
    LUA_FIELD(ts_object, TSObject, GetEffectiveOwner);
    LUA_FIELD(ts_object, TSObject, IsPlayer);
    LUA_FIELD(ts_object, TSObject, IsGameObject);
    LUA_FIELD(ts_object, TSObject, IsCreature);
    LUA_FIELD(ts_object, TSObject, IsUnit);
    LUA_FIELD(ts_object, TSObject, IsCorpse);
    LUA_FIELD(ts_object, TSObject, IsItem);
}
