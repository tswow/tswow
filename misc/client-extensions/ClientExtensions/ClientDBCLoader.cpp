#include "ClientDBCLoader.h"

void ClientDBCLoader::RegisterDBCs(void* ptr) {
    LOG_INFO << "Registering base DBCs";
    // Aleist3r: for now, it only executes client function to load stock dbcs
    RegisterBase(ptr);
    return;
}
