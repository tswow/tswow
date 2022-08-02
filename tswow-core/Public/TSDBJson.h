#pragma once

#include "sol/sol.hpp"
#include "TSJson.h"

enum DBJsonEntityType
{
    PLAYER = 0,
};

enum DBJsonTableType
{
    JSON = 0
};

// todo: transaction support
class TSDBJson
{
    TSJsonObject m_json;
    bool m_dirty_deleted;
    DBJsonEntityType m_type;
    uint32 m_id;
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
    void SetDBNumber(std::string const& key, double value);
    void SetDBUInt32(std::string const& key, uint32 value);
    void SetDBUInt64(std::string const& key, uint64 value);
    void SetDBInt32(std::string const& key, int32 value);
    void SetDBInt64(std::string const& key, int64 value);
    void SetDBFloat(std::string const& key, float value);

    void SetDBString(std::string const& key, std::string const& keyvalue);
    void SetDBBool(std::string const& key, bool value);
    void SetDBObject(std::string const& key, TSJsonObject json);
    void SetDBArray(std::string const& key, TSJsonArray arr);

    TSNumber<double> GetDBNumber(std::string const& key, double def = 0);
    TSNumber<uint32> GetDBUInt32(std::string const& key, uint32 def = 0);
    TSNumber<uint64> GetDBUInt64(std::string const& key, uint64 def = 0);
    TSNumber<int32> GetDBInt32(std::string const& key, int32 def = 0);
    TSNumber<int64> GetDBInt64(std::string const& key, int64 def = 0);
    TSNumber<float> GetDBFloat(std::string const& key, float def = 0);

    TSJsonObject GetDBObject(std::string const& key, TSJsonObject def = TSJsonObject());
    TSJsonArray GetDBArray(std::string const& key, TSJsonArray def = TSJsonArray());

    std::string GetDBString(std::string const& key, std::string const& def = "");
    bool GetDBBool(std::string const& key, bool def = false);

    void DeleteDBField(std::string const& key);

    void SaveDBJson();
    void LoadDBJson();
    void DeleteDBJson();
    void ClearDBJson();
};