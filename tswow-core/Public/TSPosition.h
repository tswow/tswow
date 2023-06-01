#pragma once

#include "TSBase.h"

class TSPosition {
public:
    uint32 map;
    TSNumber<float> x;
    TSNumber<float> y;
    TSNumber<float> z;
    TSNumber<float> o;
    TSPosition* operator->() { return this;}
    TSPosition(uint32 map,float x, float y, float z, float o);
};

TC_GAME_API TSPosition CreatePosition(uint32 map, float x, float y, float z, float o);