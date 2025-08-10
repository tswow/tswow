import { Cell, CellWrapper } from "../../../data/cell/cells/Cell";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { SQLCell, SQLCellReadOnly } from "../../../data/sql/SQLCell";
import { CodegenSettings } from "../Misc/Codegen";
import { DynamicIDGenerator } from "../Misc/Ids";
import { PercentUnit } from "../Misc/PercentCell";
export interface LootRowBase {
    readonly Entry: SQLCellReadOnly<number, any>;
    readonly Item: SQLCellReadOnly<number, any>;
    Reference: SQLCell<number, any>;
    Chance: SQLCell<number, any>;
    QuestRequired: SQLCell<number, any>;
    LootMode: SQLCell<number, any>;
    GroupId: SQLCell<number, any>;
    MinCount: SQLCell<number, any>;
    MaxCount: SQLCell<number, any>;
    clone(id: number, item: number): any;
}
export interface LootTable {
    queryAll(search: {
        Entry: number;
    }): LootRowBase[];
    add(id: number, item: number): LootRowBase;
}
export declare class LootSet extends CellSystemTop {
    protected table: LootTable;
    protected id: number;
    get ID(): number;
    get rows(): LootRowBase[];
    private add;
    codify(settings: CodegenSettings): string;
    addMod(item: number, callback: (row: LootRowBase) => void): this;
    addItem(item: number, chance: number | [number, PercentUnit], minCount: number, maxCount: number, quest?: boolean, groupId?: number, lootMode?: number): this;
    addReference(table: number, chance: number | [number, PercentUnit], lootMode?: number): this;
    constructor(id: number, table: LootTable);
}
export declare class LootSetRef<T> extends CellSystem<T> {
    protected lootSet: LootSet;
    constructor(owner: T, lootSet: LootSet);
    get(): LootSet;
    mod(callback: (set: LootSet) => void): T;
}
export declare class LootSetPointer<T> extends CellWrapper<number, T> {
    protected table: LootTable;
    protected gen: DynamicIDGenerator;
    constructor(owner: T, cell: Cell<number, any>, table: LootTable, gen: DynamicIDGenerator);
    exists(): boolean;
    getRef(): LootSet;
    modRef(callback: (table: LootSet) => void): T;
    getRefCopy(): LootSet;
    modRefCopy(callback: (table: LootSet) => void): T;
}
export declare const Loot: {
    Fishing: {
        create(area: number): LootSet;
        load(id: number): LootSet;
    };
    Creature: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
    GameObject: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
    Disenchant: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
    Pickpocket: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
    Skinning: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
    Reference: {
        ref<T>(owner: T, cell: Cell<number, any>): LootSetPointer<T>;
        create(): LootSet;
        load(id: number): LootSet;
    };
};
