#pragma once
#include "windows.h"

#include "ClientMacros.h"

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
