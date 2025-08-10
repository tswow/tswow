import { Table } from "../../../data/table/Table";
import { LfgDungeonGroupQuery, LfgDungeonGroupRow } from "../../dbc/LfgDungeonGroup";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class LFGDungeonGroup extends MainEntity<LfgDungeonGroupRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get OrderIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Type(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LFGDungeonGroupRegistryClass extends RegistryDynamic<LFGDungeonGroup, LfgDungeonGroupRow, LfgDungeonGroupQuery> {
    protected Table(): Table<any, LfgDungeonGroupQuery, LfgDungeonGroupRow> & {
        add: (id: number) => LfgDungeonGroupRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: LFGDungeonGroup): void;
    protected FindByID(id: number): LfgDungeonGroupRow;
    protected EmptyQuery(): LfgDungeonGroupQuery;
    ID(e: LFGDungeonGroup): number;
    protected Entity(r: LfgDungeonGroupRow): LFGDungeonGroup;
}
export declare const LFGDungeonGroupRegistry: LFGDungeonGroupRegistryClass;
