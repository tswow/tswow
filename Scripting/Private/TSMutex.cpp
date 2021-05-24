#include "TSMutex.h"
#include <mutex>

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