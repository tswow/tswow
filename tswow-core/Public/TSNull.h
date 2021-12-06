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

// note: this is weird semantics in C++, but not for the transpiler.
//       please don't explicitly use this in your own code.
struct TSNull{};

template <typename T>
bool operator==(TSNull const& lhs, T const& rhs) { return !rhs; }

template <typename T>
bool operator==(T const& lhs, TSNull const& rhs) { return !lhs; }
