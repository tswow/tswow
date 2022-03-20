#include "TSLua.h"
#include "TSMutableString.h"

void TSLuaState::load_mutablestring_methods(uint32_t modid)
{
    auto ts_mutablestring = new_usertype<TSMutableString>("TSMutableString");
    LUA_FIELD(ts_mutablestring, TSMutableString, Lset);
    LUA_FIELD(ts_mutablestring, TSMutableString, Lget);
}
