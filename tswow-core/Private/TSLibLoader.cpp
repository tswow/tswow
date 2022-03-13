#include "TSLibLoader.h"

#include "TSEventLoader.h"
#include "Config.h"

#include <string>
#include <map>
#include <iostream>
#include <boost/filesystem.hpp>
#include <iostream>
#include <thread>

namespace fs = boost::filesystem;
typedef void (*LibFuncPtr)(TSEvents*);

#if defined(WIN32) || defined (_WIN32) || defined(__WIN32)
    #include <windows.h>
    #define DL_PTR HINSTANCE
    #define DL_FN GetProcAddress
    #define DL_LOAD LoadLibrary
    #define DL_CLOSE FreeLibrary
    #define DL_EXT ".dll"
#else
    #include <dlfcn.h>
    #define DL_PTR void*
    #define DL_FN dlsym
    // TODO: fix
    #define DL_LOAD(x) dlopen(x,RTLD_LAZY)
    #define DL_CLOSE dlclose
    #define DL_EXT ".so"
#endif

class TSEvents;
struct TSLibrary
{
    time_t lastWriteTime;
    DL_PTR handle;
    std::string modName;
};

static std::map<fs::path, TSLibrary> libraries;
static std::string buildType;

void SetBinPath(std::string const& path)
{
    buildType = fs::path(path).parent_path().filename().string();
}

void UpdateTSLibraries(bool forceReload)
{
#if AZEROTHCORE
    fs::path libPath = fs::path(sConfigMgr->GetOption<std::string>("DataDir", "./")) / "lib" / buildType;
#elif TRINITY
    fs::path libPath = fs::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "lib" / buildType;
#endif
    TS_LOG_INFO("tswow.livescripts", "Reloading livescripts");

    // Unload libraries
    for (auto itr = libraries.begin(); itr != libraries.end();)
    {
        if (!fs::exists(itr->first) || forceReload)
        {
            TSUnloadEventHandler(itr->second.modName);
            DL_CLOSE(itr->second.handle);

            fs::current_path() / "lib" / buildType / itr->first;
            TS_LOG_INFO("tswow.livescripts", "Unloading library %s",itr->first.string());
            itr = libraries.erase(itr);
        }
        else
        {
            ++itr;
        }
    }

    if (!fs::exists(libPath)) return;

    // Load libraries
    for (auto const& entry: fs::directory_iterator(libPath))
    {
        fs::path file = entry.path();
        if (file.extension().string() != DL_EXT || file.filename().string().find(".load.")!=std::string::npos)
        {
            continue;
        }

        time_t time = fs::last_write_time(file);

        auto itr = libraries.find(file);
        if (itr != libraries.end())
        {
            if (time == itr->second.lastWriteTime && !forceReload)
            {
                continue;
            }
            TSUnloadEventHandler(itr->second.modName);
            DL_CLOSE(itr->second.handle);
            libraries.erase(file);
        }

        std::string modName = file.filename().string();
        modName = modName.substr(0, modName.find_last_of("."));

        fs::path realmLibDir = fs::current_path() / "lib" / buildType;
        fs::path pdbPathIn = file.parent_path() / (modName + ".pdb");
        fs::path libPathOut = realmLibDir / (modName + DL_EXT);
        fs::path pdbPathOut = realmLibDir / (modName + ".pdb");

        if (!fs::exists(realmLibDir)) fs::create_directories(realmLibDir);
        if (fs::exists(libPathOut)) fs::remove(libPathOut);
        if (fs::exists(pdbPathOut)) fs::remove(pdbPathOut);
        fs::copy(file, libPathOut);
        if (fs::exists(pdbPathIn)) fs::copy(pdbPathIn, pdbPathOut);

        TSEvents* events = TSLoadEventHandler(file,modName);
        DL_PTR dll = DL_LOAD(libPathOut.string().c_str());
        LibFuncPtr ptr = (LibFuncPtr)DL_FN(dll, "AddTSScripts");
        libraries[file] = {time,dll,modName};
        if (!ptr)
        {
            TS_LOG_ERROR("tswow.livescripts", "Could not find main function for library %s",modName);
            continue;
        }
        TS_LOG_INFO("tswow.livescripts", "Loaded livescript %s", modName);
        ptr(events);
    }
}