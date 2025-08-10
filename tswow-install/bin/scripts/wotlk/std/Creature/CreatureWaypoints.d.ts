import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Position } from "../Misc/Position";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureWaypoints extends CellSystem<CreatureTemplate> {
    get(): import("../../sql/waypoints").waypointsRow[];
    add(point: Position): CreatureTemplate;
}
