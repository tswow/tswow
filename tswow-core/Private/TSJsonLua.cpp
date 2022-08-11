#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSJson.h"
#include "TSJsonLua.h"

void TSLua::load_json_methods(sol::state& state)
{
    auto ts_jsonobject = state.new_usertype<TSJsonObject>("TSJsonObject");
    load_json_methods_t<TSJsonObject,TSJsonObject>(state, ts_jsonobject, "JsonObject");

    auto ts_jsonarray = state.new_usertype<TSJsonArray>("TSJsonArray");
    LUA_FIELD(ts_jsonarray, TSJsonArray, GetJsonArray);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasJsonArray);
    LUA_FIELD(ts_jsonarray, TSJsonArray, Remove);
    LUA_FIELD(ts_jsonarray, TSJsonArray, isValid);
    LUA_FIELD(ts_jsonarray, TSJsonArray, SetBool);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasBool);
    LUA_FIELD(ts_jsonarray, TSJsonArray, InsertBool);
    LUA_FIELD(ts_jsonarray, TSJsonArray, PushBool);
    LUA_FIELD(ts_jsonarray, TSJsonArray, SetNumber);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasNumber);
    LUA_FIELD(ts_jsonarray, TSJsonArray, InsertNumber);
    LUA_FIELD(ts_jsonarray, TSJsonArray, PushNumber);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasString);
    LUA_FIELD(ts_jsonarray, TSJsonArray, SetNull);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasNull);
    LUA_FIELD(ts_jsonarray, TSJsonArray, InsertNull);
    LUA_FIELD(ts_jsonarray, TSJsonArray, PushNull);
    LUA_FIELD(ts_jsonarray, TSJsonArray, HasJsonObject);
    LUA_FIELD(ts_jsonarray, TSJsonArray, SetJsonObject);
    LUA_FIELD(ts_jsonarray, TSJsonArray, SetString);
    LUA_FIELD(ts_jsonarray, TSJsonArray, InsertString);
    LUA_FIELD(ts_jsonarray, TSJsonArray, PushString);

    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, GetBool, unsigned, bool);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, GetNumber, unsigned, double);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, GetString, unsigned, std::string const&);

    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, SetJsonObject, unsigned, TSJsonObject);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, GetJsonObject, unsigned, TSJsonObject);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, InsertJsonObject, unsigned, TSJsonObject);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_jsonarray, TSJsonArray, PushJsonObject, TSJsonObject);

    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, SetJsonArray, unsigned, TSJsonArray);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, GetJsonArray, unsigned, TSJsonArray);
    LUA_FIELD_OVERLOAD_RET_1_1(ts_jsonarray, TSJsonArray, InsertJsonArray, unsigned, TSJsonArray);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_jsonarray, TSJsonArray, PushJsonArray, TSJsonArray);
    LUA_FIELD_OVERLOAD_RET_0_1(ts_jsonarray, TSJsonArray, toString, int);
}
