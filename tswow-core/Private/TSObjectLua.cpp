#include "TSLua.h"
#include "TSObject.h"
#include "TSObjectLua.h"

#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSCreature.h"
#include "TSUnit.h"
#include "TSCorpse.h"


void TSLuaState::load_object_methods(sol::state& state)
{
    auto ts_object = state.new_usertype<TSObject>("TSObject", sol::base_classes, sol::bases<TSEntityProvider>());
    load_object_methods_t(state, ts_object, "TSObject");
}
