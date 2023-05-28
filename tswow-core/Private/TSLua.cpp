#include "TSLua.h"
#include "Config.h"
#include "TSWorldObject.h"
#include "TSGlobal.h"
#include <regex>
#include "document.hpp"
#include <fstream>
    
static std::map<std::filesystem::path, sol::table> modules;
static std::vector<std::filesystem::path> file_stack;
static std::filesystem::path cur_module;
static std::filesystem::path cur_directory;
static bool already_errored = false;
static sol::state state;

sol::state& TSLua::GetState()
{
    return state;
}

static std::filesystem::path LibRoot()
{
#if AZEROTHCORE
    return std::filesystem::path(sConfigMgr->GetOption<std::string>("DataDir", "./")) / "lib";
#elif TRINITY
    return std::filesystem::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "lib";
#endif
}

std::filesystem::path TSLua::LuaRoot()
{
    return LibRoot() / "lua";
}

static std::filesystem::path LuaLibRoot()
{
    return LibRoot() / "lualib";
}

static bool ends_with(std::string const& value, std::string const& ending)
{
    if (ending.size() > value.size()) return false;
    return std::equal(ending.rbegin(), ending.rend(), value.rbegin());
}

static std::filesystem::path search_from(std::filesystem::path const& root, std::string const& target)
{
    std::filesystem::path candidate = root / target;
    if (std::filesystem::exists(candidate))
    {
        return candidate;
    }

    for (auto const& dir_entry : std::filesystem::recursive_directory_iterator(root))
    {
        std::string entry = dir_entry.path().string();
        std::replace(entry.begin(), entry.end(), '\\', '/');
        if (ends_with(entry, target))
        {
            return dir_entry.path();
        }
    }
    return "";
}

std::filesystem::path TSLua::FindLuaModule(std::string target)
{
    std::replace(target.begin(), target.end(), '.', '/');
    std::replace(target.begin(), target.end(), '\\', '/');
    target += ".lua";
    std::filesystem::path candidate = search_from(cur_directory, target);
    return candidate.empty() ? search_from(cur_module, target) : candidate;
}

void TSLua::load_bindings(sol::state& ztate)
{
    state.open_libraries(sol::lib::base, sol::lib::table, sol::lib::string, sol::lib::math);
    load_worldentity_methods(state);
    load_creature_methods(state);
    load_creature_template_methods(state);
    load_gameobject_methods(state);
    load_player_methods(state);
    load_item_methods(state);
    load_instance_methods(state);
    load_battleground_methods(state);
    load_achievement_methods(state);
    load_gameobject_template_methods(state);
    load_spell_info_methods(state);
    load_areatrigger_methods(state);
    load_auction_methods(state);
    load_aura_methods(state);
    load_spell_methods(state);
    load_channel_methods(state);
    load_corpse_methods(state);
    load_packet_methods(state);
    load_world_packet_methods(state);
    load_damage_metods(state);
    load_group_methods(state);
    load_guild_methods(state);
    load_json_methods(state);
    load_loot_methods(state);
    load_mail_methods(state);
    load_itemtemplate_methods(state);
    load_mutablestring_methods(state);
    load_mutable_methods(state);
    load_position_methods(state);
    load_quest_methods(state);
    load_smartscript_methods(state);
    load_outfit_methods(state);
    load_object_methods(state);
    load_world_object_methods(state);
    load_unit_methods(state);
    load_map_methods(state);
    load_database_methods(state);
    load_faction_template_methods(state);
    load_db_json_methods(state);
    load_main_thread_context_methods(state);
    load_global_functions(state);
    load_mutex_functions(state);
    load_events(state);
    load_lua_libraries(state);
}

void TSLua::handle_error(sol::protected_function_result const& res)
{
    if (res.valid())
    {
        return;
    }
#if AZEROTHCORE
    std::filesystem::path lua_path = std::filesystem::path(sConfigMgr->GetOption<std::string>("DataDir", "./")) / "lib" / "lua";
#elif TRINITY
    std::filesystem::path lua_path = std::filesystem::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "lib" / "lua";
#endif
    lua_path = std::filesystem::absolute(lua_path);
    sol::error err = res;
    std::string what = err.what();

    // Make relative paths
    {
        while (true)
        {
            size_t index = what.find("\\\\", 0);
            if (index == std::string::npos)
            {
                break;
            }
            what.replace(index, 2, "\\");
        }

        size_t index = 0;
        while (true)
        {
            index = what.find(lua_path.string(), index);
            if (index == std::string::npos) break;
            what.replace(index, lua_path.string().size() + 1, "");
        }
    }

    // Apply source maps
    {
        static std::regex exp("([ \t]*)(.+?\\.lua):(\\d+):");
        std::smatch res;
        std::string::const_iterator start(what.cbegin());
        uint32_t totStart = 0;
        struct Match
        {
            std::string spaces;
            std::string filename;
            int lineNo;
            uint32_t start;
            uint32_t len;
        };
        std::vector<Match> matches;
        while (std::regex_search(start, what.cend(), res, exp))
        {
            start = res.suffix().first;
            uint32_t lStart = res.prefix().length() + totStart;
            uint32_t len = res.length();
            totStart = lStart + len;
            std::string spaces = res[1];
            std::string filename = res[2];
            int lineNo = std::stoi(res[3]);
            matches.push_back({ spaces,filename,lineNo,lStart,len });
        }

        for (int i = matches.size() - 1; i >= 0; --i)
        {
            Match const& match = matches[i];
            std::filesystem::path map = lua_path / (match.filename + ".map");
            if (!std::filesystem::exists(map))
            {
                continue;
            }

            std::ifstream mapfile(map.string());
            std::stringstream buffer;
            buffer << mapfile.rdbuf();
            std::string str = buffer.str();

            // todo: sourcemap corrupts the heap, fix that before enabling this.
            if (str.size() > 0 && false)
            {
                SourceMap::SrcMapDoc doc(str);
                if (doc.map->getRowCount() < match.lineNo)
                {
                    continue;
                }

                auto line = doc.map->getLineMap(match.lineNo - 1);
                if (line->getEntryCount() == 0)
                {
                    continue;
                }
                auto entry = line->entries[0];
                size_t srcLine = entry->src_line;
                std::string srcFile = match.filename.substr(0, match.filename.size() - 4) + ".ts";
                std::string replacement = match.spaces + srcFile + ":" + std::to_string(srcLine);
                what.replace(match.start, match.len, replacement);
            }
        }
    }
    TS_LOG_ERROR("tswow.lua", "%s", what.c_str());
}

void TSLua::execute_file(std::filesystem::path file)
{
    file = std::filesystem::absolute(file);
    if (already_errored)
    {
        return;
    }

    if (modules.find(file) != modules.end())
    {
        return;
    }

    file_stack.push_back(file);
    sol::protected_function_result res;

    res = state.safe_script_file(file.string(), &sol::script_pass_on_error);
    if (!res.valid())
    {
        if (!already_errored)
        {
            handle_error(res);
        }
        already_errored = true;
        return;
    }

    modules[file] = res.get_type() == sol::type::table
        ? res.get<sol::table>()
        : state.create_table();
    file_stack.pop_back();
}

void TSLua::load_lua_libraries(sol::state & state)
{
    // Load lua libraries ( todo: move to "load_bindings" method )
    std::filesystem::path lualib_bundle_path = LuaLibRoot() / "lualib_bundle.lua";
    std::filesystem::path LuaORMClasses_path = LuaLibRoot() / "LuaORMClasses.lua";

    if (std::filesystem::exists(lualib_bundle_path))
    {
        modules["lualib_bundle"] = state.safe_script_file(lualib_bundle_path.string()).get<sol::table>();
    }

    if (std::filesystem::exists(LuaORMClasses_path))
    {
        state.safe_script_file(LuaORMClasses_path.string());
    }
}

sol::table TSLua::require(std::string const& mod)
{
    if (mod == "lualib_bundle")
    {
        return modules["lualib_bundle"];
    }

    std::filesystem::path path = std::filesystem::absolute(FindLuaModule(mod));
    if (path.empty())
    {
        throw std::runtime_error("Could not find module " + mod);
    }

    if (std::find(file_stack.begin(), file_stack.end(), path) != file_stack.end())
    {
        std::string error_str = "";
        for (std::filesystem::path const& file : file_stack)
        {
            error_str += "    " +file.string() + "->\n";
        }
        error_str += "    " + path.string();
        throw std::runtime_error("Circular dependency:" + error_str);
    }

    auto itr = modules.find(path);
    if (itr == modules.end())
    {
        execute_file(path);
        itr = modules.find(path);
        return itr != modules.end() ? itr->second : GetState().create_table();
    }
    else
    {
        return itr->second;
    }
    return modules[path];
}

void TSLua::Load()
{
    if (!std::filesystem::exists(LuaRoot()))
    {
        return;
    }

    modules.clear();
    state = sol::state();
    already_errored = false;

    state.set_function("require", [=](std::string const& name) {
        return TSLua::require(name);
    });
    load_bindings(state);
    state["HAS_TAG"] = L_HAS_TAG;
    state["BROADCAST_PHASE_ID"] = BROADCAST_PHASE_ID;
    state["TSClass"] = state.script(
        "local _lualib = require(\"lualib_bundle\")\n"
        "TSClass = _lualib.__TS__Class()\n"
        "TSClass.name = \"TSClass\"\n"
        "function TSClass.prototype.____constructor(self) end\n"
        "return TSClass"
    );
    state.script("print(\"hello_test\")");

    for (auto const& entry : std::filesystem::directory_iterator(LuaRoot()))
    {
        cur_module = entry.path();

        if (!entry.is_directory())
        {
            continue;
        }

        for (auto const& file : std::filesystem::recursive_directory_iterator(entry.path()))
        {
            if (file.is_regular_file() && file.path().extension() == ".lua")
            {
                cur_directory = file.path().parent_path();
                // don't load any accidental lualib_bundles
                if (file.path().filename() == "lualib_bundle.lua")
                {
                    continue;
                }

                try
                {
                    execute_file(file);
                }
                catch (std::exception const& e)
                {
                    std::cerr << e.what() << "\n";
                }
                catch (...)
                {
                    std::cerr << "Unknown Lua exception\n";
                }
            }
        }
    }

    for (auto& [_,table] : modules)
    {
        auto main = table["Main"];
        if (main.get_type() == sol::type::function)
        {
            // todo: hack to catch exceptions, we should properly configure sol to give us error results instead
            try
            {
                main(&ts_events);
            }
            catch (std::exception const& e)
            {
                std::cerr << e.what() << "\n";
            }
            catch (...)
            {
                std::cerr << "Unknown Lua exception\n";
            }
        }

        auto __inline_main = table["__InlineMain"];
        if (__inline_main.get_type() == sol::type::function)
        {
            try
            {
                __inline_main(&ts_events);
            }
            catch (std::exception const& e)
            {
                std::cerr << e.what() << "\n";
            }
            catch (...)
            {
                std::cerr << "Unknown Lua exception\n";
            }
        }
    }
}
