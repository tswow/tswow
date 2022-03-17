#pragma once

#include "TSMain.h"

#include <sol/sol.hpp>

#include <map>
#include <vector>
#include <filesystem>

class LuaState : public sol::state
{
    std::map<std::filesystem::path, sol::table> _modules;
    std::vector<std::filesystem::path> _file_stack;
    std::filesystem::path _root_dir;
    bool alredy_errored = false;

    void load_events();
    void load_methods();
public:
    LuaState(std::filesystem::path rootDir);
    LuaState() = default;
    std::string format_error(std::string what);
    void execute_file(std::filesystem::path const& file);
    void execute_module(std::string const& mod);
    std::filesystem::path module_to_file(std::string const& mod);
    sol::table require(std::string const& mod);
};

void TC_GAME_API LoadLua();
