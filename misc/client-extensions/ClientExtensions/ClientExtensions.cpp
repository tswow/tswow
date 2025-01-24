#include "ClientExtensions.h"

void ClientExtensions::initialize() {
    CharacterFixes::CharacterCreationFixes();
    TooltipExtensions::Apply();
}
