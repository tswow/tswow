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
    
    static ptr(kit: SpellVisualKit) {
        return kit.ptr;
    }

    constructor(owner: Spell, name: string, ptr: DBCIntCell<SpellVisualRow>) {
        super(owner);
        this.ptr = ptr;
        this.name = name;
    }

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

    protected get row() {
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
        let row = this.row.clone(Ids.SpellVisual.id());
        this.owner.row.SpellVisualID.setIndex(0,row.ID.get())
        this.Kits.all.filter(x=>x.exists)
            .forEach(x=>{
                const kitId = Ids.SpellKit.id();
                addKitRow(kitId);
                SpellVisualKit.ptr(x).set(kitId);
            });
        return this.owner;
    }
}