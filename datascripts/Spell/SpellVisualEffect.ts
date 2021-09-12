import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellVisualEffectNameRow } from "wotlkdata/dbc/types/SpellVisualEffectName";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Ids } from "../Misc/Ids";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";
import { MainEntity } from "../Misc/Entity";
import { Ref } from "../Refs/Ref";

export class VisualScale<T> extends CellSystem<T> {
    @Transient
    protected row: SpellVisualEffectNameRow;

    constructor(owner: T, row: SpellVisualEffectNameRow) {
        super(owner);
        this.row = row;
    }

    get Min() { return this.ownerWrap(this.row.MinAllowedScale); }
    get Max() { return this.ownerWrap(this.row.MaxAllowedScale); }
    get Scale() { return this.ownerWrap(this.row.Scale); }

    set(scale: number, min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        this.Scale.set(scale);
        return this.owner;
    }
}

export class SpellVisualEffect extends MainEntity<SpellVisualEffectNameRow> {
    clear(): this {
        this.Name.set("")
            .Filename.set("")
            .AreaSize.set(0)
            .Scale.set(0,0,0)
        return this;
    }
    get Name() { return this.wrap(this.row.Name); }
    get Filename() { return this.wrap(this.row.FileName); }
    get AreaSize() { return this.wrap(this.row.AreaEffectSize); }
    get Scale() { return new VisualScale(this, this.row); }
    get ID() { return this.row.ID.get(); }

    set(filename: string, areaSize: number, scale: number
        , scaleMin: number = scale, scaleMax: number = scale) {
        this.Filename.set(filename);
        this.AreaSize.set(areaSize);
        this.Scale.set(scale,scaleMin,scaleMax);
        return this.owner;
    }
}

export class SpellVisualEffectPointer<T> extends Ref<T,SpellVisualEffect> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellVisualEffect {
        return new SpellVisualEffect(DBC.SpellVisualEffectName.add(Ids.SpellVisualEffectName.id()))
    }
    protected clone(): SpellVisualEffect {
        return new SpellVisualEffect(this.resolve().row.clone(Ids.SpellVisualEffectName.id()));
    }
    protected id(v: SpellVisualEffect): number {
        return v.row.ID.get()
    }
    protected resolve(): SpellVisualEffect {
        return new SpellVisualEffect(DBC.SpellVisualEffectName.findById(this.cell.get()));
    }

    setSimple(filename: string, areaSize = 1, scale = 1, scaleMin = 0.0099, scaleMax = 100) {
        let v = this.getRefCopy();
        v
            .Name.set(`__simple_spell_visual_effect_${v.row.ID.get()}`)
            .Filename.set(filename)
            .AreaSize.set(areaSize)
            .Scale.set(scale,scaleMin,scaleMax);
        return this.owner;
    }
}

export class SpellVisualEffects<T> extends CellSystem<T> {
    @Transient
    protected row: SpellVisualKitRow;

    constructor(owner: T, row: SpellVisualKitRow) {
        super(owner);
        this.row = row;
    }

    get length() { return 3; }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.row.SpecialEffect.setIndex(0,0);
        }
        return this.owner;
    }

    clear(index: number) {
        this.row.SpecialEffect.setIndex(index,0);
    }

    get(index: number) {
        return new SpellVisualEffectPointer(this, this.wrapIndex(this.row.SpecialEffect, index));
    }

    add() {
        for(let i=0;i<this.length;++i) {
            if(this.row.SpecialEffect.getIndex(i)===0) {
                return this.get(i);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }
}