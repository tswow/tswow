#include "windows.h"
#include "detours.h"
#include <vector>
#include "DetourRegistry.h"
#include "Logger.h"
#include "Arguments.h"

extern "C" {
	// The function we register in the exe to load this dll
	__declspec(dllexport) void ClientExtensionsDummy() {}
}

namespace ClientArguments {
	void initialize(std::string const& args);
}

BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved)
{
	if (fdwReason == DLL_PROCESS_ATTACH)
	{
		LOG_INFO << "Client starting up";
		ClientArguments::initialize(GetCommandLineA());
		DisableThreadLibraryCalls(hinstDLL);
		DetourTransactionBegin();
		DetourUpdateThread(GetCurrentThread());
		for (auto const& pair : registerDetours())
		{
			LOG_INFO << "Rerouting " << pair.first << " to " << pair.second;
			DetourAttach((PVOID*)pair.first, pair.second);
		}
		DetourTransactionCommit();
	}
	return TRUE;
}
