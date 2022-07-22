#include "TSLua.h"
#include "TSGameObjectTemplate.h"

void TSLua::load_gameobject_template_methods(sol::state& state)
{
    auto ts_gameobjecttemplate = state.new_usertype<TSGameObjectTemplate>("TSGameObjectTemplate");
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetEntry);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetType);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetDisplayID);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetGOData);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetName);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetIconName);
    LUA_FIELD(ts_gameobjecttemplate, TSGameObjectTemplate, GetCastBarCaption);
}
