#pragma once

#include "TSMain.h"

#include <sol/sol.hpp>

#include <vector>
#include <filesystem>

#define LUA_FIELD(target,cls,fn) target.set_function(#fn,&cls::fn)

class TC_GAME_API TSLuaState : public sol::state
{
public:
    void load_bindings(uint32_t modid);
    TSLuaState(std::filesystem::path rootDir);
    TSLuaState() = default;
    static void handle_error(sol::protected_function_result const& what);
    void execute_file(std::filesystem::path const& file);
    void execute_module(std::string const& mod);
    std::filesystem::path module_to_file(std::string const& mod);
    sol::table require(std::string const& mod);
    static void Load();
private:
    void load_worldentity_methods(uint32_t modid);
    void load_creature_methods(uint32_t modid);
    void load_gameobject_methods(uint32_t modid);
    void load_player_methods(uint32_t modid);
    void load_item_methods(uint32_t modid);
    void load_instance_methods(uint32_t modid);
    void load_battleground_methods(uint32_t modid);
    void load_achievement_methods(uint32_t modid);
    void load_gameobject_template_methods(uint32_t modid);
    void load_spell_info_methods(uint32_t modid);
    void load_areatrigger_methods(uint32_t modid);
    void load_auction_methods(uint32_t modid);
    void load_aura_methods(uint32_t modid);
    void load_spell_methods(uint32_t modid);
    void load_channel_methods(uint32_t modid);
    void load_corpse_methods(uint32_t modid);
    void load_packet_methods(uint32_t modid);
    void load_damage_metods(uint32_t modid);
    void load_group_methods(uint32_t modid);
    void load_guild_methods(uint32_t modid);
    void load_json_methods(uint32_t modid);
    void load_loot_methods(uint32_t modid);
    void load_mail_methods(uint32_t modid);
    void load_itemtemplate_methods(uint32_t modid);
    void load_mutablestring_methods(uint32_t modid);
    void load_mutable_methods(uint32_t modid);
    void load_position_methods(uint32_t modid);
    void load_quest_methods(uint32_t modid);
    void load_smartscript_methods(uint32_t modid);
    void load_outfit_methods(uint32_t modid);
    void load_events(uint32_t modid);
    void load_object_methods(uint32_t modid);
    void load_world_object_methods(uint32_t modid);
    void load_unit_methods(uint32_t modid);
    void load_map_methods(uint32_t modid);

    template <typename C, typename T>
    void load_json_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename T>
    void load_entity_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename C, typename T>
    void load_world_entity_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename T>
    void load_map_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename T>
    void load_object_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename T>
    void load_world_object_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    template <typename T>
    void load_unit_methods_t(sol::usertype<T> & target, uint32_t modid, std::string const& name);

    std::map<std::filesystem::path, sol::table> _modules;
    std::vector<std::filesystem::path> _file_stack;
    std::filesystem::path _root_dir;
    bool alredy_errored = false;
};
