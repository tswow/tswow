#include "TSTimer.h"
#include "GameTime.h"

#include <chrono>

TSNumber<uint64> now()
{
    return GameTime::GetGameTime();
}

TSNumber<uint64> GetNextResetTime() {
    return sWorld->GetNextWeeklyResetTime(GameTime::GetGameTime());
}