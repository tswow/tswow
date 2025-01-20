#include "windows.h"
#include "ClientExtensions.h"
#include "Logger.h"

void ClientExtensions::initialize() {
    CharacterFixes::CharacterCreationFixes();
    LOG_INFO << "Character creation fixes applied";
    TooltipExtensions::Apply();
    LOG_INFO << "Tooltip extensions applied";
}
