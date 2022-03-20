#include "TSLua.h"
#include "TSPosition.h"

void TSLuaState::load_position_methods(uint32_t modid)
{
    auto ts_position = new_usertype < TSPosition>("TSPosition");
    ts_position["x"] = &TSPosition::x;
    ts_position["y"] = &TSPosition::y;
    ts_position["z"] = &TSPosition::z;
    ts_position["o"] = &TSPosition::o;
    ts_position["map"] = &TSPosition::map;
}
