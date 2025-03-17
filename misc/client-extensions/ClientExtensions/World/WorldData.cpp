#include "WorldData.h"
#include "CDBCMgr/CDBCDefs/ZoneLight.h"
#include "CDBCMgr/CDBCDefs/ZoneLightPoint.h"
#include "Logger.h"

void WorldDataExtensions::Apply() {
    Util::OverwriteUInt32AtAddress(0x781730, 0xFFFFFFFF);
    Util::OverwriteUInt32AtAddress(0x781751, reinterpret_cast<uint32_t>(&FindAndAddZoneLightEx) - 0x781755);

    FillZoneLightData();
}

void WorldDataExtensions::FillZoneLightData() {
    for (uint32_t i = 1; i <= 11; i++) {
        ZoneLightData data = { 0 };
        ZoneLightRow* row = GlobalCDBCMap.getRow<ZoneLightRow>("ZoneLight", i);
        std::vector<C2Vector> points = {};

        if (!row)
            continue;

        data.mapID = row->mapID;
        data.lightID = row->lightID;
        LOG_DEBUG << "mapID: " << row->mapID;
        LOG_DEBUG << "lightID: " << row->lightID;
        for (uint32_t j = 1; ; j++) {
            ZoneLightPointRow* tempRow = GlobalCDBCMap.getRow<ZoneLightPointRow>("ZoneLightPoint", j);
            C2Vector tempVec = { 0 };
            
            if (!tempRow)
                break;
            LOG_DEBUG << "ID: " << tempRow->ID;
            LOG_DEBUG << "zoneLightID: " << tempRow->zoneLightID;
            if (tempRow->zoneLightID < row->ID)
                continue;

            if (tempRow->zoneLightID > row->ID)
                break;

            tempVec.x = tempRow->positionX;
            tempVec.y = tempRow->positionY;
            LOG_DEBUG << "positionx: " << tempRow->positionX;
            LOG_DEBUG << "positionY: " << tempRow->positionY;
            points.push_back(tempVec);

            if (!j) {
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
