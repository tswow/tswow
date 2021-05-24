#pragma once

#include "TSMain.h"
#include <mutex>

class TC_GAME_API TSMutex {
    std::mutex _lock;
public:
    TSMutex* operator->(){return this;}
    void lock();
    void unlock();
    bool try_lock();
};