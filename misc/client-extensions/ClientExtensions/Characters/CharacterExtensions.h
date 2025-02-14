#pragma once

#include "CharacterDefines.h"

class CharacterExtensions
{
  private:
    static void Apply();
    static void SpellLearnExtension();
    static void SpellUnlearnExtension();
    static void OnSpellLearnEx(SpellRow* spellRow, uint32_t* a5);
    static void OnSpellUnlearnEx(SpellRow* spellRow, uint32_t* a3);
    friend class ClientExtensions;
};
