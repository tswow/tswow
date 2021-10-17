#include <windows.h>
#include <detours.h>
#include <iostream>
#include <fstream>
#include <vector>
#include "Logger.h"
#include "DetourRegistry.h"

#define DETOURED(name,addr,retval,...) \
	typedef retval (__cdecl *name##Type)(__VA_ARGS__);\
	name##Type name = (name##Type)(addr);

#define REGISTER_DETOUR(a,b) {&a,b},

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//   1. Declarations
//
// - Add declarations for the function you want to override here
//
// - It's easiest to copypaste an old one and replace the values
//
// - To find functions to hook, look at addresses.txt and use
//   IDA pro to decompile the functions and figure out what
//   arguments the function takes.
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

DETOURED(GAME_INIT
	, /*ADDRESS*/       0x00405540
	, /*RETURN VALUE*/  int
	, /*ARGS*/          int,int,int,int
)

DETOURED(FRAME_SCRIPT_REGISTERED
	, /*ADDRESS*/       0x004181B0
	, /*RETURN VALUE*/  int
	, /*ARGS*/          char const*, void*
)

DETOURED(FRAME_SCRIPT_RELOADED
	, /*ADDRESS*/       0x008167E0
	, /*RETURN VALUE*/  int
	, /*ARGS*/          int,int,int
)

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//   2. New implementations
//
// - Add new implementations for functions you've declared
//   above
//
// - The function type and arguments must an EXACT match
//   of the function you detouring.
//
// - You should almost always call and return the value
//   of the parent function
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

int __cdecl gameInit(int arg1, int arg2, int arg3, int arg4)
{
	LOG_DEBUG << "Game Initialization";
	return GAME_INIT(arg1, arg2, arg3, arg4);
}

int __cdecl frameScriptRegistered(char const* name, void* fp)
{
	return FRAME_SCRIPT_REGISTERED(name, fp);
}

int __cdecl framescriptReload(int a, int b, int c)
{
	if (b != 11334016) return FRAME_SCRIPT_RELOADED(a,b,c);
	return FRAME_SCRIPT_RELOADED(a,b,c);
}

// * * * * * * * * * * * * * * * * * * * * * * * *
//
//   3. Registry
//
// - Here we just connect the old declaration
//   with the new implementation, and the
//   function will be overridden in the client!
//
// * * * * * * * * * * * * * * * * * * * * * * * *

std::vector<std::pair<void*,void*>> registerDetours()
{
	return {
		REGISTER_DETOUR(GAME_INIT,gameInit)
		REGISTER_DETOUR(FRAME_SCRIPT_REGISTERED,frameScriptRegistered)
		REGISTER_DETOUR(FRAME_SCRIPT_RELOADED,framescriptReload)
	};
}

