#include "ClientLua.h"
#include "Logger.h"

CLIENT_LUA(luaping) {
    LOG_DEBUG << "Hi from lua ping";
    return 0;
}
