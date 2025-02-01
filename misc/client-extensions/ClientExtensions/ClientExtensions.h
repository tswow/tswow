#pragma once

#include "CustomDBCMgr/ClientDB.h"
#include "Character/CharacterFixes.h"
#include "Tooltip/SpellTooltipExtensions.h"

class ClientExtensions {
private:
    static void initialize();
    friend class Main;
};
