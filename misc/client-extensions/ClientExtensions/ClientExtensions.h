#pragma once

#include "Character/CharacterExtensions.h"
#include "Character/CharacterFixes.h"
#include "Misc/MiscFixes.h"
#include "Tooltip/SpellTooltipExtensions.h"
#include "World/WorldData.h"
#include "Spells/Spells.h"

class ClientExtensions {
private:
    static void initialize();
    friend class Main;
};
