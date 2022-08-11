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

#include "TSEntity.h"

TSCompiledClass::TSCompiledClass(std::shared_ptr<void> ptr)
{
    this->ptr = ptr;
}

TSCompiledClass::TSCompiledClass()
{
    ptr = nullptr;
}

bool TSCompiledClasses::HasObject(std::string const& key)
{
    return m_map.find(key) != m_map.end();
}

void TSCompiledClasses::clear()
{
    m_map.clear();
}