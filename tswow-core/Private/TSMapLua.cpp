#include "TSLua.h"
#include "TSMap.h"
#include "TSMapLua.h"

#include "TSPlayer.h"
#include "TSWorldObject.h"
#include "TSGameObject.h"
#include "TSUnit.h"
#include "TSCreature.h"
#include "TSBattleground.h"
#include "TSInstance.h"

void TSLuaState::load_map_methods(uint32_t modid)
{
    auto ts_map = new_usertype<TSMap>("TSMap");
    load_map_methods_t(ts_map, modid, "TSMap");
}
