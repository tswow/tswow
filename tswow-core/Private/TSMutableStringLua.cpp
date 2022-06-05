#include "TSLua.h"
#include "TSMutableString.h"

void TSLuaState::load_mutablestring_methods(sol::state& state)
{
    auto ts_mutablestring = state.new_usertype<TSMutableString>("TSMutableString");
    LUA_FIELD(ts_mutablestring, TSMutableString, Lset);
    LUA_FIELD(ts_mutablestring, TSMutableString, Lget);
}
