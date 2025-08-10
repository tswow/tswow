import { waypointsRow } from "../../sql/waypoints";
import { MainEntity } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { PositionXYZOCell } from "../Misc/PositionCell";
export type ScriptPathPosition = Position & {
    delay?: number;
};
export declare class Waypoint extends MainEntity<waypointsRow> {
    get Position(): PositionXYZOCell<this>;
    get index(): number;
}
export declare class ScriptPath {
    protected pathId: number;
    constructor(pathId: number);
    get ID(): number;
    get length(): number;
    get(): Waypoint[];
    first(): Waypoint;
    last(): Waypoint;
    add(points: ScriptPathPosition | ScriptPathPosition[]): this;
}
