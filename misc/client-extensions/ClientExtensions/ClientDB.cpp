#include "ClientDB.h"

void ClientDB::Apply() {
    DWORD flOldProtect = 0;
    VirtualProtect((LPVOID)0x634E30, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(0x634E30) = (reinterpret_cast<uint32_t>(&RegisterBaseEx) - 0x634E34);
    VirtualProtect((LPVOID)0x634E30, 0x4, PAGE_EXECUTE_READ, &flOldProtect);

    return;
}

uint32_t ClientDB::RegisterBaseEx(uint32_t a) {
    uint32_t result = ClientDB__RegisterBase(a);

    return result;
}
