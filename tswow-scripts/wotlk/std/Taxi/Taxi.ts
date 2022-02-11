import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { TaxiPathQuery, TaxiPathRow } from "../../dbc/TaxiPath";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { MoneyCell } from "../Misc/MoneyCell";
import { Position } from "../Misc/Position";
import { RefNoCreate, SelfRef } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { TaxiEndNode, TaxiEndNodeRegistry } from "./TaxiEndNode";
import { TaxiPathNodes } from "./TaxiPathNode";

const ALLIANCE_DEFAULT_MOUNT = 541;
const HORDE_DEFAULT_MOUNT = 2224;

export class TaxiPath extends MainEntity<TaxiPathRow> {
    get ID() { return this.row.ID.get(); }
    get Start() {
        return TaxiEndNodeRegistry.readOnlyRef(this, this.row.FromTaxiNode);
    }
    get End() {
        return TaxiEndNodeRegistry.readOnlyRef(this, this.row.ToTaxiNode);
    }
    get Nodes(): TaxiPathNodes { return new TaxiPathNodes(this); }
    get Cost() {  return new MoneyCell(this, 'COPPER', this.row.Cost) }

    delete() {
        if(this.isDeleted()) return this;
        this.row.delete();
        this.Nodes.forEach(x=>x.row.delete());
        return this;
    }

    undelete() {
        // if we undelete a taxi path,
        // we need to undelete its nodes and path nodes
        this.Start.getRef().undelete();
        this.End.getRef().undelete();
        this.Nodes.forEach(x=>x.row.undelete());
        return this;
    }

    isDeleted() {
        return this.row.isDeleted();
    }
}

export class TaxiBiPath extends CellSystemTop {
    protected _forward: TaxiPath;
    protected _backward: TaxiPath;

    constructor(forward: TaxiPath, backward: TaxiPath) {
        super()
        this._forward = forward;
        this._backward = backward;
    }

    get ForwardPath() { return new SelfRef(this, ()=>this._forward)}
    get BackwardPath() { return new SelfRef(this, ()=>this._backward)}

    get StartNode() { return new SelfRef(this, ()=>this._forward.Start.getRef()); }
    get EndNode() { return new SelfRef(this, ()=>this._forward.End.getRef()); }

    get StartName() { return this.wrapLoc(this.StartNode.get().Name)}
    get EndName() { return this.wrapLoc(this.EndNode.get().Name)}
}

export type TaxiNodeConstructor = Position & {
    arrival_event?: number,
    departure_event?: number,
    delay?: number,
    teleports?: boolean
}

type TaxiPathType = 'PLAIN'|'FLIGHTPATH'

export class TaxiPathRegistryClass
    extends RegistryRowBase<TaxiPath,TaxiPathRow,TaxiPathQuery>
{

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Entity(r: TaxiPathRow): TaxiPath {
        return new TaxiPath(r);
    }
    protected FindByID(id: number): TaxiPathRow {
        return DBC.TaxiPath.findById(id);
    }
    protected EmptyQuery(): TaxiPathQuery {
        return {}
    }
    ID(e: TaxiPath): number {
        return e.ID
    }
    protected Table(): Table<any, TaxiPathQuery, TaxiPathRow> & { add: (id: number) => TaxiPathRow; } {
        return DBC.TaxiPath
    }
    protected IDs(): StaticIDGenerator {
        return Ids.TaxiPath
    }

    private insertNodes(
          forward: TaxiPath
        , backward: TaxiPath|undefined
        , sliceFirst: boolean
        , nodes: TaxiNodeConstructor[]
    ) {
        let fwdSliced = nodes
        if(sliceFirst) fwdSliced = nodes.slice(1)
        forward.Nodes.push(fwdSliced);

        if(backward) {
            let backSliced = nodes.reverse()
            if(sliceFirst) backSliced.slice(1);
            backward.Nodes.push(backSliced);
        }
    }

    private getId(mod: string, id: string, type: TaxiPathType) {
        return type === 'FLIGHTPATH' ? Ids.TaxiNodesFlightpath.id(mod,id) : Ids.TaxiNodesPlain.id(mod,id)
    }

    private createStartEnd(mod: string, id: string, start: number, end: number, cost: number, bidirectional: boolean) {
        if((start >= 2048) != (end >= 2048)) {
            let fp    = start >= 2048 ? end : start;
            let nonfp = start >= 2048 ? start : end;
            throw new Error(
                  `Tried connecting flight path node ${fp} with plain node ${nonfp},`
                + ` this is not possible.`
                + ` Please do not mix flightpath/non-flightpath nodes.`
                + ` (you have next to unlimited non-flightpath node ids, just make extra!)`
            )
        }

        return {
              forward:
                new TaxiPath(DBC.TaxiPath.add(Ids.TaxiPath.id(mod,id))
                    .FromTaxiNode.set(start)
                    .ToTaxiNode.set(end)
                    .Cost.set(cost)
                )
            , backward: !bidirectional ? undefined
                : new TaxiPath(
                    DBC.TaxiPath.add(Ids.TaxiPath.id(mod,`${id}-backwards`))
                        .FromTaxiNode.set(end)
                        .ToTaxiNode.set(start)
                        .Cost.set(cost)
                )

        }
    }

    /**
     * Creates a complete path
     * @returns
     */
    private create(
          mod: string
        , id: string
        , type: TaxiPathType
        , cost: number
        , mount: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst: boolean
        , bidirectional: boolean
    ) {
        if(vertices.length < 2) {
            throw new Error(`Taxi paths must be made up of at least two vertices`);
        }

        if(mount === 0) {
            mount = [HORDE_DEFAULT_MOUNT,ALLIANCE_DEFAULT_MOUNT];
        }

        if(typeof(mount) == 'number') {
            mount = [mount,mount];
        }

        let start = new TaxiEndNode(DBC.TaxiNodes.add(this.getId(mod,`${id}-node-1`,type)))
            .Position.set(vertices[0])
            .Mount.Horde.set(mount[0])
            .Mount.Alliance.set(mount[1])

        let end = new TaxiEndNode(DBC.TaxiNodes.add(this.getId(mod,`${id}-node-2`,type)))
            .Position.set(vertices[vertices.length-1])
            .Mount.Horde.set(mount[0])
            .Mount.Alliance.set(mount[1])

        let {forward,backward} =
            this.createStartEnd(mod,id,start.ID,end.ID,cost,bidirectional)

        this.insertNodes(forward,backward,sliceFirst,vertices);
        return {forward,backward};
    }

    private createFromNode(
          mod: string
        , id: string
        , type: TaxiPathType
        , startNode: number
        , cost: number
        , endMount: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst: boolean
        , bidirectional: boolean
    ) {
        let start = new TaxiEndNode(DBC.TaxiNodes.findById(startNode));
        if(endMount === 0) {
            endMount = [start.Mount.Horde.get()||HORDE_DEFAULT_MOUNT,start.Mount.Alliance.get()||ALLIANCE_DEFAULT_MOUNT];
        }

        if(typeof(endMount) == 'number') {
            endMount = [endMount,endMount];
        }

        let end = new TaxiEndNode(DBC.TaxiNodes.add(this.getId(mod,`${id}-node`,type)))
            .Position.set(vertices[vertices.length-1])
            .Mount.Horde.set(endMount[0])
            .Mount.Alliance.set(endMount[1])

        let {forward,backward} =
            this.createStartEnd(mod,id,start.ID,end.ID,cost,bidirectional)

        vertices.unshift(start.Position.toPosition())
        this.insertNodes(forward,backward,sliceFirst,vertices);
        return {forward,backward};
    }

    private createBetweenNodes(
          mod: string
        , id: string
        , startNode: number
        , endNode: number
        , cost: number
        , vertices: TaxiNodeConstructor[]
        , sliceFirst: boolean
        , bidirectional: boolean
    ) {
        let start = new TaxiEndNode(DBC.TaxiNodes.findById(startNode));
        let end = new TaxiEndNode(DBC.TaxiNodes.findById(endNode))
        let {forward,backward} = this.createStartEnd(mod,id,startNode,endNode,cost,bidirectional)
        vertices.unshift(start.Position.toPosition())
        vertices.push(end.Position.toPosition())
        this.insertNodes(forward,backward,sliceFirst,vertices);
        return {forward,backward};
    }

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
    createUni(
          mod: string
        , id: string
        , type: TaxiPathType
        , costs: number
        , mounts: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst = true
    ) {
        return this.create
        (
            mod,id,type,costs,mounts,vertices,sliceFirst,false
        ).forward
    }

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
    createUniFromNode(
          mod: string
        , id: string
        , type: TaxiPathType
        , startNode: number
        , cost: number
        , endMount: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst = true
    ) {
        return this.createFromNode
        (
            mod,id,type,startNode,cost,endMount,vertices,sliceFirst,false
        ).forward
    }

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
    createUniBetweenNodes(
          mod: string
        , id: string
        , startNode: number
        , endNode: number
        , cost: number
        , vertices: TaxiNodeConstructor[]
        , sliceFirst = true
    ) {
        return this.createBetweenNodes
        (
            mod,id,startNode,endNode,cost,vertices,sliceFirst,false
        ).forward
    }

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
    createBi(
          mod: string
        , id: string
        , type: TaxiPathType
        , costs: number
        , mounts: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst = true
        ) {
            const {forward,backward} = this.create
            (
                mod,id,type,costs,mounts,vertices,sliceFirst,true
            )
            return new TaxiBiPath(forward,backward as TaxiPath);
        }

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
    createBiFromNode(
          mod: string
        , id: string
        , type: TaxiPathType
        , startNode: number
        , cost: number
        , endMount: number|[number,number]
        , vertices: TaxiNodeConstructor[]
        , sliceFirst: boolean = true
    ) {
        const {forward,backward} = this.createFromNode
        (
            mod,id,type,startNode,cost,endMount,vertices,sliceFirst,true
        )
        return new TaxiBiPath(forward,backward as TaxiPath);
    }

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
    createBiBetweenNodes(
          mod: string
        , id: string
        , startNode: number
        , endNode: number
        , cost: number
        , vertices: TaxiNodeConstructor[]
        , sliceFirst: boolean = true
    ) {
        const {forward,backward} = this.createBetweenNodes
        (
            mod,id,startNode,endNode,cost,vertices,sliceFirst,true
        ) as {forward:TaxiPath,backward:TaxiPath}
        return new TaxiBiPath(forward,backward as TaxiPath);
    }
}

export const TaxiPathRegistry = new TaxiPathRegistryClass();