#include "TSMutex.h"
#include <mutex>

TSMutex::TSMutex() = default;

TSMutex::TSMutex(TSMutex const&)
{
    // Creates a new independent mutex - not a shared lock
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
