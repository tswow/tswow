#pragma once

#include "TSEntity.h"
#include "TSMain.h"
#include "TSClasses.h"
#include "TSArray.h"
#include "TSCreature.h"

#include <sol/sol.hpp>
#include <vector>

class TC_GAME_API TSArea : public TSEntityProvider {
    TS_CLASS_DECLARATION(TSArea, Area, area)
  public:
    TSArea(Area*);

    uint32 GetId();
    TSArea GetParent();
    TSMap GetMap();

    TSArray<TSPlayer> GetPlayers();
    TSArray<TSCreature> GetCreatures();
};

TSArea TC_GAME_API GetArea(uint32 area);
