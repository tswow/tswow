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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { DBCIntCell } from "wotlkdata/dbc/DBCCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SpellVisualRow } from "wotlkdata/dbc/types/SpellVisual";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";
import { Vector3 } from "wotlkdata/cell/systems/Vector3"
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";
import { SpellAnimation } from "./SpellAnimation";
import { SpellVisualKitModelAttachRow } from "wotlkdata/dbc/types/SpellVisualKitModelAttach";
import { Attachment } from "../Base/Attachment";
import { Vec3 } from "../Base/Vec3";
import { SpellVisualEffect } from "./SpellVisualEffect";
import { Cell } from "wotlkdata/cell/Cell";

function addKitRow(id: number) {
    return DBC.SpellVisualKit.add(id,{
        AnimID: 0,
        BaseEffect: 0,
        BreathEffect: 0,
        CharParamOne: 0,
        CharParamThree: 0,
        CharParamTwo: 0,
        CharParamZero: 0,
        CharProc: -1,
        ChestEffect: 0,
        Flags: 0,
        HeadEffect: 0,
        LeftHandEffect: 0,
        LeftWeaponEffect: 0,
        RightHandEffect: 0,
        RightWeaponEffect: 0,
        ShakeID: 0,
        SoundID: 0,
        SpecialEffect: 0,
        StartAnimID: -1,
        WorldEffect: 0,
    });
}

export class SpellVisualKitModelAttach<T> extends Subsystem<SpellVisual<T>> {
    readonly row: SpellVisualKitModelAttachRow;

    constructor(owner: SpellVisual<T>, row: SpellVisualKitModelAttachRow) {
        super(owner);
        this.row = row;
    }
    
    get Attachment() { return new Attachment(this, this.row.AttachmentID); }
    get Offset() { return new Vec3(this,this.row.OffsetX,this.row.OffsetY,this.row.OffsetZ);}
    get Yaw() { return this.wrap(this.row.Yaw); }
    get Pitch() { return this.wrap(this.row.Pitch); }
    get Roll() { return this.wrap(this.row.Roll); }
    get Effect() { return new SpellVisualEffect(this, 
        DBC.SpellVisualEffectName.findById(
            this.row.SpellVisualEffectNameID.get()));
        }

    makeUnique(newOwner: number) {
        this.row.clone(newOwner);
        let id = Ids.SpellVisualEffectName.id();
        this.Effect.row.clone(id);
        this.row.SpellVisualEffectNameID.set(id);
    }
}

export class SpellVisualKitModels<T> extends Subsystem<SpellVisual<T>> {
    protected kit: SpellVisualKit<T>;

    constructor(owner: SpellVisual<T>, kit: SpellVisualKit<T>) {
        super(owner);
        this.kit = kit;
    }

    add() : SpellVisualKitModelAttach<T> {
        let row = DBC.SpellVisualKitModelAttach.add(Ids.SpellVisualKitModelAttach.id())
        row.ParentSpellVisualKitID.set(this.kit.ID);
        return new SpellVisualKitModelAttach(this.owner,row);
    }

    get() {
        return DBC.SpellVisualKitModelAttach.filter({ParentSpellVisualKitID: this.kit.ID})
            .map(x=>new SpellVisualKitModelAttach(this.owner, x));
    }

    forEach(callback: (value: SpellVisualKitModelAttach<T>)=>void) {
        this.get().forEach(callback);
    }
}

export class SpellVisualKit<T> extends Subsystem<SpellVisual<T>> {
    protected ptr: DBCIntCell<SpellVisualRow>
    readonly name: string;

    transientFields() {
        return super.transientFields().concat(['ptr']);
    }
    
    static ptr(kit: SpellVisualKit<any>) {
        return kit.ptr;
    }

    constructor(owner: SpellVisual<T>, name: string, ptr: DBCIntCell<SpellVisualRow>) {
        super(owner);
        this.ptr = ptr;
        this.name = name;
    }

    clear() {
        this.ptr.set(0);
        return this;
    }

    get ID() { return this.ptr.get(); }

    get BaseEffect() { return this.wrap(this.row.BaseEffect); }
    get BreathEffect() { return this.wrap(this.row.BreathEffect); }
    get CharParamOne() { return this.wrapArray(this.row.CharParamOne); }
    get CharParamTwo() { return this.wrapArray(this.row.CharParamTwo); }
    get CharParamThree() { return this.wrapArray(this.row.CharParamThree); }
    get CharParamFour() { return this.wrapArray(this.row.CharParamZero); }

    get Flags() { return this.wrap(this.row.Flags); }
    get ShakeID() { return this.wrap(this.row.ShakeID); }
    get SoundID() { return this.wrap(this.row.SoundID); }
    get StartAnimID() { return this.wrap(this.row.StartAnimID); }
    get WorldEffect() { return this.wrap(this.row.WorldEffect); }
    get AnimID() { return new SpellAnimation(this, this.row.AnimID); }

    get CharProc() { return this.wrapArray(this.row.CharProc)}

    get ChestEffect() { return this.wrap(this.row.ChestEffect)}
    get HeadEffect() { return this.wrap(this.row.HeadEffect)}
    get LeftHandEffect() { return this.wrap(this.row.LeftHandEffect)}
    get RightHandEffect() { return this.wrap(this.row.RightHandEffect)}
    get RightWeaponEffect() { return this.wrap(this.row.RightWeaponEffect)}
    get SpecialEffect() { return this.wrapArray(this.row.SpecialEffect)}

    get row() {
        if(this.ptr.get()!==0) {
            return DBC.SpellVisualKit.find({ID:this.ptr.get()});
        } else {
            let row = addKitRow(Ids.SpellKit.id());
            this.ptr.set(row.ID.get());
            return row;
        }
    }

    get exists() {
        return this.ptr.get() != 0;
    }

    get Models(): SpellVisualKitModels<T> { return new SpellVisualKitModels(this.owner, this); }

    makeUnique() {
        let id = Ids.SpellKit.id();
        this.row.clone(id);
        this.ptr.set(id);
        this.Models.forEach(x=>x.makeUnique(id));
    }

    cloneFrom(kit: SpellVisualKit<any> | SpellVisualKitRow) {
        let row : SpellVisualKitRow;
        if((kit as SpellVisualKit<any>).exists !== undefined) {
            row = (kit as SpellVisualKit<any>).row;
        } else {
            row = (kit as SpellVisualKitRow);
        }
        this.ptr.set(row.clone(Ids.SpellKit.id()).ID.get());
        return this.owner;
    }
}

export class SpellVisualKits<T> extends Subsystem<SpellVisual<T>> {
    private kit(name: string, kit: DBCIntCell<SpellVisualRow>): SpellVisualKit<T> {
        return new SpellVisualKit(this.owner ,name ,kit);
    }

    protected get row() {
        return this.owner.row;
    }

    objectify() {
        return this.all
            .filter(x=>x.exists)
            .reduce((p,c)=>{p[c.name] = c.objectify(); return p},
                {} as {[key:string]:SpellVisualKit<T>})
    }

    get Cast() { return this.kit("Cast", this.row.CastKit); }
    get State() { return this.kit("State", this.row.StateKit); }
    get Impact() { return this.kit("Impact", this.row.ImpactKit); }
    get Channel() { return this.kit("Channel", this.row.ChannelKit); }
    get Precast() { return this.kit("Precast", this.row.PrecastKit); }
    get StateDone() { return this.kit("StateDone", this.row.StateDoneKit); }
    get ImpactArea() { return this.kit("ImpactArea", this.row.ImpactAreaKit); }
    get InstantArea() { return this.kit("InstantArea", this.row.InstantAreaKit); }
    get CasterImpact() { return this.kit("CasterImpact", this.row.CasterImpactKit); }
    get TargetImpact() { return this.kit("TargetImpact", this.row.TargetImpactKit); }
    get PersistentArea() { return this.kit("PersistentArea", this.row.PersistentAreaKit); }
    get MissileTargeting() { return this.kit("MissileTargeting", this.row.MissileTargetingKit); } 

    clearAll() {
        this.all.forEach(x=>x.clear());
        return this.owner;
    }

    get all() {
        return [
            this.Cast,
            this.State,
            this.Impact,
            this.Channel,
            this.Precast,
            this.StateDone,
            this.ImpactArea,
            this.InstantArea,
            this.CasterImpact,
            this.TargetImpact,
            this.PersistentArea,
            this.MissileTargeting
        ]
    }
}

export class SpellVisual<T> extends Subsystem<T> {
    cell?: Cell<number,any>
    protected _row: SpellVisualRow;

    constructor(owner: T, row: SpellVisualRow, cell?: Cell<number,any>) {
        super(owner);
        this.cell = cell;
        this._row = row;
    }

    objectify() {
        if(this.row===undefined) {
            return {}
        } else {
            return super.objectify();
        }
    }

    get row() { return this._row; }

    get Kits(): SpellVisualKits<T> { return new SpellVisualKits(this); }

    get MissileModel() { return this.ownerWrap(this.row.MissileModel); }
    get MissileAttachment() { return this.ownerWrap(this.row.MissileAttachment); }

    get MissileCastOffset() { 
        return new Vector3(this.owner,
            this.row.MissileCastOffsetX,
            this.row.MissileCastOffsetY,
            this.row.MissileCastOffsetZ)
    }

    get MissileImpactOffset() { 
        return new Vector3(this.owner,
            this.row.MissileImpactOffsetX,
            this.row.MissileImpactOffsetY,
            this.row.MissileImpactOffsetZ)
    }

    /**
     * Makes a copy of all the spell visual data for this spell,
     * allowing you to make separate modifications to it
     * without affecting other spells that share it.
     */
    makeUnique() {
        let row = this.row.clone(Ids.SpellVisual.id());
        if(this.cell) {
            this.cell.set(row.ID.get());
        }
        this.Kits.all.filter(x=>x.exists).forEach(x=>x.makeUnique())
        return this.owner;
    }

    cloneFromVisual(visualId: number) {
        this._row = DBC.SpellVisual.findById(visualId).clone(Ids.SpellVisual.id());
        if(this.cell) {
            this.cell.set(visualId);
        }
        this.Kits.all.filter(x=>x.exists).forEach(x=>x.makeUnique());
    }

    cloneFromSpell(spellId: number) {
        return this.cloneFromVisual(DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
    }
}

export function emptySpellVisualRow(row: SpellVisualRow) {
    row
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
}