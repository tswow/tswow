#include "TSLua.h"
#include "TSMutable.h"

#define BIND_MUTABLE(state,type,rep)\
    {\
        auto mut = state.new_usertype<TSMutable<type,rep>>("TSMutable" #type);\
        mut.set_function("set", &TSMutable<type,rep>::set);\
        mut.set_function("get", &TSMutable<type,rep>::get);\
        mut.set_function(sol::meta_function::to_string, &TSMutable<type,rep>::stringify);\
    }\

void TSLua::load_mutable_methods(sol::state& state)
{
    BIND_MUTABLE(state, bool, bool)
    BIND_MUTABLE(state, uint8, TSNumber<uint8>)
    BIND_MUTABLE(state, int8, TSNumber<uint8>)
    BIND_MUTABLE(state, uint16, TSNumber<uint16>)
    BIND_MUTABLE(state, int16, TSNumber<int16>)
    BIND_MUTABLE(state, uint32, TSNumber<uint32>)
    BIND_MUTABLE(state, int32, TSNumber<int32>)
    BIND_MUTABLE(state, uint64, TSNumber<uint64>)
    BIND_MUTABLE(state, int64, TSNumber<int64>)
    BIND_MUTABLE(state, float, TSNumber<float>)
    BIND_MUTABLE(state, double, TSNumber<double>)

}
