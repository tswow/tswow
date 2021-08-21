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
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBCIntCell } from "wotlkdata/dbc/DBCCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SpellVisualRow } from "wotlkdata/dbc/types/SpellVisual";
import { Ids } from "../Misc/Ids";
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";
import { SpellAnimation } from "./SpellAnimation";
import { SpellVisualKitModelAttachRow } from "wotlkdata/dbc/types/SpellVisualKitModelAttach";
import { Attachment } from "../Misc/Attachment";
import { Vec3 } from "../Misc/Vec3";
import { SpellVisualEffectPointer, SpellVisualEffects } from "./SpellVisualEffect";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { SoundEntryPointer } from "../Sound/SoundEntry";
import { SpellEffectCameraShakePointer } from "./SpellEffectCameraShakes";
import { SpellCharacterProcedures } from "./SpellCharacterProcedure";
import { MainEntity } from "../Misc/Entity";
import { Ref } from "../Refs/Ref";

export class SpellVisualKitModelAttach<T> extends CellSystem<T> {

    readonly row: SpellVisualKitModelAttachRow;

    constructor(owner: T, row: SpellVisualKitModelAttachRow) {
        super(owner);
        this.row = row;
    }

    get Attachment() { return new Attachment(this, this.row.AttachmentID); }
    get Offset() { return new Vec3(this,this.row.OffsetX,this.row.OffsetY,this.row.OffsetZ);}
    get Yaw() { return this.wrap(this.row.Yaw); }
    get Pitch() { return this.wrap(this.row.Pitch); }
    get Roll() { return this.wrap(this.row.Roll); }
    get Effect() { return new SpellVisualEffectPointer(this, this.row.SpellVisualEffectNameID) }
}

export class SpellVisualKitModels extends CellSystem<SpellVisualKit> {
    constructor(owner: SpellVisualKit) {
        super(owner);
    }

    add() : SpellVisualKitModelAttach<SpellVisualKit> {
        let row = DBC.SpellVisualKitModelAttach.add(Ids.SpellVisualKitModelAttach.id())
        row.ParentSpellVisualKitID.set(this.owner.row.ID.get());
        return new SpellVisualKitModelAttach(this.owner,row);
    }

    get() {
        return DBC.SpellVisualKitModelAttach.filter({ParentSpellVisualKitID: this.owner.row.ID.get()})
            .map(x=>new SpellVisualKitModelAttach(this.owner, x));
    }

    forEach(callback: (value: SpellVisualKitModelAttach<SpellVisualKit>)=>void) {
        this.get().forEach(callback);
    }
}

export class SpellVisualKit extends MainEntity<SpellVisualKitRow> {
    clear(): this {
        this.Animation.set(0)
            .BaseEffect.setRefID(0)
            .BreathEffect.setRefID(0)
            .CharProcedures.clearAll()
            .ChestEffect.setRefID(0)
            .Flags.set(0)
            .HeadEffect.setRefID(0)
            .LeftHandEffect.setRefID(0)
            .RightHandEffect.setRefID(0)
            .RightWeaponEffect.setRefID(0)
            .CameraShake.setRefID(0)
            .Sound.setRefID(0)
            .SpellEffects.clearAll()
            .StartAnimation.set(-1)
            .WorldEffect.setRefID(0)
            // TODO: Actually remove the rows
            .Models.forEach(x=>x.row.ParentSpellVisualKitID.set(0))
        return this;
    }

    readonly name: string;

    constructor(row: SpellVisualKitRow, name: string) {
        super(row);
        this.name = name;
    }

    get BaseEffect() { return new SpellVisualEffectPointer(this, this.row.BaseEffect); }
    get BreathEffect() { return new SpellVisualEffectPointer(this, this.row.BreathEffect); }
    get CharProcedures() { return new SpellCharacterProcedures(this, this.row); }
    get Flags() { return this.wrap(this.row.Flags); }
    get CameraShake() { return new SpellEffectCameraShakePointer(this, this.row.ShakeID); }
    get Sound() { return new SoundEntryPointer(this, this.row.SoundID); }
    get StartAnimation() { return new SpellAnimation(this, this.row.StartAnimID); }
    get WorldEffect() { return new SpellVisualEffectPointer(this, this.row.WorldEffect); }
    get Animation() { return new SpellAnimation(this, this.row.AnimID); }
    get ChestEffect() { return new SpellVisualEffectPointer(this, this.row.ChestEffect)}
    get HeadEffect() { return new SpellVisualEffectPointer(this, this.row.HeadEffect)}
    get LeftHandEffect() { return new SpellVisualEffectPointer(this, this.row.LeftHandEffect)}
    get RightHandEffect() { return new SpellVisualEffectPointer(this, this.row.RightHandEffect)}
    get RightWeaponEffect() { return new SpellVisualEffectPointer(this, this.row.RightWeaponEffect)}
    get SpellEffects() { return new SpellVisualEffects(this, this.row); }
    get Models(): SpellVisualKitModels { return new SpellVisualKitModels(this); }
}

export class SpellVisualKitPointer<T> extends Ref<T,SpellVisualKit> {
    private name: string;

    constructor(owner: T, cell: Cell<number,any>, name: string) {
        super(owner, cell);
        this.name = name;
    }

    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellVisualKit {
        return new SpellVisualKit(DBC.SpellVisualKit.findById(this.cell.get()),this.name);
    }
    protected clone(): SpellVisualKit {
        return new SpellVisualKit(this.resolve().row.clone(Ids.SpellKit.id()),this.name);
    }
    protected id(v: SpellVisualKit): number {
        return v.row.ID.get()
    }
    protected resolve(): SpellVisualKit {
        return new SpellVisualKit(DBC.SpellVisualKit.findById(this.cell.get()),this.name);
    }
}

export class SpellVisual extends MainEntity<SpellVisualRow> {
    clear(): this {
        this.row
            .ImpactAreaKit.set(0)
            .ImpactKit.set(0)
            .InstantAreaKit.set(0)
            .MissileAttachment.set(0)
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

    private kit(name: string, kit: DBCIntCell<SpellVisualRow>): SpellVisualKitPointer<this> {
        return new SpellVisualKitPointer(this, kit, name);
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
        }).map(([row,name])=>new SpellVisualKitPointer(this, row, name));
    }

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
    get MissileModel() { return new SpellVisualEffectPointer(this, this.row.MissileModel); }
    get MissileAttachment() { return this.ownerWrap(this.row.MissileAttachment); }

    get MissileCastOffset() { 
        return new Vec3(this.owner,
            this.row.MissileCastOffsetX,
            this.row.MissileCastOffsetY,
            this.row.MissileCastOffsetZ)
    }

    get MissileImpactOffset() { 
        return new Vec3(this.owner,
            this.row.MissileImpactOffsetX,
            this.row.MissileImpactOffsetY,
            this.row.MissileImpactOffsetZ)
    }

    cloneFromVisual(visualId: number) {
        let row = DBC.SpellVisual.findById(visualId).clone(Ids.SpellVisual.id());
        row.copyTo(this.row);
        return this.owner;
    }

    cloneFromSpell(spellId: number) {
        return this.cloneFromVisual(DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
    }
}

export class SpellVisualPointer<T> extends Ref<T,SpellVisual> {
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellVisual {
        return new SpellVisual(DBC.SpellVisual.add(Ids.SpellVisual.id()))
    }
    protected clone(): SpellVisual {
        return new SpellVisual(this.resolve().row.clone(Ids.SpellVisual.id()))
    }
    protected id(v: SpellVisual): number {
        return v.row.ID.get()
    }
    protected resolve(): SpellVisual {
        return new SpellVisual(DBC.SpellVisual.findById(this.cell.get()));
    }
}