#pragma once
#include "ClientCharacterDefines.h"

class ClientExtensions;

class CharacterFixes {
private:
    static void CharacterCreationFixes();
    friend class ClientExtensions;
};
