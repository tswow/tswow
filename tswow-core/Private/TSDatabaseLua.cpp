#include "TSLua.h"
#include "TSDatabase.h"
#include "TSORM.h"
#include "TSORMGenerator.h"
#include "TSLuaVarargs.h"

void TSLua::load_database_methods(sol::state& state)
{
    auto ts_database_result = state.new_usertype<TSDatabaseResult>("TSDatabaseResult");
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
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetRow);
    LUA_FIELD(ts_database_result, TSDatabaseResult, GetString);

    auto ts_prepared_statement_world = state.new_usertype<TSPreparedStatementWorld>("TSPreparedStatementWorld");
    auto ts_prepared_statement_characters = state.new_usertype<TSPreparedStatementCharacters>("TSPreparedStatementCharacters");
    auto ts_prepared_statement_auth = state.new_usertype<TSPreparedStatementAuth>("TSPreparedStatementAuth");

    LUA_FIELD(ts_prepared_statement_world, TSPreparedStatement, Create);
    LUA_FIELD(ts_prepared_statement_characters, TSPreparedStatement, Create);
    LUA_FIELD(ts_prepared_statement_auth, TSPreparedStatement, Create);

    auto ts_prepared_statement_base = state.new_usertype<TSPreparedStatementBase>("TSPreparedStatementBase");
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
    LUA_FIELD(ts_prepared_statement_base, TSPreparedStatementBase, SetString);
    
    ts_prepared_statement_base.set_function("Send", sol::overload(
          [](TSPreparedStatementBase& stmnt) { return stmnt.Send(); }
        , [](TSPreparedStatementBase& stmnt, TSWorldDatabaseConnection& con) { return stmnt.Send(con); }
        , [](TSPreparedStatementBase& stmnt, TSAuthDatabaseConnection& con) { return stmnt.Send(con); }
        , [](TSPreparedStatementBase& stmnt, TSCharactersDatabaseConnection& con) { return stmnt.Send(con); }
    ));

    auto ts_database_connection_info = state.new_usertype<TSDatabaseConnectionInfo>("TSDatabaseConnectionInfo");
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, User);
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, Password);
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, Database);
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, Host);
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, PortOrSocket);
    LUA_FIELD(ts_database_connection_info, TSDatabaseConnectionInfo, SSL);

    auto ts_world_database_connection = state.new_usertype<TSWorldDatabaseConnection>("TSWorldDatabaseConnection");
    ts_world_database_connection.set("Query", sol::overload(
        [](TSWorldDatabaseConnection& con, std::string const& sql) { return con.Query(sql); },
        [](TSWorldDatabaseConnection& con, TSPreparedStatementBase* stmnt) { return con.Query(stmnt); }
    ));
    LUA_FIELD(ts_world_database_connection, TSWorldDatabaseConnection, Unlock);

    auto ts_auth_database_connection = state.new_usertype<TSAuthDatabaseConnection>("TSAuthDatabaseConnection");
    ts_auth_database_connection.set("Query", sol::overload(
        [](TSAuthDatabaseConnection& con, std::string const& sql) { return con.Query(sql); },
        [](TSAuthDatabaseConnection& con, TSPreparedStatementBase* stmnt) { return con.Query(stmnt); }
    ));
    LUA_FIELD(ts_auth_database_connection, TSAuthDatabaseConnection, Unlock);

    auto ts_characters_database_connection = state.new_usertype<TSCharactersDatabaseConnection>("TSCharactersDatabaseConnection");
    ts_characters_database_connection.set("Query", sol::overload(
        [](TSCharactersDatabaseConnection& con, std::string const& sql) { return con.Query(sql); },
        [](TSCharactersDatabaseConnection& con, TSPreparedStatementBase* stmnt) { return con.Query(stmnt); }
    ));
    LUA_FIELD(ts_characters_database_connection, TSCharactersDatabaseConnection, Unlock);

    state.set_function("GetWorldDBConnection", GetWorldDBConnection);
    state.set_function("GetAuthDBConnection", GetAuthDBConnection);
    state.set_function("GetCharactersDBConnection", GetCharactersDBConnection);

    state.set_function("QueryWorld", QueryWorld);
    state.set_function("QueryCharacters", QueryCharacters);
    state.set_function("QueryAuth", QueryAuth);

    state.set_function("WorldDatabaseInfo", WorldDatabaseInfo);
    state.set_function("CharactersDatabaseInfo", CharactersDatabaseInfo);
    state.set_function("AuthDastabaseInfo", AuthDatabaseInfo);

    state.set_function("PrepareWorldQuery", PrepareWorldQuery);
    state.set_function("PrepareCharactersQuery", PrepareCharactersQuery);
    state.set_function("PrepareAuthQuery", PrepareAuthQuery);

    state.set_function("CreateDatabaseSpec", LCreateDatabaseSpec);

    state.safe_script("function LoadDBEntry(x) x:Load(); return x; end");
    state.safe_script("function QueryDBEntry(x,sql) return x.LoadSQL(sql); end");
    state.safe_script("function LoadDBArrayEntry(x,...) return x.Load(...) end");
}
