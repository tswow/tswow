#include "TSWeather.h"
#include "TSMap.h"

#include "Weather.h"

TS_CLASS_DEFINITION(TSWeather, Weather, m_weather);

TSNumber<uint32> TSWeather::GetState()
{
    return static_cast<uint32>(m_weather->GetWeatherState());
}

TSNumber<uint32> TSWeather::GetType()
{
    return static_cast<uint32>(m_weather->m_type);
}

TSNumber<float> TSWeather::GetIntensity()
{
    return m_weather->m_intensity;
}

void TSWeather::SetWeather(uint32 type, float intensity, bool triggerScripts)
{
    m_weather->SetWeather(static_cast<WeatherType>(type), intensity, triggerScripts);
}

TSNumber<uint32> TSWeather::GetZone()
{
    return m_weather->GetZone();
}

TSNumber<uint32> TSWeather::GetScriptID()
{
    return m_weather->GetScriptId();
}

TSMap TSWeather::GetMap()
{
    return TSMap(m_weather->m_map);
}