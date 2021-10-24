#pragma once

#define CLIENT_FUNCTION(name,addr,calltype,retval,...) \
    typedef retval (calltype *name##Type)__VA_ARGS__;\
    inline name##Type name = (name##Type)(addr);

#define CLIENT_ADDRESS(type,name,addr) inline type* name = (type*)addr;
