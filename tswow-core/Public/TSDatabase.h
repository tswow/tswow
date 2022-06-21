/*
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#pragma once

#include "TSString.h"
#include "TSMain.h"
#include <memory>
#include <string>
#include <functional>

struct MySQLConnectionInfo;
class PreparedStatementBase;

class TC_GAME_API TSDatabaseResult /* : public std::enable_shared_from_this<TSDatabaseResult> */ {
public:
    //using std::enable_shared_from_this<TSDatabaseResult>::shared_from_this;
    TSDatabaseResult* operator->(){return this;}
    virtual uint8 GetUInt8(int index) = 0;
    virtual uint16 GetUInt16(int index) = 0;
    virtual uint32 GetUInt32(int index) = 0;
    virtual uint64 GetUInt64(int index) = 0;

    virtual int8 GetInt8(int index) = 0;
    virtual int16 GetInt16(int index) = 0;
    virtual int32 GetInt32(int index) = 0;
    virtual int64 GetInt64(int index) = 0;

    virtual float GetFloat(int index) = 0;
    virtual double GetDouble(int index) = 0;

    virtual TSString GetString(int index) = 0;

    virtual bool GetRow() = 0;
    virtual bool IsValid() = 0;

private:
    std::string LGetString(int index);
    friend class TSLua;
};

class TC_GAME_API TSPreparedStatementBase;
class TC_GAME_API TSPreparedStatement {
protected:
    uint32 m_id;
    uint32 m_paramCount;
    virtual std::shared_ptr<TSDatabaseResult> Send(TSPreparedStatementBase* stmnt) = 0;
    TSPreparedStatement(std::string const& sql, uint32 id);
public:
    TSPreparedStatementBase Create();
    TSPreparedStatement* operator->() { return this; }
    friend class TSPreparedStatementBase;
    friend struct TSWorldDatabaseConnection;
    friend struct TSAuthDatabaseConnection;
    friend struct TSCharactersDatabaseConnection;
};

class TC_GAME_API TSPreparedStatementWorld: public TSPreparedStatement {
public:
    TSPreparedStatementWorld(std::string const& sql);
    TSPreparedStatementWorld* operator->() { return this; }
private:
    virtual std::shared_ptr<TSDatabaseResult> Send(TSPreparedStatementBase* stmnt);
};

class TC_GAME_API TSPreparedStatementCharacters: public TSPreparedStatement {
public:
    TSPreparedStatementCharacters(std::string const& sql);
    TSPreparedStatementCharacters* operator->() { return this; }
private:
    virtual std::shared_ptr<TSDatabaseResult> Send(TSPreparedStatementBase* stmnt);
};

class TC_GAME_API TSPreparedStatementAuth: public TSPreparedStatement {
public:
    TSPreparedStatementAuth(std::string const& sql);
    TSPreparedStatementAuth* operator->() { return this; }
private:
    virtual std::shared_ptr<TSDatabaseResult> Send(TSPreparedStatementBase* stmnt);
};

struct TSWorldDatabaseConnection;
struct TSAuthDatabaseConnection;
struct TSCharactersDatabaseConnection;

class TC_GAME_API TSPreparedStatementBase
{
public:
    TSPreparedStatementBase(
          PreparedStatementBase* statement
        , TSPreparedStatement* holder
    );
    std::shared_ptr<TSDatabaseResult> Send();
    std::shared_ptr<TSDatabaseResult> Send(TSWorldDatabaseConnection & con);
    std::shared_ptr<TSDatabaseResult> Send(TSAuthDatabaseConnection & con);
    std::shared_ptr<TSDatabaseResult> Send(TSCharactersDatabaseConnection & con);

    TSPreparedStatementBase * SetNull(const uint8 index);

    TSPreparedStatementBase * SetUInt8(const uint8 index, const uint8 value);
    TSPreparedStatementBase * SetInt8(const uint8 index, const int8 value);

    TSPreparedStatementBase * SetUInt16(const uint8 index, const uint16 value);
    TSPreparedStatementBase * SetInt16(const uint8 index, const int16 value);

    TSPreparedStatementBase * SetUInt32(const uint8 index, const uint32 value);
    TSPreparedStatementBase * SetInt32(const uint8 index, const int32 value);

    TSPreparedStatementBase * SetUInt64(const uint8 index, const uint64 value);
    TSPreparedStatementBase * SetInt64(const uint8 index, const int64 value);

    TSPreparedStatementBase * SetFloat(const uint8 index, const float value);
    TSPreparedStatementBase * SetDouble(const uint8 index, const double value);

    TSPreparedStatementBase * SetString(const uint8 index, TSString value);
    TSPreparedStatementBase * operator->() { return this; }
private:
    PreparedStatementBase* m_statement;
    TSPreparedStatement* m_holder;

    std::shared_ptr<TSDatabaseResult> LSend0();
    std::shared_ptr<TSDatabaseResult> LSend1(TSWorldDatabaseConnection& con);
    std::shared_ptr<TSDatabaseResult> LSend2(TSAuthDatabaseConnection& con);
    std::shared_ptr<TSDatabaseResult> LSend3(TSCharactersDatabaseConnection& con);
    TSPreparedStatementBase * LSetString(const uint8 index, std::string const& value);

    friend class TSPreparedStatement;
    friend class TSPreparedStatementWorld;
    friend class TSPreparedStatementCharacters;
    friend class TSPreparedStatementAuth;
    friend struct TSWorldDatabaseConnection;
    friend struct TSAuthDatabaseConnection;
    friend struct TSCharactersDatabaseConnection;
    friend class TSLua;
};

class TC_GAME_API TSDatabaseConnectionInfo {
public:
    TSDatabaseConnectionInfo() = default;
    TSDatabaseConnectionInfo(
        MySQLConnectionInfo const* info
    );

    TSDatabaseConnectionInfo* operator->() { return this; }

    TSString User();
    TSString Password();
    TSString Database();
    TSString Host();
    TSString PortOrSocket();
    TSString SSL();

private:
    MySQLConnectionInfo const* _info;

    std::string LUser();
    std::string LPassword();
    std::string LDatabase();
    std::string LHost();
    std::string LPortOrSocket();
    std::string LSSL();

    friend class TSLua;
};

class WorldDatabaseConnection;
class LoginDatabaseConnection;
class CharacterDatabaseConnection;

struct TC_GAME_API TSWorldDatabaseConnection {
    WorldDatabaseConnection* m_connection;
    TSWorldDatabaseConnection(WorldDatabaseConnection*);
    TSWorldDatabaseConnection* operator->() { return this; }
    std::shared_ptr<TSDatabaseResult> Query(TSString sql);
    std::shared_ptr<TSDatabaseResult> Query(TSPreparedStatementBase * stmnt);
    void Unlock();
private:
    std::shared_ptr<TSDatabaseResult> LQuery0(std::string const& sql);
    std::shared_ptr<TSDatabaseResult> LQuery1(TSPreparedStatementBase * stmnt);
    friend class TSLua;
};

struct TC_GAME_API TSAuthDatabaseConnection {
    LoginDatabaseConnection* m_connection;
    TSAuthDatabaseConnection(LoginDatabaseConnection*);
    TSAuthDatabaseConnection* operator->() { return this; }
    std::shared_ptr<TSDatabaseResult> Query(TSString sql);
    std::shared_ptr<TSDatabaseResult> Query(TSPreparedStatementBase * stmnt);
    void Unlock();
private:
    std::shared_ptr<TSDatabaseResult> LQuery0(std::string const& sql);
    std::shared_ptr<TSDatabaseResult> LQuery1(TSPreparedStatementBase* stmnt);
    friend class TSLua;
};

struct TC_GAME_API TSCharactersDatabaseConnection {
    CharacterDatabaseConnection* m_connection;
    TSCharactersDatabaseConnection(CharacterDatabaseConnection*);
    TSCharactersDatabaseConnection* operator->() { return this; }
    std::shared_ptr<TSDatabaseResult> Query(TSString sql);
    std::shared_ptr<TSDatabaseResult> Query(TSPreparedStatementBase * stmnt);
    void Unlock();
private:
    std::shared_ptr<TSDatabaseResult> LQuery0(std::string const& sql);
    std::shared_ptr<TSDatabaseResult> LQuery1(TSPreparedStatementBase* stmnt);
    friend class TSLua;
};

TC_GAME_API TSWorldDatabaseConnection GetWorldDBConnection();
TC_GAME_API TSAuthDatabaseConnection GetAuthDBConnection();
TC_GAME_API TSCharactersDatabaseConnection GetCharactersDBConnection();

TC_GAME_API std::shared_ptr<TSDatabaseResult> QueryWorld(TSString query);
TC_GAME_API std::shared_ptr<TSDatabaseResult> QueryCharacters(TSString query);
TC_GAME_API std::shared_ptr<TSDatabaseResult> QueryAuth(TSString query);

TC_GAME_API std::shared_ptr<TSDatabaseConnectionInfo> WorldDatabaseInfo();
TC_GAME_API std::shared_ptr<TSDatabaseConnectionInfo> CharactersDatabaseInfo();
TC_GAME_API std::shared_ptr<TSDatabaseConnectionInfo> AuthDatabaseInfo();

TC_GAME_API TSPreparedStatementWorld PrepareWorldQuery(TSString query);
TC_GAME_API TSPreparedStatementCharacters PrepareCharactersQuery(TSString query);
TC_GAME_API TSPreparedStatementAuth PrepareAuthQuery(TSString query);

TC_GAME_API std::shared_ptr<TSDatabaseResult> LQueryWorld(std::string const& query);
TC_GAME_API std::shared_ptr<TSDatabaseResult> LQueryCharacters(std::string const& query);
TC_GAME_API std::shared_ptr<TSDatabaseResult> LQueryAuth(std::string const& query);

TC_GAME_API TSPreparedStatementWorld LPrepareWorldQuery(std::string const& query);
TC_GAME_API TSPreparedStatementCharacters LPrepareCharactersQuery(std::string const& query);
TC_GAME_API TSPreparedStatementAuth LPrepareAuthQuery(std::string const& query);

#define LoadRows(cls,query) cls::Load(query)
