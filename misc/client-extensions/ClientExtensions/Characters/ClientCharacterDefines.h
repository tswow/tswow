#pragma once
#include <iostream>

typedef std::string string;

static uint32_t memoryTable[128];

static uint32_t dummy = 0;

static char* sBloodElf = "BloodElf";
static char* sDraenei = "Draenei";
static char* sDwarf = "Dwarf";
static char* sEredar = "Eredar";
static char* sGnome = "Gnome";
static char* sGoblin = "Goblin";
static char* sHuman = "Human";
static char* sLightforged = "Lightforged";
static char* sNaga = "Naga";
static char* sNightElf = "NightElf";
static char* sNightborne = "Nightborne";
static char* sOrc = "Orc";
static char* sPandarenA = "Pandaren_Alliance";
static char* sPandarenH = "Pandaren_Horde ";
static char* sPandarenN = "Pandaren_Neutral";
static char* sQueldo = "Queldo";
static char* sScourge = "Scourge";
static char* sTauren = "Tauren";
static char* sTroll = "Troll";
static char* sWorgen = "Worgen";
static char* sVoidElf = "VoidElf";
static char* sVulperaA = "Vulpera_Alliance";
static char* sVulperaH = "Vulpera_Horde";
static char* sVulperaN = "Vulpera_Neutral";
static char* sZandalari = "ZandalariTroll";

static uint32_t raceNameTable[32] = {
	0,
	reinterpret_cast<uint32_t>(&sHuman),
	reinterpret_cast<uint32_t>(&sOrc),
	reinterpret_cast<uint32_t>(&sDwarf),
	reinterpret_cast<uint32_t>(&sNightElf),
	reinterpret_cast<uint32_t>(&sScourge),
	reinterpret_cast<uint32_t>(&sTauren),
	reinterpret_cast<uint32_t>(&sGnome),
	reinterpret_cast<uint32_t>(&sTroll),
	reinterpret_cast<uint32_t>(&sGoblin),
	reinterpret_cast<uint32_t>(&sBloodElf),
	reinterpret_cast<uint32_t>(&sDraenei),
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
