#include "windows.h"
#include "detours.h"
#include <vector>
#include "ClientDetours.h"
#include "Logger.h"
#include "ClientArguments.h"
#include "ClientNetwork.h"
#include "scripts.generated.h"

class Main
{
public:
    static void startup()
    {
        LOG_INFO << "Client starting up";
        // gets this from scripts.generated.ih
        __init_scripts();
        LOG_INFO << "Client init scripts";
        ClientNetwork::initialize();
        LOG_INFO << "Client network initialized";
        //some people get windows crashes, idk
        ClientArguments::initialize();
        LOG_INFO << "Client arguments initialized";
        ClientDetours::Apply();
        LOG_INFO << "Client detours applied";
    }
};

extern "C" {
    // The function we register in the exe to load this dll
    __declspec(dllexport) void ClientExtensionsDummy() {}
}

BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved)
{
    if (fdwReason == DLL_PROCESS_ATTACH)
    {
        LOG_INFO << "Attach";
        DisableThreadLibraryCalls(hinstDLL);
        LOG_INFO << "Pass DisableThreadLibraryCalls";
        CreateThread(nullptr, 0, [](LPVOID) -> DWORD {
            LOG_INFO << "Thread Made";
            Main::startup();
            LOG_INFO << "Main Done";
            return 0;
        }, nullptr, 0, nullptr);
    }
    return TRUE;
}
