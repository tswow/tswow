/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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

#include "TSStringConvert.h"

template <typename T, typename R>
class TSMutable
{
private:
    T* value;

public:
    TSMutable* operator->() { return this;}
    TSMutable(T *value)
    {
        this->value = value;
    }

    void set(R value)
    {
        *(this->value) = value;
    }

    R get()
    {
        return *(this->value);
    }

    std::string stringify()
    {
        return ToStr(*value);
    }
};

template <typename T>
using TSMutableNumber = TSMutable<T, TSNumber<T>>;
