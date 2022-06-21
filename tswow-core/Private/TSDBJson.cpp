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

    if (m_lua.valid())
    {
        auto stmt = CharacterDatabase.GetPreparedStatement(CHAR_UPD_JSON_DATA);
        stmt->setUInt32(0, m_type);
        stmt->setUInt32(1, 1);
        stmt->setUInt32(2, m_id);
        stmt->setString(3, lua_to_json(m_lua).dump());
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
                m_json.Parse(TSString(field[1].GetString()));
                break;
            }
            case DBJsonTableType::LUA: {
                m_lua = json_to_lua(nlohmann::json::parse(field[1].GetString()));
                break;
            }
            }
        } while (result->NextRow());
    }
}

void TSDBJson::Clear()
{
    m_json = TSJsonObject();
    if (m_lua.valid())
    {
        m_lua.clear();
    }
    m_dirty_deleted = true;
}

sol::table TSDBJson::get_lua()
{
    if (m_lua.valid())
    {
        return m_lua;
    }
    m_lua = TSLua::GetState().create_table();
    return m_lua;
}

void TSDBJsonProvider::SetDBNumber(TSString key, double value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBUInt32(TSString key, uint32 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBUInt64(TSString key, uint64 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBInt32(TSString key, int32 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBInt64(TSString key, int64 value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBFloat(TSString key, float value)
{
    get_json()->m_json.SetNumber(key,value);
}

void TSDBJsonProvider::SetDBString(TSString key, TSString value)
{
    get_json()->m_json.SetString(key,value);
}

void TSDBJsonProvider::SetDBBool(TSString key, bool value)
{
    get_json()->m_json.SetBool(key,value);
}

void TSDBJsonProvider::SetDBObject(TSString key, TSJsonObject value)
{
    get_json()->m_json.SetJsonObject(key,value);
}

void TSDBJsonProvider::SetDBArray(TSString key, TSJsonArray arr)
{
    get_json()->m_json.SetJsonArray(key,arr);
}

double TSDBJsonProvider::GetDBNumber(TSString key, double def)
{
    return get_json()->m_json.GetNumber(key, def);
}

uint32 TSDBJsonProvider::GetDBUInt32(TSString key, uint32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

uint64 TSDBJsonProvider::GetDBUInt64(TSString key, uint64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

int32 TSDBJsonProvider::GetDBInt32(TSString key, int32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

int64 TSDBJsonProvider::GetDBInt64(TSString key, int64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

float TSDBJsonProvider::GetDBFloat(TSString key, float def)
{
    return get_json()->m_json.GetNumber(key, def);
}

TSString TSDBJsonProvider::GetDBString(TSString key, TSString def)
{
    return get_json()->m_json.GetString(key, def);
}

bool TSDBJsonProvider::GetDBBool(TSString key, bool def)
{
    return get_json()->m_json.GetBool(key, def);
}

void TSDBJsonProvider::LSetDBNumber(std::string const& key, double value)
{
    get_json()->m_json.SetNumber(TSString(key), value);
}

void TSDBJsonProvider::LSetDBString(std::string const& key, std::string const& value)
{
    get_json()->m_json.SetString(TSString(key), TSString(value));
}

void TSDBJsonProvider::LSetDBBool(std::string const& key, bool value)
{
    get_json()->m_json.SetBool(TSString(key), value);
}

void TSDBJsonProvider::LSetDBObject(std::string const& key, sol::table table)
{
    get_json()->get_lua()[key] = table;
}

double TSDBJsonProvider::LGetDBNumber0(std::string const& key, double def)
{
    return get_json()->m_json.GetNumber(key, def);
}

uint32 TSDBJsonProvider::LGetDBUInt320(std::string const& key, uint32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

uint64 TSDBJsonProvider::LGetDBUInt640(std::string const& key, uint64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

int32 TSDBJsonProvider::LGetDBInt320(std::string const& key, int32 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

int64 TSDBJsonProvider::LGetDBInt640(std::string const& key, int64 def)
{
    return get_json()->m_json.GetNumber(key, def);
}

float TSDBJsonProvider::LGetDBFloat0(std::string const& key, float def)
{
    return get_json()->m_json.GetNumber(key, def);
}

double TSDBJsonProvider::LGetDBNumber1(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}

uint32 TSDBJsonProvider::LGetDBUInt321(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}
uint64 TSDBJsonProvider::LGetDBUInt641(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}

int32 TSDBJsonProvider::LGetDBInt321(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}

int64 TSDBJsonProvider::LGetDBInt641(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}

float TSDBJsonProvider::LGetDBFloat1(std::string const& key)
{
    return get_json()->m_json.GetNumber(key);
}

std::string TSDBJsonProvider::LGetDBString0(std::string const& key, std::string const def)
{
    return get_json()->m_json.GetString(key, def);
}

std::string TSDBJsonProvider::LGetDBString1(std::string const& key)
{
    return get_json()->m_json.GetString(key);
}

bool TSDBJsonProvider::LGetDBBool0(std::string const& key, bool def)
{
    return get_json()->m_json.GetBool(key, def);
}

bool TSDBJsonProvider::LGetDBBool1(std::string const& key)
{
    return get_json()->m_json.GetBool(key);
}

sol::table TSDBJsonProvider::LGetDBObject0(std::string const& key, sol::table table)
{
    sol::table lua = get_json()->get_lua();

    auto val = lua[key];
    if (val.valid() && val.get_type() == sol::type::table)
    {
        return val;
    }
    else
    {
        lua[key] = table;
        return table;
    }
}

sol::table TSDBJsonProvider::LGetDBObject1(std::string const& key)
{
    sol::table lua = get_json()->get_lua();
    auto val = lua[key];
    if (val.valid() && val.get_type() == sol::type::table)
    {
        return val;
    }
    else
    {
        return lua[key] = TSLua::GetState().create_table();
    }
}

void TSDBJsonProvider::DeleteDBField(TSString key)
{
    TSDBJson* json = get_json();
    json->m_dirty_deleted = true;
    json->m_json.Remove(key);
    if (json->m_lua.valid())
    {
        json->get_lua()[key.std_str()] = sol::nil;
    }
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

void TSDBJsonProvider::LDeleteDBField(std::string const& key)
{
    DeleteDBField(TSString(key));
}

void TSDBJsonProvider::ClearDBJson()
{
    get_json()->Clear();
}

void TSDBJsonProvider::LSetDBUInt32(std::string const& key, uint32 value)
{
    SetDBUInt32(key, value);
}

void TSDBJsonProvider::LSetDBInt32(std::string const& key, int32 value)
{
    SetDBInt32(key, value);
}

void TSDBJsonProvider::LSetDBUInt64(std::string const& key, uint64 value)
{
    SetDBUInt64(key, value);
}

void TSDBJsonProvider::LSetDBInt64(std::string const& key, int64 value)
{
    SetDBInt64(key, value);
}

void TSDBJsonProvider::LSetDBFloat(std::string const& key, float value)
{
    SetDBFloat(key, value);
}
