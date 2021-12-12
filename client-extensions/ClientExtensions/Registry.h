#pragma once

#define RETVAL 1
#define ARGS 1
#define ADDRESS 1


#define DETOURED(name,addrp,addr,retp,retval,argp,...) \
    typedef retval (__cdecl *name##Type)(__VA_ARGS__);\
    name##Type name = (name##Type)(addr);

#define REGISTER_DETOUR(a,b) {&a,b},
