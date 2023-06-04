#include "TSGUID.h"
#include "TSLua.h"

void TSLua::load_guid_methods(sol::state& state)
{
    auto ts_guid = state.new_usertype<TSGUID>("TSGUID");
    LUA_FIELD(ts_guid, TSGUID, GetCounter);
    LUA_FIELD(ts_guid, TSGUID, GetEntry);
    LUA_FIELD(ts_guid, TSGUID, GetType);
    LUA_FIELD(ts_guid, TSGUID, IsEmpty);
    LUA_FIELD(ts_guid, TSGUID, IsCreature);
    LUA_FIELD(ts_guid, TSGUID, IsPet);
    LUA_FIELD(ts_guid, TSGUID, IsVehicle);
    LUA_FIELD(ts_guid, TSGUID, IsCreatureOrPet);
    LUA_FIELD(ts_guid, TSGUID, IsCreatureOrVehicle);
    LUA_FIELD(ts_guid, TSGUID, IsAnyTypeCreature);
    LUA_FIELD(ts_guid, TSGUID, IsPlayer);
    LUA_FIELD(ts_guid, TSGUID, IsUnit);
    LUA_FIELD(ts_guid, TSGUID, IsItem);
    LUA_FIELD(ts_guid, TSGUID, IsGameObject);
    LUA_FIELD(ts_guid, TSGUID, IsDynamicObject);
    LUA_FIELD(ts_guid, TSGUID, IsCorpse);
    LUA_FIELD(ts_guid, TSGUID, IsTransport);
    LUA_FIELD(ts_guid, TSGUID, IsMOTransport);
    LUA_FIELD(ts_guid, TSGUID, IsAnyTypeGameObject);
    LUA_FIELD(ts_guid, TSGUID, IsInstance);
    LUA_FIELD(ts_guid, TSGUID, IsGroup);
    state.set_function("CreateGUID", sol::overload
    (
        [](TSNumber<uint32> high, TSNumber<uint32> counter) { return CreateGUID(high, counter); },
        [](TSNumber<uint32> high, TSNumber<uint32> entry, TSNumber<uint32> counter) { return CreateGUID(high, entry, counter); }
    ));
}
