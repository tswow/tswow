#include "ClientCharacterFixes.h"
#include "windows.h"

#include <vector>

void CharacterFixes::CharacterCreationFixes() {
	DWORD flOldProtect = 0;
	// addresses pointing to, uh, some sort of shared memory storage
	// needs to be bigger to not cause crashes with our dbcs so I assigned to it 512 bytes (original table is 176 bytes iirc? cba to look in IDA), should be enough
	std::vector<uint32_t> patchedAddresses = { 0x4E157D, 0x4E16A3, 0x4E15B5, 0x4E20EE, 0x4E222A, 0x4E2127, 0x4E1E94, 0x4E1C3A };

	for (uint8_t i = 0; i < patchedAddresses.size(); i++) {
		VirtualProtect((LPVOID)patchedAddresses[i], 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
		*(uint32_t*)patchedAddresses[i] = reinterpret_cast<uint32_t>(&memoryTable);
		VirtualProtect((LPVOID)patchedAddresses[i], 0x4, PAGE_EXECUTE_READ, &flOldProtect);
	}

	// Name table
	// 0x4CDA43 - address of table where pointers to race name strings are stored
	VirtualProtect((LPVOID)0x4CDA43, 0x4, PAGE_EXECUTE_READWRITE, &flOldProtect);
	*(uint32_t*)0x4CDA43 = reinterpret_cast<uint32_t>(&raceNameTable);
	VirtualProtect((LPVOID)0x4CDA43, 0x4, PAGE_EXECUTE_READ, &flOldProtect);

	return;
}
