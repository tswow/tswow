#pragma once

#include "sol/sol.hpp"
#include "TSJson.h"
#include "TSString.h"

enum DBJsonEntityType
{
    PLAYER = 0,
};

enum DBJsonTableType
{
    JSON = 0,
    LUA = 1
};

// todo: transaction support
class TSDBJson
{
    sol::table m_lua;
    TSJsonObject m_json;
    bool m_dirty_deleted;
    DBJsonEntityType m_type;
    uint32 m_id;
    sol::table get_lua();
public:
    TSDBJson(DBJsonEntityType type, uint32 id);
    void Save();
    void Load();
    void Delete();
    void Clear();
    friend class TSDBJsonProvider;
};

class TSDBJsonProvider
{
    virtual TSDBJson * get_json() = 0;
public:
    void SetDBNumber(TSString key, double value);
    void SetDBUInt32(TSString key, uint32 value);
    void SetDBUInt64(TSString key, uint64 value);
    void SetDBInt32(TSString key, int32 value);
    void SetDBInt64(TSString key, int64 value);
    void SetDBFloat(TSString key, float value);

    void SetDBString(TSString key, TSString value);
    void SetDBBool(TSString key, bool value);
    void SetDBObject(TSString key, TSJsonObject json);
    void SetDBArray(TSString key, TSJsonArray arr);

    double GetDBNumber(TSString key, double def = 0);
    uint32 GetDBUInt32(TSString key, uint32 def = 0);
    uint64 GetDBUInt64(TSString key, uint64 def = 0);
    int32 GetDBInt32(TSString key, int32 def = 0);
    int64 GetDBInt64(TSString key, int64 def = 0);
    float GetDBFloat(TSString key, float def = 0);

    TSString GetDBString(TSString key, TSString def = JSTR(""));
    bool GetDBBool(TSString key, bool def = false);

    void DeleteDBField(TSString key);

    void SaveDBJson();
    void LoadDBJson();
    void DeleteDBJson();
    void ClearDBJson();
private:
    void LSetDBNumber(std::string const& key, double value);
    void LSetDBUInt32(std::string const& key, uint32 value);
    void LSetDBInt32(std::string const& key, int32 value);
    void LSetDBUInt64(std::string const& key, uint64 value);
    void LSetDBInt64(std::string const& key, int64 value);
    void LSetDBFloat(std::string const& key, float value);

    void LSetDBString(std::string const& key, std::string const& value);
    void LSetDBBool(std::string const& key, bool value);
    void LSetDBObject(std::string const& key, sol::table table);

    double LGetDBNumber0(std::string const& key, double def);
    uint32 LGetDBUInt320(std::string const& key, uint32 def);
    uint64 LGetDBUInt640(std::string const& key, uint64 def);
    int32 LGetDBInt320(std::string const& key, int32 def);
    int64 LGetDBInt640(std::string const& key, int64 def);
    float LGetDBFloat0(std::string const& key, float def);

    double LGetDBNumber1(std::string const& key);
    uint32 LGetDBUInt321(std::string const& key);
    uint64 LGetDBUInt641(std::string const& key);
    int32 LGetDBInt321(std::string const& key);
    int64 LGetDBInt641(std::string const& key);
    float LGetDBFloat1(std::string const& key);
    
    std::string LGetDBString0(std::string const& key, std::string const def);
    std::string LGetDBString1(std::string const& key);

    bool LGetDBBool0(std::string const& key, bool def);
    bool LGetDBBool1(std::string const& key);

    sol::table LGetDBObject0(std::string const& key, sol::table table);
    sol::table LGetDBObject1(std::string const& key);

    void LDeleteDBField(std::string const& key);

    friend class TSLua;
};