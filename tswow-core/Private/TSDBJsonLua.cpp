#include "TSLua.h"
#include "TSDBJson.h"

void TSLua::load_db_json_methods(sol::state& state)
{
    auto ts_db_json = state.new_usertype<TSDBJsonProvider>("TSDBJsonProvider");
    ts_db_json.set_function("SetDBNumber" , &TSDBJsonProvider::LSetDBNumber);
    ts_db_json.set_function("SetDBUInt32" , &TSDBJsonProvider::LSetDBUInt32);
    ts_db_json.set_function("SetDBInt32"  , &TSDBJsonProvider::LSetDBInt32);
    ts_db_json.set_function("SetDBUInt64" , &TSDBJsonProvider::LSetDBUInt64);
    ts_db_json.set_function("SetDBInt64"  , &TSDBJsonProvider::LSetDBInt64);
    ts_db_json.set_function("SetDBFloat"  , &TSDBJsonProvider::LSetDBFloat);
    ts_db_json.set_function("SetDBString" , &TSDBJsonProvider::LSetDBString);
    ts_db_json.set_function("SetDBBool"   , &TSDBJsonProvider::LSetDBBool);
    ts_db_json.set_function("SetDBObject" , &TSDBJsonProvider::LSetDBObject);
    ts_db_json.set_function("GetDBNumber", sol::overload(
        &TSDBJsonProvider::LGetDBNumber0,
        &TSDBJsonProvider::LGetDBNumber1
    ));
    ts_db_json.set_function("GetDBUInt32", sol::overload(
        &TSDBJsonProvider::LGetDBUInt320,
        &TSDBJsonProvider::LGetDBUInt321
    ));
    ts_db_json.set_function("GetDBInt32", sol::overload(
        &TSDBJsonProvider::LGetDBInt320,
        &TSDBJsonProvider::LGetDBInt321
    ));
    ts_db_json.set_function("GetDBUInt64", sol::overload(
        &TSDBJsonProvider::LGetDBUInt640,
        &TSDBJsonProvider::LGetDBUInt641
    ));
    ts_db_json.set_function("GetDBInt64", sol::overload(
        &TSDBJsonProvider::LGetDBInt640,
        &TSDBJsonProvider::LGetDBInt641
    ));
    ts_db_json.set_function("GetDBFloat", sol::overload(
        &TSDBJsonProvider::LGetDBFloat0,
        &TSDBJsonProvider::LGetDBFloat1
    ));
    ts_db_json.set_function("GetDBString", sol::overload(
        &TSDBJsonProvider::LGetDBString0,
        &TSDBJsonProvider::LGetDBString1
    ));
    ts_db_json.set_function("GetDBBool", sol::overload(
        &TSDBJsonProvider::LGetDBBool0,
        &TSDBJsonProvider::LGetDBBool1
    ));
    ts_db_json.set_function("GetDBObject" , sol::overload(
        &TSDBJsonProvider::LGetDBObject0,
        &TSDBJsonProvider::LGetDBObject1
    ));
}
