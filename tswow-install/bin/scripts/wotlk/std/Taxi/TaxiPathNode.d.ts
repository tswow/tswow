import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { TaxiPathNodeRow } from "../../dbc/TaxiPathNode";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RefUnknown } from "../Refs/Ref";
import { TaxiNodeConstructor, TaxiPath } from "./Taxi";
export declare enum TaxiPathNodeFlags {
    MAP_CHANGE = 1,
    SHOULD_STOP = 2
}
export declare class TaxiPathNode extends MainEntity<TaxiPathNodeRow> {
    get ID(): number;
    get Position(): PositionMapXYZCell<this>;
    get ArrivalEvent(): RefUnknown<this>;
    get DepartureEvent(): RefUnknown<this>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof TaxiPathNodeFlags>;
    get Delay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class TaxiPathNodes extends MultiRowSystem<TaxiPathNode, TaxiPath> {
    protected getAllRows(): TaxiPathNode[];
    protected isDeleted(value: TaxiPathNode): boolean;
    private makeNode;
    insert(index: number, pos: TaxiNodeConstructor): this;
    push(poses: TaxiNodeConstructor | TaxiNodeConstructor[]): this;
    objectify(options?: ObjectifyOptions): {
        map: number;
        x: number;
        y: number;
        z: number;
        delay: number;
        flags: number;
        ArrivalEventId: number;
        DepartureEventId: number;
        ID: number;
    }[];
}
