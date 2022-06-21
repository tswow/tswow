#pragma once

#include "Tracy.hpp"

#define WORLD_UPDATE_COLOR    0x6ADEFC
#define MAP_UPDATE_COLOR      0xFCD96A
#define ENTITY_UPDATE_COLOR   0xF27866
#define SPELL_UPDATE_COLOR    0xAA62F5
#define DATABASE_UPDATE_COLOR 0x80E66B

#define TC_ZONE_SCOPED(type) type()
#define TC_ZONE_SCOPED_N(type,name) type##_N(name)

#ifdef PROFILE_WORLD
#define WORLD_PROFILE() ZoneScopedC(WORLD_UPDATE_COLOR)
#define WORLD_PROFILE_N(name) ZoneScopedNC(name,WORLD_UPDATE_COLOR)
#else
#define WORLD_PROFILE()
#define WORLD_PROFILE_N(name)
#endif

#ifdef PROFILE_MAP
#define MAP_PROFILE() ZoneScopedC(MAP_UPDATE_COLOR)
#define MAP_PROFILE_N(name) ZoneScopedNC(name,MAP_UPDATE_COLOR)
#else
#define MAP_PROFILE()
#define MAP_PROFILE_N(name)
#endif

#ifdef PROFILE_ENTITY
#define ENTITY_PROFILE() ZoneScopedC(ENTITY_UPDATE_COLOR)
#define ENTITY_PROFILE_N(name) ZoneScopedNC(name,ENTITY_UPDATE_COLOR)
#else
#define ENTITY_PROFILE()
#define ENTITY_PROFILE_N(name)
#endif

#ifdef PROFILE_SPELL
#define SPELL_PROFILE() ZoneScopedC(SPELL_UPDATE_COLOR)
#define SPELL_PROFILE_N(name) ZoneScopedNC(name,SPELL_UPDATE_COLOR)
#else
#define SPELL_PROFILE()
#define SPELL_PROFILE_N(name)
#endif
