#include "TSDBJson.h"

static void build_lua_state(sol::table & table, TSJsonObject obj)
{
    table.set("key", 10);
}

void TSDBJson::save(TSDBJsonType type, uint32_t id)
{
    if (m_lua.valid())
    {
    }
}

void TSDBJson::load(TSDBJsonType type, uint32_t id)
{

}
