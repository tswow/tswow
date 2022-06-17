#include "TSPlayer.h"
#include "TSString.h"
#include "TSMap.h"
#include "TSMainThreadContext.h"
#if TRINITY
#include "MapManager.h"
#elif AZEROTHCORE
#include "MapMgr.h"
#endif
#include "Player.h"
#include "Map.h"
#include "Mail.h"
#include "Item.h"
#include "ObjectAccessor.h"

TSArray<TSPlayer> TSMainThreadContext::GetAllPlayers()
{
    TSArray<TSPlayer> tbl;
    std::shared_lock<std::shared_mutex> lock(*HashMapHolder<Player>::GetLock());

    HashMapHolder<Player>::MapType const& m = ObjectAccessor::GetPlayers();
    for (HashMapHolder<Player>::MapType::const_iterator itr = m.begin(); itr != m.end(); ++itr)
        tbl.push(TSPlayer(itr->second));
    return tbl;
}

TSPlayer TSMainThreadContext::GetPlayer(uint64_t guid)
{
    return TSPlayer(ObjectAccessor::FindPlayer(ObjectGuid(guid)));
}

TSPlayer TSMainThreadContext::GetPlayer(TSString name)
{
    return TSPlayer(ObjectAccessor::FindPlayerByName(name.c_str()));
}

TSMap TSMainThreadContext::GetMap(uint32_t mapId, uint32_t instanceId)
{
    return TSMap(sMapMgr->FindMap(mapId, instanceId));
}

TSPlayer TSMainThreadContext::LGetPlayer0(uint64_t guid)
{
    return GetPlayer(guid);
}

TSPlayer TSMainThreadContext::LGetPlayer1(std::string const& name)
{
    return GetPlayer(TSString(name));
}

TSMap TSMainThreadContext::LGetMap0(uint32_t mapid, uint32_t instanceId)
{
    return GetMap(mapid, instanceId);
}

TSMap TSMainThreadContext::LGetMap1(uint32_t mapid)
{
    return GetMap(mapid);
}

void TSMainThreadContext::SendMail(uint8 senderType, uint64 from, uint64 to, TSString subject, TSString body, uint32 money, uint32 cod, uint32 delay, TSArray<TSItem> items)
{
    auto player = ObjectAccessor::FindPlayer(ObjectGuid(to));
    MailSender sender(MailMessageType(senderType), from);
    MailDraft draft(subject.std_str(), body.std_str());
    draft.AddMoney(money);
    draft.AddCOD(cod);
    CharacterDatabaseTransaction trans = CharacterDatabase.BeginTransaction();

    for (int i = 0; i < items.get_length(); ++i)
    {
        auto item = items.get(i);
        item->item->SaveToDB(trans);
        draft.AddItem(item.item);
    }

#if TRINITY
    draft.SendMailTo(trans, MailReceiver(player, ObjectGuid(to)), sender, MAIL_CHECK_MASK_NONE, delay);
#elif AZEROTHCORE
    draft.SendMailTo(trans, MailReceiver(player, uint32(to)), sender, MAIL_CHECK_MASK_NONE, delay);
#endif
    CharacterDatabase.CommitTransaction(trans);
}

TSLua::Array<TSPlayer> TSMainThreadContext::LGetAllPlayers()
{
    return sol::as_table(GetAllPlayers());
}
