#include "TSLua.h"
#include "TSDatabase.h"

void TSLuaState::load_database_methods(uint32_t modid)
{
    auto ts_database_result = new_usertype<TSDatabaseResult>("TSDatabaseResult");
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetUInt8);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetUInt16);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetUInt32);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetUInt64);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetInt8);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetInt16);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetInt32);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetInt64);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetFloat);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetDouble);
    ts_database_result.set_function("GetString", &TSDatabaseResult::LGetString);

    auto ts_prepared_statement_world = new_usertype<TSPreparedStatementWorld>("TSPreparedStatementWorld");
    auto ts_prepared_statement_characters = new_usertype<TSPreparedStatementCharacters>("TSPreparedStatementCharacters");
    auto ts_prepared_statement_auth = new_usertype<TSPreparedStatementAuth>("TSPreparedStatementAuth");

    LUA_FIELD(ts_prepared_statement_world, TSPreparedStatement, Create);
    LUA_FIELD(ts_prepared_statement_characters, TSPreparedStatement, Create);
    LUA_FIELD(ts_prepared_statement_auth, TSPreparedStatement, Create);

    auto ts_prepared_statement_base = new_usertype<TSPreparedStatementBase>("TSPreparedStatementBase");
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetNull);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetUInt8);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetInt8);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetUInt16);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetInt16);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetUInt32);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetInt32);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetUInt64);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetInt64);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetFloat);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetDouble);
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetDouble);

    ts_prepared_statement_base.set_function("SetString", &TSPreparedStatementBase::LSetString);
    ts_prepared_statement_base.set_function("Send", sol::overload(
          &TSPreparedStatementBase::LSend0
        , &TSPreparedStatementBase::LSend1
        , &TSPreparedStatementBase::LSend2
        , &TSPreparedStatementBase::LSend3
    ));

    auto ts_database_connection_info = new_usertype<TSDatabaseConnectionInfo>("TSDatabaseConnectionInfo");
    ts_database_connection_info.set_function("User", &TSDatabaseConnectionInfo::LUser);
    ts_database_connection_info.set_function("Password", &TSDatabaseConnectionInfo::LPassword);
    ts_database_connection_info.set_function("Database", &TSDatabaseConnectionInfo::LDatabase);
    ts_database_connection_info.set_function("Host", &TSDatabaseConnectionInfo::LHost);
    ts_database_connection_info.set_function("PortOrSocket", &TSDatabaseConnectionInfo::LPortOrSocket);
    ts_database_connection_info.set_function("SSL", &TSDatabaseConnectionInfo::LSSL);

    auto ts_world_database_connection = new_usertype<TSWorldDatabaseConnection>("TSWorldDatabaseConnection");
    ts_world_database_connection.set_function("Query", sol::overload(
          &TSWorldDatabaseConnection::LQuery0
        , &TSWorldDatabaseConnection::LQuery1
    ));

    auto ts_auth_database_connection = new_usertype<TSAuthDatabaseConnection>("TSAuthDatabaseConnection");
    ts_auth_database_connection.set_function("Query", sol::overload(
          &TSAuthDatabaseConnection::LQuery0
        , &TSAuthDatabaseConnection::LQuery1
    ));

    auto ts_characters_database_connection = new_usertype<TSCharactersDatabaseConnection>("TSCharactersDatabaseConnection");
    ts_characters_database_connection.set_function("Query", sol::overload(
          &TSCharactersDatabaseConnection::LQuery0
        , &TSCharactersDatabaseConnection::LQuery1
    ));

    set_function("GetWorldDBConnection", GetWorldDBConnection);
    set_function("GetAuthDBConnection", GetAuthDBConnection);
    set_function("GetCharactersDBConnection", GetCharactersDBConnection);

    set_function("QueryWorld", QueryWorld);
    set_function("QueryCharacters", QueryCharacters);
    set_function("QueryAuth", QueryAuth);

    set_function("WorldDatabaseInfo", WorldDatabaseInfo);
    set_function("CharactersDatabaseInfo", CharactersDatabaseInfo);
    set_function("AuthDastabaseInfo", AuthDatabaseInfo);

    set_function("PrepareWorldQuery", PrepareWorldQuery);
    set_function("PrepareCharactersQuery", PrepareCharactersQuery);
    set_function("PrepareAuthQuery", PrepareAuthQuery);
}
