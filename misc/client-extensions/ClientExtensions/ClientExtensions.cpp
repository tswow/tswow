#include "windows.h"
#include "ClientExtensions.h"
#include "Logger.h"

void ClientExtensions::initialize() {
    ClientDB::Apply();
    LOG_INFO << "DBC Loader extension applied";
    CharacterFixes::CharacterCreationFixes();
    LOG_INFO << "Character creation fixes applied";
    TooltipExtensions::Apply();
    LOG_INFO << "Tooltip extensions applied";
}
