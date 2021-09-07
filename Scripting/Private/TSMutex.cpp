#include "TSMutex.h"
#include <mutex>

TSMutex::TSMutex() = default;

// Note: for TSWorldEntity in Battlegrounds
TSMutex::TSMutex(TSMutex const&)
{
}

void TSMutex::lock()
{
    _lock.lock();
}

void TSMutex::unlock()
{
    _lock.unlock();
}

bool TSMutex::try_lock()
{
    return _lock.try_lock();
}
