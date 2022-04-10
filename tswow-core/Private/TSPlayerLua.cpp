#include "TSLua.h"
#include "TSPlayer.h"
#include "TSUnitLua.h"

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

void TSLuaState::load_player_methods(uint32_t modid)
{
    auto ts_player = new_usertype <TSPlayer>("TSPlayer");
    load_unit_methods_t(ts_player, modid, "TSPlayer");
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
    LUA_FIELD(ts_player, TSPlayer, GetItemByGUID);
    LUA_FIELD(ts_player, TSPlayer, GetGossipTextID);
    LUA_FIELD(ts_player, TSPlayer, GetSelection);
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
          &TSPlayer::LSendItemQueryPacket0
        , &TSPlayer::LSendItemQueryPacket1
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
    ts_player.set_function("GetPlayerIP", &TSPlayer::LGetPlayerIP);
    ts_player.set_function("GetGuildName", &TSPlayer::LGetGuildName);
    ts_player.set_function("GetAccountName", &TSPlayer::LGetAccountName);
    ts_player.set_function("KillPlayer", sol::overload(
        &TSPlayer::LKillPlayer0
        , &TSPlayer::LKillPlayer1
    ));
    ts_player.set_function("Whisper", &TSPlayer::LWhisper);
    ts_player.set_function("TextEmote", &TSPlayer::LTextEmote);
    ts_player.set_function("Yell", &TSPlayer::LYell);
    ts_player.set_function("Say", &TSPlayer::LSay);
    ts_player.set_function("AddItem", sol::overload(
        &TSPlayer::LAddItem0
        , &TSPlayer::LAddItem1
    ));
    ts_player.set_function("AddItemToSlotRaw", sol::overload(
        &TSPlayer::LAddItemToSlotRaw0
        , &TSPlayer::LAddItemToSlotRaw1
    ));
    ts_player.set_function("RemoveItem", sol::overload(
        &TSPlayer::LRemoveItem0
        , &TSPlayer::LRemoveItem1
    ));
    ts_player.set_function("RemoveItemByEntry", sol::overload(
        &TSPlayer::LRemoveItemByEntry0
        , &TSPlayer::LRemoveItemByEntry1
    ));
    ts_player.set_function("SendBroadcastMessage", &TSPlayer::LSendBroadcastMessage);
    ts_player.set_function("SendAreaTriggerMessage", &TSPlayer::LSendAreaTriggerMessage);
    ts_player.set_function("SendNotification", &TSPlayer::LSendNotification);
    ts_player.set_function("SendAddonMessage", &TSPlayer::LSendAddonMessage);
    ts_player.set_function("LearnClassSpells", sol::overload(
        &TSPlayer::LLearnClassSpells0
        , &TSPlayer::LLearnClassSpells1
    ));
    ts_player.set_function("GossipMenuAddItem", sol::overload(
        &TSPlayer::LGossipMenuAddItem0
        , &TSPlayer::LGossipMenuAddItem1
        , &TSPlayer::LGossipMenuAddItem2
        , &TSPlayer::LGossipMenuAddItem3
        , &TSPlayer::LGossipMenuAddItem4
        , &TSPlayer::LGossipMenuAddItem5
    ));
    ts_player.set_function("GossipSendMenu", sol::overload(
        &TSPlayer::LGossipSendMenu0
        , &TSPlayer::LGossipSendMenu1
    ));
    ts_player.set_function("GossipSendTextMenu", sol::overload(
        &TSPlayer::LGossipSendTextMenu0
        , &TSPlayer::LGossipSendTextMenu1
        , &TSPlayer::LGossipSendTextMenu2
        , &TSPlayer::LGossipSendTextMenu3
        , &TSPlayer::LGossipSendTextMenu4
        , &TSPlayer::LGossipSendTextMenu5
        , &TSPlayer::LGossipSendTextMenu6
        , &TSPlayer::LGossipSendTextMenu7
        , &TSPlayer::LGossipSendTextMenu8
    ));
    ts_player.set_function("GossipSendTextMenuGendered", sol::overload(
        &TSPlayer::LGossipSendTextMenuGendered0
        , &TSPlayer::LGossipSendTextMenuGendered1
        , &TSPlayer::LGossipSendTextMenuGendered2
        , &TSPlayer::LGossipSendTextMenuGendered3
        , &TSPlayer::LGossipSendTextMenuGendered4
        , &TSPlayer::LGossipSendTextMenuGendered5
        , &TSPlayer::LGossipSendTextMenuGendered6
        , &TSPlayer::LGossipSendTextMenuGendered7
        , &TSPlayer::LGossipSendTextMenuGendered8
    ));
    ts_player.set_function("GossipSendPOI", &TSPlayer::LGossipSendPOI);
    ts_player.set_function("SendMail", sol::overload(
        &TSPlayer::LSendMail0
        , &TSPlayer::LSendMail1
        , &TSPlayer::LSendMail2
        , &TSPlayer::LSendMail3
        , &TSPlayer::LSendMail4
    ));
    ts_player.set_function("GetOutfitCopy", sol::overload(
        &TSPlayer::LGetOutfitCopy0
        , &TSPlayer::LGetOutfitCopy1
        , &TSPlayer::LGetOutfitCopy2
        , &TSPlayer::LGetOutfitCopy3
    ));
}