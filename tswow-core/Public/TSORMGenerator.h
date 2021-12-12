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
#pragma once

#include <string>
#include <vector>
#include <memory>
#include "TSDatabase.h"

struct FieldSpec {
    std::string m_name;
    std::string m_typeName;
    bool m_isPrimaryKey;
    bool m_autoIncrements;
};

enum class DatabaseType {
    WORLD,
    AUTH,
    CHARACTERS
};

struct TC_GAME_API DatabaseSpec {
    DatabaseType m_type;
    std::string m_dbName;
    std::string m_name;
    std::vector<FieldSpec> m_fields;
    std::shared_ptr<TSDatabaseResult> query(std::string const& value);
    void destroy();
    void update();
};
