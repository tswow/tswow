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
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBNumber, std::string const&, double);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBUInt32, std::string const&, uint32_t);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBInt32, std::string const&, int32_t);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBUInt64, std::string const&, uint64_t);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBInt64, std::string const&, int64_t);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBFloat, std::string const&, float);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBBool, std::string const&, bool);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBObject, std::string const&, TSJsonObject);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_db_json, TSDBJsonProvider, GetDBArray, std::string const&, TSJsonArray);
}
