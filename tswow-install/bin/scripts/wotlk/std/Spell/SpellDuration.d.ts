import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { SpellDurationQuery, SpellDurationRow } from "../../dbc/SpellDuration";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellDuration extends MainEntity<SpellDurationRow> {
    clear(): this;
    get ID(): number;
    get Duration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DurationPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxDuration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(duration: number, durationPerLevel: number, maxDuration: number): undefined;
}
export declare class SpellDurationRef<T> extends RefDynamic<T, SpellDuration> {
    setSimple(duration: number, durationPerLevel?: number, maxDuration?: number): T;
}
export declare class SpellDurationRegistryClass extends RegistryDynamic<SpellDuration, SpellDurationRow, SpellDurationQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellDurationRef<T>;
    protected Table(): Table<any, SpellDurationQuery, SpellDurationRow> & {
        add: (id: number) => SpellDurationRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellDuration): void;
    protected FindByID(id: number): SpellDurationRow;
    protected EmptyQuery(): SpellDurationQuery;
    ID(e: SpellDuration): number;
    protected Entity(r: SpellDurationRow): SpellDuration;
}
export declare const SpellDurationRegistry: SpellDurationRegistryClass;
