#pragma once

#include "TSBase.h"

class TSPosition {
public:
    int map;
    TSNumber<float> x;
    TSNumber<float> y;
    TSNumber<float> z;
    TSNumber<float> o;

    TSPosition* operator->() { return this;}
    TSPosition(int map,float x, float y, float z, float o)
    {
        this->x = x;
        this->y = y;
        this->z = z;
        this->map = map;
        this->o = o;
    }
};