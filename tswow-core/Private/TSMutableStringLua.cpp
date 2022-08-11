#include "TSLua.h"
#include "TSMutableString.h"

void TSLua::load_mutablestring_methods(sol::state& state)
{
    auto ts_mutablestring = state.new_usertype<TSMutableString>("TSMutableString");
    LUA_FIELD(ts_mutablestring, TSMutableString, set);
    LUA_FIELD(ts_mutablestring, TSMutableString, get);
    ts_mutablestring.set_function(sol::meta_function::to_string, &TSMutableString::stringify);
}
