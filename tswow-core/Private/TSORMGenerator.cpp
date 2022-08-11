/*
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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

#include "TSORMGenerator.h"
#include "Log.h"

#include <iterator>
#include <algorithm>
#include <string>
#include <stdexcept>

static std::shared_ptr<TSDatabaseResult> query(DatabaseType m_type, std::string const& value)
{
    switch(m_type)
    {
        case DatabaseType::AUTH:
            return QueryAuth(value);
        case DatabaseType::CHARACTERS:
            return QueryCharacters(value);
        case DatabaseType::WORLD:
            return QueryWorld(value);
        default: throw std::out_of_range("DatabaseSpec::m_type");
    }
}

std::string toLower(std::string const& str)
{
    std::string out = str;
    std::transform(
          out.begin()
        , out.end()
        , out.begin()
        , [](unsigned char c) { return std::tolower(c); }
    );
    return out;
}

void CreateDatabaseSpec(uint32 type, std::string const& m_dbName, std::string const& m_name, std::vector<FieldSpec> m_fields)
{
    DatabaseType m_type = (DatabaseType)(type);
    std::vector<FieldSpec> effectiveFields = m_fields;

    auto oldTableQuery = query(m_type,
        "SELECT COUNT(TABLE_NAME) as TableCount"
        " FROM `information_schema`.`TABLES`"
        " WHERE `TABLE_NAME` = \""
        + m_name +
        "\" and `TABLE_SCHEMA` = \""
        + m_dbName +
        "\";"
    );
    oldTableQuery->GetRow();
    bool hasOldTable = oldTableQuery->GetUInt32(0);
    if (hasOldTable)
    {
        // 1. build old fields
        std::vector<FieldSpec> oldFields;
        auto oldQuery = query(m_type,
            "SELECT `COLUMN_NAME`,`COLUMN_TYPE`,`COLUMN_KEY`,`EXTRA`"
            " FROM `information_schema`.`COLUMNS` "
            " WHERE `TABLE_SCHEMA` = \""
            + m_dbName +
            "\" AND `TABLE_NAME`= \""
            + m_name +
            "\";"
        );
        while (oldQuery->GetRow())
        {
            // these are always lowercase in my installation,
            // but they might not be if we upgrade at some point.
            // we don't want that to break our script
            oldFields.push_back({
                  toLower(oldQuery->GetString(0))
                , toLower(oldQuery->GetString(1))
                , toLower(oldQuery->GetString(2)) == "pri"
                , toLower(oldQuery->GetString(3)) == "auto_increment"
                });
        }

        // 2. Find if pks changed
        {
            std::vector<FieldSpec> effPk;
            std::vector<FieldSpec> oldPk;
            std::copy_if(
                effectiveFields.begin()
                , effectiveFields.end()
                , std::back_inserter(effPk)
                , [](FieldSpec const& spec) { return spec.m_isPrimaryKey; }
            );
            std::copy_if(
                oldFields.begin()
                , oldFields.end()
                , std::back_inserter(oldPk)
                , [](FieldSpec const& spec) { return spec.m_isPrimaryKey; }
            );
            bool pkChanged = false;
            if (effPk.size() != oldPk.size())
            {
                TS_LOG_INFO(
                      "tswow.orm"
                    , "Primary key count changed: %s.%s"
                );

                pkChanged = true;
            }
            else
            {
                for (FieldSpec const& eff : effPk)
                {
                    auto itr = std::find_if(
                        oldPk.begin()
                        , oldPk.end()
                        , [&](FieldSpec const& old) {
                            return old.m_name == eff.m_name;
                        });
                    if (itr == oldPk.end())
                    {
                        TS_LOG_INFO(
                              "tswow.orm"
                            , "New primary key: %s.%s.%s"
                            , m_dbName.c_str()
                            , m_name.c_str()
                            , eff.m_name.c_str()
                        );
                        pkChanged = true;
                        break;
                    }
                    else if (itr->m_typeName != eff.m_typeName || itr->m_autoIncrements != eff.m_autoIncrements)
                    {
                        TS_LOG_INFO(
                              "tswow.orm"
                            , "Primary key type changed: %s.%s.%s (%s != %s)"
                            , m_dbName.c_str()
                            , m_name.c_str()
                            , eff.m_name.c_str()
                            , eff.m_typeName.c_str()
                            , itr->m_typeName.c_str()
                        );
                        pkChanged = true;
                        break;
                    }
                }
            }
            if (pkChanged)
            {
                TS_LOG_INFO(
                      "tswow.orm"
                    , "Primary keys changed: %s.%s (must rebuild entire table)"
                    , m_dbName.c_str()
                    , m_name.c_str()
                );
                query(m_type,
                    "DROP TABLE IF EXISTS `"
                    + m_dbName +
                    "`.`"
                    + m_name +
                    "`;"
                );
                goto create;
            }
        }

        // 3. Update old fields
        for (FieldSpec const& old : oldFields)
        {
            if (old.m_autoIncrements) continue; // already checked
            auto itr = std::find_if(
                effectiveFields.begin()
                , effectiveFields.end()
                , [&](FieldSpec const& eff) {
                    return eff.m_name == old.m_name;
                });
            // remove old column
            if (itr == effectiveFields.end())
            {
                TS_LOG_INFO(
                      "tswow.orm"
                    , "Column removed: %s.%s.%s"
                    , m_dbName.c_str()
                    , m_name.c_str()
                    , old.m_name.c_str()
                );
                query(m_type,
                    "ALTER TABLE `"
                    + m_dbName +
                    "`.`"
                    + m_name +
                    "` DROP COLUMN `"
                    + old.m_name
                    + "`;"
                );
            }
            else if (itr->m_typeName != old.m_typeName)
            {
                // update column type
                TS_LOG_INFO(
                    "tswow.orm"
                    , "Column type changed: %s.%s.%s (%s -> %s)"
                    , m_dbName.c_str()
                    , m_name.c_str()
                    , old.m_name.c_str()
                    , old.m_typeName.c_str()
                    , itr->m_typeName.c_str()
                );
                query(m_type,
                    "ALTER TABLE `"
                    + m_dbName +
                    "`.`"
                    + m_name +
                    "` MODIFY COLUMN `"
                    + itr->m_name +
                    "` "
                    + itr->m_typeName +
                    ";"
                );
            }
        }

        // 4. Add new fields
        for (FieldSpec const& eff : effectiveFields)
        {
            auto itr = std::find_if(
                oldFields.begin()
                , oldFields.end()
                , [&](FieldSpec const& old) {
                    return eff.m_name == old.m_name;
                });

            if (itr == oldFields.end())
            {
                TS_LOG_INFO(
                    "tswow.orm"
                    , "Column added: %s.%s.%s"
                    , m_dbName.c_str()
                    , m_name.c_str()
                    , eff.m_name.c_str()
                );
                query(m_type,
                    "ALTER TABLE `"
                    + m_dbName +
                    "`.`"
                    + m_name +
                    "` ADD COLUMN `"
                    + eff.m_name +
                    "` "
                    + eff.m_typeName +
                    ";"
                );
            }
        }

        // We *always* reorder to match the memory layout
        // (in case someone starts running manual * queries)
        for (size_t i = 0; i < effectiveFields.size(); ++i)
        {
            auto eff = effectiveFields[i];
            query(m_type,
                "ALTER TABLE `"
                + m_dbName +
                "`.`"
                + m_name +
                "` MODIFY `"
                + eff.m_name +
                "` "
                + eff.m_typeName +
                (eff.m_autoIncrements ? " AUTO_INCREMENT" : "") +
                " "
                + (i == 0 ? "FIRST" : "AFTER " + effectiveFields[i - 1].m_name)
            );
        }
    }
    else
    {
    create:
        std::string createQuery =
            "CREATE TABLE `"
            + m_dbName +
            "`.`"
            + m_name +
            "` ("
            ;

        bool hasPrimaryKeys = false;
        for (int i = 0; i < effectiveFields.size(); ++i)
        {
            FieldSpec& f = effectiveFields[i];
            createQuery +=
                " `"
                + f.m_name +
                "` "
                + f.m_typeName
                + (f.m_autoIncrements ? " AUTO_INCREMENT" : "")
                ;

            if (effectiveFields[i].m_isPrimaryKey) {
                hasPrimaryKeys = true;
            }

            if (i < effectiveFields.size() - 1)
            {
                createQuery += ",";
            }
        }

        if (hasPrimaryKeys)
        {
            createQuery += ", PRIMARY KEY (";
            bool fst = true;
            for (FieldSpec const& field : effectiveFields)
            {
                if (field.m_isPrimaryKey)
                {
                    if (!fst)
                    {
                        createQuery += ",";
                    }
                    createQuery += "`" + field.m_name + "`";
                    fst = false;
                }
            }
            createQuery += " )";
        }
        createQuery += ");";
        TS_LOG_INFO(
              "tswow.orm"
            , "Table created: %s.%s"
            , m_dbName.c_str()
            , m_name.c_str()
        );
        query(m_type,createQuery);
    }
}

void LCreateDatabaseSpec(uint32 type, std::string const& dbName, std::string const& name, sol::table fields)
{
    std::vector<FieldSpec> vFields;
    for (auto& [_, value] : fields)
    {
        auto col = value.as<sol::table>();
        std::string name = col[1].get<std::string>();
        std::string def = col[2].get<std::string>();
        bool isPk = col[3].get<bool>();
        bool autoIncrement = col[4].get<bool>();
        vFields.push_back(FieldSpec{ name,def,isPk,autoIncrement });
    }
    CreateDatabaseSpec(type, dbName, name, vFields);
}
