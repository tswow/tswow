#include "ClientExtensions.h"

void ClientExtensions::initialize() {
    CharacterFixes::CharacterCreationFixes();
    SpellTooltipExtensions::Apply();
}
