#include "windows.h"
#include "ClientExtensions.h"
#include "CDBCMgr/CDBCMgr.h"
#include "Logger.h"

void ClientExtensions::initialize() {
    CDBCMgr::Load();
    LOG_INFO << "Custom DBCs loaded";
    CharacterFixes::CharacterCreationFixes();
    LOG_INFO << "Character creation fixes applied";
    CharacterExtensions::Apply();
    LOG_INFO << "Character extensions applied";
    WorldDataExtensions::Apply();
    LOG_INFO << "World data extensions applied";
    TooltipExtensions::Apply();
    LOG_INFO << "Tooltip extensions applied";
    MiscFixes::Apply();
    LOG_INFO << "Misc fixes applied";
    Spells::Apply();
    LOG_INFO << "Spell extensions applied";
}
