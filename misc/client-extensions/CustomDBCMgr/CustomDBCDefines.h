#pragma once

#include <iostream>

uint32_t (*SFileOpenFileEx)(uint32_t*, const char*, uint32_t, uint32_t) = (uint32_t (*)(uint32_t*, const char*, uint32_t, uint32_t))0x424B50;
bool (*SFileReadFile)(uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t) = (bool (*)(uint32_t, uint32_t, uint32_t, uint32_t, uint32_t, uint32_t))0x422530;
void (*SFileCloseFile)(void*) = (void (*)(void*))0x422910;
uint32_t (*SErrPrepareAppFatal)(uint32_t, const char*, ...) = (uint32_t (*)(uint32_t, const char*, ...))0x772A80;
