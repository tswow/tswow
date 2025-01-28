#pragma once
#include "Windows.h"

#include <iostream>

// Defs cherrypicked from StormLib: https://github.com/ladislav-zezula/StormLib
bool (*SFileOpenFileEx)(HANDLE, const char*, uint32_t, HANDLE*) = (bool (*)(HANDLE, const char*, uint32_t, HANDLE*))0x424B50;
bool (*SFileReadFile)(HANDLE, void*, uint32_t, uint32_t*, uint32_t*) = (bool (*)(HANDLE, void*, uint32_t, uint32_t*, uint32_t*))0x422530;
void (*SFileCloseFile)(HANDLE) = (void (*)(HANDLE))0x422910;

//
void* (*SMemAlloc)(uint32_t, uint32_t, uint32_t, uint32_t) = (void* (*)(uint32_t, uint32_t, uint32_t, uint32_t))0x76E540;
uint32_t (*SErrPrepareAppFatal)(uint32_t, const char*, ...) = (uint32_t (*)(uint32_t, const char*, ...))0x772A80;
