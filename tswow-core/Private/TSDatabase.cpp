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
#include <memory>
#include <algorithm>

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

    uint8 GetUInt8(int index) final { return field[index].GetUInt8(); }
    uint16 GetUInt16(int index) final { return field[index].GetUInt16(); }
    uint32 GetUInt32(int index) final { return field[index].GetUInt32(); }
    uint64 GetUInt64(int index) final { return field[index].GetUInt64(); }

    int8 GetInt8(int index) final { return field[index].GetInt8(); }
    int16 GetInt16(int index) final { return field[index].GetInt16(); }
    int32 GetInt32(int index) final { return field[index].GetInt32(); }
    int64 GetInt64(int index) final { return field[index].GetInt64(); }

    float GetFloat(int index) final { return field[index].GetFloat(); }
    double GetDouble(int index) final { return field[index].GetDouble(); }

    TSString GetString(int index) final { return TSString(field[index].GetString()); }
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

    uint8 GetUInt8(int index) final { return field[index].GetUInt8(); }
    uint16 GetUInt16(int index) final { return field[index].GetUInt16(); }
    uint32 GetUInt32(int index) final { return field[index].GetUInt32(); }
    uint64 GetUInt64(int index) final { return field[index].GetUInt64(); }

    int8 GetInt8(int index) final { return field[index].GetInt8(); }
    int16 GetInt16(int index) final { return field[index].GetInt16(); }
    int32 GetInt32(int index) final { return field[index].GetInt32(); }
    int64 GetInt64(int index) final { return field[index].GetInt64(); }

    float GetFloat(int index) final { return field[index].GetFloat(); }
    double GetDouble(int index) final { return field[index].GetDouble(); }

    TSString GetString(int index) final { return TSString(field[index].GetString()); }
};


std::shared_ptr<TSDatabaseResult> QueryWorld(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(WorldDatabase.Query(query.std_str().c_str()));
}

std::shared_ptr<TSDatabaseResult> QueryCharacters(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(CharacterDatabase.Query(query.std_str().c_str()));
}

std::shared_ptr<TSDatabaseResult> QueryAuth(TSString query)
{
    return std::make_shared<TSDatabaseImpl>(LoginDatabase.Query(query.std_str().c_str()));
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
TSPreparedStatementBase* TSPreparedStatementBase::SetNull(const uint8 index)
{
    m_statement->setNull(index);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt8(const uint8 index, const uint8 value)
{
    m_statement->setUInt8(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt8(const uint8 index, const int8 value)
{
    m_statement->setInt8(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt16(const uint8 index, const uint16 value)
{
    m_statement->setUInt16(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt16(const uint8 index, const int16 value)
{
    m_statement->setInt16(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt32(const uint8 index, const uint32 value)
{
    m_statement->setUInt32(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt32(const uint8 index, const int32 value)
{
    m_statement->setInt32(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetUInt64(const uint8 index, const uint64 value)
{
    m_statement->setUInt64(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetInt64(const uint8 index, const int64 value)
{
    m_statement->setInt64(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetFloat(const uint8 index, const float value)
{
    m_statement->setFloat(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetDouble(const uint8 index, const double value)
{
    m_statement->setDouble(index, value);
    return this;
}

TSPreparedStatementBase* TSPreparedStatementBase::SetString(const uint8 index, TSString value)
{
    m_statement->setString(index, value.std_str());
    return this;
}

TSPreparedStatementBase TSPreparedStatement::Query()
{
    return TSPreparedStatementBase(new PreparedStatementBase(0,m_paramCount), this);
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementWorld::Send(TSPreparedStatementBase* stmnt)
{
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(WorldDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementCharacters::Send(TSPreparedStatementBase* stmnt)
{
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(CharacterDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
}

std::shared_ptr<TSDatabaseResult> TSPreparedStatementAuth::Send(TSPreparedStatementBase* stmnt)
{
    auto ptr = std::make_shared<TSDatabaseResultPrepared>(LoginDatabase.QueryCustomStatement(m_id, stmnt->m_statement));
    delete stmnt->m_statement;
    return ptr;
}

TSPreparedStatement::TSPreparedStatement(std::string const& sql, uint32 id)
    : m_id(id)
    , m_paramCount(std::count(sql.begin(),sql.end(),'?'))
{

}

TSPreparedStatementWorld::TSPreparedStatementWorld(std::string const& sql)
    : TSPreparedStatement(sql, WorldDatabase.PrepareCustomStatement(sql))
{}

TSPreparedStatementCharacters::TSPreparedStatementCharacters(std::string const& sql)
    : TSPreparedStatement(sql, CharacterDatabase.PrepareCustomStatement(sql))
{}

TSPreparedStatementAuth::TSPreparedStatementAuth(std::string const& sql)
    : TSPreparedStatement(sql, LoginDatabase.PrepareCustomStatement(sql))
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
