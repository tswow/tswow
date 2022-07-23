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

#include <math.h>
#include <cinttypes>
#include <random>
#include <ctime>

static struct MathClass {
    std::mt19937_64 gen;
    std::uniform_real_distribution<double> dist;

    MathClass()
    {
        std::random_device rd;
        gen = std::mt19937_64(rd());
        dist = std::uniform_real_distribution<double>(0, 1.0);
    }
    constexpr MathClass* operator->()
    {
        return this;
    }

    TSNumber<double> atan2(double y, double x) { return ::atan2(y,x); }
    TSNumber<double> round(double a1) { return ::round(a1); }
    TSNumber<double> pow(double a1, double a2) { return ::pow(a1, a2); }
    TSNumber<double> log10(double arg) { return ::log10(arg); }
    TSNumber<double> log(double arg) { return ::log(arg); }
    TSNumber<double> ceil(double arg) { return ::ceil(arg); }
    TSNumber<double> floor(double arg) { return ::floor(arg); }
    TSNumber<double> exp(double arg) { return ::exp(arg); }
    TSNumber<double> cbrt(double arg) { return ::cbrt(arg); }
    TSNumber<double> acosh(double arg) { return ::acosh(arg); }
    TSNumber<double> asinh(double arg) { return ::asinh(arg); }
    TSNumber<double> atanh(double arg) { return ::atanh(arg); }
    TSNumber<double> cosh(double arg) { return ::cosh(arg); }
    TSNumber<double> sinh(double arg) { return ::sinh(arg); }
    TSNumber<double> tanh(double arg) { return ::tanh(arg); }
    TSNumber<double> acos(double arg) { return ::acos(arg); }
    TSNumber<double> asin(double arg) { return ::asin(arg); }
    TSNumber<double> atan(double arg) { return ::atan(arg); }
    TSNumber<double> cos(double arg) { return ::cos(arg); }
    TSNumber<double> sin(double arg) { return ::sin(arg); }
    TSNumber<double> tan(double arg) { return ::tan(arg); }
    TSNumber<double> sqrt(double arg) { return ::sqrt(arg); }
    TSNumber<double> abs(double arg) { return ::abs(arg); }
    template<typename T>
    TSNumber<T>  min(T fst) { return fst; }

    template<typename T, typename...Ts>
    TSNumber<T> min(T fst, Ts... args)
    {
        T min_args = min(args...);
        return fst < min_args ? fst : min_args;
    }

    template<typename T>
    TSNumber<T> max(T fst) { return fst; }

    template<typename T, typename...Ts>
    TSNumber<T> max(T fst, Ts... args)
    {
        T max_args = max(args...);
        return fst > max_args ? fst : max_args;
    }

    TSNumber<double> random() { return dist(gen); }
} Math;
