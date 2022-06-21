#include "TSLua.h"
#include "TSGameObjectTemplate.h"

void TSLua::load_gameobject_template_methods(sol::state& state)
{
    auto ts_gameobjecttemplate = state.new_usertype<TSGameObjectTemplate>("TSGameObjectTemplate");
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetEntry);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetType);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetDisplayID);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetGOData);
    ts_gameobjecttemplate.set_function("GetName", &TSGameObjectTemplate::LGetName);
    ts_gameobjecttemplate.set_function("GetIconName", &TSGameObjectTemplate::LGetIconName);
    ts_gameobjecttemplate.set_function("GetCastBarCaption", &TSGameObjectTemplate::LGetCastBarCaption);
}
