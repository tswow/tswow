import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { MapDifficultyQuery, MapDifficultyRow } from "../../dbc/MapDifficulty";
import { AccessRequirement } from "../AccessRequirement/AccessRequirement";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { DungeonMap } from "./Map";
export declare const DUNGEON_DIFFICULTY_STRINGS: readonly ["DUNGEON_DIFFICULTY_5PLAYER", "DUNGEON_DIFFICULTY_5PLAYER_HEROIC", "RAID_DIFFICULTY_10PLAYER", "RAID_DIFFICULTY_25PLAYER", "RAID_DIFFICULTY_40PLAYER", ""];
export type DungeonDifficultyString = typeof DUNGEON_DIFFICULTY_STRINGS[number];
export type DifficultyType = 'NORMAL' | 'HEROIC';
export declare class PVEDifficultyEnumValue extends CellSystem<PVEDifficulty> {
    protected type: DifficultyType;
    constructor(owner: PVEDifficulty, type: DifficultyType);
    is(): boolean;
    set(): PVEDifficulty;
}
export declare class PVEDifficultyEnum extends CellSystem<PVEDifficulty> {
    get Normal(): PVEDifficultyEnumValue;
    get Heroic(): PVEDifficultyEnumValue;
}
export declare class PVEDifficulty extends MainEntity<MapDifficultyRow> {
    get ID(): number;
    get Difficulty(): PVEDifficultyEnum;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("./Map").Map>;
    get MaxPlayers(): CellBasic<number, this>;
    get ErrorMessage(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ResetDuration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Requirements(): AccessRequirement<this>;
}
export declare class PVEDifficultyRegistryClass extends RegistryStatic<PVEDifficulty, MapDifficultyRow, MapDifficultyQuery> {
    protected Table(): Table<any, MapDifficultyQuery, MapDifficultyRow> & {
        add: (id: number) => MapDifficultyRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(mapdifficulty: PVEDifficulty, mod: string, id: string): void;
    protected FindByID(id: number): MapDifficultyRow;
    ID(e: PVEDifficulty): number;
    protected EmptyQuery(): MapDifficultyQuery;
    protected Entity(r: MapDifficultyRow): PVEDifficulty;
}
export declare const PVEDifficultyRegistry: PVEDifficultyRegistryClass;
export declare class PVEDifficulties extends MultiRowSystem<PVEDifficulty, DungeonMap> {
    protected getAllRows(): PVEDifficulty[];
    protected isDeleted(value: PVEDifficulty): boolean;
    addGet(mod: string, id: string): PVEDifficulty;
    addMod(mod: string, id: string, callback: (difficulty: PVEDifficulty) => void): DungeonMap;
    add(mod: string, id: string, playerCount: number, difficulty: DifficultyType, lockout?: number): DungeonMap;
}
