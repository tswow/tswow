#include "ClientDBCLoader.h"
#include <windows.h>

// Aleist3r: this is probably one of the earliest points you can attach yourself after dll is loaded
// if you want to override some existing functions before they're executed, like for example dbc loading
CLIENT_DETOUR(StartupOverrides, 0x86D0A0, __cdecl, int, ()) {
    LOG_DEBUG << "StartupOverrides executed";
    DWORD flOldProtect;
    VirtualProtect((LPVOID)0x634E30, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *(uint32_t*)0x634E30 = ((uint32_t)(void*)ClientDBCLoader::RegisterDBCs - (0x634E30 + 0x4));
    VirtualProtect((LPVOID)0x634E30, 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    // Aleist3r: this thing is for debugging purposes - this is unused address, I write same data
    ///VirtualProtect((LPVOID)0x6337CA, 0x5, PAGE_EXECUTE_READWRITE, &flOldProtect);
    return StartupOverrides();
}
