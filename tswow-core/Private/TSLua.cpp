#include "TSEventLoader.h"
#include "TSLua.h"
#include "Config.h"
#include <regex>
#include "document.hpp"
#include <fstream>

static std::map<std::string, TSLuaState> states;

TSLuaState::TSLuaState(std::filesystem::path rootDir)
    : _root_dir(rootDir)
{
}

void TSLuaState::load_bindings(uint32_t modid)
{
    open_libraries(sol::lib::base, sol::lib::table, sol::lib::string, sol::lib::math);
    load_worldentity_methods(modid);
    load_creature_methods(modid);
    load_gameobject_methods(modid);
    load_player_methods(modid);
    load_item_methods(modid);
    load_instance_methods(modid);
    load_battleground_methods(modid);
    load_achievement_methods(modid);
    load_gameobject_template_methods(modid);
    load_spell_info_methods(modid);
    load_areatrigger_methods(modid);
    load_auction_methods(modid);
    load_aura_methods(modid);
    load_spell_methods(modid);
    load_channel_methods(modid);
    load_corpse_methods(modid);
    load_packet_methods(modid);
    load_damage_metods(modid);
    load_group_methods(modid);
    load_guild_methods(modid);
    load_json_methods(modid);
    load_loot_methods(modid);
    load_mail_methods(modid);
    load_itemtemplate_methods(modid);
    load_mutablestring_methods(modid);
    load_mutable_methods(modid);
    load_position_methods(modid);
    load_quest_methods(modid);
    load_smartscript_methods(modid);
    load_outfit_methods(modid);
    load_object_methods(modid);
    load_world_object_methods(modid);
    load_unit_methods(modid);
    load_map_methods(modid);
    load_events(modid);
}

void TSLuaState::handle_error(sol::protected_function_result const& res)
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
        std::regex exp("([ \t]*)(.+?\\.lua):(\\d+):");
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
            SourceMap::SrcMapDoc doc(buffer.str());
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
    TS_LOG_ERROR("tswow.lua", what.c_str());
}

void TSLuaState::execute_module(std::string const& mod)
{
    execute_file(module_to_file(mod));
}

void TSLuaState::execute_file(std::filesystem::path const& file)
{
    if (alredy_errored)
    {
        return;
    }

    if (_modules.find(file) != _modules.end())
    {
        return;
    }
    _file_stack.push_back(file);
    sol::protected_function_result res;

    res = safe_script_file(file.string(), &sol::script_pass_on_error);
    if (!res.valid())
    {
        if (!alredy_errored)
        {
            handle_error(res);
        }
        alredy_errored = true;
        return;
    }

    _modules[file] = res.get_type() == sol::type::table
        ? res.get<sol::table>()
        : create_table();
    _file_stack.pop_back();
}

std::filesystem::path TSLuaState::module_to_file(std::string const& mod)
{
    std::string modConv = mod;
    std::replace(modConv.begin(), modConv.end(), '.', '/');
    return std::filesystem::absolute((_root_dir / std::filesystem::path(modConv + ".lua")));
}

sol::table TSLuaState::require(std::string const& mod)
{
    std::filesystem::path path = module_to_file(mod);
    std::string err_str;

    if (std::find(_file_stack.begin(), _file_stack.end(), path) != _file_stack.end())
    {
        throw std::runtime_error("circular dependency");
    }

    if (_modules.find(path) == _modules.end())
    {
        execute_file(path);
    }

    return _modules[path];
}

void TSLuaState::Load()
{
    for (auto const& [key,value]: states)
    {
        TSUnloadEventHandler(key);
    }
    states.clear();

#if AZEROTHCORE
    std::filesystem::path lua_path = std::filesystem::path(sConfigMgr->GetOption<std::string>("DataDir", "./")) / "lib" / "lua";
#elif TRINITY
    std::filesystem::path lua_path = std::filesystem::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "lib" / "lua";
#endif
    if (!std::filesystem::exists(lua_path))
    {
        TS_LOG_ERROR("tswow.lua", "No lua path");
        return;
    }
    for (auto const& entry : std::filesystem::directory_iterator(lua_path))
    {
        if (!entry.is_directory())
        {
            continue;
        }

        std::filesystem::path rootdir = entry.path();
        std::string modname = entry.path().filename().string();
        TSLuaState* state = &(states[rootdir.string()] = TSLuaState(rootdir));
        state->set_function("require", [=](std::string const& name) {
            return state->require(name);
        });

        TSEvents* events = TSLoadEventHandler(rootdir.string(), modname);
        uint32 modid = TSGetModID(rootdir.string());
        state->load_bindings(modid);

        (*state)["TSEvents"] = events;

        for (auto const& file : std::filesystem::recursive_directory_iterator(rootdir))
        {
            if (file.is_regular_file() && file.path().extension() == ".lua")
            {
                state->execute_file(file);
            }
        }
    }
}
