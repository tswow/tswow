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
type int = number;
type float = number;
type double = number;
type long = number;
type int8 = number;
type uint8 = number;
type uint16 = number;
type int16 = number;
type uint32 = number;
type int32 = number;
type uint64 = number;
type int64 = number;
type bool = boolean;
type TSArray<T> = T[];
type TSString = string;

declare const enum Gender /**@realType:uint8 */ {
    MALE   = 0,
    FEMALE = 1
}

declare const enum Race /** @realType: uint8 */ {
    HUMAN    = 1,
    ORC      = 2,
    DWARF    = 3,
    NIGHTELF = 4,
    UNDEAD   = 5,
    TAUREN   = 6,
    GNOME    = 7,
    TROLL    = 8,
    BLOODELF = 10,
    DRAENEI  = 11,
}
declare type RaceID = Race | uint8

declare const enum Class /** @realType: uint8 */ {
    WARRIOR = 1,
    PALADIN = 2,
    HUNTER = 3,
    ROGUE = 4,
    PRIEST = 5,
    DEATH_KNIGHT = 6,
    SHAMAN = 7,
    MAGE = 8,
    WARLOCK = 9,
    DRUID = 10,
}
declare type ClassID = Class | uint8

declare const enum TimerFlags {} /** TSWorldEntity.h:TimerFlags */
declare const enum TimerLoops {} /** TSWorldEntity.h:TimerLoops */
declare const enum Outfit {} /** TSOutfit.h:Outfit */
declare const enum SpellCastResult {} /** SharedDefines.h:SpellCastResult */
declare const enum EquipmentSlots {} /** Player.h:EquipmentSlots */
declare const enum InventorySlots /**@realType:uint32*/{
    BAG_1 = 19,
    BAG_2 = 20,
    BAG_3 = 21,
    BAG_4 = 22
}
declare const enum CorpseType {} /** Corpse.h:CorpseType */
declare const enum CreatureFamily {} /** SharedDefines.h:CreatureFamily */
declare const enum RemoveMethod {} /** SharedDefines.h:RemoveMethod */
declare const enum QuestFlags {} /** QuestDef.h:QuestFlags */
declare const enum TeamId {} /** SharedDefines.h:TeamId */
declare const enum WeatherType {} /** SharedDefines.h:WeatherType */
declare const enum GOState {} /** SharedDefines.h:GOState */
declare const enum LootState {} /** GameObject.h:LootState */
declare const enum TempSummonType {} /** ObjectDefines.h:TempSummonType */
declare const enum TypeID {} /** ObjectGuid.h:TypeID */
declare const enum CurrentSpellTypes {} /** Unit.h:CurrentSpellTypes */
declare const enum Powers /**@realType:int8 */ {
    HEALTH                        = -2,
    MANA                          = 0,
    RAGE                          = 1,
    FOCUS                         = 2,
    ENERGY                        = 3,
    HAPPINESS                     = 4,
    RUNE                          = 5,
    RUNIC_POWER                   = 6,
} /**@realType:int8 */
declare const enum CreatureType {} /** SharedDefines.h:CreatureType */
declare const enum ReactStates {} /** UnitDefines.h:ReactStates */
declare const enum LocaleConstant {} /** Common.h:LocaleConstant */
declare const enum UnitMoveType {} /** UnitDefines.h:UnitMoveType */
declare const enum MovementGeneratorType {} /** MovementDefines.h:MovementGeneratorType */
declare const enum SheathState {} /** UnitDefines.h:SheathState */
declare const enum SpellSchools {} /** SharedDefines.h:SpellSchools */
declare const enum SpellSchoolMask /**@realType:uint32 */ {
    NONE    = 0,
    NORMAL  = 1,
    HOLY    = 2,
    FIRE    = 4,
    NATURE  = 8,
    FROST   = 16,
    SHADOW  = 32,
    ARCANE  = 64,
}
declare const enum GossipOptionIcon {} /** GossipDef.h:GossipOptionIcon */
declare const enum ProgressType {} /** AchievementMgr.h:ProgressType */

declare const enum WeaponAttackType {} /** SharedDefines.h:WeaponAttackType */

declare const enum RuneType {} /** Player.h:RuneType */

declare const enum AuraRemoveMode {} /** SpellAuraDefines.h:AuraRemoveMode */

declare const enum Stats {} /** SharedDefines.h:Stats */

declare const enum Mechanics { } /** SharedDefines.h:Mechanics */

declare const enum SpellEffects { } /** SharedDefines.h:SpellEffects */

declare const enum AuraType { } /** SpellAuraDefines.h:AuraType */

declare const enum SpellEffIndex { } /** SharedDefines.h:SpellEffIndex */

declare const enum SpellEffectHandleMode { } /** Spell.h:SpellEffectHandleMode */

declare const enum SpellFinishReason { } /** Spell.h:SpellFinishReason */

declare interface TSMutable<T> {
    constructor(field: T);
    get() : T;
    set(value: T) : void;
}

declare interface TSMutex {
    lock();
    unlock();
    try_lock(): bool;
}

// should not be interface,
// will make it look like {x:0,y:0,z:0,o:0,map:0} is legal
declare class TSPosition {
    x: float;
    y: float;
    z: float;
    o: float;
    map: uint32;
}

interface Array<T> {
    get(index: number): T;
    set(index: number, value: T);
}

declare interface TSMutableString extends TSMutable<string>{}

declare interface TSChatChannel {
    GetName(locale?: uint32) : string;
    GetID() : uint32;
    IsConstant(): bool;
    IsLFG(): bool;
    IsAnnounce(): bool;
    SetAnnounce(announce: bool): void;
    SetDirty();
    SetPassword(password: string): void;
    CheckPassword(password: string): bool;
    GetNumPlayers(): uint32;
    GetFlags(): uint8;
    HasFlag(flag: uint8): bool;
    JoinChannel(player: TSPlayer, send?: boolean): void;
    SetInvisible(player: TSPlayer, on: bool): void;
    SetOwner(guid: uint64, exclaim?: bool): void;
    Say(guid: uint64, what: string, lang: uint32): void;
}

declare interface TSAchievementEntry
{
    GetEntry(): uint32;
    GetFaction(): int32;
    GetInstanceID(): int32;
    GetTitles(): TSArray<TSString>;
    GetCategory(): uint32;
    GetPoints(): uint32;
    GetFlags(): uint32;
    GetMinimumCriteria(): uint32;
    GetSharesCriteria(): uint32;
}

declare interface TSAchievementCriteriaEntry
{
    GetEntry(): uint32;
    GetAchievementEntry(): uint32;
    GetType(): uint32;
    GetAssetID(): uint32;
    GetQuantity(): uint32;
    GetAdditionalType1(): uint32;
    GetAdditionalAsset1(): uint32;
    GetAdditionalType2(): uint32;
    GetAdditionalAsset2(): uint32;
    GetFlags(): uint32;
    GetStartEvent(): uint32;
    GetStartAsset(): uint32;
    GetStartTimer(): uint32;
}

declare interface TSPlayer extends TSUnit {
    LearnClassSpells(trainer: boolean, quests: boolean, limitQuestsByLevel?: boolean);
    SendData(data: any)
    SendUpdateWorldState(worldState: uint32, value: uint32);
    SetBankBagSlotCount(count: uint8)
    AddItemToSlotRaw(bag: uint8, slot: uint8, itemId: uint32, count: uint32, propertyId?: int32)

    CanBeTank(): bool
    CanBeHealer(): bool
    CanBeDPS(): bool
    CanBeLeader(): bool

    GetBG(): TSBattleground
    GetBGPlayer(): TSBattlegroundPlayer

    /**
     * Generates a creature outfit from this player.
     *
     * - If no race/gender is provided, the players race, gender and
     * appearance is automatically copied to the creature.
     *
     * @param settings - bitmask of components that should be included in the copy
     * @param race - player race by default
     * @param gender - player gender by default
     */
    GetOutfitCopy(settings?: Outfit, race?: RaceID, gender?: Gender): TSOutfit;

    IsNull() : bool

    /**
     * Immediately sends a mail to this player
     * @param senderType
     * @param from
     * @param subject
     * @param body
     * @param money
     * @param cod
     * @param items
     */
	SendMail(senderType: uint8, from: uint64, subject: string, body: string, money? : uint32, cod? : uint32, items? : TSArray<TSItem>);

    /**
     * Returns 'true' if the [Player] can Titan Grip, 'false' otherwise.
     *
     * @return bool canTitanGrip
     */
    CanTitanGrip() : bool

    /**
     * Returns 'true' if the [Player] has a talent by ID in specified spec, 'false' otherwise.
     *
     * @param uint32 spellId : talent spellId to check
     * @param uint8 spec : specified spec. 0 for primary, 1 for secondary.
     * @return bool hasTalent
     */
    HasTalent(spellId : uint32,spec : uint8) : bool

    /**
     * Returns 'true' if the [Player] has completed the specified achievement, 'false' otherwise.
     *
     * @param uint32 achievementId
     * @return bool hasAchieved
     */
    HasAchieved(achievementId : uint32) : bool

    /**
     * Returns 'true' if the [Player] has an active [Quest] by specific ID, 'false' otherwise.
     *
     * @param uint32 questId
     * @return bool hasQuest
     */
    HasQuest(quest : uint32) : bool

    /**
     * Returns 'true' if the [Player] has a skill by specific ID, 'false' otherwise.
     *
     * @param uint32 skill
     * @return bool hasSkill
     */
    HasSkill(skill : uint32) : bool

    /**
     * Returns 'true' if the [Player] has a [Spell] by specific ID, 'false' otherwise.
     *
     * @param uint32 spellId
     * @return bool hasSpell
     */
    HasSpell(id : uint32) : bool

    /**
     * Returns true if [Player] has specified login flag
     *
     * @param uint32 flag
     * @return bool hasLoginFlag
     */
    HasAtLoginFlag(flag : uint32) : bool

    /**
     * Returns true if [Player] has [Quest] for [GameObject]
     *
     * @param int32 entry : entry of a [GameObject]
     * @return bool hasQuest
     */
    HasQuestForGO(entry : int32) : bool

    /**
     * Returns 'true' if the [Player] has a title by specific ID, 'false' otherwise.
     *
     * @param uint32 titleId
     * @return bool hasTitle
     */
    HasTitle(id : uint32) : bool

    /**
     * Returns 'true' if the [Player] has the given amount of item entry specified, 'false' otherwise.
     *
     * @param uint32 itemId : entry of the item
     * @param uint32 count = 1 : amount of items the player needs should have
     * @param bool check_bank = false : determines if the item can be in player bank
     * @return bool hasItem
     */
    HasItem(itemId : uint32,count : uint32,check_bank : bool) : bool

    /**
     * Returns 'true' if the [Player] has a quest for the item entry specified, 'false' otherwise.
     *
     * @param uint32 entry : entry of the item
     * @return bool hasQuest
     */
    HasQuestForItem(entry : uint32) : bool

    /**
     * Returns 'true' if the [Player] can use the item or item entry specified, 'false' otherwise.
     *
     * @proto canUse = (item)
     * @proto canUse = (entry)
     * @param [Item] item : an instance of an item
     * @param uint32 entry : entry of the item
     * @return bool canUse
     */
    CanUseItem(item : TSItem,entry : uint32) : bool

    /**
     * Returns 'true' if the [Spell] specified by ID is currently on cooldown for the [Player], 'false' otherwise.
     *
     * @param uint32 spellId
     * @return bool hasSpellCooldown
     */
    HasSpellCooldown(spellId : uint32) : bool

    /**
     * Returns 'true' if the [Player] can share [Quest] specified by ID, 'false' otherwise.
     *
     * @param uint32 entryId
     * @return bool hasSpellCooldown
     */
    CanShareQuest(entry : uint32) : bool

    /**
     * Returns 'true' if the [Player] can currently communicate through chat, 'false' otherwise.
     *
     * @return bool canSpeak
     */
    CanSpeak() : bool

    /**
     * Returns 'true' if the [Player] has permission to uninvite others from the current group, 'false' otherwise.
     *
     * @return bool canUninviteFromGroup
     */
    CanUninviteFromGroup() : bool

    /**
     * Returns 'true' if the [Player] can fly, 'false' otherwise.
     *
     * @return bool canFly
     */
    CanFly() : bool

    /**
     * Returns 'true' if the [Player] is currently in water, 'false' otherwise.
     *
     * @return bool isInWater
     */
    IsInWater() : bool

    /**
     * Returns 'true' if the [Player] is currently moving, 'false' otherwise.
     *
     * @return bool isMoving
     */
    IsMoving() : bool

    /**
     * Returns 'true' if the [Player] is currently flying, 'false' otherwise.
     *
     * @return bool isFlying
     */
    IsFlying() : bool

    /**
     * Returns 'true' if the [Player] is in a [Group], 'false' otherwise.
     *
     * @return bool isInGroup
     */
    IsInGroup() : bool

    /**
     * Returns 'true' if the [Player] is in a [Guild], 'false' otherwise.
     *
     * @return bool isInGuild
     */
    IsInGuild() : bool

    /**
     * Returns 'true' if the [Player] is a Game Master, 'false' otherwise.
     *
     * Note: This is only true when GM tag is activated! For alternative see [Player:GetGMRank]
     *
     * @return bool isGM
     */
    IsGM() : bool

    /**
     * Returns 'true' if the [Player] is in an arena team specified by type, 'false' otherwise.
     *
     * @param uint32 type
     * @return bool isInArenaTeam
     */
    IsInArenaTeam(type : uint32) : bool

    /**
     * Returns 'true' if the [Player] is immune to everything.
     *
     * @return bool isImmune
     */
    IsImmuneToDamage() : bool

    /**
     * Returns 'true' if the [Player] satisfies all requirements to complete the quest entry.
     *
     * @param uint32 entry
     * @return bool canComplete
     */
    CanCompleteQuest(entry : uint32) : bool

    /**
     * Returns 'true' if the [Player] is a part of the Horde faction, 'false' otherwise.
     *
     * @return bool isHorde
     */
    IsHorde() : bool

    /**
     * Returns 'true' if the [Player] is a part of the Alliance faction, 'false' otherwise.
     *
     * @return bool isAlliance
     */
    IsAlliance() : bool

    /**
     * Returns 'true' if the [Player] is 'Do Not Disturb' flagged, 'false' otherwise.
     *
     * @return bool isDND
     */
    IsDND() : bool

    /**
     * Returns 'true' if the [Player] is 'Away From Keyboard' flagged, 'false' otherwise.
     *
     * @return bool isAFK
     */
    IsAFK() : bool

    /**
     * Returns 'true' if the [Player] is currently falling, 'false' otherwise.
     *
     * @return bool isFalling
     */
    IsFalling() : bool
    IsGroupVisibleFor(target : TSPlayer) : bool

    /**
     * Returns 'true' if the [Player] is currently in the same raid as another [Player] by object, 'false' otherwise.
     *
     * @param [Player] player
     * @return bool isInSameRaidWith
     */
    IsInSameRaidWith(target : TSPlayer) : bool

    /**
     * Returns 'true' if the [Player] is currently in the same [Group] as another [Player] by object, 'false' otherwise.
     *
     * @param [Player] player
     * @return bool isInSameGroupWith
     */
    IsInSameGroupWith(target : TSPlayer) : bool

    /**
     * Returns 'true' if the [Player] is eligible for Honor or XP gain by [Unit] specified, 'false' otherwise.
     *
     * @param [Unit] unit
     * @return bool isHonorOrXPTarget
     */
    IsHonorOrXPTarget(victim : TSUnit) : bool

    /**
     * Returns 'true' if the [Player] can see anoter [Player] specified by object, 'false' otherwise.
     *
     * @param [Player] player
     * @return bool isVisibleForPlayer
     */
    IsVisibleForPlayer(target : TSPlayer) : bool
    IsGMVisible() : bool

    /**
     * Returns 'true' if the [Player] has taxi cheat activated, 'false' otherwise.
     *
     * @return bool isTaxiCheater
     */
    IsTaxiCheater() : bool
    IsGMChat() : bool

    /**
     * Returns 'true' if the [Player] is accepting whispers, 'false' otherwise.
     *
     * @return bool isAcceptingWhispers
     */
    IsAcceptingWhispers() : bool

    /**
     * Returns 'true' if the [Player] is currently rested, 'false' otherwise.
     *
     * @return bool isRested
     */
    IsRested() : bool

    /**
     * Returns 'true' if the [Player] is currently in a [BattleGround] queue, 'false' otherwise.
     *
     * @return bool inBattlegroundQueue
     */
    InBGQueue() : bool

    /**
     * Returns 'true' if the [Player] is currently in an arena, 'false' otherwise.
     *
     * @return bool inArena
     */
    InArena() : bool

    /**
     * Returns 'true' if the [Player] is currently in a [BattleGround], 'false' otherwise.
     *
     * @return bool inBattleGround
     */
    InBG() : bool

    /**
     * Returns 'true' if the [Player] can block incomming attacks, 'false' otherwise.
     *
     * @return bool canBlock
     */
    CanBlock() : bool

    /**
     * Returns 'true' if the [Player] can parry incomming attacks, 'false' otherwise.
     *
     * @return bool canParry
     */
    CanParry() : bool

    /**
     * Returns the amount of available specs the [Player] currently has
     *
     * @return uint8 specCount
     */
    GetSpecsCount(entry : uint32,mapid : uint32,zone : uint32) : uint8

    /**
     * Returns the [Player]s active spec ID
     *
     * @return uint32 specId
     */
    GetActiveSpec() : uint32

    /**
     * Returns the normal phase of the player instead of the actual phase possibly containing GM phase
     *
     * @return uint32 phasemask
     */
    GetPhaseMaskForSpawn() : uint32

    /**
     * Returns the [Player]s current amount of Arena Points
     *
     * @return uint32 arenaPoints
     */
    GetArenaPoints() : uint32

    /**
     * Returns the [Player]s current amount of Honor Points
     *
     * @return uint32 honorPoints
     */
    GetHonorPoints() : uint32

    /**
     * Returns the [Player]s current shield block value
     *
     * @return uint32 blockValue
     */
    GetShieldBlockValue() : uint32

    /**
     * Returns the [Player]s cooldown delay by specified [Spell] ID
     *
     * @param uint32 spellId
     * @return uint32 spellCooldownDelay
     */
    GetSpellCooldownDelay(spellId : uint32) : uint32

    /**
     * Returns the [Player]s current latency in MS
     *
     * @return uint32 latency
     */
    GetLatency() : uint32

    /**
     * Returns the faction ID the [Player] is currently flagged as champion for
     *
     * @return uint32 championingFaction
     */
    GetChampioningFaction() : uint32

    /**
     * Returns [Player]s original sub group
     *
     * @return uint8 subGroup
     */
    GetOriginalSubGroup() : uint8

    /**
     * Returns [Player]s original [Group] object
     *
     * @return [Group] group
     */
    GetOriginalGroup() : TSGroup

    /**
     * Returns a random Raid Member [Player] object within radius specified of [Player]
     *
     * @param float radius
     * @return [Player] player
     */
    GetNextRandomRaidMember(radius : float) : TSPlayer

    /**
     * Returns [Player]s current sub group
     *
     * @return uint8 subGroup
     */
    GetSubGroup() : uint8

    /**
     * Returns [Group] invitation
     *
     * @return [Group] group
     */
    GetGroupInvite() : TSGroup

    /**
     * Returns rested experience bonus
     *
     * @param uint32 xp
     * @return uint32 xpBonus
     */
    GetXPRestBonus(xp : uint32) : uint32

    /**
     * Returns the [Player]s current [BattleGround] type ID
     *
     * @return [BattleGroundTypeId] typeId
     */
    GetBGTypeID() : uint32

    /**
     * Returns the [Player]s current [BattleGround] ID
     *
     * @return uint32 battleGroundId
     */
    GetBattlegroundID() : uint32

    /**
     * Returns the [Player]s reputation rank of faction specified
     *
     * @param uint32 faction
     * @return [ReputationRank] rank
     */
    GetReputationRank(faction : uint32) : uint32

    /**
     * Returns the [Player]s current level of intoxication
     *
     * @return uint16 drunkValue
     */
    GetDrunkValue() : uint16

    /**
     * Returns skill temporary bonus value
     *
     * @param uint32 skill
     * @param int16 bonusVal
     */
    GetSkillTempBonusValue(skill : uint32) : int16

    /**
     * Returns skill permanent bonus value
     *
     * @param uint32 skill
     * @param int16 bonusVal
     */
    GetSkillPermBonusValue(skill : uint32) : int16

    /**
     * Returns skill value without bonus'
     *
     * @param uint32 skill
     * @return uint16 pureVal
     */
    GetPureSkillValue(skill : uint32) : uint16

    /**
     * Returns base skill value
     *
     * @param uint32 skill
     * @return uint16 baseVal
     */
    GetBaseSkillValue(skill : uint32) : uint16

    /**
     * Returns skill value
     *
     * @param uint32 skill
     * @return uint16 val
     */
    GetSkillValue(skill : uint32) : uint16

    /**
     * Returns max value of specified skill without bonus'
     *
     * @param uint32 skill
     * @return uint16 pureVal
     */
    GetPureMaxSkillValue(skill : uint32) : uint16

    /**
     * Returns max value of specified skill
     *
     * @param uint32 skill
     * @return uint16 val
     */
    GetMaxSkillValue(skill : uint32) : uint16

    /**
     * Returns mana bonus from amount of intellect
     *
     * @return float bonus
     */
    GetManaBonusFromIntellect() : float

    /**
     * Returns health bonus from amount of stamina
     *
     * @return float bonus
     */
    GetHealthBonusFromStamina() : float

    /**
     * Returns raid or dungeon difficulty
     *
     * @param bool isRaid = true : argument is TrinityCore only
     * @return int32 difficulty
     */
    GetDifficulty(isRaid : bool) : int32

    /**
     * Returns the [Player]s current guild rank
     *
     * @return uint32 guildRank
     */
    GetGuildRank() : uint32

    /**
     * Returns the [Player]s free talent point amount
     *
     * @return uint32 freeTalentPointAmt
     */
    GetFreeTalentPoints() : uint32

    /**
     * Returns the name of the [Player]s current [Guild]
     *
     * @return string guildName
     */
    GetGuildName() : string

    /**
     * Returns the amount of reputation the [Player] has with the faction specified
     *
     * @param uint32 faction
     * @return int32 reputationAmt
     */
    GetReputation(faction : uint32) : int32

    /**
     * Returns [Unit] target combo points are on
     *
     * @return [Unit] target
     */
    GetComboTarget() : TSUnit

    /**
     * Returns [Player]'s combo points
     *
     * @return uint8 comboPoints
     */
    GetComboPoints() : uint8

    /**
     * Returns the amount of time the [Player] has spent ingame
     *
     * @return uint32 inGameTime
     */
    GetInGameTime() : uint32

    /**
     * Returns the status of the [Player]s [Quest] specified by entry ID
     *
     * @param uint32 questId
     * @return [QuestStatus] questStatus
     */
    GetQuestStatus(entry : uint32) : uint32

    /**
     * Returns 'true' if the [Player]s [Quest] specified by entry ID has been rewarded, 'false' otherwise.
     *
     * @param uint32 questId
     * @return bool questRewardStatus
     */
    GetQuestRewardStatus(questId : uint32) : bool

    /**
     * Returns [Quest] required [Creature] or [GameObject] count
     *
     * @param uint32 quest : entry of a quest
     * @param int32 entry : entry of required [Creature]
     * @return uint16 count
     */
    GetReqKillOrCastCurrentCount(questId : uint32,entry : int32) : uint16

    /**
     * Returns the quest level of the [Player]s [Quest] specified by object
     *
     * @param uint32 questId
     * @return [QuestStatus] questRewardStatus
     */
    GetQuestLevel(quest : TSQuest) : uint32

    /**
     * Returns a [Player]s [Item] object by gear slot specified
     *
     * @param uint8 slot
     * @return [Item] item
     */
    GetEquippedItemBySlot(slot : uint8) : TSItem

    /**
     * Returns the [Player]s current resting bonus
     *
     * @return float restBonus
     */
    GetRestBonus() : float

    /**
     * Returns active GM chat tag
     *
     * @return uint8 tag
     */
    GetChatTag() : uint8

    /**
     * Returns an item in given bag on given slot.
     *
     * <pre>
     * Possible and most commonly used combinations:
     *
     * bag = 255
     * slots 0-18 equipment
     * slots 19-22 equipped bag slots
     * slots 23-38 backpack
     * slots 39-66 bank main slots
     * slots 67-74 bank bag slots
     * slots 86-117 keyring
     *
     * bag = 19-22
     * slots 0-35 for equipped bags
     *
     * bag = 67-74
     * slots 0-35 for bank bags
     * </pre>
     *
     * @param uint8 bag : the bag the [Item] is in, you can get this with [Item:GetBagSlot]
     * @param uint8 slot : the slot the [Item] is in within the bag, you can get this with [Item:GetSlot]
     * @return [Item] item : [Item] or nil
     */
    GetItemByPos(bag : uint8,slot : uint8) : TSItem

    /**
     * Returns an [Item] from the player by guid.
     *
     * The item can be equipped, in bags or in bank.
     *
     * @param uint64 guid : an item guid
     * @return [Item] item
     */
    GetItemByGUID(guid : uint64) : TSItem

    /**
     * Returns an [Item] from the player by entry.
     *
     * The item can be equipped, in bags or in bank.
     *
     * @param uint32 entryId
     * @return [Item] item
     */
    GetItemByEntry(entry : uint32) : TSItem

    /**
     * Returns the database textID of the [WorldObject]'s gossip header text for the [Player]
     *
     * @return uint32 textId : key to npc_text database table
     */
    GetGossipTextID(obj : TSWorldObject) : uint32

    /**
     * Returns the [Player]s currently selected [Unit] object
     *
     * @return [Unit] unit
     */
    GetSelection() : TSUnit

    /**
     * Returns the [Player]s GM Rank
     *
     * @return [AccountTypes] gmRank
     */
    GetGMRank() : uint32

    /**
     * Returns the [Player]s amount of money in copper
     *
     * @return uint32 money
     */
    GetMoney() : uint32

    /**
     * Returns the [Player]s current [Guild] ID
     *
     * @return uint32 guildId
     */
    GetGuildID() : uint32

    /**
     * Returns the [Player]s [TeamId]
     *
     * @return [TeamId] teamId
     */
    GetTeam() : uint32

    /**
     * Returns amount of the specified [Item] the [Player] has.
     *
     * @param uint32 entry : entry of the item
     * @param bool checkinBank = false : also counts the items in player's bank if true
     * @return uint32 itemamount
     */
    GetItemCount(entry : uint32,checkinBank : bool) : uint32

    /**
     * Returns the [Player]s lifetime Honorable Kills
     *
     * @return uint32 lifeTimeKils
     */
    GetLifetimeKills() : uint32

    /**
     * Returns the [Player]s IP address
     *
     * @return string ip
     */
    GetPlayerIP() : string

    /**
     * Returns the [Player]s time played at current level
     *
     * @return uint32 currLevelPlayTime
     */
    GetLevelPlayedTime() : uint32

    /**
     * Returns the [Player]s total time played
     *
     * @return uint32 totalPlayTime
     */
    GetTotalPlayedTime() : uint32

    /**
     * Returns the [Player]s [Guild] object
     *
     * @return [Guild] guild
     */
    GetGuild() : TSGuild

    /**
     * Returns the [Player]s [Group] object
     *
     * @return [Group] group
     */
    GetGroup() : TSGroup

    /**
     * Returns the [Player]s account ID
     *
     * @return uint32 accountId
     */
    GetAccountID() : uint32

    /**
     * Returns the [Player]s account name
     *
     * @return string accountName
     */
    GetAccountName() : string

    /**
     * Returns the [Player]s [Corpse] object
     *
     * @return [Corpse] corpse
     */
    GetCorpse() : TSCorpse

    /**
     * Returns the [Player]s database locale index
     *
     * @return int localeIndex
     */
    GetDbLocaleIndex() : int

    /**
     * Returns the [Player]s game client locale
     *
     * @return [LocaleConstant] locale
     */
    GetDbcLocale() : uint32

    /**
     * Locks the player controls and disallows all movement and casting.
     *
     * @param bool apply = true : lock if true and unlock if false
     */
    SetPlayerLock(apply : bool) : void

    /**
     * Sets the [Player]s login flag to the flag specified
     *
     * @param uint32 flag
     */
    SetAtLoginFlag(flag : uint32) : void

    /**
     * Sets the [Player]s sheathe state to the state specified
     *
     * @param uint32 sheatheState
     */
    SetSheath(sheathed : uint32) : void

    /**
     * Sets the [Player]s intoxication level to the level specified
     *
     * @param uint8 drunkValue
     */
    SetDrunkValue(newDrunkValue : uint8) : void

    /**
     * Sets the [Player]s faction standing to that of the race specified
     *
     * @param uint8 raceId
     */
    SetFactionForRace(race : uint8) : void

    /**
     * Sets (increases) skill of the [Player]
     *
     * @param uint16 id
     * @param uint16 step
     * @param uint16 currVal
     * @param uint16 maxVal
     */
    SetSkill(id : uint16,step : uint16,currVal : uint16,maxVal : uint16) : void

    /**
     * Sets the [Player]s guild rank to the rank specified
     *
     * @param uint8 rank
     */
    SetGuildRank(rank : uint8) : void

    /**
     * Sets the [Player]s free talent points to the amount specified for the current spec
     *
     * @param uint32 talentPointAmt
     */
    SetFreeTalentPoints(points : uint32) : void

    /**
     * Sets the [Player]s reputation amount for the faction specified
     *
     * @param uint32 factionId
     * @param int32 reputationValue
     */
    SetReputation(faction : uint32,value : int32) : void

    /**
     * Sets [Quest] state
     *
     * @param uint32 entry : entry of a quest
     * @param uint32 status
     */
    SetQuestStatus(entry : uint32,status : uint32) : void

    /**
     * Sets the [Player]s rest bonus to the amount specified
     *
     * @param float restBonus
     */
    SetRestBonus(bonus : float) : void

    /**
     * Toggles whether the [Player] accepts whispers or not
     *
     * @param bool acceptWhispers = true
     */
    SetAcceptWhispers(on : bool) : void

    /**
     * Toggles PvP Death
     *
     * @param bool on = true
     */
    SetPvPDeath(on : bool) : void

    /**
     * Toggles whether the [Player] has GM visibility on or off
     *
     * @param bool gmVisible = true
     */
    SetGMVisible(on : bool) : void

    /**
     * Toggles whether the [Player] has taxi cheat enabled or not
     *
     * @param bool taxiCheat = true
     */
    SetTaxiCheat(on : bool) : void

    /**
     * Toggle Blizz (GM) tag
     *
     * @param bool on = true
     */
    SetGMChat(on : bool) : void

    /**
     * Toggles the [Player]s GM mode on or off
     *
     * @param bool setGmMode = true
     */
    SetGameMaster(on : bool) : void

    /**
     * Sets the [Player]s gender to gender specified
     *
     * - GENDER_MALE    = 0
     * - GENDER_FEMALE  = 1
     *
     * @param [Gender] gender
     */
    SetGender(_gender : uint32) : void

    /**
     * Sets the [Player]s Arena Points to the amount specified
     *
     * @param uint32 arenaPoints
     */
    SetArenaPoints(arenaP : uint32) : void

    /**
     * Sets the [Player]s Honor Points to the amount specified
     *
     * @param uint32 honorPoints
     */
    SetHonorPoints(honorP : uint32) : void

    /**
     * Sets the [Player]s amount of Lifetime Honorable Kills to the value specified
     *
     * @param uint32 honorableKills
     */
    SetLifetimeKills(val : uint32) : void

    /**
     * Sets the [Player]s amount of money in copper
     *
     * @param uint32 copperAmt
     */
    SetMoney(amt : uint32) : void

    /**
     * Returns the [Player]s amount of money in copper
     */
    GetMoney() : uint32

    /**
     * Attempts to give [Player] money in copper.
     *
     * - If the given amount causes the players money to overflow,
     *   their money remains unchanged and the function returns false
     *
     * - If the given amount does not cause overflow,
     *   the money is added and the function returns true.
     *
     * @param amount
     */
    TryAddMoney(amount: uint32) : bool

    /**
     * Attempts to take money from [Player] in copper.
     *
     * - If the taken amount is higher than the players current money,
     *   their money remains unchanged and the function returns false.
     *
     * - If the taken amount is smaller than or equal to the players current
     *   money, their money remains unchanged and the function returns true.
     *
     * @param amount
     */
    TryReduceMoney(amount: uint32) : bool



    /**
     * Sets the [Player]s home location to the location specified
     *
     * @param float x : X Coordinate
     * @param float y : Y Coordinate
     * @param float z : Z Coordinate
     * @param uint32 mapId : Map ID
     * @param uint32 areaId : Area ID
     */
    SetBindPoint(x : float,y : float,z : float,mapId : uint32,areaId : uint32) : void

    /**
     * Adds the specified title to the [Player]s list of known titles
     *
     * @param uint32 titleId
     */
    SetKnownTitle(id : uint32) : void

    /**
     * Resets the [Player]s pets talent points
     */
    ResetPetTalents(pType : int32) : void

    /**
     * Reset the [Player]s completed achievements
     */
    ResetAchievements() : void

    /**
     * Shows the mailbox window to the player from specified guid.
     *
     * @param uint64 guid = playerguid : guid of the mailbox window sender
     */
    SendShowMailBox(guid : uint64) : void

    /**
     * Adds or detracts from the [Player]s current Arena Points
     *
     * @param int32 amount
     */
    ModifyArenaPoints(amount : int32) : void

    /**
     * Adds or detracts from the [Player]s current Honor Points
     *
     * @param int32 amount
     */
    ModifyHonorPoints(amount : int32) : void

    /**
     * Saves the [Player] to the database
     */
    SaveToDB() : void

    /**
     * Sends a summon request to the player from the given summoner
     *
     * @param [Unit] summoner
     */
    SummonPlayer(summoner : TSUnit) : void

    /**
     * Mutes the [Player] for the amount of seconds specified
     *
     * @param uint32 muteTime
     */
    Mute(muteseconds : uint32) : void

    /**
     * Rewards the given quest entry for the [Player] if he has completed it.
     *
     * @param uint32 entry : quest entry
     */
    RewardQuest(entry : uint32) : void

    /**
     * Sends an auction house window to the [Player] from the [Unit] specified
     *
     * @param [Unit] sender
     */
    SendAuctionMenu(unit : TSUnit) : void

    /**
     * Sends a flightmaster window to the [Player] from the [Creature] specified
     *
     * @param [Creature] sender
     */
    SendTaxiMenu(creature : TSCreature) : void

    /**
     * Sends a [Creature] cache packet to the [Player] from the [Creature] entry specified
     *
     * @param [Number] entry
     */
    SendCreatureQueryPacket(entry : number) : void

    /**
     * Sends a [GameObject] cache packet to the [Player] from the [GameObject] entry specified
     *
     * @param [Number] entry
     */
    SendGameObjectQueryPacket(entry : number) : void

    /**
     * Sends a [Item] cache packet to the [Player] from the [Item] entry specified
     *
     * @param [Number] entry
     */
    SendItemQueryPacket(entry : number) : void

    /**
     * Sends a spirit resurrection request to the [Player]
     */
    SendSpiritResurrect() : void

    /**
     * Sends a tabard vendor window to the [Player] from the [WorldObject] specified
     *
     * @param [WorldObject] sender
     */
    SendTabardVendorActivate(obj : TSWorldObject) : void

    /**
     * Sends a bank window to the [Player] from the [WorldObject] specified.
     *
     * @param [WorldObject] sender
     */
    SendShowBank(obj : TSWorldObject) : void

    /**
     * Sends a vendor window to the [Player] from the [WorldObject] specified.
     *
     * @param [WorldObject] sender
     */
    SendListInventory(obj : TSWorldObject) : void

    /**
     * Sends a trainer window to the [Player] from the [Creature] specified
     *
     * @param [Creature] sender
     */
    SendTrainerList(obj : TSCreature) : void

    /**
     * Sends a guild invitation from the [Player]s [Guild] to the [Player] object specified
     *
     * @param [Player] invitee
     */
    SendGuildInvite(plr : TSPlayer) : void

    /**
     * Forces the [Player] to log out
     *
     * @param bool saveToDb = true
     */
    LogoutPlayer(save : bool) : void

    /**
     * Forcefully removes the [Player] from a [BattleGround] raid group
     */
    RemoveFromBGRaid() : void

    /**
     * Unbinds the [Player] from his instances except the one he currently is in.
     *
     * Difficulty is not used on classic.
     *
     * @param uint32 map = true
     * @param uint32 difficulty = 0
     */
    UnbindInstance(map : uint32,difficulty : uint32) : void

    /**
     * Unbinds the [Player] from his instances except the one he currently is in.
     */
    UnbindAllInstances() : void

    /**
     * Forces the [Player] to leave a [BattleGround]
     *
     * @param bool teleToEntry = true
     */
    LeaveBG(teleToEntryPoint : bool) : void

    /**
     * Repairs [Item] at specified position. Returns total repair cost
     *
     * @param uint16 position
     * @param bool cost = true
     * @param float discountMod
     * @return uint32 totalCost
     */
    DurabilityRepair(position : uint16,cost : bool,discountMod : float) : uint32

    /**
     * Repairs all [Item]s. Returns total repair cost
     *
     * @param bool cost = true
     * @param float discountMod = 1
     * @param bool guidBank = false
     * @return uint32 totalCost
     */
    DurabilityRepairAll(cost : bool,discountMod : float,guildBank : bool) : uint32

    /**
     * Sets durability loss for an [Item] in the specified slot
     *
     * @param int32 slot
     */
    DurabilityPointLossForEquipSlot(slot : int32) : void

    /**
     * Sets durability loss on all [Item]s equipped
     *
     * If inventory is true, sets durability loss for [Item]s in bags
     *
     * @param int32 points
     * @param bool inventory = true
     */
    DurabilityPointsLossAll(points : int32,inventory : bool) : void

    /**
     * Sets durability loss for the specified [Item]
     *
     * @param [Item] item
     * @param int32 points
     */
    DurabilityPointsLoss(item : TSItem,points : int32) : void

    /**
     * Damages specified [Item]
     *
     * @param [Item] item
     * @param double percent
     */
    DurabilityLoss(item : TSItem,percent : double) : void

    /**
     * Damages all [Item]s equipped. If inventory is true, damages [Item]s in bags
     *
     * @param double percent
     * @param bool inventory = true
     */
    DurabilityLossAll(percent : double,inventory : bool) : void

    /**
     * Kills the [Player]
     * durability: whether to lose durability (false by default)
     */
    KillPlayer(durability?: boolean) : void

    /**
     * Forces the [Player] to leave a [Group]
     */
    RemoveFromGroup() : void

    /**
     * Returns the [Player]s accumulated talent reset cost
     *
     * @return uint32 resetCost
     */
    ResetTalentsCost() : uint32

    /**
     * Resets the [Player]s talents
     *
     * @param bool noCost = true
     */
    ResetTalents(no_cost : bool) : void

    /**
     * Removes the [Spell] from the [Player]
     *
     * @param uint32 entry : entry of a [Spell]
     * @param bool disabled = false
     * @param bool learnLowRank = true
     */
    RemoveSpell(entry : uint32,disabled : bool,learn_low_rank : bool) : void

    /**
     * Clears the [Player]s combo points
     */
    ClearComboPoints() : void

    /**
     * Adds combo points to the [Player]
     *
     * @param [Unit] target
     * @param int8 count
     */
    AddComboPoints(target : TSUnit,count : int8) : void

    /**
     * Gives [Quest] monster talked to credit
     *
     * @param uint32 entry : entry of a [Creature]
     * @param [Creature] creature
     */
    TalkedToCreature(entry : uint32,creature : TSCreature) : void

    /**
     * Gives [Quest] monster killed credit
     *
     * @param uint32 entry : entry of a [Creature]
     */
    KilledMonsterCredit(entry : uint32) : void

    /**
     * Completes a [Quest] if in a [Group]
     *
     * @param uint32 quest : entry of a quest
     * @param [WorldObject] obj
     */
    GroupEventHappens(questId : uint32,obj : TSWorldObject) : void

    /**
     * Completes the [Quest] if a [Quest] area is explored, or completes the [Quest]
     *
     * @param uint32 quest : entry of a [Quest]
     */
    AreaExploredOrEventHappens(questId : uint32) : void

    /**
     * Sets the given [Quest] entry failed for the [Player].
     *
     * @param uint32 entry : entry of a [Quest]
     */
    FailQuest(entry : uint32) : void

    /**
     * Sets the given quest entry incomplete for the [Player].
     *
     * @param uint32 entry : quest entry
     */
    IncompleteQuest(entry : uint32) : void

    /**
     * Completes the given quest entry for the [Player] and tries to satisfy all quest requirements.
     *
     * The player should have the quest to complete it.
     *
     * @param uint32 entry : quest entry
     */
    CompleteQuest(entry : uint32) : void
    //AddQuest(entry : uint32) : void

    /**
     * Removes the given quest entry from the [Player].
     *
     * @param uint32 entry : quest entry
     */
    RemoveQuest(entry : uint32) : void

    /**
     * Sends whisper text from the [Player]
     *
     * @param string text
     * @param uint32 lang : language the [Player] will speak
     * @param [Player] receiver : is the [Player] that will receive the whisper, if TrinityCore
     * @param uint64 guid : is the GUID of a [Player] that will receive the whisper, not TrinityCore
     */
    Whisper(text : string,lang : uint32,receiver : TSPlayer,guid : uint64) : void

    /**
     * Sends a text emote from the [Player]
     *
     * @param string emoteText
     */
    TextEmote(text : string) : void

    /**
     * Sends yell text from the [Player]
     *
     * @param string text : text for the [Player] to yells
     * @param uint32 lang : language the [Player] will speak
     */
    Yell(text : string,lang : uint32) : void

    /**
     * Sends say text from the [Player]
     *
     * @param string text : text for the [Player] to say
     * @param uint32 lang : language the [Player] will speak
     */
    Say(text : string,lang : uint32) : void

    /**
     * Gives the [Player] experience
     *
     * @param uint32 xp : experience to give
     * @param [Unit] victim = nil
     */
    GiveXP(xp : uint32,victim : TSUnit) : void

    /**
     * Toggle the [Player]s 'Do Not Disturb' flag
     */
    ToggleDND() : void

    /**
     * Toggle the [Player]s 'Away From Keyboard' flag
     */
    ToggleAFK() : void

    /**
     * Equips the given item or item entry to the given slot. Returns the equipped item or nil.
     *
     *     enum EquipmentSlots // 19 slots
     *     {
     *         EQUIPMENT_SLOT_START        = 0,
     *         EQUIPMENT_SLOT_HEAD         = 0,
     *         EQUIPMENT_SLOT_NECK         = 1,
     *         EQUIPMENT_SLOT_SHOULDERS    = 2,
     *         EQUIPMENT_SLOT_BODY         = 3,
     *         EQUIPMENT_SLOT_CHEST        = 4,
     *         EQUIPMENT_SLOT_WAIST        = 5,
     *         EQUIPMENT_SLOT_LEGS         = 6,
     *         EQUIPMENT_SLOT_FEET         = 7,
     *         EQUIPMENT_SLOT_WRISTS       = 8,
     *         EQUIPMENT_SLOT_HANDS        = 9,
     *         EQUIPMENT_SLOT_FINGER1      = 10,
     *         EQUIPMENT_SLOT_FINGER2      = 11,
     *         EQUIPMENT_SLOT_TRINKET1     = 12,
     *         EQUIPMENT_SLOT_TRINKET2     = 13,
     *         EQUIPMENT_SLOT_BACK         = 14,
     *         EQUIPMENT_SLOT_MAINHAND     = 15,
     *         EQUIPMENT_SLOT_OFFHAND      = 16,
     *         EQUIPMENT_SLOT_RANGED       = 17,
     *         EQUIPMENT_SLOT_TABARD       = 18,
     *         EQUIPMENT_SLOT_END          = 19
     *
     *     enum InventorySlots // 4 slots
     *     {
     *         INVENTORY_SLOT_BAG_START    = 19,
     *         INVENTORY_SLOT_BAG_END      = 23
     *
     * @param [Item] item : item to equip (entry or TSItem)
     * @param uint32 slot : equipment slot to equip the item to The slot can be [EquipmentSlots] or [InventorySlots]
     * @return [Item] equippedItem : item or nil if equipping failed
     */
    EquipItem(item : TSItem | uint32, slot : EquipmentSlots|InventorySlots) : TSItem

    /**
     * Returns true if the player can equip the given [Item] or item entry to the given slot, false otherwise.
     *
     * @proto canEquip = (item, slot)
     * @proto canEquip = (entry, slot)
     * @param [Item] item : item to equip
     * @param uint32 entry : entry of the item to equip
     * @param uint32 slot : equipment slot to test
     * @return bool canEquip
     */
    CanEquipItem(item : TSItem,slot : uint32,entry : uint32) : bool

    /**
     * Returns the average item level of the items equipped by this player
     *
     * @note This check takes into account the quality of items,
     * and items below epic quality loses 13 levels to a lowest
     * effective itemlevel of 0
     */
    GetAverageItemLevel(): float

    /**
     * Removes a title by ID from the [Player]s list of known titles
     *
     * @param uint32 titleId
     */
    UnsetKnownTitle(id : uint32) : void

    /**
     * Advances all of the [Player]s weapon skills to the maximum amount available
     */
    AdvanceSkillsToMax() : void

    /**
     * Advances all of the [Player]s skills to the amount specified
     *
     * @param uint32 skillStep
     */
    AdvanceAllSkills(step : uint32) : void

    /**
     * Advances a [Player]s specific skill to the amount specified
     *
     * @param uint32 skillId
     * @param uint32 skillStep
     */
    AdvanceSkill(_skillId : uint32,_step : uint32) : void

    /**
     * Teleports a [Player] to the location specified
     *
     * @param uint32 mappId
     * @param float xCoord
     * @param float yCoord
     * @param float zCoord
     * @param float orientation
     */
    Teleport(mapId : uint32,x : float,y : float,z : float,o : float) : bool
    AddLifetimeKills(val : uint32) : void

    /**
     * Adds the given amount of the specified item entry to the player.
     *
     * @param uint32 entry : entry of the item to add
     * @param uint32 itemCount = 1 : amount of the item to add
     * @return [Item] item : the item that was added or nil
     */
    AddItem(itemId : uint32,itemCount : uint32, propertyId?: int32) : TSItem

    /**
     * Removes the given amount of the specified [Item] from the player.
     *
     * @param [Item] item : item to remove
     * @param uint32 itemCount = 1 : amount of the item to remove
     */
    RemoveItem(item : TSItem,itemCount? : uint32) : void

    /**
     * Removes the given amount of the specified item template from the player.
     *
     * @param [Item] item : item to remove
     * @param uint32 itemCount = 1 : amount of the item to remove
     */
    RemoveItemByEntry(entry: uint32,itemCount? : uint32) : void

    /**
     * Removes specified amount of lifetime kills
     *
     * @param uint32 val : kills to remove
     */
    RemoveLifetimeKills(val : uint32) : void

    /**
     * Resets cooldown of the specified spell
     *
     * @param uint32 spellId
     * @param bool update = true
     */
    ResetSpellCooldown(spellId : uint32,update : bool) : void
    //ResetTypeCooldowns(category : uint32,update : bool) : void

    /**
     * Resets all of the [Player]'s cooldowns
     */
    ResetAllCooldowns() : void

    /**
     * Sends a Broadcast Message to the [Player]
     *
     * @param string message
     */
    SendBroadcastMessage(message : string) : void

    /**
     * Sends an Area Trigger Message to the [Player]
     *
     * @param string message
     */
    SendAreaTriggerMessage(msg : string) : void

    /**
     * Sends a Notification to the [Player]
     *
     * @param string message
     */
    SendNotification(msg : string) : void

    /**
     * Sends a [WorldPacket] to the [Player]
     *
     * @param [WorldPacket] packet
     * @param bool selfOnly = true
     */
    SendPacketPlayer(data : TSWorldPacket,selfOnly : bool) : void

    /**
     * Sends addon message to the [Player] receiver
     *
     * @param string prefix
     * @param string message
     * @param [ChatMsg] channel
     * @param [Player] receiver
     *
     */
    SendAddonMessage(prefix : string,message : string,channel : uint8,receiver : TSPlayer) : void

    /**
     * Kicks the [Player] from the server
     */
    KickPlayer() : void

    /**
     * Adds or subtracts from the [Player]s money in copper
     *
     * @param int32 copperAmt : negative to remove, positive to add
     */
    ModifyMoney(amt : int32) : void

    /**
     * Teaches the [Player] the [Spell] specified by entry ID
     *
     * @param uint32 spellId
     */
    LearnSpell(id : uint32) : void

    /**
     * Learn the [Player] the talent specified by talent_id and talentRank
     *
     * @param uint32 talent_id
     * @param uint32 talentRank
     */
    LearnTalent(id : uint32,rank : uint32) : void

    /**
     * Resurrects the [Player].
     *
     * @param float healthPercent = 100.0f
     * @param bool ressSickness = false
     */
    ResurrectPlayer(percent : float,sickness : bool) : void

    /**
     * Adds a new item to the gossip menu shown to the [Player] on next call to [Player:GossipSendMenu].
     *
     * sender and intid are numbers which are passed directly to the gossip selection handler. Internally they are partly used for the database gossip handling.
     * code specifies whether to show a box to insert text to. The player inserted text is passed to the gossip selection handler.
     * money specifies an amount of money the player needs to have to click the option. An error message is shown if the player doesn't have enough money.
     * Note that the money amount is only checked client side and is not removed from the player either. You will need to check again in your code before taking action.
     *
     * See also: [Player:GossipSendMenu], [Player:GossipAddQuests], [Player:GossipComplete], [Player:GossipClearMenu]
     *
     * @param uint32 icon : number that specifies used icon
     * @param string msg : label on the gossip item
     * @param uint32 sender : number passed to gossip handlers
     * @param uint32 intid : number passed to gossip handlers
     * @param bool code = false : show text input on click if true
     * @param string popup = nil : if non empty string, a popup with given text shown on click
     * @param uint32 money = 0 : required money in copper
     */
    GossipMenuAddItem(icon : GossipOptionIcon,msg : string,sender? : uint32,id? : uint32,code? : bool,promptMsg? : string,moneyRequired? : uint32) : void

    /**
     * Closes the [Player]s currently open Gossip Menu.
     *
     * See also: [Player:GossipMenuAddItem], [Player:GossipAddQuests], [Player:GossipSendMenu], [Player:GossipClearMenu]
     */
    GossipComplete() : void

    /**
     * Sends the current gossip items of the player to him as a gossip menu with header text from the given textId.
     *
     * If sender is a [Player] then menu_id is mandatory, otherwise it is not used for anything.
     * menu_id is the ID used to trigger the OnGossipSelect registered for players. See [Global:RegisterPlayerGossipEvent]
     *
     * See also: [Player:GossipMenuAddItem], [Player:GossipAddQuests], [Player:GossipComplete], [Player:GossipClearMenu]
     *
     * @proto (npc_text, sender)
     * @proto (npc_text, sender, menu_id)
     * @param uint32 npc_text : entry ID of a header text in npc_text database table, common default is 100
     * @param [Object] sender : object acting as the source of the sent gossip menu
     * @param uint32 menu_id : if sender is a [Player] then menu_id is mandatory
     */
    GossipSendMenu(npc_text : uint32,sender : TSObject,menu_id? : uint32) : void

    GossipSendTextMenuGendered(
        sender: TSObject
      , maleText: string
      , femaleText: string
      , language?: uint32
      , emote0?: uint32
      , emote0Delay?: uint32
      , emote1?: uint32
      , emote1Delay?: uint32
      , emote2?: uint32
      , emote2Delay?: uint32
      , menuId?: uint32
    )

    GossipSendTextMenu(
          sender: TSObject
        , text: string
        , language?: uint32
        , emote0?: uint32
        , emote0Delay?: uint32
        , emote1?: uint32
        , emote1Delay?: uint32
        , emote2?: uint32
        , emote2Delay?: uint32
        , menuId?: uint32
    )

    /**
     * Clears the [Player]s current gossip item list.
     *
     * See also: [Player:GossipMenuAddItem], [Player:GossipSendMenu], [Player:GossipAddQuests], [Player:GossipComplete]
     *
     *     Note: This is needed when you show a gossip menu without using gossip hello or select hooks which do this automatically.
     *     Usually this is needed when using [Player] is the sender of a Gossip Menu.
     */
    GossipClearMenu() : void

    /**
     * Attempts to start the taxi/flying to the given pathID
     *
     * @param uint32 pathId : pathId from DBC or [Global:AddTaxiPath]
     */
    StartTaxi(pathId : uint32) : void

    /**
     * Sends POI to the location on your map
     *
     * @param float x
     * @param float y
     * @param uint32 icon : map icon to show
     * @param uint32 flags
     * @param uint32 data
     * @param string iconText
     */
    GossipSendPOI(x : float,y : float,icon : uint32,flags : uint32,data : uint32,iconText : string) : void

    /**
     * Adds the gossip items to the [Player]'s gossip for the quests the given [WorldObject] can offer to the player.
     *
     * @param [WorldObject] source : a questgiver with quests
     */
    GossipAddQuests(source : TSWorldObject) : void

    /**
     * Shows a quest accepting window to the [Player] for the given quest.
     *
     * @param uint32 questId : entry of a quest
     * @param bool activateAccept = true : auto finish the quest
     */
    SendQuestTemplate(questId : uint32,activateAccept : bool) : void

    /**
     * Converts [Player]'s corpse to bones
     */
    SpawnBones() : void

    /**
     * Loots [Player]'s bones for insignia
     *
     * @param [Player] looter
     */
    RemovedInsignia(looter : TSPlayer) : void

    /**
     * Makes the [Player] invite another player to a group.
     *
     * @param [Player] invited : player to invite to group
     * @return bool success : true if the player was invited to a group
     */
    GroupInvite(invited : TSPlayer) : bool

    /**
     * Creates a new [Group] with the creator [Player] as leader.
     *
     * @param [Player] invited : player to add to group
     * @return [Group] createdGroup : the created group or nil
     */
    GroupCreate(invited : TSPlayer) : TSGroup

    /**
     * Starts a cinematic for the [Player]
     *
     * @param uint32 CinematicSequenceId : entry of a cinematic
     */
    SendCinematicStart(CinematicSequenceId : uint32) : void

    /**
     * Starts a movie for the [Player]
     *
     * @param uint32 MovieId : entry of a movie
     */
    SendMovieStart(MovieId : uint32) : void

    /**
     * Sends an addon message that can be longer than the standard
     * 255 bytes.
     *
     * Maximum size can be configured in worldserver.conf under
     * TSWoW.MessageBufferBytes
     *
     * @param channel
     * @param message
     */
    SendLongAddonMessage(channel: uint8, message: string): void;

    GetHairStyle(): uint8;
    SetHairStyle(style: uint8);

    GetHairColor(): uint8;
    SetHairColor(color: uint8);

    GetFacialStyle(): uint8;
    SetFacialStyle(style: uint8);

    GetSkinColor(): uint8;
    SetSkinColor(color: uint8);

    GetFace(): uint8;
    SetFace(face: uint8);
}

declare interface TSCorpse extends TSWorldObject {
    IsNull() : bool

    GetLoot(): TSLoot;

    /**
     * Returns the GUID of the [Player] that left the [Corpse] behind.
     *
     * @return uint64 ownerGUID
     */
    GetOwnerGUID() : uint64

    /**
     * Returns the time when the [Player] became a ghost and spawned this [Corpse].
     *
     * @return uint32 ghostTime
     */
    GetGhostTime() : uint32

    /**
     * Returns the [CorpseType] of a [Corpse].
     *
     *     enum CorpseType
     *     {
     *         CORPSE_BONES             = 0,
     *         CORPSE_RESURRECTABLE_PVE = 1,
     *         CORPSE_RESURRECTABLE_PVP = 2
     *     }
     * @return [CorpseType] corpseType
     */
    GetType() : CorpseType

    /**
     * Sets the "ghost time" to the current time.
     *
     * See [Corpse:GetGhostTime].
     */
    ResetGhostTime() : void

    /**
     * Saves the [Corpse] to the database.
     */
    SaveToDB() : void
}

declare class TSEntityProvider {
    SetObject<T>(key: string, obj: T): T;
    HasObject(key: string): boolean;
    GetObject<T>(key: string, value: T): T;
    GetDBObject<T>(key: string, sql: string, value: T): T;

    SetInt(key: string, value: int32): int32;
    HasInt(key: string): boolean;
    GetInt(key: string, def?: int32): int32;
    SetUInt(key: string, value: uint32): uint32;
    HasUInt(key: string): boolean;
    GetUInt(key: string, def?: uint32): uint32;
    SetFloat(key: string, value: double): double;
    HasFloat(key: string): boolean;
    GetFloat(key: string, def?: float): double;
    SetString(key: string, value: string): string;
    HasString(key: string): boolean;
    GetString(key: string, def?: string): string;

    SetNumber(key: string, value: double): void;
    GetNumber(key: string, def?: double): double;
    HasNumber(key: string): boolean;

    SetBool(key: string, value: boolean): void;
    GetBool(key: string, def?: boolean): boolean;
    HasBool(key: string): boolean;

    SetJsonObject(key: string, value: TSJsonObject): void;
    GetJsonObject(key: string, def?: TSJsonObject): TSJsonObject;
    HasJsonObject(key: string): boolean;

    SetJsonArray(key: string, value: TSJsonArray): void;
    GetJsonArray(key: string, def?: TSJsonArray): TSJsonArray;
    HasJsonArray(key: string): boolean;

    SetRawUInt8(offset: uint8, value: uint8): void
    SetRawInt8(offset: uint8, value: int8): void

    SetRawUInt16(offset: uint8, value: uint16): void
    SetRawInt16(offset: uint8, value: int16): void

    SetRawUInt32(offset: uint8, value: uint32): void
    SetRawInt32(offset: uint8, value: int32): void

    SetRawUInt64(offset: uint8, value: uint64): void
    SetRawInt64(offset: uint8, value: int64): void

    SetRawFloat(offset: uint8, value: float): void
    SetRawDouble(offset: uint8, value: double): void

    GetRawUInt8(offset: uint8): uint8
    GetRawInt8(offset: uint8): int8

    GetRawUInt16(offset: uint8): uint16
    GetRawInt16(offset: uint8): int16

    GetRawUInt32(offset: uint8): uint32
    GetRawInt32(offset: uint8): int32

    GetRawUInt64(offset: uint8): uint64
    GetRawInt64(offset: uint8): int64

    GetRawFloat(offset: uint8): float
    GetRawDouble(offset: uint8): double
}

declare class TSTimer {
    Stop(): void;
    GetDiff(): uint64;
    GetFlags(): uint32;
    SetFlags(): uint32;
    GetRepeats(): int32;
    SetRepeats(repeats: int32): void;
    GetName(): string;

    GetDelay(): uint32;
    SetDelay(delay: uint32): void;
}

declare class TSChannel {
    GetName(locale?: uint32): string;
    GetID(): uint32;
    IsConstant(): bool;
    IsLFG(): bool;
    IsAnnounce(): bool;
    SetAnnounce(announce: bool): void;
    SetDirty(): void;
    SetPassword(password: string): void;
    CheckPassword(password: string): bool;
    GetNumPlayers(): uint32;
    GetFlags(): uint8;
    HasFlag(flag: uint8): bool;
    JoinChannel(player: TSPlayer, password?: string): void;
    LeaveChannel(player: TSPlayer, send?: bool): void;
    SetInvisible(player: TSPlayer, on: bool): void;
    SetOwner(guid: uint64, exclaim?: bool): void;
    Say(guid: uint64, what: string, lang: uint32): void;
}

declare type JsonMessageCallback<T> = (channel: uint8, obj: TSJsonObject, owner: T)=>void
declare interface TSWorldEntityProvider<T> {
    AddNamedTimer(name: string, delay: uint32, repeats: uint32, flags: uint32, callback: (owner: T, timer: TSTimer)=>void);
    AddNamedTimer(name: string, delay: uint32, repeats: uint32, callback: (owner: T, timer: TSTimer)=>void);
    AddNamedTimer(name: string, delay: uint32, callback: (owner: T, timer: TSTimer)=>void);

    AddTimer(delay: uint32, repeats: uint32, flags: uint32, callback: (owner: T, timer: TSTimer)=>void);
    AddTimer(delay: uint32, repeats: uint32, callback: (owner: T, timer: TSTimer)=>void);
    AddTimer(delay: uint32, callback: (owner: T, timer: TSTimer)=>void);

    RemoveTimer(name: string);
    GetGroup(name: string);
    RemoveGroup(name: string);
    ClearGroups(name: string);
    QueueMessage(channel: uint8, json: TSJsonObject, callback: JsonMessageCallback<T>)
}

declare class TSObjectGroup {
    Add(obj: TSWorldObject): void;
    Remove(obj: TSWorldObject): void;
    Clear();
    get length(): uint32
    forEach(callback: (obj: TSWorldObject)=>void): void;
    filterInPlace(callback: (obj: TSWorldObject)=>bool): void;
}

declare interface TSGameObjectTemplate extends TSEntityProvider {
    GetEntry(): uint32
    GetType(): uint32;
    GetDisplayID(): uint32;
    GetName(): string;
    GetIconName(): string;
    GetCastBarCaption(): string;
}

declare interface TSCreatureTemplate extends TSEntityProvider {
    GetEntry(): uint32;
    GetDifficultyEntryA(): uint32;
    GetDifficultyEntryB(): uint32;
    GetDifficultyEntryC(): uint32;

    GetKillCreditA(): uint32;
    GetKillCreditB(): uint32;
    GetModelID1(): uint32;
    GetModelID2(): uint32;
    GetModelID3(): uint32;
    GetModelID4(): uint32;
    GetName(): string;
    GetTitle(): string;
    GetIconName(): string;
    GetGossipMenuID(): uint32;
    GetMinLevel(): uint8;
    GetMaxLevel(): uint8;
    GetExpansion(): uint32;
    GetFaction(): uint32;
    GetNPCFlag(): uint32;
    GetSpeedWalk(): float;
    GetSpeedRun(): float;
    GetScale(): float;
    GetRank(): uint32;
    GetDamageSchool(): uint32;
    GetBaseAttackTime(): uint32;
    GetRangeAttackTime(): uint32;
    GetBaseVariance(): float;
    GetRangeVariance(): float;
    GetUnitClass(): uint32;
    GetUnitFlags(): uint32;
    GetUnitFlags2(): uint32;
    GetDynamicFlags(): uint32;
    GetFamily(): uint32;
    GetType(): uint32;
    GetTypeFlags(): uint32;
    GetLootID(): uint32;
    GetPickpocketLootID(): uint32;
    GetSkinLootID(): uint32;

    GetNormalResistance(): int32;
    GetHolyResistance(): int32;
    GetFireResistance(): int32;
    GetNatureResistance(): int32;
    GetFrostResistance(): int32;
    GetShadowResistance(): int32;
    GetArcaneResistance(): int32;

    GetSpellA(): uint32;
    GetSpellB(): uint32;
    GetSpellC(): uint32;
    GetSpellD(): uint32;
    GetSpellE(): uint32;
    GetSpellF(): uint32;
    GetSpellG(): uint32;
    GetSpellH(): uint32;
    GetPetSpellDataID(): uint32;
    GetVehicleID(): uint32;
    GetMinGold(): uint32;
    GetMaxGold(): uint32;
    GetAIName(): string;
    GetMovementType(): uint32;

    GetHoverHeight(): float;
    GetModHealth(): float;
    GetModMana(): float;
    GetModArmor(): float;
    GetModDamage(): float;
    GetModExperience(): float;
    GetRacialLeader(): bool;
    GetMovementID(): uint32;
    GetRegenHealth(): bool;
    GetMechanicImmuneMask(): uint32;
    GetSpellSchoolImmuneMask(): uint32;
    GetFlagsExtra(): uint32;
    GetScriptID(): uint32;
    GetRandomValidModelID(): uint32;
    GetFirstValidModelID(): uint32;
    GetFirstInvisibleModel(): uint32;
    GetFirstVisibleModel(): uint32;
    GetRequiredLootSkill(): uint32;
    GetIsExotic(): bool;
    GetIsTameable(canTameExotic: bool): bool;

    // CreatureMovementData
    GetGroundMovement(): uint32;
    GetFlightMovement(): uint32;
    GetSwims(): bool;
    GetRooted(): bool;
    GetChaseMovement(): uint32;
    GetRandomMovement(): uint32;
    GetInteractionPauseTimer(): uint32;
    GetIsGroundAllowed(): bool;
    GetIsSwimAllowed(): bool;
    GetIsFlightAllowed(): bool;
    GetIsRooted(): bool;
}

declare interface TSOutfit {
    SetClass(Class: ClassID): TSOutfit;
    GetClass(): uint8;

    SetFace(face: uint8): TSOutfit;
    GetFace(): uint8;

    SetSkin(face: uint8): TSOutfit;
    GetSkin(): uint8;

    SetHairStyle(hair: uint8): TSOutfit;
    GetHairStyle(): uint8;

    SetHairColor(color: uint8): TSOutfit;
    GetHairColor(): uint8;

    SetSoundID(soundId: uint32): TSOutfit;
    GetSoundID(): uint32;

    SetGuild(guild: uint64): TSOutfit;
    GetGuild(): uint64;

    GetGender(): Gender;
    GetRace(): uint8;
    GetDisplayID(): uint32;

    SetMainhand(mainhand: uint32): TSOutfit
    SetOffhand(offhand: uint32): TSOutfit
    SetRanged(ranged: uint32): TSOutfit

    ClearMainhand(): TSOutfit
    ClearOffhand(): TSOutfit
    ClearRanged(): TSOutfit

    GetMainhand(): uint32
    GetOffhand(): uint32
    GetRanged(): uint32

    SetItem(slot: EquipmentSlots, entry: uint32): TSOutfit;
    SetItemByDisplayID(slot: EquipmentSlots, displayId: uint32): TSOutfit;

    /**
     * @note Does not work for mainhand/offhand/ranged slots
     */
    GetDisplayID(slot: EquipmentSlots): uint32;

    ApplyRef(creature: TSCreature): void;

    /**
     * Applies a copy of this outfit to the target creature
     */
    ApplyCopy(
          creature: TSCreature
        , settings?: Outfit
        , race?: RaceID
        , gender?: Gender
    )
}

declare function CreateOutfit(race: Race, gender: Gender): TSOutfit

declare interface TSCreature extends TSUnit {
    /**
     * @param unit
     * @param withGroup whether to include group, true by default
     */
    SetLootRecipient(unit: TSUnit, withGroup?: bool)

    HasLootRecipient(): bool

    IsAIEnabled(): bool

    GetLoot(): TSLoot;

    GetTemplate(): TSCreatureTemplate;

    FireSmartEvent(id: uint32, unit: TSUnit, var0: uint32, var1: uint32, bvar: bool, spell: TSSpellInfo, obj: TSGameObject);

    IsNull() : bool

    SetOutfit(outfit: TSOutfit): void

    GetOutfit(): TSOutfit
    GetOutfitCopy(settings?: Outfit, race?: int32, gender?: int32): TSOutfit

    GetMainhand(): uint32
    GetOffhand(): uint32
    GetRanged(): uint32

    SetMainhand(mainhand: uint32): void
    SetOffhand(offhand: uint32): void
    SetRanged(ranged: uint32): void

    /**
     * Returns `true` if the [Creature] is set to not give reputation when killed,
     *   and returns `false` otherwise.
     *
     * @return bool reputationDisabled
     */
    IsReputationGainDisabled() : bool

    /**
     * Returns `true` if the [Creature] completes the [Quest] with the ID `questID`,
     *   and returns `false` otherwise.
     *
     * @param uint32 questID : the ID of a [Quest]
     * @return bool completesQuest
     */
    CanCompleteQuest(quest_id : uint32) : bool

    /**
     * Returns `true` if the [Creature] can be targeted for attack,
     *   and returns `false` otherwise.
     *
     * @param bool mustBeDead = false : if `true`, only returns `true` if the [Creature] is also dead. Otherwise, it must be alive.
     * @return bool targetable
     */
    IsTargetableForAttack(mustBeDead : bool) : bool

    /**
     * Returns `true` if the [Creature] can assist `friend` in combat against `enemy`,
     *   and returns `false` otherwise.
     *
     * @param [Unit] friend : the Unit we will be assisting
     * @param [Unit] enemy : the Unit that we would attack if we assist `friend`
     * @param bool checkFaction = true : if `true`, the [Creature] must be the same faction as `friend` to assist
     * @return bool canAssist
     */
    CanAssistTo(u : TSUnit,enemy : TSUnit,checkfaction : bool) : bool

    /**
     * Returns `true` if the [Creature] has searched for combat assistance already,
     *   and returns `false` otherwise.
     *
     * @return bool searchedForAssistance
     */
    HasSearchedAssistance() : bool

    /**
     * Returns `true` if the [Creature] will give its loot to `player`,
     *   and returns `false` otherwise.
     *
     * @return bool tapped
     */
    IsTappedBy(player : TSPlayer) : bool



    /**
     * Returns `true` if the [Creature] will give its loot to a [Player] or [Group],
     *   and returns `false` otherwise.
     *
     * @return bool hasLootRecipient
     */
    HasLootRecipient() : bool

    /**
     * Returns `true` if the [Creature] can start attacking nearby hostile [Unit]s,
     *   and returns `false` otherwise.
     *
     * @return bool canAggro
     */
    CanAggro() : bool

    /**
     * Returns `true` if the [Creature] can move through deep water,
     *   and returns `false` otherwise.
     *
     * @return bool canSwim
     */
    CanSwim() : bool

    /**
     * Returns `true` if the [Creature] can move on land,
     *   and returns `false` otherwise.
     *
     * @return bool canWalk
     */
    CanWalk() : bool

    /**
     * Returns `true` if the [Creature] is returning to its spawn position from combat,
     *   and returns `false` otherwise.
     *
     * @return bool inEvadeMode
     */
    IsInEvadeMode() : bool

    /**
     * Returns `true` if the [Creature]'s rank is Elite or Rare Elite,
     *   and returns `false` otherwise.
     *
     * @return bool isElite
     */
    IsElite() : bool

    /**
     * Returns `true` if the [Creature] is a city guard,
     *   and returns `false` otherwise.
     *
     * @return bool isGuard
     */
    IsGuard() : bool

    /**
     * Returns `true` if the [Creature] is a civilian,
     *   and returns `false` otherwise.
     *
     * @return bool isCivilian
     */
    IsCivilian() : bool

    /**
     * Returns `true` if the [Creature] is the leader of a player faction,
     *   and returns `false` otherwise.
     *
     * @return bool isLeader
     */
    IsRacialLeader() : bool

    /**
     * Returns `true` if the [Creature]'s rank is Boss,
     *   and returns `false` otherwise.
     *
     * @return bool isWorldBoss
     */
    IsWorldBoss() : bool

    /**
     * Returns `true` if the [Creature] cannot cast `spellId` due to a category cooldown,
     *   and returns `false` otherwise.
     *
     * @param uint32 spellId : the ID of a [Spell]
     * @return bool hasCooldown
     */
    HasCategoryCooldown(spell : uint32) : bool

    /**
     * Returns `true` if the [Creature] can cast `spellId` when mind-controlled,
     *   and returns `false` otherwise.
     *
     * @param uint32 spellId : the ID of a [Spell]
     * @return bool hasSpell
     */
    HasSpell(id : uint32) : bool

    /**
     * Returns `true` if the [Creature] starts the [Quest] `questId`,
     *   and returns `false` otherwise.
     *
     * @param uint32 questId : the ID of a [Quest]
     * @return bool hasQuest
     */
    HasQuest(questId : uint32) : bool

    /**
     * Returns `true` if the [Creature] has `spellId` on cooldown,
     *   and returns `false` otherwise.
     *
     * @param uint32 spellId : the ID of a [Spell]
     * @return bool hasCooldown
     */
    HasSpellCooldown(spellId : uint32) : bool

    /**
     * Returns `true` if the [Creature] can fly,
     *   and returns `false` otherwise.
     *
     * @return bool canFly
     */
    CanFly() : bool

    /**
     * Returns `true` if the [Creature] is an invisible trigger,
     *   and returns `false` otherwise.
     *
     * @return bool canFly
     */
    IsTrigger() : bool

    /**
     * Returns true if the [Creature] is damaged enough for looting
     *
     * @return bool isDamagedEnough
     */
    IsDamageEnoughForLootingAndReward() : bool

    /**
     * Returns true if the [Creature] can start attacking specified target
     *
     * Does not work on most targets
     *
     * @param [Unit] target
     * @param bool force = true : force [Creature] to attack
     */
    CanStartAttack(target : TSUnit,force : bool) : bool

    /**
     * Returns true if [Creature] has the specified loot mode
     *
     * @param uint16 lootMode
     * @return bool hasLootMode
     */
    HasLootMode(lootMode : uint16) : bool

    /**
     * Returns the time it takes for this [Creature] to respawn once killed.
     *
     * This value does not usually change over a [Creature]'s lifespan,
     *   but can be modified by [Creature:SetRespawnDelay].
     *
     * @return uint32 respawnDelay : the respawn delay, in seconds
     */
    GetRespawnDelay() : uint32

    /**
     * Returns the radius the [Creature] is permitted to wander from its
     *   respawn point.
     *
     * @return float wanderRadius
     */
    GetWanderRadius() : float

    /**
     * Returns the current waypoint path ID of the [Creature].
     *
     * @return uint32 pathId
     */
    GetWaypointPath() : uint32

    /**
     * Returns the current waypoint ID of the [Creature].
     *
     * @return uint32 wpId
     */
    GetCurrentWaypointID() : uint32

    /**
     * Returns the default movement type for this [Creature].
     *
     * @return [MovementGeneratorType] defaultMovementType
     */
    GetDefaultMovementType() : uint32

    /**
     * Returns the aggro range of the [Creature] for `target`.
     *
     * @param [Unit] target
     * @return float aggroRange
     */
    GetAggroRange(target : TSUnit) : float

    /**
     * Returns the [Group] that can loot this [Creature].
     *
     * @return [Group] lootRecipientGroup : the group or `nil`
     */
    GetLootRecipientGroup() : TSGroup

    /**
     * Returns the [Player] that can loot this [Creature].
     *
     * @return [Player] lootRecipient : the player or `nil`
     */
    GetLootRecipient() : TSPlayer

    /**
     * Returns the [Creature]'s script name.
     *
     * This is used by the core to apply C++ scripts to the Creature.
     *
     * It is not used by Eluna. Eluna will  AI scripts.
     *
     * @return string scriptName
     */
    GetScriptName() : string

    /**
     * Returns the [Creature]'s AI name.
     *
     * This is used by the core to assign the Creature's default AI.
     *
     * If the Creature is scripted by Eluna, the AI is n.
     *
     * @return string AIName
     */
    GetAIName() : string

    /**
     * Returns the [Creature]'s script ID.
     *
     * Every C++ script name is assigned a unique ID by the core.
     *   This returns the ID for this [Creature]'s script name.
     *
     * @return uint32 scriptID
     */
    GetScriptID() : uint32

    /**
     * Returns the [Creature]'s cooldown for `spellID`.
     *
     * @param uint32 spellID
     * @return uint32 cooldown : the cooldown, in milliseconds
     */
    GetCreatureSpellCooldownDelay(spell : uint32) : uint32

    /**
     * Returns the delay between when the [Creature] dies and when its body despawns.
     *
     * @return uint32 corpseDelay : the delay, in seconds
     */
    GetCorpseDelay() : uint32

    /**
     * Returns position the [Creature] returns to when evading from combat
     *   or respawning.
     *
     * @return float x
     * @return float y
     * @return float z
     * @return float o
     */
    GetHomePosition() : TSPosition

    /**
     * Sets the position the [Creature] returns to when evading from combat
     *   or respawning.
     *
     * @param float x
     * @param float y
     * @param float z
     * @param float o
     */
    SetHomePosition(x : float,y : float,z : float,o : float) : void
    //GetAITarget(targetType : uint32,playerOnly : bool,position : uint32,dist : float,aura : int32) : TSUnit
    //GetAITargets() : TSArray<TSUnit>

    /**
     * Returns the number of [Unit]s in this [Creature]'s threat list.
     *
     * @return int targetsCount
     */
    GetAITargetsCount() : int

    /**
     * Returns the [Creature]'s NPC flags.
     *
     * These are used to control whether the NPC is a vendor, can repair items,
     *   can give quests, etc.
     *
     * @return [NPCFlags] npcFlags
     */
    GetNPCFlags() : uint32

    /**
     * Returns the [Creature]'s shield block value.
     *
     * @return uint32 shieldBlockValue
     */
    GetShieldBlockValue() : uint32
    GetLootMode() : uint16

    /**
     * Returns the guid of the [Creature] that is used as the ID in the database
     *
     * @return uint32 dbguid
     */
    GetDBTableGUIDLow() : uint32

    /**
     * Sets the [Creature]'s NPC flags to `flags`.
     *
     * @param [NPCFlags] flags
     */
    SetNPCFlags(flags : uint32) : void

    /**
     * Makes the [Creature] able to fly if enabled.
     *
     * @param bool disable
     */
    SetDisableGravity(disable : bool) : void
    SetLootMode(lootMode : uint16) : void

    /**
     * Sets the [Creature]'s death state to `deathState`.
     *
     * @param [DeathState] deathState
     */
    SetDeathState(state : int32) : void

    /**
     * Sets whether the [Creature] is currently walking or running.
     *
     * @param bool enable = true : `true` to enable walking, `false` for running
     */
    SetWalk(enable : bool) : void

    /**
     * Equips given [Item]s to the [Unit]. Using 0 removes the equipped [Item]
     *
     * @param uint32 main_hand : main hand [Item]'s entry
     * @param uint32 off_hand : off hand [Item]'s entry
     * @param uint32 ranged : ranged [Item]'s entry
     */
    SetEquipmentSlots(main_hand : uint32,off_hand : uint32,ranged : uint32) : void

    /**
     * Sets whether the [Creature] can be aggroed.
     *
     * @param bool allow = true : `true` to allow aggro, `false` to disable aggro
     */
    SetAggroEnabled(allow : bool) : void

    /**
     * Sets whether the [Creature] gives reputation or not.
     *
     * @param bool disable = true : `true` to disable reputation, `false` to enable
     */
    SetDisableReputationGain(disable : bool) : void

    /**
     * Sets the [Creature] as in combat with all [Player]s in the dungeon instance.
     *
     * This is used by raid bosses to prevent Players from using out-of-combat
     *   actions once the encounter has begun.
     */
    SetInCombatWithZone() : void

    /**
     * Sets the distance the [Creature] can wander from it's spawn point.
     *
     * @param float distance
     */
    SetWanderRadius(dist : float) : void

    /**
     * Sets the time it takes for the [Creature] to respawn when killed.
     *
     * @param uint32 delay : the delay, in seconds
     */
    SetRespawnDelay(delay : uint32) : void

    /**
     * Sets the default movement type of the [Creature].
     *
     * @param [MovementGeneratorType] type
     */
    SetDefaultMovementType(type : int32) : void

    /**
     * Sets whether the [Creature] can search for assistance at low health or not.
     *
     * @param bool enable = true : `true` to disable searching, `false` to allow
     */
    SetNoSearchAssistance(val : bool) : void

    /**
     * Sets whether the [Creature] can call nearby enemies for help in combat or not.
     *
     * @param bool enable = true : `true` to disable calling for help, `false` to enable
     */
    SetNoCallAssistance(val : bool) : void

    /**
     * Sets whether the creature is hovering / levitating or not.
     *
     * @param bool enable = true : `true` to enable hovering, `false` to disable
     */
    SetHover(enable : bool) : void

    /**
     * Despawn this [Creature].
     *
     * @param uint32 delay = 0 : dely to despawn in milliseconds
     */
    DespawnOrUnsummon(msTimeToDespawn : uint32) : void

    /**
     * Respawn this [Creature].
     */
    Respawn() : void

    /**
     * Remove this [Creature]'s corpse.
     */
    RemoveCorpse() : void

    /**
     * Make the [Creature] start following its waypoint path.
     */
    MoveWaypoint() : void

    /**
     * Make the [Creature] call for assistance in combat from other nearby [Creature]s.
     */
    CallAssistance() : void

    /**
     * Make the [Creature] call for help in combat from friendly [Creature]s within `radius`.
     *
     * @param float radius
     */
    CallForHelp(radius : float) : void

    /**
     * Make the [Creature] flee combat to get assistance from a nearby friendly [Creature].
     */
    FleeToGetAssistance() : void

    /**
     * Make the [Creature] attack `target`.
     *
     * @param [Unit] target
     */
    AttackStart(target : TSUnit) : void

    /**
     * Sets how a [Creature] responds to being attacked.
     *
     * @param ReactStates state : the state to set.
     */
    SetReactState(state: ReactStates) : void

    /**
     * Gets how a [Creature] responds to being attacked.
     *
     * @return ReactStates. 0 = Passive, 1, = Defensive, 2 = Aggressive
     */
    GetReactState() : ReactStates

    /**
     * Save the [Creature] in the database.
     */
    SaveToDB() : void

    /**
     * Make the [Creature] try to find a new target.
     *
     * This should be called every update cycle for the Creature's AI.
     */
    SelectVictim() : TSUnit

    /**
     * Transform the [Creature] into another Creature.
     *
     * @param uint32 entry : the Creature ID to transform into
     * @param uint32 dataGUIDLow = 0 : use this Creature's model and equipment instead of the defaults
     */
    UpdateEntry(entry : uint32,dataGuidLow : uint32) : void

    /**
     * Resets [Creature]'s loot mode to default
     */
    ResetLootMode() : void

    /**
     * Removes specified loot mode from [Creature]
     *
     * @param uint16 lootMode
     */
    RemoveLootMode(lootMode : uint16) : void

    /**
     * Adds a loot mode to the [Creature]
     *
     * @param uint16 lootMode
     */
    AddLootMode(lootMode : uint16) : void

    SetMainhand(mainhand: uint32): void
    SetOffhand(offhand: uint32): void
    SetRanged(ranged: uint32): void

    /**
     * Returns the [Creature]'s creature family ID (enumerated in CreatureFamily.dbc).
     *
     *     enum CreatureFamily
     *     {
     *         CREATURE_FAMILY_NONE                = 0,    // TrinityCore only
     *         CREATURE_FAMILY_WOLF                = 1,
     *         CREATURE_FAMILY_CAT                 = 2,
     *         CREATURE_FAMILY_SPIDER              = 3,
     *         CREATURE_FAMILY_BEAR                = 4,
     *         CREATURE_FAMILY_BOAR                = 5,
     *         CREATURE_FAMILY_CROCOLISK           = 6,
     *         CREATURE_FAMILY_CARRION_BIRD        = 7,
     *         CREATURE_FAMILY_CRAB                = 8,
     *         CREATURE_FAMILY_GORILLA             = 9,
     *         CREATURE_FAMILY_HORSE_CUSTOM        = 10,   // Does not exist in DBC but used for horse like beasts in DB
     *         CREATURE_FAMILY_RAPTOR              = 11,
     *         CREATURE_FAMILY_TALLSTRIDER         = 12,
     *         CREATURE_FAMILY_FELHUNTER           = 15,
     *         CREATURE_FAMILY_VOIDWALKER          = 16,
     *         CREATURE_FAMILY_SUCCUBUS            = 17,
     *         CREATURE_FAMILY_DOOMGUARD           = 19,
     *         CREATURE_FAMILY_SCORPID             = 20,
     *         CREATURE_FAMILY_TURTLE              = 21,
     *         CREATURE_FAMILY_IMP                 = 23,
     *         CREATURE_FAMILY_BAT                 = 24,
     *         CREATURE_FAMILY_HYENA               = 25,
     *         CREATURE_FAMILY_BIRD_OF_PREY        = 26,   // Named CREATURE_FAMILY_OWL in Mangos
     *         CREATURE_FAMILY_WIND_SERPENT        = 27,
     *         CREATURE_FAMILY_REMOTE_CONTROL      = 28,
     *         CREATURE_FAMILY_FELGUARD            = 29,   // This and below is TBC+
     *         CREATURE_FAMILY_DRAGONHAWK          = 30,
     *         CREATURE_FAMILY_RAVAGER             = 31,
     *         CREATURE_FAMILY_WARP_STALKER        = 32,
     *         CREATURE_FAMILY_SPOREBAT            = 33,
     *         CREATURE_FAMILY_NETHER_RAY          = 34,
     *         CREATURE_FAMILY_SERPENT             = 35,
     *         CREATURE_FAMILY_SEA_LION            = 36,   // TBC only
     *         CREATURE_FAMILY_MOTH                = 37,   // This and below is WotLK+
     *         CREATURE_FAMILY_CHIMAERA            = 38,
     *         CREATURE_FAMILY_DEVILSAUR           = 39,
     *         CREATURE_FAMILY_GHOUL               = 40,
     *         CREATURE_FAMILY_SILITHID            = 41,
     *         CREATURE_FAMILY_WORM                = 42,
     *         CREATURE_FAMILY_RHINO               = 43,
     *         CREATURE_FAMILY_WASP                = 44,
     *         CREATURE_FAMILY_CORE_HOUND          = 45,
     *         CREATURE_FAMILY_SPIRIT_BEAST        = 46
     *     }
     * @return [CreatureFamily] creatureFamily
     */
    GetCreatureFamily() : CreatureFamily

    /**
     * Updates max hp, hp, and stats
     */
    UpdateLevelDependantStats(): void;
}

declare interface TSAura {
    IsNull() : bool

    /**
     * Returns all active applications of this aura.
     *
     * @return [TSAuraApplication[]] applications
     */
    GetApplications(): TSArray<TSAuraApplication>

    /**
     * Returns the [Unit] that casted the [Spell] that caused this [Aura] to be applied.
     *
     * @return [Unit] caster
     */
    GetCaster() : TSWorldObject

    /**
     * Returns the GUID of the [Unit] that casted the [Spell] that caused this [Aura] to be applied.
     *
     * @return string caster_guid : the GUID of the Unit as a decimal string
     */
    GetCasterGUID() : uint64

    /**
     * Returns the level of the [Unit] that casted the [Spell] that caused this [Aura] to be applied.
     *
     * @return uint32 caster_level
     */
    GetCasterLevel() : uint32

    /**
     * Returns the amount of time left until the [Aura] expires.
     *
     * @return int32 duration : amount of time left in milliseconds
     */
    GetDuration() : int32

    /**
     * Returns the ID of the [Spell] that caused this [Aura] to be applied.
     *
     * @return uint32 aura_id
     */
    GetAuraID() : uint32

    /**
     * Returns the amount of time this [Aura] lasts when applied.
     *
     * To determine how much time has passed since this Aura was applied,
     *   subtract the result of [Aura]:GetDuration from the result of this method.
     *
     * @return int32 max_duration : the maximum duration of the Aura, in milliseconds
     */
    GetMaxDuration() : int32

    /**
     * Returns the number of times the [Aura] has "stacked".
     *
     * This is the same as the number displayed on the [Aura]'s icon in-game.
     *
     * @return uint32 stack_amount
     */
    GetStackAmount() : uint32

    /**
     * Returns the [Unit] that the [Aura] has been applied to.
     *
     * @return [Unit] owner
     */
    GetOwner() : TSWorldObject

    /**
     * Change the amount of time before the [Aura] expires.
     *
     * @param int32 duration : the new duration of the Aura, in milliseconds
     */
    SetDuration(duration : int32) : void

    /**
     * Change the maximum amount of time before the [Aura] expires.
     *
     * This does not affect the current duration of the [Aura], but if the [Aura]
     *   is reset to the maximum duration, it will instead change to `duration`.
     *
     * @param int32 duration : the new maximum duration of the Aura, in milliseconds
     */
    SetMaxDuration(duration : int32) : void

    /**
     * Change the amount of times the [Aura] has "stacked" on the [Unit].
     *
     * If `amount` is greater than or equal to the current number of stacks,
     *   then the [Aura] has its duration reset to the maximum duration.
     *
     * @param uint32 amount
     */
    SetStackAmount(amount : uint8) : void

    /**
     * Remove this [Aura] from the [Unit] it is applied to.
     */
    Remove() : void
}

declare interface TSAuraEffect {
    GetCaster(): TSUnit;
    GetCasterGUID(): uint64;
    GetAura(): TSAura;
    GetSpellInfo(): TSSpellInfo;
    GetID(): uint32;
    GetEffectIndex(): uint32;
    GetAmplitude(): uint32;
    GetMiscValueB(): int32;
    GetMiscValue(): int32;
    GetAuraType(): uint32;
    GetAmount(): int32;
    SetAmount(amount: int32): void;
    GetPeriodicTimer(): int32;
    SetPeriodicTimer(periodicTimer: int32): void;
    GetTickNumber(): uint32;
    GetRemainingTicks(): uint32;
    GetTotalTicks(): uint32;
    ResetPeriodic(): void;
    ResetTicks(): void;
    IsPeriodic(): boolean;
}

declare interface TSAuraApplication {
    GetTarget(): TSUnit;
    GetAura(): TSAura;
    GetSlot(): uint8;
    GetFlags(): uint8;
    GetEffectMask(): uint8;
    GetAppliedEffects(): uint8;
    IsPositive(): bool;
    IsSelfCast(): bool;
    GetRemoveMode(): AuraRemoveMode;
}

declare interface TSGuild {
    IsNull() : bool

    /**
     * Returns a table with the [Player]s in this [Guild]
     *
     * Only the players that are online and on some map.
     *
     * @return table guildPlayers : table of [Player]s
     */
    GetMembers() : TSArray<TSPlayer>

    /**
     * Returns the member count of this [Guild]
     *
     * @return uint32 memberCount
     */
    GetMemberCount() : uint32

    /**
     * Finds and returns the [Guild] leader by their GUID if logged in
     *
     * @return [Player] leader
     */
    GetLeader() : TSPlayer

    /**
     * Returns [Guild] leader GUID
     *
     * @return uint64 leaderGUID
     */
    GetLeaderGUID() : uint64

    /**
     * Returns the [Guild]s entry ID
     *
     * @return uint32 entryId
     */
    GetID() : uint32

    /**
     * Returns the [Guild]s name
     *
     * @return string guildName
     */
    GetName() : string

    /**
     * Returns the [Guild]s current Message Of The Day
     *
     * @return string guildMOTD
     */
    GetMOTD() : string

    /**
     * Returns the [Guild]s current info
     *
     * @return string guildInfo
     */
    GetInfo() : string

    /**
     * Sets the leader of this [Guild]
     *
     * @param [Player] leader : the [Player] leader to change
     */
    SetLeader(player : TSPlayer) : void

    /**
     * Sets the information of the bank tab specified
     *
     * @param uint8 tabId : the ID of the tab specified
     * @param string info : the information to be set to the bank tab
     */
    SetBankTabText(tabId : uint8,text : string) : void

    /**
     * Sends a [WorldPacket] to all the [Player]s in the [Guild]
     *
     * @param [WorldPacket] packet : the [WorldPacket] to be sent to the [Player]s
     */
    SendPacket(data : TSWorldPacket) : void

    /**
     * Sends a [WorldPacket] to all the [Player]s at the specified rank in the [Guild]
     *
     * @param [WorldPacket] packet : the [WorldPacket] to be sent to the [Player]s
     * @param uint8 rankId : the rank ID
     */
    SendPacketToRanked(data : TSWorldPacket,ranked : uint8) : void

    /**
     * Disbands the [Guild]
     */
    Disband() : void

    /**
     * Adds the specified [Player] to the [Guild] at the specified rank.
     *
     * If no rank is specified, defaults to none.
     *
     * @param [Player] player : the [Player] to be added to the guild
     * @param uint8 rankId : the rank ID
     */
    AddMember(player : TSPlayer,rankId : uint8) : void

    /**
     * Removes the specified [Player] from the [Guild].
     *
     * @param [Player] player : the [Player] to be removed from the guild
     * @param bool isDisbanding : default 'false', should only be set to 'true' if the guild is triggered to disband
     */
    DeleteMember(player : TSPlayer,isDisbanding : bool) : void

    /**
     * Promotes/demotes the [Player] to the specified rank.
     *
     * @param [Player] player : the [Player] to be promoted/demoted
     * @param uint8 rankId : the rank ID
     */
    SetMemberRank(player : TSPlayer,newRank : uint8) : void
}

declare interface TSGroup {
    IsNull() : bool

    /**
     * Returns 'true' if the [Player] is the [Group] leader
     *
     * @param uint64 guid : guid of a possible leader
     * @return bool isLeader
     */
    IsLeader(guid : uint64) : bool

    /**
     * Returns 'true' if the [Group] is full
     *
     * @return bool isFull
     */
    IsFull() : bool

    /**
     * Returns 'true' if the [Group] is a raid [Group]
     *
     * @return bool isRaid
     */
    IsRaidGroup() : bool

    /**
     * Returns 'true' if the [Group] is a battleground [Group]
     *
     * @return bool isBG
     */
    IsBGGroup() : bool

    /**
     * Returns 'true' if the [Player] is a member of this [Group]
     *
     * @param uint64 guid : guid of a player
     * @return bool isMember
     */
    IsMember(guid : uint64) : bool

    /**
     * Returns 'true' if the [Player] is an assistant of this [Group]
     *
     * @param uint64 guid : guid of a player
     * @return bool isAssistant
     */
    IsAssistant(guid : uint64) : bool

    /**
     * Returns 'true' if the [Player]s are in the same subgroup in this [Group]
     *
     * @param [Player] player1 : first [Player] to check
     * @param [Player] player2 : second [Player] to check
     * @return bool sameSubGroup
     */
    SameSubGroup(player1 : TSPlayer,player2 : TSPlayer) : bool

    /**
     * Returns 'true' if the subgroup has free slots in this [Group]
     *
     * @param uint8 subGroup : subGroup ID to check
     * @return bool hasFreeSlot
     */
    HasFreeSlotSubGroup(subGroup : uint8) : bool

    /**
     * Adds a new member to the [Group]
     *
     * @param [Player] player : [Player] to add to the group
     * @return bool added : true if member was added
     */
    AddMember(player : TSPlayer) : bool

    /**
     * Returns a table with the [Player]s in this [Group]
     *
     * @return table groupPlayers : table of [Player]s
     */
    GetMembers() : TSArray<TSPlayer>

    /**
     * Returns [Group] leader GUID
     *
     * @return uint64 leaderGUID
     */
    GetLeaderGUID() : uint64

    /**
     * Returns the [Group]'s GUID
     *
     * @return uint64 groupGUID
     */
    GetGUID() : uint64

    /**
     * Returns a [Group] member's GUID by their name
     *
     * @param string name : the [Player]'s name
     * @return uint64 memberGUID
     */
    GetMemberGUID(name : string) : uint64

    /**
     * Returns the member count of this [Group]
     *
     * @return uint32 memberCount
     */
    GetMembersCount() : uint32

    /**
     * Returns the [Player]'s subgroup ID of this [Group]
     *
     * @param uint64 guid : guid of the player
     * @return uint8 subGroupID : a valid subgroup ID or MAX_RAID_SUBGROUPS+1
     */
    GetMemberGroup(guid : uint64) : uint8

    /**
     * Sets the leader of this [Group]
     *
     * @param uint64 guid : guid of the new leader
     */
    SetLeader(guid : uint64) : void

    /**
     * Sends a specified [WorldPacket] to this [Group]
     *
     * @param [WorldPacket] packet : the [WorldPacket] to send
     * @param bool ignorePlayersInBg : ignores [Player]s in a battleground
     * @param uint64 ignore : ignore a [Player] by their GUID
     */
    SendPacket(data : TSWorldPacket,ignorePlayersInBg : bool,ignore : uint64) : void

    /**
     * Removes a [Player] from this [Group] and returns 'true' if successful
     *
     *     enum RemoveMethod
     *     {
     *         GROUP_REMOVEMETHOD_DEFAULT  = 0,
     *         GROUP_REMOVEMETHOD_KICK     = 1,
     *         GROUP_REMOVEMETHOD_LEAVE    = 2,
     *         GROUP_REMOVEMETHOD_KICK_LFG = 3
     *     }
     *
     * @param uint64 guid : guid of the player to remove
     * @param [RemoveMethod] method : method used to remove the player
     * @return bool removed
     */
    RemoveMember(guid : uint64,method : RemoveMethod) : bool

    /**
     * Disbands this [Group]
     *
     */
    Disband() : void

    /**
     * Converts this [Group] to a raid [Group]
     *
     */
    ConvertToRaid() : void

    /**
     * Sets the member's subGroup
     *
     * @param uint64 guid : guid of the player to move
     * @param uint8 groupID : the subGroup's ID
     */
    SetMembersGroup(guid : uint64,subGroup : uint8) : void

    /**
     * Sets the target icon of an object for the [Group]
     *
     * @param uint8 icon : the icon (Skull, Square, etc)
     * @param uint64 target : GUID of the icon target, 0 is to clear the icon
     * @param uint64 setter : GUID of the icon setter
     */
    SetTargetIcon(icon : uint8,target : uint64,setter : uint64) : void
}

declare class TSWorldPacket {
    constructor(opcode: uint32, size: uint16);

    IsNull() : bool

    /**
     * Returns the opcode of the [WorldPacket].
     *
     * @return uint16 opcode
     */
    GetOpcode() : uint16

    /**
     * Returns the size of the [WorldPacket].
     *
     * @return uint32 size
     */
    GetSize() : uint32

    /**
     * Sets the opcode of the [WorldPacket] to the specified opcode.
     *
     * @param [Opcodes] opcode : see Opcodes.h for all known opcodes
     */
    SetOpcode(opcode : uint32) : void

    ReadInt8(): int8
    ReadInt8(index: uint32): int8
    WriteInt8(value: int8): void
    WriteInt8(index: uint32, value: int8): void

    ReadUInt8(): uint8
    ReadUInt8(index: uint32): uint8
    WriteUInt8(value: uint8): void
    WriteUInt8(index: uint32, value: uint8): void

    ReadInt16(): int16
    ReadInt16(index: uint32): int16
    WriteInt16(value: int16): void
    WriteInt16(index: int32, value: int16): void

    ReadUInt16(): uint16
    ReadUInt16(index: uint32): uint16
    WriteUInt16(value: uint16): void
    WriteUInt16(index: uint32, value: uint16): void

    ReadInt32(): int32
    ReadInt32(index: uint32): int32
    WriteInt16(value: int32): void
    WriteInt16(index: int32, value: int32): void

    ReadUInt32(): uint32
    ReadUInt32(index: uint32): uint32
    WriteUInt32(value: uint32): void
    WriteUInt32(index: uint32, value: uint32): void

    ReadInt64(): int64
    ReadInt64(index: uint64): int64
    WriteInt16(value: int64): void
    WriteInt16(index: int32, value: int64): void

    ReadUInt64(): uint64
    ReadUInt64(index: uint32): uint64
    WriteUInt64(value: uint64): void
    WriteUInt64(index: uint32, value: uint64): void

    ReadFloat(): float
    ReadFloat(index: uint32): float
    WriteFloat(value: float): void
    WriteFloat(index: uint32, value: float): void

    ReadDouble(): double
    ReadDouble(index: uint32): double
    WriteDouble(value: double): void
    WriteDouble(index: uint32, value: double): void

    ReadString(): string
    ReadString(index: uint32): string
    WriteString(value: string): void
    WriteString(index: uint32, value: string): void
}

declare interface TSWorldStatePacket {
    push(worldstate: uint32, value: int32): void
    length(): uint32
    GetVariable(index: uint32): int32
    GetValue(index: uint32): int32
    Remove(index: uint32): void
    Clear(): void
}

declare interface TSQuest {
    IsNull() : bool

    /**
     * Returns 'true' if the [Quest] has the specified flag, false otherwise.
     * Below flags are based off of 3.3.5a. Subject to change.
     *
     *     enum QuestFlags
     *     {
     *         // Flags used at server and sent to client
     *         QUEST_FLAGS_NONE                    = 0x0,
     *         QUEST_FLAGS_STAY_ALIVE              = 0x1,       // Not used currently
     *         QUEST_FLAGS_PARTY_ACCEPT            = 0x2,       // Not used currently. If player in party, all players that can accept this quest will receive confirmation box to accept quest CMSG_QUEST_CONFIRM_ACCEPT/SMSG_QUEST_CONFIRM_ACCEPT
     *         QUEST_FLAGS_EXPLORATION             = 0x4,       // Not used currently
     *         QUEST_FLAGS_SHARABLE                = 0x8,       // Can be shared: Player::CanShareQuest()
     *         QUEST_FLAGS_HAS_CONDITION           = 0x10,      // Not used currently
     *         QUEST_FLAGS_HIDE_REWARD_POI         = 0x20,      // Not used currently: Unsure of content
     *         QUEST_FLAGS_RAID                    = 0x40,      // Not used currently
     *         QUEST_FLAGS_TBC                     = 0x80,      // Not used currently: Available if TBC expansion enabled only
     *         QUEST_FLAGS_NO_MONEY_FROM_XP        = 0x100,     // Not used currently: Experience is not converted to gold at max level
     *         QUEST_FLAGS_TRACKING                = 0x400,     // These quests are automatically rewarded on quest complete and they will never appear in quest log client side.
     *         QUEST_FLAGS_DEPRECATE_REPUTATION    = 0x800,     // Not used currently
     *         QUEST_FLAGS_DAILY                   = 0x1000,    // Used to know quest is Daily one
     *         QUEST_FLAGS_FLAGS_PVP               = 0x2000,    // Having this quest in log forces PvP flag
     *         QUEST_FLAGS_UNAVAILABLE             = 0x4000,    // Used on quests that are not generically available
     *         QUEST_FLAGS_WEEKLY                  = 0x8000,
     *         QUEST_FLAGS_AUTOCOMPLETE            = 0x10000,   // auto complete
     *         QUEST_FLAGS_DISPLAY_ITEM_IN_TRACKER = 0x20000,   // Displays usable item in quest tracker
     *         QUEST_FLAGS_OBJ_TEXT                = 0x40000,   // use Objective text as Complete text
     *         QUEST_FLAGS_AUTO_ACCEPT             = 0x80000,   // The client recognizes this flag as auto-accept. However, NONE of the current quests (3.3.5a) have this flag. Maybe blizz used to use it, or will use it in the future.
     *
     *         // ... 4.x added flags up to 0x80000000 - all unknown for now
     *     }
     *
     * @param [QuestFlags] flag : all available flags can be seen above
     * @return bool hasFlag
     */
    HasFlag(flag : QuestFlags) : bool

    /**
     * Returns 'true' if the [Quest] is a daily quest, false otherwise.
     *
     * @return bool isDaily
     */
    IsDaily() : bool

    /**
     * Returns 'true' if the [Quest] is repeatable, false otherwise.
     *
     * @return bool isRepeatable
     */
    IsRepeatable() : bool

    /**
     * Returns entry ID of the [Quest].
     *
     * @return uint32 entryId
     */
    GetID() : uint32

    /**
     * Returns the [Quest]'s level.
     *
     * @return uint32 level
     */
    GetLevel() : uint32

    /**
     * Returns the minimum level required to pick up the [Quest].
     *
     * @return uint32 minLevel
     */
    GetMinLevel() : uint32

    /**
     * Returns the next [Quest] entry ID.
     *
     * @return int32 entryId
     */
    GetNextQuestID() : int32

    /**
     * Returns the previous [Quest] entry ID.
     *
     * @return int32 entryId
     */
    GetPrevQuestID() : int32

    /**
     * Returns the next [Quest] entry ID in the specific [Quest] chain.
     *
     * @return int32 entryId
     */
    GetNextQuestInChain() : int32

    /**
     * Returns the [Quest]'s flags.
     *
     * @return [QuestFlags] flags
     */
    GetFlags() : uint32

    /**
     * Returns the [Quest]'s type.
     *
     * TODO: Document types available.
     *
     * @return uint32 type
     */
    GetType() : uint32
}

declare interface TSMapManager {
    GetPlayer(guid: uint64): TSPlayer
    GetPlayer(name: string): TSPlayer
    GetMap(mapid: uint32, instanceId?: uint32): TSMap
}

declare interface TSMap extends TSEntityProvider, TSWorldEntityProvider<TSMap> {
    IsNull() : bool
    HasInstanceScript(): bool
    GetInstanceScript(): TSInstance
    GetUnits(): TSArray<TSWorldObject>
    DoDelayed(callback: (map: TSMap, mgr: TSMapManager)=>void): void;
    /**
     * @param entry only return gameobjects of this entry.
     * Leave out to select all gameobjects.
     */
    GetGameObjects(entry?: uint32): TSArray<TSGameObject>

    SpawnCreature(entry: uint32, x: float, y: float, z: float, o: float, despawnTimer?: uint32, phase?: uint32): TSCreature
    SpawnGameObject(entry: uint32, x: float, y: float, z: float, o: float, despawnTimer?: uint32, phase?: uint32): TSGameObject

    /**
     * @param entry only return creatures of this entry.
     * Leave out to select all creatures.
     */
    GetCreatures(entry?: uint32): TSArray<TSCreature>
    GetCreatureByDBGUID(dbguid: uint32): TSCreature;
    GetGameObjectByDBGUID(dbguid: uint32): TSGameObject;

    /**
     * Returns a creature in this map by its map id
     *
     * @important - This is NOT the creatures guid in the database,
     *              use "GetCreatureBySpawnGUID" for that.
     */
    GetCreature(guid: uint32): TSCreature;

    /**
     * Returns a gameobject in this map by its map id
     *
     * @important - This is NOT the gameobject guid in the database,
     *              use "GetGameObjectBySpawnGUID" for that.
     */
    GetGameObject(guid: uint32): TSGameObject;

    /**
     * Returns a player in this map by its guid
     */
    GetPlayer(guid: uint32): TSPlayer;

    /**
     * Returns `true` if the [Map] is an arena [BattleGround], `false` otherwise.
     *
     * @return bool isArena
     */
    IsArena() : bool

    /**
     * Returns `true` if the [Map] is a non-arena [BattleGround], `false` otherwise.
     *
     * @return bool isBattleGround
     */
    IsBG() : bool

    ToBG(): TSBattleground

    /**
     * Returns `true` if the [Map] is an instance, `false` otherwise.
     *
     * @return bool isBattleGround
     */
    IsInstance() : bool

    ToInstance(): TSInstance

    /**
     * Returns `true` if the [Map] is a dungeon, `false` otherwise.
     *
     * @return bool isDungeon
     */
    IsDungeon() : bool

    /**
     * Returns `true` if the [Map] has no [Player]s, `false` otherwise.
     *
     * @return bool isEmpty
     */
    IsEmpty() : bool

    /**
     * Returns `true` if the [Map] is a heroic, `false` otherwise.
     *
     * @return bool isHeroic
     */
    IsHeroic() : bool

    /**
     * Returns `true` if the [Map] is a raid, `false` otherwise.
     *
     * @return bool isRaid
     */
    IsRaid() : bool

    /**
     * Returns the name of the [Map].
     *
     * @return string mapName
     */
    GetName() : string

    /**
     * Returns the height of the [Map] at the given X and Y coordinates.
     *
     * In case of no height found nil is returned
     *
     * @param float x
     * @param float y
     * @return float z
     */
    GetHeight(x : float,y : float,phasemask : uint32) : float

    /**
     * Returns the difficulty of the [Map].
     *
     * Always returns 0 if the expansion is pre-TBC.
     *
     * @return int32 difficulty
     */
    GetDifficulty() : int32

    /**
     * Returns the instance ID of the [Map].
     *
     * @return uint32 instanceId
     */
    GetInstanceID() : uint32

    /**
     * Returns the player count currently on the [Map] (excluding GMs).
     *
     * @return uint32 playerCount
     */
    GetPlayerCount() : uint32

    /**
     * Returns the ID of the [Map].
     *
     * @return uint32 mapId
     */
    GetMapID() : uint32

    /**
    * Returns a table with all the current [Player]s in the map
    *
    *     enum TeamId
    *     {
    *         TEAM_ALLIANCE = 0,
    *         TEAM_HORDE = 1,
    *         TEAM_NEUTRAL = 2
    *
    * @param [TeamId] team : optional check team of the [Player], Alliance, Horde or Neutral/All (default)
    * @return table mapPlayers
    */
    GetPlayers(team? : TeamId) : TSArray<TSPlayer>

    /**
     * Returns the area ID of the [Map] at the specified X, Y, and Z coordinates.
     *
     * @param float x
     * @param float y
     * @param float z
     * @param uint32 phasemask = PHASEMASK_NORMAL
     * @return uint32 areaId
     */
    GetAreaID(x : float,y : float,z : float,phasemask : float) : uint32

    /**
     * Returns a [WorldObject] by its GUID from the map if it is spawned.
     *
     * @param uint64 guid
     */
    GetWorldObject(guid : uint64) : TSWorldObject

    /**
     * Sets the [Weather] type based on [WeatherType] and grade supplied.
     *
     *     enum WeatherType
     *     {
     *         WEATHER_TYPE_FINE       = 0,
     *         WEATHER_TYPE_RAIN       = 1,
     *         WEATHER_TYPE_SNOW       = 2,
     *         WEATHER_TYPE_STORM      = 3,
     *         WEATHER_TYPE_THUNDERS   = 86,
     *         WEATHER_TYPE_BLACKRAIN  = 90
     *
     * @param uint32 zone : id of the zone to set the weather for
     * @param [WeatherType] type : the [WeatherType], see above available weather types
     * @param float grade : the intensity/grade of the [Weather], ranges from 0 to 1
     */
    SetWeather(zoneId : uint32,weatherType : WeatherType,grade : float) : void
}

declare class TSItem extends TSObject {
    constructor();

    IsNull() : bool

    /**
     * Returns 'true' if the [Item] is soulbound, 'false' otherwise
     *
     * @return bool isSoulBound
     */
    IsSoulBound() : bool

    /**
     * Returns 'true' if the [Item] is account bound, 'false' otherwise
     *
     * @return bool isAccountBound
     */
    IsBoundAccountWide() : bool

    /**
     * Returns 'true' if the [Item] is bound to a [Player] by an enchant, 'false' otehrwise
     *
     * @return bool isBoundByEnchant
     */
    IsBoundByEnchant() : bool

    /**
     * Returns 'true' if the [Item] is not bound to the [Player] specified, 'false' otherwise
     *
     * @param [Player] player : the [Player] object to check the item against
     * @return bool isNotBound
     */
    IsNotBoundToPlayer(player : TSPlayer) : bool

    /**
     * Returns 'true' if the [Item] is locked, 'false' otherwise
     *
     * @return bool isLocked
     */
    IsLocked() : bool

    /**
     * Returns 'true' if the [Item] is a bag, 'false' otherwise
     *
     * @return bool isBag
     */
    IsBag() : bool

    /**
     * Returns 'true' if the [Item] is a currency token, 'false' otherwise
     *
     * @return bool isCurrencyToken
     */
    IsCurrencyToken() : bool

    /**
     * Returns 'true' if the [Item] is a not an empty bag, 'false' otherwise
     *
     * @return bool isNotEmptyBag
     */
    IsNotEmptyBag() : bool

    /**
     * Returns 'true' if the [Item] is broken, 'false' otherwise
     *
     * @return bool isBroken
     */
    IsBroken() : bool

    /**
     * Returns 'true' if the [Item] can be traded, 'false' otherwise
     *
     * @return bool isTradeable
     */
    CanBeTraded(mail : bool) : bool

    /**
     * Returns 'true' if the [Item] is currently in a trade window, 'false' otherwise
     *
     * @return bool isInTrade
     */
    IsInTrade() : bool

    /**
     * Returns 'true' if the [Item] is currently in a bag, 'false' otherwise
     *
     * @return bool isInBag
     */
    IsInBag() : bool

    /**
     * Returns 'true' if the [Item] is currently equipped, 'false' otherwise
     *
     * @return bool isEquipped
     */
    IsEquipped() : bool

    /**
     * Returns 'true' if the [Item] has the [Quest] specified tied to it, 'false' otherwise
     *
     * @param uint32 questId : the [Quest] id to be checked
     * @return bool hasQuest
     */
    HasQuest(quest : uint32) : bool

    /**
     * Returns 'true' if the [Item] is a potion, 'false' otherwise
     *
     * @return bool isPotion
     */
    IsPotion() : bool

    /**
     * Returns 'true' if the [Item] is a weapon vellum, 'false' otherwise
     *
     * @return bool isWeaponVellum
     */
    IsWeaponVellum() : bool

    /**
     * Returns 'true' if the [Item] is an armor vellum, 'false' otherwise
     *
     * @return bool isArmorVellum
     */
    IsArmorVellum() : bool

    /**
     * Returns 'true' if the [Item] is a conjured consumable, 'false' otherwise
     *
     * @return bool isConjuredConsumable
     */
    IsConjuredConsumable() : bool
    //GetItemLink(locale : uint8) : string

    GetTemplate(): TSItemTemplate
    GetOwnerGUID() : uint64

    /**
     * Returns the [Player] who currently owns the [Item]
     *
     * @return [Player] player : the [Player] who owns the [Item]
     */
    GetOwner() : TSPlayer

    /**
     * Returns the [Item]s stack count
     *
     * @return uint32 count
     */
    GetCount() : uint32

    /**
     * Returns the [Item]s max stack count
     *
     * @return uint32 maxCount
     */
    GetMaxStackCount() : uint32

    /**
     * Returns the [Item]s current slot
     *
     * @return uint8 slot
     */
    GetSlot() : uint8

    /**
     * Returns the [Item]s current bag slot
     *
     * @return uint8 bagSlot
     */
    GetBagSlot() : uint8

    /**
     * Returns the [Item]s enchantment ID by enchant slot specified
     *
     * @param [EnchantmentSlot] enchantSlot : the enchant slot specified
     * @return uint32 enchantId : the id of the enchant slot specified
     */
    GetEnchantmentID(enchant_slot : uint32) : uint32

    /**
     * Returns the spell ID tied to the [Item] by spell index
     *
     * @param uint32 spellIndex : the spell index specified
     * @return uint32 spellId : the id of the spell
     */
    GetSpellID(index : uint32) : uint32

    /**
     * Returns the spell trigger tied to the [Item] by spell index
     *
     * @param uint32 spellIndex : the spell index specified
     * @return uint32 spellTrigger : the spell trigger of the specified index
     */
    GetSpellTrigger(index : uint32) : uint32

    /**
     * Returns class of the [Item]
     *
     * @return uint32 class
     */
    GetClass() : uint32

    /**
     * Returns subclass of the [Item]
     *
     * @return uint32 subClass
     */
    GetSubClass() : uint32

    /**
     * Returns the name of the [Item]
     *
     * @return string name
     */
    GetName() : string

    /**
     * Returns the display ID of the [Item]
     *
     * @return uint32 displayId
     */
    GetDisplayID() : uint32

    /**
     * Returns the quality of the [Item]
     *
     * @return uint32 quality
     */
    GetQuality() : uint32

    /**
     * Returns the default purchase count of the [Item]
     *
     * @return uint32 count
     */
    GetBuyCount() : uint32

    /**
     * Returns the purchase price of the [Item]
     *
     * @return uint32 price
     */
    GetBuyPrice() : uint32

    /**
     * Returns the sell price of the [Item]
     *
     * @return uint32 price
     */
    GetSellPrice() : uint32

    /**
     * Returns the inventory type of the [Item]
     *
     * @return uint32 inventoryType
     */
    GetInventoryType() : uint32

    /**
     * Returns the [Player] classes allowed to use this [Item]
     *
     * @return uint32 allowableClass
     */
    GetAllowableClass() : uint32

    /**
     * Returns the [Player] races allowed to use this [Item]
     *
     * @return uint32 allowableRace
     */
    GetAllowableRace() : uint32

    /**
     * Returns the [Item]s level
     *
     * @return uint32 itemLevel
     */
    GetItemLevel() : uint32

    /**
     * Returns the minimum level required to use this [Item]
     *
     * @return uint32 requiredLevel
     */
    GetRequiredLevel() : uint32
    GetStatsCount() : uint32

    /**
     * Returns the random property ID of this [Item]
     *
     * @return uint32 randomPropertyId
     */
    GetRandomProperty() : uint32
    GetRandomSuffix() : int32

    /**
     * Returns the item set ID of this [Item]
     *
     * @return uint32 itemSetId
     */
    GetItemSet() : uint32

    /**
     * Returns the bag size of this [Item], 0 if [Item] is not a bag
     *
     * @return uint32 bagSize
     */
    GetBagSize() : uint32

    /**
     * Sets the [Player] specified as the owner of the [Item]
     *
     * @param [Player] player : the [Player] specified
     */
    SetOwner(player : TSPlayer) : void

    /**
     * Sets the binding of the [Item] to 'true' or 'false'
     *
     * @param bool setBinding
     */
    SetBinding(soulbound : bool) : void

    /**
     * Sets the stack count of the [Item]
     *
     * @param uint32 count
     */
    SetCount(count : uint32) : void

    /**
     * Sets the specified enchantment of the [Item] to the specified slot
     *
     * @param uint32 enchantId : the ID of the enchant to be applied
     * @param uint32 enchantSlot : the slot for the enchant to be applied to
     * @return bool enchantmentSuccess : if enchantment is successfully set to specified (EnchantmentSlot)slot, returns 'true', otherwise 'false'
     */
    SetEnchantment(enchant : uint32,slot : uint32) : bool

    /**
     * Removes an enchant from the [Item] by the specified slot
     *
     * @param uint32 enchantSlot : the slot for the enchant to be removed from
     * @return bool enchantmentRemoved : if enchantment is successfully removed from specified (EnchantmentSlot)slot, returns 'true', otherwise 'false'
     */
    ClearEnchantment(slot : uint32) : bool

    /**
     * Saves the [Item] to the database
     */
    SaveToDB() : void
}

declare interface TSBattlegroundPlayer extends TSEntityProvider, TSWorldEntityProvider<TSBattlegroundPlayer>{
    GetGUID(): uint64;
    GetTeam(): TeamId;
    GetOfflineRemovalTime(): uint64;
}

declare interface TSBattleground extends TSMap {
    IsNull() : bool

    GetBracketID(): uint32

    /**
     * Returns the name of the [BattleGround].
     *
     * @return string name
     */
    GetBGName() : string

    /**
     * Returns the amount of alive players in the [BattleGround] by the team ID.
     *
     * @param [Team] team : team ID
     * @return uint32 count
     */
    GetAlivePlayersCountByTeam(team : TeamId) : uint32

    /**
     * Returns the bonus honor given by amount of kills in the specific [BattleGround].
     *
     * @param uint32 kills : amount of kills
     * @return uint32 bonusHonor
     */
    GetBonusHonorFromKillCount(kills : uint32) : uint32

    /**
     * Returns the end time of the [BattleGround].
     *
     * @return uint32 endTime
     */
    GetEndTime() : uint32

    /**
     * Returns the amount of free slots for the selected team in the specific [BattleGround].
     *
     * @param [Team] team : team ID
     * @return uint32 freeSlots
     */
    GetFreeSlotsForTeam(team : TeamId) : uint32

    /**
     * Returns the instance ID of the [BattleGround].
     *
     * @return uint32 instanceId
     */
    GetInstanceID() : uint32

    /**
     * Returns the type ID of the [BattleGround].
     *
     * @return [BattleGroundTypeId] typeId
     */
    GetTypeID() : uint32

    /**
     * Returns the max allowed [Player] level of the specific [BattleGround].
     *
     * @return uint32 maxLevel
     */
    GetMaxLevel() : uint32

    /**
     * Returns the minimum allowed [Player] level of the specific [BattleGround].
     *
     * @return uint32 minLevel
     */
    GetMinLevel() : uint32

    /**
     * Returns the maximum allowed [Player] count of the specific [BattleGround].
     *
     * @return uint32 maxPlayerCount
     */
    GetMaxPlayers() : uint32

    /**
     * Returns the minimum allowed [Player] count of the specific [BattleGround].
     *
     * @return uint32 minPlayerCount
     */
    GetMinPlayers() : uint32

    /**
     * Returns the maximum allowed [Player] count per team of the specific [BattleGround].
     *
     * @return uint32 maxTeamPlayerCount
     */
    GetMaxPlayersPerTeam() : uint32

    /**
     * Returns the minimum allowed [Player] count per team of the specific [BattleGround].
     *
     * @return uint32 minTeamPlayerCount
     */
    GetMinPlayersPerTeam() : uint32

    /**
     * Returns the winning team of the specific [BattleGround].
     *
     * @return [Team] team
     */
    GetWinner() : uint32

    /**
     * Returns the status of the specific [BattleGround].
     *
     * @return [BattleGroundStatus] status
     */
    GetStatus() : uint32

    IsRandom(): bool;
    GetBGPlayer(guid: uint64): TSBattlegroundPlayer;
    GetBGPlayers(): TSArray<TSBattlegroundPlayer>;
    SetStartPosition(teamId: uint32, x: float, y: float, z: float, o: float): void;
    GetStartX(teamid: TeamId): float;
    GetStartY(teamid: TeamId): float;
    GetStartZ(teamid: TeamId): float;
    GetStartO(teamid: TeamId): float;
    SetStartMaxDist(maxDist: float): void;
    GetStartMaxDist(): float;
    SendPacket(packet: TSWorldPacket, team?: TeamId, sender? : TSPlayer, self?: bool): void;
    PlaySound(sound: uint32, team?: uint32): void;
    CastSpell(spell: uint32, team?: uint32): void;
    RemoveAura(aura: uint32, team?: uint32): void;
    RewardHonor(honor: uint32, team?: uint32): void;
    RewardReputation(faction: uint32, reputation: uint32, team?: TeamId): void;
    UpdateWorldState(variable: uint32, value: uint32): void;
    EndBG(winnerTeam?: TeamId): void;
    GetBGRaid(faction: TeamId): TSGroup;
    GetBGPlayerCount(team?: TeamId): uint32;
    GetBGAlivePlayerCount(team?: TeamId): uint32;
    AddCreature(entry: uint32, type: uint32, x: float, y: float, z: float, o: float, respawnTime?: uint32, teamId?: TeamId): TSCreature;
    AddObject(type: uint32, entry:uint32, x: float, y: float, z: float, o: float, rot0: float, rot1: float, rot2: float, rot3: float, respawnTime?: uint32, goState?: uint32): bool;
    AddSpiritGuide(type: uint32, x: float, y: float, z: float, o: float, teamId?: TeamId): void;
    OpenDoor(type: uint32): void;
    CloseDoor(type: uint32): void;
    IsPlayerInBG(guid: uint64): bool;
    GetTeamScore(team: TeamId): uint32;
    SendMessage(entry: uint32, type: uint8, source?: TSPlayer): void;
    GetUniqueBracketID(): uint32;

    GetStartDelayTime(): int32;
    SetStartDelayTime(time: int32): void;
    SetStartTime(time: uint32): void;
    GetStartTime(): uint32;
    RemoveCreature(type: uint32): bool;
    RemoveObject(type: uint32): bool;
    RemoveObjectFromWorld(type: uint32): bool;
    GetObjectType(guid: uint64): int32;
    SetHoliday(isHoliday: bool): void;
    IsHoliday(): bool;
    GetBGGameObject(type: uint32, logErrors?: bool): TSGameObject;
    GetBGCreature(type: uint32, logErrors?: bool): TSCreature;
}

declare interface TSGuidSet {
    Contains(id: uint64): bool
    Add(id: uint64): void
    Remove(id: uint64): void
}

declare interface TSBossInfo {
    GetBossState(): uint32
    GetMinionGUIDs(): TSGuidSet
    GetDoorsOpenDuringEncounter(): TSGuidSet
    GetDoorsClosedDuringEncounter(): TSGuidSet
    GetDoorsOpenAfterEncounter(): TSGuidSet
    IsWithinBoundary(x: float, y: float, z: float): bool
    IsWithinBoundary(obj: TSWorldObject): bool
}

declare interface TSInstance extends TSMap {
    IsNull(): bool;
    SaveToDB(): void;
    IsEncounterInProgress(): bool;
    GetEncounterCount(): uint32;
    GetObjectGUID(type: uint32): uint64;
    DoUseDoorOrButton(guid: uint64, withRestoreTime?: uint32, useAlternativeState?: bool): void;
    DoCloseDoorOrButton(guid: uint64): void;
    DoRespawnGameObject(guid: uint64, seconds: uint32): void
    DoUpdateWorldState(worldStateId: uint32, worldStateValue: uint32): void;
    DoSendNotify(message: string): void;
    DoUpdateAchievementCriteria(type: uint32, miscValue1?: uint32, miscValue2?: uint32, unit?: TSUnit): void;
    DoStartTimedAchievement(type: uint32, entry: uint32): void;
    DoStopTimedAchievement(type: uint32, entry: uint32): void;
    DoRemoveAurasDueToSpellOnPlayers(spell: uint32, includePets?: bool, includeControlled?: bool): void;
    DoCastSpellOnPlayers(spell: uint32, includePets: bool, includeControlled: bool): void;
    SetBossState(id: uint32, encounterState: uint32): void;
    GetBossState(id: uint32): uint32;
    MarkAreaTriggerDone(id: uint32): void;
    ResetAreaTriggerDone(id: uint32): void;
    BindAllPlayers(): void;
    HasPermBoundPlayers(): bool;
    GetMaxPlayers(): uint32;
    GetMaxResetDelay(): uint32;
    GetTeamIDInInstance(): uint32;
    GetFactionInInstance(): uint32;
    GetBossInfo(id: uint32): TSBossInfo
}

declare interface TSGameObject extends TSWorldObject {
    IsAIEnabled(): bool

    IsNull() : bool

    GetLoot(): TSLoot;

    FireSmartEvent(id: uint32, unit: TSUnit, var0: uint32, var1: uint32, bvar: bool, spell: TSSpellInfo, obj: TSGameObject);

    /**
     * Returns 'true' if the [GameObject] can give the specified [Quest]
     *
     * @param uint32 questId : quest entry Id to check
     * @return bool hasQuest
     */
    HasQuest(questId : uint32) : bool

    /**
     * Returns 'true' if the [GameObject] is spawned
     *
     * @return bool isSpawned
     */
    IsSpawned() : bool

    /**
     * Returns 'true' if the [GameObject] is a transport
     *
     * @return bool isTransport
     */
    IsTransport() : bool

    /**
     * Returns 'true' if the [GameObject] is active
     *
     * @return bool isActive
     */
    IsActive() : bool

    /**
     * Returns display ID of the [GameObject]
     *
     * @return uint32 displayId
     */
    GetDisplayID() : uint32

    /**
     * Returns the state of a [GameObject]
     * Below are client side [GOState]s off of 3.3.5a
     *
     *     enum GOState
     *     {
     *         GO_STATE_ACTIVE             = 0,                        // show in world as used and not reset (closed door open)
     *         GO_STATE_READY              = 1,                        // show in world as ready (closed door close)
     *         GO_STATE_ACTIVE_ALTERNATIVE = 2                         // show in world as used in alt way and not reset (closed door open by cannon fire)
     *     }
     *
     * @return [GOState] goState
     */
    GetGoState() : GOState

    /**
     * Returns the [LootState] of a [GameObject]
     * Below are [LootState]s off of 3.3.5a
     *
     *     enum LootState
     *     {
     *         GO_NOT_READY = 0,
     *         GO_READY,                                               // can be ready but despawned, and then not possible activate until spawn
     *         GO_ACTIVATED,
     *         GO_JUST_DEACTIVATED
     *     }
     *
     * @return [LootState] lootState
     */
    GetLootState() : LootState

    /**
     * Returns the [Player] that can loot the [GameObject]
     *
     * Not the original looter and may be nil.
     *
     * @return [Player] player
     */
    GetLootRecipient() : TSPlayer

    /**
     * Returns the [Group] that can loot the [GameObject]
     *
     * Not the original looter and may be nil.
     *
     * @return [Group] group
     */
    GetLootRecipientGroup() : TSGroup

    /**
     * Returns the guid of the [GameObject] that is used as the ID in the database
     *
     * @return uint32 dbguid
     */
    GetDBTableGUIDLow() : uint32

    /**
     * Sets the state of a [GameObject]
     *
     *     enum GOState
     *     {
     *         GO_STATE_ACTIVE             = 0,                        // show in world as used and not reset (closed door open)
     *         GO_STATE_READY              = 1,                        // show in world as ready (closed door close)
     *         GO_STATE_ACTIVE_ALTERNATIVE = 2                         // show in world as used in alt way and not reset (closed door open by cannon fire)
     *     }
     *
     * @param [GOState] state : all available go states can be seen above
     */
    SetGoState(state : GOState) : void

    /**
     * Sets the [LootState] of a [GameObject]
     * Below are [LootState]s off of 3.3.5a
     *
     *     enum LootState
     *     {
     *         GO_NOT_READY = 0,
     *         GO_READY,                                               // can be ready but despawned, and then not possible activate until spawn
     *         GO_ACTIVATED,
     *         GO_JUST_DEACTIVATED
     *     }
     *
     * @param [LootState] state : all available loot states can be seen above
     */
    SetLootState(state : LootState) : void

    /**
     * Saves [GameObject] to the database
     *
     */
    SaveToDB() : void

    /**
     * Removes [GameObject] from the world
     *
     * The object is no longer reachable after this and it is not respawned.
     *
     * @param bool deleteFromDB : if true, it will delete the [GameObject] from the database
     */
    RemoveFromWorld(deldb : bool) : void

    /**
     * Activates a door or a button/lever
     *
     * @param uint32 delay = 0 : cooldown time in seconds to restore the [GameObject] back to normal. 0 for infinite duration
     */
    UseDoorOrButton(delay : uint32) : void

    /**
     * Despawns a [GameObject]
     *
     * The gameobject may be automatically respawned by the core
     */
    Despawn() : void

    /**
     * Respawns a [GameObject]
     */
    Respawn() : void

    /**
     * Sets the respawn or despawn time for the gameobject.
     *
     * Respawn time is also used as despawn time depending on gameobject settings
     *
     * @param int32 delay = 0 : cooldown time in seconds to respawn or despawn the object. 0 means never
     */
    SetRespawnTime(respawn : int32) : void
}

declare interface TSSpell {
	//soonTM
	GetSpellInfo() : TSSpellInfo

    IsNull() : bool

    /**
     * Returns `true` if the [Spell] is automatically repeating, `false` otherwise.
     *
     * @return bool isAutoRepeating
     */
    IsAutoRepeat() : bool

    /**
     * Returns the [Unit] that casted the [Spell].
     *
     * @return [Unit] caster
     */
    GetCaster() : TSUnit

    /**
     * Returns the cast time of the [Spell].
     *
     * @return int32 castTime
     */
    GetCastTime() : int32

    /**
     * Returns the entry ID of the [Spell].
     *
     * @return uint32 entryId
     */
    GetEntry() : uint32

    /**
     * Returns the power cost of the [Spell].
     *
     * @return uint32 powerCost
     */
    GetPowerCost() : uint32

    /**
     * Returns the spell duration of the [Spell].
     *
     * @return int32 duration
     */
    GetDuration() : int32

    /**
     * Returns the target destination coordinates of the [Spell].
     *
     * @return float x : x coordinate of the [Spell]
     * @return float y : y coordinate of the [Spell]
     * @return float z : z coordinate of the [Spell]
     */
    GetTargetDest() : TSPosition

    /**
     * Returns the target [Object] of the [Spell].
     *
     * The target can be any of the following [Object] types:
     * - [Player]
     * - [Creature]
     * - [GameObject]
     * - [Item]
     * - [Corpse]
     *
     * @return [Object] target
     */
    GetTarget() : TSObject

    /**
     * Sets the [Spell] to automatically repeat.
     *
     * @param bool repeat : set variable to 'true' for spell to automatically repeat
     */
    SetAutoRepeat(repeat : bool) : void

    /**
     * Casts the [Spell].
     *
     * @param bool skipCheck = false : skips initial checks to see if the [Spell] can be casted or not, this is optional
     */
    Cast(skipCheck : bool) : void

    /**
     * Cancels the [Spell].
     */
    Cancel() : void

    /**
     * Finishes the [Spell].
     */
    Finish() : void
}

declare interface TSVehicle {
    IsNull() : bool

    /**
     * Returns true if the [Unit] passenger is on board
     *
     * @param [Unit] passenger
     * @return bool isOnBoard
     */
    IsOnBoard(passenger : TSUnit) : bool

    /**
     * Returns the [Vehicle]'s owner
     *
     * @return [Unit] owner
     */
    GetOwner() : TSUnit

    /**
     * Returns the [Vehicle]'s entry
     *
     * @return uint32 entry
     */
    GetEntry() : uint32

    /**
     * Returns the [Vehicle]'s passenger in the specified seat
     *
     * @param int8 seat
     * @return [Unit] passenger
     */
    GetPassenger(seatId : int8) : TSUnit

    /**
     * Adds [Unit] passenger to a specified seat in the [Vehicle]
     *
     * @param [Unit] passenger
     * @param int8 seat
     */
    AddPassenger(passenger : TSUnit,seatId : int8) : void

    /**
     * Removes [Unit] passenger from the [Vehicle]
     *
     * @param [Unit] passenger
     */
    RemovePassenger(passenger : TSUnit) : void
}

declare interface TSCollisionEntry {
    readonly name: string;
    maxHits: uint32;
    range: float;
    minDelay: uint64;
    hitmap: TSDictionary<uint64,uint32>
    Tick(value: TSWorldObject, force?: boolean)
}

declare type TSCollisionCallback = (self: TSWorldObject, collided: TSWorldObject, cancel: TSMutable<uint32>, entry: TSCollisionEntry)=>void

declare interface TSCollisions {
    Add(modid: uint32, id: string, range: float, minDelay: uint32, maxHits: uint32, callback: TSCollisionCallback)
    Contains(id: string): bool;
    Get(id: string): TSCollisionEntry;
}

declare interface TSWorldObject extends TSObject, TSWorldEntityProvider<TSWorldObject> {
    GetCollisions(): TSCollisions;
    IsNull() : bool
    GetCreaturesInRange(range : float,entry : uint32,hostile : uint32,dead : uint32) : TSArray<TSCreature>
    GetUnitsInRange(range : float,hostile : uint32,dead : uint32) : TSArray<TSUnit>
    GetPlayersInRange(range : float,hostile : uint32,dead : uint32) : TSArray<TSPlayer>
    GetGameObjectsInRange(range : float,entry : uint32,hostile : uint32) : TSArray<TSGameObject>

    HasCollision(id: string);
    AddCollision(id: string, range: float, minDelay: uint32, maxHits: uint32, cb: TSCollisionCallback)
    GetCollision(id: string): TSCollisionEntry

    IsFriendlyTo(obj: TSWorldObject): bool
    IsHostileTo(obj: TSWorldObject): bool
    IsFriendlyToPlayers(): bool
    IsHostileToPlayers(): bool
    IsNeutralToAll(): bool

    /**
     * Returns the name of the [WorldObject]
     *
     * @return string name
     */
    GetName() : string

    /**
     * Returns the current [Map] object of the [WorldObject]
     *
     * @return [Map] mapObject
     */
    GetMap() : TSMap

    /**
     * Returns the current phase of the [WorldObject]
     *
     * @return uint32 phase
     */
    GetPhaseMask() : uint32

    /**
    * Sets the [WorldObject]'s phase mask.
    *
    * @param uint32 phaseMask
    * @param bool update = true : update visibility to nearby objects
    * @param PhaseType phaseType = PhaseType::PHASE_MASK : what type of phase the unit is entering.
    * @note changing PhaseType will always force a phase update
    */
    SetPhaseMask(phaseMask : uint32,update : bool, id: uint64) : void

    /**
     * Returns the [WorldObject]'s phase id.
     */
    GetPhaseID(): uint64

    /**
     * Returns the current instance ID of the [WorldObject]
     *
     * @return uint32 instanceId
     */
    GetInstanceID() : uint32

    /**
     * Returns the current area ID of the [WorldObject]
     *
     * @return uint32 areaId
     */
    GetAreaID() : uint32

    /**
     * Returns the current zone ID of the [WorldObject]
     *
     * @return uint32 zoneId
     */
    GetZoneID() : uint32

    /**
     * Returns the current map ID of the [WorldObject]
     *
     * @return uint32 mapId
     */
    GetMapID() : uint32

    /**
     * Returns the current X coordinate of the [WorldObject]
     *
     * @return float x
     */
    GetX() : float

    /**
     * Returns the current Y coordinate of the [WorldObject]
     *
     * @return float y
     */
    GetY() : float

    /**
     * Returns the current Z coordinate of the [WorldObject]
     *
     * @return float z
     */
    GetZ() : float

    /**
     * Returns the current orientation of the [WorldObject]
     *
     * @return float orientation / facing
     */
    GetO() : float
    GetPosition() : TSPosition
    GetNearestPlayer(range : float,hostile : uint32,dead : uint32) : TSPlayer
    GetNearestGameObject(range : float,entry : uint32,hostile : uint32) : TSGameObject
    GetNearestCreature(range : float,entry : uint32,hostile : uint32,dead : uint32) : TSCreature

    /**
     * Returns the distance from this [WorldObject] to another [WorldObject]
     *
     * The function takes into account the given object sizes. See also [WorldObject:GetExactDistance], [WorldObject:GetDistance2d]
     *
     * @proto dist = (obj)
     *
     * @param [WorldObject] obj
     *
     * @return float dist : the distance in yards
     */
    GetDistance(target : TSWorldObject) : float

    GetDistanceToPoint(x: float, y: float, z: float): float

    /**
     * Returns the distance from this [WorldObject] to another [WorldObject]
     *
     * The function takes into account the given object sizes. See also [WorldObject:GetDistance], [WorldObject:GetExactDistance2d]
     *
     * @proto dist = (obj)
     *
     * @param [WorldObject] obj
     *
     * @return float dist : the distance in yards
     */
    GetDistance2d(target : TSWorldObject) : float

    GetDistanceToPoint2d(X : float,Y : float) : float
    /**
     * Returns the x, y and z of a point dist away from the [WorldObject].
     *
     * @param float distance : specifies the distance of the point from the [WorldObject] in yards
     * @param float angle : specifies the angle of the point relative to the orientation / facing of the [WorldObject] in radians
     *
     * @return float x
     * @return float y
     * @return float z
     */
    GetRelativePoint(dist : float,rad : float) : TSPosition

    /**
     * Sends a [WorldPacket] to [Player]s in sight of the [WorldObject].
     *
     * @param [WorldPacket] packet
     */
    SendPacket(data : TSWorldPacket) : void

    /**
     * Spawns a [GameObject] at specified location.
     *
     * @param uint32 entry : [GameObject] entry ID
     * @param float x
     * @param float y
     * @param float z
     * @param float o
     * @param uint32 respawnDelay = 30 : respawn time in seconds
     * @return [GameObject] gameObject
     */
    SummonGameObject(entry : uint32,x : float,y : float,z : float,o : float,respawnDelay : uint32) : TSGameObject

    /**
     * Spawns the creature at specified location.
     *
     *     enum TempSummonType
     *     {
     *         TEMPSUMMON_TIMED_OR_DEAD_DESPAWN       = 1, // despawns after a specified time OR when the creature disappears
     *         TEMPSUMMON_TIMED_OR_CORPSE_DESPAWN     = 2, // despawns after a specified time OR when the creature dies
     *         TEMPSUMMON_TIMED_DESPAWN               = 3, // despawns after a specified time
     *         TEMPSUMMON_TIMED_DESPAWN_OUT_OF_COMBAT = 4, // despawns after a specified time after the creature is out of combat
     *         TEMPSUMMON_CORPSE_DESPAWN              = 5, // despawns instantly after death
     *         TEMPSUMMON_CORPSE_TIMED_DESPAWN        = 6, // despawns after a specified time after death
     *         TEMPSUMMON_DEAD_DESPAWN                = 7, // despawns when the creature disappears
     *         TEMPSUMMON_MANUAL_DESPAWN              = 8, // despawnswhen TSWorldObject::UnSummon() is called
     *         TEMPSUMMON_TIMED_OOC_OR_CORPSE_DESPAWN = 9, // despawns after a specified time (OOC) OR when the creature dies
     *         TEMPSUMMON_TIMED_OOC_OR_DEAD_DESPAWN   = 10 // despawns after a specified time (OOC) OR when the creature disappears
     *
     * @param uint32 entry : [Creature]'s entry ID
     * @param float x
     * @param float y
     * @param float z
     * @param float o
     * @param [TempSummonType] spawnType = MANUAL_DESPAWN : defines how and when the creature despawns
     * @param uint32 despawnTimer = 0 : despawn time in milliseconds
     * @return [Creature] spawnedCreature
     */
    SpawnCreature(entry : uint32,x : float,y : float,z : float,o : float,spawnType : TempSummonType,despawnTimer : uint32) : TSCreature

    /**
     * Returns true if the given [WorldObject] or coordinates are in the [WorldObject]'s line of sight
     *
     * @proto isInLoS = (worldobject)
     * @proto isInLoS = (x, y, z)
     *
     * @param [WorldObject] worldobject
     * @param float x
     * @param float y
     * @param float z
     * @return bool isInLoS
     */
    IsWithinLoS(target : TSWorldObject,x : float,y : float,z : float) : bool

    /**
     * Returns true if the [WorldObject]s are on the same map
     *
     * @param [WorldObject] worldobject
     * @return bool isInMap
     */
    IsInMap(target : TSWorldObject) : bool

    /**
     * Returns true if the point is in the given distance of the [WorldObject]
     *
     * Notice that the distance is measured from the edge of the [WorldObject].
     *
     * @param float x
     * @param float y
     * @param float z
     * @param float distance
     * @return bool isInDistance
     */
    IsWithinDist3d(x : float,y : float,z : float,dist : float) : bool

    /**
     * Returns true if the point is in the given distance of the [WorldObject]
     *
     * The distance is measured only in x,y coordinates.
     * Notice that the distance is measured from the edge of the [WorldObject].
     *
     * @param float x
     * @param float y
     * @param float distance
     * @return bool isInDistance
     */
    IsWithinDist2d(x : float,y : float,dist : float) : bool

    /**
     * Returns true if the target is in the given distance of the [WorldObject]
     *
     * Notice that the distance is measured from the edge of the [WorldObject]s.
     *
     * @param [WorldObject] target
     * @param float distance
     * @param bool is3D = true : if false, only x,y coordinates used for checking
     * @return bool isInDistance
     */
    IsWithinDist(target : TSWorldObject,distance : float,is3D : bool) : bool

    /**
     * Returns true if the [WorldObject] is on the same map and within given distance
     *
     * Notice that the distance is measured from the edge of the [WorldObject]s.
     *
     * @param [WorldObject] target
     * @param float distance
     * @param bool is3D = true : if false, only x,y coordinates used for checking
     * @return bool isInDistance
     */
    IsWithinDistInMap(target : TSWorldObject,distance : float,is3D : bool) : bool

    /**
     * Returns true if the target is within given range
     *
     * Notice that the distance is measured from the edge of the [WorldObject]s.
     *
     * @param [WorldObject] target
     * @param float minrange
     * @param float maxrange
     * @param bool is3D = true : if false, only x,y coordinates used for checking
     * @return bool isInDistance
     */
    IsInRange(target : TSWorldObject,minrange : float,maxrange : float,is3D : bool) : bool

    /**
     * Returns true if the point is within given range
     *
     * Notice that the distance is measured from the edge of the [WorldObject].
     *
     * @param float x
     * @param float y
     * @param float minrange
     * @param float maxrange
     * @return bool isInDistance
     */
    IsInRange2d(x : float,y : float,minrange : float,maxrange : float) : bool

    /**
     * Returns true if the point is within given range
     *
     * Notice that the distance is measured from the edge of the [WorldObject].
     *
     * @param float x
     * @param float y
     * @param float z
     * @param float minrange
     * @param float maxrange
     * @return bool isInDistance
     */
    IsInRange3d(x : float,y : float,z : float,minrange : float,maxrange : float) : bool

    /**
     * Returns true if the target is in the given arc in front of the [WorldObject]
     *
     * @param [WorldObject] target
     * @param float arc = pi
     * @return bool isInFront
     */
    IsInFront(target : TSWorldObject,arc : float) : bool

    /**
     * Returns true if the target is in the given arc behind the [WorldObject]
     *
     * @param [WorldObject] target
     * @param float arc = pi
     * @return bool isInBack
     */
    IsInBack(target : TSWorldObject,arc : float) : bool

    /**
     * The [WorldObject] plays music to a [Player]
     *
     * If no [Player] provided it will play the music to everyone near.
     * This method does not interrupt previously played music.
     *
     * See also [WorldObject:PlayDistanceSound], [WorldObject:PlayDirectSound]
     *
     * @param uint32 music : entry of a music
     * @param [Player] player = nil : [Player] to play the music to
     */
    PlayMusic(musicid : uint32,player : TSPlayer) : void

    /**
     * The [WorldObject] plays a sound to a [Player]
     *
     * If no [Player] provided it will play the sound to everyone near.
     * This method will play sound and does not interrupt prvious sound.
     *
     * See also [WorldObject:PlayDistanceSound], [WorldObject:PlayMusic]
     *
     * @param uint32 sound : entry of a sound
     * @param [Player] player = nil : [Player] to play the sound to
     */
    PlayDirectSound(soundId : uint32,player : TSPlayer) : void

    /**
     * The [WorldObject] plays a sound to a [Player]
     *
     * If no [Player] it will play the sound to everyone near.
     * Sound will fade the further you are from the [WorldObject].
     * This method interrupts previously playing sound.
     *
     * See also [WorldObject:PlayDirectSound], [WorldObject:PlayMusic]
     *
     * @param uint32 sound : entry of a sound
     * @param [Player] player = nil : [Player] to play the sound to
     */
    PlayDistanceSound(soundId : uint32,player : TSPlayer) : void

    GetGameObject(guid: uint64): TSGameObject
    GetCorpse(guid: uint64): TSCorpse
    GetUnit(guid: uint64): TSUnit
    GetCreature(guid: uint64): TSCreature
    GetPlayer(guid: uint64): TSPlayer
}

declare class TSObject extends TSEntityProvider {
    IsNull() : bool
    IsUnit() : bool
    IsCreature() : bool
    IsGameObject() : bool
    IsPlayer() : bool
    IsCorpse() : bool
    IsItem() : bool

    GetEffectiveOwner(): TSUnit

    /**
     * Returns `true` if the specified flag is set, otherwise `false`.
     *
     * @param uint16 index : the index of the flags data in the [Object]
     * @param uint32 flag : the flag to check for in the flags data
     * @return bool hasFlag
     */
    HasFlag(index : uint16,flag : uint32) : bool

    /**
     * Returns `true` if the [Object] has been added to its [Map], otherwise `false`.
     *
     * @return bool inWorld
     */
    IsInWorld() : bool

    /**
     * Returns the data at the specified index, casted to a signed 32-bit integer.
     *
     * @param uint16 index
     * @return int32 value
     */
    GetCoreInt32(index : uint16) : int32

    /**
     * Returns the data at the specified index, casted to a unsigned 32-bit integer.
     *
     * @param uint16 index
     * @return uint32 value
     */
    GetCoreUInt32(index : uint16) : uint32

    /**
     * Returns the data at the specified index, casted to a single-precision floating point value.
     *
     * @param uint16 index
     * @return float value
     */
    GetCoreFloat(index : uint16) : float

    /**
     * Returns the data at the specified index and offset, casted to an unsigned 8-bit integer.
     *
     * E.g. if you want the second byte at index 10, you would pass in 1 as the offset.
     *
     * @param uint16 index
     * @param uint8 offset : should be 0, 1, 2, or 3
     * @return uint8 value
     */
    GetCoreByte(index : uint16,offset : uint8) : uint8

    /**
     * Returns the data at the specified index and offset, casted to a signed 16-bit integer.
     *
     * E.g. if you want the second half-word at index 10, you would pass in 1 as the offset.
     *
     * @param uint16 index
     * @param uint8 offset : should be 0 or 1
     * @return uint16 value
     */
    GetCoreUInt16(index : uint16,offset : uint8) : uint16

    /**
     * Returns the scale/size of the [Object].
     *
     * This affects the size of a [WorldObject] in-game, but [Item]s don't have a "scale".
     *
     * @return float scale
     */
    GetScale() : float

    /**
     * Returns the entry of the [Object].
     *
     * [Player]s do not have an "entry".
     *
     * @return uint32 entry
     */
    GetEntry() : uint32

    /**
     * Returns the GUID of the [Object].
     *
     * GUID is an unique identifier for the object.
     *
     * However on MaNGOS and cMangos creatures and gameobjects inside different maps can share
     * the same GUID but not on the same map.
     *
     * On TrinityCore this value is unique across all maps
     *
     * @return uint64 guid
     */
    GetGUID() : uint64

    /**
     * Returns the low-part of the [Object]'s GUID.
     *
     * On TrinityCore all low GUIDs are different for all objects of the same type.
     * For example creatures in instances are assigned new GUIDs when the Map is created.
     *
     * On MaNGOS and cMaNGOS low GUIDs are unique only on the same map.
     * For example creatures in instances use the same low GUID assigned for that spawn in the database.
     * This is why to identify a creature you have to know the instanceId and low GUID. See [Map:GetIntstanceId]
     *
     * @return uint32 guidLow
     */
    GetGUIDLow() : uint32

    /**
     * Returns the TypeId of the [Object].
     *
     *     enum TypeID
     *     {
     *         TYPEID_OBJECT        = 0,
     *         TYPEID_ITEM          = 1,
     *         TYPEID_CONTAINER     = 2,
     *         TYPEID_UNIT          = 3,
     *         TYPEID_PLAYER        = 4,
     *         TYPEID_GAMEOBJECT    = 5,
     *         TYPEID_DYNAMICOBJECT = 6,
     *         TYPEID_CORPSE        = 7
     *
     * @return uint8 typeID
     */
    GetTypeID() : TypeID

    /**
     * Returns the data at the specified index, casted to an unsigned 64-bit integer.
     *
     * @param uint16 index
     * @return uint64 value
     */
    GetCoreUInt64(index : uint16) : uint64

    /**
     * Sets the specified flag in the data value at the specified index.
     *
     * If the flag was already set, it remains set.
     *
     * To remove a flag, use [Object:RemoveFlag].
     *
     * @param uint16 index
     * @param uint32 value
     */
    SetFlag(index : uint16,flag : uint32) : void

    /**
     * Sets the data at the specified index to the given value, converted to a signed 32-bit integer.
     *
     * @param uint16 index
     * @param int32 value
     */
    SetCoreInt32(index : uint16,value : int32) : void

    /**
     * Sets the data at the specified index to the given value, converted to an unsigned 32-bit integer.
     *
     * @param uint16 index
     * @param uint32 value
     */
    SetCoreUInt32(index : uint16,value : uint32) : void

    /**
     * Sets the data at the specified index to the given value, converted to an unsigned 32-bit integer.
     *
     * @param uint16 index
     * @param uint32 value
     */
    UpdateCoreUInt32(index : uint16,value : uint32) : void

    /**
     * Sets the data at the specified index to the given value, converted to a single-precision floating point value.
     *
     * @param uint16 index
     * @param float value
     */
    SetCoreFloat(index : uint16,value : float) : void

    /**
     * Sets the data at the specified index and offset to the given value, converted to an unsigned 8-bit integer.
     *
     * @param uint16 index
     * @param uint8 offset : should be 0, 1, 2, or 3
     * @param uint8 value
     */
    SetCoreByte(index : uint16,offset : uint8,value : uint8) : void

    /**
     * Sets the data at the specified index to the given value, converted to an unsigned 16-bit integer.
     *
     * @param uint16 index
     * @param uint8 offset : should be 0 or 1
     * @param uint16 value
     */
    SetCoreUInt16(index : uint16,offset : uint8,value : uint16) : void

    /**
     * Sets the data at the specified index to the given value, converted to a signed 16-bit integer.
     *
     * @param uint16 index
     * @param uint8 offset : should be 0 or 1
     * @param int16 value
     */
    SetCoreInt16(index : uint16,offset : uint8,value : int16) : void

    /**
     * Sets the [Object]'s scale/size to the given value.
     *
     * @param float scale
     */
    SetScale(size : float) : void

    /**
     * Sets the data at the specified index to the given value, converted to an unsigned 64-bit integer.
     *
     * @param uint16 index
     * @param uint64 value
     */
    SetCoreUInt64(index : uint16,value : uint64) : void

    /**
     * Removes a flag from the value at the specified index.
     *
     * @param uint16 index
     * @param uint32 flag
     */
    RemoveFlag(index : uint16,flag : uint32) : void
    ToCorpse() : TSCorpse
    ToGameObject() : TSGameObject
    ToUnit() : TSUnit
    ToCreature() : TSCreature
    ToPlayer() : TSPlayer
    ToItem(): TSItem
}

declare interface TSUnit extends TSWorldObject {
    IsNull() : bool
    GetResistance(school: uint32): uint32;
    GetArmor(): uint32;
    SetResistance(school: uint32, val: int32): uint32;
    SetArmor(val: int32): uint32;

    HasAuraType(type: AuraType): bool

    /**
     * The [Unit] tries to attack a given target
     *
     * @param [Unit] who : [Unit] to attack
     * @param bool meleeAttack = false: attack with melee or not
     * @return didAttack : if the [Unit] did not attack
     */
    Attack(who : TSUnit,meleeAttack : bool) : bool

    /**
     * The [Unit] stops attacking its target
     *
     * @return bool isAttacking : if the [Unit] wasn't attacking already
     */
    AttackStop() : bool

    /**
     * Returns true if the [Unit] is standing.
     *
     * @return bool isStanding
     */
    IsStandState() : bool

    /**
     * Returns true if the [Unit] is mounted.
     *
     * @return bool isMounted
     */
    IsMounted() : bool

    /**
     * Returns true if the [Unit] is rooted.
     *
     * @return bool isRooted
     */
    IsRooted() : bool

    /**
     * Returns true if the [Unit] has full health.
     *
     * @return bool hasFullHealth
     */
    IsFullHealth() : bool

    /**
     * Returns true if the [Unit] is in an accessible place for the given [Creature].
     *
     * @param [WorldObject] obj
     * @param float radius
     * @return bool isAccessible
     */
    IsInAccessiblePlaceFor(creature : TSCreature) : bool

    /**
     * Returns true if the [Unit] an auctioneer.
     *
     * @return bool isAuctioneer
     */
    IsAuctioneer() : bool

    /**
     * Returns true if the [Unit] a guild master.
     *
     * @return bool isGuildMaster
     */
    IsGuildMaster() : bool

    /**
     * Returns true if the [Unit] an innkeeper.
     *
     * @return bool isInnkeeper
     */
    IsInnkeeper() : bool

    /**
     * Returns true if the [Unit] a trainer.
     *
     * @return bool isTrainer
     */
    IsTrainer() : bool

    /**
     * Returns true if the [Unit] is able to show a gossip window.
     *
     * @return bool hasGossip
     */
    IsGossip() : bool

    /**
     * Returns true if the [Unit] is a taxi master.
     *
     * @return bool isTaxi
     */
    IsTaxi() : bool

    /**
     * Returns true if the [Unit] is a spirit healer.
     *
     * @return bool isSpiritHealer
     */
    IsSpiritHealer() : bool

    /**
     * Returns true if the [Unit] is a spirit guide.
     *
     * @return bool isSpiritGuide
     */
    IsSpiritGuide() : bool

    /**
     * Returns true if the [Unit] is a tabard designer.
     *
     * @return bool isTabardDesigner
     */
    IsTabardDesigner() : bool

    /**
     * Returns true if the [Unit] provides services like vendor, training and auction.
     *
     * @return bool isTabardDesigner
     */
    IsServiceProvider() : bool

    /**
     * Returns true if the [Unit] is a spirit guide or spirit healer.
     *
     * @return bool isSpiritService
     */
    IsSpiritService() : bool

    /**
     * Returns true if the [Unit] is alive.
     *
     * @return bool isAlive
     */
    IsAlive() : bool

    /**
     * Returns true if the [Unit] is dead.
     *
     * @return bool isDead
     */
    IsDead() : bool

    /**
     * Returns true if the [Unit] is dying.
     *
     * @return bool isDying
     */
    IsDying() : bool

    /**
     * Returns true if the [Unit] is a banker.
     *
     * @return bool isBanker
     */
    IsBanker() : bool

    /**
     * Returns true if the [Unit] is a vendor.
     *
     * @return bool isVendor
     */
    IsVendor() : bool

    /**
     * Returns true if the [Unit] is a battle master.
     *
     * @return bool isBattleMaster
     */
    IsBattleMaster() : bool

    /**
     * Returns true if the [Unit] is a charmed.
     *
     * @return bool isCharmed
     */
    IsCharmed() : bool

    /**
     * Returns true if the [Unit] is an armorer and can repair equipment.
     *
     * @return bool isArmorer
     */
    IsArmorer() : bool

    /**
     * Returns true if the [Unit] is attacking a player.
     *
     * @return bool isAttackingPlayer
     */
    IsAttackingPlayer() : bool

    /**
     * Returns true if the [Unit] flagged for PvP.
     *
     * @return bool isPvP
     */
    IsPvPFlagged() : bool

    /**
     * Returns true if the [Unit] is on a [Vehicle].
     *
     * @return bool isOnVehicle
     */
    IsOnVehicle() : bool

    /**
     * Returns true if the [Unit] is in combat.
     *
     * @return bool inCombat
     */
    IsInCombat() : bool

    /**
     * Returns true if the [Unit] is under water.
     *
     * @return bool underWater
     */
    IsUnderWater() : bool

    /**
     * Returns true if the [Unit] is in water.
     *
     * @return bool inWater
     */
    IsInWater() : bool

    /**
     * Returns true if the [Unit] is not moving.
     *
     * @return bool notMoving
     */
    IsStopped() : bool

    /**
     * Returns true if the [Unit] is a quest giver.
     *
     * @return bool questGiver
     */
    IsQuestGiver() : bool

    /**
     * Returns true if the [Unit]'s health is below the given percentage.
     *
     * @param int32 healthpct : percentage in integer from
     * @return bool isBelow
     */
    HealthBelowPct(pct : int32) : bool

    /**
     * Returns true if the [Unit]'s health is above the given percentage.
     *
     * @param int32 healthpct : percentage in integer from
     * @return bool isAbove
     */
    HealthAbovePct(pct : int32) : bool

    /**
     * Returns true if the [Unit] has an aura from the given spell entry.
     *
     * @param uint32 spell : entry of the aura spell
     * @return bool hasAura
     */
    HasAura(spell : uint32) : bool

    /**
     * Returns true if the [Unit] is casting a spell
     *
     * @return bool isCasting
     */
    IsCasting() : bool

    /**
     * Returns true if the [Unit] has the given unit state.
     *
     * @param [UnitState] state : an unit state
     * @return bool hasState
     */
    HasUnitState(state : uint32) : bool

    /**
     * Returns the [Unit]'s owner.
     *
     * @return [Unit] owner
     */
    GetOwner() : TSUnit

    /**
     * Returns the [Unit]'s owner's GUID.
     *
     * @return uint64 ownerGUID
     */
    GetOwnerGUID() : uint64

    /**
     * Returns the [Unit]'s mount's modelID.
     *
     * @return uint32 mountId : displayId of the mount
     */
    GetMountID() : uint32

    /**
     * Returns the [Unit]'s creator's GUID.
     *
     * @return uint64 creatorGUID
     */
    GetCreatorGUID() : uint64

    /**
     * Returns the [Unit]'s charmer's GUID.
     *
     * @return uint64 charmerGUID
     */
    GetCharmerGUID() : uint64

    /**
     * Returns the GUID of the [Unit]'s charmed entity.
     *
     * @return uint64 charmedGUID
     */
    GetCharmGUID() : uint64

    /**
     * Returns the GUID of the [Unit]'s pet.
     *
     * @return uint64 petGUID
     */
    GetPetGUID(index?: number) : uint64

    /**
     * Returns the [Unit]'s pet.
     * @param index
     */
    GetPet(index?: number): TSCreature

    /**
     * Returns the GUID of the [Unit]'s charmer or owner.
     *
     * @return uint64 controllerGUID
     */
    GetControllerGUID() : uint64

    /**
     * Returns the [Unit]'s charmer or owner.
     */
    GetController(): TSUnit

    /**
     * Returns the GUID of the [Unit]'s charmer or owner or its own GUID.
     *
     * @return uint64 controllerGUID
     */
    GetControllerGUIDS() : uint64

    /**
     * Returns [Unit]'s specified stat
     *
     * @param uint32 statType
     * @return float stat
     */
    GetStat(stat : uint32) : float

    /**
     * Returns the [Unit]'s base spell power
     *
     * @param uint32 spellSchool
     * @return uint32 spellPower
     */
    GetBaseSpellPower(spellschool : uint32) : uint32

    /**
     * Returns the [Unit]'s current victim target or nil.
     *
     * @return [Unit] victim
     */
    GetVictim() : TSUnit

    /**
     * Returns the currently casted [Spell] of given type or nil.
     *
     *     enum CurrentSpellTypes
     *     {
     *         CURRENT_MELEE_SPELL             = 0,
     *         CURRENT_GENERIC_SPELL           = 1,
     *         CURRENT_CHANNELED_SPELL         = 2,
     *         CURRENT_AUTOREPEAT_SPELL        = 3
     *     }
     *
     * @param [CurrentSpellTypes] spellType
     * @return [Spell] castedSpell
     */
    GetCurrentSpell(type : CurrentSpellTypes) : TSSpell

    /**
     * Returns the [Unit]'s current stand state.
     *
     * @return uint8 standState
     */
    GetStandState() : uint8

    /**
     * Returns the [Unit]'s current display ID.
     *
     * @return uint32 displayId
     */
    GetDisplayID() : uint32

    /**
     * Returns the [Unit]'s native/original display ID.
     *
     * @return uint32 displayId
     */
    GetNativeDisplayID() : uint32

    /**
     * Returns the [Unit]'s level.
     *
     * @return uint8 level
     */
    GetLevel() : uint8

    /**
     * Returns the [Unit]'s health amount.
     *
     * @return uint32 healthAmount
     */
    GetHealth() : uint32
    PowerSelectorHelper(unit : TSUnit,powerType : int) : uint32

    /**
     * Returns the [Unit]'s power amount for given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     * @return uint32 powerAmount
     */
    GetPower(type : Powers|-1) : uint32

    /**
     * Returns the [Unit]'s max power amount for given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     * @return uint32 maxPowerAmount
     */
    GetMaxPower(type : Powers|-1) : uint32

    /**
     * Returns the [Unit]'s power percent for given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     * @return float powerPct
     */
    GetPowerPct(type : Powers|-1) : float

    /**
     * Returns the [Unit]'s current power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @return [Powers] powerType
     */
    GetPowerType() : Powers

    /**
     * Returns the [Unit]'s max health.
     *
     * @return uint32 maxHealth
     */
    GetMaxHealth() : uint32

    /**
     * Returns the [Unit]'s health percent.
     *
     * @return float healthPct
     */
    GetHealthPct() : float

    /**
     * Returns the [Unit]'s gender.
     *
     * @return uint8 gender : 0 for male, 1 for female and 2 for none
     */
    GetGender() : uint8

    /**
     * Returns the [Unit]'s race ID.
     *
     * @return [Races] race
     */
    GetRace() : uint32

    /**
     * Returns the [Unit]'s class ID.
     *
     * @return [Classes] class
     */
    GetClass() : uint32

    /**
    * Returns the race mask
    *
    * @return uint32 racemask
    */
    GetRaceMask() : uint32

    /**
    * Returns the class mask
    *
    * @return uint32 classmask
    */
    GetClassMask() : uint32

    /**
     * Returns the [Unit]'s creature type ID (enumerated in CreatureType.dbc).
     *
     *     enum CreatureType
     *     {
     *         CREATURE_TYPE_BEAST            = 1
     *         CREATURE_TYPE_DRAGONKIN        = 2
     *         CREATURE_TYPE_DEMON            = 3
     *         CREATURE_TYPE_ELEMENTAL        = 4
     *         CREATURE_TYPE_GIANT            = 5
     *         CREATURE_TYPE_UNDEAD           = 6
     *         CREATURE_TYPE_HUMANOID         = 7
     *         CREATURE_TYPE_CRITTER          = 8
     *         CREATURE_TYPE_MECHANICAL       = 9
     *         CREATURE_TYPE_NOT_SPECIFIED    = 10
     *         CREATURE_TYPE_TOTEM            = 11
     *         CREATURE_TYPE_NON_COMBAT_PET   = 12
     *         CREATURE_TYPE_GAS_CLOUD        = 13
     *     }
     *
     * @return [CreatureType] creatureType
     */
    GetCreatureType() : CreatureType

    /**
     * Returns the [Unit]'s class' name in given or default locale or nil.
     *
     *     enum LocaleConstant
     *     {
     *         LOCALE_enUS = 0,
     *         LOCALE_koKR = 1,
     *         LOCALE_frFR = 2,
     *         LOCALE_deDE = 3,
     *         LOCALE_zhCN = 4,
     *         LOCALE_zhTW = 5,
     *         LOCALE_esES = 6,
     *         LOCALE_esMX = 7,
     *         LOCALE_ruRU = 8
     *     }
     *
     * @param [LocaleConstant] locale = DEFAULT_LOCALE
     * @return string className : class name or nil
     */
    GetClassAsString(locale : LocaleConstant) : string

    /**
     * Returns the [Unit]'s race's name in given or default locale or nil.
     *
     *     enum LocaleConstant
     *     {
     *         LOCALE_enUS = 0,
     *         LOCALE_koKR = 1,
     *         LOCALE_frFR = 2,
     *         LOCALE_deDE = 3,
     *         LOCALE_zhCN = 4,
     *         LOCALE_zhTW = 5,
     *         LOCALE_esES = 6,
     *         LOCALE_esMX = 7,
     *         LOCALE_ruRU = 8
     *     }
     * @param [LocaleConstant] locale = DEFAULT_LOCALE : locale to return the race name in
     * @return string raceName : race name or nil
     */
    GetRaceAsString(locale : LocaleConstant) : string

    /**
     * Returns the [Unit]'s faction ID.
     *
     * @return uint32 faction
     */
    GetFaction() : uint32

    /**
     * Returns the [Aura] of the given spell entry on the [Unit] or nil.
     *
     * @param uint32 spellID : entry of the aura spell
     * @return [Aura] aura : aura object or nil
     */
    GetAura(spellID : uint32) : TSAura

    /**
     * Returns [Unit]'s [Vehicle] methods
     *
     * @return [Vehicle] vehicle
     */
    GetVehicleKit() : TSVehicle
    GetVehicle() : TSVehicle

    /**
     * Returns the Critter Guid
     *
     * @return uint64 critterGuid
     */
    GetCritterGUID() : uint64

    /**
     * Returns the [Unit]'s speed of given [UnitMoveType].
     *
     *     enum UnitMoveType
     *     {
     *         MOVE_WALK           = 0,
     *         MOVE_RUN            = 1,
     *         MOVE_RUN_BACK       = 2,
     *         MOVE_SWIM           = 3,
     *         MOVE_SWIM_BACK      = 4,
     *         MOVE_TURN_RATE      = 5,
     *         MOVE_FLIGHT         = 6,
     *         MOVE_FLIGHT_BACK    = 7,
     *         MOVE_PITCH_RATE     = 8
     *     }
     *
     * @param [UnitMoveType] type
     * @return float speed
     */
    GetSpeed(type : UnitMoveType) : float

    /**
     * Returns the current movement type for this [Unit].
     *
     * enum MovementGeneratorType
     * {
     *     IDLE_MOTION_TYPE                = 0,
     *     RANDOM_MOTION_TYPE              = 1,
     *     WAYPOINT_MOTION_TYPE            = 2,
     *     MAX_DB_MOTION_TYPE              = 3,
     *     ANIMAL_RANDOM_MOTION_TYPE       = 3, // TC
     *
     *     CONFUSED_MOTION_TYPE            = 4,
     *     CHASE_MOTION_TYPE               = 5,
     *     HOME_MOTION_TYPE                = 6,
     *     FLIGHT_MOTION_TYPE              = 7,
     *     POINT_MOTION_TYPE               = 8,
     *     FLEEING_MOTION_TYPE             = 9,
     *     DISTRACT_MOTION_TYPE            = 10,
     *     ASSISTANCE_MOTION_TYPE          = 11,
     *     ASSISTANCE_DISTRACT_MOTION_TYPE = 12,
     *     TIMED_FLEEING_MOTION_TYPE       = 13,
     *     FOLLOW_MOTION_TYPE              = 14,
     *     EFFECT_MOTION_TYPE              = 15, // mangos
     *     ROTATE_MOTION_TYPE              = 15, // TC
     *     EFFECT_MOTION_TYPE              = 16, // TC
     *     NULL_MOTION_TYPE                = 17, // TC
     * }
     *
     * @return [MovementGeneratorType] movementType
     */
    GetMovementType() : MovementGeneratorType

    /**
     * Sets the [Unit]'s owner GUID to given GUID.
     *
     * @param uint64 guid : new owner guid
     */
    SetOwnerGUID(guid : uint64) : void

    /**
     * Sets the [Unit]'s PvP on or off.
     *
     * @param bool apply = true : true if set on, false if off
     */
    SetPvP(apply : bool) : void

    /**
     * Sets the [Unit]'s sheath state.
     *
     *     enum SheathState
     *     {
     *         SHEATH_STATE_UNARMED  = 0, // non prepared weapon
     *         SHEATH_STATE_MELEE    = 1, // prepared melee weapon
     *         SHEATH_STATE_RANGED   = 2  // prepared ranged weapon
     *
     * @param [SheathState] sheathState : valid SheathState
     */
    SetSheath(sheathed : SheathState) : void

    /**
     * Sets the [Unit]'s name internally.
     *
     * @param string name : new name
     */
    SetName(name : string) : void

    /**
     * Sets the [Unit]'s speed of given [UnitMoveType] to given rate.
     * If forced, packets sent to clients forcing the visual change.
     *
     *     enum UnitMoveType
     *     {
     *         MOVE_WALK           = 0,
     *         MOVE_RUN            = 1,
     *         MOVE_RUN_BACK       = 2,
     *         MOVE_SWIM           = 3,
     *         MOVE_SWIM_BACK      = 4,
     *         MOVE_TURN_RATE      = 5,
     *         MOVE_FLIGHT         = 6,
     *         MOVE_FLIGHT_BACK    = 7,
     *         MOVE_PITCH_RATE     = 8
     *     }
     * @param [UnitMoveType] type
     * @param float rate
     * @param bool forced = false
     */
    SetSpeed(type : UnitMoveType,rate : float,forced : bool) : void

    /**
     * Sets the [Unit]'s faction.
     *
     * @param uint32 faction : new faction ID
     */
    SetFaction(factionId : uint32) : void

    /**
     * Sets the [Unit]'s level.
     *
     * @param uint8 level : new level
     */
    SetLevel(newlevel : uint8) : void

    /**
     * Sets the [Unit]'s health.
     *
     * @param uint32 health : new health
     */
    SetHealth(amt : uint32) : void

    /**
     * Sets the [Unit]'s max health.
     *
     * @param uint32 maxHealth : new max health
     */
    SetMaxHealth(amt : uint32) : void

    /**
     * Sets the [Unit]'s power amount for the given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param uint32 amount : new power amount
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     */
    SetPower(amt : uint32,type : Powers|-1) : void

    /**
     * modifies the [Unit]'s power amount for the given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param int32 amount : amount to modify
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     */
    ModifyPower(amt : int32,type : Powers|-1) : void

    /**
     * Sets the [Unit]'s max power amount for the given power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param int type = -1 : a valid power type from [Powers] or -1 for the [Unit]'s current power type
     * @param uint32 maxPower : new max power amount
     */
    SetMaxPower(type : Powers|-1,amt : uint32) : void

    /**
     * Sets the [Unit]'s power type.
     *
     *     enum Powers
     *     {
     *         POWER_MANA        = 0,
     *         POWER_RAGE        = 1,
     *         POWER_FOCUS       = 2,
     *         POWER_ENERGY      = 3,
     *         POWER_HAPPINESS   = 4,
     *         POWER_RUNE        = 5,
     *         POWER_RUNIC_POWER = 6,
     *         POWER_HEALTH      = 0xFFFFFFFE   // (-2 as signed value)
     *
     * @param [Powers] type : a valid power type
     */
    SetPowerType(type : Powers) : void

    /**
     * Sets the [Unit]'s modelID.
     *
     * @param uint32 displayId
     */
    SetDisplayID(model : uint32) : void

    /**
     * Sets the [Unit]'s native/default modelID.
     *
     * @param uint32 displayId
     */
    SetNativeDisplayID(model : uint32) : void

    /**
     * Sets the [Unit]'s facing/orientation.
     *
     * @param uint32 orientation
     */
    SetFacing(o : float) : void

    /**
     * Sets the [Unit] to face the given [WorldObject]'s direction.
     *
     * @param [WorldObject] target
     */
    SetFacingToObject(obj : TSWorldObject) : void

    /**
     * Sets creator GUID
     *
     * @param uint64 guid
     */
    SetCreatorGUID(guid : uint64) : void

    /**
     * Sets pet GUID
     *
     * @param uint64 guid
     */
    SetPetGUID(guid : uint64) : void

    /**
     * Toggles (Sets) [Unit]'s water walking
     *
     * @param bool enable = true
     */
    SetWaterWalk(enable : bool) : void

    /**
     * Sets the [Unit]'s stand state
     *
     * @param uint8 state : stand state
     */
    SetStandState(state : uint8) : void

    /**
     * Sets the [Unit]'s FFA flag on or off.
     *
     * @param bool apply = true
     */
    SetFFA(apply : bool) : void

    /**
     * Sets the [Unit]'s sanctuary flag on or off.
     *
     * @param bool apply = true
     */
    SetSanctuary(apply : bool) : void
    SetCritterGUID(guid : uint64) : void

    /**
     * Roots the [Unit] to the ground, if 'false' specified, unroots the [Unit].
     *
     * @param bool apply = true
     */
    SetRooted(apply : bool) : void

    /**
     * Confuses the [Unit], if 'false' specified, the [Unit] is no longer confused.
     *
     * @param bool apply = true
     */
    SetConfused(apply : bool) : void

    /**
     * Fears the [Unit], if 'false' specified, the [Unit] is no longer feared.
     *
     * @param bool apply = true
     */
    SetFeared(apply : bool) : void

    /**
     * Clears the [Unit]'s threat list.
     */
    ClearThreatList(apply : bool,x : bool) : void

    /**
     * Mounts the [Unit] on the given displayID/modelID.
     *
     * @param uint32 displayId
     */
    Mount(displayId : uint32) : void

    /**
     * Dismounts the [Unit].
     */
    Dismount() : void

    PerformEmote(emoteId : uint32) : void

    /**
     * Makes the [Unit] perform the given emote continuously.
     *
     * @param uint32 emoteId
     */
    EmoteState(emoteId : uint32) : void

    /**
     * Returns calculated percentage from Health
     *
     * @return int32 percentage
     */
    CountPctFromCurHealth(health : int32) : int32

    /**
     * Returns calculated percentage from Max Health
     *
     * @return int32 percentage
     */
    CountPctFromMaxHealth(health : int32) : int32

    /**
     * Sends chat message to [Player]
     *
     * @param uint8 type : chat, whisper, etc
     * @param uint32 lang : language to speak
     * @param string msg
     * @param [Player] target
     */
    SendChatMessageToPlayer(type : uint8,lang : uint32,msg : string,target : TSPlayer) : void
    PrepareMove() : void

    /**
     * Stops the [Unit]'s movement
     */
    MoveStop() : void

    /**
     * The [Unit]'s movement expires and clears movement
     *
     * @param bool reset = true : cleans movement
     */
    MoveExpire(reset : bool) : void

    /**
     * Clears the [Unit]'s movement
     *
     * @param bool reset = true : clean movement
     */
    MoveClear(reset : bool) : void

    /**
     * The [Unit] will be idle
     */
    MoveIdle() : void

    /**
     * The [Unit] will move at random
     *
     * @param float radius : limit on how far the [Unit] will move at random
     */
    MoveRandom(radius : float) : void

    /**
     * The [Unit] will move to its set home location
     */
    MoveHome() : void

    /**
     * The [Unit] will follow the target
     *
     * @param [Unit] target : target to follow
     * @param float dist = 0 : distance to start following
     * @param float angle = 0
     */
    MoveFollow(target : TSUnit,dist : float,angle : float) : void

    /**
     * The [Unit] will chase the target
     *
     * @param [Unit] target : target to chase
     * @param float dist = 0 : distance start chasing
     * @param float angle = 0
     */
    MoveChase(target : TSUnit,dist : float,angle : float) : void

    /**
     * The [Unit] will move confused
     */
    MoveConfused() : void

    /**
     * The [Unit] will flee
     *
     * @param [Unit] target
     * @param uint32 time = 0 : flee delay
     */
    MoveFleeing(target : TSUnit,time : uint32) : void

    /**
     * The [Unit] will move to the coordinates
     *
     * @param uint32 id : unique waypoint Id
     * @param float x
     * @param float y
     * @param float z
     * @param bool genPath = true : if true, generates path
     */
    MoveTo(id : uint32,x : float,y : float,z : float,genPath : bool) : void

    /**
     * Makes the [Unit] jump to the coordinates
     *
     * @param float x
     * @param float y
     * @param float z
     * @param float zSpeed : start velocity
     * @param float maxHeight : maximum height
     * @param uint32 id = 0 : unique movement Id
     */
    MoveJump(x : float,y : float,z : float,zSpeed : float,maxHeight : float,id : uint32) : void

    /**
     * The [Unit] will whisper the message to a [Player]
     *
     * @param string msg : message for the [Unit] to emote
     * @param uint32 lang : language for the [Unit] to speak
     * @param [Player] receiver : specific [Unit] to receive the message
     * @param bool bossWhisper = false : is a boss whisper
     */
    SendUnitWhisper(msg : string,lang : uint32,receiver : TSPlayer,bossWhisper : bool) : void

    /**
     * The [Unit] will emote the message
     *
     * @param string msg : message for the [Unit] to emote
     * @param [Unit] receiver = nil : specific [Unit] to receive the message
     * @param bool bossEmote = false : is a boss emote
     */
    SendUnitEmote(msg : string,receiver : TSUnit,bossEmote : bool) : void

    /**
     * The [Unit] will say the message
     *
     * @param string msg : message for the [Unit] to say
     * @param uint32 language : language for the [Unit] to speak
     */
    SendUnitSay(msg : string,language : uint32) : void

    /**
     * The [Unit] will yell the message
     *
     * @param string msg : message for the [Unit] to yell
     * @param uint32 language : language for the [Unit] to speak
     */
    SendUnitYell(msg : string,language : uint32) : void

    /**
     * Unmorphs the [Unit] setting it's display ID back to the native display ID.
     */
    DeMorph() : void

    /**
     * Makes the [Unit] cast the spell on the target.
     *
     * @param [Unit] target = nil : can be self or another unit
     * @param uint32 spell : entry of a spell
     * @param bool triggered = false : if true the spell is instant and has no cost
     */
    CastSpell(target : TSUnit,spell : uint32,triggered : bool) : void

    /**
     * Casts the [Spell] at target [Unit] with custom basepoints or casters.
     * See also [Unit:CastSpell].
     *
     * @param [Unit] target = nil
     * @param uint32 spell
     * @param bool triggered = false
     * @param int32 bp0 = nil : custom basepoints for [Spell] effect 1. If nil, no change is made
     * @param int32 bp1 = nil : custom basepoints for [Spell] effect 2. If nil, no change is made
     * @param int32 bp2 = nil : custom basepoints for [Spell] effect 3. If nil, no change is made
     * @param [Item] castItem = nil
     * @param uint64 originalCaster = 0
     */
    CastCustomSpell(target : TSUnit,spell : uint32,triggered? : bool,bp0? : int32,bp1? : int32,bp2? : int32,castItem? : TSItem,originalCaster? : uint64) : void

    /**
     * Makes the [Unit] cast the spell to the given coordinates, used for area effect spells.
     *
     * @param float x
     * @param float y
     * @param float z
     * @param uint32 spell : entry of a spell
     * @param bool triggered = false : if true the spell is instant and has no cost
     */
    CastSpellAoF(_x : float,_y : float,_z : float,spell : uint32,triggered : bool) : void

    /**
     * Clears the [Unit]'s combat
     */
    ClearInCombat() : void

    /**
     * Stops the [Unit]'s current spell cast
     *
     * @param uint32 spell = 0 : entry of a spell
     */
    StopSpellCast(spellId : uint32) : void

    /**
     * Interrupts [Unit]'s spell state, casting, etc.
     *
     * if spell is not interruptible, it will return
     *
     * @param int32 spellType : type of spell to interrupt
     * @param bool delayed = true : skips if the spell is delayed
     */
    InterruptSpell(spellType : int,delayed : bool) : void

    /**
     * Adds the [Aura] of the given spell entry on the given target from the [Unit].
     *
     * @param uint32 spell : entry of a spell
     * @param [Unit] target : aura will be applied on the target
     * @return [Aura] aura
     */
    AddAura(spell : uint32,target : TSUnit) : TSAura

    /**
     * Removes [Aura] of the given spell entry from the [Unit].
     *
     * @param uint32 spell : entry of a spell
     */
    RemoveAura(spellId : uint32) : void

    /**
     * Removes all [Aura]'s from the [Unit].
     *
     *     Note: talents and racials are also auras, use with caution
     */
    RemoveAllAuras() : void

    /**
     * Adds the given unit state for the [Unit].
     *
     * @param [UnitState] state
     */
    AddUnitState(state : uint32) : void

    /**
     * Removes the given unit state from the [Unit].
     *
     * @param [UnitState] state
     */
    ClearUnitState(state : uint32) : void

    /**
     * Makes the [Unit] teleport to given coordinates within same map.
     *
     * @param float x
     * @param float y
     * @param float z
     * @param float o : orientation
     */
    NearTeleport(x : float,y : float,z : float,o : float) : void

    /**
     * Makes the [Unit] damage the target [Unit]
     *
     *     enum SpellSchools
     *     {
     *         SPELL_SCHOOL_NORMAL  = 0,
     *         SPELL_SCHOOL_HOLY    = 1,
     *         SPELL_SCHOOL_FIRE    = 2,
     *         SPELL_SCHOOL_NATURE  = 3,
     *         SPELL_SCHOOL_FROST   = 4,
     *         SPELL_SCHOOL_SHADOW  = 5,
     *         SPELL_SCHOOL_ARCANE  = 6,
     *         MAX_SPELL_SCHOOL     = 7
     *      }
     *
     * @param [Unit] target : [Unit] to damage
     * @param uint32 damage : amount to damage
     * @param bool durabilityloss = true : if false, the damage does not do durability damage
     * @param [SpellSchools] school = MAX_SPELL_SCHOOL : school the damage is done in or MAX_SPELL_SCHOOL for direct damage
     * @param uint32 spell = 0 : spell that inflicts the damage
     */
    DealDamage(target : TSUnit,damage : uint32,durabilityloss : bool,school : SpellSchools,spell? : uint32) : void

    /**
     * Makes the [Unit] heal the target [Unit] with given spell
     *
     * @param [Unit] target : [Unit] to heal
     * @param uint32 spell : spell that causes the healing
     * @param uint32 amount : amount to heal
     * @param bool critical = false : if true, heal is logged as critical
     */
    DealHeal(target : TSUnit,spell : uint32,amount : uint32,critical : bool) : void

    /**
     * Makes the [Unit] kill the target [Unit]
     *
     * @param [Unit] target : [Unit] to kill
     * @param bool durLoss = true : when true, the target's items suffer durability loss
     */
    Kill(target : TSUnit,durLoss : bool) : void

    /**
     * Adds threat to the [Unit] from the victim.
     *
     *     enum SpellSchoolMask
     *     {
     *         NONE    = 0,
     *         NORMAL  = 1,
     *         HOLY    = 2,
     *         FIRE    = 4,
     *         NATURE  = 8,
     *         FROST   = 16,
     *         SHADOW  = 32,
     *         ARCANE  = 64,
     *     }
     *
     * @param [Unit] victim : [Unit] that caused the threat
     * @param float threat : threat amount
     * @param [SpellSchoolMask] schoolMask = 0 : [SpellSchoolMask] of the threat causer
     * @param uint32 spell = 0 : spell entry used for threat
     */
    AddThreat(victim : TSUnit,threat : float,spell? : uint32,schoolMask? : SpellSchoolMask | uint32, ignoreModifiers?: boolean, ignoreRedirects?: boolean, raw?: boolean) : void
    ScaleThreat(victim: TSUnit, scale: float, raw?: boolean)
}

declare interface TSItemTemplate extends TSEntityProvider {
    IsNull() : bool
    GetEntry() : uint32;
    GetDamageMinA(): float;
    GetDamageMinB(): float;

    GetDamageMaxA(): float;
    GetDamageMaxB(): float;

    GetDamageTypeA(): uint32;
    GetDamageTypeB(): uint32;
    GetClass(): uint32;
    GetSubClass(): uint32;
    GetSoundOverrideSubclass(): int32;
    GetName(): string;
    GetDisplayInfoID(): uint32;
    GetQuality(): uint32;
    GetFlags(): uint32;
    GetFlags2(): uint32;
    GetBuyCount(): uint32;
    GetBuyPrice(): int32;
    GetSellPrice(): uint32;
    GetInventoryType(): uint32;
    GetAllowableClass(): uint32;
    GetAllowableRace(): uint32;
    GetItemLevel(): uint32;
    GetRequiredLevel(): uint32;
    GetRequiredSkill(): uint32;
    GetRequiredSkillRank(): uint32;
    GetRequiredSpell(): uint32;
    GetRequiredHonorRank(): uint32;
    GetRequiredCityRank(): uint32;
    GetRequiredReputationFaction(): uint32;
    GetRequiredReputationRank(): uint32;
    GetMaxCount(): int32;
    GetStackable(): int32;
    GetContainerSlots(): uint32;
    GetStatsCount(): uint32;
    GetStatType(index: uint32): uint32
    GetStatValue(index: uint32): int32
    GetScalingStatDistribution(): uint32;
    GetScalingStatValue(): uint32;
    GetArmor(): uint32;
    GetHolyRes(): uint32;
    GetFireRes(): uint32;
    GetNatureRes(): uint32;
    GetFrostRes(): uint32;
    GetShadowRes(): uint32;
    GetArcaneRes(): uint32;
    GetDelay(): uint32;
    GetAmmoType(): uint32;
    GetRangedModRange(): float;
    GetBonding(): uint32;
    GetDescription(): string;
    GetPageText(): uint32;
    GetLanguageID(): uint32;
    GetPageMaterial(): uint32;
    GetStartQuest(): uint32;
    GetLockID(): uint32;
    GetMaterial(): int32;
    GetSheath(): uint32;
    GetRandomProperty(): int32;
    GetRandomSuffix(): int32;
    GetBlock(): uint32;
    GetItemSet(): uint32;
    GetMaxDurability(): uint32;
    GetArea(): uint32;
    GetMap(): uint32;
    GetBagFamily(): uint32;
    GetTotemCategory(): uint32;
    GetSocketBonus(): uint32;
    GetGemProperties(): uint32;
    GetRequiredDisenchantSkill(): uint32;
    GetArmorDamageModifier(): float;
    GetDuration(): uint32;
    GetItemLimitCategory(): uint32;
    GetHolidayID(): uint32;
    GetScriptID(): uint32;
    GetDisenchantID(): uint32;
    GetFoodType(): uint32;
    GetMinMoneyLoot(): uint32;
    GetMaxMoneyLoot(): uint32;
    GetFlagsCu(): uint32;
    GetIsCurrencyToken(): bool;
    GetCanChangeEquipStateInCombat(): bool;
    GetMaxStackSize(): uint32
    GetDPS(): float
    GetFeralBonus(extraDPS?: int32): int32
    GetTotalAPBonus(): int32
    GetItemLevelIncludingQuality(): float
    GetSkill(): uint32
    GetIsPotion(): bool
    GetIsWeaponVellum(): bool
    GetIsArmorVellum(): bool
    GetIsConjuredConsumable(): bool
    GetHasSignature(): bool;
}

declare interface TSSpellInfo extends TSEntityProvider {
	IsNull() : bool
    GetEntry() : uint32
	GetSchool() : uint32
	GetBaseLevel() : uint32
	GetDmgClass() : uint32
	GetActiveIconID() : uint32
	GetAreaGroupID() : uint32
	GetAttributes() : uint32
	GetAttributesCu() : uint32
	GetAttributesEx() : uint32
	GetAttributesEx2() : uint32
	GetAttributesEx3() : uint32
	GetAttributesEx4() : uint32
	GetAttributesEx5() : uint32
	GetAttributesEx6() : uint32
	GetAttributesEx7() : uint32
	GetAuraInterruptFlags() : uint32
	GetCasterAuraSpell() : uint32
	GetCasterAuraState() : uint32
	GetCasterAuraStateNot() : uint32
	GetCategoryRecoveryTime() : uint32
	GetChannelInterruptFlags() : uint32
	GetDispel() : uint32
	GetEquippedItemClass() : uint32
	GetEquippedItemInventoryTypeMask() : uint32
	GetEquippedItemSubClassMask() : uint32
	GetExcludeCasterAuraSpell() : uint32
	GetExcludeTargetAuraSpell() : uint32
	GetExplicitTargetMask() : uint32
	GetFacingCasterFlags() : uint32
	GetInterruptFlags() : uint32
	GetManaCost() : uint32
	GetManaCostPercentage() : uint32
	GetManaCostPerlevel() : uint32
	GetManaPerSecond() : uint32
	GetManaPerSecondPerLevel() : uint32
	GetMaxAffectedTargets() : uint32
	GetMaxLevel() : uint32
	GetMaxTargetLevel() : uint32
	GetMechanic() : uint32
	GetPowerType() : uint32
	GetPreventionType() : uint32
	GetPriority() : uint32
	GetProcChance() : uint32
	GetProcCharges() : uint32
	GetProcFlags() : uint32
	GetRecoveryTime() : uint32
	GetRequiresSpellFocus() : uint32
	GetRuneCostID() : uint32
	GetSchoolMask() : uint32
	GetSpeed() : uint32
	GetSpellFamilyFlags() : uint32
	GetSpellFamilyName() : uint32
	GetSpellIconID() : uint32
	GetSpellLevel() : uint32
	GetStackAmount() : uint32
	GetStances() : uint32
	GetStancesNot() : uint32
	GetStartRecoveryCategory() : uint32
	GetStartRecoveryTime() : uint32
	GetTargetAuraSpell() : uint32
	GetTargetAuraState() : uint32
	GetTargetAuraStateNot() : uint32
	GetTargetCreatureType() : uint32
	GetTargets() : uint32;
    GetEffect(index: SpellEffIndex): TSSpellEffectInfo
}

declare class TSSpellEffectInfo {
    GetEffectIndex(): SpellEffIndex;
    GetType(): SpellEffects;
    GetAura(): AuraType;
    GetAmplitude(): uint32;
    GetDieSides(): int32;
    GetRealPointsPerLevel(): float;
    GetBasePoints(): int32;
    GetPointsPerComboPoint(): float;
    GetValueMultiplier(): float;
    GetDamageMultiplier(): float;
    GetBonusMultiplier(): float;
    GetMiscValue(): int32;
    GetMiscValueB(): int32;
    GetMechanic(): Mechanics;
    GetChainTarget(): uint32;
    GetItemType(): uint32;
    GetTriggerSpell(): uint32;
    IsEffect(): bool;
    IsAura(): bool;
}

declare interface TSSpellCastTargets {
    IsNull() : bool
    GetUnit() : TSUnit;
}

declare interface TSCondition {
    GetSourceType(): uint32;
    GetSourceGroup(): uint32;
    GetSouceEntry(): uint32;
    GetSourceID(): uint32;
    GetElseGroup(): uint32;
    GetConditionType(): uint32;
    GetConditionValue1(): uint32;
    GetConditionValue2(): uint32;
    GetConditionValue3(): uint32;
    GetErrorType(): uint32;
    GetErrorTextID(): uint32;
    GetReferenceID(): uint32;
    GetScriptID(): uint32;
    GetConditionTarget(): uint8
    IsNegativeCondition(): bool
    ToString(ext?: bool): TSString
    IsNull(): bool
}

declare interface TSConditionSourceInfo {
    GetTarget(index: uint32): TSWorldObject;
    GetLastFailedCondition(): TSCondition;
}

declare interface TSSmartScriptValues {
    GetEntryOrGUID(): int32;
    GetSourceType(): uint32;
    GetEventID(): uint32;
    GetLink(): uint32;
    GetEventPhaseMask(): uint32;
    GetEventChance(): uint32;
    GetEventFlags(): uint32;

    GetActionArgument1(): uint32;
    GetActionArgument2(): uint32;
    GetActionArgument3(): uint32;
    GetActionArgument4(): uint32;
    GetActionArgument5(): uint32;
    GetActionArgument6(): uint32;

    GetEventArgument1(): uint32;
    GetEventArgument2(): uint32;
    GetEventArgument3(): uint32;
    GetEventArgument4(): uint32;
    GetEventArgument5(): uint32;

    GetTargetParam1(): uint32;
    GetTargetParam2(): uint32;
    GetTargetParam3(): uint32;
    GetTargetParam4(): uint32;

    GetTargetX(): float;
    GetTargetY(): float;
    GetTargetZ(): float;

    GetTimer(): uint32;
    GetPriority(): uint32;

    GetLastInvoker(): TSUnit;
    GetTargets(): TSArray<TSWorldObject>;
    StoreTargetList(objects: TSArray<TSWorldObject>, id: uint32): void;
    GetTargetList(id: uint32, ref: TSWorldObject): TSArray<TSWorldObject>;
    StoreCounter(id: uint32, value: uint32, reset: uint32): void;
    GetCounterValue(id: uint32): uint32;
    GetUnitArg(): TSUnit;
    GetUIntArg1(): uint32;
    GetUIntArg2(): uint32;
    GetBoolArg(): bool;
    GetSpellArg(): TSSpellInfo;
    GetGameObjectArg(): TSGameObject;
    GetSelf(): TSWorldObject;
}

declare interface TSAssert {
    IsTrue(expression: boolean, reason?: string): void;
    IsFalse(expression: boolean, reason?: string): void;
    HasSpell(player: TSPlayer, spell: uint32, reason?: string): void;
    HasItem(player: TSPlayer, item: uint32, count?: uint32, checkBank?: boolean, reason?: string): void;
    Equals<T>(a: T, b: T, reason?: string): void;
}

declare interface TSManualStepBuilder {
    /**
     * Sets the displayed description of this step
     * @param description
     */
    description(description: string): TSManualStepBuilder;

    /**
     * Sets a function to call when the player starts this step
     * @param callback
     */
    setup(callback: (player: TSPlayer)=>void);

    /**
     * Sets a function to call when the player attempts to finish this step
     * @param callback
     */
    verify(callback: (player: TSPlayer, assert: TSAssert)=>void);
}

declare interface TSManualTestBuilder {
    /**
     * Adds a new simple step with a description
     * @param name
     * @param description
     */
    step(name: string, description: string): TSManualTestBuilder

    /**
     * Adds a new step that you can customize through the callback argument, see TSManualStepBuilder
     * @param name
     * @param callback
     */
    step(name: string, callback: (builder: TSManualStepBuilder)=>void): TSManualTestBuilder
}

type EventID = uint32 | TSArray<uint32>

// @hidden-begin (do NOT remove this tag!)
declare namespace _hidden {
    export class AchievementID<T> {
        OnUpdate(entry: EventID, callback: (
              player: TSPlayer
            , achievement: TSAchievementEntry
            , criteria: TSAchievementCriteriaEntry
            , progressType: ProgressType
            , timeElapsed: uint32
            , timeCompleted: boolean
            )=>void)
        OnComplete(entry: EventID, callback: (player: TSPlayer, entry: TSAchievementEntry)=>void)
    }
    export class Achievements<T> {
        OnUpdate(callback: (
              player: TSPlayer
            , achievement: TSAchievementEntry
            , criteria: TSAchievementCriteriaEntry
            , progressType: ProgressType
            , timeElapsed: uint32
            , timeCompleted: boolean
            )=>void)
        OnComplete(callback: (player: TSPlayer, entry: TSAchievementEntry)=>void)
    }

    export class World<T> {
        OnOpenStateChange(callback: (open : bool)=>void);
        OnConfigLoad(callback: (reload : bool)=>void);
        OnMotdChange(callback: (newMotd : string)=>void);
        OnShutdownInitiate(callback: (code : uint32,mask : uint32)=>void);
        OnUpdate(callback: (diff : uint32, mgr: TSMapManager)=>void);
        OnStartup(callback: ()=>void);
        OnShutdownCancel(callback: ()=>void);
        OnShutdown(callback: ()=>void);
        OnCalcHonor(callback: (honor: TSMutable<float>, level: uint8, multiplier: float)=>void)
    }

    export class Item<T> {
        OnQuestAccept(callback: (player : TSPlayer,item : TSItem,quest : TSQuest)=>void);
        // TODO: OnItemUse
        OnExpire(callback: (player : TSPlayer,proto : TSItemTemplate)=>void);
        OnRemove(callback: (player : TSPlayer,item : TSItem)=>void);
        OnCastItemCombatSpell(callback: (player : TSPlayer,victim : TSUnit,spellInfo : TSSpellInfo,item : TSItem)=>void);
    }

    export class AreaTrigger<T> {
        OnTrigger(callback: (trigge: TSAreaTriggerEntry, player : TSPlayer, cancel: TSMutable<boolean>)=>void);
    }

    export class AreaTriggerID<T> {
        OnTrigger(areaTrigger: EventID, callback: (trigge: TSAreaTriggerEntry, player : TSPlayer, cancel: TSMutable<boolean>)=>void);
    }

    export class Vehicle<T> {
        OnInstall(callback: (veh : TSVehicle)=>void);
        OnUninstall(callback: (veh : TSVehicle)=>void);
        OnReset(callback: (veh : TSVehicle)=>void);
        OnInstallAccessory(callback: (veh : TSVehicle,accessory : TSCreature)=>void);
        OnAddPassenger(callback: (veh : TSVehicle,passenger : TSUnit,seatId : int8)=>void);
        OnRemovePassenger(callback: (veh : TSVehicle,passenger : TSUnit)=>void);
    }

    export class Player<T> {
        OnPVPKill(callback: (killer : TSPlayer,killed : TSPlayer)=>void);
        OnCreatureKill(callback: (killer : TSPlayer,killed : TSCreature)=>void);
        OnPlayerKilledByCreature(callback: (killer : TSCreature,killed : TSPlayer)=>void);
        OnLevelChanged(callback: (player : TSPlayer,oldLevel : uint8)=>void);
        OnLearnTalent(callback: (player: TSPlayer, tabId: uint32, talentId: uint32, spellId: uint32, cancel: TSMutable<bool>)=>void)
        OnFreeTalentPointsChanged(callback: (player : TSPlayer,points : uint32)=>void);
        OnTalentsReset(callback: (player : TSPlayer,noCost : bool)=>void);
        OnMoneyChanged(callback: (player : TSPlayer,amount : TSMutable<int32>)=>void);
        OnMoneyLimit(callback: (player : TSPlayer,amount : int32)=>void);
        OnGiveXP(callback: (player : TSPlayer,amount : TSMutable<uint32>,victim : TSUnit)=>void);
        OnReputationChange(callback: (player : TSPlayer,factionId : uint32,standing : TSMutable<int32>,incremental : bool)=>void);
        OnDuelRequest(callback: (target : TSPlayer,challenger : TSPlayer)=>void);
        OnDuelStart(callback: (player1 : TSPlayer,player2 : TSPlayer)=>void);
        OnDuelEnd(callback: (winner : TSPlayer,loser : TSPlayer,type : uint32)=>void);
        OnSay(callback: (player : TSPlayer, msg: TSMutableString,type : uint32,lang : uint32)=>void);
        OnWhisper(callback: (sender: TSPlayer, receiver: TSPlayer, message: TSMutableString,type : uint32,lang : uint32)=>void);
        OnChatGroup(callback: (player : TSPlayer, group: TSGroup, message: TSMutableString,type : uint32,lang : uint32)=>void);
        OnChatGuild(callback: (player : TSPlayer, guild: TSGuild, message: TSMutableString,type : uint32,lang : uint32)=>void);
        OnChat(callback: (player : TSPlayer, channel: TSChannel, msg: TSMutableString,type : uint32,lang : uint32)=>void);
        OnCommand(callback: (player: TSPlayer, command: TSMutableString, found: TSMutable<bool>)=>void)
        OnEmote(callback: (player : TSPlayer,emote : uint32)=>void);
        OnTextEmote(callback: (player : TSPlayer,textEmote : uint32,emoteNum : uint32,guid : uint64)=>void);
        OnSpellCast(callback: (player : TSPlayer,spell : TSSpell,skipCheck : bool)=>void);
        OnLogin(callback: (player : TSPlayer,firstLogin : bool)=>void);
        OnReload(callback: (player : TSPlayer,firstLogin : bool)=>void);
        OnLogout(callback: (player : TSPlayer)=>void);
        OnCreate(callback: (player : TSPlayer)=>void);
        OnCreateEarly(callback: (player : TSPlayer)=>void);
        OnDelete(callback: (guid : uint64,accountId : uint32)=>void);
        OnFailedDelete(callback: (guid : uint64,accountId : uint32)=>void);
        OnSave(callback: (player : TSPlayer)=>void);
        OnBindToInstance(callback: (player : TSPlayer,difficulty : uint32,mapId : uint32,permanent : bool,extendState : uint8)=>void);
        OnUpdateZone(callback: (player : TSPlayer,newZone : uint32,newArea : uint32)=>void);
        OnMapChanged(callback: (player : TSPlayer)=>void);
        OnQuestObjectiveProgress(callback: (player : TSPlayer,quest : TSQuest,objectiveIndex : uint32,progress : uint16)=>void);
        OnQuestStatusChange(callback: (player : TSPlayer,questId : uint32)=>void);
        OnMovieComplete(callback: (player : TSPlayer,movieId : uint32)=>void);
        OnPlayerRepop(callback: (player : TSPlayer)=>void);
        OnSendMail(callback: (player: TSPlayer, draft: TSMailDraft, delay: TSMutable<uint32>)=>void);
        OnGenerateItemLoot(callback: (player: TSPlayer, item: TSItem, loot: TSLoot, type: uint32)=>void);
        OnLootCorpse(callback: (player: TSPlayer, corpse: TSCorpse)=>void);
        OnTradeCompleted(callback: (me: TSPlayer, him: TSPlayer, myItems: TSArray<TSItem>, hisItems: TSArray<TSItem>, myGold: uint32, hisGold: uint32)=>void);

        OnUpdateDodgePercentage(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateBlockPercentage(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateParryPercentage(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateArmor(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateMaxHealth(callback: (
              player: TSPlayer
            , health: TSMutable<float>
        )=>void)
        OnUpdateMaxPower(callback: (
              player: TSPlayer
            , power: TSMutable<float>
            , type: Powers
            , bonus: float
        )=>void)
        OnUpdateManaRegen(callback: (
              player: TSPlayer
            , power: TSMutable<float>
            , mp5: TSMutable<float>
            , manaRegen: TSMutable<float>
        )=>void)
        OnUpdateMeleeHitChance(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateRuneRegen(callback: (
              player: TSPlayer
            , value: TSMutable<float>
            , runteType: RuneType /*runeType*/
        )=>void)
        OnUpdateExpertise(callback: (
              player: TSPlayer
            , value: TSMutable<int32>
            , type: WeaponAttackType
            , item: TSItem
        )=>void)
        OnUpdateSpellCrit(callback: (
              player: TSPlayer
            , value: TSMutable<float>
            , school: SpellSchools
        )=>void)
        OnUpdateArmorPenetration(callback: (
              player: TSPlayer
            , value: TSMutable<int32>
        )=>void)
        OnUpdateMeleeHitChances(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateRangedHitChances(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateSpellHitChances(callback: (
              player: TSPlayer
            , value: TSMutable<float>
        )=>void)
        OnUpdateResistance(callback: (
              player: TSPlayer
            , value: TSMutable<float>
            , school: SpellSchools
        )=>void)
        OnUpdateShieldBlock(callback: (
              player: TSPlayer
            , value: TSMutable<uint32>
        )=>void)
        OnUpdateCrit(callback: (
              player: TSPlayer
            , value: TSMutable<float>
            , attackType: WeaponAttackType
        )=>void)

        OnCalcGreyLevel(callback: (
              player: TSPlayer
            , level: TSMutable<uint8>
        )=>void)
        OnCalcZeroDiff(callback: (
              player: TSPlayer
            , zeroDiff: TSMutable<uint8>
        )=>void)
        OnCalcGroupGain(callback: (
              killer: TSPlayer
            , groupRate: TSMutable<float>
            , count: uint32
            , isRaid: bool
        )=>void)
        OnCalcStaminaHealthBonus(callback: (
              player: TSPlayer
            , bonus: TSMutable<float>
            , baseStam: float
            , bonusStam: float
        )=>void)
        OnCalcIntellectManaBonus(
            callback: (
                  player: TSPlayer
                , bonus: TSMutable<float>
                , baseInt: float
                , bonusInt: float
            )=>void)
        OnCalcSkillGainChance(callback: (
              player: TSPlayer
            , chance: TSMutable<int>
            , skillId: int
            , value: int
            , grayLevel: int
            , greenLevel: int
            , yellowLevel: int
        )=>void)
        OnUpdateAttackPower(callback: (
              player: TSPlayer
            , attackPower: TSMutable<float>
        )=>void)
        OnUpdateRangedAttackPower(callback: (
              player: TSPlayer
            , attackPower: TSMutable<float>
        )=>void)
    }

    export class Account<T> {
        OnAccountLogin(callback: (accountId : uint32)=>void);
        OnFailedAccountLogin(callback: (accountId : uint32)=>void);
        OnEmailChange(callback: (accountId : uint32)=>void);
        OnFailedEmailChange(callback: (accountId : uint32)=>void);
        OnPasswordChange(callback: (accountId : uint32)=>void);
        OnFailedPasswordChange(callback: (accountId : uint32)=>void);
    }

    export class Guild<T> {
        OnAddMember(callback: (guild : TSGuild,player : TSPlayer,plRank : TSMutable<uint8>)=>void);
        OnRemoveMember(callback: (guild : TSGuild,player : TSPlayer,isDisbanding : bool,isKicked : bool)=>void);
        OnMOTDChanged(callback: (guild : TSGuild,newMotd : string)=>void);
        OnInfoChanged(callback: (guild : TSGuild,newInfo : string)=>void);
        OnCreate(callback: (guild : TSGuild,leader : TSPlayer,name : string)=>void);
        OnDisband(callback: (guild : TSGuild)=>void);
        OnMemberWitdrawMoney(callback: (guild : TSGuild,player : TSPlayer,amount : TSMutable<uint32>,isRepair : bool)=>void);
        OnMemberDepositMoney(callback: (guild : TSGuild,player : TSPlayer,amount : TSMutable<uint32>)=>void);
        OnEvent(callback: (guild : TSGuild,eventType : uint8,playerGuid1 : uint32,playerGuid2 : uint32,newRank : uint8)=>void);
        OnBankEvent(callback: (guild : TSGuild,eventType : uint8,tabId : uint8,playerGuid : uint32,itemOrMoney : uint32,itemStackCount : uint16,destTabId : uint8)=>void);
    }

    export class Group<T> {
        OnAddMember(callback: (group : TSGroup,guid : uint64)=>void);
        OnInviteMember(callback: (group : TSGroup,guid : uint64)=>void);
        OnRemoveMember(callback: (group : TSGroup,guid : uint64,method : uint32,kicker : uint64,reason : string)=>void);
        OnChangeLeader(callback: (group : TSGroup,newLeaderGuid : uint64,oldLeaderGuid : uint64)=>void);
        OnDisband(callback: (group : TSGroup)=>void);
    }

    export class SpellID<T> {
        OnCast(spell: EventID, callback : (spell: TSSpell)=>void);
        OnCheckCast(spell: EventID, callback : (spell: TSSpell, result: TSMutable<SpellCastResult>)=>void);
        OnDispel(spell: EventID, callback: (spell: TSSpell, dispelType: uint32)=>void);
        OnEffect(spell: EventID, callback: (spell: TSSpell, cancel: TSMutable<bool>, info: TSSpellEffectInfo, mode: SpellEffectHandleMode, unitTarget: TSUnit, item: TSItem, obj: TSGameObject, corpse: TSCorpse)=>void);
        OnHit(spell: EventID, callback: (spell: TSSpell)=>void);
        OnTick(spell: EventID, callback: (effect: TSAuraEffect)=>void);
        OnRemove(spell: EventID, callback: (effect: TSAuraEffect, application: TSAuraApplication, type: uint32)=>void);
        OnCalcMeleeMiss(callback: (spell: TSSpellInfo, miss: TSMutable<float>, attacker: TSUnit, victim: TSUnit, attackType: uint8, skillDiff: WeaponAttackType)=>void): T
        OnApply(spell: EventID, callback: (effect: TSAuraEffect, application: TSAuraApplication, type: uint32)=>void);
        OnDamageEarly(spell: EventID, callback : (
              spell: TSSpell
            , damage: TSMutable<int32>
            , info: TSSpellDamageInfo
            , type: uint32
            , isCrit: bool
        )=>void)
        OnDamageLate(spell: EventID, callback : (
            spell: TSSpell
          , damage: TSMutable<int32>
          , info: TSSpellDamageInfo
          , type: uint32
          , isCrit: bool
        )=>void)
        OnPeriodicDamage(spell: EventID, callback : (aura: TSAuraEffect, damage: TSMutable<uint32>)=>void)
        /** critChance should be between 0 and 1 */
        OnCalcCrit(spell: EventID, callback : (spelL: TSSpell, chance: TSMutable<float>)=>void)
        /** critChance should be between 0 and 1 */
        OnCalcAuraCrit(spell: EventID, callback : (aura: TSAuraEffect, chance: TSMutable<float>)=>void)
        /** reflectCHance should be an integer between 0 and 10000 */
        OnCalcReflect(spell: EventID, callback : (
              spell: TSSpellInfo
            , reflectChance: TSMutable<int32>
            , attacker: TSWorldObject
            , victim: TSUnit
        )=>void)
        /** hitChance should be an integer between 0 and 10000 */
        OnCalcHit(spell: EventID, callback : (
              spell: TSSpellInfo
            , hitChance: TSMutable<int32>
            , attacker: TSWorldObject
            , defender: TSUnit
        )=>void)
        /** resistChance should be an integer between 0 and 10000 */
        OnCalcResist(spell: EventID, callback : (
              spell: TSSpellInfo
            , resistChance: TSMutable<int32>
            , attacker: TSWorldObject
            , defender: TSUnit
        )=>void)
        OnCalcSpellPowerLevelPenalty(spell: EventID, callback: (
              spell: TSSpellInfo
            , penalty: TSMutable<float>
            , caster: TSUnit
        )=>void)

        OnTrainerSend(spell: EventID, callback: (
              spell: TSSpellInfo
            , trainerId: uint32
            , receiver: TSPlayer
            , allow: TSMutable<bool>
        )=>void)
    }

    export class Spells<T> {
        OnCast(callback : (spell: TSSpell)=>void): T;
        OnCheckCast(callback : (spell: TSSpell, result: TSMutable<SpellCastResult>)=>void): T;
        OnDispel(callback: (spell: TSSpell, dispelType: uint32)=>void): T;
        OnEffect(callback: (spell: TSSpell, cancel: TSMutable<bool>, info: TSSpellEffectInfo, mode: SpellEffectHandleMode, unitTarget: TSUnit, item: TSItem, obj: TSGameObject, corpse: TSCorpse)=>void);
        OnHit(callback: (spell: TSSpell)=>void): T;
        OnTick(callback: (effect: TSAuraEffect)=>void): T;
        OnRemove(callback: (effect: TSAuraEffect, application: TSAuraApplication, type: uint32)=>void): T;
        OnApply(callback: (effect: TSAuraEffect, application: TSAuraApplication, type: uint32)=>void): T;
        OnCalcMeleeMiss(callback: (spell: TSSpellInfo, miss: TSMutable<float>, attacker: TSUnit, victim: TSUnit, attackType: WeaponAttackType, skillDiff: int32)=>void): T
        OnDamageEarly(callback : (
            spell: TSSpell
          , damage: TSMutable<int32>
          , info: TSSpellDamageInfo
          , type: uint32
          , isCrit: bool
        )=>void): T
        OnDamageLate(callback : (
              spell: TSSpell
            , damage: TSMutable<int32>
            , info: TSSpellDamageInfo
            , type: uint32
            , isCrit: bool
        )=>void): T
        OnPeriodicDamage(callback : (aura: TSAuraEffect, damage: TSMutable<uint32>)=>void): T
        /** critChance should be between 0 and 1 */
        OnCalcCrit(callback : (spelL: TSSpell, chance: TSMutable<float>)=>void): T
        /** critChance should be between 0 and 1 */
        OnCalcAuraCrit(callback : (aura: TSAuraEffect, chance: TSMutable<float>)=>void): T
        /** reflectCHance should be an integer between 0 and 10000 */
        OnCalcReflect(callback : (
                spell: TSSpellInfo
            , reflectChance: TSMutable<int32>
            , attacker: TSWorldObject
            , victim: TSUnit
        )=>void): T
        /** hitChance should be an integer between 0 and 10000 */
        OnCalcHit(callback : (
                spell: TSSpellInfo
            , hitChance: TSMutable<int32>
            , attacker: TSWorldObject
            , defender: TSUnit
        )=>void): T
        /** resistChance should be an integer between 0 and 10000 */
        OnCalcResist(callback : (
                spell: TSSpellInfo
            , resistChance: TSMutable<int32>
            , attacker: TSWorldObject
            , defender: TSUnit
        )=>void): T
        OnCalcSpellPowerLevelPenalty(callback: (
                spell: TSSpellInfo
            , penalty: TSMutable<float>
            , caster: TSUnit
        )=>void): T
        OnTrainerSend(callback: (spell: TSSpellInfo, trainerId: uint32, receiver: TSPlayer, allow: TSMutable<bool>)=>void): T
    }

    export class CreatureID<T> {
        OnGenerateLoot(creature: EventID, callback: (creature: TSCreature, killer: TSPlayer)=>void);
        OnMoveInLOS(creature: EventID, callback: (creature: TSCreature, seen: TSUnit)=>void);
        OnJustEnteredCombat(creature: EventID, callback: (creature: TSCreature, target: TSUnit)=>void);
        OnDeath(creature: EventID, callback: (creature: TSCreature, killer: TSUnit)=>void);
        OnDeathEarly(creature: EventID, callback: (creature: TSCreature, killer: TSUnit)=>void);
        OnKilledUnit(creature: EventID, callback: (creature: TSCreature, killed: TSUnit)=>void);
        OnSummoned(creature: EventID, callback: (creature: TSCreature, summon: TSCreature)=>void);
        OnIsSummoned(creature: EventID, callback: (creature: TSCreature, summoner: TSWorldObject)=>void);
        OnSummonDespawn(creature: EventID, callback: (creature: TSCreature, summon: TSCreature)=>void);
        OnSummonDies(creature: EventID, callback: (creature: TSCreature, summon: TSCreature, killer: TSUnit)=>void);
        OnHitBySpell(creature: EventID, callback: (creature: TSCreature, caster: TSWorldObject, spellInfo: TSSpellInfo)=>void);
        OnSpellHitTarget(creature: EventID, callback: (creature: TSCreature, target: TSWorldObject, spellInfo: TSSpellInfo)=>void);
        OnSpellCastFinished(creature: EventID, callback: (creature: TSCreature, spellInfo: TSSpellInfo, reason: SpellFinishReason)=>void);
        OnJustAppeared(creature: EventID, callback: (creature: TSCreature)=>void);
        OnCharmed(creature: EventID, callback: (creature: TSCreature, isNew: boolean)=>void);
        OnReachedHome(creature: EventID, callback: (creature: TSCreature)=>void);
        OnReceiveEmote(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, emote: uint32)=>void);
        OnOwnerAttacked(creature: EventID, callback: (creature: TSCreature, attacker: TSUnit)=>void);
        OnOwnerAttacks(creature: EventID, callback: (creature: TSCreature, target: TSUnit)=>void);
        OnCorpseRemoved(creature: EventID, callback: (creature: TSCreature, delay: uint32)=>void);

        OnCreate(creature: EventID, callback: (creature: TSCreature, cancel: TSMutable<boolean>)=>void)
        OnReload(creature: EventID, callback: (creature: TSCreature)=>void)
        OnRemove(creature: EventID, callback: (creature: TSCreature)=>void)

        OnWaypointStarted(creature: EventID, callback: (creature: TSCreature, id: uint32, path: uint32)=>void);
        OnWaypointReached(creature: EventID, callback: (creature: TSCreature, id: uint32, path: uint32)=>void);
        OnWaypointPathEnded(creature: EventID, callback: (creature: TSCreature, id: uint32, path: uint32)=>void);
        OnPassengerBoarded(creature: EventID, callback: (creature: TSCreature, passenger: TSUnit, seatId: int8, isFirst: boolean)=>void);

        OnSpellClick(creature: EventID, callback: (creature: TSCreature, clicker: TSUnit, isFirst: boolean)=>void);
        OnUpdateAI(creature: EventID, callback: (creature: TSCreature, diff: uint32)=>void);

        OnGossipHello(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, cancel: TSMutable<bool>)=>void)
        OnGossipSelect(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, menuId: number, selectionId: number, cancel: TSMutable<bool>)=>void)
        OnGossipSelectCode(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, menuId: number, selectionId: number, code: string, cancel: TSMutable<bool>)=>void)
        OnQuestAccept(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, quest: TSQuest)=>void)
        OnQuestReward(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, quest: TSQuest, selection: uint32)=>void)
        /**
         * NOTE: Only use this event to enable pickpocket loot
         * Use "CreatureOnGeneratePickPocketLoot" to actually generate loot
         */
        OnCanGeneratePickPocketLoot(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, canGenerate: TSMutable<bool>)=>void)
        /**
         * NOTE: You may need to also call "OnCanGeneratePickPocketLoot" if this doesn't fire for your specific creature
         */
        OnGeneratePickPocketLoot(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, loot: TSLoot)=>void)
        OnGenerateSkinningLoot(creature: EventID, callback: (creature: TSCreature, player: TSPlayer, loot: TSLoot)=>void)
        OnSendVendorItem(creature: EventID, callback: (creature: TSCreature, item: TSItemTemplate, player: TSPlayer, shouldSend: TSMutable<bool>)=>void)

        OnUpdateResistance(creature: EventID, callback: (
              creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
            , school: SpellSchools
        )=>void)
        OnUpdateArmor(creature: EventID, callback: (
              creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxHealth(creature: EventID, callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxPower(creature: EventID, callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
            , powerType: Powers
        )=>void)
        OnUpdateAttackPowerDamage(creature: EventID, callback:(
              creature: TSCreature
            , base: TSMutable<float> /*base*/
            , mod: TSMutable<float> /*mod*/
            , multiplier: TSMutable<float> /*multiplier*/
            , isGuardian: bool /*isGuardian*/
            , ranged: bool /*ranged*/
        )=>void)
        OnUpdateDamagePhysical(creature: EventID, callback: (
              creature: TSCreature
            , min: TSMutable<float>
            , max: TSMutable<float>
            , isGuardian: bool
            , attType: WeaponAttackType
        )=>void)

        OnUpdateLvlDepMaxHealth(creature: EventID, callback: (
            creature: TSCreature
          , maxHealth: TSMutable<uint32>
          , rankHealthMod: float
          , baseHp: uint32
        )=>void)

        OnUpdateLvlDepMaxMana(creature: EventID, callback: (
              creature: TSCreature
            , maxMana: TSMutable<uint32>
            , baseMana: float
        )=>void)

        OnUpdateLvlDepBaseDamage(creature: EventID, callback: (
              creature: TSCreature
            , baseMinDamage: TSMutable<uint32>
            , baseMaxDamage: TSMutable<uint32>
            , baseDamageIn: float
        )=>void)

        OnUpdateLvlDepArmor(creature: EventID, callback: (
            creature: TSCreature
          , armorOut: TSMutable<uint32>
          , baseArmor: float
        )=>void)

        OnUpdateLvlDepAttackPower(creature: EventID, callback: (
            creature: TSCreature
          , attackPower: TSMutable<uint32>
          , rangedAttackPower: TSMutable<uint32>
        )=>void)

        OnCalcColorCode(creature: EventID, callback: (
              creature: TSCreature
            , code: TSMutable<uint8>
            , player: TSPlayer
            , playerLevel: uint32
            , creatureLevel: uint32
        )=>void)

        OnCalcGain(creature: EventID, callback: (
            victim: TSCreature
          , gain: TSMutable<uint32>
          , killer: TSPlayer
        )=>void)

        OnCalcBaseGain(creature: EventID, callback: (
            victim: TSCreature
          , gain: TSMutable<uint32>
          , killer: TSPlayer
        )=>void)

        OnUpdateResistance(creature: EventID, callback: (
            creature: TSCreature
          , value: TSMutable<float>
          , isGuardian: bool
          , school: SpellSchools
        )=>void)

        OnUpdateArmor(creature: EventID, callback: (
              creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxHealth(creature: EventID, callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxPower(creature: EventID, callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
            , powerType: Powers
        )=>void)
        OnUpdateAttackPowerDamage(creature: EventID, callback:(
              creature: TSCreature
            , base: TSMutable<float> /*base*/
            , mod: TSMutable<float> /*mod*/
            , multiplier: TSMutable<float> /*multiplier*/
            , isGuardian: bool /*isGuardian*/
            , ranged: bool /*ranged*/
        )=>void)
        OnUpdateDamagePhysical(creature: EventID, callback: (
              creature: TSCreature
            , min: TSMutable<float>
            , max: TSMutable<float>
            , isGuardian: bool
            , attType: uint8
        )=>void)

        OnUpdateLvlDepMana(creature: EventID, callback: (
                creature: TSCreature
            , maxMana: TSMutable<uint32>
            , baseMana: float
        )=>void)

        OnUpdateLvlDepBaseDamage(creature: EventID, callback: (
                creature: TSCreature
            , baseMinDamage: TSMutable<uint32>
            , baseMaxDamage: TSMutable<uint32>
            , baseDamageIn: float
        )=>void)

        OnUpdateLvlDepArmor(creature: EventID, callback: (
            creature: TSCreature
            , armorOut: TSMutable<uint32>
            , baseArmor: float
        )=>void)

        OnUpdateLvlDepAttackPower(creature: EventID, callback: (
            creature: TSCreature
            , attackPower: TSMutable<uint32>
            , rangedAttackPower: TSMutable<uint32>
        )=>void)

        OnCalcColorCode(creature: EventID, callback: (
                creature: TSCreature
            , code: TSMutable<uint8>
            , player: TSPlayer
            , playerLevel: uint32
            , creatureLevel: uint32
        )=>void)

        OnCalcGain(creature: EventID, callback: (
            victim: TSCreature
            , gain: TSMutable<uint32>
            , killer: TSPlayer
        )=>void)

        OnCalcBaseGain(creature: EventID, callback: (
            victim: TSCreature
            , gain: TSMutable<uint32>
            , killer: TSPlayer
        )=>void)
    }

    export class Creatures<T> {
        OnGenerateLoot(callback: (creature: TSCreature, killer: TSPlayer)=>void): T;
        OnMoveInLOS(callback: (creature: TSCreature, seen: TSUnit)=>void): T;
        OnJustEnteredCombat(callback: (creature: TSCreature, target: TSUnit)=>void): T;
        OnDeathEarly(callback: (creature: TSCreature, killer: TSUnit)=>void): T;
        OnDeath(callback: (creature: TSCreature, killer: TSUnit)=>void): T;
        OnKilledUnit(callback: (creature: TSCreature, killed: TSUnit)=>void): T;
        OnSummoned(callback: (creature: TSCreature, summon: TSCreature)=>void): T;
        OnIsSummoned(callback: (creature: TSCreature, summoner: TSWorldObject)=>void): T;
        OnSummonDespawn(callback: (creature: TSCreature, summon: TSCreature)=>void): T;
        OnSummonDies(callback: (creature: TSCreature, summon: TSCreature, killer: TSUnit)=>void): T;
        OnHitBySpell(callback: (creature: TSCreature, caster: TSWorldObject, spellInfo: TSSpellInfo)=>void): T;
        OnSpellHitTarget(callback: (creature: TSCreature, target: TSWorldObject, spellInfo: TSSpellInfo)=>void): T;
        OnSpellCastFinished(callback: (creature: TSCreature, spellInfo: TSSpellInfo, reason: SpellFinishReason)=>void): T;
        OnJustAppeared(callback: (creature: TSCreature)=>void): T;
        OnCharmed(callback: (creature: TSCreature, isNew: boolean)=>void): T;
        OnReachedHome(callback: (creature: TSCreature)=>void): T;
        OnReceiveEmote(callback: (creature: TSCreature, player: TSPlayer, emote: uint32)=>void): T;
        OnOwnerAttacked(callback: (creature: TSCreature, attacker: TSUnit)=>void): T;
        OnOwnerAttacks(callback: (creature: TSCreature, target: TSUnit)=>void): T;
        OnCorpseRemoved(callback: (creature: TSCreature, delay: uint32)=>void): T;
        OnCreate(callback: (creature: TSCreature, cancel: TSMutable<bool>)=>void): T;
        OnReload(callback: (creature: TSCreature)=>void) : T
        OnWaypointStarted(callback: (creature: TSCreature, id: uint32, path: uint32)=>void): T;
        OnWaypointReached(callback: (creature: TSCreature, id: uint32, path: uint32)=>void): T;
        OnWaypointPathEnded(callback: (creature: TSCreature, id: uint32, path: uint32)=>void): T;
        OnPassengerBoarded(callback: (creature: TSCreature, passenger: TSUnit, seatId: int8, isFirst: boolean)=>void): T;

        OnSpellClick(callback: (creature: TSCreature, clicker: TSUnit, isFirst: boolean)=>void): T;
        OnUpdateAI(callback: (creature: TSCreature, diff: uint32)=>void): T;

        OnGossipHello(callback: (creature: TSCreature, player: TSPlayer, cancel: TSMutable<bool>)=>void): T
        OnGossipSelect(callback: (creature: TSCreature, player: TSPlayer, menuId: number, selectionId: number, cancel: TSMutable<bool>)=>void): T
        OnGossipSelectCode(callback: (creature: TSCreature, player: TSPlayer, menuId: number, selectionId: number, code: string, cancel: TSMutable<bool>)=>void): T

        OnQuestAccept(callback: (creature: TSCreature, player: TSPlayer, quest: TSQuest)=>void): T
        OnQuestReward(callback: (creature: TSCreature, player: TSPlayer, quest: TSQuest, selection: uint32)=>void): T
        /**
         * NOTE: Only use this event to enable pickpocket loot
         * Use "CreatureOnGeneratePickPocketLoot" to actually generate loot
         */
        OnCanGeneratePickPocketLoot(callback: (creature: TSCreature, player: TSPlayer, canGenerate: TSMutable<bool>)=>void): T
        /**
         * NOTE: You may need to also call "OnCanGeneratePickPocketLoot" if this doesn't fire for your specific creature
         */
        OnGeneratePickPocketLoot(callback: (creature: TSCreature, player: TSPlayer, loot: TSLoot)=>void): T
        OnGenerateSkinningLoot(callback: (creature: TSCreature, player: TSPlayer, loot: TSLoot)=>void): T
        OnSendVendorItem(callback: (creature: TSCreature, item: TSItemTemplate, player: TSPlayer, shouldSend: TSMutable<bool>)=>void): T

        OnUpdateResistance(callback: (
              creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
            , school: SpellSchools
        )=>void)
        OnUpdateArmor(callback: (
              creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxHealth(callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
        )=>void)
        OnUpdateMaxPower(callback: (
            creature: TSCreature
            , value: TSMutable<float>
            , isGuardian: bool
            , powerType: Powers
        )=>void)
        OnUpdateAttackPowerDamage(callback:(
              creature: TSCreature
            , base: TSMutable<float> /*base*/
            , mod: TSMutable<float> /*mod*/
            , multiplier: TSMutable<float> /*multiplier*/
            , isGuardian: bool /*isGuardian*/
            , ranged: bool /*ranged*/
        )=>void)
        OnUpdateDamagePhysical(callback: (
              creature: TSCreature
            , min: TSMutable<float>
            , max: TSMutable<float>
            , isGuardian: bool
            , attType: WeaponAttackType
        )=>void)

        OnUpdateLvlDepMaxHealth(callback: (
            creature: TSCreature
          , maxHealth: TSMutable<uint32>
          , rankHealthMod: float
          , baseHp: uint32
        )=>void)

        OnUpdateLvlDepMaxMana(callback: (
              creature: TSCreature
            , maxMana: TSMutable<uint32>
            , baseMana: float
        )=>void)

        OnUpdateLvlDepBaseDamage(callback: (
              creature: TSCreature
            , baseMinDamage: TSMutable<uint32>
            , baseMaxDamage: TSMutable<uint32>
            , baseDamageIn: float
        )=>void)

        OnUpdateLvlDepArmor(callback: (
            creature: TSCreature
          , armorOut: TSMutable<uint32>
          , baseArmor: float
        )=>void)

        OnUpdateLvlDepAttackPower(callback: (
            creature: TSCreature
          , attackPower: TSMutable<uint32>
          , rangedAttackPower: TSMutable<uint32>
        )=>void)

        OnCalcColorCode(callback: (
              creature: TSCreature
            , code: TSMutable<uint8>
            , player: TSPlayer
            , playerLevel: uint32
            , creatureLevel: uint32
        )=>void)

        OnCalcGain(callback: (
            victim: TSCreature
          , gain: TSMutable<uint32>
          , killer: TSPlayer
        )=>void)

        OnCalcBaseGain(callback: (
            victim: TSCreature
          , gain: TSMutable<uint32>
          , killer: TSPlayer
        )=>void)
    }

    export class Quests<T> {
        OnAccept(callback: (
              quest: TSQuest
            , player: TSPlayer
            , questgiver: TSObject
        )=>void)

        OnReward(callback: (
              quest: TSQuest
            , player: TSPlayer
            , questgiver: TSObject
            , value: uint32
        )=>void)

        OnSpellFinish(callback: (
            quest: TSQuest
          , player: TSPlayer
          , questgiver: TSSpell
        )=>void)

        OnObjectiveProgress(callback: (
            quest: TSQuest
          , player: TSPlayer
          , index: uint32
          , progress: uint16
        )=>void)

        OnStatusChanged(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
        )=>void)

        OnRewardXP(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
          , reward: TSMutable<uint32>
        )=>void)
    }

    export class QuestID<T> {
        OnAccept(event: EventID, callback: (
              quest: TSQuest
            , player: TSPlayer
            , questgiver: TSObject
        )=>void)

        OnReward(event: EventID, callback: (
              quest: TSQuest
            , player: TSPlayer
            , questgiver: TSObject
            , value: uint32
        )=>void)

        OnSpellFinish(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
          , questgiver: TSSpell
        )=>void)

        OnObjectiveProgress(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
          , index: uint32
          , progress: uint16
        )=>void)

        OnStatusChanged(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
        )=>void)

        OnRewardXP(event: EventID, callback: (
            quest: TSQuest
          , player: TSPlayer
          , reward: TSMutable<uint32>
        )=>void)
    }

    export class Unit {
        OnCalcMissChance(callback: (unit: TSUnit, chance: TSMutable<float>)=>void)
        OnCalcHeal(callback: (healer: TSUnit, target: TSUnit, heal: TSMutable<uint32>)=>void)
        OnMeleeDamageEarly(callback: (
              info: TSMeleeDamageInfo
            , damage: TSMutable<uint32>
            , type: uint32
            , index: uint32
            )=>void
        )
        OnMeleeDamageLate(callback: (
              info: TSMeleeDamageInfo
            , damage: TSMutable<uint32>
            , type: uint32
            , index: uint32
        )=>void)

        OnCalcMeleeCrit(callback: (
              attacker: TSUnit
            , victim: TSUnit
            , crit: TSMutable<float>
            , attackType: WeaponAttackType
        )=>void)

        OnCalcMeleeOutcome(callback: (
              attacker: TSUnit
            , victim: TSUnit
            , missChance: TSMutable<float>
            , critChance: TSMutable<float>
            , dodgeChance: TSMutable<float>
            , blockChance : TSMutable<float>
            , parryChance: TSMutable<float>
            , attackType: WeaponAttackType
        )=>void)

        OnCalcThreatEarly(callback: (
              owner: TSUnit
            , target: TSUnit
            , value: TSMutable<float>
            , spell: TSSpellInfo
            , raw: bool
        )=>void)

        OnCalcThreatLate(callback: (
            owner: TSUnit
          , target: TSUnit
          , value: TSMutable<float>
          , spell: TSSpellInfo
          , raw: bool
        )=>void)

        OnCalcScaleThreat(callback: (
              owner: TSUnit
            , target: TSUnit
            , value: TSMutable<float>
            , raw: boolean
        )=>void)

        /**
         *  Fires BEFORE auras are removed and kill procs
         */
        OnDeathEarly(callback: (victim: TSUnit, killer: TSUnit)=>void);

        /**
         * Fires AFTER auras are removed and kill procs
         */
        OnDeath(callback: (victim: TSUnit, killer: TSUnit)=>void);

        OnEnterCombat(callback: (unit: TSUnit)=>void);
        OnExitCombat(callback: (unit: TSUnit)=>void);
        OnEnterCombatWith(callback: (me: TSUnit, other: TSUnit)=>void);
        OnExitCombatWith(callback: (me: TSUnit, other: TSUnit)=>void);
    }

    export class Battlegrounds<T> {
        OnCreate(callback: (bg: TSBattleground)=>void): T
        OnReload(callback: (bg: TSBattleground)=>void): T
        OnAddPlayer(callback: (bg: TSBattleground,player: TSPlayer)=>void): T
        OnPlayerLogin(callback: (bg: TSBattleground,player: TSPlayer)=>void): T
        OnPlayerLogout(callback: (bg: TSBattleground,player: TSPlayer)=>void): T
        OnUpdateScore(callback: (bg: TSBattleground,player:TSPlayer, type: uint32, isAddHonor: bool, value: TSMutable<uint32>)=>void): T
        OnUpdateEarly(callback: (bg: TSBattleground, diff: uint32 /*diff*/)=>void): T
        OnUpdateLate(callback: (bg: TSBattleground, diff: uint32 /*diff*/)=>void): T
        OnKillPlayer(callback: (bg: TSBattleground,victim: TSPlayer,killer: TSPlayer)=>void): T
        OnEndEarly(callback: (bg: TSBattleground,winner: TSMutable<uint32>)=>void): T
        /**
         * Note that "winner" can no longer be changed at this stage,
         * for that, use "OnEndEarly"
         */
        OnEndLate(callback: (bg: TSBattleground,winner: uint32)=>void): T
        OnKillCreature(callback: (bg: TSBattleground,victim: TSCreature, killer, player: TSPlayer)=>void): T
        OnRemovePlayer(callback: (bg: TSBattleground,guid: uint64,player: TSPlayer, teamId: uint32)=>void): T
        OnPlayerUnderMap(callback: (bg: TSBattleground, player: TSPlayer, handled: TSMutable<bool>)=>void): T
        OnGenericEvent(callback: (bg: TSBattleground,obj: TSWorldObject,eventId: uint32,invoker: TSWorldObject)=>void): T
        OnClickFlag(callback: (bg: TSBattleground,player: TSPlayer,flagObj: TSGameObject)=>void): T
        OnDropFlag(callback: (bg: TSBattleground,player: TSPlayer)=>void): T
        OnDestroyGate(callback: (bg: TSBattleground,player: TSPlayer,target: TSGameObject)=>void): T
        OnOpenDoors(callback: (bg: TSBattleground)=>void): T
        OnCloseDoors(callback: (bg: TSBattleground)=>void): T
        OnReset(callback: (bg: TSBattleground)=>void): T
        OnCanCreate(callback: (bg: TSBattleground,success: TSMutable<bool>)=>void): T
        OnAchievementCriteria( callback: (
              bg: TSBattleground
            , criteria: uint32
            , player: TSPlayer
            , target: TSUnit
            , miscValueA: uint32
            , handled: TSMutable<bool>
        )=>void): T
        OnAreaTrigger(callback: (bg: TSBattleground,player: TSPlayer,trigger: uint32, handled: TSMutable<bool>)=>void): T
        OnAddGameObject(callback: (
              bg: TSBattleground
            , type: uint32
            , entry: TSMutable<uint32>
            , goState: TSMutable<uint8>
            , x: TSMutable<float>
            , y: TSMutable<float>
            , z: TSMutable<float>
            , o: TSMutable<float>
            , rot0: TSMutable<float>
            , rot1: TSMutable<float>
            , rot2: TSMutable<float>
            , rot3: TSMutable<float>
        )=>void): T;

        OnAddCreature(callback: (
              bg: TSBattleground
            , type: uint32
            , entry: TSMutable<uint32>
            , x: TSMutable<float>
            , y: TSMutable<float>
            , z: TSMutable<float>
            , o: TSMutable<float>
            , respawnTime: TSMutable<uint32>
        )=>void): T;

        OnAddSpiritGuide(callback: (
              bg: TSBattleground
            , type: uint32
            , entry: TSMutable<uint32>
            , teamId: TSMutable<uint8>
            , x: TSMutable<float>
            , y: TSMutable<float>
            , z: TSMutable<float>
            , o: TSMutable<float>
        )=>void): T;

        OnWeight(callback: (
              bgType: uint32
            , weight: TSMutable<float>
            , origType: uint32
        )=>void): T

        OnSelect(callback: (
              bgType: TSMutable<uint32>
        )=>void): T
    }

    export class BattlegroundID<T> {
        OnCreate(id: EventID, callback: (bg: TSBattleground)=>void)
        OnReload(id: EventID, callback: (bg: TSBattleground)=>void)
        OnAddPlayer(id: EventID, callback: (bg: TSBattleground,player: TSPlayer)=>void)
        OnPlayerLogin(id: EventID, callback: (bg: TSBattleground,player: TSPlayer)=>void)
        OnPlayerLogout(id: EventID, callback: (bg: TSBattleground,player: TSPlayer)=>void)
        OnUpdateScore(id: EventID, callback: (bg: TSBattleground,player:TSPlayer, type: uint32, isAddHonor: bool, value: TSMutable<uint32>)=>void)
        OnUpdateEarly(id: EventID, callback: (bg: TSBattleground, diff: uint32 /*diff*/)=>void)
        OnUpdateLate(id: EventID, callback: (bg: TSBattleground, diff: uint32 /*diff*/)=>void)
        OnKillPlayer(id: EventID, callback: (bg: TSBattleground,victim: TSPlayer,killer: TSPlayer)=>void)
        OnEndEarly(id: EventID, callback: (bg: TSBattleground,winner: TSMutable<uint32>)=>void)
        /**
         * Note that "winner" can no longer be changed at this stage,
         * for that, use "OnEndEarly"
         */
        OnEndLate(id: EventID, callback: (bg: TSBattleground,winner: uint32)=>void)
        OnKillCreature(id: EventID, callback: (bg: TSBattleground,victim: TSCreature, killer, player: TSPlayer)=>void)
        OnRemovePlayer(id: EventID, callback: (bg: TSBattleground,guid: uint64,player: TSPlayer, teamId: uint32)=>void)
        OnPlayerUnderMap(id: EventID, callback: (bg: TSBattleground, player: TSPlayer, handled: TSMutable<bool>)=>void)
        OnGenericEvent(id: EventID, callback: (bg: TSBattleground,obj: TSWorldObject,eventId: uint32,invoker: TSWorldObject)=>void)
        OnClickFlag(id: EventID, callback: (bg: TSBattleground,player: TSPlayer,flagObj: TSGameObject)=>void)
        OnDropFlag(id: EventID, callback: (bg: TSBattleground,player: TSPlayer)=>void)
        OnDestroyGate(id: EventID, callback: (bg: TSBattleground,player: TSPlayer,target: TSGameObject)=>void)
        OnOpenDoors(id: EventID, callback: (bg: TSBattleground)=>void)
        OnCloseDoors(id: EventID, callback: (bg: TSBattleground)=>void)
        OnReset(id: EventID, callback: (bg: TSBattleground)=>void)
        OnCanCreate(id: EventID, callback: (bg: TSBattleground,success: TSMutable<bool>)=>void)
        OnAchievementCriteria(id: EventID, callback: (
              bg: TSBattleground
            , criteria: uint32
            , player: TSPlayer
            , target: TSUnit
            , miscValueA: uint32
            , handled: TSMutable<bool>
        )=>void)
        OnAreaTrigger(id: EventID, callback: (bg: TSBattleground,player: TSPlayer,trigger: uint32, handled: TSMutable<bool>)=>void)
        OnAddGameObject(id: EventID, callback: (
            bg: TSBattleground
          , type: uint32
          , entry: TSMutable<uint32>
          , goState: TSMutable<uint8>
          , x: TSMutable<float>
          , y: TSMutable<float>
          , z: TSMutable<float>
          , o: TSMutable<float>
          , rot0: TSMutable<float>
          , rot1: TSMutable<float>
          , rot2: TSMutable<float>
          , rot3: TSMutable<float>
      )=>void);

      OnAddCreature(id: EventID, callback: (
            bg: TSBattleground
          , type: uint32
          , entry: TSMutable<uint32>
          , x: TSMutable<float>
          , y: TSMutable<float>
          , z: TSMutable<float>
          , o: TSMutable<float>
          , respawnTime: TSMutable<uint32>
      )=>void);

      OnAddSpiritGuide(id: EventID, callback: (
            bg: TSBattleground
          , type: uint32
          , entry: TSMutable<uint32>
          , teamId: TSMutable<uint8>
          , x: TSMutable<float>
          , y: TSMutable<float>
          , z: TSMutable<float>
          , o: TSMutable<float>
      )=>void);
    }

    export class CustomPackets {
        OnReceive(callback: (
              opcode: uint32
            , packet: TSPacketRead
            , player: TSPlayer
            ) => void
        )
    }

    export class CustomPacketID {
        OnReceive(opcode: EventID, callback: (
              opcode: uint32
            , packet: TSPacketRead
            , player: TSPlayer
            ) => void
        )
    }

    export class WorldPackets {
        OnReceive(callback: (packet: TSWorldPacket, player: TSPlayer)=>void);
        OnSend(callback: (packet: TSWorldPacket, player: TSPlayer)=>void);
    }

    export class WorldPacketID {
        OnReceive(opcode: EventID, callback: (packet: TSWorldPacket, player: TSPlayer)=>void);
        OnSend(opcode: EventID, callback: (packet: TSWorldPacket, player: TSPlayer)=>void);
    }

    export class GameEvents<T> {
        OnStart(callback: (event: uint16)=>void)
        OnUpdateState(callback: (event: uint16)=>void)
        OnEnd(callback: (event: uint16)=>void)
    }

    export class GameEventID<T> {
        OnStart(id: EventID, callback: (event: uint16)=>void)
        UpdateState(id: EventID, callback: (event: uint16)=>void)
        OnEnd(id: EventID, callback: (event: uint16)=>void)
    }

    export class Items<T> {
        OnUse(callback: (item: TSItem, player: TSPlayer, reserved: void, cancel: TSMutable<boolean>)=>void)
        OnExpire(callback: (template: TSItemTemplate, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnRemove(callback: (item: TSItem, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnCastSpell(callback: (item: TSItem, player: TSPlayer, unit: TSUnit, spell: TSSpellInfo, cancel: TSMutable<boolean>)=>void)
        OnQuestAccept(callback: (item: TSItem, player: TSPlayer, quest: TSQuest)=>void)
        OnGossipHello(callback: (item: TSItem, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnGossipSelect(callback: (item: TSItem, player: TSPlayer, menuId: uint32, selectionId: uint32, cancel: TSMutable<boolean>)=>void)
        OnGossipSelectCode(callback: (item: TSItem, player: TSPlayer, menuId: uint32, selectionId: uint32, text: string, cancel: TSMutable<boolean>)=>void)

        OnCanChangeEquipState(callback: (template: TSItemTemplate, res: TSMutable<boolean>)=>void);
        OnUnequip(callback: (item: TSItem, player: TSPlayer, isSwap: boolean, result: TSMutable<uint32>)=>void);
        OnBank(callback: (item: TSItem, player: TSPlayer, bag: uint8, slot: uint8, swap: boolean, result: TSMutable<uint32>)=>void);
        OnCanEquip(callback: (item: TSItem, player: TSPlayer, slot: EquipmentSlots, swap: boolean, result: TSMutable<uint32>)=>void);
        OnEquip(callback: (item: TSItem, player: TSPlayer, slot: EquipmentSlots, isMerge: boolean)=>void)
        OnCanUse(callback: (item: TSItem, player: TSPlayer, result: TSMutable<uint32>)=>void);
        OnCanUseType(callback: (item: TSItemTemplate, player: TSPlayer, result: TSMutable<uint32>)=>void);
        OnLFGRollEarly(callback: (item: TSItemTemplate, looted: TSWorldObject, looter: TSPlayer, result: TSMutable<int32>)=>void);
        OnDestroyEarly(callback: (item: TSItem, player: TSPlayer, result: TSMutable<boolean>)=>void);
        OnTakenAsLoot(callback: (item: TSItem, lootItem: TSLootItem, loot: TSLoot, player: TSPlayer)=>void);
    }

    export class ItemID<T> {
        OnUse(item: EventID, callback: (item: TSItem, player: TSPlayer, reserved: void, cancel: TSMutable<boolean>)=>void)
        OnExpire(item: EventID, callback: (template: TSItemTemplate, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnRemove(item: EventID, callback: (item: TSItem, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnCastSpell(item: EventID, callback: (item: TSItem, player: TSPlayer, unit: TSUnit, spell: TSSpellInfo, cancel: TSMutable<boolean>)=>void)
        OnQuestAccept(item: EventID, callback: (item: TSItem, player: TSPlayer, quest: TSQuest)=>void)
        OnGossipHello(item: EventID, callback: (item: TSItem, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnGossipSelect(item: EventID, callback: (item: TSItem, player: TSPlayer, menuId: uint32, selectionId: uint32, cancel: TSMutable<boolean>)=>void)
        OnGossipSelectCode(item: EventID, callback: (item: TSItem, player: TSPlayer, menuId: uint32, selectionId: uint32, text: string, cancel: TSMutable<boolean>)=>void)

        OnCanChangeEquipState(item: EventID, callback: (template: TSItemTemplate, res: TSMutable<boolean>)=>void);
        OnUnequip(item: EventID, callback: (item: TSItem, player: TSPlayer, isSwap: boolean, result: TSMutable<uint32>)=>void);
        OnBank(item: EventID, callback: (item: TSItem, player: TSPlayer, bag: uint8, slot: uint8, swap: boolean, result: TSMutable<uint32>)=>void);
        OnCanEquip(item: EventID, callback: (item: TSItem, player: TSPlayer, slot: EquipmentSlots, swap: boolean, result: TSMutable<uint32>)=>void);
        OnEquip(item: EventID, callback: (item: TSItem, player: TSPlayer, slot: EquipmentSlots, isMerge: boolean)=>void);
        OnCanUse(item: EventID, callback: (item: TSItem, player: TSPlayer, result: TSMutable<uint32>)=>void);
        OnCanUseType(item: EventID, callback: (item: TSItemTemplate, player: TSPlayer, result: TSMutable<uint32>)=>void);
        OnLFGRollEarly(item: EventID, callback: (item: TSItemTemplate, looted: TSWorldObject, looter: TSPlayer, result: TSMutable<int32>)=>void);
        OnDestroyEarly(item: EventID, callback: (item: TSItem, looter: TSPlayer, result: TSMutable<boolean>)=>void);
        OnTakenAsLoot(item: EventID, callback: (item: TSItem, lootItem: TSLootItem, loot: TSLoot, player: TSPlayer)=>void);
    }

    export class GameObjects<T> {
        OnUpdate(callback: (obj: TSGameObject, diff: uint32)=>void)
        OnDialogStatus(callback: (obj: TSGameObject, player: TSPlayer)=>void)
        OnDestroyed(callback: (obj: TSGameObject, destroyer: TSWorldObject)=>void)
        OnDamaged(callback: (obj: TSGameObject, damagerOrHealer: TSWorldObject)=>void)
        OnLootStateChanged(callback: (obj: TSGameObject, state: uint32, changer: TSUnit)=>void)
        OnGOStateChanged(callback: (obj: TSGameObject, state: uint32)=>void)
        OnGossipHello(callback: (obj: TSGameObject, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnGossipSelect(callback: (obj:TSGameObject, player: TSPlayer, menuId: uint32, selection: uint32, cancel: TSMutable<boolean>)=>void)
        OnGossipSelectCode(callback: (obj:TSGameObject, player: TSPlayer, menuId: uint32, selection: uint32, text: string, cancel: TSMutable<boolean>)=>void)
        OnCreate(callback: (obj: TSGameObject, cancel: TSMutable<boolean>)=>void)
        OnReload(callback: (obj: TSGameObject)=>void)
        OnRemove(callback: (obj: TSGameObject)=>void)
        OnUse(callback: (obj: TSGameObject, user: TSUnit, cancel: TSMutable<boolean>)=>void)
        OnQuestAccept(callback: (obj: TSGameObject, player: TSPlayer, quest: TSQuest)=>void)
        OnGenerateLoot(callback: (obj: TSGameObject, player: TSPlayer)=>void)
        OnGenerateFishLoot(callback: (obj: TSGameObject, player: TSPlayer, loot: TSLoot, isJunk: bool)=>void)
    }

    export class GameObjectID<T> {
        OnUpdate(obj: EventID, callback: (obj: TSGameObject, diff: uint32)=>void)
        OnDialogStatus(obj: EventID, callback: (obj: TSGameObject, player: TSPlayer)=>void)
        OnDestroyed(obj: EventID, callback: (obj: TSGameObject, destroyer: TSWorldObject)=>void)
        OnDamaged(obj: EventID, callback: (obj: TSGameObject, damagerOrHealer: TSWorldObject)=>void)
        OnLootStateChanged(obj: EventID, callback: (obj: TSGameObject, state: uint32, changer: TSUnit)=>void)
        OnGOStateChanged(obj: EventID, callback: (obj: TSGameObject, state: uint32)=>void)
        OnGossipHello(obj: EventID, callback: (obj: TSGameObject, player: TSPlayer, cancel: TSMutable<boolean>)=>void)
        OnGossipSelect(obj: EventID, callback: (obj:TSGameObject, player: TSPlayer, menuId: uint32, selection: uint32, cancel: TSMutable<boolean>)=>void)
        OnGossipSelectCode(obj: EventID, callback: (obj:TSGameObject, player: TSPlayer, menuId: uint32, selection: uint32, text: string, cancel: TSMutable<boolean>)=>void)
        OnCreate(obj: EventID, callback: (obj: TSGameObject, cancel: TSMutable<boolean>)=>void)
        OnRemove(obj: EventID, callback: (obj: TSGameObject)=>void)
        OnUse(obj: EventID, callback: (obj: TSGameObject, user: TSUnit, cancel: TSMutable<boolean>)=>void)
        OnQuestAccept(obj: EventID, callback: (obj: TSGameObject, player: TSPlayer, quest: TSQuest)=>void)
    }

    export class Maps<T> {
        OnCreate(callback: (map: TSMap)=>void): T
        OnReload(callback: (map: TSMap)=>void): T
        OnUpdate(callback: (map: TSMap, diff: uint32)=>void): T
        OnUpdateDelayed(callback: (map: TSMap, diff: uint32, mgr: TSMapManager)=>void): T
        OnPlayerEnter(callback: (map: TSMap, player: TSPlayer)=>void): T
        OnPlayerLeave(callback: (map: TSMap, player: TSPlayer)=>void): T
        OnCreatureCreate(callback: (map: TSMap, creature: TSCreature, cancel: TSMutable<bool>)=>void): T
        OnCreatureRemove(callback: (map: TSMap, creature: TSCreature)=>void): T
        OnGameObjectCreate(callback: (map: TSMap, obj: TSGameObject, cancel: TSMutable<bool>)=>void): T
        OnGameObjectRemove(callback: (map: TSMap, obj: TSGameObject)=>void): T
        OnCheckEncounter(callback: (map: TSMap, player: TSPlayer)=>void): T
    }

    export class MapID<T> {
        OnCreate(map: EventID, callback: (map: TSMap)=>void)
        OnUpdate(map: EventID, callback: (map: TSMap, diff: uint32)=>void)
        OnUpdateDelayed(map: EventID, callback: (map: TSMap, diff: uint32, mgr: TSMapManager)=>void)
        OnPlayerEnter(map: EventID, callback: (map: TSMap, player: TSPlayer)=>void)
        OnPlayerLeave(map: EventID, callback: (map: TSMap, player: TSPlayer)=>void)
        OnCreatureCreate(map: EventID, callback: (map: TSMap, creature: TSCreature, cancel: TSMutable<bool>)=>void)
        OnCreatureRemove(map: EventID, callback: (map: TSMap, creature: TSCreature)=>void)

        OnGameObjectCreate(map: EventID, callback: (map: TSMap, obj: TSGameObject, cancel: TSMutable<bool>)=>void)
        OnGameObjectRemove(map: EventID, callback: (map: TSMap, obj: TSGameObject)=>void)
        OnCheckEncounter(map: EventID, callback: (map: TSMap, player: TSPlayer)=>void)
    }

    export class Instances<T> {
        OnCreate(callback: (instance: TSInstance)=>void): T
        OnReload(callback: (instance: TSInstance)=>void): T
        OnLoad(callback: (instance: TSInstance)=>void): T
        OnSave(callback: (instance: TSInstance)=>void): T
        OnUpdate(callback: (instance: TSInstance, diff: uint32)=>void): T
        OnPlayerEnter(callback: (instance: TSInstance, player: TSPlayer)=>void): T
        OnPlayerLeave(callback: (instance: TSInstance, player: TSPlayer)=>void): T
        OnBossStateChange(callback: (instance: TSInstance, id: uint32, state: uint32)=>void): T
        OnCanKillBoss(callback: (instance: TSInstance, bossId: uint32, player: TSPlayer, canKill: TSMutable<bool>)=>void) : T
        OnFillInitialWorldStates(callback: (instance: TSInstance, packet: TSWorldStatePacket)=>void): T
        OnSetBossNumber(callback: (instance: TSInstance, num: TSMutable<uint32>)=>void): T
        OnLoadMinionData(callback: (instance: TSInstance)=>void): T
        OnLoadDoorData(callback: (instance: TSInstance)=>void): T
        OnLoadObjectData(callback: (instance: TSInstance)=>void): T
    }

    export class InstanceID<T> {
        OnCreate(map: EventID, callback: (instance: TSInstance)=>void)
        OnReload(map: EventID, callback: (instance: TSInstance)=>void)
        OnLoad(map: EventID, callback: (instance: TSInstance)=>void)
        OnSave(map: EventID, callback: (instance: TSInstance)=>void)
        OnUpdate(map: EventID, callback: (instance: TSInstance, diff: uint32)=>void)
        OnPlayerEnter(map: EventID, callback: (instance: TSInstance, player: TSPlayer)=>void)
        OnPlayerLeave(map: EventID, callback: (instance: TSInstance, player: TSPlayer)=>void)
        OnBossStateChange(map: EventID, callback: (instance: TSInstance, id: uint32, state: uint32)=>void)
        OnCanKillBoss(map: EventID, callback: (instance: TSInstance, bossId: uint32, player: TSPlayer, canKill: TSMutable<bool>)=>void)
        OnFillInitialWorldStates(map: EventID, callback: (instance: TSInstance, packet: TSWorldStatePacket)=>void)
        OnSetBossNumber(map: EventID, callback: (instance: TSInstance, num: TSMutable<uint32>)=>void)
        OnLoadMinionData(map: EventID, callback: (instance: TSInstance)=>void)
        OnLoadDoorData(map: EventID, callback: (instance: TSInstance)=>void)
        OnLoadObjectData(map: EventID, callback: (instance: TSInstance)=>void)
    }

    export class AuctionHouse<T> {
        OnAuctionAdd(callback: (obj: TSAuctionHouseObject, entry: TSAuctionEntry)=>void);
        OnAuctionRemove(callback: (obj: TSAuctionHouseObject, entry: TSAuctionEntry)=>void);
        OnAuctionSuccessful(callback: (obj: TSAuctionHouseObject, entry: TSAuctionEntry)=>void);
        OnAuctionExpire(callback: (obj: TSAuctionHouseObject, entry: TSAuctionEntry)=>void);
    }

    export class Conditions<T> {
        OnCheck(callback: (condition: TSCondition, sourceInfo: TSConditionSourceInfo, condMeets: TSMutable<bool>)=>void)
    }

    export class ConditionID<T> {
        OnCheck(type: EventID, callback: (condition: TSCondition, sourceInfo: TSConditionSourceInfo, condMeets: TSMutable<bool>)=>void)
    }

    export class SmartActions<T> {
        OnActivateEarly(callback: (script: TSSmartScriptValues, cancelAction: TSMutable<bool>, cancelLink: TSMutable<bool>)=>void)
        OnActivateLate(callback: (script: TSSmartScriptValues, cancelLink: TSMutable<bool>)=>void)
    }

    export class SmartActionID<T> {
        OnActivateEarly(actionType: EventID, callback: (script: TSSmartScriptValues, cancelAction: TSMutable<bool>, cancelLink: TSMutable<bool>)=>void)
        OnActivateLate(actionType: EventID, callback: (script: TSSmartScriptValues, cancelLink: TSMutable<bool>)=>void)
    }

    export class Addon<T> {
        OnMessage(callback: (reader: any)=>void);
        OnMessageID<T>(cls: new()=>T, callback: (player: TSPlayer,message: T)=>void);
        OnLongMessage(callback: (player: TSPlayer, channel: uint16, message: string)=>void)
    }

    export class Tests<T> {
        //ManualTest(name: string): TSManualTestBuilder
        AutomaticTest(name: string, callback: (player: TSPlayer, assert: TSAssert)=>void)
    }
}
// @hidden-end (do NOT remove this tag!)

declare class TSEvents {
    World: _hidden.World<void>;
    Addon: _hidden.Addon<void>;
    AreaTriggers: _hidden.AreaTrigger<void>;
    AreaTriggerID: _hidden.AreaTrigger<void>;
    //Vehicle: _hidden.Vehicle;
    Achievements: _hidden.Achievements<void>;
    AchievementID: _hidden.AchievementID<void>;
    Player: _hidden.Player<void>;
    Account: _hidden.Account<void>;
    Guild: _hidden.Guild<void>;
    Group: _hidden.Group<void>;
    Spells: _hidden.Spells<void>;
    Creatures: _hidden.Creatures<void>;
    CreatureID: _hidden.CreatureID<void>;
    SpellID: _hidden.SpellID<void>;
    Auction: _hidden.AuctionHouse<void>;
    Maps: _hidden.Maps<void>;
    MapID: _hidden.MapID<void>;
    Items: _hidden.Items<void>;
    ItemID: _hidden.ItemID<void>;
    GameObjects: _hidden.GameObjects<void>;
    GameObjectID: _hidden.GameObjectID<void>;
    Tests: _hidden.Tests<void>;
    Battlegrounds: _hidden.Battlegrounds<void>;
    BattlegroundID: _hidden.BattlegroundID<void>;
    GameEvents: _hidden.GameEvents<void>;
    GameEventID: _hidden.GameEventID<void>;
    SmartActions: _hidden.SmartActions<void>;
    SmartActionID: _hidden.SmartActionID<void>;
    Conditions: _hidden.Conditions<void>;
    ConditionID: _hidden.ConditionID<void>;
    Instances: _hidden.Instances<void>;
    InstanceID: _hidden.InstanceID<void>;
    CustomPackets: _hidden.CustomPackets;
    CustomPacketID: _hidden.CustomPacketID;
    WorldPackets: _hidden.WorldPackets;
    WorldPacketID: _hidden.WorldPacketID;
    Unit: _hidden.Unit;
    Quests: _hidden.Quests<void>;
    QuestID: _hidden.QuestID<void>;
}

declare class TSDictionary<K,V> {
    [custom: string]: V;
    // @ts-ignore
    set(key: K, value: V);
    // @ts-ignore
    contains(key: K): boolean;
    // @ts-ignore
    forEach(callback: (key: K, value: V)=>void);
    // @ts-ignore
    keys(): TSArray<K>
    // @ts-ignore
    reduce<T>(callback: (previous: T,key: K, value: V)=>T, initial: T) : T;
    // @ts-ignore
    filter(callback: (key: K, value: V)=>boolean): TSDictionary<K,V>
    // @ts-ignore
    map<M>(callback: (key: K, value: V, self: TSDictionary<K,V>)=>M): TSDictionary<K,M>
}

declare class TSDBDict<K,V> {
    set(key: K, value: V);
    contains(key: K): boolean;
    get(key: K): V;
}

declare function MakeDBDict<K,V>(): TSDBDict<K,V>;

declare interface TSLootItem {
    GetItemID(): uint32;
    GetRandomSuffix(): uint32;
    GetRandomPropertyID(): uint32;
    GetCount(): uint32;
    SetItemID(itemId: uint32);
    SetRandomPropertyID(propertyId: int32);
    SetCount(count: uint8);
}

declare interface TSLoot {
    IsNull(): bool;
    Clear(): void;
    IsLooted(): bool;
    AddItem(id: uint32, minCount: uint8, maxCount: uint8, lootMode?: uint16, needsQuest?: bool, groupId?: uint8): void;
    AddLooter(looter: uint64): void;
    RemoveLooter(looter: uint64): void;
    SetLootType(lootType: uint32): void;
    SetMoney(money: uint32): void;
    GetLootType(): uint32;
    GetMoney(): uint32;
    GetLootOwner(): uint64;
    SetLootOwner(owner: uint64);
    GetItemCount(): uint32;
    GetQuestItemCount(): uint32;

    GetItem(index: uint32): TSLootItem;
    GetQuestItem(index: uint32): TSLootItem;
    Filter(predicate: (item: TSLootItem)=>bool);
    GetGeneratesNormally(): bool;
    SetGeneratesNormally(normal: bool);
}

declare interface TSAuctionEntry {
    GetID(): uint32;
    GetHouseID(): uint8;
    /**
     * Returns the GUID of this item
     */
    GetItemID(): uint64;
    /**
     * Returns the item_template id of this item
     */
    GetItemEntry(): uint32;
    GetItemCount(): uint32;
    GetOwnerID(): uint64;
    GetStartBid(): uint32;
    GetBid(): uint32;
    GetBuyout(): uint32;
    GetExpireTime(): uint64;
    GetBidder(): uint64;
    GetDeposit(): uint32;
    GetETime(): uint32;
    GetBidders(): TSArray<uint64>
    GetFlags(): uint32;

    SetItemID(itemId: uint64);
    SetItemEntry(itemEntry: uint64);
    SetItemCount(itemCount: uint32);
    SetOwnerID(ownerId: uint64);
    SetStartBid(startBid: uint32);
    SetBid(bid: uint32);
    SetBuyout(buyout: uint32);
    SetBidder(bidder:uint64);
    SetDeposit(deposit: uint32);
    SetETime(eTime: uint32);
    SetFlags(flags: uint32);
}

declare interface TSAuctionHouseObject {
    GetKeys() : TSArray<uint32>
    GetEntry(key: uint32): TSAuctionEntry
    RemoveAuction(key: uint32|TSAuctionEntry): bool
    GetCount(): uint32;
    AddAuction(entry: TSAuctionEntry);
}

declare interface TSMailItemInfo {
    GetGUID(): uint64;
    GetItemTemplate(): uint32;
}

declare interface TSMail {
    GetID(): uint32;
    GetType(): uint8;
    GetTemplateID(): uint16;
    GetSender(): uint64;
    GetReceiver(): uint64;
    GetState(): uint16;
    GetMoney(): uint32;
    GetCOD(): uint32;
    GetChecked(): uint32;
    GetSubject(): string;
    GetBody(): string;
    GetItems(): TSArray<TSMailItemInfo>
    GetItemCount(): uint32;
    FilterItems(predicate: (info: TSMailItemInfo)=>boolean);
    RemoveAllItems();
    AddItem(entry: uint32, count: uint8, player?: TSPlayer);
    SetMoney(money: uint32)
    SetCOD(cod: uint32)
    SetChecked(checked: uint32)
    SetSender(type: uint8, guid: uint64)
    SetSubject(subject: string)
    SetBody(body: string)
    SetState(state: uint8)
}

declare interface TSMailDraft {
    GetTemplateID(): uint16
    GetSubject(): string
    GetBody(): string;
    GetMoney(): uint32;
    GetCOD(): uint32;
    GetItemKeys(): TSArray<uint64>
    GetItem(item: uint64): TSItem
    SetTemplateID(id: uint16);
    SetSubject(subject: string);
    SetBody(body: string);
    AddItem(enry: uint32, count: uint8, player?: TSPlayer);
    FilterItems(predicate: (item: TSItem)=>boolean);
}

declare interface TSAreaTriggerEntry {
    GetEntry(): uint32;
    GetContinentID(): uint32;
    GetX(): float;
    GetY(): float;
    GetZ(): float;
    GetRadius(): float;
    GetBoxLength(): float;
    GetBoxWidth(): float;
    GetBoxHeight(): float;
    GetBoxYaw(): float;
}

// Json
declare class TSJsonObject {
    SetBool(key: string, value: boolean): this;
    GetBool(key: string, def?: boolean): boolean;
    HasBool(key: string): boolean;

    SetNumber(key: string, value: double): this;
    GetNumber(key: string, def?: double): double;
    HasNumber(key: string): boolean;

    SetString(key: string, value: string): this;
    GetString(key: string, def?: string): string;
    HasString(key: string): boolean;

    SetObject(key: string, value: TSJsonObject): this;
    GetObject(key: string, def?: TSJsonObject): TSJsonObject;
    HasObject(key: string): boolean;

    SetArray(key: string, value: TSJsonArray): this;
    GetArray(key: string, def?: TSJsonArray): TSJsonArray;
    HasArray(key: string): boolean;

    SetNull(key: string): this;
    HasNull(key: string): bool

    Remove(key: string): this;
    toString(indents?: uint32): string;
    IsValid(): bool
    get length(): uint32
}

declare class TSJsonArray {
    SetBool(index: uint32, value: bool): this;
    GetBool(index: uint32, def?: bool): bool;
    HasBool(index: uint32): bool;
    InsertBool(index: uint32, value: bool): this;
    PushBool(value: bool): this;

    SetNumber(index: uint32, value: double): this;
    GetNumber(index: uint32, def?: double): double;
    HasNumber(index: uint32): bool;
    InsertNumber(index: uint32, value: double): this;
    PushNumber(value: double): this;

    SetString(index: uint32, value: string): this;
    GetString(index: uint32, def?: string): string;
    HasString(index: uint32): bool;
    InsertString(index: uint32, value: string): this;
    PushString(value: string): this;

    SetObject(index: uint32, value: TSJsonObject): this;
    GetObject(index: uint32, def?: TSJsonObject): TSJsonObject;
    HasObject(index: uint32): bool;
    InsertObject(index: uint32, value: TSJsonObject): this;
    PushObject(value: TSJsonObject): this;

    SetArray(index: uint32, value: TSJsonArray): this;
    GetArray(index: uint32, def?: TSJsonArray): TSJsonArray;
    HasArray(index: uint32): bool;
    InsertArray(index: uint32, value: TSJsonArray): this;
    PushArray(value: TSJsonArray): this;

    SetNull(index: uint32): this;
    HasNull(index: uint32): bool
    InsertNull(index: uint32): this
    PushNull(index: uint32): this

    Remove(index: uint32): this;
    toString(indents?: uint32): string;
    IsValid(): bool
    get length(): uint32;
}

declare class _TSJSON {
    parseObject(str: string): TSJsonObject
    parseArray(str: string): TSJsonArray
}
declare const TSJSON: _TSJSON

// Global.h
declare function GetCurrTime(): uint32;
declare function GetUnixTime(): uint64;
declare function SendMail(senderType: uint8, from: uint64, subject: string, body: string, money?: uint32, cod?: uint32, delay?: uint32, items?: TSArray<TSItem>);
declare function SendWorldMessage(message: string);
declare function SyncHttpGet(url: string): string;
declare function IsGameEventActive(event: uint16): boolean
declare function IsHolidayActive(holiday: uint16): boolean
declare function GetActiveGameEvents(): TSArray<uint16>
declare function StartGameEvent(event_id: uint16): void
declare function StopGameEvent(event_id: uint16): void
// end of Global.h

declare function CreateDictionary<K,V>(obj: {[key: string]: V}) : TSDictionary<K,V>
declare function CreateArray<T>(obj: T[]): TSArray<T>

declare function GetID(table: string, mod: string, name: string): uint32;
declare function GetIDTag(mod: string, id: string): TSArray<uint32>
declare function GetIDTagUnique(mod: string, id: string): uint32

/**
 * Runs a compile-time check that a given world database table exists.
 *
 * **Important**: This function does **nothing** at runtime.
 *
 * **Motivation**: It's easy to forget building datascripts after a rebuild
 *                 or reinstallation before you build your scripts.
 *                 This helps you catch such errors before you try reading it in the worldserver.
 *
 * **Type Codes**: Optionally, the second argument can be used to supply a string list of type characters
 *                 to check that the table has some expected number of columns with specific types.
 *                 `i` checks for integer types, `s` for strings, `f` for floats and `*` for any type.
 *
 * **Examples**:
 *
 *     ASSERT_WORLD_TABLE("my_table","s") // asserts "my_table" column 1 is a string.
 *
 *     ASSERT_WORLD_TABLE("my_table","*i") // asserts "my_table" column 2 is an integer.
 *
 *     ASSERT_WORLD_TABLE("my_table","si") // asserts "my_table" column 1 is a string and column 2 is an integer.
 */
declare function ASSERT_WORLD_TABLE(table: string, columns?: string)

declare class BinReader<L extends number> {
    Read<T extends number>(offset: L) : T;
    Write<T extends number>(offset: L, value: T)
    ReadArray<T extends number>(offset: L, arr: TSArray<T>, max: L);
    WriteArray<T extends number>(offset: L, arr: TSArray<T>, max: L);
    ReadString(offset: L, max: L);
    WriteString(offset: L,str: string, max: L);
    WriteStringArray(offset: L, arr: TSArray<string>, arrMax: number, strMax: number);
    ReadStringArray(offset: L, arr: TSArray<string>, marMax: L, strMax: L);
    WriteDouble(offset: L, value: double);
    ReadDouble(offset: L): double;
    WriteArrayDouble(offset: L, arr: TSArray<double>, max: L);
    ReadArrayDouble(offset: L, arr: TSArray<double>, max: L);
    WriteClass<T>(offset: L, value: T);
    ReadClass<T>(offset: L, value: T);
    ReadClassArray<T>(offset: L, arr: TSArray<T>, max: L, ind_size: L, con : ()=>T);
    WriteClassArray<T>(offset: L, arr: TSArray<T>, max: L, ind_size: L);
}

declare class TSDatabaseResult {
    GetUInt8(index: int): uint8;
    GetUInt16(index: int): uint16;
    GetUInt32(index: int): uint32;
    GetUInt64(index: int): uint64;

    GetInt8(index: int): int8;
    GetInt16(index: int): int16;
    GetInt32(index: int): int32;
    GetInt64(index: int): int64;

    GetFloat(index: int): float;
    GetDouble(index: int): double;
    GetString(index: int): string;

    GetRow(): boolean;
    IsValid(): boolean;
}

declare interface TSPreparedStatementBase {
    SetNull(index: uint8): this
    SetUInt8(index: uint8, value: uint8): this
    SetInt8(index: uint8, value: int8): this

    SetUInt16(index: uint8, value: uint16): this
    SetInt16(index: uint8, value: int16): this

    SetUInt32(index: uint8, value: uint32): this
    SetInt32(index: uint8, value: int32): this

    SetUInt64(index: uint8, value: uint64): this
    SetInt64(index: uint8, value: int64): this

    SetFloat(index: uint8, value: float): this
    SetDouble(index: uint8, value: double): this

    SetString(index: uint8, value: float): this
    Send(): TSDatabaseResult
    Send(connection: TSDatabaseConnection): TSDatabaseResult
}

declare interface TSPreparedStatement {
    Create(): TSPreparedStatementBase;
}

declare interface TSPreparedStatementWorld extends TSPreparedStatement {}
declare interface TSPreparedStatementCharacters extends TSPreparedStatement {}
declare interface TSPreparedStatementAuth extends TSPreparedStatement {}

declare class DBEntry {
    /**
     * Writes this entry to the database
     */
    Save(): void;

    /**
     * Reads this entry from the database.
     *
     * If it does not yet exist in the database,
     * this function does nothing.
     */
    Load(): boolean;

    /**
     * Removes this entry from the database immediately.
     */
    Delete(): void;
}

declare class DBArrayEntry {
    /**
     * Marks this entry to be saved to the database for the next
     * call to DBContainer#Save on its owner.
     */
    MarkDirty();

    /**
     * Returns true if this entry will be saved to database on the
     * next call to DBContainer#Save on its owner.
     */
    IsDirty();

    /**
     * Marks this entry for deletion. A deleted entry cannot
     * be added to any other container.
     */
    Delete();

    /**
     * Returns true if this entry has been deleted from its owner.
     */
    IsDeleted();

    /**
     * Returns the internal Index used by this array entry.
     *
     * These cannot be controlled by the programmer at all,
     * and should only be used for debugging.
     */
    Index(): uint64;
}

declare class DBContainer<T extends DBArrayEntry> {
    /**
     * Adds a new value to be owned by this container.
     *
     * - Adding a value belonging to another container is invalid and
     *   will cause an exception. This applies even if the object
     *   has been deleted from the old collection.
     *
     * @param value
     */
    Add(value: T): T;

    /**
     * Writes all dirty array members to the database, and
     * removes all marked for deletion.
     */
    Save();
    forEach(callback: (value: T)=>void)
    reduce<M>(callback: (old: M, cur: T)=>M, init: M);
    find(callback: (value: T)=>bool): T;

    /**
     * Converts this container into an array.
     *
     * - The generated array holds no ownership of the items contained
     */
    ToArray(): TSArray<T>
    /**
     * Counts all active (non-removed) entries currently in this container.
     */
    Size(): uint32
    /**
     * Counts all entries currently in memory, including those scheduled
     * to be removed
     *
     * - Removed entries are freed from memory on "DBContainer#Save()"
     */
    TotalSize(): uint32
}

declare interface TSDatabaseConnection {
    Query(sql: string): TSDatabaseResult
    Query(stmnt: TSPreparedStatementBase)
    Unlock();
}

declare interface TSWorldDatabaseConnection extends TSDatabaseConnection {}
declare interface TSAuthDatabaseConnection extends TSDatabaseConnection {}
declare interface TSCharactersDatabaseConnection extends TSDatabaseConnection {}

declare class TSClass {
    stringify(indention?: int): string;
}

// Item functions
declare function CreateLootItem(id: uint32, reference?: uint32, chance?: float, lootmode?: uint16, needsQuest?: bool, groupId?: uint8, minCount?: uint8, maxCount?: uint8)
declare function CreateItem(entry: uint32, count: uint32): TSItem;
declare function CreateTSMutable<T>(ptr: T): TSMutable<T>;

// Database functions
declare function QueryWorld(query: string): TSDatabaseResult;
declare function QueryCharacters(query: string): TSDatabaseResult;
declare function QueryAuth(query: string): TSDatabaseResult;

declare function PrepareWorldQuery(query: string): TSPreparedStatementWorld
declare function PrepareCharactersQuery(query: string): TSPreparedStatementCharacters
declare function PrepareAuthQuery(query: string): TSPreparedStatementAuth

declare class TSDatabaseConnectionInfo {
    User(): string
    Password(): string
    Database(): string
    Host(): string
    SSL(): string
    PortOrSocket(): string
}

declare class TSMeleeDamageInfo {
    GetAttacker(): TSUnit;
    GetTarget(): TSUnit;
    GetSchool1(): uint32;
    GetSchool2(): uint32;
    GetDamage1(): uint32;
    GetDamage2(): uint32;
    GetAbsorb1(): uint32;
    GetAbsorb2(): uint32;
    GetResist1(): uint32;
    GetResist2(): uint32;
    GetBlocked(): uint32;
    GetHitInfo(): uint32;
    GetAttackType(): uint32;
    GetProcAttacker(): uint32;
    GetProcVictim(): uint32;
    GetCleanDamage(): uint32;
    GetMeleeHitOutcome(): uint8;
}

declare class TSSpellDamageInfo {
    GetAttacker(): TSUnit;
    GetTarget(): TSUnit;
    GetSpellID(): uint32;
    GetDamage(): uint32;
    GetOverkill(): uint32;
    GetSchoolMask(): uint32;
    GetAbsorb(): uint32;
    GetResist(): uint32;
    GetPeriodicLog(): bool;
    GetUnused(): bool;
    GetBlocked(): uint32;
    GetHitInfo(): uint32;
    GetCleanDamage(): uint32;
    GetFullBlock(): bool;
}

declare class TSPacketWrite {
    WriteUInt8(value: uint8): TSPacketWrite;
    WriteInt8(value: int8): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt16(value: uint16): TSPacketWrite;
    WriteInt16(value: int16): TSPacketWrite;

    WriteUInt32(value: uint32): TSPacketWrite;
    WriteInt32(value: int32): TSPacketWrite;

    WriteUInt64(value: uint64): TSPacketWrite;
    WriteInt64(value: int64): TSPacketWrite;

    WriteFloat(value: float): TSPacketWrite;
    WriteDouble(value: double): TSPacketWrite;

    WriteString(value: string): TSPacketWrite;

    Size(): uint32

    SendToPlayer(player: TSPlayer): void;
    BroadcastMap(map: TSMap, teamOnly: uint32): void;
    /**
     * @param self default: true
     */
    BroadcastAround(obj: TSWorldObject, range: float, self?: boolean)
}

declare class TSPacketRead {
    ReadUInt8(def?: uint8): uint8;
    ReadInt8(def?: int8): int8;

    ReadUInt16(def?: uint16): uint16;
    ReadInt16(def?: int16): int16;

    ReadUInt32(def?: uint32): uint32;
    ReadInt32(def?: int32): int32;

    ReadUInt64(def?: uint64): uint64;
    ReadInt64(def?: int64): int64;

    ReadFloat(def?: float): float;
    ReadDouble(def?: double): double;

    ReadString(def?: string): string;

    Size(): uint32
}

declare function WorldDatabaseInfo(): TSDatabaseConnectionInfo
declare function CharacterDatabaseInfo(): TSDatabaseConnectionInfo
declare function AuthDatabaseInfo(): TSDatabaseConnectionInfo

declare function WorldTable(classTarget: any)
declare function CharactersTable(classTarget: any)
declare function AuthTable(classTarget: any)
declare function DBField(fieldTarget: any, name: any)
declare function DBFieldVarChar(chars: number): (target: any, name: any)=>void
declare function DBPrimaryKey(pkTarget: any, name: any)
declare function DBPrimaryKeyVarChar(chars: number): (target: any, name: any)=>void

// File system functions
declare function ReadFile(file: string, def?: string): string
declare function WriteFile(file: string, value)
declare function AppendFile(file: string, value: string)
declare function FileExists(file: string): boolean
declare function ReadDirectory(directory: string): string[];

// Client/Server functions
declare function Message(classTarget: any)
declare function MsgClass(classTarget: any, name: string)
declare function MsgClassArray(size: number): (field: any, name: any)=>void
declare function MsgPrimitive(classTarget: any, name: string)
declare function MsgPrimitiveArray(capacity: number): (field: any, name: any)=>void;
declare function MsgString(size: number): (field: any, name: any)=>void
declare function MsgStringArray(arrSize: number, stringSize: number): (field: any, name: any)=>void

declare function CreateCustomPacket(opcode: uint32, size: uint32): TSPacketWrite;

// Null values
declare function NULL_UNIT(): TSUnit;
declare function NULL_PLAYER(): TSPlayer;
declare function NULL_GAMEOBJECT(): TSGameObject;
declare function NULL_MAP(): TSMap;
declare function NULL_SPELLINFO(): TSSpellInfo;

// Type conversions
declare function ToStr(val: number);
declare function ToUInt8(val: string): uint8;
declare function ToInt8(val: string): int8;

declare function ToUInt16(val: string): uint16;
declare function ToInt16(val: string): int16;

declare function ToUInt32(val: string): uint32;
declare function ToInt32(val: string): int32;

declare function ToUInt64(val: string): uint64;
declare function ToInt64(val: string): int64;

declare function ToDouble(val: string): double;
declare function ToFloat(val: string): float;

declare function ModID(): uint32;
declare function LoadDBEntry<T extends DBEntry>(value: T): T
declare function LoadDBArrayEntry<T extends DBArrayEntry>(cons: new(...args: any[])=>T, ...pks: any[]): DBContainer<T>
declare function QueryDBEntry<T extends DBEntry>(con: new(...args: any[])=>T, sql: string): TSArray<T>
declare function QueryDBArrayEntry<T extends DBArrayEntry>(cons: new(...args: any[])=>T): DBContainer<T>
declare function DeleteDBEntry<T extends DBEntry>(con: new(...args: any[])=>T, sql: string): void
declare function DeleteDBArrayEntry<T extends DBArrayEntry>(con: new(...args: any[])=>T, sql: string): void

declare function GetWorldDBConnection(): TSWorldDatabaseConnection
declare function GetAuthDBConnection(): TSAuthDatabaseConnection
declare function GetCharactersDBConnection(): TSCharactersDatabaseConnection

declare function GetSpellInfo(entry: uint32): TSSpellInfo
declare function GetItemTemplate(entry: uint32): TSItemTemplate
declare function GetCreatureTemplate(entry: uint32): TSCreatureTemplate
declare function GetGameObjectTemplate(entry: uint32): TSGameObjectTemplate