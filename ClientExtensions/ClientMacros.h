#pragma once

#define CLIENT_FUNC(name,addr,retval,...) \
	typedef retval (__cdecl *name##Type)__VA_ARGS__;\
	inline name##Type name = (name##Type)(addr);

#define CLIENT_ADDR(type,name,addr) inline type* name = (type*)addr;
