#pragma once
#include "ClientCharacterDefines.h"

class ClientExtensions;

class CharacterFixes {
private:
    static void CharacterCreationFixes();
    static void SetNewRaceNamePointerTable();
    friend class ClientExtensions;
};
