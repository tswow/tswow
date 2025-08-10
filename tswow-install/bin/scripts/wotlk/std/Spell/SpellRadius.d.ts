import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { SpellRadiusQuery, SpellRadiusRow } from "../../dbc/SpellRadius";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellRadius extends MainEntity<SpellRadiusRow> {
    clear(): this;
    get ID(): number;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RadiusPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RadiusMax(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(radius: number, radiusPerLevel: number, radiusMax: number): undefined;
    copyFrom(radius: SpellRadius): void;
}
export declare class SpellRadiusRef<T> extends RefDynamic<T, SpellRadius> {
    setSimple(base: number, perLevel?: number, max?: number): T;
}
export declare class SpellRadiusRegistryClass extends RegistryDynamic<SpellRadius, SpellRadiusRow, SpellRadiusQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellRadiusRef<T>;
    protected Table(): Table<any, SpellRadiusQuery, SpellRadiusRow> & {
        add: (id: number) => SpellRadiusRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellRadius): void;
    protected FindByID(id: number): SpellRadiusRow;
    protected EmptyQuery(): SpellRadiusQuery;
    ID(e: SpellRadius): number;
    protected Entity(r: SpellRadiusRow): SpellRadius;
}
export declare const SpellRadiusRegistry: SpellRadiusRegistryClass;
