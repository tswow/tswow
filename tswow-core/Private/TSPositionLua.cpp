#include "TSLua.h"
#include "TSPosition.h"

void TSLua::load_position_methods(sol::state& state)
{
    auto ts_position = state.new_usertype<TSPosition>("TSPosition");
    // Use lambdas to wrap member pointers for C++20 compatibility with Clang
    ts_position["x"] = [](TSPosition& pos) -> TSNumber<float>& { return pos.x; };
    ts_position["y"] = [](TSPosition& pos) -> TSNumber<float>& { return pos.y; };
    ts_position["z"] = [](TSPosition& pos) -> TSNumber<float>& { return pos.z; };
    ts_position["o"] = [](TSPosition& pos) -> TSNumber<float>& { return pos.o; };
    ts_position["map"] = [](TSPosition& pos) -> uint32& { return pos.map; };

    state.set_function("CreatePosition", CreatePosition);
}