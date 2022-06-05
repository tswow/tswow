#pragma once

#include "sol/sol.hpp"
#include "TSJson.h"

enum TSDBJsonType
{
    PLAYER = 0,
};

struct TSDBJson
{
    sol::table m_lua;
    TSJsonObject m_json;
    void save(TSDBJsonType type, uint32_t id);
    void load(TSDBJsonType type, uint32_t id);
};