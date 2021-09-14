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
import { getBroadcast } from "../BroadcastText/BroadcastText";
import { SimpleLockPointer } from "../Locks/SimpleLock";
import { LootSetPointer } from "../Loot/Loot";
import { TransformedEntity } from "../Misc/Entity";
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

export class GameObjectDungeonDifficulty extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get MapID() { return this.wrap(this.row.Data0); }
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
    get LootID() { return this.wrap(this.row.Data1); }
    get MinSuccessOpens() { return this.wrap(this.row.Data2); }
    get MaxSuccessOpens() { return this.wrap(this.row.Data3); }
    /**
     * Possibly 1628 for all fishing holes.
     */
    get LockID() { return this.wrap(this.row.Data4); }
}

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

export class GameObjectGuardPost extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get CreatureID() { return this.wrap(this.row.Data0); }
    get Charges() { return this.wrap(this.row.Data1); }
}

export class GameObjectGuildBank extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get ConditionID() { return this.wrap(this.row.Data0); }
}

export class GameObjectMailbox extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get ConditionID() { return this.wrap(this.row.Data0); }
}

export class GameObjectMeetingStone extends GameObjectTemplate {
    constructor(row: gameobject_templateRow) {
        super(row);
    }
    get MinLevel() { return this.wrap(this.row.Data0); }
    get MaxLevel() { return this.wrap(this.row.Data1); }
    get AreaID() { return this.wrap(this.row.Data2); }
}

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
export class GameObjectMoTransportRef<T> extends RefStatic<T,GameObjectMoTransport> {
    protected create(mod: string, id: string): GameObjectMoTransport {
        return GameObjectTemplates.create(mod,id)
            .Type.MoTransport.set()
    }
    protected clone(mod: string, id: string): GameObjectMoTransport {
        return GameObjectTemplates.create(mod,id,this.cell.get())
            .Type.MoTransport.as()
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: GameObjectMoTransport): number {
        return v.ID;
    }
    protected resolve(): GameObjectMoTransport {
        return GameObjectTemplates.load(this.cell.get())
            .Type.MoTransport.as()
    }
}

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
            .Type.Transport.set()
    }
    protected clone(mod: string, id: string): GameObjectTransport {
        return GameObjectTemplates.create(mod,id,this.cell.get())
            .Type.Transport.as()
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: GameObjectTransport): number {
        return v.ID;
    }
    protected resolve(): GameObjectTransport {
        return GameObjectTemplates.load(this.cell.get())
            .Type.Transport.as()
    }
}

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
    get Door()                 { return this.value(0, x=>new GameObjectDoor(x.row)) }
    /** Enum Value = 1 */
    get Button()               { return this.value(1, x=>new GameObjectButton(x.row)) }
    /** Enum Value = 2 */
    get Questgiver()           { return this.value(2, x=>new GameObjectQuestGiver(x.row)) }
    /** Enum Value = 3 */
    get Chest()                { return this.value(3, x=>new GameObjectChest(x.row)) }
    /** Enum Value = 4 */
    get Binder()               { return this.plain_value(4) }
    /** Enum Value = 5 */
    get Generic()              { return this.plain_value(5) }
    /** Enum Value = 6 */
    get Trap()                 { return this.value(6, x=>new GameObjectTrap(x.row)) }
    /** Enum Value = 7 */
    get Chair()                { return this.value(7, x=>new GameObjectChair(x.row)) }
    /** Enum Value = 8 */
    get SpellFocus()           { return this.value(8, x=>new GameObjectSpellFocus(x.row)) }
    /** Enum Value = 9 */
    get Text()                 { return this.value(9, x=>new GameObjectText(x.row)) }
    /** Enum Value = 10 */
    get Goober()               { return this.value(10, x=>new GameObjectGoober(x.row)) }
    /** Enum Value = 11 */
    get Transport()            { return this.value(11, x=>new GameObjectTransport(x.row)) }
    /** Enum Value = 12 */
    get Areadamage()           { return this.value(12, x=>new GameObjectAreaDamage(x.row)) }
    /** Enum Value = 13 */
    get Camera()               { return this.value(13, x=>new GameObjectCamera(x.row)) }
    /** Enum Value = 14 */
    get MapObject()            { return this.plain_value(14) }
    /** Enum Value = 15 */
    get MoTransport()          { return this.value(15, x=>new GameObjectMoTransport(x.row)) }
    /** Enum Value = 16 */
    get DuelArbiter()          { return this.plain_value(16) }
    /** Enum Value = 17 */
    get Fishingnode()          { return this.plain_value(17) }
    /** Enum Value = 18 */
    get Ritual()               { return this.value(18, x=>new GameObjectSummoningRitual(x.row)) }
    /** Enum Value = 19 */
    get Mailbox()              { return this.value(19, x=>new GameObjectMailbox(x.row)) }
    /** Enum Value = 20 */
    get Auctionhouse()         { return this.plain_value(20) }
    /** Enum Value = 21 */
    get Guardpost()            { return this.value(21, x=>new GameObjectGuardPost(x.row)) }
    /** Enum Value = 22 */
    get Spellcaster()          { return this.value(22, x=>new GameObjectSpellCaster(x.row)) }
    /** Enum Value = 23 */
    get Meetingstone()         { return this.value(23, x=>new GameObjectMeetingStone(x.row)) }
    /** Enum Value = 24 */
    get Flagstand()            { return this.value(24, x=>new GameObjectFlagStand(x.row)) }
    /** Enum Value = 25 */
    get Fishinghole()          { return this.value(25, x=>new GameObjectFishingHole(x.row)) }
    /** Enum Value = 26 */
    get Flagdrop()             { return this.value(26, x=>new GameObjectFlagDrop(x.row)) }
    /** Enum Value = 27 */
    get MiniGame()             { return this.value(27, x=>new GameObjectMinigame(x.row)) }
    /** Enum Value = 28 */
    get LotteryKiosk()         { return this.plain_value(28) }
    /** Enum Value = 29 */
    get CapturePoint()         { return this.value(29, x=>new GameObjectCapturePoint(x.row)) }
    /** Enum Value = 30 */
    get AuraGenerator()        { return this.value(30, x=>new GameObjectAuraGenerator(x.row)) }
    /** Enum Value = 31 */
    get DungeonDifficulty()    { return this.value(31, x=>new GameObjectDungeonDifficulty(x.row)) }
    /** Enum Value = 32 */
    get BarberChair()          { return this.value(32, x=>new GameObjectBarberChair(x.row)) }
    /** Enum Value = 33 */
    get DestructibleBuilding() { return this.value(33, x=>new GameObjectDestructibleBuilding(x.row)) }
    /** Enum Value = 34 */
    get GuildBank()            { return this.value(34, x=>new GameObjectGuildBank(x.row)) }
    /** Enum Value = 35 */
    get Trapdoor()             { return this.value(35, x=>new GameObjectTrapdoor(x.row)) }
}

export class GameObjectTemplateRefReadOnly<T> extends RefReadOnly<T,GameObjectTemplate> {
    getRef(): GameObjectTemplate {
        return GameObjectTemplates.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}