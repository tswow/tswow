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

#include "TSORM.h"
#include "TSDatabase.h"

void DBArrayEntry::MarkDirty()
{
    m_isDirty = true;
}

bool DBArrayEntry::IsDirty()
{
    return m_isDirty;
}

bool DBArrayEntry::IsDeleted()
{
    return m_isRemoved;
}

void DBArrayEntry::Delete()
{
    if (m_isRemoved || !m_container) return;
    m_isRemoved = true;
    m_container->m_size--;
}
