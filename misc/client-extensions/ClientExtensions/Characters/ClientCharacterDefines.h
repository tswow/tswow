#pragma once
#include <iostream>

typedef std::string string;

static uint32_t memoryTable[128] = { 0 };

static uint32_t dummy = 0;

static uint32_t raceNameTable[32] = {
    0,        // string pointers
    0x9E4E2C, // Human
    0x9E4E28, // Orc
    0x9E4E20, // Dwarf
    0x9E4E14, // NightElf
    0xA59634, // Scourge
    0x9E4E04, // Tauren
    0x9E4DFC, // Gnome
    0x9E4DF4, // Troll
    0xA5962C, // Goblin
    0xA59620, // BloodElf
    0xA59618, // Draenei
    reinterpret_cast<uint32_t>(&"Worgen"),
    reinterpret_cast<uint32_t>(&"Naga"),
    reinterpret_cast<uint32_t>(&"Pandaren_Alliance"),
    reinterpret_cast<uint32_t>(&"Queldo"),
    reinterpret_cast<uint32_t>(&"Pandaren_Horde "),
    reinterpret_cast<uint32_t>(&"Nightborne"),
    reinterpret_cast<uint32_t>(&"VoidElf"),
    reinterpret_cast<uint32_t>(&"Vulpera_Alliance"),
    reinterpret_cast<uint32_t>(&"Vulpera_Horde"),
    reinterpret_cast<uint32_t>(&"Vulpera_Neutral"),
    reinterpret_cast<uint32_t>(&"Pandaren_Neutral"),
    reinterpret_cast<uint32_t>(&"ZandalariTroll"),
    reinterpret_cast<uint32_t>(&"Lightforged"),
    reinterpret_cast<uint32_t>(&"Eredar"),
    reinterpret_cast<uint32_t>(&dummy),
    reinterpret_cast<uint32_t>(&dummy),
    reinterpret_cast<uint32_t>(&dummy),
    reinterpret_cast<uint32_t>(&dummy),
    reinterpret_cast<uint32_t>(&dummy),
    reinterpret_cast<uint32_t>(&dummy)
};
