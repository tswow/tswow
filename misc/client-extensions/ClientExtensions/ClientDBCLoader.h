#pragma once

#include "ClientDetours.h"
#include "Logger.h"

#include <functional>

CLIENT_FUNCTION(RegisterBase, 0x6337D0, __cdecl, void, (void* ptr))

class ClientDBCLoader {
public:
	static void RegisterDBCs(void* ptr);
};
