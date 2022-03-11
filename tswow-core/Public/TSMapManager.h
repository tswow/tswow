#pragma once

#include "TSMain.h"
#include <memory>

class TSPlayer;
class TSMap;

class TC_GAME_API TSMapManager {
    TSPlayer GetPlayer(uint64_t guid);
    TSPlayer GetPlayer(TSString name);
    TSMap GetMap(uint32_t mapId, uint32_t instanceId = 0);
};
