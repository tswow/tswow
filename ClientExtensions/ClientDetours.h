#pragma once

#include "ClientMacros.h"

#include <vector>
#include <string>

class Main;

class ClientDetours {
public:
	struct Detour {
		std::string const m_name;
		void * const m_oldFn;
		void * const m_newFn;
		std::string const m_filename;
		size_t m_lineno;
	};
	static int Add(
		  std::string const& name
		, void* clientFun
		, void* yourFun
		, std::string const& filename
		, size_t lineno
 );
private:
	static void Apply();
	ClientDetours() {};
	friend class Main;
};

#define CLIENT_DETOUR(name,addr,retval,...) \
	typedef retval (__cdecl *name##Type)__VA_ARGS__;\
	inline name##Type name = (name##Type)(addr);\
	retval name##Detour __VA_ARGS__; \
	int name##Dummy = ClientDetours::Add(#name,&name,name##Detour,__FILE__,__LINE__);\
	retval name##Detour __VA_ARGS__
