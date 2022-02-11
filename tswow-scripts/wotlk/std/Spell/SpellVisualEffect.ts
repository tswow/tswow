import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { DBC } from "../../DBCFiles";
import { SpellVisualEffectNameQuery, SpellVisualEffectNameRow } from "../../dbc/SpellVisualEffectName";
import { SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";

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

export class SpellVisualEffectRef<T> extends RefDynamic<T,SpellVisualEffect> {
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

export class SpellVisualEffectRegistryClass
    extends RegistryDynamic<
          SpellVisualEffect
        , SpellVisualEffectNameRow
        , SpellVisualEffectNameQuery
    >
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellVisualEffectRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellVisualEffectNameQuery, SpellVisualEffectNameRow> & { add: (id: number) => SpellVisualEffectNameRow; } {
        return DBC.SpellVisualEffectName
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellVisualEffectName
    }
    Clear(entity: SpellVisualEffect): void {
        entity.AreaSize.set(0)
              .Filename.set('')
              .Name.set('')
              .Scale.set(1,1,1)
    }
    protected FindByID(id: number): SpellVisualEffectNameRow {
        return DBC.SpellVisualEffectName.findById(id);
    }
    protected EmptyQuery(): SpellVisualEffectNameQuery {
        return {}
    }
    ID(e: SpellVisualEffect): number {
        return e.ID;
    }
    protected Entity(r: SpellVisualEffectNameRow): SpellVisualEffect {
        return new SpellVisualEffect(r);
    }
}

export const SpellVisualEffectRegistry = new SpellVisualEffectRegistryClass()

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
        return SpellVisualEffectRegistry.ref(this, this.wrapIndex(this.row.SpecialEffect, index));
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