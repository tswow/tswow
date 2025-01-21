#pragma once
#include "windows.h"

#include "ClientMacros.h"

#include <functional>

enum ObjectTypeMask : uint32_t {
    TYPEMASK_OBJECT         = 0x0001,
    TYPEMASK_ITEM           = 0x0002,
    TYPEMASK_CONTAINER      = 0x0004,
    TYPEMASK_UNIT           = 0x0008,
    TYPEMASK_PLAYER         = 0x0010,
    TYPEMASK_GAMEOBJECT     = 0x0020,
    TYPEMASK_DYNAMICOBJECT  = 0x0040,
    TYPEMASK_CORPSE         = 0x0080,
};

enum Field : uint32_t {
    CURRENT_HP              = 18,
    CURRENT_MANA            = 19,
    CURRENT_RAGE            = 20,
    CURRENT_FOCUS           = 21,
    CURRENT_ENERGY          = 22,
    CURRENT_HAPPINESS       = 23,
    CURRENT_RUNES           = 24,
    CURRENT_RUNIC_POWER     = 25,
    MAX_HP                  = 26,
    MAX_MANA                = 27,
    MAX_RAGE                = 28,
    MAX_FOCUS               = 29,
    MAX_ENERGY              = 30,
    MAX_HAPPINESS           = 31,
    MAX_RUNES               = 32,
    MAX_RUNIC_POWER         = 33,
};

// client functions
CLIENT_FUNCTION(SFileOpenFile, 0x424F80, __stdcall, int, (char const* filename, HANDLE* a2 /*file handle out*/))
CLIENT_FUNCTION(SFileGetFileSize, 0x4218C0, __stdcall, DWORD /*lowest 32 bits in size*/, (HANDLE handle, DWORD* highSize /*highest 32 bits in size*/))
CLIENT_FUNCTION(SFileReadFile, 0x422530, __stdcall, int, (HANDLE handle /*likely a handle*/, char* data, DWORD bytesToRead, DWORD* bytesRead, int overlap /*just set to 0*/, int unk /*just set to 0*/))
CLIENT_FUNCTION(SFileCloseFile, 0x422910, __stdcall, int, (HANDLE a1))

CLIENT_FUNCTION(ClntObjMgrGetActivePlayer, 0x4D3790, __cdecl, unsigned long long, ())
CLIENT_FUNCTION(ClntObjMgrObjectPtr, 0x4D4DB0, __cdecl, void*, (unsigned long long, unsigned int))

// functions
static int32_t GetPlayerField(uint32_t* ActivePlayer, uint32_t field) {
    return *reinterpret_cast<int32_t*>(*(ActivePlayer + 52) + 4 * field);
};
