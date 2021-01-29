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

function addKitRow(id: number) {
    return DBC.SpellVisualKit.add(id,{
        AnimID: 0,
        BaseEffect: 0,
        BreathEffect: 0,
        CharParamOne: 0,
        CharParamThree: 0,
        CharParamTwo: 0,
        CharParamZero: 0,
        CharProc: 0,
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
        StartAnimID: 0,
        WorldEffect: 0,
    });
}

export class SpellVisualKit extends Subsystem<Spell> {
    protected ptr: DBCIntCell<SpellVisualRow>
    readonly name: string;

    transientFields() {
        return super.transientFields().concat(['ptr']);
    }
    
    static ptr(kit: SpellVisualKit) {
        return kit.ptr;
    }

    constructor(owner: Spell, name: string, ptr: DBCIntCell<SpellVisualRow>) {
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
    get AnimID() { return this.wrap(this.row.AnimID); }

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

    cloneFrom(kit: SpellVisualKit | SpellVisualKitRow) {
        let row : SpellVisualKitRow;
        if((kit as SpellVisualKit).exists !== undefined) {
            row = (kit as SpellVisualKit).row;
        } else {
            row = (kit as SpellVisualKitRow);
        }
        this.ptr.set(row.clone(Ids.SpellKit.id()).ID.get());
        return this.owner;
    }
}

export class SpellVisualKits extends Subsystem<Spell> {
    private kit(name: string, kit: DBCIntCell<SpellVisualRow>) {
        return new SpellVisualKit(this.owner ,name ,kit);
    }

    protected get row() {
        return DBC.SpellVisual.find({
            ID:this.owner.row.SpellVisualID.getIndex(0)
        });
    }

    objectify() {
        return this.all
            .filter(x=>x.exists)
            .reduce((p,c)=>{p[c.name] = c.objectify(); return p},
                {} as {[key:string]:SpellVisualKit})
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

export class SpellVisual extends Subsystem<Spell> {
    constructor(spell: Spell) {
        super(spell);
    }

    objectify() {
        if(this.row===undefined) {
            return {}
        } else {
            return super.objectify();
        }
    }

    get Kits() { return new SpellVisualKits(this.owner); }

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

    get row() {
        return DBC.SpellVisual.find({
            ID:this.owner.row.SpellVisualID.getIndex(0)
        });
    }

    /**
     * Makes a copy of all the spell visual data for this spell,
     * allowing you to make separate modifications to it
     * without affecting other spells that share it.
     */
    makeUnique() {
        if(this.owner.row.SpellVisualID.getIndex(0)===0) {
            return;
        }
        let row = this.row.clone(Ids.SpellVisual.id());
        this.owner.row.SpellVisualID.setIndex(0,row.ID.get())
        this.Kits.all.filter(x=>x.exists)
            .forEach(x=>{
                const kitId = Ids.SpellKit.id();
                x.row.clone(kitId);
                SpellVisualKit.ptr(x).set(kitId);
            });
        return this.owner;
    }

    cloneFrom(spellId: number, makeUnique: boolean = true) {
        this.owner.row.SpellVisualID.setIndex(0,
            DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
        if(makeUnique) {
            this.makeUnique();
        }
    }
}