#include "windows.h"
#include "detours.h"
#include <vector>
#include "ClientDetours.h"
#include "Logger.h"
#include "Arguments.h"
#include "scripts.generated.h"

class Main
{
public:
	static void startup()
	{
		LOG_INFO << "Client starting up";
		ClientArguments::initialize(GetCommandLineA());
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
		// gets this from scripts.generated.ih
		__init_scripts();
		Main::startup();
	}
	return TRUE;
}
