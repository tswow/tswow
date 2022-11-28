/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#include "TSLua.h"
#include "TSExtraTooltip.h"
#include "TSEvents.h"
#include "TSMutable.h"
#include "TSPlayer.h"
#include "TSVehicle.h"
#include "TSUnit.h"
#include "TSSpell.h"
#include "TSCreature.h"
#include "TSQuest.h"
#include "TSItem.h"
#include "TSMutableString.h"
#include "TSItemTemplate.h"
#include "TSMainThreadContext.h"
#include "TSSpellInfo.h"
#include "TSGroup.h"
#include "TSGuild.h"

#include "ItemTemplate.h"
#include "QuestDef.h"
#include "Group.h"
#include "Guild.h"
#include "SpellMgr.h"
#include "SpellInfo.h"
#include "TSChannel.h"
#include "DBCStores.h"
#include "ScriptMgr.h"
#include "ObjectMgr.h"
#include "Player.h"
#if TRINITY
#include "MapManager.h"
#elif AZEROTHCORE
#include "MapMgr.h"
#endif
#include "Config.h"
#include "BattlegroundMgr.h"

class TSServerScript : public ServerScript
{
public:
    TSServerScript() : ServerScript("TSServerScript"){}
};

class TSWorldScript : public WorldScript
{
public:
    TSWorldScript() : WorldScript("TSWorldScript"){}
    void OnOpenStateChange(bool open) FIRE(World,OnOpenStateChange,open)
    void OnConfigLoad(bool reload) FIRE(World,OnConfigLoad,reload)
    void OnStartup() FIRE(World,OnStartup)
    void OnShutdown() FIRE(World,OnShutdown)
    void OnShutdownCancel() FIRE(World,OnShutdownCancel)
    void OnMotdChange(std::string& newMotd) FIRE(World,OnMotdChange,newMotd)
    void OnShutdownInitiate(ShutdownExitCode code,ShutdownMask mask) FIRE(World,OnShutdownInitiate,code,mask)
    void OnUpdate(uint32 diff) FIRE(World,OnUpdate,diff, TSMainThreadContext())
};

class TSUnitScript : public UnitScript
{
public:
    TSUnitScript() : UnitScript("TSUnitScript"){}
    void OnHeal(Unit* healer, Unit* reciever, uint32& gain) {
        FIRE(Unit,OnCalcHeal
            , TSUnit(healer)
            , TSUnit(reciever)
            , TSMutableNumber<uint32>(&gain)
        );
    }
};

class TSAreaTriggerScript : public AreaTriggerScript
{
public:
    TSAreaTriggerScript() : AreaTriggerScript("TSAreaTriggerScript"){}
    //bool OnTrigger(Player* player,AreaTriggerEntry const* trigger) FIRE_RETURN(AreaTriggerOnTrigger,bool,false,TSPlayer(player),trigger)
};

class TSWeatherScript : public WeatherScript
{
public:
    TSWeatherScript() : WeatherScript("TSWeatherScript"){}
    //void OnChange(Weather* weather,WeatherState state,float grade) FIRE(WeatherOnChange,weather,state,grade)
};

class TSAuctionHouseScript : public AuctionHouseScript
{
public:
    TSAuctionHouseScript() : AuctionHouseScript("TSAuctionHouseScript"){}
    void OnAuctionAdd(AuctionHouseObject* ah,AuctionEntry* entry) FIRE(AuctionHouse,OnAuctionAdd,TSAuctionHouseObject(ah),TSAuctionEntry(entry))
    void OnAuctionRemove(AuctionHouseObject* ah,AuctionEntry* entry) FIRE(AuctionHouse,OnAuctionRemove,TSAuctionHouseObject(ah),TSAuctionEntry(entry))
    void OnAuctionSuccessful(AuctionHouseObject* ah,AuctionEntry* entry) FIRE(AuctionHouse,OnAuctionSuccessful,TSAuctionHouseObject(ah),TSAuctionEntry(entry))
    void OnAuctionExpire(AuctionHouseObject* ah,AuctionEntry* entry) FIRE(AuctionHouse,OnAuctionExpire,TSAuctionHouseObject(ah),TSAuctionEntry(entry))
};

class TSConditionScript : public ConditionScript
{
public:
    TSConditionScript() : ConditionScript("TSConditionScript"){}
    //TODO: Fix return type
    //bool OnConditionCheck(Condition const* condition,ConditionSourceInfo& sourceInfo) FIRE_RETURN(ConditionOnConditionCheck,bool,TODO_FIXME,,condition,TSMutable<ConditionSourceInfo>(sourceInfo))
};

class TSAchievementCriteriaScript : public AchievementCriteriaScript
{
public:
    TSAchievementCriteriaScript() : AchievementCriteriaScript("TSAchievementCriteriaScript"){}
    //bool OnCheck(Player* source,Unit* target) FIRE_RETURN(AchievementCriteriaOnCheck,bool,false,TSPlayer(source),TSUnit(target))
};

class TSPlayerScript : public PlayerScript
{
public:
    TSPlayerScript() : PlayerScript("TSPlayerScript"){}
    void OnPVPKill(Player* killer,Player* killed) FIRE(Player,OnPVPKill,TSPlayer(killer),TSPlayer(killed))
    void OnCreatureKill(Player* killer,Creature* killed) FIRE(Player,OnCreatureKill,TSPlayer(killer),TSCreature(killed))
    void OnPlayerKilledByCreature(Creature* killer,Player* killed) FIRE(Player,OnPlayerKilledByCreature,TSCreature(killer),TSPlayer(killed))
    void OnLevelChanged(Player* player,uint8 oldLevel) FIRE(Player,OnLevelChanged,TSPlayer(player),oldLevel)
    void OnFreeTalentPointsChanged(Player* player,uint32 points) FIRE(Player,OnFreeTalentPointsChanged,TSPlayer(player),points)
    void OnTalentsReset(Player* player,bool noCost) FIRE(Player,OnTalentsReset,TSPlayer(player),noCost)
    void OnMoneyChanged(Player* player,int32& amount) FIRE(Player,OnMoneyChanged,TSPlayer(player),TSMutableNumber<int32>(&amount))
    void OnMoneyLimit(Player* player,int32 amount) FIRE(Player,OnMoneyLimit,TSPlayer(player),amount)
    void OnGiveXP(Player* player,uint32& amount,Unit* victim) FIRE(Player,OnGiveXP,TSPlayer(player),TSMutableNumber<uint32>(&amount),TSUnit(victim))
#if TRINITY
    void OnReputationChange(Player* player,uint32 factionId,int32& standing,bool incremental) FIRE(Player,OnReputationChange,TSPlayer(player),factionId,TSMutableNumber<int32>(&standing),incremental)
#endif
    void OnDuelRequest(Player* target,Player* challenger) FIRE(Player,OnDuelRequest,TSPlayer(target),TSPlayer(challenger))
    void OnDuelStart(Player* player1,Player* player2) FIRE(Player,OnDuelStart,TSPlayer(player1),TSPlayer(player2))
    void OnDuelEnd(Player* winner,Player* loser,DuelCompleteType type) FIRE(Player,OnDuelEnd,TSPlayer(winner),TSPlayer(loser),type)
    void OnChat(Player* player,uint32 type,uint32 lang,std::string& msg) FIRE(Player,OnSay,TSPlayer(player), TSMutableString(&msg),type,lang)
    void OnChat(Player* player,uint32 type,uint32 lang,std::string& msg,Player* receiver) {
        // needs to happen here, because we want to be sure
        // successful messages do not reach the normal OnWhisper events.
        if(handle_extra_tooltip_message(player,receiver,msg))
        {
#if TRINITY
            TC_LOG_DEBUG("tswow","CHAT: Successfully handled TSWoW GM Message");
#elif AZEROTHCORE
            LOG_DEBUG("tswow","CHAT: Successfully handled TSWoW GM Message");
#endif
            return;
        }
        FIRE(Player,OnWhisper, TSPlayer(player), TSPlayer(receiver), TSMutableString(&msg), type, lang);
    }
    void OnChat(Player* player,uint32 type,uint32 lang,std::string& msg,Group* group) FIRE(Player,OnChatGroup,TSPlayer(player), TSGroup(group), TSMutableString(&msg),type,lang)
    void OnChat(Player* player,uint32 type,uint32 lang,std::string& msg,Guild* guild) FIRE(Player,OnChatGuild,TSPlayer(player), TSGuild(guild), TSMutableString(&msg),type,lang)
    void OnChat(Player* player,uint32 type,uint32 lang,std::string& msg,Channel* channel) FIRE(Player,OnChat,TSPlayer(player), TSChannel(channel), TSMutableString(&msg),type,lang)
#if TRINITY
    void OnEmote(Player* player,Emote emote) FIRE(Player,OnEmote,TSPlayer(player),emote)
#endif
    void OnTextEmote(Player* player,uint32 textEmote,uint32 emoteNum,ObjectGuid guid) FIRE(Player,OnTextEmote,TSPlayer(player),textEmote,emoteNum,guid.GetRawValue())
    void OnSpellCast(Player* player,Spell* spell,bool skipCheck) FIRE(Player,OnSpellCast,TSPlayer(player),TSSpell(spell),skipCheck)
#if TRINITY
    void OnLogin(Player* player,bool firstLogin) FIRE(Player,OnLogin,TSPlayer(player),firstLogin)
#endif
    void OnLogout(Player* player) FIRE(Player,OnLogout,TSPlayer(player))
    void OnCreate(Player* player) FIRE(Player,OnCreate,TSPlayer(player))
    void OnDelete(ObjectGuid guid,uint32 accountId) FIRE(Player,OnDelete,guid.GetRawValue(),accountId)
    void OnFailedDelete(ObjectGuid guid,uint32 accountId) FIRE(Player,OnFailedDelete,guid.GetRawValue(),accountId)
    void OnSave(Player* player) FIRE(Player,OnSave,TSPlayer(player))
#if TRINITY
    void OnBindToInstance(Player* player,Difficulty difficulty,uint32 mapId,bool permanent,uint8 extendState) FIRE(Player,OnBindToInstance,TSPlayer(player),difficulty,mapId,permanent,extendState)
#endif
    void OnUpdateZone(Player* player,uint32 newZone,uint32 newArea) FIRE(Player,OnUpdateZone,TSPlayer(player),newZone,newArea)
    void OnMapChanged(Player* player) FIRE(Player,OnMapChanged,TSPlayer(player))
    void OnQuestObjectiveProgress(Player* player, Quest const* quest, uint32 objectiveIndex, uint16 progress) {
        FIRE(Player,OnQuestObjectiveProgress, TSPlayer(player), quest, objectiveIndex, progress)
        FIRE_ID(
              quest->events.id
            , Quest,OnObjectiveProgress
            , TSQuest(quest)
            , TSPlayer(player)
            , objectiveIndex
            , progress
        );
    }
    void OnQuestStatusChange(Player* player,uint32 questId) FIRE(Player,OnQuestStatusChange,TSPlayer(player),questId)
    void OnMovieComplete(Player* player,uint32 movieId) FIRE(Player,OnMovieComplete,TSPlayer(player),movieId)
    void OnPlayerRepop(Player* player) FIRE(Player,OnPlayerRepop,TSPlayer(player))
};

class TSAccountScript : public AccountScript
{
public:
    TSAccountScript() : AccountScript("TSAccountScript"){}
    void OnAccountLogin(uint32 accountId) FIRE(Account,OnAccountLogin,accountId)
    void OnFailedAccountLogin(uint32 accountId) FIRE(Account,OnFailedAccountLogin,accountId)
    void OnEmailChange(uint32 accountId) FIRE(Account,OnEmailChange,accountId)
    void OnFailedEmailChange(uint32 accountId) FIRE(Account,OnFailedEmailChange,accountId)
    void OnPasswordChange(uint32 accountId) FIRE(Account,OnPasswordChange,accountId)
    void OnFailedPasswordChange(uint32 accountId) FIRE(Account,OnFailedPasswordChange,accountId)
};

class TSGuildScript : public GuildScript
{
public:
    TSGuildScript() : GuildScript("TSGuildScript"){}
    void OnAddMember(Guild* guild,Player* player,uint8& plRank) FIRE(Guild,OnAddMember,TSGuild(guild),TSPlayer(player),TSMutableNumber<uint8>(&plRank))
    void OnRemoveMember(Guild* guild,Player* player,bool isDisbanding,bool isKicked) FIRE(Guild,OnRemoveMember,TSGuild(guild),TSPlayer(player),isDisbanding,isKicked)
    void OnMOTDChanged(Guild* guild,const std::string& newMotd) FIRE(Guild,OnMOTDChanged,TSGuild(guild),newMotd)
    void OnInfoChanged(Guild* guild,const std::string& newInfo) FIRE(Guild,OnInfoChanged,TSGuild(guild),newInfo)
    void OnCreate(Guild* guild,Player* leader,const std::string& name) FIRE(Guild,OnCreate,TSGuild(guild),TSPlayer(leader),name)
    void OnDisband(Guild* guild) FIRE(Guild,OnDisband,TSGuild(guild))
    void OnMemberWitdrawMoney(Guild* guild,Player* player,uint32& amount,bool isRepair) FIRE(Guild,OnMemberWitdrawMoney,TSGuild(guild),TSPlayer(player),TSMutableNumber<uint32>(&amount),isRepair)
    void OnMemberDepositMoney(Guild* guild,Player* player,uint32& amount) FIRE(Guild,OnMemberDepositMoney,TSGuild(guild),TSPlayer(player),TSMutableNumber<uint32>(&amount))
    void OnEvent(Guild* guild,uint8 eventType,ObjectGuid::LowType playerGuid1,ObjectGuid::LowType playerGuid2,uint8 newRank) FIRE(Guild,OnEvent,TSGuild(guild),eventType,playerGuid1,playerGuid2,newRank)
    void OnBankEvent(Guild* guild,uint8 eventType,uint8 tabId,ObjectGuid::LowType playerGuid,uint32 itemOrMoney,uint16 itemStackCount,uint8 destTabId) FIRE(Guild,OnBankEvent,TSGuild(guild),eventType,tabId,playerGuid,itemOrMoney,itemStackCount,destTabId)
};

class TSGroupScript : public GroupScript
{
public:
    TSGroupScript() : GroupScript("TSGroupScript"){}
    void OnAddMember(Group* group,ObjectGuid guid) FIRE(Group,OnAddMember,TSGroup(group),guid.GetRawValue())
    void OnInviteMember(Group* group,ObjectGuid guid) FIRE(Group,OnInviteMember,TSGroup(group),guid.GetRawValue())
    void OnRemoveMember(Group* group,ObjectGuid guid,RemoveMethod method,ObjectGuid kicker,char const* reason) FIRE(Group,OnRemoveMember,TSGroup(group),guid.GetRawValue(),method,kicker.GetRawValue(),reason)
    void OnChangeLeader(Group* group,ObjectGuid newLeaderGuid,ObjectGuid oldLeaderGuid) FIRE(Group,OnChangeLeader,TSGroup(group),newLeaderGuid.GetRawValue(),oldLeaderGuid.GetRawValue())
    void OnDisband(Group* group) FIRE(Group,OnDisband,TSGroup(group))
};

void AddSC_tswow_commandscript();
void TSLoadScriptMgrEvents()
{
    AddSC_tswow_commandscript();
    new TSServerScript();
    new TSWorldScript();
    new TSUnitScript();
    //new TSAreaTriggerScript();
    //new TSWeatherScript();
    new TSAuctionHouseScript();
    //new TSConditionScript();
    //new TSAchievementCriteriaScript();
    new TSPlayerScript();
    new TSAccountScript();
    new TSGuildScript();
    new TSGroupScript();
}
