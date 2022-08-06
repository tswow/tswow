#pragma once

#include "TSMain.h"
#include "TSLua.h"
#include <memory>

class TSPlayer;
class TSMap;

class TC_GAME_API TSMainThreadContext {
public:
    TSMainThreadContext* operator->() { return this; }
    TSArray<TSPlayer> GetAllPlayers();
    TSPlayer GetPlayer(uint64_t guid);
    TSPlayer GetPlayer(std::string const& name);
    TSMap GetMap(uint32_t mapId, uint32_t instanceId = 0);
    void SendMail(uint8 senderType, uint64 from, uint64 to, std::string const& subject, std::string const& body, uint32 money, uint32 cod, uint32 delay, TSArray<TSItem> items);
private:
    TSLua::Array<TSPlayer> LGetAllPlayers();
    friend class TSLua;
};
