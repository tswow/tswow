import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { TaxiNodesQuery, TaxiNodesRow } from "../../dbc/TaxiNodes";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RegistryStatic } from "../Refs/Registry";
export declare class TaxiNodeMount extends CellSystem<TaxiEndNode> {
    get Horde(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, TaxiEndNode>;
    get Alliance(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, TaxiEndNode>;
    set(both: number): TaxiEndNode;
}
export declare class TaxiEndNode extends MainEntity<TaxiNodesRow> {
    get Position(): PositionMapXYZCell<this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Mount(): TaxiNodeMount;
    get ID(): number;
    delete(): this;
    isDeleted(): boolean;
    undelete(): this;
}
export declare class TaxiEndNodeRegistryClass extends RegistryStatic<TaxiEndNode, TaxiNodesRow, TaxiNodesQuery> {
    protected IDs(): StaticIDGenerator;
    protected Table(): Table<any, TaxiNodesQuery, TaxiNodesRow> & {
        add: (id: number) => TaxiNodesRow;
    };
    Clear(entity: TaxiEndNode): void;
    protected FindByID(id: number): TaxiNodesRow;
    protected EmptyQuery(): TaxiNodesQuery;
    ID(e: TaxiEndNode): number;
    protected Entity(r: TaxiNodesRow): TaxiEndNode;
}
export declare const TaxiEndNodeRegistry: TaxiEndNodeRegistryClass;
