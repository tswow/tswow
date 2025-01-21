#pragma once

#include "ClientDB.h"
#include "Characters/ClientCharacterFixes.h"
#include "Tooltip/ClientTooltipExtensions.h"

class ClientExtensions {
private:
    static void initialize();
    friend class Main;
};
