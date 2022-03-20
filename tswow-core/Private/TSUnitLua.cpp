#include "TSLua.h"
#include "TSUnit.h"
#include "TSUnitLua.h"

#include "TSPlayer.h"
#include "TSAura.h"
#include "TSSpell.h"
#include "TSVehicle.h"
#include "TSCreature.h"
#include "TSItem.h"
#include "TSGameObject.h"
#include "TSCreature.h"
#include "TSCorpse.h"

void TSLuaState::load_unit_methods(uint32_t modid)
{
    auto ts_unit = new_usertype<TSUnit>("TSUnit");
    load_unit_methods_t(ts_unit, modid, "TSUnit");
}
