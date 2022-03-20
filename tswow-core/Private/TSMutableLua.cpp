#include "TSLua.h"
#include "TSMutable.h"

#define BIND_MUTABLE(type)\
    {\
        auto mut = new_usertype<TSMutable<type>>("TSMutable" #type);\
        mut.set_function("set", &TSMutable<type>::set);\
        mut.set_function("get", &TSMutable<type>::get);\
    }\

void TSLuaState::load_mutable_methods(uint32_t modid)
{
    BIND_MUTABLE(bool)
    BIND_MUTABLE(uint8)
    BIND_MUTABLE(int8)
    BIND_MUTABLE(uint16)
    BIND_MUTABLE(int16)
    BIND_MUTABLE(uint32)
    BIND_MUTABLE(int32)
    BIND_MUTABLE(uint64)
    BIND_MUTABLE(int64)
    BIND_MUTABLE(float)
    BIND_MUTABLE(double)
}
