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

#include "TSBase.h"
#include "TSMain.h"

TC_GAME_API std::string ReadFile(std::string const& file, std::string const& def = "");
TC_GAME_API void WriteFile(std::string const& file, std::string const& value);
TC_GAME_API void AppendFile(std::string const& file, std::string const& value);
TC_GAME_API bool FileExists(std::string const& file);
TC_GAME_API TSArray<std::string> ReadDirectory(std::string const& directory);