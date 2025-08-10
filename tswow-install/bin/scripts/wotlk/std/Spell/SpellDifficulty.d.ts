import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { SpellDifficultyQuery, SpellDifficultyRow } from "../../dbc/SpellDifficulty";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellDifficulty extends MainEntity<SpellDifficultyRow> {
    clear(): this;
    get ID(): number;
    get Normal10Man(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Normal25Man(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Heroic10Man(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Heroic25Man(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    set(normal10Man: number, normal25Man: number, heroic10Man: number, heroic25Man: number): undefined;
}
export declare class SpellDifficultyRef<T> extends RefDynamic<T, SpellDifficulty> {
    setSimple(normal10: number, normal25?: number, heroic10?: number, heroic25?: number): T;
}
export declare class SpellDifficultyRegistryClass extends RegistryDynamic<SpellDifficulty, SpellDifficultyRow, SpellDifficultyQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellDifficultyRef<T>;
    protected Table(): Table<any, SpellDifficultyQuery, SpellDifficultyRow> & {
        add: (id: number) => SpellDifficultyRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellDifficulty): void;
    protected FindByID(id: number): SpellDifficultyRow;
    protected EmptyQuery(): SpellDifficultyQuery;
    ID(e: SpellDifficulty): number;
    protected Entity(r: SpellDifficultyRow): SpellDifficulty;
}
export declare const SpellDifficultyRegistry: SpellDifficultyRegistryClass;
