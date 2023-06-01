#include "TSPosition.h"

TSPosition CreatePosition(uint32 map, float x, float y, float z, float o)
{
    return TSPosition(map,x,y,z,o);
}

TSPosition::TSPosition(uint32 in_map,float in_x, float in_y, float in_z, float in_o)
    : map(in_map)
    , x(in_x)
    , y(in_y)
    , z(in_z)
    , o(in_o)
{}