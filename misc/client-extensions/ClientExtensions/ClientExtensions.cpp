#include "ClientExtensions.h"
#include "CustomDBCMgr/CustomDBCMgr.h"

void ClientExtensions::initialize() {
    CustomDBCMgr::Load();
    CharacterFixes::CharacterCreationFixes();
    CharacterExtensions::Apply();
    SpellTooltipExtensions::Apply();
}
