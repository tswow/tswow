import { Cell } from '../cell/cells/Cell';
import { CellSystem } from '../cell/systems/CellSystem';
export type EditType = 'before' | 'after' | 'replace';
export type Match = number | RegExp | string;
export declare class Edit {
    readonly type: EditType;
    readonly line: number;
    text: string;
    readonly sortIndex: number;
    constructor(type: EditType, line: number, text: string, sortIndex: number);
    toCell<T>(owner: T): EditCell<T>;
}
export declare class EditCell<T> extends Cell<string, T> {
    private edit;
    constructor(owner: T, edit: Edit);
    set(value: string): T;
    get(): string;
}
export declare class EditSystem<T> extends CellSystem<T> {
    protected edit: Edit;
    constructor(owner: T, edit: Edit);
}
export declare class WrappedResult {
    rows: string[];
    constructor(rows: string[]);
    getRow(row: number): string;
}
export declare class TextFile {
    private _sourceLines;
    readonly filename: string;
    private edits;
    private moddedInPlace;
    constructor(filename: string, text: string);
    /**
     * @warn calling this multiple times for the same file leads to a race!
     */
    modInPlace(callback: (source: string) => string): void;
    static _sort(file: TextFile): void;
    static _applyWrap(file: TextFile): WrappedResult;
    static _apply(file: TextFile): string[];
    static _write(file: TextFile, outpath: string): void;
    /**
     * Copy of the source lines in this LUAXML File
     */
    get lines(): string[];
    getRow(row: number): string;
    private verifyRowNo;
    /**
     * Finds a row based on a string or regex match. Used by all other edit functions
     * @param match
     */
    findRow(match: Match): number;
    /**
     * Inserts a new row before a matching row.
     * @param match Match to find the row to insert before
     * @param text Text to be inserted before the matching row
     */
    before(match: Match, text: string): Edit;
    private oldEdit;
    /**
     * Inserts a new row after a matching row.
     * @param match Match to find the row to insert after
     * @param text Text to be inserted after the matching row
     */
    after(match: Match, text: string): Edit;
    /**
     * Returns a new replacement object without overwriting the old one
     * @param match
     */
    emptyReplace(match: Match): Edit;
    /**
     * Replaces a row with new text
     * @param match Match to find the row to replace
     * @param text Text to replace with
     * @throws if this row was already replaced with text not identical to text
     */
    replace(match: Match, text: string): Edit;
}
