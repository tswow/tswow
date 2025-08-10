import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { WorldStateUIQuery, WorldStateUIRow } from "../../dbc/WorldStateUI";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { RegistryDynamic } from "../Refs/Registry";
import { WorldState } from "./WorldState";
export declare class WorldStateLocation extends CellSystem<WorldStateUI> {
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, WorldStateUI>;
    get Area(): import("../../../data/cell/cells/Cell").CellWrapper<number, WorldStateUI>;
    set(map?: number, area?: number): WorldStateUI;
}
export type CapturePointString = 'CAPTUREPOINT' | '';
export declare class WorldStateUICapturePoint extends CellSystem<WorldStateUI> {
    get Enabled(): import("../../../data/cell/cells/Cell").CellWrapper<CapturePointString, WorldStateUI>;
    get FactionVar(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, WorldStateUI>;
    get GrayPercentVar(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, WorldStateUI>;
    get UnkVar(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, WorldStateUI>;
    set(enabled: CapturePointString, factionVar?: WorldState | number, grayPercentVar?: WorldState | number, unkVar?: WorldState | number): WorldStateUI;
}
export declare enum WorldStateType {
    DEFAULT = 0,
    BATTLEGROUND_FIELD = 2
}
export declare class WorldStateUI extends MainEntity<WorldStateUIRow> {
    get ID(): number;
    get Location(): WorldStateLocation;
    get Icon(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get PhaseShift(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get String(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Tooltip(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get DynamicIcon(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get DynamicTooltip(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ExtendedUI(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof WorldStateType>;
    get Variable(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Capture(): WorldStateUICapturePoint;
    get ExtendedUIVariable(): SingleArraySystem<number, this>;
}
export declare class WorldStateUIRegistryClass extends RegistryDynamic<WorldStateUI, WorldStateUIRow, WorldStateUIQuery> {
    protected Table(): Table<any, WorldStateUIQuery, WorldStateUIRow> & {
        add: (id: number) => WorldStateUIRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldStateUI): void;
    protected FindByID(id: number): WorldStateUIRow;
    protected EmptyQuery(): WorldStateUIQuery;
    ID(e: WorldStateUI): number;
    protected Entity(r: WorldStateUIRow): WorldStateUI;
}
export declare const WorldStateUIRegistry: WorldStateUIRegistryClass;
