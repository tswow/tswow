import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { SpellCastTimesQuery, SpellCastTimesRow } from "../../dbc/SpellCastTimes";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellCastTime extends MainEntity<SpellCastTimesRow> {
    clear(): this;
    get Base(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Minimum(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(base: number, perLevel: number, minimum: number): undefined;
    get ID(): number;
}
export declare class SpellCastTimeRef<T> extends RefDynamic<T, SpellCastTime> {
    setSimple(base: number, perLevel?: number, minimum?: number): T;
}
export declare class SpellCastTimeRegistryClass extends RegistryDynamic<SpellCastTime, SpellCastTimesRow, SpellCastTimesQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellCastTimeRef<T>;
    protected Table(): Table<any, SpellCastTimesQuery, SpellCastTimesRow> & {
        add: (id: number) => SpellCastTimesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellCastTime): void;
    protected FindByID(id: number): SpellCastTimesRow;
    protected EmptyQuery(): SpellCastTimesQuery;
    ID(e: SpellCastTime): number;
    protected Entity(r: SpellCastTimesRow): SpellCastTime;
}
export declare const SpellCastTimeRegistry: SpellCastTimeRegistryClass;
