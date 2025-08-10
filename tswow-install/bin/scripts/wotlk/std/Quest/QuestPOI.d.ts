import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { quest_poiRow } from "../../sql/quest_poi";
import { quest_poi_pointsRow } from "../../sql/quest_poi_points";
import { MainEntity } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { PositionXYCell } from "../Misc/PositionCell";
import { WorldMapArea } from "../Worldmap/WorldMapArea";
import { Quest } from "./Quest";
export declare class QuestPOIPoint extends MainEntity<quest_poi_pointsRow> {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, Quest>;
    get Index(): number;
    get Position(): PositionXYCell<this>;
}
export declare class QuestPOIPoints extends MultiRowSystem<QuestPOIPoint, QuestPOI> {
    protected getAllRows(): QuestPOIPoint[];
    protected isDeleted(value: QuestPOIPoint): boolean;
    add(values: Position[]): QuestPOI;
}
export declare class QuestPOI extends MainEntity<quest_poiRow> {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, Quest>;
    get Index(): number;
    get ObjectiveIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get WorldMapArea(): import("../Refs/Ref").RefDynamic<this, WorldMapArea>;
    get Floor(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Priority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Points(): QuestPOIPoints;
}
export declare class QuestPOIs extends MultiRowSystem<QuestPOI, Quest> {
    protected getAllRows(): QuestPOI[];
    add(objective: number, points: Position[], worldMapArea?: number): Quest;
    protected isDeleted(value: QuestPOI): boolean;
}
