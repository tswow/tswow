#include "ClientExtensions.h"
#include "CDBCMgr/CDBCMgr.h"

void ClientExtensions::initialize() {
    CDBCMgr::Load();
    CharacterFixes::CharacterCreationFixes();
    CharacterExtensions::Apply();
    SpellTooltipExtensions::Apply();
}
