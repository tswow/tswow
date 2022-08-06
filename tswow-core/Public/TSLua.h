#pragma once

#include "TSMain.h"

#include <sol/sol.hpp>

#include <vector>
#include <filesystem>

#define LUA_FIELD(target,cls,fn) target.set_function(#fn,&cls::fn)

class TC_GAME_API TSLua
{
public:
    template <typename T>
    using Array = sol::as_table_t<std::vector<T>>;

    template <typename K, typename V>
    using Dictionary = sol::as_table_t<std::map<K, V>>;

    static void load_bindings(sol::state& state);
    static void handle_error(sol::protected_function_result const& what);
    static void execute_file(std::filesystem::path file);
    static sol::table require(std::string const& mod);
    static void Load();
    static sol::state& GetState();
    static std::filesystem::path LuaRoot();
    static std::filesystem::path FindLuaModule(std::string target);
private:
    static void load_worldentity_methods(sol::state & state);
    static void load_creature_methods(sol::state & state);
    static void load_creature_template_methods(sol::state & state);
    static void load_gameobject_methods(sol::state & state);
    static void load_player_methods(sol::state & state);
    static void load_item_methods(sol::state & state);
    static void load_instance_methods(sol::state & state);
    static void load_battleground_methods(sol::state & state);
    static void load_achievement_methods(sol::state & state);
    static void load_gameobject_template_methods(sol::state & state);
    static void load_spell_info_methods(sol::state & state);
    static void load_areatrigger_methods(sol::state & state);
    static void load_auction_methods(sol::state & state);
    static void load_aura_methods(sol::state & state);
    static void load_spell_methods(sol::state & state);
    static void load_channel_methods(sol::state & state);
    static void load_corpse_methods(sol::state & state);
    static void load_packet_methods(sol::state & state);
    static void load_world_packet_methods(sol::state & state);
    static void load_damage_metods(sol::state & state);
    static void load_group_methods(sol::state & state);
    static void load_guild_methods(sol::state & state);
    static void load_json_methods(sol::state & state);
    static void load_loot_methods(sol::state & state);
    static void load_mail_methods(sol::state & state);
    static void load_itemtemplate_methods(sol::state & state);
    static void load_mutablestring_methods(sol::state & state);
    static void load_mutable_methods(sol::state & state);
    static void load_position_methods(sol::state & state);
    static void load_quest_methods(sol::state & state);
    static void load_smartscript_methods(sol::state & state);
    static void load_outfit_methods(sol::state & state);
    static void load_events(sol::state & state);
    static void load_object_methods(sol::state & state);
    static void load_world_object_methods(sol::state & state);
    static void load_unit_methods(sol::state & state);
    static void load_map_methods(sol::state & state);
    static void load_database_methods(sol::state & state);
    static void load_faction_template_methods(sol::state& state);
    static void load_db_json_methods(sol::state& state);
    static void load_global_functions(sol::state& state);
    static void load_mutex_functions(sol::state& state);
    static void load_lua_libraries(sol::state& state);
    static void load_main_thread_context_methods(sol::state& state);

    template <typename C, typename T>
    static void load_json_methods_t(sol::state & state, sol::usertype<T> & target, std::string const& name);

    template <typename T>
    static void load_entity_methods_t(sol::state & state, sol::usertype<T> & target, std::string const& name);

    template <typename C, typename T>
    static void load_world_entity_methods_t(sol::state & state, sol::usertype<T> & target, std::string const& name);
};
