import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { player_levelstatsRow } from "../../../sql/player_levelstats";
import { MainEntity } from "../../Misc/Entity";
import { ClassRacePair } from "./ClassRaces";
export declare class ClassRaceStatsEntry extends MainEntity<player_levelstatsRow> {
    get Race(): import("../../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Class(): import("../../Refs/Ref").RefReadOnlyTT<this, import("../Class").Class, typeof import("../ClassIDs").ClassIDs>;
    get Level(): number;
    get Strength(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Agility(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Stamina(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Intellect(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Spirit(): import("../../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ClassRaceStats extends MultiRowSystem<ClassRaceStatsEntry, ClassRacePair> {
    protected getAllRows(): ClassRaceStatsEntry[];
    protected isDeleted(value: ClassRaceStatsEntry): boolean;
}
