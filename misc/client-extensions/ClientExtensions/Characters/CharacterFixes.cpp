#include "CharacterFixes.h"
#include "windows.h"

#include <vector>

void CharacterFixes::CharacterCreationFixes()
{
    DWORD flOldProtect = 0;
    // list of addresses where memoryTable pointer needs to be set
    std::vector<uint32_t> patchedAddresses = { 0x4E157D, 0x4E16A3, 0x4E15B5, 0x4E20EE, 0x4E222A, 0x4E2127, 0x4E1E94, 0x4E1C3A };

    for (uint8_t i = 0; i < patchedAddresses.size(); i++)
    {
        VirtualProtect((LPVOID)patchedAddresses[i], 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
        *(uint32_t*)patchedAddresses[i] = reinterpret_cast<uint32_t>(&memoryTable);
        VirtualProtect((LPVOID)patchedAddresses[i], 0x4, PAGE_EXECUTE_READ, &flOldProtect);
    }

    // Name table
    // there's apparently one more place pointing to that table but doesn't seem to be needed to be fixed
    SetNewRaceNamePointerTable();
    VirtualProtect((LPVOID)0x4CDA43, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
    *(uint32_t*)0x4CDA43 = reinterpret_cast<uint32_t>(&raceNameTable);
    VirtualProtect((LPVOID)0x4CDA43, 0x4, PAGE_EXECUTE_READ, &flOldProtect);

    return;
}

void CharacterFixes::SetNewRaceNamePointerTable()
{
    memcpy(&raceNameTable, (const void*)0xB24180, 0x58);

    for (uint8_t i = 22; i < 32; i++)
        raceNameTable[i] = reinterpret_cast<uint32_t>(&dummy);

    return;
}
