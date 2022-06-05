#include "TSLua.h"
#include "TSJson.h"
#include "TSJsonLua.h"

void TSLuaState::load_json_methods(sol::state& state)
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


    ts_jsonarray.set_function("GetBool", sol::overload(
        &TSJsonArray::LGetBool0
        , &TSJsonArray::LGetBool1
    ));
    ts_jsonarray.set_function("GetNumber", sol::overload(
        &TSJsonArray::LGetNumber0
        , &TSJsonArray::LGetNumber1
    ));
    ts_jsonarray.set_function("GetString", sol::overload(
        &TSJsonArray::LGetString0
        , &TSJsonArray::LGetString1
    ));
    ts_jsonarray.set_function("SetString", &TSJsonArray::LSetString);
    ts_jsonarray.set_function("InsertString", &TSJsonArray::LInsertString);
    ts_jsonarray.set_function("LPushString", &TSJsonArray::LPushString),
        ts_jsonarray.set_function("SetJsonObject", sol::overload(
            &TSJsonArray::LSetJsonObject0
            , &TSJsonArray::LSetJsonObject1
        ));
    ts_jsonarray.set_function("GetJsonObject", sol::overload(
        &TSJsonArray::LGetJsonObject0
        , &TSJsonArray::LGetJsonObject1
    ));
    ts_jsonarray.set_function("InsertJsonObject", sol::overload(
        &TSJsonArray::LInsertJsonObject0
        , &TSJsonArray::LInsertJsonObject1
    ));
    ts_jsonarray.set_function("PushJsonObject", sol::overload(
        &TSJsonArray::LPushJsonObject0
        , &TSJsonArray::LPushJsonObject1
    ));
    ts_jsonarray.set_function("SetJsonArray", sol::overload(
        &TSJsonArray::LSetJsonArray0
        , &TSJsonArray::LSetJsonArray1
    ));
    ts_jsonarray.set_function("GetJsonArray", sol::overload(
        &TSJsonArray::LGetJsonArray0
        , &TSJsonArray::LGetJsonArray1
    ));
    ts_jsonarray.set_function("InsertJsonArray", sol::overload(
        &TSJsonArray::LInsertJsonArray0
        , &TSJsonArray::LInsertJsonArray1
    ));
    ts_jsonarray.set_function("PushJsonArray", sol::overload(
        &TSJsonArray::LPushJsonArray0
        , &TSJsonArray::LPushJsonArray1
    ));
    ts_jsonarray.set_function("toString", sol::overload(
        &TSJsonArray::LtoString0
        , &TSJsonArray::LtoString1
    ));
}
