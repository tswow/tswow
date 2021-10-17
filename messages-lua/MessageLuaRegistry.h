#pragma once

#include <functional>

extern "C" {
	#include "lua.h"
}

// Takes callback because client / test lib uses different methods
void RegisterMessages(std::function<void(const char*, lua_CFunction)> callback);
void RegisterMessagePolyfill(std::function<void(const char*)> callback);
