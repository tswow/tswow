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

LUA_FUNCTION(_LOG_DEBUG) {
#ifdef LUA_LOGGING
  LOG_DEBUG << ClientLua::GetString(L, 1);
#endif
  return 0;
}

LUA_FUNCTION(_LOG_INFO) {
#ifdef LUA_LOGGING
  LOG_INFO << ClientLua::GetString(L, 1);
#endif
  return 0;
}

LUA_FUNCTION(_LOG_WARN) {
#ifdef LUA_LOGGING
  LOG_WARN << ClientLua::GetString(L, 1);
#endif
  return 0;
}

LUA_FUNCTION(_LOG_ERROR) {
#ifdef LUA_LOGGING
  LOG_ERROR << ClientLua::GetString(L, 1);
#endif
  return 0;
}
