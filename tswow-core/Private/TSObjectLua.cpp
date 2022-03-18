#include "TSLua.h"
#include "TSObject.h"
#include "TSObjectLua.h"

#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSCreature.h"
#include "TSUnit.h"
#include "TSCorpse.h"


void TSLuaState::load_object_methods(uint32_t modid)
{
    auto ts_object = new_usertype<TSObject>("TSObject");
    load_object_methods_t(ts_object, modid, "TSObject");
}
