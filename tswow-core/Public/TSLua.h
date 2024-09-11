#pragma once

#include "TSMain.h"

#include <sol/sol.hpp>

#include <vector>
#include <filesystem>

#define LUA_FIELD(target,cls,fn) target.set_function(#fn,&cls::fn)

#define LUA_PTR_TYPE_CON(type_in,con_in)\
inline int sol_lua_push(lua_State* L, const type_in& value) {\
    int amount;\
    if (value)\
    {\
       	using Tu = sol::meta::unqualified_t<type_in>;\
        sol::stack::unqualified_pusher<type_in> p{};\
        amount = p.push(L, value);\
    }\
    else\
    {\
        amount = sol::stack::push(L, sol::nil);\
    }\
    return amount;\
}\
template <typename Handler>\
bool sol_lua_check(sol::types<type_in>, lua_State* L, int index, Handler&& handler, sol::stack::record& tracking) {\
    int absolute_index = lua_absindex(L, index);\
    sol::type v = sol::type_of(L, absolute_index);\
    if (v == sol::type::nil)\
    {\
        return true;\
    }\
    else if (v == sol::type::userdata)\
    {\
        using Tu = sol::meta::unqualified_t<type_in>;\
        sol::stack::unqualified_checker<type_in, sol::lua_type_of_v<Tu>> c{};\
        c.check(L, index, std::forward<Handler>(handler), tracking);\
        return true;\
    }\
    else\
    {\
        tracking.use(1);\
        sol::stack::check<sol::userdata>(L, absolute_index, handler);\
        return false;\
    }\
}\
inline type_in& sol_lua_get(sol::types<type_in> types, lua_State* L, int index, sol::stack::record& tracking)\
{\
    int absolute_index = lua_absindex(L, index);\
    sol::type v = sol::type_of(L, absolute_index);\
    if (v == sol::type::nil)\
    {\
        tracking.use(1);\
        void* c = add_lua_garbage(sizeof(type_in));\
        type_in* ptr = reinterpret_cast<type_in*>(c);\
        *ptr = con_in;\
        return *ptr;\
    }\
    else\
    {\
        void* memory = lua_touserdata(L, index);\
        tracking.use(1);\
        void* rawdata = sol::detail::align_usertype_pointer(memory);\
        void** pudata = static_cast<void**>(rawdata);\
        void* udata = *pudata;\
				return *sol::stack::unqualified_getter<sol::detail::as_value_tag<type_in>>::get_no_lua_nil_from(L, udata, index, tracking);\
    }\
}\

#define LUA_PTR_TYPE(type_in) LUA_PTR_TYPE_CON(type_in,type_in(nullptr))

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
    static void load_guid_methods(sol::state& state);
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

// used by the pointer system to get class references even when we have to fake them
TC_GAME_API void* add_lua_garbage(size_t size);
TC_GAME_API void clear_lua_garbage();
TC_GAME_API size_t GetLuaGarbageCur();
TC_GAME_API size_t GetLuaGarbageTotal();
