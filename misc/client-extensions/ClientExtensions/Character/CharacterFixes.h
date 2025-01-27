#pragma once
#include "CharacterDefines.h"

class CharacterFixes {
private:
    static void CharacterCreationFixes();
    static void SetNewRaceNamePointerTable();
    friend class ClientExtensions;
};
