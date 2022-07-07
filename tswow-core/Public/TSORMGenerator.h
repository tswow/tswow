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

#include "TSDatabase.h"

#include <sol/sol.hpp>

#include <string>
#include <vector>
#include <memory>

struct FieldSpec {
    std::string m_name;
    std::string m_typeName;
    bool m_isPrimaryKey;
    bool m_autoIncrements;
};

// @alsoin ORMFields.ts:databaseIndex
enum class DatabaseType {
    WORLD,
    AUTH,
    CHARACTERS
};

void TC_GAME_API CreateDatabaseSpec(uint32 type, std::string const& dbName, std::string const& name, std::vector<FieldSpec> fields);
void TC_GAME_API LCreateDatabaseSpec(uint32 type, std::string const& dbName, std::string const& name, sol::table fields);
