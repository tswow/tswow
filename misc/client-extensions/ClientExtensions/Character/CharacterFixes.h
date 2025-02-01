#pragma once
#include "CharacterDefines.h"

class CharacterFixes {
private:
    static inline uint32_t memoryTable[128] = { 0 };
    static inline uint32_t raceNameTable[32] = { 0 };
    static void CharacterCreationFixes();
    static void SetNewRaceNamePointerTable();
    friend class ClientExtensions;
};
