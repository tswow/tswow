#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <sstream>
#include <regex>

namespace fs = std::filesystem;

#define INIT_SCRIPTS_NAME "__init_scripts"

struct Registry {
    std::string m_name;
    std::string m_macroIdentifier;
    std::string m_suffix;
    std::vector<std::string> m_values;
};

std::vector<Registry> registries = {
        // do NOT change this without also refactoring the macro in ClientDetours.h
      { "CLIENT_DETOUR" ,"__detour_name" ,"__Result" }

        // do NOT change this without also refactoring the macro in ClientLua.h
    , { "LUA_FUNCTION" , "__lua_function_name", "__Result" }
};

std::vector<std::string> cppSourceFiles = {
    ".c", ".cc", ".cpp", ".cxx", ".cp", ".c++"
};

static bool endsWith(const std::string& str, const std::string& suffix)
{
    return str.size() >= suffix.size() && 0 == str.compare(str.size() - suffix.size(), suffix.size(), suffix);
}

int main()
{
    std::vector<std::string> luaFiles;

    for (auto& p : fs::recursive_directory_iterator(fs::current_path()))
    {
        std::string path = p.path().string();
        auto itr = std::find_if(cppSourceFiles.begin(), cppSourceFiles.end(), [&path](auto cur) {
            return endsWith(path, cur);
        });

        // Generate cpp scripts
        if (itr != cppSourceFiles.end())
        {
            std::string sourceFile = (std::stringstream() << std::ifstream(path).rdbuf()).str();

            for (Registry& reg : registries)
            {
                std::string::const_iterator search(sourceFile.cbegin());
                std::regex exp(reg.m_name + "\\s*\\( *(.+?)\\s*,");
                std::smatch res;
                while (std::regex_search(search, sourceFile.cend(), res, exp))
                {
                    std::string r1 = res[1];
                    if (r1.compare(reg.m_macroIdentifier))
                    {
                        reg.m_values.push_back(r1 + reg.m_suffix);
                    }
                    search = res.suffix().first;
                }
            }
        }

        // Generate lua scripts
        if (endsWith(path, ".lua"))
        {
            luaFiles.push_back(path);
            std::ifstream luafile = std::ifstream(path);
        }
    }

    std::sort(luaFiles.begin(), luaFiles.end(), [](auto const& a, auto const& b) {
        size_t aDirs = std::count(
                a.begin()
            , a.end(), '\\') + std::count(a.begin(), a.end(), '/'
            );
        size_t bDirs = std::count(
                b.begin()
            , b.end(), '\\') + std::count(b.begin(), b.end(), '/'
            );
        return (aDirs != bDirs) ? aDirs < bDirs : a < b;
    });

    std::ofstream luafilesGenerated("luafiles.generated.h");
    luafilesGenerated << "#include <vector>\n";
    luafilesGenerated << "std::vector<std::pair<std::string,std::string>> LUA_FILES = {\n";
    for (std::string const& path : luaFiles)
    {
        std::ifstream luafile = std::ifstream(path);
        luafilesGenerated << "    {\"";
        auto relPath = std::filesystem::relative
            (path,std::filesystem::path(__FILE__).parent_path()).string();
        for (char c : relPath)
        {
            if (c == '\\')
            {
                luafilesGenerated << "\\\\";
            }
            else
            {
                luafilesGenerated << c;
            }
        }
        luafilesGenerated << "\", {";

        char byte;
        while (luafile.get(byte))
        {
            luafilesGenerated << "0x" << std::hex << uint32_t(byte) << ",";
        }
        luafilesGenerated << "}},\n";
    }
    luafilesGenerated << "};";

    // Generate scripts header
    std::ofstream scriptsGenerated("scripts.generated.h");
    scriptsGenerated << "#include <iostream>\n";
    for (Registry const& reg : registries)
    {
        for (std::string const& id : reg.m_values)
        {
            scriptsGenerated << "extern int " << id << ";\n";
        }
    }

    // there's likely a better way to force the compiler to not optimize this,
    // but this should be very safe.
    scriptsGenerated << "inline void " INIT_SCRIPTS_NAME "()\n{\n";
    for (Registry const& reg : registries)
    {
        if (reg.m_values.size() == 0) continue;
        scriptsGenerated << "    std::cout << \" Generated \" << (";

        for (size_t i = 0; i < reg.m_values.size(); ++i)
        {
                scriptsGenerated << reg.m_values[i];
                if (i < reg.m_values.size() - 1)
                {
                    scriptsGenerated << " + ";
                }
        }
        scriptsGenerated << ") << \"" << reg.m_name << "s\\n\";\n";
    }
    scriptsGenerated << "}";
    return 0;
}