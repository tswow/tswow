#pragma once

#include "CharacterDefines.h"

class CharacterExtensions {
public:
    static int SpecToIndex(uint32_t specID);
private:
    static void Apply();
    static void ChangeLFGRoleFunctionPointers();
    static void SpellLearnExtension();
    static void SpellUnlearnExtension();

    static uint32_t CheckLFGRoles(uint32_t roles);
    static uint32_t GetClassRoles(uint32_t classId);
    static int Lua_GetAvailableRoles(lua_State* L);
    static int Lua_SetLFGRole(lua_State* L);
    static void OnSpellLearnEx(SpellRow* spellRow, uint32_t* a5);
    static void OnSpellUnlearnEx(SpellRow* spellRow, uint32_t* a3);
    friend class ClientExtensions;
};
