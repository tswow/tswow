#pragma once
#include <iostream>

typedef std::string string;

static uint32_t memoryTable[128] = { 0 };

static uint32_t dummy = 0;

static char* sEredar = "Eredar";
static char* sLightforged = "Lightforged";
static char* sNaga = "Naga";
static char* sNightborne = "Nightborne";
static char* sPandarenA = "Pandaren_Alliance";
static char* sPandarenH = "Pandaren_Horde ";
static char* sPandarenN = "Pandaren_Neutral";
static char* sQueldo = "Queldo";
static char* sWorgen = "Worgen";
static char* sVoidElf = "VoidElf";
static char* sVulperaA = "Vulpera_Alliance";
static char* sVulperaH = "Vulpera_Horde";
static char* sVulperaN = "Vulpera_Neutral";
static char* sZandalari = "ZandalariTroll";

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
	reinterpret_cast<uint32_t>(&sWorgen),
	reinterpret_cast<uint32_t>(&sNaga),
	reinterpret_cast<uint32_t>(&sPandarenA),
	reinterpret_cast<uint32_t>(&sQueldo),
	reinterpret_cast<uint32_t>(&sPandarenH),
	reinterpret_cast<uint32_t>(&sNightborne),
	reinterpret_cast<uint32_t>(&sVoidElf),
	reinterpret_cast<uint32_t>(&sVulperaA),
	reinterpret_cast<uint32_t>(&sVulperaH),
	reinterpret_cast<uint32_t>(&sVulperaN),
	reinterpret_cast<uint32_t>(&sPandarenN),
	reinterpret_cast<uint32_t>(&sZandalari),
	reinterpret_cast<uint32_t>(&sLightforged),
	reinterpret_cast<uint32_t>(&sEredar),
	reinterpret_cast<uint32_t>(&dummy),
	reinterpret_cast<uint32_t>(&dummy),
	reinterpret_cast<uint32_t>(&dummy),
	reinterpret_cast<uint32_t>(&dummy),
	reinterpret_cast<uint32_t>(&dummy),
	reinterpret_cast<uint32_t>(&dummy)
};
