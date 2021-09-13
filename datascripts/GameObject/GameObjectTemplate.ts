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
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";
import { gameobject_template_addonRow } from "wotlkdata/sql/types/gameobject_template_addon";
import { getBroadcast } from "../BroadcastText/BroadcastText";
import { SimpleLockPointer } from "../Locks/SimpleLock";
import { LootSetPointer } from "../Loot/Loot";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { RefReadOnly, RefStatic } from "../Refs/Ref";
import { TaxiPathRef } from "../Taxi/Taxi";
import { ElevatorKeyframes } from "./ElevatorKeyframes";
import { GameObjectDisplayPointer } from "./GameObjectDisplay";
import { GameObjectFlags } from "./GameObjectFlags";
import { GameObjectID } from "./GameObjectID";
import { GameObjectInstance } from "./GameObjectInstance";
import { GameObjectName } from "./GameObjectName";
import { GameObjectTemplates } from "./GameObjects";

export class GameObjectTemplate extends MainEntity<gameobject_templateRow> {
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
        return new GameObjectDisplayPointer(this, this.row.displayId);
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

@GameObjectID(12)
export class GameObjectAreaDamage extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get Radius() { return this.wrap(this.row.Data1); }
    get DamageMin() { return this.wrap(this.row.Data2); }
    get DamageMax() { return this.wrap(this.row.Data3); }
    get DamageSchool() { return this.wrap(this.row.Data4); }
    get AutoCloseTime() { return this.wrap(this.row.Data5); }
    get OpenTextID() { return this.wrap(this.row.Data6); }
    get ClosetextID() { return this.wrap(this.row.Data7); }
}

@GameObjectID(30)
export class GameObjectAuraGenerator extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get StartOpen() { return this.wrap(this.row.Data0); }
    get Radius() { return this.wrap(this.row.Data1); }
    get AuraID1() { return this.wrap(this.row.Data2); }
    get ConditionID1() { return this.wrap(this.row.Data3); }
    get AuraID2() { return this.wrap(this.row.Data4); }
    get ConditionID2() { return this.wrap(this.row.Data5); }
    get ServerOnly() { return this.wrap(this.row.Data6); }
}

@GameObjectID(32)
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
    get LockID() { return this.wrap(this.row.Data1); }

    get AutoClose() { return this.wrap(this.row.Data2); }


    /**
     * A linked spawned gameobject of type 6
     */
    get LinkedTrap() { return this.wrap(this.row.Data3); }

    get NoDamageImmune() { return this.wrap(this.row.Data4); }

    get IsLarge() { return this.wrap(this.row.Data5); }

    /**
     * Text displayed when the button is pressed
     */
    get ActivateTextID() { return getBroadcast(this, this.row.Data6) }


    /**
     * Text displayed when the button is unpressed
     */
    get DeactivateTextID() { return getBroadcast(this, this.row.Data7) }

    /**
     * TODO: ??
     */
    get LineOfSightOK() { return getBroadcast(this, this.row.Data8) }

    get ConditionID() { return this.wrap(this.row.Data9); }
}

@GameObjectID(13)
export class GameObjectCamera extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get CinematicID() { return this.wrap(this.row.Data1); }
    get EventID() { return this.wrap(this.row.Data2); }
    get OpenTextID() { return this.wrap(this.row.Data3); }
    get ConditionID() { return this.wrap(this.row.Data4); }
}

@GameObjectID(29)
export class GameObjectCapturePoint extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Radius() { return this.wrap(this.row.Data0); }
    get Spell() { return this.wrap(this.row.Data1); }
    get WorldState1() { return this.wrap(this.row.Data2); }
    get WorldState2() { return this.wrap(this.row.Data3); }
    get WinEventID1() { return this.wrap(this.row.Data4); }
    get WinEventID2() { return this.wrap(this.row.Data5); }
    get ContestedEventID1() { return this.wrap(this.row.Data6); }
    get ContestedEventID2() { return this.wrap(this.row.Data7); }
    get ProgressEventID1() { return this.wrap(this.row.Data8); }
    get ProgressEventID2() { return this.wrap(this.row.Data9); }
    get NeutralEventID1() { return this.wrap(this.row.Data10); }
    get NeutralEventID2() { return this.wrap(this.row.Data11); }
    get NeutralPercent() { return this.wrap(this.row.Data12); }
    get WorldState3() { return this.wrap(this.row.Data13); }
    get MinSuperiority() { return this.wrap(this.row.Data14); }
    get MaxSuperiority() { return this.wrap(this.row.Data15); }
    get MinTime() { return this.wrap(this.row.Data16); }
    get MaxTime() { return this.wrap(this.row.Data17); }
    get Large() { return this.wrap(this.row.Data18); }
    get Highlight() { return this.wrap(this.row.Data19); }
    get StartingValue() { return this.wrap(this.row.Data20); }
    get Unidirectional() { return this.wrap(this.row.Data21); }
}

@GameObjectID(7)
export class GameObjectChair extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get Slots() { return this.wrap(this.row.Data0); }
    get Height() { return this.wrap(this.row.Data1); }
    get OnlyCreatorUse() { return this.wrap(this.row.Data2); }
    get TriggeredEvent() { return this.wrap(this.row.Data3); }
    get ConditionID() { return this.wrap(this.row.Data4); }
}

@GameObjectID(3)
export class GameObjectChest extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get Lock() {
        return new SimpleLockPointer(this,this.row.Data0);
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
    get LootedEvent() { return this.wrap(this.row.Data6); }
    get LinkedTrap() { return this.wrap(this.row.Data7); }
    get QuestID() { return this.wrap(this.row.Data8); }
    get Level() { return this.wrap(this.row.Data9); }
    get LosOK() { return this.wrap(this.row.Data10); }
    get LeaveLoot() { return this.wrap(this.row.Data11); }
    get NotInCombat() { return this.wrap(this.row.Data12); }
    get LogLoot() { return this.wrap(this.row.Data13); }
    get OpenTextID() { return getBroadcast(this, this.row.Data14); }
    get UseGroupLoot() { return this.wrap(this.row.Data15); }
    get TooltipID() { return this.wrap(this.row.Data16); }
    get Condition() { return this.wrap(this.row.Data17); }
}

@GameObjectID(33)
export class GameObjectDestructibleBuilding extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get InteractNumHits() { return this.wrap(this.row.Data0); }
    get CreditProxyCreature() { return this.wrap(this.row.Data1); }
    get Empty1() { return this.wrap(this.row.Data2); }
    get IntactEvent() { return this.wrap(this.row.Data3); }
    get Empty2() { return this.wrap(this.row.Data4); }
    get DamageNumHits() { return this.wrap(this.row.Data5); }
    get Empty3() { return this.wrap(this.row.Data6); }
    get Empty4() { return this.wrap(this.row.Data7); }
    get Empty5() { return this.wrap(this.row.Data8); }
    get DamagedEvent() { return this.wrap(this.row.Data9); }
    get Empty6() { return this.wrap(this.row.Data10); }
    get Empty7() { return this.wrap(this.row.Data11); }
    get Empty8() { return this.wrap(this.row.Data12); }
    get Empty9() { return this.wrap(this.row.Data13); }
    get DestroyedEvent() { return this.wrap(this.row.Data14); }
    get Empty10() { return this.wrap(this.row.Data15); }
    get RebuildingTimeSecs() { return this.wrap(this.row.Data16); }
    get Empty11() { return this.wrap(this.row.Data17); }
    get DestructibleData() { return this.wrap(this.row.Data18); }
    get RebuildingEvent() { return this.wrap(this.row.Data19); }
    get Empty12() { return this.wrap(this.row.Data20); }
    get Empty13() { return this.wrap(this.row.Data21); }
    get DamageEvent() { return this.wrap(this.row.Data22); }
    get Empty14() { return this.wrap(this.row.Data23); }
}

@GameObjectID(0)
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
    get LockID() { return this.wrap(this.row.Data1); }

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
    get OpenText() { return getBroadcast(this, this.row.Data4); }

    /**
     * Text displayed when the door is closed
     */
    get CloseText() { return getBroadcast(this, this.row.Data5); }

    /**
     * Whether pathfinding should ignore this door
     */
    get IgnoredByPathfinding() { return getBroadcast(this, this.row.Data6); }

    /**
     * Unknown
     */
    get Condition1() { return getBroadcast(this, this.row.Data7); }
}

@GameObjectID(31)
export class GameObjectDungeonDifficulty extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get MapID() { return this.wrap(this.row.Data0); }
    get Difficulty() { return this.wrap(this.row.Data1); }
}

@GameObjectID(25)
export class GameObjectFishingHole extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    /**
     * How close bobber must be
     */
    get Radius() { return this.wrap(this.row.Data0); }
    get LootID() { return this.wrap(this.row.Data1); }
    get MinSuccessOpens() { return this.wrap(this.row.Data2); }
    get MaxSuccessOpens() { return this.wrap(this.row.Data3); }
    /**
     * Possibly 1628 for all fishing holes.
     */
    get LockID() { return this.wrap(this.row.Data4); }
}

@GameObjectID(26)
export class GameObjectFlagDrop extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get EventID() { return this.wrap(this.row.Data1); }
    get PickupSpell() { return this.wrap(this.row.Data2); }
    get NoDamageImmune() { return this.wrap(this.row.Data3); }
    get OpenTextID() { return this.wrap(this.row.Data4); }
}

@GameObjectID(24)
export class GameObjectFlagStand extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get PickupSpell() { return this.wrap(this.row.Data1); }
    get Radius() { return this.wrap(this.row.Data2); }
    get ReturnAura() { return this.wrap(this.row.Data3); }
    get ReturnSpell() { return this.wrap(this.row.Data4); }
    get NoDamageImmune() { return this.wrap(this.row.Data5); }
    get OpenTextID() { return this.wrap(this.row.Data6); }
    get LineOfSightOK() { return this.wrap(this.row.Data7); }
    get ConditionID() { return this.wrap(this.row.Data8); }
}

@GameObjectID(4)
export class GameObjectGeneric extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get TooltipID() { return this.wrap(this.row.Data0); }
    get Highlight() { return this.wrap(this.row.Data1); }
    get ServerOnly() { return this.wrap(this.row.Data2); }
    get Large() { return this.wrap(this.row.Data3); }
    get FloatOnWater() { return this.wrap(this.row.Data4); }
    get QuestID() { return this.wrap(this.row.Data5); }
    get ConditionID() { return this.wrap(this.row.Data6); }
}

@GameObjectID(10)
export class GameObjectGoober extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get QuestID() { return this.wrap(this.row.Data1); }
    get EventID() { return this.wrap(this.row.Data2); }
    get AutoCloseTime() { return this.wrap(this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get Consumable() { return this.wrap(this.row.Data5); }
    get Cooldown() { return this.wrap(this.row.Data6); }
    get PageID() { return this.wrap(this.row.Data7); }
    get Language() { return this.wrap(this.row.Data8); }
    get PageMaterial() { return this.wrap(this.row.Data9); }
    get SpellID() { return this.wrap(this.row.Data10); }
    get NoDamageImmune() { return this.wrap(this.row.Data11); }
    get LinkedTrapID() { return this.wrap(this.row.Data12); }
    get Large() { return this.wrap(this.row.Data13); }
    get OpenTextID() { return this.wrap(this.row.Data14); }
    get CloseTextID() { return this.wrap(this.row.Data15); }
    get LineOfSightOK() { return this.wrap(this.row.Data16); }
    get AllowMounted() { return this.wrap(this.row.Data17); }
    get FloatingTooltip() { return this.wrap(this.row.Data18); }
    get GossipID() { return this.wrap(this.row.Data19); }
    get WorldStateSetsState() { return this.wrap(this.row.Data20); }
    get FloatOnWater() { return this.wrap(this.row.Data21); }
    get ConditionID() { return this.wrap(this.row.Data22); }
}

@GameObjectID(21)
export class GameObjectGuardPost extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get CreatureID() { return this.wrap(this.row.Data0); }
    get Charges() { return this.wrap(this.row.Data1); }
}

@GameObjectID(34)
export class GameObjectGuildBank extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get ConditionID() { return this.wrap(this.row.Data0); }
}

@GameObjectID(19)
export class GameObjectMailbox extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get ConditionID() { return this.wrap(this.row.Data0); }
}

@GameObjectID(23)
export class GameObjectMeetingStone extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get MinLevel() { return this.wrap(this.row.Data0); }
    get MaxLevel() { return this.wrap(this.row.Data1); }
    get AreaID() { return this.wrap(this.row.Data2); }
}

@GameObjectID(27)
export class GameObjectMinigame extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get GameType() { return this.wrap(this.row.Data0); }
}

export class GameObjectMoTransport extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get TaxiPath() { return new TaxiPathRef(this, this.row.Data0); }
    get MoveSpeed() { return this.wrap(this.row.Data1); }
    get AccelRate() { return this.wrap(this.row.Data2); }
    get StartEventID() { return this.wrap(this.row.Data3); }
    get StopEventID() { return this.wrap(this.row.Data4); }
    get TransportPhysics() { return this.wrap(this.row.Data5); }
    get SpawnGroup() { return this.wrap(this.row.Data6); }
    get WorldState1() { return this.wrap(this.row.Data7); }
    get CanBeStopped() { return this.wrap(this.row.Data8); }
}
@GameObjectID(15)
export class GameObjectMoTransportRef<T> extends RefStatic<T,GameObjectMoTransport> {
    protected create(mod: string, id: string): GameObjectMoTransport {
        return GameObjectTemplates.create(mod,id)
            .Type.setMoTransport()
    }
    protected clone(mod: string, id: string): GameObjectMoTransport {
        return GameObjectTemplates.create(mod,id,this.cell.get())
            .Type.setMoTransport()
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: GameObjectMoTransport): number {
        return v.ID;
    }
    protected resolve(): GameObjectMoTransport {
        return GameObjectTemplates.load(this.cell.get())
            .Type.setMoTransport()
    }
}

@GameObjectID(2)
export class GameObjectQuestGiver extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get QuestList() { return this.wrap(this.row.Data1); }
    get PageMaterial() { return this.wrap(this.row.Data2); }
    get GossipID() { return this.wrap(this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get NoDamageImmune() { return this.wrap(this.row.Data5); }
    get OpenTextID() { return getBroadcast(this, this.row.Data6) }
    get IsLOSOk() { return getBroadcast(this, this.row.Data7) }
    get AllowMounted() { return getBroadcast(this, this.row.Data8) }
    get IsLarge() { return getBroadcast(this, this.row.Data9) }
    get ConditionID() { return getBroadcast(this, this.row.Data10) }
}

@GameObjectID(22)
export class GameObjectSpellCaster extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get SpellID() { return this.wrap(this.row.Data0); }
    get Charges() { return this.wrap(this.row.Data1); }
    get PartyOnly() { return this.wrap(this.row.Data2); }
    get AllowMounted() { return this.wrap(this.row.Data3); }
    get Large() { return this.wrap(this.row.Data4); }
    get ConditionID() { return this.wrap(this.row.Data5); }
}

@GameObjectID(8)
export class GameObjectSpellFocus extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get FocusID() { return this.wrap(this.row.Data0); }
    get Distance() { return this.wrap(this.row.Data1); }
    get LinkedTrapID() { return this.wrap(this.row.Data2); }
    get ServerOnly() { return this.wrap(this.row.Data3); }
    get QuestID() { return this.wrap(this.row.Data4); }
    get Large() { return this.wrap(this.row.Data5); }
    get FloatingTooltip() { return this.wrap(this.row.Data6); }
    get FloatOnWater() { return this.wrap(this.row.Data7); }
    get ConditionID() { return this.wrap(this.row.Data8); }
}

@GameObjectID(18)
export class GameObjectSummoningRitual extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get RequiredParticipants() { return this.wrap(this.row.Data0); }
    get SpellID() { return this.wrap(this.row.Data1); }
    get AnimSpell() { return this.wrap(this.row.Data2); }
    get RitualPersistent() { return this.wrap(this.row.Data3); }
    get CasterTargetSpell() { return this.wrap(this.row.Data4); }
    get CasterTargetSpellTargets() { return this.wrap(this.row.Data5); }
    get CasterGrouped() { return this.wrap(this.row.Data6); }
    get RitualNoTargetCheck() { return this.wrap(this.row.Data7); }
    get ConditionID() { return this.wrap(this.row.Data8); }
}

@GameObjectID(9)
export class GameObjectText extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get PageID() { return this.wrap(this.row.Data0); }
    get Language() { return this.wrap(this.row.Data1); }
    get PageMaterial() { return this.wrap(this.row.Data2); }
    get AllowMounted() { return this.wrap(this.row.Data3); }
    get ConditionID() { return this.wrap(this.row.Data4); }
}

@GameObjectID(11)
export class GameObjectTransport extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get Pause() { return this.wrap(this.row.Data0); }
    get StartOpen() { return this.wrap(this.row.Data1); }
    get AutoCloseTime() { return this.wrap(this.row.Data2); }
    get Pause1Event() { return this.wrap(this.row.Data3); }
    get Pause2Event() { return this.wrap(this.row.Data4); }
    get Map() { return this.wrap(this.row.Data5); }
    get Keyframes() { return new ElevatorKeyframes(this); }
}

export class GameObjectTransportRef<T> extends RefStatic<T,GameObjectTransport> {
    protected create(mod: string, id: string): GameObjectTransport {
        return GameObjectTemplates.create(mod,id)
            .Type.setTransport()
    }
    protected clone(mod: string, id: string): GameObjectTransport {
        return GameObjectTemplates.create(mod,id,this.cell.get())
            .Type.setTransport()
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: GameObjectTransport): number {
        return v.ID;
    }
    protected resolve(): GameObjectTransport {
        return GameObjectTemplates.load(this.cell.get())
            .Type.setTransport()
    }
}

@GameObjectID(6)
export class GameObjectTrap extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get Level() { return this.wrap(this.row.Data1); }
    get Diameter() { return this.wrap(this.row.Data2); }
    get SpellID() { return this.wrap(this.row.Data3); }
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
    get OpenTextID() { return this.wrap(this.row.Data12); }
    get CloseTextID() { return this.wrap(this.row.Data13); }
    get IgnoreTotems() { return this.wrap(this.row.Data14); }
    get ConditionID() { return this.wrap(this.row.Data15); }
}

@GameObjectID(35)
export class GameObjectTrapdoor extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }

    get WhenToPause() { return this.wrap(this.row.Data0); }
    get StartOpen() { return this.wrap(this.row.Data1); }
    get AutoClose() { return this.wrap(this.row.Data2); }
}

export class GameObjectType<T extends GameObjectTemplate> extends EnumCellWrapper<T> {
    @EnumField(0)
    setDoor() { return new GameObjectDoor(this.set(0).row) }

    @EnumField(1)
    setButton() { return new GameObjectButton(this.set(1).row) }

    @EnumField(2)
    setQuestgiver() { return new GameObjectQuestGiver(this.set(2).row) }

    @EnumField(3)
    setChest() { return new GameObjectChest(this.set(3).row) }

    @EnumField(4)
    setBinder() { return this.set(4) }

    @EnumField(5)
    setGeneric() { return this.set(5) }

    @EnumField(6)
    setTrap() { return new GameObjectTrap(this.set(6).row) }

    @EnumField(7)
    setChair() { return new GameObjectChair(this.set(7).row) }

    @EnumField(8)
    setSpellFocus() { return new GameObjectSpellFocus(this.set(8).row) }

    @EnumField(9)
    setText() { return new GameObjectText(this.set(9).row) }

    @EnumField(10)
    setGoober() { return new GameObjectGoober(this.set(10).row) }

    @EnumField(11)
    setTransport() { return new GameObjectTransport(this.set(11).row) }

    @EnumField(12)
    setAreadamage() { return new GameObjectAreaDamage(this.set(12).row) }

    @EnumField(13)
    setCamera() { return new GameObjectCamera(this.set(13).row) }

    @EnumField(14)
    setMapObject() { return this.set(14) }

    @EnumField(15)
    setMoTransport() { return new GameObjectMoTransport(this.set(15).row) }

    @EnumField(16)
    setDuelArbiter() { return this.set(16) }

    @EnumField(17)
    setFishingnode() { return this.set(17) }

    @EnumField(18)
    setRitual() { return new GameObjectSummoningRitual(this.set(18).row) }

    @EnumField(19)
    setMailbox() { return new GameObjectMailbox(this.set(19).row) }

    @EnumField(20)
    setAuctionhouse() { return this.set(20) }

    @EnumField(21)
    setGuardpost() { return new GameObjectGuardPost(this.set(21).row) }

    @EnumField(22)
    setSpellcaster() { return new GameObjectSpellCaster(this.set(22).row) }

    @EnumField(23)
    setMeetingstone() { return new GameObjectMeetingStone(this.set(23).row) }

    @EnumField(24)
    setFlagstand() { return new GameObjectFlagStand(this.set(24).row) }

    @EnumField(25)
    setFishinghole() { return new GameObjectFishingHole(this.set(25).row) }

    @EnumField(26)
    setFlagdrop() { return new GameObjectFlagDrop(this.set(26).row) }

    @EnumField(27)
    setMiniGame() { return new GameObjectMinigame(this.set(27).row) }

    @EnumField(28)
    setLotteryKiosk() { return this.set(28) }

    @EnumField(29)
    setCapturePoint() { return new GameObjectCapturePoint(this.set(29).row) }

    @EnumField(30)
    setAuraGenerator() { return new GameObjectAuraGenerator(this.set(30).row) }

    @EnumField(31)
    setDungeonDifficulty() { return new GameObjectDungeonDifficulty(this.set(31).row) }

    @EnumField(32)
    setBarberChair() { return new GameObjectBarberChair(this.set(32).row) }

    @EnumField(33)
    setDestructibleBuilding() { return new GameObjectDestructibleBuilding(this.set(33).row) }

    @EnumField(34)
    setGuildBank() { return new GameObjectGuildBank(this.set(34).row) }

    @EnumField(35)
    setTrapdoor() { return new GameObjectTrapdoor(this.set(35).row) }
}

export class GameObjectTemplateRefReadOnly<T> extends RefReadOnly<T,GameObjectTemplate> {
    getRef(): GameObjectTemplate {
        return GameObjectTemplates.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}