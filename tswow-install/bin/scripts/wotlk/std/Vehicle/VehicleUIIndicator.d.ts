import { Cell } from "../../../data/cell/cells/Cell";
import { VehicleUIIndSeatRow } from "../../dbc/VehicleUIIndSeat";
import { MainEntity } from "../Misc/Entity";
import { PositionXYCell } from "../Misc/PositionCell";
export declare class VehicleUIIndicatorCell<T> extends Cell<string, T> {
    protected id: Cell<number, any>;
    constructor(owner: T, id: Cell<number, any>);
    get(): string;
    set(value: string): T;
}
export declare class VehicleUIIndSeat extends MainEntity<VehicleUIIndSeatRow> {
    get ID(): number;
    get Texture(): VehicleUIIndicatorCell<this>;
    get VirtualSeatIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Position(): PositionXYCell<this>;
}
