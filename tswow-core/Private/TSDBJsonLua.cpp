#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSDBJson.h"

void TSLua::load_db_json_methods(sol::state& state)
{
    auto ts_db_json = state.new_usertype<TSDBJsonProvider>("TSDBJsonProvider");
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBNumber);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBUInt32);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBInt32);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBUInt64);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBInt64);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBFloat);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBBool);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBObject);
    LUA_FIELD(ts_db_json, TSDBJsonProvider, SetDBArray);
    ts_db_json.set_function("GetDBNumber", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, double value) { return provider.GetDBNumber(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBNumber(key); }
    ));
    ts_db_json.set_function("GetDBUInt32", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, uint32 value) { return provider.GetDBUInt32(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBUInt32(key); }
    ));
    ts_db_json.set_function("GetDBInt32", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, int32 value) { return provider.GetDBInt32(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBInt32(key); }
    ));
    ts_db_json.set_function("GetDBUInt64", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, uint64 value) { return provider.GetDBUInt64(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBUInt64(key); }
    ));
    ts_db_json.set_function("GetDBInt64", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, int64 value) { return provider.GetDBInt64(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBInt64(key); }
    ));
    ts_db_json.set_function("GetDBFloat", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, float value) { return provider.GetDBFloat(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBFloat(key); }
    ));
    ts_db_json.set_function("GetDBBool", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, bool value) { return provider.GetDBBool(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBBool(key); }
    ));
    ts_db_json.set_function("GetDBObject", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, TSJsonObject value) { return provider.GetDBObject(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBObject(key); }
    ));
    ts_db_json.set_function("GetDBArray", sol::overload
    (
        [](TSDBJsonProvider& provider, std::string const& key, TSJsonArray value) { return provider.GetDBArray(key,value); },
        [](TSDBJsonProvider& provider, std::string const& key) { return provider.GetDBArray(key); }
    ));
}
