import { GameObjectDisplayInfoRow } from "../../dbc/GameObjectDisplayInfo";
import { CodegenSettings } from "../Misc/Codegen";
import { ChildEntity, MainEntity } from "../Misc/Entity";
import { GeoBox } from "../Misc/GeoBox";
export declare class GameObjectSounds extends ChildEntity<GameObjectDisplayInfoRow, GameObjectDisplay> {
    get length(): number;
    getId(index: number): number;
    setId(index: number, id: number): GameObjectDisplay;
    freeIndex(): number;
    addId(id: number): GameObjectDisplay;
    get(index: number): import("../Sound/SoundEntry").SoundEntryRef<GameObjectDisplay>;
    add(): import("../Sound/SoundEntry").SoundEntryRef<GameObjectDisplay>;
    clearAll(): GameObjectDisplay;
}
export declare function cleanGameObjectDisplayRow(row: GameObjectDisplayInfoRow): void;
export declare class GameObjectDisplay extends MainEntity<GameObjectDisplayInfoRow> {
    clear(): this;
    get ID(): number;
    get ModelName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Sound(): GameObjectSounds;
    get ObjectEffectPackage(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get GeoBox(): GeoBox<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
