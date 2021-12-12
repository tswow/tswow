#include "Logger.h"
#include "FSRoot.h"
#include "lua.hpp"
#include "ClientLua.h"

#include <fstream>
#include <ctime>
#include <iomanip>
#include <windows.h>
#include <filesystem>

namespace {
  Logger logger;
}

Logger::Logger()
{
#if LOG_LEVEL > 0
  m_file.open("client.log",std::ios::out);
#endif
}

static bool isFirst = true;
Logger& log(const char* type, const char* file, size_t line)
{
#if LOG_LEVEL > 0
  auto t = std::time(nullptr);
  auto tm = *std::localtime(&t);

  std::string filename = relProjectPath(file);

  if (isFirst)
  {
    isFirst = false;
  }
  else
  {
    logger << "\n";
  }
  logger
    << "["
    << type
    << "]["
    << std::put_time(&tm, "%H:%M:%S")
    << "]["
    << relProjectPath(file)
    << ":"
    << line
    << "] ";
#endif
  return logger;
}

enum class LuaLoggingOpcode {
    LUA_DEBUG = 0,
    LUA_INFO  = 1,
    LUA_WARN  = 2,
    LUA_ERROR = 3,
};

LUA_FUNCTION(_LUA_LOG, (lua_State* L)) {
#ifdef LUA_LOGGING
    switch (LuaLoggingOpcode(ClientLua::GetNumber(L, 1))) {
    case LuaLoggingOpcode::LUA_DEBUG:
        LOG_DEBUG << ClientLua::GetString(L, 2);
        break;
    case LuaLoggingOpcode::LUA_INFO:
        LOG_INFO << ClientLua::GetString(L, 2);
        break;
    case LuaLoggingOpcode::LUA_WARN:
        LOG_WARN << ClientLua::GetString(L, 2);
        break;
    case LuaLoggingOpcode::LUA_ERROR:
        LOG_ERROR << ClientLua::GetString(L, 2);
        break;
    default:
        break;
    }
    return 0;
#endif
}
