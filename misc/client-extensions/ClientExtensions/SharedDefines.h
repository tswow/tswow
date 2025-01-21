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

// functions
CLIENT_FUNCTION(
    SFileOpenFile
    , 0x00424F80
    , __stdcall
    , int
    , (
        char const* filename
        , HANDLE* a2 /*file handle out*/
        )
)

CLIENT_FUNCTION(
    SFileGetFileSize
    , 0x004218C0
    , __stdcall
    , DWORD /*lowest 32 bits in size*/
    , (
        HANDLE handle
        , DWORD* highSize /*highest 32 bits in size*/
        )
)

CLIENT_FUNCTION(
    SFileReadFile
    , 0x00422530
    , __stdcall
    , int
    , (
        HANDLE handle // likely a handle
        , char* data
        , DWORD bytesToRead
        , DWORD* bytesRead
        , int overlap // just set to 0
        , int unk // just set to 0
        )
)

CLIENT_FUNCTION(
    SFileCloseFile
    , 0x00422910
    , __stdcall
    , int
    , (
        HANDLE a1
        )
)

CLIENT_FUNCTION(ClntObjMgrGetActivePlayer, 0x4D3790, __cdecl, unsigned long long, ())
CLIENT_FUNCTION(ClntObjMgrObjectPtr, 0x4D4DB0, __cdecl, void*, (unsigned long long, unsigned int))
