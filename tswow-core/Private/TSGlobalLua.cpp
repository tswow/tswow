#include "TSLua.h"
#include "TSGlobal.h"

void TSLua::load_global_functions(sol::state& state)
{
    state.set_function("SendWorldMessage", SendWorldMessage);
    state.set_function("GetCurrTime", GetCurrTime);
    state.set_function("GetUnixTime", GetUnixTime);
    state.set_function("SyncHttpGet", SyncHttpGet);
    state.set_function("IsGameEventActive", IsGameEventActive);
    state.set_function("IsHolidayActive", IsHolidayActive);
    state.set_function("IsHolidayActive", IsHolidayActive);
    state.set_function("StartGameEvent", StartGameEvent);
    state.set_function("StopGameEvent", StopGameEvent);
    state.set_function("GetActiveGameEvents", LGetActiveGameEvents);
    state.set_function("HAS_TAG", L_HAS_TAG);
    state.safe_script("function CreateArray(v) return v end");
    state.safe_script("function CreateDictionary(v) return v end");
}