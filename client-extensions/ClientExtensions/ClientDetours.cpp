#include "ClientDetours.h"
#include "Logger.h"
#include "FSRoot.h"

#include "windows.h"
#include "detours.h"

#include <vector>

std::vector<ClientDetours::Detour> & detours()
{
    static std::vector<ClientDetours::Detour> _detours;
    return _detours;
}

int ClientDetours::Add(
      std::string const& name
    , void* clientFun
    , void* yourFun
    , std::string const& filename
    , size_t lineno
) {
    detours().push_back({
            name
        , clientFun
        , yourFun
        , filename
        , lineno
        });
    return 0;
}

void ClientDetours::Apply()
{
    DetourTransactionBegin();
    DetourUpdateThread(GetCurrentThread());
    for (Detour const& detour : detours())
    {
        LOG_INFO
            << "Detour: "
            << detour.m_name
            << "@"
            << detour.m_oldFn
            << " -> "
            << relProjectPath(detour.m_filename)
            << ":"
            << detour.m_lineno
            ;
        DetourAttach((PVOID*)detour.m_oldFn, detour.m_newFn);
    }
    detours().clear();
    DetourTransactionCommit();
}
