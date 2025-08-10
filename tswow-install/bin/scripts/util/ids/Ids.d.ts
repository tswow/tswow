export declare class IdRange {
    readonly low: number;
    readonly high: number;
    readonly name: string;
    readonly mod: string;
    readonly table: string;
    readonly isNew: boolean;
    touched: boolean;
    constructor(isNew: boolean, table: string, mod: string, name: string, low: number, high: number);
    offset(offset: number): number;
    contains(entry: IdRange): boolean;
    get size(): number;
    get fullName(): string;
    equals(range: IdRange): boolean;
}
declare class Table {
    entries: {
        [id: string]: IdRange;
    };
}
export declare function iterateIds(callback: (range: IdRange) => any): void;
export declare class IdPrivate {
    protected static flushMemory(): void;
    protected static writeFile(filename: string): Promise<void>;
    protected static readFile(filename: string): void;
    protected static getMappings(): {
        [table: string]: Table;
    };
}
export declare function GetId(table: string, mod: string, name: string, startid?: number): number;
export declare function GetIdRange(table: string, mod: string, name: string, size: number, startid?: number): IdRange;
export declare function GetExistingIdRange(table: string, mod: string, name: string): IdRange;
export declare function GetExistingId(table: string, mod: string, name: string): number;
export declare function GetTempId(table: string, startId: number): number;
export {};
