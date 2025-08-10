import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { AreaTriggerQuery, AreaTriggerRow } from "../../dbc/AreaTrigger";
import { MainEntityID } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RegistryStatic } from "../Refs/Registry";
import { AreaTriggerTavern } from "./AreaTriggerTavern";
import { AreaTriggerTeleport } from "./AreaTriggerTeleport";
export declare class AreaTriggerBase extends MainEntityID<AreaTriggerRow> {
    get ID(): number;
    get Tavern(): AreaTriggerTavern<this>;
    get Teleport(): AreaTriggerTeleport<this>;
    get Position(): PositionMapXYZCell<this>;
    get InlineScripts(): _hidden.AreaTrigger<this>;
}
export declare class AreaTriggerRadius extends AreaTriggerBase {
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class AreaTriggerBoxBox extends CellSystem<AreaTriggerBox> {
    get Length(): import("../../../data/cell/cells/Cell").CellWrapper<number, AreaTriggerBox>;
    get Width(): import("../../../data/cell/cells/Cell").CellWrapper<number, AreaTriggerBox>;
    get Height(): import("../../../data/cell/cells/Cell").CellWrapper<number, AreaTriggerBox>;
    get Yaw(): import("../../../data/cell/cells/Cell").CellWrapper<number, AreaTriggerBox>;
    set(length: number, width: number, height: number, yaw: number): AreaTriggerBox;
}
export declare class AreaTriggerBox extends AreaTriggerBase {
    get Box(): AreaTriggerBoxBox;
}
export declare class AreaTriggerRegistryClass extends RegistryStatic<AreaTriggerBase, AreaTriggerRow, AreaTriggerQuery> {
    protected Table(): Table<any, any, AreaTriggerRow> & {
        add: (id: number) => AreaTriggerRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: AreaTriggerBase, mod: string, id: string): void;
    protected FindByID(id: number): AreaTriggerRow;
    ID(e: AreaTriggerBase): number;
    protected EmptyQuery(): {};
    protected Entity(r: AreaTriggerRow): AreaTriggerBase;
    createRadius(mod: string, id: string, pos: Position, radius: number | Position): AreaTriggerRadius;
    createBox(mod: string, id: string, pos: Position, length: number, width: number, height: number): AreaTriggerBox;
}
export declare const AreaTriggerRegistry: AreaTriggerRegistryClass;
