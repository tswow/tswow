import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { TaxiPathQuery, TaxiPathRow } from "../../dbc/TaxiPath";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { MoneyCell } from "../Misc/MoneyCell";
import { Position } from "../Misc/Position";
import { RefNoCreate, SelfRef } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { TaxiEndNode } from "./TaxiEndNode";
import { TaxiPathNodes } from "./TaxiPathNode";
export declare class TaxiPath extends MainEntity<TaxiPathRow> {
    get ID(): number;
    get Start(): import("../Refs/Ref").RefReadOnly<this, TaxiEndNode>;
    get End(): import("../Refs/Ref").RefReadOnly<this, TaxiEndNode>;
    get Nodes(): TaxiPathNodes;
    get Cost(): MoneyCell<this>;
    delete(): this;
    undelete(): this;
    isDeleted(): boolean;
}
export declare class TaxiBiPath extends CellSystemTop {
    protected _forward: TaxiPath;
    protected _backward: TaxiPath;
    constructor(forward: TaxiPath, backward: TaxiPath);
    get ForwardPath(): SelfRef<this, TaxiPath>;
    get BackwardPath(): SelfRef<this, TaxiPath>;
    get StartNode(): SelfRef<this, TaxiEndNode>;
    get EndNode(): SelfRef<this, TaxiEndNode>;
    get StartName(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get EndName(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
}
export type TaxiNodeConstructor = Position & {
    arrival_event?: number;
    departure_event?: number;
    delay?: number;
    teleports?: boolean;
};
type TaxiPathType = 'PLAIN' | 'FLIGHTPATH';
export declare class TaxiPathRegistryClass extends RegistryRowBase<TaxiPath, TaxiPathRow, TaxiPathQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, TaxiPath>;
    protected Entity(r: TaxiPathRow): TaxiPath;
    protected FindByID(id: number): TaxiPathRow;
    protected EmptyQuery(): TaxiPathQuery;
    ID(e: TaxiPath): number;
    protected Table(): Table<any, TaxiPathQuery, TaxiPathRow> & {
        add: (id: number) => TaxiPathRow;
    };
    protected IDs(): StaticIDGenerator;
    private insertNodes;
    private getId;
    private createStartEnd;
    /**
     * Creates a complete path
     * @returns
     */
    private create;
    private createFromNode;
    private createBetweenNodes;
    /**
     * Creating a new unidirectional (one-way) path between two new
     * endpoints.
     *
     * @param type       - Whether this path can be traversed as a flight path.
     *                     flight path nodes cannot connect to non-flight path
     *                     nodes.
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param endMount   - The mount displayed when traveling from the new
     *                     endpoint.
     *
     * @param vertices   - All the vertices, including both start and end
     *                     endpoints.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createUni(mod: string, id: string, type: TaxiPathType, costs: number, mounts: number | [number, number], vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiPath;
    /**
     * Creates a new unidirectional (one-way) path starting from an existing
     * endpoint and ending at a new endpoint.
     *
     * @param type       - Whether this path can be traversed as a flight path.
     *                     flight path nodes cannot connect to non-flight path
     *                     nodes.
     *
     * @param startNode  - The node to start this new path from. The
     *                     vertices should have its first point closest
     *                     to this endpoint, but should not include it.
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param endMount   - The mount displayed when traveling from the new
     *                     endpoint.
     *
     * @param vertices   - All the vertices, including the new endpoint but
     *                     excluding the `startNode`. The first element
     *                     should be the one closest to `startNode`.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createUniFromNode(mod: string, id: string, type: TaxiPathType, startNode: number, cost: number, endMount: number | [number, number], vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiPath;
    /**
     * Creates a new unidirectional (one-way) path between two existing nodes.
     *
     * @param startNode  - The ID of an existing taxi endpoint
     *
     * @param endNode    - The ID of an existing taxi endpoint
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param vertices   - All the vertices between the endpoints.
     *                     Should go from 'start' to 'end'.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createUniBetweenNodes(mod: string, id: string, startNode: number, endNode: number, cost: number, vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiPath;
    /**
     * Creating a new bidirectional (two-way) path between two new
     * endpoints.
     *
     * @param type       - Whether this path can be traversed as a flight path.
     *                     flight path nodes cannot connect to non-flight path
     *                     nodes.
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param endMount   - The mount displayed when traveling from the new
     *                     endpoint.
     *
     * @param vertices   - All the vertices, including both start and end
     *                     endpoints.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createBi(mod: string, id: string, type: TaxiPathType, costs: number, mounts: number | [number, number], vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiBiPath;
    /**
     * Creates a new bidirectional (two-way) path starting from an existing
     * endpoint and ending at a new endpoint.
     *
     * @param type       - Whether this path can be traversed as a flight path.
     *                     flight path nodes cannot connect to non-flight path
     *                     nodes.
     *
     * @param startNode  - The node to start this new path from. The
     *                     vertices should have its first point closest
     *                     to this endpoint, but should not include it.
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param endMount   - The mount displayed when traveling from the new
     *                     endpoint.
     *
     * @param vertices   - All the vertices, including the new endpoint but
     *                     excluding the `startNode`. The first element
     *                     should be the one closest to `startNode`.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createBiFromNode(mod: string, id: string, type: TaxiPathType, startNode: number, cost: number, endMount: number | [number, number], vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiBiPath;
    /**
     * Creates a new bi-directional (two-way) path between two existing nodes.
     *
     * @param startNode  - The ID of an existing taxi endpoint
     *
     * @param endNode    - The ID of an existing taxi endpoint
     *
     * @param cost       - The cost for traversing this path in a flightpath
     *
     * @param vertices   - All the vertices between the endpoints.
     *                     Should go from 'start' to 'end'.
     *
     * @param sliceFirst - Whether to remove the start nodes from the
     *                     actual path. You usually want this with both
     *                     flightpaths and scripted taxis, but not
     *                     ships or boats (transports).
     */
    createBiBetweenNodes(mod: string, id: string, startNode: number, endNode: number, cost: number, vertices: TaxiNodeConstructor[], sliceFirst?: boolean): TaxiBiPath;
}
export declare const TaxiPathRegistry: TaxiPathRegistryClass;
export {};
