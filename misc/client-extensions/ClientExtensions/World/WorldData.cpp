#include "WorldData.h"
#include "CDBCMgr/CDBCDefs/ZoneLight.h"
#include "CDBCMgr/CDBCDefs/ZoneLightPoint.h"
#include "Logger.h"

void WorldDataExtensions::Apply() {
    // calls nullsub_3 instead of original function
    Util::OverwriteUInt32AtAddress(0x781426, 0xFFE6D746);
    // sets the check for map id to > -1 so it's always true unless no map is loaded
    Util::OverwriteUInt32AtAddress(0x781730, 0xFFFFFFFF);
    Util::OverwriteUInt32AtAddress(0x781751, reinterpret_cast<uint32_t>(&FindAndAddZoneLightEx) - 0x781755);
    // calls nullsub_3 instead of original function
    Util::OverwriteUInt32AtAddress(0x9E0360, 0x5EEB70);
    
    FillZoneLightData();
}

void WorldDataExtensions::FillZoneLightData() {
    int32_t zoneLightMin = GlobalCDBCMap.getIndexRange("ZoneLight").first;
    int32_t zoneLightMax = GlobalCDBCMap.getIndexRange("ZoneLight").second;
    int32_t zoneLightPointMin = GlobalCDBCMap.getIndexRange("ZoneLightPoint").first;
    int32_t zoneLightPointMax = GlobalCDBCMap.getIndexRange("ZoneLightPoint").second;
    uint32_t counter = 1;

    for (uint32_t i = zoneLightMin; i <= zoneLightMax; i++) {
        ZoneLightData data = { 0 };
        ZoneLightRow* row = GlobalCDBCMap.getRow<ZoneLightRow>("ZoneLight", i);
        std::vector<C2Vector> points = {};

        if (!row)
            continue;

        data.mapID = row->mapID;
        data.lightID = row->lightID;

        for (uint32_t j = counter; j <= zoneLightPointMax; j++) {
            ZoneLightPointRow* tempRow = GlobalCDBCMap.getRow<ZoneLightPointRow>("ZoneLightPoint", j);
            C2Vector tempVec = { 0 };

            counter++;

            if (!tempRow || tempRow->zoneLightID < row->ID)
                continue;

            if (tempRow->zoneLightID > row->ID)
                break;

            tempVec.x = tempRow->positionX;
            tempVec.y = tempRow->positionY;

            points.push_back(tempVec);

            if (j == zoneLightPointMin) {
                data.minX, data.maxX = tempVec.x;
                data.maxY, data.maxY = tempVec.y;
            }

            if (data.minX > tempVec.x)
                data.minX = tempVec.x;

            if (data.minY > tempVec.y)
                data.minY = tempVec.y;

            if (data.maxX < tempVec.x)
                data.maxX = tempVec.x;

            if (data.maxY < tempVec.y)
                data.maxY = tempVec.y;
        }

        if (points.size()) {
            data.pointData = malloc(points.size()*sizeof(C2Vector));
            // Aleist3r: it throws 6387 but it can't be 0 if points.size() is not 0, smh stupid VS
            #pragma warning(suppress : 6387)
            memcpy(data.pointData, &points[0], sizeof(C2Vector) * points.size());
            data.pointNum = points.size();
        }

        data.minX -= 50.f;
        data.minY -= 50.f;
        data.maxX += 50.f;
        data.maxY += 50.f;

        GlobalZoneLightData.push_back(data);
    }
}

void WorldDataExtensions::FindAndAddZoneLightEx(C3Vector* vec) {
    ZoneLightData data = { 0 };
    void* g_dnInfo = DNInfo::GetDNInfoPtr();
    int32_t currentMap = *reinterpret_cast<int32_t*>(0xADFBC4);
    C2Vector vec2d = { 0 };

    if (!GlobalZoneLightData.size())
        return;

    vec2d.x = -(vec->y - 17066.666);
    vec2d.y = -(vec->x - 17066.666);

    for (uint32_t i = 0; i < GlobalZoneLightData.size(); i++) {
        data = GlobalZoneLightData[i];

        if (!data.mapID)
            break;

        if (data.mapID == currentMap && data.minX <= vec2d.x && data.minY <= vec2d.y && data.maxX >= vec2d.x && data.maxY >= vec2d.y)
        {
            float temp = 0.f;
            bool isWithin = NTempest::DistanceSquaredFromEdge(data.pointNum, data.pointData, &vec2d, &temp);

            if (isWithin)
                temp = -temp;

            temp -= 50.f;
            isWithin = temp < 0.f;

            if (temp < 0.f)
                temp = -temp;

            if (isWithin) {
                DNInfo::AddZoneLight(g_dnInfo, data.lightID, temp);
                break;
            }
        }
    }
}
