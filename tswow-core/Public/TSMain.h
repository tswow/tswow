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

#include "TSBase.h"

#ifndef TC_GAME_API
#if defined(_MSC_VER)
#define TC_GAME_API __declspec(dllexport)
#else
#define TC_GAME_API __attribute__((visibility("default")))
#endif
#endif

#ifndef TS_LOG_DEBUG
#if TRINITY
#define TS_LOG_DEBUG TC_LOG_DEBUG
#elif AZEROTHCORE
#define TS_LOG_DEBUG LOG_DEBUG
#endif
#endif

#ifndef TS_LOG_INFO
#if TRINITY
#define TS_LOG_INFO TC_LOG_INFO
#elif AZEROTHCORE
#define TS_LOG_INFO LOG_INFO
#endif
#endif

#ifndef TS_LOG_WARNING
#if TRINITY
#define TS_LOG_WARNING TC_LOG_WARNING
#elif AZEROTHCORE
#define TS_LOG_WARNING LOG_WARNING
#endif
#endif

#ifndef TS_LOG_ERROR
#if TRINITY
#define TS_LOG_ERROR TC_LOG_ERROR
#elif AZEROTHCORE
#define TS_LOG_ERROR LOG_ERROR
#endif
#endif

#ifndef TS_GUID
#if TRINITY
#define TS_GUID(val) val
#elif AZEROTHCORE
#define TS_GUID(val) val.GetRawValue()
#endif
#endif

#define TS_GET_GUID GetGUID