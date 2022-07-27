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

#include <iostream>
#include "TSArray.h"
#include "TSStringConvert.h"

static struct Console
{
    Console* operator->() { return this; }
    template <typename T>
    void log(T value)
    {
        std::cout << value;
    }

    void log(float value)
    {
        log<double>(value);
    }

    void log(double value)
    {
        if (value == std::floor(value))
        {
            std::cout << uint64(value);
        }
        else
        {
            std::cout << value;
        }
    }

    void log(std::string const& value)
    {
        std::cout << value;
    }

    void log(std::wstring const& value)
    {
        std::wcout << value;
    }

    template <typename T, typename ...V>
    void log(T value, V...values)
    {
        log(value);
        std::cout << " ";
        log(values...);
    }
} console;
