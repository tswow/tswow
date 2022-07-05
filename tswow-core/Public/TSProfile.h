#pragma once

#include "Tracy.hpp"

#include <map>

#define WORLD_UPDATE_COLOR    0x6ADEFC
#define MAP_UPDATE_COLOR      0xFCD96A
#define DATABASE_UPDATE_COLOR 0x80E66B

extern std::map<std::pair<uint32,uint32>, uint32> relocations;
