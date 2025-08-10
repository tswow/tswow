import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { SpellVisualEffectNameQuery, SpellVisualEffectNameRow } from "../../dbc/SpellVisualEffectName";
import { SpellVisualKitRow } from "../../dbc/SpellVisualKit";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class VisualScale<T> extends CellSystem<T> {
    protected row: SpellVisualEffectNameRow;
    constructor(owner: T, row: SpellVisualEffectNameRow);
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get Scale(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    set(scale: number, min: number, max: number): T;
}
export declare class SpellVisualEffect extends MainEntity<SpellVisualEffectNameRow> {
    clear(): this;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Filename(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get AreaSize(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Scale(): VisualScale<this>;
    get ID(): number;
    set(filename: string, areaSize: number, scale: number, scaleMin?: number, scaleMax?: number): undefined;
    codify(settings: CodegenSettings): string;
}
export declare class SpellVisualEffectRef<T> extends RefDynamic<T, SpellVisualEffect> {
    setSimple(filename: string, areaSize?: number, scale?: number, scaleMin?: number, scaleMax?: number): T;
}
export declare class SpellVisualEffectRegistryClass extends RegistryDynamic<SpellVisualEffect, SpellVisualEffectNameRow, SpellVisualEffectNameQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellVisualEffectRef<T>;
    protected Table(): Table<any, SpellVisualEffectNameQuery, SpellVisualEffectNameRow> & {
        add: (id: number) => SpellVisualEffectNameRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellVisualEffect): void;
    protected FindByID(id: number): SpellVisualEffectNameRow;
    protected EmptyQuery(): SpellVisualEffectNameQuery;
    ID(e: SpellVisualEffect): number;
    protected Entity(r: SpellVisualEffectNameRow): SpellVisualEffect;
}
export declare const SpellVisualEffectRegistry: SpellVisualEffectRegistryClass;
export declare class SpellVisualEffects<T> extends CellSystem<T> {
    protected row: SpellVisualKitRow;
    constructor(owner: T, row: SpellVisualKitRow);
    forEachValid(callback: (eff: SpellVisualEffect) => void): T;
    get length(): number;
    clearAll(): T;
    clear(index: number): void;
    get(index: number): SpellVisualEffectRef<this>;
    add(): SpellVisualEffectRef<this>;
}
