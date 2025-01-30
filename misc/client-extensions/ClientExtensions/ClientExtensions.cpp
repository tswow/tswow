#include "windows.h"
#include "ClientExtensions.h"
#include "Logger.h"

void ClientExtensions::initialize() {
    ClientDB::Load();
    LOG_INFO << "Custom DBCs loaded";
    CharacterFixes::CharacterCreationFixes();
    LOG_INFO << "Character creation fixes applied";
    TooltipExtensions::Apply();
    LOG_INFO << "Tooltip extensions applied";
}
