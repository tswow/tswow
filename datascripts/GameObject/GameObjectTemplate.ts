/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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
import { SQL } from "wotlkdata";
import { EnumCellTransform } from "wotlkdata/cell/cells/EnumCell";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";
import { gameobject_template_addonRow } from "wotlkdata/sql/types/gameobject_template_addon";
import { AreaRegistry } from "../Area/Area";
import { BroadcastTextRegistry } from "../BroadcastText/BroadcastText";
import { GossipRegistry } from "../Gossip/Gossips";
import { LockRegistry } from "../Locks/Locks";
import { LootSetPointer } from "../Loot/Loot";
import { MapRegistry } from "../Map/Maps";
import { TransformedEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PageTextRegistry } from "../PageText/PageText";
import { QuestRegistry } from "../Quest/Quests";
import { RefUnknown } from "../Refs/Ref";
import { SpellRegistry } from "../Spell/Spells";
import { TaxiPathRegistry } from "../Taxi/Taxi";
import { WorldStateRegistry } from "../WorldState/WorldState";
import { ElevatorKeyframes } from "./ElevatorKeyframes";
import { GameObjectFlags } from "./GameObjectFlags";
import { GameObjectID } from "./GameObjectID";
import { GameObjectInstance } from "./GameObjectInstance";
import { GameObjectName } from "./GameObjectName";
import { GORegistry } from "./GameObjectRegistries";
import { GameObjectDisplayRegistry } from "./GameObjects";
import { GAMEOBJECT_TYPE_AREADAMAGE, GAMEOBJECT_TYPE_AURA_GENERATOR, GAMEOBJECT_TYPE_BARBER_CHAIR, GAMEOBJECT_TYPE_BINDER, GAMEOBJECT_TYPE_BUTTON, GAMEOBJECT_TYPE_CAMERA, GAMEOBJECT_TYPE_CAPTURE_POINT, GAMEOBJECT_TYPE_CHAIR, GAMEOBJECT_TYPE_CHEST, GAMEOBJECT_TYPE_DESTRUCTIBLE_BUILDING, GAMEOBJECT_TYPE_DOOR, GAMEOBJECT_TYPE_DO_NOT_USE, GAMEOBJECT_TYPE_DO_NOT_USE_2, GAMEOBJECT_TYPE_DUEL_ARBITER, GAMEOBJECT_TYPE_DUNGEON_DIFFICULTY, GAMEOBJECT_TYPE_FISHINGHOLE, GAMEOBJECT_TYPE_FISHINGNODE, GAMEOBJECT_TYPE_FLAGDROP, GAMEOBJECT_TYPE_FLAGSTAND, GAMEOBJECT_TYPE_GENERIC, GAMEOBJECT_TYPE_GOOBER, GAMEOBJECT_TYPE_GUARDPOST, GAMEOBJECT_TYPE_GUILD_BANK, GAMEOBJECT_TYPE_MAILBOX, GAMEOBJECT_TYPE_MAP_OBJECT, GAMEOBJECT_TYPE_MAP_OBJ_TRANSPORT, GAMEOBJECT_TYPE_MEETINGSTONE, GAMEOBJECT_TYPE_MINI_GAME, GAMEOBJECT_TYPE_QUESTGIVER, GAMEOBJECT_TYPE_RITUAL, GAMEOBJECT_TYPE_SPELLCASTER, GAMEOBJECT_TYPE_SPELL_FOCUS, GAMEOBJECT_TYPE_TEXT, GAMEOBJECT_TYPE_TRANSPORT, GAMEOBJECT_TYPE_TRAP, GAMEOBJECT_TYPE_TRAPDOOR } from "./GameObjectTypes";

export class GameObjectTemplate extends TransformedEntity<gameobject_templateRow, GameObjectPlain> {
    protected transformer() { return this.Type; }
    protected default(): GameObjectPlain {
        return new GameObjectPlain(this.row);
    }

    private _addon_row: gameobject_template_addonRow|undefined;

    protected isCreature(): boolean {
        return false;
    }

    protected isGameObject(): boolean {
        return true;
    }

    get addon_row() {
        if(this._addon_row) {
            return this._addon_row;
        }

        let row = SQL.gameobject_template_addon.find({entry: this.ID});
        if(row===undefined) {
            row = SQL.gameobject_template_addon.add(this.ID)
                .artkit0.set(0)
                .artkit1.set(0)
                .artkit2.set(0)
                .artkit3.set(0)
                .faction.set(0)
                .flags.set(0)
                .maxgold.set(0)
                .mingold.set(0)
        }
        // ID is readonly, so it should never change
        this._addon_row = row;
        return row;
    }

    get Type() { return new GameObjectType(this, this.row.type); }
    get ID() { return this.row.entry.get(); }

    get Display() {
        return GameObjectDisplayRegistry.ref(this, this.row.displayId);
    }

    get Name() { return new GameObjectName(this); }
    get Icon() { return this.wrap(this.row.IconName); }
    get CastBarCaption() { return this.wrap(this.row.castBarCaption); }
    get Size() { return this.wrap(this.row.size); }
    get Flags() { return new GameObjectFlags(this, this.addon_row.flags); }

    spawn(mod: string, id: string, position: Position) {
        return new GameObjectInstance(
            SQL.gameobject.add(Ids.gameobject.id(mod,id))
                .spawnMask.set(1)
                .spawntimesecs.set(1)
                .state.set(1)
                .ScriptName.set('')
                .rotation0.set(0)
                .rotation1.set(0)
                .rotation2.set(0)
                .rotation3.set(0)
                .zoneId.set(0)
                .areaId.set(0)
                .id.set(this.ID)
                .VerifiedBuild.set(17688)
        ).Position.set(position)
    }
}

export class GameObjectPlain extends GameObjectTemplate {
    get Data0() { return this.wrap(this.row.Data0); }
    get Data1() { return this.wrap(this.row.Data1); }
    get Data2() { return this.wrap(this.row.Data2); }
    get Data3() { return this.wrap(this.row.Data3); }
    get Data4() { return this.wrap(this.row.Data4); }
    get Data5() { return this.wrap(this.row.Data5); }
    get Data6() { return this.wrap(this.row.Data6); }
    get Data7() { return this.wrap(this.row.Data7); }
    get Data8() { return this.wrap(this.row.Data8); }
    get Data9() { return this.wrap(this.row.Data9); }
    get Data10() { return this.wrap(this.row.Data10); }
    get Data11() { return this.wrap(this.row.Data11); }
    get Data12() { return this.wrap(this.row.Data12); }
    get Data13() { return this.wrap(this.row.Data13); }
    get Data14() { return this.wrap(this.row.Data14); }
    get Data15() { return this.wrap(this.row.Data15); }
    get Data16() { return this.wrap(this.row.Data16); }
    get Data17() { return this.wrap(this.row.Data17); }
    get Data18() { return this.wrap(this.row.Data18); }
    get Data19() { return this.wrap(this.row.Data19); }
    get Data20() { return this.wrap(this.row.Data20); }
    get Data21() { return this.wrap(this.row.Data21); }
    get Data22() { return this.wrap(this.row.Data22); }
    get Data23() { return this.wrap(this.row.Data23); }
}

export class GameObjectAreaDamage extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.row.Data0); }
    get Radius() { return this.wrap(this.row.Data1); }
    get DamageMin() { return this.wrap(this.row.Data2); }
    get DamageMax() { return this.wrap(this.row.Data3); }
    get DamageSchool() { return this.wrap(this.row.Data4); }
    get AutoCloseTime() { return this.wrap(this.row.Data5); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data6); }
    get Closetext() { return BroadcastTextRegistry.ref(this, this.row.Data7); }
}

export class GameObjectAuraGenerator extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get StartOpen() { return this.wrap(this.row.Data0); }
    get Radius() { return this.wrap(this.row.Data1); }
    get AuraID1() { return this.wrap(this.row.Data2); }
    get Condition1() { return new RefUnknown(this, this.row.Data3); }
    get AuraID2() { return this.wrap(this.row.Data4); }
    get Condition2() { return new RefUnknown(this, this.row.Data5); }
    get ServerOnly() { return this.wrap(this.row.Data6); }
}

export class GameObjectBarberChair extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get ChairHeight() { return this.wrap(this.row.Data0); }
    get HeightOffset() { return this.wrap(this.row.Data1); }
}

GameObjectID(1)
export class GameObjectButton extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    /**
     * Whether this button starts pressed
     */
    get StartsActive() { return this.wrap(this.row.Data0); }

    /**
     * The lock used to press this button
     */
    get Lock() { return LockRegistry.ref(this, this.row.Data1); }

    get AutoClose() { return this.wrap(this.row.Data2); }


    /**
     * A linked spawned gameobject of type 6
     */
    get LinkedTrap() {
        return GORegistry.Traps.ref(this, this.row.Data3);
    }

    get NoDamageImmune() { return this.wrap(this.row.Data4); }

    get IsLarge() { return this.wrap(this.row.Data5); }

    /**
     * Text displayed when the button is pressed
     */
    get ActivateText() { return BroadcastTextRegistry.ref(this, this.row.Data6) }


    /**
     * Text displayed when the button is unpressed
     */
    get DeactivateText() { return BroadcastTextRegistry.ref(this, this.row.Data7) }

    /**
     * TODO: ??
     */
    get LineOfSightOK() { return BroadcastTextRegistry.ref(this, this.row.Data8) }

    get Condition() { return new RefUnknown(this, this.row.Data9); }
}

export class GameObjectCamera extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.row.Data0); }
    get Cinematic() { return this.wrap(this.row.Data1); }
    get Event() { return new RefUnknown(this, this.row.Data2); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data3); }
    get Condition() { return new RefUnknown(this, this.row.Data4); }
}

export class GameObjectCapturePoint extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Radius() { return this.wrap(this.row.Data0); }
    get Spell() { return this.wrap(this.row.Data1); }
    get WorldState1() { return WorldStateRegistry.refCreate(this, this.row.Data2); }
    get WorldState2() { return WorldStateRegistry.refCreate(this, this.row.Data3); }
    get WinEvent1() { return this.wrap(this.row.Data4); }
    get WinEvent2() { return this.wrap(this.row.Data5); }
    get ContestedEvent1() { return this.wrap(this.row.Data6); }
    get ContestedEvent2() { return this.wrap(this.row.Data7); }
    get ProgressEvent1() { return this.wrap(this.row.Data8); }
    get ProgressEvent2() { return this.wrap(this.row.Data9); }
    get NeutralEvent1() { return this.wrap(this.row.Data10); }
    get NeutralEvent2() { return this.wrap(this.row.Data11); }
    get NeutralPercent() { return this.wrap(this.row.Data12); }
    get WorldState3() { return WorldStateRegistry.refCreate(this, this.row.Data13); }
    get MinSuperiority() { return this.wrap(this.row.Data14); }
    get MaxSuperiority() { return this.wrap(this.row.Data15); }
    get MinTime() { return this.wrap(this.row.Data16); }
    get MaxTime() { return this.wrap(this.row.Data17); }
    get Large() { return this.wrap(this.row.Data18); }
    get Highlight() { return this.wrap(this.row.Data19); }
    get StartingValue() { return this.wrap(this.row.Data20); }
    get Unidirectional() { return this.wrap(this.row.Data21); }
}

export class GameObjectChair extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get Slots() { return this.wrap(this.row.Data0); }
    get Height() { return this.wrap(this.row.Data1); }
    get OnlyCreatorUse() { return this.wrap(this.row.Data2); }
    get TriggeredEvent() { return new RefUnknown(this, this.row.Data3); }
    get Condition() { return new RefUnknown(this, this.row.Data4); }
}

export class GameObjectChest extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get Lock() {
        return LockRegistry.ref(this,this.row.Data0);
    }

    get Loot() {
        return new LootSetPointer(
              this
            , this.row.Data1
            , SQL.gameobject_loot_template
            , Ids.gameobject_loot_template
            );
    }

    /**
     * Restock time in seconds
     */
    get RestockTime() { return this.wrap(this.row.Data2); }
    get IsConsumable() { return this.wrap(this.row.Data3); }
    get MinRestock() { return this.wrap(this.row.Data4); }
    get MaxRestock() { return this.wrap(this.row.Data5); }
    /**
     * EventID from event_scripts
     */
    get LootedEvent() { return new RefUnknown(this, this.row.Data6); }
    get LinkedTrap() { return this.wrap(this.row.Data7); }
    get Quest() { return QuestRegistry.ref(this, this.row.Data8); }
    get Level() { return this.wrap(this.row.Data9); }
    get LosOK() { return this.wrap(this.row.Data10); }
    get LeaveLoot() { return this.wrap(this.row.Data11); }
    get NotInCombat() { return this.wrap(this.row.Data12); }
    get LogLoot() { return this.wrap(this.row.Data13); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data14); }
    get UseGroupLoot() { return this.wrap(this.row.Data15); }
    get Tooltip() { return this.wrap(this.row.Data16); }
    get Condition() { return new RefUnknown(this, this.row.Data17); }
}

export class GameObjectDestructibleBuilding extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get InteractNumHits() { return this.wrap(this.row.Data0); }
    get CreditProxyCreature() { return this.wrap(this.row.Data1); }
    get Empty1() { return this.wrap(this.row.Data2); }
    get IntactEvent() { return new RefUnknown(this, this.row.Data3); }
    get Empty2() { return this.wrap(this.row.Data4); }
    get DamageNumHits() { return this.wrap(this.row.Data5); }
    get Empty3() { return this.wrap(this.row.Data6); }
    get Empty4() { return this.wrap(this.row.Data7); }
    get Empty5() { return this.wrap(this.row.Data8); }
    get DamagedEvent() { return new RefUnknown(this, this.row.Data9); }
    get Empty6() { return this.wrap(this.row.Data10); }
    get Empty7() { return this.wrap(this.row.Data11); }
    get Empty8() { return this.wrap(this.row.Data12); }
    get Empty9() { return this.wrap(this.row.Data13); }
    get DestroyedEvent() { return new RefUnknown(this, this.row.Data14); }
    get Empty10() { return this.wrap(this.row.Data15); }
    get RebuildingTimeSecs() { return this.wrap(this.row.Data16); }
    get Empty11() { return this.wrap(this.row.Data17); }
    get DestructibleData() { return this.wrap(this.row.Data18); }
    get RebuildingEvent() { return new RefUnknown(this, this.row.Data19); }
    get Empty12() { return this.wrap(this.row.Data20); }
    get Empty13() { return this.wrap(this.row.Data21); }
    get DamageEvent() { return new RefUnknown(this, this.row.Data22); }
    get Empty14() { return this.wrap(this.row.Data23); }
}

export class GameObjectDoor extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    /**
     * Whether or not the door starts open (0=closed, 1=open)
     */
    get StartOpen() { return this.wrap(this.row.Data0); }


    /**
     * Lock ID to DBC.Lock that opens this door
     */
    get Lock() { return LockRegistry.ref(this, this.row.Data1); }

    /**
     * After how many milliseconds the door autocloses
     */
    get AutoClose() { return this.wrap(this.row.Data2); }

    /**
     *
     */
    get NoDamageImmune() { return this.wrap(this.row.Data3); }

    /**
     * Text displayed when the door is opened
     */
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data4); }

    /**
     * Text displayed when the door is closed
     */
    get CloseText() { return BroadcastTextRegistry.ref(this, this.row.Data5); }

    /**
     * Whether pathfinding should ignore this door
     */
    get IgnoredByPathfinding() { return BroadcastTextRegistry.ref(this, this.row.Data6); }

    get Condition1() { return new RefUnknown(this, this.row.Data7); }
}

export class GameObjectDungeonDifficulty extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Map() { return MapRegistry.ref(this, this.row.Data0); }
    get Difficulty() { return this.wrap(this.row.Data1); }
}

export class GameObjectFishingHole extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    /**
     * How close bobber must be
     */
    get Radius() { return this.wrap(this.row.Data0); }
    get Loot() {
        return new LootSetPointer(
              this
            , this.row.Data1
            , SQL.fishing_loot_template
            , Ids.fishing_loot_template
        );
    }
    get MinSuccessOpens() { return this.wrap(this.row.Data2); }
    get MaxSuccessOpens() { return this.wrap(this.row.Data3); }
    /**
     * Possibly 1628 for all fishing holes.
     */
    get Lock() { return LockRegistry.ref(this, this.row.Data4); }
}

export class GameObjectFlagDrop extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.wrap(this.row.Data0)); }
    get Event() { return new RefUnknown(this, this.row.Data1); }
    get PickupSpell() { return this.wrap(this.row.Data2); }
    get NoDamageImmune() { return this.wrap(this.row.Data3); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data4); }
}

export class GameObjectFlagStand extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.wrap(this.row.Data0)); }
    get PickupSpell() { return this.wrap(this.row.Data1); }
    get Radius() { return this.wrap(this.row.Data2); }
    get ReturnAura() { return this.wrap(this.row.Data3); }
    get ReturnSpell() { return this.wrap(this.row.Data4); }
    get NoDamageImmune() { return this.wrap(this.row.Data5); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data6); }
    get LineOfSightOK() { return this.wrap(this.row.Data7); }
    get Condition() { return new RefUnknown(this, this.row.Data8); }
}

export class GameObjectGeneric extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Tooltip() { return this.wrap(this.row.Data0); }
    get Highlight() { return this.wrap(this.row.Data1); }
    get ServerOnly() { return this.wrap(this.row.Data2); }
    get Large() { return this.wrap(this.row.Data3); }
    get FloatOnWater() { return this.wrap(this.row.Data4); }
    get Quest() { return QuestRegistry.ref(this, this.wrap(this.row.Data5)); }
    get Condition() { return new RefUnknown(this, this.row.Data6); }
}

export class GameObjectGoober extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.wrap(this.row.Data0)); }
    get Quest() { return QuestRegistry.ref(this, this.row.Data1); }
    get Event() { return new RefUnknown(this, this.row.Data2); }
    get AutoCloseTime() { return this.wrap(this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get Consumable() { return this.wrap(this.row.Data5); }
    get Cooldown() { return this.wrap(this.row.Data6); }
    get Page() { return PageTextRegistry.ref(this, this.row.Data7); }
    get Language() { return this.wrap(this.row.Data8); }
    get PageMaterial() { return this.wrap(this.row.Data9); }
    get Spell() { return SpellRegistry.ref(this, this.row.Data10); }
    get NoDamageImmune() { return this.wrap(this.row.Data11); }
    get LinkedTrap() { return GORegistry.Traps.ref(this, this.row.Data12); }
    get Large() { return this.wrap(this.row.Data13); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data14); }
    get CloseText() { return BroadcastTextRegistry.ref(this, this.row.Data15); }
    get LineOfSightOK() { return this.wrap(this.row.Data16); }
    get AllowMounted() { return this.wrap(this.row.Data17); }
    get FloatingTooltip() { return this.wrap(this.row.Data18); }
    get Gossip() { return GossipRegistry.ref(this, this.row.Data19); }
    get WorldStateSetsState() { return this.wrap(this.row.Data20); }
    get FloatOnWater() { return this.wrap(this.row.Data21); }
    get Condition() { return new RefUnknown(this, this.row.Data22); }
}

export class GameObjectGuardPost extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Creature() { return new RefUnknown(this, this.row.Data0); }
    get Charges() { return this.wrap(this.row.Data1); }
}

export class GameObjectGuildBank extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Condition() { return new RefUnknown(this, this.row.Data0); }
}

export class GameObjectMailbox extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Condition() { return new RefUnknown(this, this.row.Data0); }
}

export class GameObjectMeetingStone extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get MinLevel() { return this.wrap(this.row.Data0); }
    get MaxLevel() { return this.wrap(this.row.Data1); }
    get Area() { return AreaRegistry.ref(this, this.row.Data2); }
}

export class GameObjectMinigame extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get GameType() { return this.wrap(this.row.Data0); }
}

export class GameObjectShip extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get TaxiPath() { return TaxiPathRegistry.ref(this, this.row.Data0); }
    get MoveSpeed() { return this.wrap(this.row.Data1); }
    get AccelRate() { return this.wrap(this.row.Data2); }
    get StartEvent() { return new RefUnknown(this, this.row.Data3); }
    get StopEvent() { return new RefUnknown(this, this.row.Data4); }
    get TransportPhysics() { return this.wrap(this.row.Data5); }
    get SpawnGroup() { return this.wrap(this.row.Data6); }
    get WorldState1() { return this.wrap(this.row.Data7); }
    get CanBeStopped() { return this.wrap(this.row.Data8); }
}

export class GameObjectQuestGiver extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this ,this.row.Data0); }
    get QuestList() { return this.wrap(this.row.Data1); }
    get PageMaterial() { return this.wrap(this.row.Data2); }
    get Gossip() { return GossipRegistry.ref(this, this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get NoDamageImmune() { return this.wrap(this.row.Data5); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data6) }
    get IsLOSOk() { return BroadcastTextRegistry.ref(this, this.row.Data7) }
    get AllowMounted() { return BroadcastTextRegistry.ref(this, this.row.Data8) }
    get IsLarge() { return BroadcastTextRegistry.ref(this, this.row.Data9) }
    get Condition() { return new RefUnknown(this, this.row.Data10) }
}

export class GameObjectSpellCaster extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Spell() { return SpellRegistry.ref(this, this.row.Data0); }
    get Charges() { return this.wrap(this.row.Data1); }
    get PartyOnly() { return this.wrap(this.row.Data2); }
    get AllowMounted() { return this.wrap(this.row.Data3); }
    get Large() { return this.wrap(this.row.Data4); }
    get Condition() { return new RefUnknown(this, this.row.Data5); }
}

export class GameObjectSpellFocus extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Focus() { return new RefUnknown(this, this.row.Data0); }
    get Distance() { return this.wrap(this.row.Data1); }
    get LinkedTrap() { return GORegistry.Traps.ref(this ,this.row.Data2); }
    get ServerOnly() { return this.wrap(this.row.Data3); }
    get Quest() { return QuestRegistry.ref(this, this.row.Data4); }
    get Large() { return this.wrap(this.row.Data5); }
    get FloatingTooltip() { return this.wrap(this.row.Data6); }
    get FloatOnWater() { return this.wrap(this.row.Data7); }
    get Condition() { return new RefUnknown(this, this.row.Data8); }
}

export class GameObjectSummoningRitual extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get RequiredParticipants() { return this.wrap(this.row.Data0); }
    get Spell() { return SpellRegistry.ref(this, this.row.Data1); }
    get AnimSpell() { return this.wrap(this.row.Data2); }
    get RitualPersistent() { return this.wrap(this.row.Data3); }
    get CasterTargetSpell() { return this.wrap(this.row.Data4); }
    get CasterTargetSpellTargets() { return this.wrap(this.row.Data5); }
    get CasterGrouped() { return this.wrap(this.row.Data6); }
    get RitualNoTargetCheck() { return this.wrap(this.row.Data7); }
    get Condition() { return new RefUnknown(this, this.row.Data8); }
}

export class GameObjectText extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Page() { return PageTextRegistry.ref(this, this.row.Data0); }
    get Language() { return this.wrap(this.row.Data1); }
    get PageMaterial() { return this.wrap(this.row.Data2); }
    get AllowMounted() { return this.wrap(this.row.Data3); }
    get Condition() { return new RefUnknown(this, this.row.Data4); }
}

export class GameObjectElevator extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Pause() { return this.wrap(this.row.Data0); }
    get StartOpen() { return this.wrap(this.row.Data1); }
    get AutoCloseTime() { return this.wrap(this.row.Data2); }
    get Pause1Event() { return new RefUnknown(this, this.row.Data3); }
    get Pause2Event() { return new RefUnknown(this, this.row.Data4); }
    get Map() { return this.wrap(this.row.Data5); }
    get Keyframes() { return new ElevatorKeyframes(this); }
}

export class GameObjectTrap extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Lock() { return LockRegistry.ref(this, this.row.Data0); }
    get Level() { return this.wrap(this.row.Data1); }
    get Diameter() { return this.wrap(this.row.Data2); }
    get Spell() { return SpellRegistry.ref(this, this.row.Data3); }
    /*
     * 0 trap with no despawn after cast.
     * 1 trap despawns after cast.
     * 2 bomb casts on spawn.
     */
    get TrapType() { return this.wrap(this.row.Data4); }
    get Cooldown() { return this.wrap(this.row.Data5); }
    get AutoCloseTime() { return this.wrap(this.row.Data6); }
    get StartDelay() { return this.wrap(this.row.Data7); }
    get ServerOnly() { return this.wrap(this.row.Data8); }
    get Stealthed() { return this.wrap(this.row.Data9); }
    get Large() { return this.wrap(this.row.Data10); }
    get Invisible() { return this.wrap(this.row.Data11); }
    get OpenText() { return BroadcastTextRegistry.ref(this, this.row.Data12); }
    get CloseText() { return BroadcastTextRegistry.ref(this, this.row.Data13); }
    get IgnoreTotems() { return this.wrap(this.row.Data14); }
    get Condition() { return new RefUnknown(this, this.row.Data15); }
}

export class GameObjectTrapdoor extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get WhenToPause() { return this.wrap(this.row.Data0); }
    get StartOpen() { return this.wrap(this.row.Data1); }
    get AutoClose() { return this.wrap(this.row.Data2); }
}

export class GameObjectType extends EnumCellTransform<GameObjectTemplate> {
    /** Enum Value = 0 */
    get Door()                 { return this.value(GAMEOBJECT_TYPE_DOOR, x=>new GameObjectDoor(x.row)) }
    /** Enum Value = 1 */
    get Button()               { return this.value(GAMEOBJECT_TYPE_BUTTON, x=>new GameObjectButton(x.row)) }
    /** Enum Value = 2 */
    get Questgiver()           { return this.value(GAMEOBJECT_TYPE_QUESTGIVER, x=>new GameObjectQuestGiver(x.row)) }
    /** Enum Value = 3 */
    get Chest()                { return this.value(GAMEOBJECT_TYPE_CHEST, x=>new GameObjectChest(x.row)) }
    /** Enum Value = 4 */
    get Binder()               { return this.plain_value(GAMEOBJECT_TYPE_BINDER) }
    /** Enum Value = 5 */
    get Generic()              { return this.plain_value(GAMEOBJECT_TYPE_GENERIC) }
    /** Enum Value = 6 */
    get Trap()                 { return this.value(GAMEOBJECT_TYPE_TRAP, x=>new GameObjectTrap(x.row)) }
    /** Enum Value = 7 */
    get Chair()                { return this.value(GAMEOBJECT_TYPE_CHAIR, x=>new GameObjectChair(x.row)) }
    /** Enum Value = 8 */
    get SpellFocus()           { return this.value(GAMEOBJECT_TYPE_SPELL_FOCUS, x=>new GameObjectSpellFocus(x.row)) }
    /** Enum Value = 9 */
    get Text()                 { return this.value(GAMEOBJECT_TYPE_TEXT, x=>new GameObjectText(x.row)) }
    /** Enum Value = 10 */
    get Goober()               { return this.value(GAMEOBJECT_TYPE_GOOBER, x=>new GameObjectGoober(x.row)) }
    /** Enum Value = 11 */
    get Elevator()            { return this.value(GAMEOBJECT_TYPE_TRANSPORT, x=>new GameObjectElevator(x.row)) }
    /** Enum Value = 12 */
    get AreaDamage()           { return this.value(GAMEOBJECT_TYPE_AREADAMAGE, x=>new GameObjectAreaDamage(x.row)) }
    /** Enum Value = 13 */
    get Camera()               { return this.value(GAMEOBJECT_TYPE_CAMERA, x=>new GameObjectCamera(x.row)) }
    /** Enum Value = 14 */
    get MapObject()            { return this.plain_value(GAMEOBJECT_TYPE_MAP_OBJECT) }
    /** Enum Value = 15 */
    get Ship()                 { return this.value(GAMEOBJECT_TYPE_MAP_OBJ_TRANSPORT, x=>new GameObjectShip(x.row)) }
    /** Enum Value = 16 */
    get DuelArbiter()          { return this.plain_value(GAMEOBJECT_TYPE_DUEL_ARBITER) }
    /** Enum Value = 17 */
    get Fishingnode()          { return this.plain_value(GAMEOBJECT_TYPE_FISHINGNODE) }
    /** Enum Value = 18 */
    get Ritual()               { return this.value(GAMEOBJECT_TYPE_RITUAL, x=>new GameObjectSummoningRitual(x.row)) }
    /** Enum Value = 19 */
    get Mailbox()              { return this.value(GAMEOBJECT_TYPE_MAILBOX, x=>new GameObjectMailbox(x.row)) }
    /** Enum Value = 20 */
    get Auctionhouse()         { return this.plain_value(GAMEOBJECT_TYPE_DO_NOT_USE) }
    /** Enum Value = 21 */
    get GuardPost()            { return this.value(GAMEOBJECT_TYPE_GUARDPOST, x=>new GameObjectGuardPost(x.row)) }
    /** Enum Value = 22 */
    get SpellCaster()          { return this.value(GAMEOBJECT_TYPE_SPELLCASTER, x=>new GameObjectSpellCaster(x.row)) }
    /** Enum Value = 23 */
    get MeetingStone()         { return this.value(GAMEOBJECT_TYPE_MEETINGSTONE, x=>new GameObjectMeetingStone(x.row)) }
    /** Enum Value = 24 */
    get FlagStand()            { return this.value(GAMEOBJECT_TYPE_FLAGSTAND, x=>new GameObjectFlagStand(x.row)) }
    /** Enum Value = 25 */
    get FishingHole()          { return this.value(GAMEOBJECT_TYPE_FISHINGHOLE, x=>new GameObjectFishingHole(x.row)) }
    /** Enum Value = 26 */
    get FlagDrop()             { return this.value(GAMEOBJECT_TYPE_FLAGDROP, x=>new GameObjectFlagDrop(x.row)) }
    /** Enum Value = 27 */
    get Minigame()             { return this.value(GAMEOBJECT_TYPE_MINI_GAME, x=>new GameObjectMinigame(x.row)) }
    /** Enum Value = 28 */
    get LotteryKiosk()         { return this.plain_value(GAMEOBJECT_TYPE_DO_NOT_USE_2) }
    /** Enum Value = 29 */
    get CapturePoint()         { return this.value(GAMEOBJECT_TYPE_CAPTURE_POINT, x=>new GameObjectCapturePoint(x.row)) }
    /** Enum Value = 30 */
    get AuraGenerator()        { return this.value(GAMEOBJECT_TYPE_AURA_GENERATOR, x=>new GameObjectAuraGenerator(x.row)) }
    /** Enum Value = 31 */
    get DungeonDifficulty()    { return this.value(GAMEOBJECT_TYPE_DUNGEON_DIFFICULTY, x=>new GameObjectDungeonDifficulty(x.row)) }
    /** Enum Value = 32 */
    get BarberChair()          { return this.value(GAMEOBJECT_TYPE_BARBER_CHAIR, x=>new GameObjectBarberChair(x.row)) }
    /** Enum Value = 33 */
    get DestructibleBuilding() { return this.value(GAMEOBJECT_TYPE_DESTRUCTIBLE_BUILDING, x=>new GameObjectDestructibleBuilding(x.row)) }
    /** Enum Value = 34 */
    get GuildBank()            { return this.value(GAMEOBJECT_TYPE_GUILD_BANK, x=>new GameObjectGuildBank(x.row)) }
    /** Enum Value = 35 */
    get Trapdoor()             { return this.value(GAMEOBJECT_TYPE_TRAPDOOR, x=>new GameObjectTrapdoor(x.row)) }
}