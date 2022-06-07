#include "TSLua.h"
#include "TSFactionTemplate.h"

void TSLuaState::load_faction_template_methods(sol::state& state)
{
    auto ts_faction_template = state.new_usertype<TSFactionTemplate>("TSFactionTemplate");
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetID);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetFaction);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetFlags);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetFactionGroup);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetFriendGroup);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetEnemyGroup);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetEnemy);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, GetFriend);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, IsFriendlyTo);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, IsHostileTo);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, IsHostileToPlayers);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, IsNeutralToAll);
    LUA_FIELD(ts_faction_template, TSFactionTemplate, IsContestedGuardFaction);
    state.set_function("GetFactionTemplate", &GetFactionTemplate);
}
