#include <fstream>
#include <ctime>
#include <iomanip>
#include "logger.h"
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

  std::string filename = std::filesystem::path(std::string(file)).filename().string();

  if (isFirst)
  {
    isFirst = false;
  }
  else
  {
    logger << "\n";
  }
  logger << "[" << type << "][" << std::put_time(&tm, "%H:%M:%S") << "][" << filename << ":" << line << "] ";
#endif
  return logger;
}
