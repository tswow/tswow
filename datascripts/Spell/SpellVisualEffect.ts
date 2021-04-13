import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellVisualEffectNameRow } from "wotlkdata/dbc/types/SpellVisualEffectName";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AutoIdGenerator, Ids } from "../Base/Ids";
import { Transient } from "wotlkdata/cell/Transient";
import { SpellVisualKitRow } from "wotlkdata/dbc/types/SpellVisualKit";

export class VisualScale<T> extends Subsystem<T> {
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

export class SpellVisualEffect<T extends BaseSystem> extends SharedRef<T, SpellVisualEffectNameRow> {
    table(): SharedRefTable<SpellVisualEffectNameRow> {
        return DBC.SpellVisualEffectName;
    }

    ids(): AutoIdGenerator {
        return Ids.SpellVisualEffectName;
    }

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

    set(filename: string, areaSize: number, scale: number
        , scaleMin: number = scale, scaleMax: number = scale) {
        this.Filename.set(filename);
        this.AreaSize.set(areaSize);
        this.Scale.set(scale,scaleMin,scaleMax);
        return this.owner;
    }
}

export class SpellVisualEffects<T extends BaseSystem> extends Subsystem<T> {
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
        return new SpellVisualEffect(this, this.wrapIndex(this.row.SpecialEffect, index));
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