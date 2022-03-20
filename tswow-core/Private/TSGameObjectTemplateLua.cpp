#include "TSLua.h"
#include "TSGameObjectTemplate.h"

void TSLuaState::load_gameobject_template_methods(uint32_t modid)
{
    auto ts_gameobjecttemplate = new_usertype<TSGameObjectTemplate>("TSGameObjectTemplate");
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetEntry);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetType);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetDisplayID);
    ts_gameobjecttemplate.set_function("GetName", &TSGameObjectTemplate::LGetName);
    ts_gameobjecttemplate.set_function("GetIconName", &TSGameObjectTemplate::LGetIconName);
    ts_gameobjecttemplate.set_function("GetCastBarCaption", &TSGameObjectTemplate::LGetCastBarCaption);
}
