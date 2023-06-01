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
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DBCIntCell } from "../../../data/dbc/DBCCell";
import { Table } from "../../../data/table/Table";
import { SpellVisualQuery, SpellVisualRow } from "../../dbc/SpellVisual";
import { SpellVisualKitQuery, SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { SpellVisualKitModelAttachRow } from "../../dbc/SpellVisualKitModelAttach";
import { DBC } from "../../DBCFiles";
import { Attachment } from "../Misc/Attachment";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { PositionXYZCell } from "../Misc/PositionCell";
import { Substruct } from "../Misc/Substruct";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
import { SpellAnimation } from "./SpellAnimation";
import { SpellCharacterProcedures } from "./SpellCharacterProcedure";
import { SpellEffectCameraShakeRegistry } from "./SpellEffectCameraShakes";
import { SpellVisualEffect, SpellVisualEffectRef, SpellVisualEffectRegistry, SpellVisualEffects } from "./SpellVisualEffect";

export enum SpellVisualKitFlags {
    LOOP_ANIMATION = 0x40
}

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
    get Flags() { return makeMaskCell32(SpellVisualKitFlags, this, this.row.Flags, false); }
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

    addBothHands(callback: (eff: SpellVisualEffect) => void)
    {
        let eff = SpellVisualEffectRegistry.create();
        callback(eff);
        this.LeftHandEffect.set(eff.ID);
        this.RightHandEffect.set(eff.ID);
        return this;
    }
    
    addBothWeapons(callback: (eff: SpellVisualEffect) => void)
    {
        let eff = SpellVisualEffectRegistry.create();
        callback(eff);
        this.LeftWeaponEffect.set(eff.ID);
        this.RightWeaponEffect.set(eff.ID);
        return this;
    }

    get RightWeaponEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.RightWeaponEffect)
    }

    get LeftWeaponEffect() {
        return SpellVisualEffectRegistry.ref(this, this.row.LeftWeaponEffect)
    }

    get SpellEffects() {
        return new SpellVisualEffects(this, this.row);
    }
    get Models(): SpellVisualKitModels {
        return new SpellVisualKitModels(this);
    }

    codify(settings: CodegenSettings)
    {
        return GenerateCode(settings,'std.SpellVisualKits.create()',code=>{
            const simple_effect = (name: string, ref: SpellVisualEffectRef<this>)=>{
                if(ref.get())
                {
                    code.begin_block(`.${name}.modRefCopy(x=>x`)
                    code.substruct(ref.getRef(),settings);
                    code.end_block(')')
                    return;
                }
            }

            const double_effect = (fnName: string, name1: string, name2: string, ref1: SpellVisualEffectRef<this>, ref2: SpellVisualEffectRef<this>) =>
            {
                if(ref1.get() === ref2.get())
                {
                    if(ref1.get() === 0)
                    {
                        return;
                    }
                    code.begin_block(`.${fnName}(x=>x`)
                    code.substruct(ref1.getRef(),settings);
                    code.end_block(')')
                }
                else
                {
                    simple_effect(name1,ref1);
                    simple_effect(name2,ref2);
                }
            }

            double_effect('addBothHands','LeftHandEffect','RightHandEffect',this.LeftHandEffect,this.RightHandEffect)
            double_effect('addBothWeapons','LeftWeaponEffect','RightWeaponEffect',this.LeftWeaponEffect,this.RightWeaponEffect)
            simple_effect('BaseEffect',this.BaseEffect)
            simple_effect('BreathEffect',this.BreathEffect)
            simple_effect('ChestEffect',this.ChestEffect)
            simple_effect('HeadEffect',this.HeadEffect)
            simple_effect('WorldEffect',this.WorldEffect)

            code.line(`.CameraShake.set(${this.CameraShake.get()})`)
            code.line(`.Flags.set(${this.Flags.get()})`)
            code.line(`.Sound.set(${this.Sound.get()})`)
            this.CharProcedures.forEachValid((proc) => {
                code.begin_block(`.CharProcedures.addMod(x=>x`)
                code.line(`.Type.${proc.Type.objectify()}.set()`)
                if(proc.Type.CHAIN.is())
                {
                    let chain = proc.Type.CHAIN.as();
                    code.non_def_num('Forever',chain.Forever);
                    code.non_def_num('TargetCount',chain.TargetCount);
                    if(chain.ChainEffect.get())
                    {
                        code.begin_block('.ChainEffect.modRefCopy(x=>x')
                        let chainObj = chain.ChainEffect.getRef().objectify();
                        for(let key in chainObj)
                        {
                            if(key === 'ID')
                            {
                                continue;
                            }

                            if(key == 'Combo' || key == 'Texture')
                            {
                                code.line(`.${key}.set('${chainObj[key].split('\\').join('\\\\')}')`)
                            }
                            else
                            {
                                code.line(`.${key}.set(${chainObj[key]})`)
                            }
                        }
                        code.end_block(')')
                    }
                }
                else
                {
                    let obj = proc.objectify();
                    for(let key in obj)
                    {
                        if(key !== 'Type')
                        {
                            code.line(`.${key}.set(${obj[key]})`)
                        }
                    }
                }
                code.end_block(`)`)
            })
            this.SpellEffects.forEachValid((eff)=>{
                code.begin_block(`.SpellEffects.add().modRefCopy(x=>x`)
                code.substruct(eff,settings)
                code.end_block('');
            })
            code.enum_line('Animation',this.Animation)
            code.enum_line('StartAnimation',this.StartAnimation)
        })
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

export class MissileFollowGround<T> extends Substruct<T,SpellVisual> {
    get Height() { return this.ownerWrap(this.realOwner.row.MissileFollowGroundHeight); }
    get DropSpeed() { return this.ownerWrap(this.realOwner.row.MissileFollowGroundDropSpeed); }
    get Approach() { return this.ownerWrap(this.realOwner.row.MissileFollowGroundApproach); }
    get Flags() { return this.ownerWrap(this.realOwner.row.MissileFollowGroundFlags); }

    set(height: number, dropSpeed: number, groundApproach: number, groundFlags: number) {
        this.Height.set(height)
        this.DropSpeed.set(dropSpeed);
        this.Approach.set(groundApproach);
        this.Flags.set(groundFlags);
        return this.owner;
    }

    mod(callback: (ent: MissileFollowGroundCB)=>void): T
    {
        callback(new MissileFollowGroundCB(this.realOwner))
        return this.owner;
    }
}

export class MissileFollowGroundCB extends MissileFollowGround<MissileFollowGroundCB>
{
    constructor(owner: SpellVisual)
    {
        super(undefined,owner);
        this.injectThis(this);
    }
}

export class SpellVisualMissile<T> extends Substruct<T,SpellVisual> {
    get DestinationAttachment() {
        return this.ownerWrap(this.realOwner.row.MissileDestinationAttachment);
    }
    get Sound() {
        return SoundEntryRegistry.ref(this.owner, this.realOwner.row.MissileSound);
    }
    get FollowGround() { return new MissileFollowGround(this.owner,this.realOwner); }
    get HasMissile() { return this.ownerWrap(this.realOwner.row.HasMissile); }
    get Model() { return SpellVisualEffectRegistry.ref(this.owner, this.realOwner.row.MissileModel); }

    get Attachment() { return this.ownerWrap(this.realOwner.row.MissileAttachment); }

    get CastOffset() {
        return new PositionXYZCell(this.owner,
            this.realOwner.row.MissileCastOffsetX,
            this.realOwner.row.MissileCastOffsetY,
            this.realOwner.row.MissileCastOffsetZ)
    }

    get ImpactOffset() {
        return new PositionXYZCell(this.owner,
            this.realOwner.row.MissileImpactOffsetX,
            this.realOwner.row.MissileImpactOffsetY,
            this.realOwner.row.MissileImpactOffsetZ)
    }

    mod(callback: (vis: SpellVisualMissileCB)=>void): T
    {
        callback(new SpellVisualMissileCB(this.realOwner));
        return this.owner;
    }
}

export class SpellVisualMissileCB extends SpellVisualMissile<SpellVisualMissileCB>
{
    constructor(vis: SpellVisual)
    {
        super(undefined,vis);
        this.injectThis(this);
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

    // @ts-ignore
    AllKits(): {name: string, ref: RefDynamic<SpellVisual,SpellVisualKit>}[] {
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
        }).map(([row,name])=>({name,ref:SpellVisualKitRegistry.ref(this, row)}));
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

    get Missile() { return new SpellVisualMissile(this, this); }

    cloneFromVisual(visualId: number) {
        let row = DBC.SpellVisual.findById(visualId).clone(Ids.SpellVisual.id());
        row.copyTo(this.row);
        return this.owner;
    }

    cloneFromSpell(spellId: number) {
        return this.cloneFromVisual(DBC.Spell.findById(spellId).SpellVisualID.getIndex(0));
    }

    codify(settings: CodegenSettings)
    {
        return GenerateCode(settings,'std.SpellVisuals.create()',(code)=>{
            if(this.Missile.HasMissile.get())
            {
                code.begin_block(`.Missile.mod(x=>x`)
                code.line(`.HasMissile.set(${this.Missile.HasMissile.get()})`)
                code.line(`.Attachment.set(${this.Missile.Attachment.get()})`)
                code.lowercase('CastOffset',this.Missile.CastOffset);
                code.line(`.DestinationAttachment.set(${this.Missile.DestinationAttachment.get()})`)
                code.line(`.Model.set(${this.Missile.Model.get()})`)
                code.line(`.Sound.set(${this.Missile.Sound.get()})`)
                code.begin_block('.FollowGround.mod(x=>x')
                code.line(`.Approach.set(${this.Missile.FollowGround.Approach.get()})`)
                code.line(`.DropSpeed.set(${this.Missile.FollowGround.DropSpeed.get()})`)
                code.line(`.Flags.set(${this.Missile.FollowGround.Flags.get()})`)
                code.line(`.Height.set(${this.Missile.FollowGround.Height.get()})`)
                code.end_block(')')
                code.end_block(`)`)
            }

            this.AllKits().forEach(({name,ref})=>{
                let kit = ref.getRef();
                code.begin_block(`.${name}Kit.modRefCopy(x=>x`)
                code.substruct(kit,settings);
                code.end_block(`)`)
            })
        })
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