#include "TSLua.h"
#include "TSPosition.h"

void TSLuaState::load_position_methods(sol::state& state)
{
    auto ts_position = state.new_usertype<TSPosition>("TSPosition");
    ts_position["x"] = &TSPosition::x;
    ts_position["y"] = &TSPosition::y;
    ts_position["z"] = &TSPosition::z;
    ts_position["o"] = &TSPosition::o;
    ts_position["map"] = &TSPosition::map;
}
