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

void TSLua::load_unit_methods(sol::state& state)
{
    auto ts_unit = state.new_usertype<TSUnit>("TSUnit", sol::base_classes, sol::bases<TSWorldObject, TSObject, TSWorldEntityProvider<TSWorldObject>, TSEntityProvider>());
    load_unit_methods_t(state, ts_unit, "TSUnit");
}
