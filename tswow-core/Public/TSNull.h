#pragma once

#include "TSUnit.h"
#include "TSPlayer.h"
#include "TSGameObject.h"
#include "TSSpellInfo.h"
#include "TSMap.h"

inline TSUnit NULL_UNIT()             { return TSUnit(nullptr); }
inline TSPlayer NULL_PLAYER()         { return TSPlayer(nullptr); }
inline TSGameObject NULL_GAMEOBJECT() { return TSGameObject(nullptr); }
inline TSMap NULL_MAP()               { return TSMap(nullptr); }
inline TSSpellInfo NULL_SPELLINFO()    { return TSSpellInfo(nullptr); }