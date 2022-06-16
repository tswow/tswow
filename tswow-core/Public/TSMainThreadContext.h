#pragma once

#include "TSMain.h"
#include <memory>

class TSPlayer;
class TSMap;

class TC_GAME_API TSMainThreadContext {
public:
    TSMainThreadContext* operator->() { return this; }
    TSArray<TSPlayer> GetAllPlayers();
    TSPlayer GetPlayer(uint64_t guid);
    TSPlayer GetPlayer(TSString name);
    TSMap GetMap(uint32_t mapId, uint32_t instanceId = 0);
    void SendMail(uint8 senderType, uint64 from, uint64 to, TSString subject, TSString body, uint32 money, uint32 cod, uint32 delay, TSArray<TSItem> items);
private:
    TSPlayer LGetPlayer0(uint64_t guid);
    TSPlayer LGetPlayer1(std::string const& name);
    TSMap LGetMap0(uint32_t mapid, uint32_t instanceId);
    TSMap LGetMap1(uint32_t mapid);
    friend class TSLua;
};
