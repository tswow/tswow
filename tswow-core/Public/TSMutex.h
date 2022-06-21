#pragma once

#include "TSMain.h"
#include <mutex>

class TC_GAME_API TSMutex {
    std::mutex _lock;
public:
    TSMutex();
    TSMutex(TSMutex const&);
    TSMutex* operator->(){return this;}
    void lock();
    void unlock();
    bool try_lock();
};

#define CreateMutexLock TSMutex