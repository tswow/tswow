#include "TSLua.h"
#include "TSMutableString.h"

void TSLua::load_mutablestring_methods(sol::state& state)
{
    auto ts_mutablestring = state.new_usertype<TSMutableString>("TSMutableString");
    ts_mutablestring.set_function("set", &TSMutableString::Lset);
    ts_mutablestring.set_function("get", &TSMutableString::Lget);
    ts_mutablestring.set_function(sol::meta_function::to_string, &TSMutableString::stringify);
}
