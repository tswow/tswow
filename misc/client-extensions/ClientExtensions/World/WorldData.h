#pragma once

#include "SharedDefines.h"

class WorldDataExtension {
public:
    static void FillZoneLightData();
private:
    static void ParseLightDataForZone(C3Vector* vec);

    static std::vector<ZoneLightData> GlobalZoneLightData;
};
