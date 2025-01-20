#include "windows.h"
#include "detours.h"
#include <vector>
#include "ClientDetours.h"
#include "Logger.h"
#include "ClientArguments.h"
#include "ClientNetwork.h"
#include "ClientExtensions.h"
#include "scripts.generated.h"

class Main
{
public:
    static void startup()
    {
        LOG_INFO << "Client starting up";
        // gets this from scripts.generated.ih
        __init_scripts();
        ClientNetwork::initialize();
        ClientArguments::initialize(GetCommandLineA());
        ClientExtensions::initialize();
        ClientDetours::Apply();
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
        DisableThreadLibraryCalls(hinstDLL);
        Main::startup();
    }
    return TRUE;
}
