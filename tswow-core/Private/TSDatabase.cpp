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

#include "TSDatabase.h"
#include "DatabaseEnv.h"
#include "MySQLConnection.h"
#include "TSString.h"
#include "TSConsole.h"
#include "PreparedStatement.h"
#include "WorldDatabase.h"
#include "LoginDatabase.h"
#include "CharacterDatabase.h"
#include "QueryResult.h"
#include <memory>
#include <algorithm>

std::string TSDatabaseResult::LGetString(int index)
{
    return GetString(index).std_str();
}

class TC_GAME_API TSDatabaseImpl final : public TSDatabaseResult {
    Field* field = nullptr;
    QueryResult result;
public:
    TSDatabaseImpl(QueryResult result) : TSDatabaseResult()
    {
        this->result = result;
    }

    bool IsValid() final
    {
        return result!=nullptr;
    }

    bool GetRow() final
    {
        if(!result)
        {
            return false;
        }

        if(!field)
        {
            field = result->Fetch();
            return true;
        }

        bool v = result->NextRow();
        if(v)
        {
            field = result->Fetch();
        }
        return v;
    }

#if TRINITY
#define TSGet(TC,AC) TC()
#elif AZEROTHCORE
#define TSGet(TC,AC) Get<AC>()
#endif

    uint8 GetUInt8(int index) final { return field[index].TSGet(GetUInt8, uint8); }
    uint16 GetUInt16(int index) final { return field[index].TSGet(GetUInt16,uint16); }
    uint32 GetUInt32(int index) final { return field[index].TSGet(GetUInt32,uint32); }
    uint64 GetUInt64(int index) final { return field[index].TSGet(GetUInt64,uint64); }

    int8 GetInt8(int index) final { return field[index].TSGet(GetInt8,int8); }
    int16 GetInt16(int index) final { return field[index].TSGet(GetInt16,int16); }
    int32 GetInt32(int index) final { return field[index].TSGet(GetInt32,int32); }
    int64 GetInt64(int index) final { return field[index].TSGet(GetInt64,int64); }

    float GetFloat(int index) final { return field[index].TSGet(GetFloat,float); }
    double GetDouble(int index) final { return field[index].TSGet(GetDouble,double); }

    TSString GetString(int index) final { 
#if TRINITY
        return TSString(field[index].GetString()); 
#elif AZEROTHCORE
        return this->GetString(index);
#endif
    }
};

// todo: don't copypaste
class TC_GAME_API TSDatabaseResultPrepared final : public TSDatabaseResult{
    Field * field = nullptr;
    PreparedQueryResult result;
public:
    TSDatabaseResultPrepared(PreparedQueryResult result) : TSDatabaseResult()
    {
        this->result = result;
    }

    bool IsValid() final
    {
        return result != nullptr;
    }

    bool GetRow() final
    {
        if (!result)
        {
            return false;
        }

        if (!field)
        {
            field = result->Fetch();
            return true;
        }

        bool v = result->NextRow();
        if (v)
        {
            field = result->Fetch();
        }
        return v;
    }

    uint8 GetUInt8(int index) final { return field[index].TSGet(GetUInt8,uint8); }
    uint16 GetUInt16(int index) final { return field[index].TSGet(GetUInt16,uint16); }
    uint32 GetUInt32(int index) final { return field[index].TSGet(GetUInt32,uint32); }
    uint64 GetUInt64(int index) final { return field[index].TSGet(GetUInt64,uint64); }

    int8 GetInt8(int index) final { return field[index].TSGet(GetInt8,uint8); }
    int16 GetInt16(int index) final { return field[index].TSGet(GetInt16,uint16); }
    int32 GetInt32(int index) final { return field[index].TSGet(GetInt32,uint32); }
    int64 GetInt64(int index) final { return field[index].TSGet(GetInt64,uint64); }

    float GetFloat(int index) final { return field[index].TSGet(GetFloat,float); }
    double GetDouble(int index) final { return field[index].TSGet(GetDouble,double); }

    TSString GetString(int index) final { 
#if TRINITY
        return TSString(field[index].GetString()); 
#elif AZEROTHCORE
        return TSString(GetString(index));
#endif
    }
};

std::shared_ptr<TSDatabaseResult> QueryWorld(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(WorldDatabase.Query(query.c_str()));
}

std::shared_ptr<TSDatabaseResult> QueryCharacters(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(CharacterDatabase.Query(query.c_str()));
}

std::shared_ptr<TSDatabaseResult> QueryAuth(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(LoginDatabase.Query(query.c_str()));
}

TSDatabaseConnectionInfo::TSDatabaseConnectionInfo(MySQLConnectionInfo const* info)
    : _info(info)
{}

TSString TSDatabaseConnectionInfo::User() { return JSTR(_info->user); }
TSString TSDatabaseConnectionInfo::Password() { return JSTR(_info->password); }
TSString TSDatabaseConnectionInfo::Database() { return JSTR(_info->database); }
TSString TSDatabaseConnectionInfo::Host() { return JSTR(_info->host); }
TSString TSDatabaseConnectionInfo::PortOrSocket() { return JSTR(_info->port_or_socket); }
TSString TSDatabaseConnectionInfo::SSL() { return JSTR(_info->ssl); }

std::string TSDatabaseConnectionInfo::LUser() { return _info->user;  }
std::string TSDatabaseConnectionInfo::LPassword() { return _info->password; }
std::string TSDatabaseConnectionInfo::LDatabase() { return _info->database; }
std::string TSDatabaseConnectionInfo::LHost() { return _info->host; }
std::string TSDatabaseConnectionInfo::LPortOrSocket() { return _info->port_or_socket; }
std::string TSDatabaseConnectionInfo::LSSL() { return _info->ssl; }

std::shared_ptr<TSDatabaseConnectionInfo> WorldDatabaseInfo()
{
    return std::make_shared<TSDatabaseConnectionInfo>(WorldDatabase.GetConnectionInfo());
}

std::shared_ptr<TSDatabaseConnectionInfo> CharactersDatabaseInfo()
{
    return std::make_shared<TSDatabaseConnectionInfo>(CharacterDatabase.GetConnectionInfo());
}

std::shared_ptr<TSDatabaseConnectionInfo> AuthDatabaseInfo()
{
    return std::make_shared<TSDatabaseConnectionInfo>(LoginDatabase.GetConnectionInfo());
}

TSPreparedStatementBase::TSPreparedStatementBase(
      PreparedStatementBase* statement
    , TSPreparedStatement* holder
)
    : m_statement(statement)
    , m_holder(holder)
{};
std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::Send()
{
    return m_holder->Send(this);
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::Send(TSWorldDatabaseConnection & con)
{
    return con.Query(this);
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::Send(TSAuthDatabaseConnection & con)
{
    return con.Query(this);
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::Send(TSCharactersDatabaseConnection & con)
{
    return con.Query(this);
}

TSPreparedStatementBase* TSPreparedStatementBase::SetNull(const uint8 index)
{
#if TRINITY
    m_statement->setNull(index);
#elif AZEROTHCORE
    m_statement->SetData(index, nullptr);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt8(const uint8 index, const uint8 value)
{
#if TRINITY
    m_statement->setUInt8(index, value);
#elif AZEROTHCORE
    m_statement->SetData<uint8>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt8(const uint8 index, const int8 value)
{
#if TRINITY
    m_statement->setInt8(index, value);
#elif AZEROTHCORE
    m_statement->SetData<int8>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt16(const uint8 index, const uint16 value)
{
#if TRINITY
    m_statement->setUInt16(index, value);
#elif AZEROTHCORE
    m_statement->SetData<uint16>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt16(const uint8 index, const int16 value)
{
#if TRINITY
    m_statement->setInt16(index, value);
#elif AZEROTHCORE
    m_statement->SetData<int16>(index, value);
#endif 
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt32(const uint8 index, const uint32 value)
{
#if TRINITY
    m_statement->setUInt32(index, value);
#elif AZEROTHCORE
    m_statement->SetData<uint32>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt32(const uint8 index, const int32 value)
{
#if TRINITY
    m_statement->setInt32(index, value);
#elif AZEROTHCORE
    m_statement->SetData<int32>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt64(const uint8 index, const uint64 value)
{
#if TRINITY
    m_statement->setUInt64(index, value);
#elif AZEROTHCORE
    m_statement->SetData<uint64>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt64(const uint8 index, const int64 value)
{
#if TRINITY
    m_statement->setInt64(index, value);
#elif AZEROTHCORE
    m_statement->SetData<int64>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetFloat(const uint8 index, const float value)
{
#if TRINITY
    m_statement->setFloat(index, value);
#elif AZEROTHCORE
    m_statement->SetData<float>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetDouble(const uint8 index, const double value)
{
#if TRINITY
    m_statement->setDouble(index, value);
#elif AZEROTHCORE
    m_statement->SetData<double>(index, value);
#endif
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetString(const uint8 index, TSString value)
{
#if TRINITY
    m_statement->setString(index, value.std_str());
#elif AZEROTHCORE
    m_statement->SetData(index, value.std_str());
#endif
    return this;
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::LSend0()
{
    return Send();
}
std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::LSend1(TSWorldDatabaseConnection& con)
{
    return Send(con);
}
std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::LSend2(TSAuthDatabaseConnection& con)
{
    return Send(con);
}
std::shared_ptr<TSDatabaseResult> TSPreparedStatementBase::LSend3(TSCharactersDatabaseConnection& con)
{
    return Send(con);
}
TSPreparedStatementBase* TSPreparedStatementBase::LSetString(const uint8 index, std::string const& value)
{
    return SetString(index, TSString(value));
}

TSPreparedStatementBase TSPreparedStatement::Create()
{
    return TSPreparedStatementBase(new PreparedStatementBase(0,m_paramCount), this);
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementWorld::Send(TSPreparedStatementBase* stmnt)
{
#if TRINITY
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(WorldDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSPreparedStatementWorld::Send not implemented for AzerothCore");
    return nullptr;
#endif
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementCharacters::Send(TSPreparedStatementBase* stmnt)
{
#if TRINITY
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(CharacterDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSPreparedStatementCharacters::Send not implemented for AzerothCore");
    return nullptr;
#endif
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementAuth::Send(TSPreparedStatementBase* stmnt)
{
#if TRINITY
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(LoginDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSPreparedStatementAuth::Send not implemented for AzerothCore");
    return nullptr;
#endif
}

TSPreparedStatement::TSPreparedStatement(std::string const& sql, uint32 id)
    : m_id(id)
    , m_paramCount(std::count(sql.begin(),sql.end(),'?'))
{

}

TSPreparedStatementWorld::TSPreparedStatementWorld(std::string const& sql)
#if TRINITY
    : TSPreparedStatement(sql, WorldDatabase.PrepareCustomStatement(sql))
#elif AZEROTHCORE
    : TSPreparedStatement(sql, 0)
#endif
{}

TSPreparedStatementCharacters::TSPreparedStatementCharacters(std::string const& sql)
#if TRINITY
    : TSPreparedStatement(sql, CharacterDatabase.PrepareCustomStatement(sql))
#elif AZEROTHCORE
    : TSPreparedStatement(sql, 0)
#endif
{}

TSPreparedStatementAuth::TSPreparedStatementAuth(std::string const& sql)
#if TRINITY
    : TSPreparedStatement(sql, LoginDatabase.PrepareCustomStatement(sql))
#elif AZEROTHCORE
    : TSPreparedStatement(sql, 0)
#endif
{}

TC_GAME_API TSPreparedStatementWorld PrepareWorldQuery(TSString query)
{
    return TSPreparedStatementWorld(query.std_str());
}

TC_GAME_API TSPreparedStatementCharacters PrepareCharactersQuery(TSString query)
{
    return TSPreparedStatementCharacters(query.std_str());
}

TC_GAME_API TSPreparedStatementAuth PrepareAuthQuery(TSString query)
{
    return TSPreparedStatementAuth(query.std_str());
}

static QueryResult ResultFromSet(ResultSet* res)
{
    if (!res || !res->GetRowCount() || !res->NextRow())
    {
        delete res;
        return QueryResult(nullptr);
    }
    return QueryResult(res);
}

static PreparedQueryResult PreparedResultFromSet(PreparedResultSet* res)
{
    if (!res || !res->GetRowCount())
    {
        delete res;
        return PreparedQueryResult(nullptr);
    }
    return PreparedQueryResult(res);
}

// WorldDBConnection

TSWorldDatabaseConnection::TSWorldDatabaseConnection(WorldDatabaseConnection* connection)
    : m_connection(connection) {}

std::shared_ptr<TSDatabaseResult> TSWorldDatabaseConnection::Query(TSString sql)
{
    return std::make_shared<TSDatabaseImpl>(ResultFromSet(m_connection->Query(sql.c_str())));
}

std::shared_ptr<TSDatabaseResult> TSWorldDatabaseConnection::Query(TSPreparedStatementBase * stmnt)
{
#if TRINITY
    auto res = std::make_shared<TSDatabaseResultPrepared>(
        WorldDatabase.QueryCustomStatement(
            stmnt->m_holder->m_id, stmnt->m_statement, m_connection
        ));
    delete stmnt->m_statement;
    return res;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldDatabaseConnection::Query is not implemented for AzerothCore");
    return nullptr;
#endif
}

void TSWorldDatabaseConnection::Unlock()
{
#if TRINITY
    m_connection->Unlock();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSWorldDatabaseConnection::Unlock is not implemented for AzerothCore");
#endif
}


// AuthDBConnection

TSAuthDatabaseConnection::TSAuthDatabaseConnection(LoginDatabaseConnection* connection)
    : m_connection(connection) {}

std::shared_ptr<TSDatabaseResult> TSAuthDatabaseConnection::Query(TSString sql)
{
    return std::make_shared<TSDatabaseImpl>(ResultFromSet(m_connection->Query(sql.c_str())));
}

std::shared_ptr<TSDatabaseResult> TSAuthDatabaseConnection::Query(TSPreparedStatementBase* stmnt)
{
#if TRINITY
    auto res = std::make_shared<TSDatabaseResultPrepared>(
        LoginDatabase.QueryCustomStatement(
            stmnt->m_holder->m_id, stmnt->m_statement, m_connection
        ));
    delete stmnt->m_statement;
    return res;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSAuthDatabaseConnection::Query is not implemented for AzerothCore");
    return nullptr;
#endif
}

std::shared_ptr<TSDatabaseResult> TSWorldDatabaseConnection::LQuery0(std::string const& sql)
{
    return Query(sql);
}

std::shared_ptr<TSDatabaseResult> TSWorldDatabaseConnection::LQuery1(TSPreparedStatementBase* stmnt)
{
    return Query(stmnt);
}

std::shared_ptr<TSDatabaseResult> TSAuthDatabaseConnection::LQuery0(std::string const& sql)
{
    return Query(sql);
}

std::shared_ptr<TSDatabaseResult> TSAuthDatabaseConnection::LQuery1(TSPreparedStatementBase* stmnt)
{
    return Query(stmnt);
}

std::shared_ptr<TSDatabaseResult> TSCharactersDatabaseConnection::LQuery0(std::string const& sql)
{
    return Query(sql);
}

std::shared_ptr<TSDatabaseResult> TSCharactersDatabaseConnection::LQuery1(TSPreparedStatementBase* stmnt)
{
    return Query(stmnt);
}

void TSAuthDatabaseConnection::Unlock()
{
#if TRINITY
    m_connection->Unlock();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSAuthDatabaseConnection::Unlock is not implemented for AzerothCore");
#endif
}


// CharDBConnection

TSCharactersDatabaseConnection::TSCharactersDatabaseConnection(CharacterDatabaseConnection* connection)
    : m_connection(connection) {}

std::shared_ptr<TSDatabaseResult> TSCharactersDatabaseConnection::Query(TSString sql)
{
    return std::make_shared<TSDatabaseImpl>(ResultFromSet(m_connection->Query(sql.c_str())));
}

std::shared_ptr<TSDatabaseResult> TSCharactersDatabaseConnection::Query(TSPreparedStatementBase* stmnt)
{
#if TRINITY
    auto res = std::make_shared<TSDatabaseResultPrepared>(
        CharacterDatabase.QueryCustomStatement(
            stmnt->m_holder->m_id, stmnt->m_statement, m_connection
        ));
    delete stmnt->m_statement;
    return res;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSCharactersDatabaseConnection::Query is not implemented for AzerothCore");
    return nullptr;
#endif
}

void TSCharactersDatabaseConnection::Unlock()
{
#if TRINITY
    m_connection->Unlock();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSCharactersDatabaseConnection::Unlock is not implemented for AzerothCore");
#endif
}

TC_GAME_API TSWorldDatabaseConnection GetWorldDBConnection()
{
#if TRINITY
    return TSWorldDatabaseConnection(WorldDatabase.GetFreeConnection());
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "GetWorldDBCOnnection is not implemented for AzerothCore");
    return TSWorldDatabaseConnection(nullptr);
#endif
}

TC_GAME_API TSAuthDatabaseConnection GetAuthDBConnection()
{
#if TRINITY
    return TSAuthDatabaseConnection(LoginDatabase.GetFreeConnection());
#elif AZEROTHCORE
    return TSAuthDatabaseConnection(nullptr);
#endif
}

TC_GAME_API TSCharactersDatabaseConnection GetCharactersDBConnection()
{
#if TRINITY
    return TSCharactersDatabaseConnection(CharacterDatabase.GetFreeConnection());
#elif AZEROTHCORE
    return TSCharactersDatabaseConnection(nullptr);
#endif
}
