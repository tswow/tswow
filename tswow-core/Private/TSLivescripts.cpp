#include "TSLivescripts.h"

#include "Config.h"

#include <boost/filesystem.hpp>

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

struct TSLibrary
{
    time_t lastWriteTime;
    DL_PTR handle;
    std::string modName;
};

static std::map<fs::path, TSLibrary> libraries;

void TSLivescripts::Load()
{
#if AZEROTHCORE
    fs::path libPath = fs::path(sConfigMgr->GetOption<std::string>("DataDir", "./")) / "lib" / LIVESCRIPT_BUILD_TYPE;
#elif TRINITY
    fs::path libPath = fs::path(sConfigMgr->GetStringDefault("DataDir", "./")) / "lib" / LIVESCRIPT_BUILD_TYPE;
#endif
    // Unload libraries
    for(auto & [path,lib] : libraries)
    {
        DL_CLOSE(lib.handle);
        TS_LOG_INFO("tswow.livescripts", "Unloading library %s", path.string().c_str());
    }
    libraries.clear();

    if (!fs::exists(libPath)) return;

    // Load libraries
    for (auto const& entry : fs::directory_iterator(libPath))
    {
        fs::path file = entry.path();
        if (file.extension().string() != DL_EXT || file.filename().string().find(".load.") != std::string::npos)
        {
            continue;
        }

        time_t time = fs::last_write_time(file);
        std::string modName = file.filename().string();
        modName = modName.substr(0, modName.find_last_of("."));

        fs::path realmLibDir = fs::current_path() / "lib" / LIVESCRIPT_BUILD_TYPE;
        fs::path pdbPathIn = file.parent_path() / (modName + ".pdb");
        fs::path libPathOut = realmLibDir / (modName + DL_EXT);
        fs::path pdbPathOut = realmLibDir / (modName + ".pdb");

        if (!fs::exists(realmLibDir)) fs::create_directories(realmLibDir);
        if (fs::exists(libPathOut)) fs::remove(libPathOut);
        if (fs::exists(pdbPathOut)) fs::remove(pdbPathOut);
        fs::copy(file, libPathOut);
        if (fs::exists(pdbPathIn)) fs::copy(pdbPathIn, pdbPathOut);
        DL_PTR dll = DL_LOAD(libPathOut.string().c_str());
        LibFuncPtr ptr = (LibFuncPtr)DL_FN(dll, "AddTSScripts");
        libraries[file] = { time,dll,modName };
        if (!ptr)
        {
            TS_LOG_ERROR("tswow.livescripts", "Could not find main function for library %s", modName.c_str());
            continue;
        }
        TS_LOG_INFO("tswow.livescripts", "Loaded livescript %s", modName.c_str());
        ptr(&ts_events);
    }
}
