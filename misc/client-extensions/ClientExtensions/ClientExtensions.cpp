#include "ClientExtensions.h"

void ClientExtensions::initialize() {
    CharacterFixes::CharacterCreationFixes();
    CharacterExtensions::Apply();
    SpellTooltipExtensions::Apply();
}
