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

    TSPosition(uint32 in_map,float in_x, float in_y, float in_z, float in_o)
    : map(in_map) , x(in_x) , y(in_y) , z(in_z) , o(in_o) 
    {}
};

TC_GAME_API TSPosition CreatePosition(uint32 map, float x, float y, float z, float o);