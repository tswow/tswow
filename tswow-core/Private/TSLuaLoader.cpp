#include "TSEventLoader.h"
#include "TSLuaLoader.h"
#include "TSEvents.h"
#include "TSObject.h"
#include "TSWorldObject.h"
#include "TSUnit.h"
#include "TSCreature.h"
#include "TSGameObject.h"
#include "TSPlayer.h"
#include "TSItem.h"
#include "TSMap.h"
#include "TSBattleground.h"
#include "TSAchievementTemplate.h"
#include "TSCreatureTemplate.h"
#include "TSGameObjectTemplate.h"
#include "TSSpellInfo.h"
#include "TSAreaTrigger.h"
#include "TSAuction.h"
#include "TSAura.h"
#include "TSSpell.h"
#include "TSChannel.h"
#include "TSCorpse.h"
#include "TSDamageInfo.h"
#include "TSFileSystem.h"
#include "TSGroup.h"
#include "TSGuild.h"
#include "TSJson.h"
#include "TSLoot.h"
#include "TSMail.h"
#include "TSMutableString.h"
#include "TSPosition.h"
#include "TSQuest.h"
#include "TSSmartScript.h"
#include "TSOutfit.h"
#include "TSCustomPacket.h"
#include "Config.h"

#include <regex>
#include "document.hpp"
#include <fstream>

LuaState::LuaState(std::filesystem::path rootDir)
    : _root_dir(rootDir)
{
    open_libraries(sol::lib::base, sol::lib::table, sol::lib::string);
    load_events();
    load_methods();
}

std::string LuaState::format_error(std::string what)
{
    // Make relative paths
    {
        size_t index = 0;
        while (true)
        {
            index = what.find(_root_dir.string(), index);
            if (index == std::string::npos) break;
            what.replace(index, _root_dir.string().size() + 1, "");
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
            std::filesystem::path map = this->_root_dir / (match.filename + ".map");
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
    return what;
}

void LuaState::execute_module(std::string const& mod)
{
    execute_file(module_to_file(mod));
}

void LuaState::execute_file(std::filesystem::path const& file)
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
        sol::error err = res;
        std::string what = err.what();
        if (!alredy_errored)
        {
            TC_LOG_ERROR("tswow.lua", "%s",what);
        }
        alredy_errored = true;
        return;
    }

    _modules[file] = res.get_type() == sol::type::table
        ? res.get<sol::table>()
        : create_table();
    _file_stack.pop_back();
}

std::filesystem::path LuaState::module_to_file(std::string const& mod)
{
    std::string modConv = mod;
    std::replace(modConv.begin(), modConv.end(), '.', '/');
    return std::filesystem::absolute((_root_dir / std::filesystem::path(modConv + ".lua")));
}

sol::table LuaState::require(std::string const& mod)
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

static std::map<std::string, LuaState> states;
void LoadLua()
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
        TC_LOG_ERROR("tswow.lua", "No lua path");
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
        LuaState* state = &(states[rootdir.string()] = LuaState(rootdir));
        state->set_function("require", [=](std::string const& name) {
            return state->require(name);
        });

        TSEvents* events = TSLoadEventHandler(rootdir.string(), modname);
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
