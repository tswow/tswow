#pragma once

#include "TSMain.h"
#include <mutex>

class TC_GAME_API TSMutex {
    std::mutex _lock;
public:
    TSMutex();
    // Custom copy constructor creates new independent mutex
    // Note: This is required for TSWorldEntity in Battlegrounds
    // We might want to consider using shared_ptr<mutex> if shared locking is needed
    TSMutex(TSMutex const&);
    TSMutex* operator->(){return this;}
    void lock();
    void unlock();
    bool try_lock();
    std::string stringify(int indention = 0) { return "TSMutex"; };
};

#define CreateMutexLock TSMutex
#define CreateMutex TSMutex
