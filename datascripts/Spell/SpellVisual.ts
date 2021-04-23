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
import { Ids, AutoIdGenerator } from "../Misc/Ids";
import { Vector3 } from "wotlkdata/cell/systems/Vector3"
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";
import { SpellAnimation } from "./SpellAnimation";
import { SpellVisualKitModelAttachRow } from "wotlkdata/dbc/types/SpellVisualKitModelAttach";
import { Attachment } from "../Misc/Attachment";
import { Vec3 } from "../Misc/Vec3";
import { SpellVisualEffect, SpellVisualEffects } from "./SpellVisualEffect";
import { Cell } from "wotlkdata/cell/Cell";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SoundEntry } from "../sound/SoundEntry";
import { SpellEffectCameraShakes } from "./SpellEffectCameraShakes";
import { SpellCharacterProcedures } from "./SpellCharacterProcedure";

export class SpellVisualKitModelAttach<T> extends Subsystem<T> {

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
    get Effect() { return new SpellVisualEffect(this, [this.row.SpellVisualEffectNameID]) }
}

export class SpellVisualKitModels<T> extends Subsystem<SpellVisualKit<T>> {
    constructor(owner: SpellVisualKit<T>) {
        super(owner);
    }

    add() : SpellVisualKitModelAttach<SpellVisualKit<T>> {
        let row = DBC.SpellVisualKitModelAttach.add(Ids.SpellVisualKitModelAttach.id())
        row.ParentSpellVisualKitID.set(this.owner.ID);
        return new SpellVisualKitModelAttach(this.owner,row);
    }

    get() {
        return DBC.SpellVisualKitModelAttach.filter({ParentSpellVisualKitID: this.owner.ID})
            .map(x=>new SpellVisualKitModelAttach(this.owner, x));
    }

    forEach(callback: (value: SpellVisualKitModelAttach<SpellVisualKit<T>>)=>void) {
        this.get().forEach(callback);
    }
}

export class SpellVisualKit<T> extends SharedRef<T,SpellVisualKitRow> {
    table(): SharedRefTable<SpellVisualKitRow> {
        return DBC.SpellVisualKit;
    }

    ids(): AutoIdGenerator {
        return Ids.SpellKit;
    }
    
    clear(): this {
        this.Animation.set(0)
            .BaseEffect.setID(0)
            .BreathEffect.setID(0)
            .CharProcedures.clearAll()
            .ChestEffect.setID(0)
            .Flags.set(0)
            .HeadEffect.setID(0)
            .LeftHandEffect.setID(0)
            .RightHandEffect.setID(0)
            .RightWeaponEffect.setID(0)
            .CameraShake.setID(0)
            .Sound.setID(0)
            .SpellEffects.clearAll()
            .StartAnimation.set(-1)
            .WorldEffect.setID(0)
            // TODO: Actually remove the rows
            .Models.forEach(x=>x.row.ParentSpellVisualKitID.set(0))
        return this;
    }

    readonly name: string;

    static ptr(kit: SpellVisualKit<any>) {
        return kit.cell;
    }

    constructor(owner: T, ptr: Cell<number,any>, name: string) {
        super(owner, [ptr]);
        this.name = name;
    }

    get BaseEffect() { return new SpellVisualEffect(this, this.row.BaseEffect); }
    get BreathEffect() { return new SpellVisualEffect(this, this.row.BreathEffect); }
    get CharProcedures() { return new SpellCharacterProcedures(this, this.row); }
    get Flags() { return this.wrap(this.row.Flags); }
    get CameraShake() { return new SpellEffectCameraShakes(this, this.row.ShakeID); }
    get Sound() { return new SoundEntry(this, this.row.SoundID); }
    get StartAnimation() { return new SpellAnimation(this, this.row.StartAnimID); }
    get WorldEffect() { return new SpellVisualEffect(this, this.row.WorldEffect); }
    get Animation() { return new SpellAnimation(this, this.row.AnimID); }
    get ChestEffect() { return new SpellVisualEffect(this, this.row.ChestEffect)}
    get HeadEffect() { return new SpellVisualEffect(this, this.row.HeadEffect)}
    get LeftHandEffect() { return new SpellVisualEffect(this, this.row.LeftHandEffect)}
    get RightHandEffect() { return new SpellVisualEffect(this, this.row.RightHandEffect)}
    get RightWeaponEffect() { return new SpellVisualEffect(this, this.row.RightWeaponEffect)}
    get SpellEffects() { return new SpellVisualEffects(this, this.row); }
    get Models(): SpellVisualKitModels<T> { return new SpellVisualKitModels(this); }

    cloneFrom(kit: SpellVisualKit<any>) {
        let id = kit.row.clone(Ids.SpellKit.id()).ID.get();
        this.cell.set(id);
        return this.owner;
    }
}

export class SpellVisual<T> extends SharedRef<T, SpellVisualRow> {
    constructor(owner: T, ptrs: Cell<number,any>[]) {
        super(owner,ptrs);
    }

    table(): SharedRefTable<SpellVisualRow> {
        return DBC.SpellVisual;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellVisual;
    }
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

    private kit(name: string, kit: DBCIntCell<SpellVisualRow>): SpellVisualKit<SpellVisual<T>> {
        return new SpellVisualKit(this,kit, name);
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
        }).map(([row,name])=>new SpellVisualKit(this, row, name));
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

    get MissileModel() { return new SpellVisualEffect(this, this.row.MissileModel); }
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

    cloneFromVisual(visualId: number) {
        let row = DBC.SpellVisual.findById(visualId).clone(Ids.SpellVisual.id());
        this.cell.set(row.ID.get());
        return this.owner;
    }

    cloneFromSpell(spellId: number) {
        return this.cloneFromVisual(DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
    }
}