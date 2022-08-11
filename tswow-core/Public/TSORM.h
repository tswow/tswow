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

#include "TSMain.h"
#include "TSBase.h"
#include "TSArray.h"
#include "TSClass.h"
#include <memory>
#include <vector>
#include <functional>
#include <stdexcept>

class DBEntry: public TSClass {};

template <typename T>
class DBContainer;
class TC_GAME_API DBArrayEntry: public TSClass {
public:
    void MarkDirty();
    void Delete();
    bool IsDeleted();
    bool IsDirty();
private:
    DBContainer<DBArrayEntry>* m_container = nullptr;
    bool m_isRemoved = false;
    virtual void Save() = 0;
    virtual void _Delete() = 0;
    template<typename> friend class DBContainer;
protected:
    uint64 __index = 0;
    bool m_isDirty = true;
};

template <typename T /* : TSMultiRowTable*/>
class DBContainer {
public:
    TSNumber<uint32> Size()
    {
        return m_size;
    }

    TSNumber<uint32> TotalSize()
    {
        return m_values.size();
    }

    std::shared_ptr<T> Add(std::shared_ptr<T> value)
    {
        if (value->m_container != nullptr && reinterpret_cast<DBContainer<T>*>(value->m_container) != this)
        {
            // this shouldn't happen even by mistake
            throw std::runtime_error("Attempted to add DBArrayEntry to multiple containers");
        }
        m_size++;
        value->m_isRemoved = false;
        value->m_container = reinterpret_cast<DBContainer<DBArrayEntry>*>(this);
        m_values.push_back(value);
        return value;
    }

    void Save()
    {
        if (m_values.size() == 0) return;
        for(auto itr = m_values.begin(); itr != m_values.end();)
        {
            if ((*itr)->IsDeleted())
            {
                // if it's 0, we haven't written it yet.
                if ((*itr)->__index > 0)
                {
                    (*itr)->_Delete();
                }
                itr = m_values.erase(itr);
            }
            else
            {
                if ((*itr)->IsDirty())
                {
                    (*itr)->Save();
                    (*itr)->m_isDirty = false;
                }
                itr ++ ;
            }
        }
    }

    void forEach(std::function<void(std::shared_ptr<T>&)> fn)
    {
        for (auto& value : m_values) if(!value->IsDeleted()) fn(value);
    }

    template <typename M>
    M reduce(std::function<M(M, std::shared_ptr<T>&)> fn, M init)
    {
        M cur = init;
        for (auto& value : m_values) if(!value->IsDeleted()) cur = fn(cur, value);
        return cur;
    }

    std::shared_ptr<T> find(std::function<bool(std::shared_ptr<T>&)> fn)
    {
        for (auto& value : m_values) if (!value->IsDeleted() && fn(value)) return value;
        return nullptr;
    }

    TSArray<std::shared_ptr<T>> ToArray()
    {
        return TSArray<std::shared_ptr<T>>(m_values);
    }
private:
    std::vector<std::shared_ptr<T>> m_values;
    uint32 m_size = 0;
    friend class DBArrayEntry;
};

template <typename T>
std::shared_ptr<T> LoadDBEntry(std::shared_ptr<T> value)
{
    value->Load();
    return value;
}

#define LoadDBArrayEntry(cls,...) cls::Load(__VA_ARGS__)
#define QueryDBEntry(cls, sql) cls::LoadSQL(sql)

#define DeleteDBEntry(cls,sql) cls::DeleteSQL(sql)
#define DeleteDBArrayEntry(cls,sql) cls::DeleteSQL(sql)
