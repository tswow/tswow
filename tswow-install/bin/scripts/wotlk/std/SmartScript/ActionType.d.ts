import { Cell } from "../../../data/cell/cells/Cell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { loc_constructor } from "../../../data/primitives";
import { smart_scriptsRow } from "../../sql/smart_scripts";
import { CreatureTextGroup } from "../BroadcastText/CreatureText";
import { ReactState } from "../Misc/ReactState";
import { SmartScript } from "./SmartScript";
import { SummonType } from "./SummonType";
export declare const ACTION_TYPES: {
    [key: string]: string;
};
export declare const ACTION_ARGS: {
    [key: string]: string[];
};
export declare class ActionType {
    protected row: smart_scriptsRow;
    protected main: SmartScript;
    constructor(main: SmartScript, row: smart_scriptsRow);
    getType(): string;
    getArguments(): {
        [key: string]: number;
    };
    objectify(options?: ObjectifyOptions): {
        type: string;
        arguments: {
            [key: string]: number;
        };
    };
    /**
     *  Do nothing
     */
    setNone(): SmartScript;
    /**
     * More configurable version of setTalk
     *
     * @param duration how long to wait before SMART_EVENT_TEXT_OVER is triggered
     * @param callback creature_text constructor
     * @param unk
     */
    setTalkGroup(callback: (group: CreatureTextGroup, duration: Cell<number, any>, unk: Cell<number, any>) => void): SmartScript;
    /**
     *  Param2 in Milliseconds.
     *  @param Creature_text.groupid
     *  @param Duration to wait before SMART_EVENT_TEXT_OVER is triggered.
     *  @param 0 It will try to trigger talk of the target1 Set target as talk target (used for $vars in texts and whisper target)
     */
    setTalk(textsOrGroupId: number | loc_constructor | loc_constructor[], Duration: number, unk?: number): SmartScript;
    /**
     *  Sets faction to creature.
     *  @param FactionID (or 0 for default)
     */
    setSetFaction(FactionID: number): SmartScript;
    /**
     *  Take DisplayID of creature (param1) OR Turn to DisplayID (param2) OR Both = 0 for Demorph
     *  @param Creature_template.entry(param1)
     *  @param Creature_template.modelID(param2)
     */
    setMorphToEntryOrModel(Creature_templateentryparam1: number, Creature_templatemodelIDparam2: number): SmartScript;
    /**
     *  Play Sound; TextRange = 0 only sends sound to self, TextRange = 1 sends sound to everyone in visibility range
     *  @param SoundId
     *  @param onlySelf (0/1)
     *  @param Distant Sound (0/1)
     */
    setSound(SoundId: number, onlySelf: number, Distant: number): SmartScript;
    /**
     *  Play Emote
     *  @param EmoteId
     */
    setPlayEmote(EmoteId: number): SmartScript;
    /**
     *  Fail Quest of Target
     *  @param QuestID
     */
    setFailQuest(QuestID: number): SmartScript;
    /**
     *  Add Quest to Target
     *  @param QuestID
     *  @param directAdd (0/1)
     */
    setOfferQuest(QuestID: number, directAdd: number): SmartScript;
    /**
     *  React State. Can be Passive (0), Defensive (1), Aggressive (2), Assist (3).
     *  @param State
     */
    setSetReactState(State: ReactState): SmartScript;
    /**
     *  Activate Object
     */
    setActivateGobject(): SmartScript;
    /**
     *  Play Random Emote
     *  @param EmoteId1
     *  @param EmoteId2
     *  @param EmoteId3
     *  @param Emote4
     *  @param Emote5
     *  @param Emote6
     */
    setRandomEmote(EmoteId1: number, EmoteId2: number, EmoteId3: number, Emote4: number, Emote5: number, Emote6: number): SmartScript;
    /**
     *  Cast Spell ID at Target
     *  @param SpellId
     *  @param castFlags
     *  @param triggeredFlags
     */
    setCast(SpellId: number, castFlags: number, triggeredFlags: number): SmartScript;
    /**
     *  Summon Unit
     *  @note To spawn multiple creatures, use target.pointAround* and specify 'amount'. Otherwise you must use multiple separate events and specify targets for each.
     *  @param creature_template.entry
     *  @param summonType type
     *  @param duration in ms
     *  @param attackInvoker
     */
    setSummonCreature(creature_templateentry: number, summonType: SummonType, duration: number, attackInvoker: number): SmartScript;
    /**
     *  Change Threat Percentage for Single Target
     *  @param Threat% inc
     *  @param Threat% dec
     */
    setThreatSinglePct(Threat: number, Threat2: number): SmartScript;
    /**
     *  Change Threat Percentage for All Enemies
     *  @param Threat% inc
     *  @param Threat% dec
     */
    setThreatAllPct(Threat: number, Threat2: number): SmartScript;
    /**
     *
     *  @param QuestID
     */
    setFinishQuestScript(QuestID: number): SmartScript;
    /**
     *  For 4.3.4 + only
     *  @param phaseId
     *  @param apply/remove (1/0)
     */
    setSetIngamePhaseId(phaseId: number, applyremove: number): SmartScript;
    /**
     *  Play Emote Continuously
     *  @param EmoteId
     */
    setSetEmoteState(EmoteId: number): SmartScript;
    /**
     *  Can set Multi-able flags at once
     *  @param (may be more than one field OR'd together)
     *  @param type If false set creature_template.unit_flags If true set creature_template.unit_flags2
     */
    setSetUnitFlag(may: number, type: number): SmartScript;
    /**
     *  Can Remove Multi-able flags at once
     *  @param (may be more than one field OR'd together)
     *  @param type If false set  creature_template.unit_flags If true set creature_template.unit_flags2
     */
    setRemoveUnitFlag(may: number, type: number): SmartScript;
    /**
     *  Stop or Continue Automatic Attack.
     *  @param AllowAttackState (0 = Stop attack, anything else means continue attacking)
     */
    setAutoAttack(AllowAttackState: number): SmartScript;
    /**
     *  Allow or Disable Combat Movement
     *  @param AllowCombatMovement (0 = Stop combat based movement, anything else continue attacking)
     */
    setAllowCombatMovement(AllowCombatMovement: number): SmartScript;
    /**
     *
     *  @param smart_scripts.event_phase_mask
     */
    setSetEventPhase(smart_scriptsevent_phase_mask: number): SmartScript;
    /**
     *  Set param1 OR param2 (not both). Value 0 has no effect.
     *  @param Increment
     *  @param Decrement
     */
    setIncEventPhase(Increment: number, Decrement: number): SmartScript;
    /**
     *  Evade Incoming Attack
     */
    setEvade(): SmartScript;
    /**
     *  If you want the fleeing NPC to say '%s attempts to run away in fear' on flee, use 1 on param1. 0 for no message.
     *  @param 0/1 (If you want the fleeing NPC to say attempts to flee text on flee, use 1 on param1. For no message use 0.)
     */
    setFleeForAssist(zo: number): SmartScript;
    /**
     *
     *  @param QuestID
     */
    setCallGroupeventhappens(QuestID: number): SmartScript;
    /**
     *
     */
    setCombatStop(): SmartScript;
    /**
     *  0 removes all auras
     *  @param Spellid
     *  @param 0/1 onlyOwnedAuras
     */
    setRemoveaurasfromspell(Spellid: number, zo: number): SmartScript;
    /**
     *  Follow Target
     *  @param Distance (0 = Default value)
     *  @param Angle (0 = Default value)
     *  @param End creature_template.entry
     *  @param credit
     *  @param creditType (0monsterkill, 1event)
     */
    setFollow(Distance: number, Angle: number, End: number, credit: number, creditType: number): SmartScript;
    /**
     *
     *  @param smart_scripts.event_phase_mask 1
     *  @param smart_scripts.event_phase_mask 2
     *  @param smart_scripts.event_phase_mask 3
     *  @param smart_scripts.event_phase_mask 4
     *  @param smart_scripts.event_phase_mask 5
     *  @param smart_scripts.event_phase_mask 6
     */
    setRandomPhase(smart_scriptsevent_phase_mask: number, smart_scriptsevent_phase_mask2: number, smart_scriptsevent_phase_mask3: number, smart_scriptsevent_phase_mask4: number, smart_scriptsevent_phase_mask5: number, smart_scriptsevent_phase_mask6: number): SmartScript;
    /**
     *
     *  @param smart_scripts.event_phase_mask minimum
     *  @param smart_scripts.event_phase_mask maximum
     */
    setRandomPhaseRange(smart_scriptsevent_phase_mask: number, smart_scriptsevent_phase_mask2: number): SmartScript;
    /**
     *  Reset Gameobject
     */
    setResetGobject(): SmartScript;
    /**
     *  This is the ID from quest_template.RequiredNpcOrGo
     *  @param Creature_template.entry
     */
    setCallKilledmonster(Creature_templateentry: number): SmartScript;
    /**
     *  Set Instance Data
     *  @param Field
     *  @param Data
     *  @param Type (0 = SetData, 1 = SetBossState)
     */
    setSetInstData(Field: number, Data: number, Type: number): SmartScript;
    /**
     *  Set Instance Data uint64
     *  @param Field
     */
    setSetInstData64(Field: number): SmartScript;
    /**
     *  Updates creature_template to given entry
     *  @param Creature_template.entry
     *  @param Update Level
     */
    setUpdateTemplate(Creature_templateentry: number, Update: number): SmartScript;
    /**
     *  Kill Target
     */
    setDie(): SmartScript;
    /**
     *
     */
    setSetInCombatWithZone(): SmartScript;
    /**
     *  If you want the NPC to say '%s calls for help!'. Use 1 on param1, 0 for no message.
     *  @param Radius in yards that other creatures must be to acknowledge the cry for help.
     *  @param 0/1 (say calls for help text)
     */
    setCallForHelp(Radius: number, zo: number): SmartScript;
    /**
     *
     *  @param Sheath (0-unarmed, 1-melee, 2-ranged)
     */
    setSetSheath(Sheath: number): SmartScript;
    /**
     *  Despawn Target after param1 in Milliseconds. If you want to set respawn time set param2 in seconds.
     *  @param Despawn timer "ms"
     *  @param Respawn timer "sec"
     */
    setForceDespawn(Despawn: number, Respawn: number): SmartScript;
    /**
     *  If you use both params, only percent will be used.
     *  @param flat hp value
     *  @param percent hp value
     */
    setSetInvincibilityHpLevel(flat: number, percent: number): SmartScript;
    /**
     *  Mount to Creature Entry (param1) OR Mount to Creature Display (param2) Or both = 0 for Unmount
     *  @param creature_template.entry
     *  @param creature_template.modelID
     */
    setMountToEntryOrModel(creature_templateentry: number, creature_templatemodelID: number): SmartScript;
    /**
     *
     *  @param creature.phasemask (3.3.5) creature.phasegroup (4.3.4 +)
     *  @param 0 = remove / 1 = add (4.3.4+ only)
     */
    setSetIngamePhaseMask(creaturephasemask: number, ZERO: number): SmartScript;
    /**
     *  Set Data For Target, can be used with SMART_EVENT_DATA_SET
     *  @param Field
     *  @param Data
     */
    setSetData(Field: number, Data: number): SmartScript;
    /**
     *  Stop melee, spell casting during combat, chasing the target and facing
     */
    setAttackStop(): SmartScript;
    /**
     *  Makes creature Visible = 1 or Invisible = 0
     *  @param 0/1
     */
    setSetVisibility(zo: number): SmartScript;
    /**
     *
     *  @param 0/1
     */
    setSetActive(zo: number): SmartScript;
    /**
     *  Allows basic melee swings to creature.
     */
    setAttackStart(): SmartScript;
    /**
     *  Spawns Gameobject, use target_type to set spawn position.
     *  @param gameobject_template.entry
     *  @param De-spawn time in seconds. If 0 and Param2=0 the gob will despawns only with the summoner
     *  @param 0 - For despawn when the summoner despawn or time runs out 1 - For despawn when time runs out
     */
    setSummonGo(gameobject_templateentry: number, Despawn: number, ZERO: number): SmartScript;
    /**
     *  Kills Creature.
     */
    setKillUnit(): SmartScript;
    /**
     *  Sends player to flight path. You have to be close to Flight Master, which gives Taxi ID you need.
     *  @param TaxiID
     */
    setActivateTaxi(TaxiID: number): SmartScript;
    /**
     *  Creature starts Waypoint Movement. Use waypoints table to create movement.
     *  @param 0 = walk / 1 = run
     *  @param waypoints.entry
     *  @param canRepeat
     *  @param quest_template.id
     *  @param despawntime
     *  @param reactState
     */
    setWpStart(shouldRun: boolean, id: number, canRepeat: boolean, quest_templateid: number, despawntime: number, reactState: ReactState): SmartScript;
    /**
     * Creature stores invoker party and starts walking. Use together with 'finishQuestWalk'.
     * @param walkOrRun
     * @param id
     * @param canRepeat
     * @param quest_template
     * @param despawnTime
     * @param reactState
     */
    setQuestWalk(questId: number, path: number, reactState?: ReactState, shouldRun?: boolean, canRepeat?: boolean, despawnTime?: number): SmartScript;
    /**
     * Fails a quest walk started with "setQuestWalk"
     * @param questId
     */
    setFailQuestWalk(questId: number): SmartScript;
    /**
     * Completes a quest walk started with "setQuestWalk",
     * which rewards the group that started it
     * @param questId
     */
    setFinishQuestWalk(questId: number): SmartScript;
    /**
     *  Creature pauses its Waypoint Movement for given time.
     *  @param time (in ms)
     */
    setWpPause(time: number): SmartScript;
    /**
     *  Creature stops its Waypoint Movement.
     *  @param despawnTime
     *  @param quest_template.id
     *  @param fail (0/1)
     */
    setWpStop(despawnTime: number, quest_templateid: number, fail: number): SmartScript;
    /**
     *  Adds item(s) to player.
     *  @param item_template.entry
     *  @param count
     */
    setAddItem(item_templateentry: number, count: number): SmartScript;
    /**
     *  Removes item(s) from player.
     *  @param item_template.entry
     *  @param count
     */
    setRemoveItem(item_templateentry: number, count: number): SmartScript;
    /**
     *
     *  @param TemplateID (see Predefined SAI templates below)
     */
    setInstallAiTemplate(TemplateID: number): SmartScript;
    /**
     *
     *  @param 0 = Off / 1 = On
     */
    setSetRun(ZERO: number): SmartScript;
    /**
     *  Only works for creatures with inhabit air.
     *  @param 0 = gravity On / 1 = gravity Off
     */
    setSetDisableGravity(ZERO: number): SmartScript;
    /**
     *
     *  @param 0 = Off / 1 = On
     */
    setSetSwim(ZERO: number): SmartScript;
    /**
     *  Continue this action with the TARGET_TYPE column. Use any target_type (except 0), and use target_x, target_y, target_z, target_o as the coordinates
     *  @param MapID
     */
    setTeleport(MapID: number): SmartScript;
    /**
     *
     *  @param counterID
     *  @param value
     *  @param reset (0/1)
     */
    setSetCounter(counterID: number, value: number, reset: number): SmartScript;
    /**
     *  @param varID
     */
    setStoreTargetList(varID: number): SmartScript;
    /**
     *  Creature continues in its Waypoint Movement.
     */
    setWpResume(): SmartScript;
    /**
     *
     *  @param Depends on the script target. if SMART_TARGET_SELF, facing will be the same as in HomePosition, For SMART_TARGET_POSITION you need to set target_o : 0 = North, West = 1.5, South = 3, East = 4.5
     */
    setSetOrientation(Depends: number): SmartScript;
    /**
     *
     *  @param id
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin(only if it repeats)
     *  @param RepeatMax(only if it repeats)
     *  @param chance
     */
    setCreateTimedEvent(id: number, InitialMin: number, InitialMax: number, RepeatMinonly: number, RepeatMaxonly: number, chance: number): SmartScript;
    /**
     *
     *  @param entry
     */
    setPlaymovie(entry: number): SmartScript;
    /**
     *  PointId is called by SMART_EVENT_MOVEMENTINFORM. Continue this action with the TARGET_TYPE column. Use any target_type, and use target_x, target_y, target_z, target_o as the coordinates
     *  @param PointId
     *  @param isTransport (0 or 1)
     *  @param disablePathfinding (0 or 1)
     *  @param ContactDistance
     */
    setMoveToPos(PointId: number, isTransport: number, disablePathfinding: number, ContactDistance: number): SmartScript;
    /**
     *  Always action_param1>0 For npcs use action_type=133
     *  @param Respawntime in seconds (The time which the gob remains spawned)
     */
    setEnableTempGobj(Respawntime: number): SmartScript;
    /**
     *  only slots with mask set will be sent to client, bits are 1, 2, 4, leaving mask 0 is defaulted to mask 7 (send all), Slots1-3 are only used if no Param1 is set
     *  @param creature_equip_template.CreatureID
     *  @param Slotmask
     *  @param Slot1 (item_template.entry)
     *  @param Slot2 (item_template.entry)
     *  @param Slot3 (item_template.entry)
     */
    setEquip(creature_equip_templateCreatureID: number, Slotmask: number, Slot1: number, Slot2: number, Slot3: number): SmartScript;
    /**
     *  Closes gossip window.
     */
    setCloseGossip(): SmartScript;
    /**
     *
     *  @param id(>1)
     */
    setTriggerTimedEvent(id: number): SmartScript;
    /**
     *
     *  @param id(>1)
     */
    setRemoveTimedEvent(id: number): SmartScript;
    /**
     *  Adds aura to player(s). Use target_type 17 to make AoE aura.
     *  @param SpellId
     */
    setAddAura(SpellId: number): SmartScript;
    /**
     *  WARNING: CAN CRASH CORE, do not use if you dont know what you are doing
     */
    setOverrideScriptBaseObject(): SmartScript;
    /**
     *
     */
    setResetScriptBaseObject(): SmartScript;
    /**
     *
     */
    setCallScriptReset(): SmartScript;
    /**
     *  Sets movement to follow at a specific range to the target.
     *  @param attackDistance
     *  @param attackAngle
     */
    setSetRangedMovement(attackDistance: number, attackAngle: number): SmartScript;
    /**
     *
     *  @param EntryOrGuid * 100 (smart_scripts.entryorguid with 00 added after the entry, or 01, 02, 03 etc. for multiple action lists)
     *  @param timer update type(0 OOC, 1 IC, 2 ALWAYS)
     *  @param Can override in going action list 0/1 This will to stop an action list and start an other
     */
    setCallTimedActionlist(EntryOrGuid: number, timer: number, Can: number): SmartScript;
    /**
     *
     *  @param Creature_template.npcflag
     */
    setSetNpcFlag(Creature_templatenpcflag: number): SmartScript;
    /**
     *
     *  @param Creature_template.npcflag
     */
    setAddNpcFlag(Creature_templatenpcflag: number): SmartScript;
    /**
     *
     *  @param Creature_template.npcflag
     */
    setRemoveNpcFlag(Creature_templatenpcflag: number): SmartScript;
    /**
     *  Makes a player say text. SMART_EVENT_TEXT_OVER is not triggered and whispers can not be used.
     *  @param creature_text.groupid
     */
    setSimpleTalk(creature_textgroupid: number): SmartScript;
    /**
     *  The target will cast the spell on it self
     *  @param SpellID
     *  @param castFlags
     *  @param triggeredFlags
     */
    setSelfCast(SpellID: number, castFlags: number, triggeredFlags: number): SmartScript;
    /**
     *  This action is used to make selected caster (in CasterTargetType) to cast spell. Actual target is entered in target_type as normally.
     *  @param SpellID
     *  @param castFlags
     *  @param CasterTargetType (caster is selected here, use it as target_type)
     *  @param CasterTarget (target_param1)
     *  @param CasterTarget (target_param2)
     *  @param CasterTarget (target_param3)
     */
    setCrossCast(SpellID: number, castFlags: number, CasterTargetType: number, CasterTarget: number, CasterTarget2: number, CasterTarget3: number): SmartScript;
    /**
     *  Will select one entry from the ones provided. 0 is ignored.
     *  @param EntryOrGuid 1 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 2 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 3 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 4 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 5 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 6 (smart_scripts.entryorguid * 100 + n)
     */
    setCallRandomTimedActionlist(EntryOrGuid: number, EntryOrGuid2: number, EntryOrGuid3: number, EntryOrGuid4: number, EntryOrGuid5: number, EntryOrGuid6: number): SmartScript;
    /**
     *  0 is ignored.
     *  @param EntryOrGuid 1 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 2 (smart_scripts.entryorguid * 100 + n)
     */
    setCallRandomRangeTimedActionlist(EntryOrGuid: number, EntryOrGuid2: number): SmartScript;
    /**
     *  Creature moves to random position in given radius.
     *  @param Radius
     */
    setRandomMove(Radius: number): SmartScript;
    /**
     *
     *  @param Value
     *  @param Type
     */
    setSetUnitFieldBytes1(Value: number, Type: number): SmartScript;
    /**
     *
     *  @param Value
     *  @param Type
     */
    setRemoveUnitFieldBytes1(Value: number, Type: number): SmartScript;
    /**
     *  This action allows you to interrupt the current spell being cast. If you do not set the spellId, the core will find the current spell depending on the withDelay and the withInstant values.
     *  @param With delay (0/1)
     *  @param SpellId
     *  @param Instant (0/1)
     */
    setInterruptSpell(With: number, SpellId: number, Instant: number): SmartScript;
    /**
     *
     *  @param animprogress (0-255)
     */
    setSendGoCustomAnim(animprogress: number): SmartScript;
    /**
     *
     *  @param creature.dynamicflags
     */
    setSetDynamicFlag(creaturedynamicflags: number): SmartScript;
    /**
     *
     *  @param creature.dynamicflags
     */
    setAddDynamicFlag(creaturedynamicflags: number): SmartScript;
    /**
     *
     *  @param creature.dynamicflags
     */
    setRemoveDynamicFlag(creaturedynamicflags: number): SmartScript;
    /**
     *
     *  @param Speed XY
     *  @param Speed Z
     */
    setJumpToPos(Speed: number, Speed2: number): SmartScript;
    /**
     *  Can be used together with 'SMART_EVENT_GOSSIP_HELLO' to set custom gossip.
     *  @param gossip_menu.entry
     *  @param gossip_menu.text_id (same value as npc_text.ID)
     */
    setSendGossipMenu(gossip_menuentry: number, gossip_menutext_id: number): SmartScript;
    /**
     *
     *  @param LootState (0 - Not ready, 1 - Ready, 2 - Activated, 3 - Just deactivated)
     */
    setGoSetLootState(LootState: number): SmartScript;
    /**
     *  Send targets previously stored with SMART_ACTION_STORE_TARGET, to another npc/go, the other npc/go can then access them as if it was its own stored list
     *  @param Id
     */
    setSendTargetToTarget(Id: number): SmartScript;
    /**
     *  Use with SMART_TARGET_SELF or SMART_TARGET_POSITION
     */
    setSetHomePos(): SmartScript;
    /**
     *  Sets the current creatures health regen on or off.
     *  @param 0/1
     */
    setSetHealthRegen(zo: number): SmartScript;
    /**
     *  Enables or disables creature movement
     *  @param 0/1
     */
    setSetRoot(zo: number): SmartScript;
    /**
     *  oldFlag = newFlag
     *  @param gameobject_template_addon.flags
     */
    setSetGoFlag(gameobject_template_addonflags: number): SmartScript;
    /**
     *  oldFlag |= newFlag
     *  @param gameobject_template_addon.flags
     */
    setAddGoFlag(gameobject_template_addonflags: number): SmartScript;
    /**
     *  oldFlag &= ~newFlag
     *  @param gameobject_template_addon.flags
     */
    setRemoveGoFlag(gameobject_template_addonflags: number): SmartScript;
    /**
     *  Use creature_summon_groups table. SAI target has no effect, use 0
     *  @param creature_summon_groups.groupId
     *  @param Attack invoker (0/1)
     */
    setSummonCreatureGroup(creature_summon_groupsgroupId: number, Attack: number): SmartScript;
    /**
     *
     *  @param Power type
     *  @param New power
     */
    setSetPower(Power: number, New: number): SmartScript;
    /**
     *
     *  @param Power type
     *  @param Power to add
     */
    setAddPower(Power: number, Power2: number): SmartScript;
    /**
     *
     *  @param Power type
     *  @param Power to remove
     */
    setRemovePower(Power: number, Power2: number): SmartScript;
    /**
     *
     *  @param GameEventId
     */
    setGameEventStop(GameEventId: number): SmartScript;
    /**
     *
     *  @param GameEventId
     */
    setGameEventStart(GameEventId: number): SmartScript;
    /**
     *  Make target follow closest waypoint to its location
     *  @param wp1
     *  @param wp2
     *  @param wp3
     *  @param wp4
     *  @param wp5
     *  @param wp6
     */
    setStartClosestWaypoint(wp1: number, wp2: number, wp3: number, wp4: number, wp5: number, wp6: number): SmartScript;
    /**
     *  Use target_x, target_y, target_z With target_type=1
     */
    setMoveOffset(): SmartScript;
    /**
     *
     *  @param soundId1
     *  @param soundId2
     *  @param soundId3
     *  @param soundId4
     *  @param onlySelf (0/1)
     *  @param Distant Sound (0/1)
     */
    setRandomSound(soundId1: number, soundId2: number, soundId3: number, soundId4: number, onlySelf: number, Distant: number): SmartScript;
    /**
     *
     *  @param timer
     */
    setSetCorpseDelay(timer: number): SmartScript;
    /**
     *
     *  @param disable evade (1) / re-enable (0)
     */
    setDisableEvade(disable: number): SmartScript;
    /**
     *
     *  @param state
     */
    setGoSetGoState(state: number): SmartScript;
    /**
     *
     *  @param 0/1
     */
    setSetCanFly(zo: number): SmartScript;
    /**
     *
     *  @param Type
     */
    setRemoveAurasByType(Type: number): SmartScript;
    /**
     *
     *  @param SightDistance
     */
    setSetSightDist(SightDistance: number): SmartScript;
    /**
     *
     *  @param FleeTime
     */
    setFlee(FleeTime: number): SmartScript;
    /**
     *
     *  @param #NAME?
     *  @param -threat
     */
    setAddThreat(NAME: number, threat: number): SmartScript;
    /**
     *
     *  @param Id
     */
    setLoadEquipment(Id: number): SmartScript;
    /**
     *
     *  @param id min range
     *  @param id max range
     */
    setTriggerRandomTimedEvent(id: number, id2: number): SmartScript;
    /**
     *
     */
    setRemoveAllGameobjects(): SmartScript;
    /**
     *  default --> waypoint, random etc active --> point movement controlled --> mindcontrol etc
     *  @param MovementSlot (default = 0, active = 1, controlled = 2)
     *  @param PauseTime (ms)
     *  @param Forced (depends on the movement generator. some will stop automatically, other will let the current spline finish first)
     */
    setPauseMovement(MovementSlot: number, PauseTime: number, Forced: boolean): SmartScript;
    /**
     *  // don't use on 3.3.5a
     *  @param AnimKit ID
     *  @param type: 1- PlayOneShotAnimKitId 2- SetAIAnimKitId 3- SetMeleeAnimKitId 4- SetMovementAnimKitId
     */
    setPlayAnimkit(AnimKit: number, type: number): SmartScript;
    /**
     *  // don't use on 3.3.5a
     *  @param SceneId
     */
    setScenePlay(SceneId: number): SmartScript;
    /**
     *  // don't use on 3.3.5a
     *  @param SceneId
     */
    setSceneCancel(SceneId: number): SmartScript;
    /**
     *
     *  @param groupId
     *  @param minDelay
     *  @param maxDelay
     *  @param spawnflags
     */
    setSpawnSpawngroup(groupId: number, minDelay: number, maxDelay: number, spawnflags: number): SmartScript;
    /**
     *
     *  @param groupId
     *  @param minDelay
     *  @param maxDelay
     *  @param spawnflags
     */
    setDespawnSpawngroup(groupId: number, minDelay: number, maxDelay: number, spawnflags: number): SmartScript;
    /**
     *  Use to respawn npcs and gobs, the target in this case is always=1 and only a single unit could be a target via the spawnId (action_param1, action_param2)
     *  @param spawnType (0 npc/ 1 gob)
     *  @param spawnId (DB Guid)
     */
    setRespawnBySpawnid(spawnType: number, spawnId: number): SmartScript;
    /**
     *  if avaliable, last used invoker will cast spellId with castFlags on targets
     *  @param SpellID
     *  @param castFlags
     *  @param triggeredFlags
     */
    setInvokerCast(SpellID: number, castFlags: number, triggeredFlags: number): SmartScript;
    /**
     *
     *  @param entry
     *  @param cinematic
     */
    setPlayCinematic(entry: number, cinematic: number): SmartScript;
    /**
     *
     *  @param movementType
     *  @param speedInteger
     *  @param speedFraction
     */
    setSetMovementSpeed(movementType: number, speedInteger: number, speedFraction: number): SmartScript;
    /**
     *  (RESERVED, PENDING CHERRYPICK)
     *  @param spellVisualKitId
     */
    setPlaySpellVisualKit(spellVisualKitId: number): SmartScript;
    /**
     *
     *  @param zoneId
     *  @param areaLightId
     *  @param lightId (overrideLightId)
     *  @param fadeInTime (transition Milliseconds)
     */
    setOverrideLight(zoneId: number, areaLightId: number, lightId: number, fadeInTime: number): SmartScript;
    /**
     *
     *  @param zoneId
     *  @param weatherId
     *  @param weatherGrade (intensity)
     */
    setOverrideWeather(zoneId: number, weatherId: number, weatherGrade: number): SmartScript;
    /**
     * @param worldStateId
     * @param value
     */
    setSendWorldState(worldStateId: number, value: number): SmartScript;
    setSendEventState(gameEvent: number): SmartScript;
    setCustom(entry: number, param1?: number, param2?: number, param3?: number, param4?: number, param5?: number, param6?: number): SmartScript;
}
