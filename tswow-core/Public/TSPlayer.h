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
#include "TSClasses.h"
#include "TSUnit.h"
#include "TSOutfit.h"
#include "TSDBJson.h"

#include <sol/sol.hpp>

class TSJsonObject;
class TSJsonArray;
class TSBattleground;
class TSBattlegroundPlayer;
class TSInstance;
class TSPlayerSpell;
class TSItemEntry;
class TSGUID;

struct TSMail;
class TC_GAME_API TSPlayer : public TSUnit, public TSDBJsonProvider {
public:
	Player* player;
	TSPlayer(Player* player);
	TSPlayer();
	TSPlayer* operator->() { return this;}
	bool IsNull() { return player == nullptr; };
	TSDBJson* get_json() override;
	bool CanTitanGrip();
	bool HasRunes();
	bool HasTalent(uint32 spellId, uint8 spec);
	bool HasAchieved(uint32 achievementId);
	bool HasQuest(uint32 quest);
	bool HasSkill(uint32 skill);
	bool HasSpell(uint32 id);
	TSDictionary<TSNumber<uint32>, TSPlayerSpell> GetSpellMap();
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
	TSNumber<uint8> GetSpecsCount(uint32 entry, uint32 mapid, uint32 zone);
	TSNumber<uint32> GetActiveSpec();
	TSNumber<uint32> GetPhaseMaskForSpawn();
	TSNumber<uint32> GetArenaPoints();
	TSNumber<uint32> GetHonorPoints();
	TSNumber<uint32> GetShieldBlockValue();
	TSNumber<uint32> GetSpellCooldownDelay(uint32 spellId);
	TSNumber<uint32> GetLatency();
	TSNumber<uint32> GetChampioningFaction();
	TSNumber<uint8> GetOriginalSubGroup();
	TSGroup GetOriginalGroup();
	TSPlayer GetNextRandomRaidMember(float radius);
	TSNumber<uint8> GetSubGroup();
	TSGroup GetGroupInvite();
	TSNumber<uint32> GetXPRestBonus(uint32 xp);
	TSNumber<uint32> GetBGTypeID();
	TSNumber<uint32> GetBattlegroundID();
	TSNumber<uint32> GetReputationRank(uint32 faction);
	TSNumber<uint16> GetDrunkValue();
	TSNumber<int16> GetSkillTempBonusValue(uint32 skill);
	TSNumber<int16> GetSkillPermBonusValue(uint32 skill);
	TSNumber<uint16> GetPureSkillValue(uint32 skill);
	TSNumber<uint16> GetBaseSkillValue(uint32 skill);
	TSNumber<uint16> GetSkillValue(uint32 skill);
	TSNumber<uint16> GetPureMaxSkillValue(uint32 skill);
	TSNumber<uint16> GetMaxSkillValue(uint32 skill);
	TSNumber<float> GetManaBonusFromIntellect();
	TSNumber<float> GetHealthBonusFromStamina();
	TSNumber<int32> GetDifficulty(bool isRaid);
	TSNumber<uint32> GetGuildRank();
	TSNumber<uint32> GetFreeTalentPoints();
	TSNumber<uint32> GetTalentPointsInTree(uint32 tabId);
	TSNumber<uint32> GetQuestRewardTempTalentPoints();
	TSNumber<uint32> GetQuestRewardPermTalentPoints();
	TSNumber<uint32> GetFreeInventorySpace();
	std::string GetGuildName();
	TSNumber<int32> GetReputation(uint32 faction);
	TSUnit GetComboTarget();
	TSNumber<uint8> GetComboPoints();
	TSNumber<uint32> GetInGameTime();
	TSNumber<uint32> GetQuestStatus(uint32 entry);
	bool GetQuestRewardStatus(uint32 questId);
	TSNumber<uint16> GetReqKillOrCastCurrentCount(uint32 questId, int32 entry);
	TSNumber<uint32> GetQuestLevel(TSQuest quest);
	TSItem  GetEquippedItemBySlot(uint8 slot);
	TSNumber<float> GetRestBonus();
	TSNumber<uint8> GetChatTag();
	void SetBankBagSlotCount(uint8 count);
	TSItem GetItemByPos(uint8 bag, uint8 slot);
	TSItem GetItemByGUID(TSGUID guid);
	TSItem GetItemByGUID(TSNumber<uint32> guid);
	TSItem GetItemByEntry(uint32 entry);
	TSNumber<uint32> GetGossipTextID(TSWorldObject obj);
	TSUnit GetSelection();
	TSUnit GetGlobalSelection();
	TSNumber<uint32> GetGMRank();
	TSNumber<uint32> GetGuildID();
	TSNumber<uint32> GetTeam();
	TSNumber<uint32> GetTeamID();
	TSNumber<uint32> GetItemCount(uint32 entry, bool checkinBank);
	TSNumber<uint32> GetLifetimeKills();
	std::string GetPlayerIP();
	TSNumber<uint32> GetLevelPlayedTime();
	TSNumber<uint32> GetTotalPlayedTime();
	TSGuild GetGuild();
	TSGroup GetGroup();
	TSNumber<uint32> GetAccountID();
	std::string GetAccountName();
	TSCorpse GetCorpse();
	TSNumber<int> GetDbLocaleIndex();
	TSNumber<uint32> GetDbcLocale();
	void RemoveAllItemMods();
	void RemoveItemMods(TSItem item, uint8 slot);
	void ApplyAllItemMods();
	void ApplyItemMods(TSItem item, uint8 slot, bool apply, bool updateAuras);
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
	TSNumber<uint32> GetMoney();
  bool TryAddMoney(uint32 amt);
  bool TryReduceMoney(uint32 amt);

	void SetBindPoint(float x, float y, float z, uint32 mapId, uint32 areaId);
	void SetKnownTitle(uint32 id);
	void UnlockAchievement(uint32 entry);
	void ResetPetTalents(int32 pType);
	void ResetAchievements();
	void SendShowMailBox(TSGUID guid);
	void SendShowMailBox(TSNumber<uint32> guid);
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
	void SendItemQueryPacket(TSItemTemplate curItem);
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
	TSNumber<uint32> DurabilityRepair(uint16 position, bool cost, float discountMod);
	TSNumber<uint32> DurabilityRepairAll(bool cost, float discountMod, bool guildBank);
	void DurabilityPointLossForEquipSlot(int32 slot);
	void DurabilityPointsLossAll(int32 points, bool inventory);
	void DurabilityPointsLoss(TSItem item, int32 points);
	void DurabilityLoss(TSItem item, double percent);
	void DurabilityLossAll(double percent, bool inventory);
	void KillPlayer(bool durability = false);
	void RemoveFromGroup();
	TSNumber<uint32> ResetTalentsCost();
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
	void Whisper(std::string const& text, uint32 lang, TSPlayer receiver);
	void TextEmote(std::string const& text);
	void Yell(std::string const& text, uint32 lang);
	void Say(std::string const& text, uint32 lang);
	void GiveXP(uint32 xp, TSUnit victim);
	void SetXP(uint32 xp);
	TSNumber<uint32> GetXP();
	void AddXP(uint32 xp);
	void ToggleDND();
	void ToggleAFK();
	TSItem EquipItem(TSItem item, uint32 slot);
	TSItem EquipItem(uint32 entry, uint32 slot);
	bool CanEquipItem(TSItem item, uint32 slot, uint32 entry);
	TSNumber<float> GetAverageItemLevel();
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
	void SendBroadcastMessage(std::string const& message);
	void SendAreaTriggerMessage(std::string const& msg);
	void SendNotification(std::string const& msg);
	void SendPacketPlayer(TSWorldPacket data, bool selfOnly);
	void SendPacketPlayer(std::shared_ptr<TSWorldPacket> data, bool selfOnly);
	void SendAddonMessage(std::string const& prefix, std::string const& message, uint8 channel, TSPlayer receiver);
	void KickPlayer();
	void ModifyMoney(int32 amt);
	void LearnSpell(uint32 id);
	void LearnTalent(uint32 id, uint32 rank);
	void LearnClassSpells(bool trainer, bool quests, bool limitQuestsByLevel = false);
	void ResurrectPlayer(float percent, bool sickness);
	bool SetTaximaskNode(uint32 nodeidx);
	bool IsTaximaskNodeKnown(uint32 nodeidx);
	void GossipMenuAddItem(uint32 _icon, std::string const& msg, uint32 _sender = 0, uint32 _intid = 0, bool _code = false, std::string const& _promptMsg = "", uint32 _money = 0);
	void GossipComplete();
	void GossipSendMenu(uint32 npc_text, TSObject sender, uint32 menu_id = 0);
	void GossipSendTextMenu(
			  TSObject sender
			, std::string const& str
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
			, std::string const& male
			, std::string const& female
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
	void GossipSendPOI(float x, float y, uint32 icon, uint32 flags, uint32 data, std::string const& iconText);
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
	void SendMail(uint8 senderType, uint64 from, std::string const& subject, std::string const& body, uint32 money = 0, uint32 cod = 0, uint32 delay = 0, TSArray<TSItem> items = TSArray<TSItem>(), TSArray<TSItemEntry> itemEntries = TSArray<TSItemEntry>());
	bool CanBeTank();
	bool CanBeHealer();
	bool CanBeDPS();
	bool CanBeLeader();

	TSNumber<uint8> GetHairStyle();
  void SetHairStyle(uint8 style);

	TSNumber<uint8> GetHairColor();
  void SetHairColor(uint8 color);

	TSNumber<uint8> GetFacialStyle();
  void SetFacialStyle(uint8 style);

	TSNumber<uint8> GetSkinColor();
  void SetSkinColor(uint8 color);

	TSNumber<uint8> GetFace();
  void SetFace(uint8 face);

  void SendUpdateWorldState(uint32 worldState, uint32 value);

  void SendUpdateEventStates(uint32 eventId);

	TSArray<TSMail> GetMails();
	void RemoveMail(uint32 id);

	TSOutfit GetOutfitCopy(uint32_t settings = Outfit::EVERYTHING, int32_t race = -1, int32_t gender = -1);

	void SendQuestGiverStatusMultiple();

	TSNumber<uint32> GetXPForDifficulty(uint8 difficulty);

	bool GetRandomWinner();
private:
		TSLua::Dictionary<TSNumber<uint32>, TSPlayerSpell> LGetSpellMap();
		TSItem LGetItemByGUID0(TSGUID guid);
		TSItem LGetItemByGUID1(TSNumber<uint32> guid);

		void LSendShowMailBox0(TSGUID guid);
		void LSendShowMailBox1(TSNumber<uint32> guid);
		friend class TSLua;
};

LUA_PTR_TYPE(TSPlayer)
