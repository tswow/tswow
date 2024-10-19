#include "TSTimer.h"
#include "GameTime.h"

#include <chrono>

TSNumber<uint64> now()
{
    return std::chrono::duration_cast<std::chrono::milliseconds>
        (std::chrono::high_resolution_clock::now().time_since_epoch()).count();
}

TSNumber<uint64> GetGameTime()
{
    return GameTime::GetGameTime();
}

TSNumber<uint64> GetNextResetTime() {
    return sWorld->GetNextWeeklyResetTime(GameTime::GetGameTime());
}