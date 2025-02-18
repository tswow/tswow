#include "Util.h"

// Aleist3r: use bigger number as address1
// if the jump/call address is earlier in the memory (e.g. you're jumping from dll code back to wow.exe address), use
// backwards = true
// TODO: investigate what I did wrong with code, math was off
uint32_t Util::CalculateAddress(uint32_t address1, uint32_t address2, bool backwards) {
    if (!backwards)
        return address1 - address2;
    else
        return address2 - address1;
}

void Util::OverwriteBytesAtAddress(void* address, uint8_t byte, size_t numRepeats) {
    DWORD flOldProtect;
    VirtualProtect(address, numRepeats, PAGE_EXECUTE_READWRITE, &flOldProtect);
    memset(address, byte, numRepeats);
    VirtualProtect(address, numRepeats, flOldProtect, &flOldProtect);
}

void Util::OverwriteBytesAtAddress(uint32_t address, uint8_t byteArray[], size_t arraySize) {
    void* vAddress = reinterpret_cast<void*>(address);
    for (size_t i = 0; i < arraySize; i++)
        SetByteAtAddress(reinterpret_cast<void*>(address + i), byteArray[i]);
}

void Util::OverwriteUInt32AtAddress(uint32_t address, uint32_t newValue) {
    DWORD flOldProtect;
    void* vAddress = reinterpret_cast<void*>(address);
    VirtualProtect(vAddress, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *reinterpret_cast<uint32_t*>(address) = newValue;
    VirtualProtect(vAddress, 0x4, flOldProtect, &flOldProtect);
};

void Util::SetByteAtAddress(void* address, uint8_t byte) {
    DWORD flOldProtect;
    VirtualProtect(address, 0x1, PAGE_EXECUTE_READWRITE, &flOldProtect);
    memset(address, byte, 0x1);
    VirtualProtect(address, 0x1, flOldProtect, &flOldProtect);
}
