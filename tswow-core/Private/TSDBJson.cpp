#include "TSDBJson.h"

#include "CharacterDatabase.h"

#include <nlohmann/json.hpp>

TSDBJson::TSDBJson(DBJsonEntityType type, uint32 id)
    : m_id(id), m_type(type)
{
}

static nlohmann::json lua_to_json(sol::table table)
{
    nlohmann::json json;
    for (auto& [key, value] : table)
    {
        std::string s_key;
        switch (key.get_type())
        {
        case sol::type::number: {
            s_key = std::to_string(key.as<double>());
            break;
        }
        case sol::type::string: {
            s_key = key.as<std::string>();
            break;
        }
        case sol::type::boolean: {
            s_key = key.as<bool>();
            break;
        }
        default:
            break;
        }

        switch (value.get_type())
        {
        case sol::type::boolean: {
            json[s_key] = value.as<bool>();
            break;
        }
        case sol::type::number: {
            json[s_key] = value.as<double>();
            break;
        }
        case sol::type::string: {
            json[s_key] = value.as<std::string>();
            break;
        }
        case sol::type::table: {
            json[s_key] = lua_to_json(value.as<sol::table>());
            break;
        }
        default:
            break;
        }
    }
    return json;
}

static sol::table json_to_lua(nlohmann::json json)
{
    sol::table table = TSLua::GetState().create_table();
    for (auto& [key,value] : json.items())
    {
        switch (value.type())
        {
        case nlohmann::detail::value_t::boolean:
            table[key] = value.get<bool>();
            break;
        case nlohmann::detail::value_t::number_float:
        case nlohmann::detail::value_t::number_integer:
        case nlohmann::detail::value_t::number_unsigned:
            table[key] = value.get<float>();
            break;
        case nlohmann::detail::value_t::string:
            table[key] = value.get<std::string>();
            break;
        case nlohmann::detail::value_t::object:
            table[key] = json_to_lua(value);
            break;
        }
    }

    return table;
}

void TSDBJson::Save()
{
    if (m_json.get_length() > 0 || m_dirty_deleted)
    {
        auto stmt = CharacterDatabase.GetPreparedStatement(CHAR_UPD_JSON_DATA);
        stmt->setUInt32(0, m_type);
        stmt->setUInt32(1, 0);
        stmt->setUInt32(2, m_id);
        stmt->setString(3, m_json.toString());
        CharacterDatabase.Execute(stmt);
    }
    m_dirty_deleted = false;
}

void TSDBJson::Delete()
{
    auto stmt = CharacterDatabase.GetPreparedStatement(CHAR_DEL_JSON_DATA);
    stmt->setUInt32(0, m_type);
    stmt->setUInt32(1, m_id);
    CharacterDatabase.Execute(stmt);
}

void TSDBJson::Load()
{
    auto stmt = CharacterDatabase.GetPreparedStatement(CHAR_SEL_JSON_DATA);
    stmt->setUInt32(0, m_type);
    stmt->setUInt32(1, m_id);
    PreparedQueryResult result = CharacterDatabase.Query(stmt);
    if (result)
    {
        do
        {
            Field* field = result->Fetch();
            DBJsonTableType type = (DBJsonTableType) field[0].GetUInt8();
            switch (type)
            {
            case DBJsonTableType::JSON: {
                m_json = TSJsonObject();
                m_json.Parse(field[1].GetString());
                break;
            }
            /*
            case DBJsonTableType::LUA: {
                m_lua = json_to_lua(nlohmann::json::parse(field[1].GetString()));
                break;
            }
            */
            }
        } while (result->NextRow());
    }
}

void TSDBJson::Clear()
{
    m_json = TSJsonObject();
    m_dirty_deleted = true;
}

void TSDBJsonProvider::SetDBNumber(std::string const& key, double value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBUInt32(std::string const& key, uint32 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBUInt64(std::string const& key, uint64 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBInt32(std::string const& key, int32 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBInt64(std::string const& key, int64 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBFloat(std::string const& key, float value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBString(std::string const& key, std::string const& value)
{
    get_json()->m_json.SetString(key,value);
}

void TSDBJsonProvider::SetDBBool(std::string const& key, bool value)
{
    get_json()->m_json.SetBool(key,value);
}

void TSDBJsonProvider::SetDBObject(std::string const& key, TSJsonObject value)
{
    get_json()->m_json.SetJsonObject(key,value);
}

void TSDBJsonProvider::SetDBArray(std::string const& key, TSJsonArray arr)
{
    get_json()->m_json.SetJsonArray(key,arr);
}

double TSDBJsonProvider::GetDBNumber(std::string const& key, double def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSNumber<uint32> TSDBJsonProvider::GetDBUInt32(std::string const& key, uint32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSNumber<uint64> TSDBJsonProvider::GetDBUInt64(std::string const& key, uint64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSNumber<int32> TSDBJsonProvider::GetDBInt32(std::string const& key, int32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSNumber<int64> TSDBJsonProvider::GetDBInt64(std::string const& key, int64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSNumber<float> TSDBJsonProvider::GetDBFloat(std::string const& key, float def)
{
    return get_json()->m_json.GetNumber(key, def);
}

std::string TSDBJsonProvider::GetDBString(std::string const& key, std::string const& def)
{
    return get_json()->m_json.GetString(key, def);
}

bool TSDBJsonProvider::GetDBBool(std::string const& key, bool def)
{
    return get_json()->m_json.GetBool(key, def);
}

void TSDBJsonProvider::DeleteDBField(std::string const& key)
{
    TSDBJson* json = get_json();
    json->m_dirty_deleted = true;
    json->m_json.Remove(key);
}

void TSDBJsonProvider::SaveDBJson()
{
    get_json()->Save();
}

void TSDBJsonProvider::LoadDBJson()
{
    get_json()->Load();
}

void TSDBJsonProvider::DeleteDBJson()
{
    get_json()->Delete();
}

void TSDBJsonProvider::ClearDBJson()
{
    get_json()->Clear();
}

TSJsonObject TSDBJsonProvider::GetDBObject(std::string const& key, TSJsonObject def)
{
    return get_json()->m_json.GetJsonObject(key, def);
}

TSJsonArray TSDBJsonProvider::GetDBArray(std::string const& key, TSJsonArray def)
{
    return get_json()->m_json.GetJsonArray(key, def);
}
