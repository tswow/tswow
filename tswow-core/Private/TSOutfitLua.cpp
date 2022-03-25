#include "TSLua.h"
#include "TSOutfit.h"

#include "TSPlayer.h"
#include "TSItem.h"
#include "TSCreature.h"

void TSLuaState::load_outfit_methods(uint32_t modid)
{
#if TRINITY
    auto ts_outfit = new_usertype<TSOutfit>("TSOutfit");
    LUA_FIELD(ts_outfit, TSOutfit, SetClass);
    LUA_FIELD(ts_outfit, TSOutfit, GetClass);
    LUA_FIELD(ts_outfit, TSOutfit, SetFace);
    LUA_FIELD(ts_outfit, TSOutfit, GetFace);
    LUA_FIELD(ts_outfit, TSOutfit, SetSkin);
    LUA_FIELD(ts_outfit, TSOutfit, GetSkin);
    LUA_FIELD(ts_outfit, TSOutfit, SetHairStyle);
    LUA_FIELD(ts_outfit, TSOutfit, GetHairStyle);
    LUA_FIELD(ts_outfit, TSOutfit, SetFacialStyle);
    LUA_FIELD(ts_outfit, TSOutfit, GetFacialStyle);
    LUA_FIELD(ts_outfit, TSOutfit, SetHairColor);
    LUA_FIELD(ts_outfit, TSOutfit, GetHairColor);
    LUA_FIELD(ts_outfit, TSOutfit, SetSoundID);
    LUA_FIELD(ts_outfit, TSOutfit, GetSoundID);
    LUA_FIELD(ts_outfit, TSOutfit, SetGuild);
    LUA_FIELD(ts_outfit, TSOutfit, GetGuild);
    LUA_FIELD(ts_outfit, TSOutfit, GetGender);
    LUA_FIELD(ts_outfit, TSOutfit, GetRace);
    LUA_FIELD(ts_outfit, TSOutfit, SetItem);
    LUA_FIELD(ts_outfit, TSOutfit, ClearItem);
    LUA_FIELD(ts_outfit, TSOutfit, SetItemByDisplayID);
    LUA_FIELD(ts_outfit, TSOutfit, SetMainhand);
    LUA_FIELD(ts_outfit, TSOutfit, SetOffhand);
    LUA_FIELD(ts_outfit, TSOutfit, SetRanged);
    LUA_FIELD(ts_outfit, TSOutfit, ClearMainhand);
    LUA_FIELD(ts_outfit, TSOutfit, ClearOffhand);
    LUA_FIELD(ts_outfit, TSOutfit, ClearRanged);
    LUA_FIELD(ts_outfit, TSOutfit, GetMainhand);
    LUA_FIELD(ts_outfit, TSOutfit, GetOffhand);
    LUA_FIELD(ts_outfit, TSOutfit, GetRanged);
    //LUA_FIELD(ts_outfit, TSOutfit, GetDisplayID);
    LUA_FIELD(ts_outfit, TSOutfit, ApplyRef);
    ts_outfit.set_function("ApplyCopy", sol::overload(
        &TSOutfit::LApplyCopy0
        , &TSOutfit::LApplyCopy1
        , &TSOutfit::LApplyCopy2
        , &TSOutfit::LApplyCopy3
    ));
    set_function("CreateOutfit", &CreateOutfit);
#endif
}
