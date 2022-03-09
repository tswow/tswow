#include "TSPlayer.h"
#include "TSString.h"
#include "TSMap.h"
#include "TSMapManager.h"
#if TRINITY
#include "MapManager.h"
#elif AZEROTHCORE
#include "MapMgr.h"
#endif
#include "Player.h"
#include "Map.h"
#include "ObjectAccessor.h"

TSPlayer TSMapManager::GetPlayer(uint64_t guid)
{
    return TSPlayer(ObjectAccessor::FindPlayer(ObjectGuid(guid)));
}

TSPlayer TSMapManager::GetPlayer(TSString name)
{
    return TSPlayer(ObjectAccessor::FindPlayerByName(name.c_str()));
}

TSMap TSMapManager::GetMap(uint32_t mapId, uint32_t instanceId)
{
    return TSMap(sMapMgr->FindMap(mapId, instanceId));
}
