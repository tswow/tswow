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
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DBCIntCell } from "../../../data/dbc/DBCCell";
import { DBC } from "../../DBCFiles";
import { SpellVisualQuery, SpellVisualRow } from "../../dbc/SpellVisual";
import { SpellVisualKitQuery, SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { SpellVisualKitModelAttachRow } from "../../dbc/SpellVisualKitModelAttach";
import { Table } from "../../../data/table/Table";
import { Attachment } from "../Misc/Attachment";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { PositionXYZCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
import { SpellAnimation } from "./SpellAnimation";
import { SpellCharacterProcedures } from "./SpellCharacterProcedure";
import { SpellEffectCameraShakeRegistry } from "./SpellEffectCameraShakes";
import { SpellVisualEffectRegistry, SpellVisualEffects } from "./SpellVisualEffect";

export class SpellVisualKitModelAttach extends CellSystemTop {
    readonly row: SpellVisualKitModelAttachRow;

    constructor(row: SpellVisualKitModelAttachRow) {
        super();
        this.row = row;
    }

    get Attachment() {
        return makeEnumCell(Attachment,this, this.row.AttachmentID);
    }

    get Offset() { return new PositionXYZCell(this, this.row.OffsetX, this.row.OffsetY, this.row.OffsetZ);}
    get Yaw() { return this.wrap(this.row.Yaw); }
    get Pitch() { return this.wrap(this.row.Pitch); }
    get Roll() { return this.wrap(this.row.Roll); }
    get Effect() { return SpellVisualEffectRegistry.ref(this, this.row.SpellVisualEffectNameID) }
}

export class SpellVisualKitModels extends MultiRowSystem<SpellVisualKitModelAttach,SpellVisualKit> {
    protected getAllRows(): SpellVisualKitModelAttach[] {
        return DBC.SpellVisualKitModelAttach
            .queryAll({ParentSpellVisualKitID:this.owner.row.ID.get()})
            .map(x=>new SpellVisualKitModelAttach(x))
    }
    protected isDeleted(value: SpellVisualKitModelAttach): boolean {
        return value.row.isDeleted();
    }
    constructor(owner: SpellVisualKit) {
        super(owner);
    }

    add() : SpellVisualKitModelAttach {
        let row = DBC.SpellVisualKitModelAttach.add(Ids.SpellVisualKitModelAttach.id())
        row.ParentSpellVisualKitID.set(this.owner.row.ID.get());
        return new SpellVisualKitModelAttach(row);
    }
}

export class SpellVisualKit extends MainEntity<SpellVisualKitRow> {
    clear(): this {
        this.Animation.set(0)
            .BaseEffect.set(0)
            .BreathEffect.set(0)
            .CharProcedures.clearAll()
            .ChestEffect.set(0)
            .Flags.set(0)
            .HeadEffect.set(0)
            .LeftHandEffect.set(0)
            .RightHandEffect.set(0)
            .RightWeaponEffect.set(0)
            .CameraShake.set(0)
            .Sound.set(0)
            .SpellEffects.clearAll()
            .StartAnimation.set(-1)
            .WorldEffect.set(0)
            .Models.forEach(x=>x.row.delete())
        return this;
    }

    readonly name: string;

    constructor(row: SpellVisualKitRow, name: string) {
        super(row);
        this.name = name;
    }

    get ID() { return this.row.ID.get(); }
    get BaseEffect() { return SpellVisualEffectRegistry.ref(this, this.row.BaseEffect); }
    get BreathEffect() { return SpellVisualEffectRegistry.ref(this, this.row.BreathEffect); }
    get CharProcedures() { return new SpellCharacterProcedures(this, this.row); }
    get Flags() { return this.wrap(this.row.Flags); }
    get CameraShake() {
        return SpellEffectCameraShakeRegistry.ref(this, this.row.ShakeID);
    }
    get Sound() { return SoundEntryRegistry.ref(this, this.row.SoundID); }
    get StartAnimation() {
        return makeEnumCell(SpellAnimation,this, this.row.StartAnimID);
    }
    get WorldEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.WorldEffect);
    }
    get Animation() {
        return makeEnumCell(SpellAnimation,this, this.row.AnimID);
    }
    get ChestEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.ChestEffect)
    }
    get HeadEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.HeadEffect)
    }
    get LeftHandEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.LeftHandEffect)
    }
    get RightHandEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.RightHandEffect)
    }
    get RightWeaponEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.RightWeaponEffect)
    }
    get SpellEffects() {
        return new SpellVisualEffects(this, this.row);
    }
    get Models(): SpellVisualKitModels {
        return new SpellVisualKitModels(this);
    }
}

export class SpellVisualKitRegistryClass
    extends RegistryDynamic<SpellVisualKit,SpellVisualKitRow,SpellVisualKitQuery>
{
    protected Table(): Table<any, SpellVisualKitQuery, SpellVisualKitRow> & { add: (id: number) => SpellVisualKitRow; } {
        return DBC.SpellVisualKit
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellKit
    }
    Clear(entity: SpellVisualKit): void {
        entity.Animation.set(0)
              .BaseEffect.set(0)
              .BreathEffect.set(0)
              .CameraShake.set(0)
              .CharProcedures.clearAll()
              .ChestEffect.set(0)
              .Flags.set(0)
              .HeadEffect.set(0)
              .LeftHandEffect.set(0)
              .RightHandEffect.set(0)
              .RightWeaponEffect.set(0)
              .Sound.set(0)
              .SpellEffects.clearAll()
              .StartAnimation.set(0)
              .WorldEffect.set(0)
    }
    protected Clone(entity: SpellVisualKit, parent: SpellVisualKit): void {
        parent.Models.forEach(x=>x.row.clone(entity.ID));
    }
    protected FindByID(id: number): SpellVisualKitRow {
        return DBC.SpellVisualKit.findById(id);
    }
    protected EmptyQuery(): SpellVisualKitQuery {
        return {}
    }
    ID(e: SpellVisualKit): number {
        return e.ID
    }
    protected Entity(r: SpellVisualKitRow): SpellVisualKit {
        return new SpellVisualKit(r,'');
    }
}
export const SpellVisualKitRegistry = new SpellVisualKitRegistryClass();

export class MissileFollowGround extends CellSystem<SpellVisual> {
    get Height() { return this.ownerWrap(this.owner.row.MissileFollowGroundHeight); }
    get DropSpeed() { return this.ownerWrap(this.owner.row.MissileFollowGroundDropSpeed); }
    get Approach() { return this.ownerWrap(this.owner.row.MissileFollowGroundApproach); }
    get Flags() { return this.ownerWrap(this.owner.row.MissileFollowGroundFlags); }

    set(height: number, dropSpeed: number, groundApproach: number, groundFlags: number) {
        this.Height.set(height)
        this.DropSpeed.set(dropSpeed);
        this.Approach.set(groundApproach);
        this.Flags.set(groundFlags);
        return this.owner;
    }
}

export class SpellVisualMissile extends CellSystem<SpellVisual> {
    get DestinationAttachment() {
        return this.ownerWrap(this.owner.row.MissileDestinationAttachment);
    }
    get Sound() {
        return SoundEntryRegistry.ref(this.owner, this.owner.row.MissileSound);
    }
    get FollowGround() { return new MissileFollowGround(this.owner); }
    get HasMissile() { return this.ownerWrap(this.owner.row.HasMissile); }
    get Model() { return SpellVisualEffectRegistry.ref(this.owner, this.owner.row.MissileModel); }

    get Attachment() { return this.ownerWrap(this.owner.row.MissileAttachment); }

    get CastOffset() {
        return new PositionXYZCell(this.owner,
            this.owner.row.MissileCastOffsetX,
            this.owner.row.MissileCastOffsetY,
            this.owner.row.MissileCastOffsetZ)
    }

    get ImpactOffset() {
        return new PositionXYZCell(this.owner,
            this.owner.row.MissileImpactOffsetX,
            this.owner.row.MissileImpactOffsetY,
            this.owner.row.MissileImpactOffsetZ)
    }
}

export class SpellVisual extends MainEntity<SpellVisualRow> {
    clear(): this {
        this.row
            .ImpactAreaKit.set(0)
            .ImpactKit.set(0)
            .InstantAreaKit.set(0)
            .HasMissile.set(0)
            .MissileAttachment.set(-1)
            .MissileCastOffsetX.set(0)
            .MissileCastOffsetY.set(0)
            .MissileCastOffsetZ.set(0)
            .MissileDestinationAttachment.set(0)
            .MissileFollowGroundApproach.set(0)
            .MissileFollowGroundDropSpeed.set(0)
            .MissileFollowGroundFlags.set(0)
            .MissileFollowGroundHeight.set(0)
            .MissileImpactOffsetX.set(0)
            .MissileImpactOffsetY.set(0)
            .MissileImpactOffsetZ.set(0)
            .MissileModel.set(0)
            .MissileMotion.set(0)
            .MissilePathType.set(0)
            .MissileSound.set(0)
            .MissileTargetingKit.set(0)
            .PersistentAreaKit.set(0)
            .PrecastKit.set(0)
            .StateDoneKit.set(0)
            .StateKit.set(0)
            .CastKit.set(0)
            .TargetImpactKit.set(0)
        return this;
    }

    private kit(name: string, kit: DBCIntCell<SpellVisualRow>) {
        return SpellVisualKitRegistry.ref(this, kit);
    }

    AllKits() {
        return ([
            [this.row.CastKit,"Cast"],
            [this.row.StateKit,"State"],
            [this.row.ImpactKit,"Impact"],
            [this.row.ChannelKit,"Channel"],
            [this.row.PrecastKit,"Precast"],
            [this.row.StateDoneKit,"StateDone"],
            [this.row.ImpactAreaKit,"ImpactArea"],
            [this.row.InstantAreaKit,"InstantArea"],
            [this.row.CasterImpactKit,"Impact"],
            [this.row.TargetImpactKit,"TargetImpact"],
            [this.row.PersistentAreaKit,"PersistentArea"],
            [this.row.MissileTargetingKit,"MissileTargeting"]
        ] as [DBCIntCell<any>,string][]).filter(([row])=>{
            return row.get()!=0;
        }).map(([row,name])=>SpellVisualKitRegistry.ref(this, row));
    }

    get ID() { return this.row.ID.get(); }
    get CastKit() { return this.kit("Cast", this.row.CastKit); }
    get StateKit() { return this.kit("State", this.row.StateKit); }
    get ImpactKit() { return this.kit("Impact", this.row.ImpactKit); }
    get ChannelKit() { return this.kit("Channel", this.row.ChannelKit); }
    get PrecastKit() { return this.kit("Precast", this.row.PrecastKit); }
    get StateDoneKit() { return this.kit("StateDone", this.row.StateDoneKit); }
    get ImpactAreaKit() { return this.kit("ImpactArea", this.row.ImpactAreaKit); }
    get InstantAreaKit() { return this.kit("InstantArea", this.row.InstantAreaKit); }
    get CasterImpactKit() { return this.kit("CasterImpact", this.row.CasterImpactKit); }
    get TargetImpactKit() { return this.kit("TargetImpact", this.row.TargetImpactKit); }
    get PersistentAreaKit() { return this.kit("PersistentArea", this.row.PersistentAreaKit); }
    get MissileTargetingKit() { return this.kit("MissileTargeting", this.row.MissileTargetingKit); }

    get Missile() { return new SpellVisualMissile(this); }

    cloneFromVisual(visualId: number) {
        let row = DBC.SpellVisual.findById(visualId).clone(Ids.SpellVisual.id());
        row.copyTo(this.row);
        return this.owner;
    }

    cloneFromSpell(spellId: number) {
        return this.cloneFromVisual(DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
    }
}

export class SpellVisualRegistryClass
    extends RegistryDynamic<SpellVisual,SpellVisualRow,SpellVisualQuery>
{
    protected Table(): Table<any, any, SpellVisualRow> & { add: (id: number) => SpellVisualRow; } {
        return DBC.SpellVisual
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellVisual
    }
    Clear(entity: SpellVisual): void {
        entity.clear();
    }
    protected Clone(entity: SpellVisual, parent: SpellVisual): void {}
    protected FindByID(id: number): SpellVisualRow {
        return DBC.SpellVisual.findById(id);
    }
    protected EmptyQuery() {
        return {}
    }
    ID(e: SpellVisual): number {
        return e.ID
    }
    protected Entity(r: SpellVisualRow): SpellVisual {
        return new SpellVisual(r);
    }
}

export const SpellVisualRegistry = new SpellVisualRegistryClass();