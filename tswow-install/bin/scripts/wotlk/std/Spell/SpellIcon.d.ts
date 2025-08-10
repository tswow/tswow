import { Cell } from "../../../data/cell/cells/Cell";
export declare function pathToIcon(path: string): import("../../dbc/SpellIcon").SpellIconRow;
export declare function iconToPath(index: number): Cell<string, any>;
export declare class SpellIconCell<T> extends Cell<number, T> {
    protected id: Cell<number, any>;
    constructor(owner: T, id: Cell<number, any>);
    getPath(): string;
    /**
     * Sets this spell icon to a full provided path, which may or may not be located under Interface\Icons.
     * @param value
     */
    setFullPath(value: string): T;
    /**
     * Sets this spell icon to the provided path under the default location Interface\Icons.
     *
     * @param value
     */
    setPath(value: string): T;
    get(): number;
    set(id: number): T;
}
