#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSPlayer.h"
#include "TSDBJson.h"

#include "TSPlayer.h"
#include "TSBattleground.h"
#include "TSMap.h"
#include "TSInstance.h"
#include "TSJson.h"
#include "TSUnit.h"
#include "TSItem.h"
#include "TSGroup.h"
#include "TSQuest.h"
#include "TSWorldObject.h"
#include "TSGuild.h"
#include "TSCorpse.h"
#include "TSObject.h"
#include "TSWorldPacket.h"
#include "TSCreature.h"
#include "TSMail.h"
#include "TSVehicle.h"
#include "TSSpell.h"
#include "TSGameObject.h"
#include "TSItemEntry.h"

void TSLua::load_player_methods(sol::state& state)
{
    auto ts_player = state.new_usertype <TSPlayer>("TSPlayer", sol::base_classes, sol::bases<TSUnit,TSWorldObject,TSObject,TSEntityProvider,TSWorldEntityProvider<TSWorldObject>, TSDBJsonProvider>());
    LUA_FIELD(ts_player, TSPlayer, GetTalentPointsInTree);
    LUA_FIELD(ts_player, TSPlayer, CanTitanGrip);
    LUA_FIELD(ts_player, TSPlayer, HasTalent);
    LUA_FIELD(ts_player, TSPlayer, HasAchieved);
    LUA_FIELD(ts_player, TSPlayer, HasQuest);
    LUA_FIELD(ts_player, TSPlayer, HasSkill);
    LUA_FIELD(ts_player, TSPlayer, HasSpell);
    LUA_FIELD(ts_player, TSPlayer, HasAtLoginFlag);
    LUA_FIELD(ts_player, TSPlayer, HasQuestForGO);
    LUA_FIELD(ts_player, TSPlayer, HasTitle);
    LUA_FIELD(ts_player, TSPlayer, HasItem);
    LUA_FIELD(ts_player, TSPlayer, HasQuestForItem);
    LUA_FIELD(ts_player, TSPlayer, CanUseItem);
    LUA_FIELD(ts_player, TSPlayer, HasSpellCooldown);
    LUA_FIELD(ts_player, TSPlayer, CanShareQuest);
    LUA_FIELD(ts_player, TSPlayer, CanSpeak);
    LUA_FIELD(ts_player, TSPlayer, CanUninviteFromGroup);
    LUA_FIELD(ts_player, TSPlayer, CanFly);
    LUA_FIELD(ts_player, TSPlayer, IsInWater);
    LUA_FIELD(ts_player, TSPlayer, IsMoving);
    LUA_FIELD(ts_player, TSPlayer, IsFlying);
    LUA_FIELD(ts_player, TSPlayer, IsInGroup);
    LUA_FIELD(ts_player, TSPlayer, IsInGuild);
    LUA_FIELD(ts_player, TSPlayer, IsGM);
    LUA_FIELD(ts_player, TSPlayer, IsInArenaTeam);
    LUA_FIELD(ts_player, TSPlayer, IsImmuneToDamage);
    LUA_FIELD(ts_player, TSPlayer, CanCompleteQuest);
    LUA_FIELD(ts_player, TSPlayer, IsHorde);
    LUA_FIELD(ts_player, TSPlayer, IsAlliance);
    LUA_FIELD(ts_player, TSPlayer, IsDND);
    LUA_FIELD(ts_player, TSPlayer, IsAFK);
    LUA_FIELD(ts_player, TSPlayer, IsFalling);
    LUA_FIELD(ts_player, TSPlayer, IsGroupVisibleFor);
    LUA_FIELD(ts_player, TSPlayer, IsInSameRaidWith);
    LUA_FIELD(ts_player, TSPlayer, IsInSameGroupWith);
    LUA_FIELD(ts_player, TSPlayer, IsHonorOrXPTarget);
    LUA_FIELD(ts_player, TSPlayer, IsVisibleForPlayer);
    LUA_FIELD(ts_player, TSPlayer, IsGMVisible);
    LUA_FIELD(ts_player, TSPlayer, IsTaxiCheater);
    LUA_FIELD(ts_player, TSPlayer, IsGMChat);
    LUA_FIELD(ts_player, TSPlayer, IsAcceptingWhispers);
    LUA_FIELD(ts_player, TSPlayer, IsRested);
    LUA_FIELD(ts_player, TSPlayer, InBGQueue);
    LUA_FIELD(ts_player, TSPlayer, InArena);
    LUA_FIELD(ts_player, TSPlayer, InBG);
    LUA_FIELD(ts_player, TSPlayer, CanBlock);
    LUA_FIELD(ts_player, TSPlayer, CanParry);
    LUA_FIELD(ts_player, TSPlayer, GetSpecsCount);
    LUA_FIELD(ts_player, TSPlayer, GetActiveSpec);
    LUA_FIELD(ts_player, TSPlayer, GetPhaseMaskForSpawn);
    LUA_FIELD(ts_player, TSPlayer, GetArenaPoints);
    LUA_FIELD(ts_player, TSPlayer, GetHonorPoints);
    LUA_FIELD(ts_player, TSPlayer, GetShieldBlockValue);
    LUA_FIELD(ts_player, TSPlayer, GetSpellCooldownDelay);
    LUA_FIELD(ts_player, TSPlayer, GetLatency);
    LUA_FIELD(ts_player, TSPlayer, GetChampioningFaction);
    LUA_FIELD(ts_player, TSPlayer, GetOriginalSubGroup);
    LUA_FIELD(ts_player, TSPlayer, GetOriginalGroup);
    LUA_FIELD(ts_player, TSPlayer, GetNextRandomRaidMember);
    LUA_FIELD(ts_player, TSPlayer, GetSubGroup);
    LUA_FIELD(ts_player, TSPlayer, GetGroupInvite);
    LUA_FIELD(ts_player, TSPlayer, GetXPRestBonus);
    LUA_FIELD(ts_player, TSPlayer, GetBGTypeID);
    LUA_FIELD(ts_player, TSPlayer, GetBattlegroundID);
    LUA_FIELD(ts_player, TSPlayer, GetReputationRank);
    LUA_FIELD(ts_player, TSPlayer, GetDrunkValue);
    LUA_FIELD(ts_player, TSPlayer, GetSkillTempBonusValue);
    LUA_FIELD(ts_player, TSPlayer, GetSkillPermBonusValue);
    LUA_FIELD(ts_player, TSPlayer, GetPureSkillValue);
    LUA_FIELD(ts_player, TSPlayer, GetBaseSkillValue);
    LUA_FIELD(ts_player, TSPlayer, GetSkillValue);
    LUA_FIELD(ts_player, TSPlayer, GetPureMaxSkillValue);
    LUA_FIELD(ts_player, TSPlayer, GetMaxSkillValue);
    LUA_FIELD(ts_player, TSPlayer, GetManaBonusFromIntellect);
    LUA_FIELD(ts_player, TSPlayer, GetHealthBonusFromStamina);
    LUA_FIELD(ts_player, TSPlayer, GetDifficulty);
    LUA_FIELD(ts_player, TSPlayer, GetGuildRank);
    LUA_FIELD(ts_player, TSPlayer, GetFreeTalentPoints);
    LUA_FIELD(ts_player, TSPlayer, GetReputation);
    LUA_FIELD(ts_player, TSPlayer, GetComboTarget);
    LUA_FIELD(ts_player, TSPlayer, GetComboPoints);
    LUA_FIELD(ts_player, TSPlayer, GetInGameTime);
    LUA_FIELD(ts_player, TSPlayer, GetQuestStatus);
    LUA_FIELD(ts_player, TSPlayer, GetQuestRewardStatus);
    LUA_FIELD(ts_player, TSPlayer, GetReqKillOrCastCurrentCount);
    LUA_FIELD(ts_player, TSPlayer, GetQuestLevel);
    LUA_FIELD(ts_player, TSPlayer, GetEquippedItemBySlot);
    LUA_FIELD(ts_player, TSPlayer, GetRestBonus);
    LUA_FIELD(ts_player, TSPlayer, GetChatTag);
    LUA_FIELD(ts_player, TSPlayer, SetBankBagSlotCount);
    LUA_FIELD(ts_player, TSPlayer, GetItemByPos);
    LUA_FIELD(ts_player, TSPlayer, GetItemByEntry);
    LUA_FIELD(ts_player, TSPlayer, GetItemByGUID);
    LUA_FIELD(ts_player, TSPlayer, GetGossipTextID);
    LUA_FIELD(ts_player, TSPlayer, GetSelection);
    LUA_FIELD(ts_player, TSPlayer, GetGlobalSelection);
    LUA_FIELD(ts_player, TSPlayer, GetGMRank);
    LUA_FIELD(ts_player, TSPlayer, GetGuildID);
    LUA_FIELD(ts_player, TSPlayer, GetTeam);
    LUA_FIELD(ts_player, TSPlayer, GetItemCount);
    LUA_FIELD(ts_player, TSPlayer, GetLifetimeKills);
    LUA_FIELD(ts_player, TSPlayer, GetLevelPlayedTime);
    LUA_FIELD(ts_player, TSPlayer, GetTotalPlayedTime);
    LUA_FIELD(ts_player, TSPlayer, GetGuild);
    LUA_FIELD(ts_player, TSPlayer, GetGroup);
    LUA_FIELD(ts_player, TSPlayer, GetAccountID);
    LUA_FIELD(ts_player, TSPlayer, GetCorpse);
    LUA_FIELD(ts_player, TSPlayer, GetDbLocaleIndex);
    LUA_FIELD(ts_player, TSPlayer, GetDbcLocale);
    LUA_FIELD(ts_player, TSPlayer, RemoveAllItemMods);
    LUA_FIELD(ts_player, TSPlayer, RemoveItemMods);
    LUA_FIELD(ts_player, TSPlayer, ApplyAllItemMods);
    LUA_FIELD(ts_player, TSPlayer, ApplyItemMods);
    LUA_FIELD(ts_player, TSPlayer, UpdateCache);
    LUA_FIELD(ts_player, TSPlayer, SetPlayerLock);
    LUA_FIELD(ts_player, TSPlayer, SetAtLoginFlag);
    LUA_FIELD(ts_player, TSPlayer, SetSheath);
    LUA_FIELD(ts_player, TSPlayer, SetDrunkValue);
    LUA_FIELD(ts_player, TSPlayer, SetFactionForRace);
    LUA_FIELD(ts_player, TSPlayer, SetSkill);
    LUA_FIELD(ts_player, TSPlayer, SetGuildRank);
    LUA_FIELD(ts_player, TSPlayer, SetFreeTalentPoints);
    LUA_FIELD(ts_player, TSPlayer, SetReputation);
    LUA_FIELD(ts_player, TSPlayer, SetQuestStatus);
    LUA_FIELD(ts_player, TSPlayer, SetRestBonus);
    LUA_FIELD(ts_player, TSPlayer, SetAcceptWhispers);
    LUA_FIELD(ts_player, TSPlayer, SetPvPDeath);
    LUA_FIELD(ts_player, TSPlayer, SetGMVisible);
    LUA_FIELD(ts_player, TSPlayer, SetTaxiCheat);
    LUA_FIELD(ts_player, TSPlayer, SetGMChat);
    LUA_FIELD(ts_player, TSPlayer, SetGameMaster);
    LUA_FIELD(ts_player, TSPlayer, SetGender);
    LUA_FIELD(ts_player, TSPlayer, SetArenaPoints);
    LUA_FIELD(ts_player, TSPlayer, SetHonorPoints);
    LUA_FIELD(ts_player, TSPlayer, SetLifetimeKills);
    LUA_FIELD(ts_player, TSPlayer, SetMoney);
    LUA_FIELD(ts_player, TSPlayer, GetMoney);
    LUA_FIELD(ts_player, TSPlayer, TryAddMoney);
    LUA_FIELD(ts_player, TSPlayer, TryReduceMoney);
    LUA_FIELD(ts_player, TSPlayer, SetBindPoint);
    LUA_FIELD(ts_player, TSPlayer, SetKnownTitle);
    LUA_FIELD(ts_player, TSPlayer, ResetPetTalents);
    LUA_FIELD(ts_player, TSPlayer, ResetAchievements);
    LUA_FIELD(ts_player, TSPlayer, SendShowMailBox);
    LUA_FIELD(ts_player, TSPlayer, ModifyArenaPoints);
    LUA_FIELD(ts_player, TSPlayer, ModifyHonorPoints);
    LUA_FIELD(ts_player, TSPlayer, SaveToDB);
    LUA_FIELD(ts_player, TSPlayer, SummonPlayer);
    LUA_FIELD(ts_player, TSPlayer, Mute);
    LUA_FIELD(ts_player, TSPlayer, RewardQuest);
    LUA_FIELD(ts_player, TSPlayer, SendAuctionMenu);
    LUA_FIELD(ts_player, TSPlayer, SendTaxiMenu);
    LUA_FIELD(ts_player, TSPlayer, SendCreatureQueryPacket);
    LUA_FIELD(ts_player, TSPlayer, SendGameObjectQueryPacket);
    ts_player.set_function("SendItemQueryPacket", sol::overload(
          [](TSPlayer& player, uint32 entry) { return player.SendItemQueryPacket(entry); }
        , [](TSPlayer& player, TSItemTemplate item) { return player.SendItemQueryPacket(item); }
    ));
    LUA_FIELD(ts_player, TSPlayer, SendSpiritResurrect);
    LUA_FIELD(ts_player, TSPlayer, SendTabardVendorActivate);
    LUA_FIELD(ts_player, TSPlayer, SendShowBank);
    LUA_FIELD(ts_player, TSPlayer, SendListInventory);
    LUA_FIELD(ts_player, TSPlayer, SendTrainerList);
    LUA_FIELD(ts_player, TSPlayer, SendGuildInvite);
    LUA_FIELD(ts_player, TSPlayer, LogoutPlayer);
    LUA_FIELD(ts_player, TSPlayer, RemoveFromBGRaid);
    LUA_FIELD(ts_player, TSPlayer, UnbindInstance);
    LUA_FIELD(ts_player, TSPlayer, UnbindAllInstances);
    LUA_FIELD(ts_player, TSPlayer, LeaveBG);
    LUA_FIELD(ts_player, TSPlayer, DurabilityRepair);
    LUA_FIELD(ts_player, TSPlayer, DurabilityRepairAll);
    LUA_FIELD(ts_player, TSPlayer, DurabilityPointLossForEquipSlot);
    LUA_FIELD(ts_player, TSPlayer, DurabilityPointsLossAll);
    LUA_FIELD(ts_player, TSPlayer, DurabilityPointsLoss);
    LUA_FIELD(ts_player, TSPlayer, DurabilityLoss);
    LUA_FIELD(ts_player, TSPlayer, DurabilityLossAll);
    LUA_FIELD(ts_player, TSPlayer, RemoveFromGroup);
    LUA_FIELD(ts_player, TSPlayer, ResetTalentsCost);
    LUA_FIELD(ts_player, TSPlayer, ResetTalents);
    LUA_FIELD(ts_player, TSPlayer, RemoveSpell);
    LUA_FIELD(ts_player, TSPlayer, ClearComboPoints);
    LUA_FIELD(ts_player, TSPlayer, AddComboPoints);
    LUA_FIELD(ts_player, TSPlayer, TalkedToCreature);
    LUA_FIELD(ts_player, TSPlayer, KilledMonsterCredit);
    LUA_FIELD(ts_player, TSPlayer, GroupEventHappens);
    LUA_FIELD(ts_player, TSPlayer, AreaExploredOrEventHappens);
    LUA_FIELD(ts_player, TSPlayer, FailQuest);
    LUA_FIELD(ts_player, TSPlayer, IncompleteQuest);
    LUA_FIELD(ts_player, TSPlayer, CompleteQuest);
    LUA_FIELD(ts_player, TSPlayer, AddQuest);
    LUA_FIELD(ts_player, TSPlayer, RemoveQuest);
    LUA_FIELD(ts_player, TSPlayer, GiveXP);
    LUA_FIELD(ts_player, TSPlayer, SetXP);
    LUA_FIELD(ts_player, TSPlayer, GetXP);
    LUA_FIELD(ts_player, TSPlayer, AddXP);
    LUA_FIELD(ts_player, TSPlayer, ToggleDND);
    LUA_FIELD(ts_player, TSPlayer, ToggleAFK);
    LUA_FIELD(ts_player, TSPlayer, CanEquipItem);
    LUA_FIELD(ts_player, TSPlayer, GetAverageItemLevel);
    LUA_FIELD(ts_player, TSPlayer, UnsetKnownTitle);
    LUA_FIELD(ts_player, TSPlayer, AdvanceSkillsToMax);
    LUA_FIELD(ts_player, TSPlayer, AdvanceAllSkills);
    LUA_FIELD(ts_player, TSPlayer, AdvanceSkill);
    LUA_FIELD(ts_player, TSPlayer, Teleport);
    LUA_FIELD(ts_player, TSPlayer, AddLifetimeKills);
    LUA_FIELD(ts_player, TSPlayer, RemoveLifetimeKills);
    LUA_FIELD(ts_player, TSPlayer, ResetSpellCooldown);
    LUA_FIELD(ts_player, TSPlayer, ResetTypeCooldowns);
    LUA_FIELD(ts_player, TSPlayer, ResetAllCooldowns);
    LUA_FIELD(ts_player, TSPlayer, KickPlayer);
    LUA_FIELD(ts_player, TSPlayer, ModifyMoney);
    LUA_FIELD(ts_player, TSPlayer, LearnSpell);
    LUA_FIELD(ts_player, TSPlayer, LearnTalent);
    LUA_FIELD(ts_player, TSPlayer, ResurrectPlayer);
    LUA_FIELD(ts_player, TSPlayer, GossipComplete);
    LUA_FIELD(ts_player, TSPlayer, GossipClearMenu);
    LUA_FIELD(ts_player, TSPlayer, StartTaxi);
    LUA_FIELD(ts_player, TSPlayer, GossipAddQuests);
    LUA_FIELD(ts_player, TSPlayer, SendQuestTemplate);
    LUA_FIELD(ts_player, TSPlayer, SpawnBones);
    LUA_FIELD(ts_player, TSPlayer, RemovedInsignia);
    LUA_FIELD(ts_player, TSPlayer, GetBGPlayer);
    LUA_FIELD(ts_player, TSPlayer, GetBG);
    LUA_FIELD(ts_player, TSPlayer, GetInstance);
    LUA_FIELD(ts_player, TSPlayer, GroupInvite);
    LUA_FIELD(ts_player, TSPlayer, GroupCreate);
    LUA_FIELD(ts_player, TSPlayer, SendCinematicStart);
    LUA_FIELD(ts_player, TSPlayer, SendMovieStart);
    LUA_FIELD(ts_player, TSPlayer, CanBeTank);
    LUA_FIELD(ts_player, TSPlayer, CanBeHealer);
    LUA_FIELD(ts_player, TSPlayer, CanBeDPS);
    LUA_FIELD(ts_player, TSPlayer, CanBeLeader);
    LUA_FIELD(ts_player, TSPlayer, GetHairStyle);
    LUA_FIELD(ts_player, TSPlayer, SetHairStyle);
    LUA_FIELD(ts_player, TSPlayer, GetHairColor);
    LUA_FIELD(ts_player, TSPlayer, SetHairColor);
    LUA_FIELD(ts_player, TSPlayer, GetFacialStyle);
    LUA_FIELD(ts_player, TSPlayer, SetFacialStyle);
    LUA_FIELD(ts_player, TSPlayer, GetSkinColor);
    LUA_FIELD(ts_player, TSPlayer, SetSkinColor);
    LUA_FIELD(ts_player, TSPlayer, GetFace);
    LUA_FIELD(ts_player, TSPlayer, SetFace);
    LUA_FIELD(ts_player, TSPlayer, SendUpdateWorldState);
    LUA_FIELD(ts_player, TSPlayer, SendUpdateEventStates);
    LUA_FIELD(ts_player, TSPlayer, GetMails);
    LUA_FIELD(ts_player, TSPlayer, RemoveMail);
    LUA_FIELD(ts_player, TSPlayer, GetFreeInventorySpace);
    LUA_FIELD(ts_player, TSPlayer, GetQuestRewardTempTalentPoints);
    LUA_FIELD(ts_player, TSPlayer, GetQuestRewardPermTalentPoints);
    LUA_FIELD(ts_player, TSPlayer, GetPlayerIP);
    LUA_FIELD(ts_player, TSPlayer, GetGuildName);
    LUA_FIELD(ts_player, TSPlayer, GetAccountName);
    LUA_FIELD_OVERLOAD_0_1(ts_player, TSPlayer, KillPlayer, bool);
    LUA_FIELD(ts_player, TSPlayer, Whisper);
    LUA_FIELD(ts_player, TSPlayer, TextEmote);
    LUA_FIELD(ts_player, TSPlayer, Yell);
    LUA_FIELD(ts_player, TSPlayer, Say);
    LUA_FIELD_OVERLOAD_2_1(ts_player, TSPlayer, AddItem, uint32, uint32, int32);
    LUA_FIELD_OVERLOAD_4_1(ts_player, TSPlayer, AddItemToSlotRaw, uint8, uint8, uint32, uint32, int32);
    LUA_FIELD_OVERLOAD_1_1(ts_player, TSPlayer, RemoveItem, TSItem, uint32);
    LUA_FIELD_OVERLOAD_1_1(ts_player, TSPlayer, RemoveItemByEntry, uint32, uint32);
    LUA_FIELD(ts_player, TSPlayer, SendBroadcastMessage);
    LUA_FIELD(ts_player, TSPlayer, SendAreaTriggerMessage);
    LUA_FIELD(ts_player, TSPlayer, SendNotification);
    LUA_FIELD(ts_player, TSPlayer, SendAddonMessage);
    LUA_FIELD_OVERLOAD_2_1(ts_player, TSPlayer, LearnClassSpells, bool, bool, bool);
    LUA_FIELD_OVERLOAD_2_1(ts_player, TSPlayer, LearnClassSpells, bool, bool, bool);
    LUA_FIELD_OVERLOAD_2_5(ts_player, TSPlayer, GossipMenuAddItem, uint32, std::string const&, uint32, uint32, bool, std::string const&, uint32);
    LUA_FIELD_OVERLOAD_2_1(ts_player, TSPlayer, GossipSendMenu, uint32, TSObject, uint32);
    LUA_FIELD_OVERLOAD_2_8(ts_player, TSPlayer, GossipSendTextMenu, TSObject, std::string const&, uint32, uint32, uint32, uint32, uint32, uint32, uint32, uint32);
    LUA_FIELD_OVERLOAD_3_8(ts_player, TSPlayer, GossipSendTextMenuGendered, TSObject, std::string const&, std::string const&, uint32, uint32, uint32, uint32, uint32, uint32, uint32, uint32);
    LUA_FIELD(ts_player, TSPlayer, GossipSendPOI);
    LUA_FIELD_OVERLOAD_RET_0_3(ts_player, TSPlayer, GetOutfitCopy, uint32_t, int32_t, int32_t);
    ts_player.set_function("GetSpellMap", &TSPlayer::LGetSpellMap);

    ts_player.set_function("SendMail", sol::overload(
        [](TSPlayer& player, uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod, uint32 delay, sol::table items ) {
            TSArray<TSItem> tsitems;
            for (auto const& item : items)
            {
                tsitems.push(item.second.as<TSItem>());
            }
            return player.SendMail(senderType,from,subject,body,money,cod,delay, tsitems);
        },
        [](TSPlayer& player, uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod, uint32 delay) {
            return player.SendMail(senderType,from,subject,body,money,cod,delay);
        },
        [](TSPlayer& player, uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod) {
            return player.SendMail(senderType,from,subject,body,money,cod);
        },
        [](TSPlayer& player, uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money) {
            return player.SendMail(senderType,from,subject,body,money);
        },
        [](TSPlayer& player, uint8 senderType, uint64 from, std::string const& subject, std::string const& body) {
            return player.SendMail(senderType,from,subject,body);
        }
    ));
}