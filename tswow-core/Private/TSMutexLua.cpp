#include "TSLua.h"
#include "TSMutex.h"

static TSMutex _CreateMutexLock()
{
    return TSMutex();
}

void TSLua::load_mutex_functions(sol::state& state)
{
    auto ts_mutex = state.new_usertype<TSMutex>("TSMutex");
    LUA_FIELD(ts_mutex, TSMutex, lock);
    LUA_FIELD(ts_mutex, TSMutex, unlock);
    LUA_FIELD(ts_mutex, TSMutex, try_lock);
    state.set_function("CreateMutexLock", _CreateMutexLock);
}