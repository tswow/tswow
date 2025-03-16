#include "WorldData.h"
#include "CDBCMgr/CDBCDefs/ZoneLight.h"
#include "CDBCMgr/CDBCDefs/ZoneLightPoint.h"

void WorldDataExtension::FillZoneLightData() {
    for (uint32_t i = ZoneLight().GetMinIndex(); i <= ZoneLight().GetMaxIndex(); i++) {
        ZoneLightData data = { 0 };
        ZoneLightRow* row = GlobalCDBCMap.getRow<ZoneLightRow>("ZoneLight", i);
        std::vector<C2Vector> points = {};

        if (!row)
            continue;

        data.mapID = row->mapID;
        data.lightID = row->lightID;

        for (uint32_t j = 0; ; j++) {
            ZoneLightPointRow* tempRow = GlobalCDBCMap.getRow<ZoneLightPointRow>("ZoneLightPoint", j);
            C2Vector tempVec = { 0 };

            if (!tempRow)
                break;

            if (tempRow->zoneLightID < row->ID)
                continue;

            if (tempRow->zoneLightID > row->ID)
                break;

            tempVec.x = tempRow->positionX;
            tempVec.y = tempRow->positionY;

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

void WorldDataExtension::ParseLightDataForZone(C3Vector* vec) {

}
