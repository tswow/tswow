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
#pragma once

#include <memory>
#include "TSMain.h"
#include "TSString.h"
#include "TSClasses.h"
#include "TSUnit.h"
#include "TSOutfit.h"

#include <sol/sol.hpp>

class TSJsonObject;
class TSJsonArray;
class TSBattleground;
class TSBattlegroundPlayer;
class TSInstance;

struct TSMail;
class TC_GAME_API TSPlayer : public TSUnit {
public:
	Player* player;
	TSPlayer(Player* player);
  TSPlayer();
  TSPlayer* operator->() { return this;}
	bool IsNull() { return player == nullptr; };
	bool CanTitanGrip();
	bool HasTalent(uint32 spellId, uint8 spec);
	bool HasAchieved(uint32 achievementId);
	bool HasQuest(uint32 quest);
	bool HasSkill(uint32 skill);
	bool HasSpell(uint32 id);
	bool HasAtLoginFlag(uint32 flag);
	bool HasQuestForGO(int32 entry);
	bool HasTitle(uint32 id);
	bool HasItem(uint32 itemId, uint32 count, bool check_bank);
	bool HasQuestForItem(uint32 entry);
	bool CanUseItem(TSItem item, uint32 entry);
	bool HasSpellCooldown(uint32 spellId);
	bool CanShareQuest(uint32 entry);
	bool CanSpeak();
	bool CanUninviteFromGroup();
	bool CanFly();
	bool IsInWater();
	bool IsMoving();
	bool IsFlying();
	bool IsInGroup();
	bool IsInGuild();
	bool IsGM();
	bool IsInArenaTeam(uint32 type);
	bool IsImmuneToDamage();
	bool CanCompleteQuest(uint32 entry);
	bool IsHorde();
	bool IsAlliance();
	bool IsDND();
	bool IsAFK();
	bool IsFalling();
	bool IsGroupVisibleFor(TSPlayer target);
	bool IsInSameRaidWith(TSPlayer target);
	bool IsInSameGroupWith(TSPlayer target);
	bool IsHonorOrXPTarget(TSUnit victim);
	bool IsVisibleForPlayer(TSPlayer target);
	bool IsGMVisible();
	bool IsTaxiCheater();
	bool IsGMChat();
	bool IsAcceptingWhispers();
	bool IsRested();
	bool InBGQueue();
	bool InArena();
	bool InBG();
	bool CanBlock();
	bool CanParry();
	uint8 GetSpecsCount(uint32 entry, uint32 mapid, uint32 zone);
	uint32 GetActiveSpec();
	uint32 GetPhaseMaskForSpawn();
	uint32 GetArenaPoints();
	uint32 GetHonorPoints();
	uint32 GetShieldBlockValue();
	uint32 GetSpellCooldownDelay(uint32 spellId);
	uint32 GetLatency();
	uint32 GetChampioningFaction();
	uint8 GetOriginalSubGroup();
	TSGroup GetOriginalGroup();
	TSPlayer GetNextRandomRaidMember(float radius);
	uint8 GetSubGroup();
	TSGroup GetGroupInvite();
	uint32 GetXPRestBonus(uint32 xp);
	uint32 GetBGTypeID();
	uint32 GetBattlegroundID();
	uint32 GetReputationRank(uint32 faction);
	uint16 GetDrunkValue();
	int16 GetSkillTempBonusValue(uint32 skill);
	int16 GetSkillPermBonusValue(uint32 skill);
	uint16 GetPureSkillValue(uint32 skill);
	uint16 GetBaseSkillValue(uint32 skill);
	uint16 GetSkillValue(uint32 skill);
	uint16 GetPureMaxSkillValue(uint32 skill);
	uint16 GetMaxSkillValue(uint32 skill);
	float GetManaBonusFromIntellect();
	float GetHealthBonusFromStamina();
	int32 GetDifficulty(bool isRaid);
	uint32 GetGuildRank();
	uint32 GetFreeTalentPoints();
	TSString GetGuildName();
	int32 GetReputation(uint32 faction);
	TSUnit GetComboTarget();
	uint8 GetComboPoints();
	uint32 GetInGameTime();
	uint32 GetQuestStatus(uint32 entry);
	bool GetQuestRewardStatus(uint32 questId);
	uint16 GetReqKillOrCastCurrentCount(uint32 questId, int32 entry);
	uint32 GetQuestLevel(TSQuest quest);
	TSItem  GetEquippedItemBySlot(uint8 slot);
	float GetRestBonus();
	uint8 GetChatTag();
	void SetBankBagSlotCount(uint8 count);
	TSItem GetItemByPos(uint8 bag, uint8 slot);
	TSItem GetItemByGUID(uint64 guid);
	TSItem GetItemByEntry(uint32 entry);
	uint32 GetGossipTextID(TSWorldObject obj);
	TSUnit GetSelection();
	uint32 GetGMRank();
	uint32 GetGuildID();
	uint32 GetTeam();
	uint32 GetItemCount(uint32 entry, bool checkinBank);
	uint32 GetLifetimeKills();
	TSString GetPlayerIP();
	uint32 GetLevelPlayedTime();
	uint32 GetTotalPlayedTime();
	TSGuild GetGuild();
	TSGroup GetGroup();
	uint32 GetAccountID();
	TSString GetAccountName();
	TSCorpse GetCorpse();
	int GetDbLocaleIndex();
	uint32 GetDbcLocale();
	void ApplyItemMods(uint32 itemID);
	void ApplyCustomItemMods(TSItemTemplate newItem);
	void UpdateCache();
	void SetPlayerLock(bool apply);
	void SetAtLoginFlag(uint32 flag);
	void SetSheath(uint32 sheathed);
	void SetDrunkValue(uint8 newDrunkValue);
	void SetFactionForRace(uint8 race);
	void SetSkill(uint16 id, uint16 step, uint16 currVal, uint16 maxVal);
	void SetGuildRank(uint8 rank);
	void SetFreeTalentPoints(uint32 points);
	void SetReputation(uint32 faction, int32 value);
	void SetQuestStatus(uint32 entry, uint32 status);
	void SetRestBonus(float bonus);
	void SetAcceptWhispers(bool on);
	void SetPvPDeath(bool on);
	void SetGMVisible(bool on);
	void SetTaxiCheat(bool on);
	void SetGMChat(bool on);
	void SetGameMaster(bool on);
	void SetGender(uint32 _gender);
	void SetArenaPoints(uint32 arenaP);
	void SetHonorPoints(uint32 honorP);
	void SetLifetimeKills(uint32 val);

  void SetMoney(uint32 amt);
  uint32 GetMoney();
  bool TryAddMoney(uint32 amt);
  bool TryReduceMoney(uint32 amt);

	void SetBindPoint(float x, float y, float z, uint32 mapId, uint32 areaId);
	void SetKnownTitle(uint32 id);
	void ResetPetTalents(int32 pType);
	void ResetAchievements();
	void SendShowMailBox(uint64 guid);
	void ModifyArenaPoints(int32 amount);
	void ModifyHonorPoints(int32 amount);
	void SaveToDB();
	void SummonPlayer(TSUnit summoner);
	void Mute(uint32 muteseconds);
	void RewardQuest(uint32 entry);
	void SendAuctionMenu(TSUnit unit);
	void SendTaxiMenu(TSCreature creature);
	void SendCreatureQueryPacket(uint32 entry);
	void SendGameObjectQueryPacket(uint32 entry);
	void SendItemQueryPacket(uint32 entry);
	void SendItemQueryPacketWithTemplate(TSItemTemplate curItem);
	void SendSpiritResurrect();
	void SendTabardVendorActivate(TSWorldObject obj);
	void SendShowBank(TSWorldObject obj);
	void SendListInventory(TSWorldObject obj);
	void SendTrainerList(TSCreature obj);
	void SendGuildInvite(TSPlayer plr);
	void LogoutPlayer(bool save);
	void RemoveFromBGRaid();
	void UnbindInstance(uint32 map, uint32 difficulty);
	void UnbindAllInstances();
	void LeaveBG(bool teleToEntryPoint);
	uint32 DurabilityRepair(uint16 position, bool cost, float discountMod);
	uint32 DurabilityRepairAll(bool cost, float discountMod, bool guildBank);
	void DurabilityPointLossForEquipSlot(int32 slot);
	void DurabilityPointsLossAll(int32 points, bool inventory);
	void DurabilityPointsLoss(TSItem item, int32 points);
	void DurabilityLoss(TSItem item, double percent);
	void DurabilityLossAll(double percent, bool inventory);
	void KillPlayer(bool durability = false);
	void RemoveFromGroup();
	uint32 ResetTalentsCost();
	void ResetTalents(bool no_cost);
	void RemoveSpell(uint32 entry, bool disabled, bool learn_low_rank);
	void ClearComboPoints();
	void AddComboPoints(TSUnit target, int8 count);
	void TalkedToCreature(uint32 entry, TSCreature creature);
	void KilledMonsterCredit(uint32 entry);
	void GroupEventHappens(uint32 questId, TSWorldObject obj);
	void AreaExploredOrEventHappens(uint32 questId);
	void FailQuest(uint32 entry);
	void IncompleteQuest(uint32 entry);
	void CompleteQuest(uint32 entry);
	void AddQuest(uint32 entry);
	void RemoveQuest(uint32 entry);
	void Whisper(TSString text, uint32 lang, TSPlayer receiver, uint64 guid);
	void TextEmote(TSString text);
	void Yell(TSString text, uint32 lang);
	void Say(TSString text, uint32 lang);
	void GiveXP(uint32 xp, TSUnit victim);
	void SetXP(uint32 xp);
	uint32 GetXP();
	void AddXP(uint32 xp);
	void ToggleDND();
	void ToggleAFK();
	TSItem EquipItem(TSItem item, uint32 slot);
	TSItem EquipItem(uint32 entry, uint32 slot);
	bool CanEquipItem(TSItem item, uint32 slot, uint32 entry);
	float GetAverageItemLevel();
	void UnsetKnownTitle(uint32 id);
	void AdvanceSkillsToMax();
	void AdvanceAllSkills(uint32 step);
	void AdvanceSkill(uint32 _skillId, uint32 _step);
	bool Teleport(uint32 mapId, float x, float y, float z, float o);
	void AddLifetimeKills(uint32 val);
	TSItem AddItem(uint32 itemId, uint32 itemCount, int32 propertyId = -1);
	void AddItemToSlotRaw(uint8 bag, uint8 slot, uint32 itemId, uint32 count, int32 propertyId = -1);
  void RemoveItem(TSItem item, uint32 itemCount = 1);
	void RemoveItemByEntry(uint32 entry, uint32 itemCount = 1);
	void RemoveLifetimeKills(uint32 val);
	void ResetSpellCooldown(uint32 spellId, bool update);
	void ResetTypeCooldowns(uint32 category, bool update);
	void ResetAllCooldowns();
	void SendBroadcastMessage(TSString message);
	void SendAreaTriggerMessage(TSString msg);
	void SendNotification(TSString msg);
	void SendPacketPlayer(TSWorldPacket data, bool selfOnly);
	void SendPacketPlayer(std::shared_ptr<TSWorldPacket> data, bool selfOnly);
	void SendAddonMessage(TSString prefix, TSString message, uint8 channel, TSPlayer receiver);
	void KickPlayer();
	void ModifyMoney(int32 amt);
	void LearnSpell(uint32 id);
	void LearnTalent(uint32 id, uint32 rank);
	void LearnClassSpells(bool trainer, bool quests, bool limitQuestsByLevel = false);
	void ResurrectPlayer(float percent, bool sickness);
	void GossipMenuAddItem(uint32 _icon, TSString msg, uint32 _sender = 0, uint32 _intid = 0, bool _code = false, TSString _promptMsg = JSTR(""), uint32 _money = 0);
	void GossipComplete();
	void GossipSendMenu(uint32 npc_text, TSObject sender, uint32 menu_id = 0);
	void GossipSendTextMenu(
			  TSObject sender
			, TSString str
			, uint32 language = 0
			, uint32 emote0 = 0
			, uint32 emote0Delay = 0
			, uint32 emote1 = 0
			, uint32 emote1Delay = 0
			, uint32 emote2 = 0
			, uint32 emote2Delay = 0
			, uint32 menu_id = 0
	);

	void GossipSendTextMenuGendered(
			  TSObject sender
			, TSString male
			, TSString female
			, uint32 language = 0
			, uint32 emote0 = 0
			, uint32 emote0Delay = 0
			, uint32 emote1 = 0
			, uint32 emote1Delay = 0
			, uint32 emote2 = 0
			, uint32 emote2Delay = 0
			, uint32 menu_id = 0
	);

	void GossipClearMenu();
	void StartTaxi(uint32 pathId);
	void GossipSendPOI(float x, float y, uint32 icon, uint32 flags, uint32 data, TSString iconText);
	void GossipAddQuests(TSWorldObject source);
	void SendQuestTemplate(uint32 questId, bool activateAccept);
	void SpawnBones();
	void RemovedInsignia(TSPlayer looter);
  TSBattlegroundPlayer GetBGPlayer();
  TSBattleground GetBG();
	TSInstance GetInstance();

	bool GroupInvite(TSPlayer invited);
	TSGroup GroupCreate(TSPlayer invited);
	void SendCinematicStart(uint32 CinematicSequenceId);
	void SendMovieStart(uint32 MovieId);
	void SendMail(uint8 senderType, uint64 from, TSString subject, TSString body, uint32 money = 0, uint32 cod = 0, uint32 delay = 0, TSArray<TSItem> items = TSArray<TSItem>());
	bool CanBeTank();
	bool CanBeHealer();
	bool CanBeDPS();
	bool CanBeLeader();

  uint8 GetHairStyle();
  void SetHairStyle(uint8 style);

  uint8 GetHairColor();
  void SetHairColor(uint8 color);

  uint8 GetFacialStyle();
  void SetFacialStyle(uint8 style);

  uint8 GetSkinColor();
  void SetSkinColor(uint8 color);

  uint8 GetFace();
  void SetFace(uint8 face);

  void SendUpdateWorldState(uint32 worldState, uint32 value);

  void SendUpdateEventStates(uint32 eventId);

	TSArray<TSMail> GetMails();
	void RemoveMail(uint32 id);

	TSOutfit GetOutfitCopy(uint32_t settings = Outfit::EVERYTHING, int32_t race = -1, int32_t gender = -1);

private:
		std::string LGetGuildName();
		std::string LGetPlayerIP();
		std::string LGetAccountName();
		void LWhisper(std::string const& text, uint32 lang, TSPlayer receiver, uint64 guid);
		void LTextEmote(std::string const& text);
		void LYell(std::string const& text, uint32 lang);
		void LSay(std::string const& text, uint32 lang);
		void LSendBroadcastMessage(std::string const& message);
		void LSendAreaTriggerMessage(std::string const& msg);
		void LSendNotification(std::string const& msg);
		void LSendAddonMessage(std::string const& prefix, std::string const& message, uint8 channel, TSPlayer receiver);

		void LGossipMenuAddItem0(uint32 _icon, std::string const& msg, uint32 _sender, uint32 _intid, bool _code, std::string const& _promptMsg, uint32 _money);
		void LGossipMenuAddItem1(uint32 _icon, std::string const& msg, uint32 _sender, uint32 _intid, bool _code, std::string const& _promptMsg);
		void LGossipMenuAddItem2(uint32 _icon, std::string const& msg, uint32 _sender, uint32 _intid, bool _code);
		void LGossipMenuAddItem3(uint32 _icon, std::string const& msg, uint32 _sender, uint32 _intid);
		void LGossipMenuAddItem4(uint32 _icon, std::string const& msg, uint32 _sender);
		void LGossipMenuAddItem5(uint32 _icon, std::string const& msg);

		void LGossipSendTextMenu0(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2, uint32 emote2Delay, uint32 menu_id);
		void LGossipSendTextMenu1(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2, uint32 emote2Delay);
		void LGossipSendTextMenu2(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2);
		void LGossipSendTextMenu3(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay);
		void LGossipSendTextMenu4(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1);
		void LGossipSendTextMenu5(TSObject sender, std::string const& str, uint32 language, uint32 emote0, uint32 emote0Delay);
		void LGossipSendTextMenu6(TSObject sender, std::string const& str, uint32 language, uint32 emote0);
		void LGossipSendTextMenu7(TSObject sender, std::string const& str, uint32 language);
		void LGossipSendTextMenu8(TSObject sender, std::string const& str);

		void LGossipSendTextMenuGendered0(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2, uint32 emote2Delay, uint32 menu_id);
		void LGossipSendTextMenuGendered1(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2, uint32 emote2Delay);
		void LGossipSendTextMenuGendered2(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay, uint32 emote2);
		void LGossipSendTextMenuGendered3(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1, uint32 emote1Delay);
		void LGossipSendTextMenuGendered4(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay, uint32 emote1);
		void LGossipSendTextMenuGendered5(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0, uint32 emote0Delay);
		void LGossipSendTextMenuGendered6(TSObject sender, std::string const& male, std::string const& female, uint32 language, uint32 emote0);
		void LGossipSendTextMenuGendered7(TSObject sender, std::string const& male, std::string const& female, uint32 language);
		void LGossipSendTextMenuGendered8(TSObject sender, std::string const& male, std::string const& female);

		void LGossipSendPOI(float x, float y, uint32 icon, uint32 flags, uint32 data, std::string const& iconText);

		void LSendMail0(uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod, uint32 delay, sol::table items);
		void LSendMail1(uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod, uint32 delay);
		void LSendMail2(uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money, uint32 cod);
		void LSendMail3(uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money);
		void LSendMail4(uint8 senderType, uint64 from, std::string const& subject, std::string const& body);

		TSOutfit LGetOutfitCopy0(uint32_t settings, int32_t race, int32_t gender);
		TSOutfit LGetOutfitCopy1(uint32_t settings, int32_t race);
		TSOutfit LGetOutfitCopy2(uint32_t settings);
		TSOutfit LGetOutfitCopy3();

		void LKillPlayer0(bool durability);
		void LKillPlayer1();

		TSItem LAddItem0(uint32 itemId, uint32 itemCount, int32 propertyId);
		TSItem LAddItem1(uint32 itemId, uint32 itemCount);

		void LAddItemToSlotRaw0(uint8 bag, uint8 slot, uint32 itemId, uint32 count, int32 propertyId);
		void LAddItemToSlotRaw1(uint8 bag, uint8 slot, uint32 itemId, uint32 count);

		void LRemoveItem0(TSItem item, uint32 itemCount);
		void LRemoveItem1(TSItem item);

		void LRemoveItemByEntry0(uint32 entry, uint32 itemCount);
		void LRemoveItemByEntry1(uint32 entry);

		void LLearnClassSpells0(bool trainer, bool quests, bool limitQuestsByLevel);
		void LLearnClassSpells1(bool trainer, bool quests);

		void LGossipSendMenu0(uint32 npc_text, TSObject sender, uint32 menu_id);
		void LGossipSendMenu1(uint32 npc_text, TSObject sender);
		friend class TSLuaState;
};
