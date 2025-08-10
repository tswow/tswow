import { Cell } from "../../../data/cell/cells/Cell";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { SpellRangeQuery, SpellRangeRow } from "../../dbc/SpellRange";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellRange extends MainEntity<SpellRangeRow> {
    clear(): this;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get NameShort(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HostileMin(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get FriendMin(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get HostileMax(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get FriendMax(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get ID(): number;
    codify(settings: CodegenSettings): string;
    set(hostileMin: number, hostileMax: number, friendMin: number, friendMax: number, name?: loc_constructor, nameShort?: loc_constructor, flags?: number): this;
}
export declare class SpellRangeRef<T> extends RefDynamic<T, SpellRange> {
    setSimple(min: number, max: number, flags?: number): T;
}
export declare class SpellRangeRegistryClass extends RegistryDynamic<SpellRange, SpellRangeRow, SpellRangeQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellRangeRef<T>;
    protected Table(): Table<any, SpellRangeQuery, SpellRangeRow> & {
        add: (id: number) => SpellRangeRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellRange): void;
    protected FindByID(id: number): SpellRangeRow;
    protected EmptyQuery(): SpellRangeQuery;
    ID(e: SpellRange): number;
    protected Entity(r: SpellRangeRow): SpellRange;
}
export declare const SpellRangeRegistry: SpellRangeRegistryClass;
