#pragma once

#define CLIENT_FUNC(name,addr,calltype,retval,...) \
    typedef retval (calltype *name##Type)__VA_ARGS__;\
    inline name##Type name = (name##Type)(addr);

#define CLIENT_ADDR(type,name,addr) inline type* name = (type*)addr;
