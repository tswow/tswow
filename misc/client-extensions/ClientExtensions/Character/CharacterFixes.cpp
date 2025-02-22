#include "CharacterFixes.h"
#include "windows.h"

#include <vector>

void CharacterFixes::CharacterCreationFixes() {
    DWORD flOldProtect = 0;
    // addresses pointing to, uh, some sort of shared memory storage
    // needs to be bigger to not cause crashes with our dbcs so I assigned to it 512 bytes (original table is 176 bytes iirc? cba to look in IDA), should be enough
    std::vector<uint32_t> patchedAddresses = { 0x4E157D, 0x4E16A3, 0x4E15B5, 0x4E20EE, 0x4E222A, 0x4E2127, 0x4E1E94, 0x4E1C3A };

    for (uint8_t i = 0; i < patchedAddresses.size(); i++)
        Util::OverwriteUInt32AtAddress(patchedAddresses[i], reinterpret_cast<uint32_t>(&memoryTable));

    // Name table
    // 0x4CDA43 - address of table where pointers to race name strings are stored
    SetNewRaceNamePointerTable();
    Util::OverwriteUInt32AtAddress(0x4CDA43, reinterpret_cast<uint32_t>(&raceNameTable));
}

void CharacterFixes::SetNewRaceNamePointerTable() {
    const char* raceStrings[14] = {
        "Worgen", "Naga", "Pandaren_Alliance", "Queldo", "Pandaren_Horde ",
        "Nightborne", "VoidElf", "Vulpera_Alliance", "Vulpera_Horde",
        "Vulpera_Neutral", "Pandaren_Neutral", "ZandalariTroll", "Lightforged",
        "Eredar"
    };

    memcpy(&raceNameTable, (const void*)0xB24180, 0x30);

    for (size_t i = 0; i < sizeof(raceStrings) / sizeof(raceStrings[0]); i++)
        raceNameTable[12 + i] = reinterpret_cast<uint32_t>(raceStrings[i]);

    for (uint8_t i = 26; i < 32; i++)
        raceNameTable[i] = reinterpret_cast<uint32_t>(&dummy);
}
