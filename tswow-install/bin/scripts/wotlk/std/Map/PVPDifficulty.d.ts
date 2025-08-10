import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { PvpDifficultyRow } from "../../dbc/PvpDifficulty";
import { MainEntity } from "../Misc/Entity";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryBase } from "../Refs/RegistryBase";
import { Map } from "./Map";
export declare class PVPDifficulty extends MainEntity<PvpDifficultyRow> {
    get Map(): import("../Refs/Ref").RefNoCreate<this, Map>;
    get Levels(): MinMaxCell<this>;
    get Difficulty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class PVPDifficultyRegistryClass extends RegistryBase<PVPDifficulty, PvpDifficultyRow> {
    protected getAll(): PVPDifficulty[];
    protected Entity(r: PvpDifficultyRow): PVPDifficulty;
    ID(e: PVPDifficulty): number;
    create(mod: string, name: string, map: number): PVPDifficulty;
    createSimple(mod: string, name: string, map: number, minLevel: number, maxLevel: number, difficulty: number): PVPDifficulty;
}
export declare const PVPDifficultyRegistry: PVPDifficultyRegistryClass;
export declare class PVPDifficulties extends MultiRowSystem<PVPDifficulty, Map> {
    protected getAllRows(): PVPDifficulty[];
    protected isDeleted(value: PVPDifficulty): boolean;
    addGet(mod: string, name: string): PVPDifficulty;
    add(mod: string, name: string, minLevel: number, maxLevel: number, difficulty?: number): Map;
}
