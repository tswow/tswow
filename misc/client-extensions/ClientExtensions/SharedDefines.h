#pragma once

#include "windows.h"
#include "ClientMacros.h"

#include <functional>

enum SpellFamilyNames
{
    SPELLFAMILY_GENERIC     = 0,
    SPELLFAMILY_UNK1        = 1,
    SPELLFAMILY_MAGE        = 3,
    SPELLFAMILY_WARRIOR     = 4,
    SPELLFAMILY_WARLOCK     = 5,
    SPELLFAMILY_PRIEST      = 6,
    SPELLFAMILY_DRUID       = 7,
    SPELLFAMILY_ROGUE       = 8,
    SPELLFAMILY_HUNTER      = 9,
    SPELLFAMILY_PALADIN     = 10,
    SPELLFAMILY_SHAMAN      = 11,
    SPELLFAMILY_UNK2        = 12,
    SPELLFAMILY_POTION      = 13,
    SPELLFAMILY_DEATHKNIGHT = 15,
    SPELLFAMILY_PET         = 17
};

static char* sSpace = " ";

// client functions
CLIENT_FUNCTION(SFileOpenFile, 0x424F80, __stdcall, int, (char const* filename, HANDLE* a2 /*file handle out*/))
CLIENT_FUNCTION(SFileGetFileSize, 0x4218C0, __stdcall, DWORD /*lowest 32 bits in size*/, (HANDLE handle, DWORD* highSize /*highest 32 bits in size*/))
CLIENT_FUNCTION(SFileReadFile, 0x422530, __stdcall, int, (HANDLE handle /*likely a handle*/, char* data, DWORD bytesToRead, DWORD* bytesRead, int overlap /*just set to 0*/, int unk /*just set to 0*/))
CLIENT_FUNCTION(SFileCloseFile, 0x422910, __stdcall, int, (HANDLE a1))

CLIENT_FUNCTION(ClntObjMgrGetActivePlayer, 0x4D3790, __cdecl, uint64_t, ())
CLIENT_FUNCTION(ClntObjMgrObjectPtr, 0x4D4DB0, __cdecl, void*, (uint64_t, uint32_t))

CLIENT_FUNCTION(FrameScript_GetText, 0x819D40, __cdecl, char*, (char*, uint32_t, uint32_t))
CLIENT_FUNCTION(SStrPrintf, 0x76F070, __cdecl, uint32_t, (char*, uint32_t, char*, uint32_t))
CLIENT_FUNCTION(SStrCopy_0, 0x76EF70, __stdcall, unsigned char, (char*, char*, uint32_t))

CLIENT_FUNCTION(ClientDB__GetLocalizedRow, 0x4CFD20, __thiscall, int, (void*, uint32_t, void*))

CLIENT_FUNCTION(SpellParserParseText, 0x57ABC0, __cdecl, void, (void*, void*, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))
