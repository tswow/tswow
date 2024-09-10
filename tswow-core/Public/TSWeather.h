#pragma once

#include "TSNumber.h"
#include "TSMain.h"

class Weather;
class TSMap;

class TC_GAME_API TSWeather
{
    TS_CLASS_DECLARATION(TSWeather, Weather, m_weather);

    TSNumber<uint32> GetState();
    TSNumber<uint32> GetType();
    TSNumber<float> GetIntensity();
    void SetWeather(uint32 type, float intensity, bool triggerScripts = true);
    TSNumber<uint32> GetZone();
    TSNumber<uint32> GetScriptID();
    TSMap GetMap();
};