#include "TSLua.h"
#include "TSMutable.h"

#define BIND_MUTABLE(state,type)\
    {\
        auto mut = state.new_usertype<TSMutable<type>>("TSMutable" #type);\
        mut.set_function("set", &TSMutable<type>::set);\
        mut.set_function("get", &TSMutable<type>::get);\
        mut.set_function(sol::meta_function::to_string, &TSMutable<type>::stringify);\
    }\

void TSLua::load_mutable_methods(sol::state& state)
{
    BIND_MUTABLE(state, bool)
    BIND_MUTABLE(state, uint8)
    BIND_MUTABLE(state, int8)
    BIND_MUTABLE(state, uint16)
    BIND_MUTABLE(state, int16)
    BIND_MUTABLE(state, uint32)
    BIND_MUTABLE(state, int32)
    BIND_MUTABLE(state, uint64)
    BIND_MUTABLE(state, int64)
    BIND_MUTABLE(state, float)
    BIND_MUTABLE(state, double)

}
