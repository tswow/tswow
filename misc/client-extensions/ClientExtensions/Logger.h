#pragma once
#include <fstream>

class Logger {
private:
  std::ofstream m_file;
public:
  Logger();

  template <typename T>
  Logger& operator<<(T const& obj)
  {
#if LOG_LEVEL > 0
    m_file << obj;
    m_file.flush();
#endif
    return *this;
  }
};

Logger& log(const char* chr, const char* file, size_t line);

#if LOG_LEVEL >= 4
#define LOG_DEBUG log("DEBUG", __FILE__, __LINE__)
#else
#define LOG_DEBUG if(false) log("DEBUG", 0,0)
#endif

#if LOG_LEVEL >= 3
#define LOG_INFO log("INFO", __FILE__, __LINE__)
#else
#define LOG_INFO if(false) log("INFO", 0,0)
#endif

#if LOG_LEVEL >= 2
#define LOG_WARN log("WARN", __FILE__, __LINE__)
#else
#define LOG_WARN if(false) log("WARN", 0,0)
#endif

#if LOG_LEVEL >= 1
#define LOG_ERROR log("ERROR", __FILE__, __LINE__)
#else
#define LOG_ERROR if(false) log("ERROR", 0,0)
#endif
