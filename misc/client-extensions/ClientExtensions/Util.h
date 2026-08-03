#pragma once

#include "Windows.h"

#include <functional>

class Util {
public:
    static uint32_t CalculateAddress(uint32_t address1, uint32_t address2, bool backwards = false);
    static void OverwriteBytesAtAddress(void* address, uint8_t byte, size_t numRepeats);
    static void OverwriteBytesAtAddress(uint32_t address, uint8_t byteArray[], size_t arraySize);
    static void OverwriteUInt32AtAddress(uint32_t position, uint32_t newValue);
    static void SetByteAtAddress(void* address, uint8_t byte);
};
