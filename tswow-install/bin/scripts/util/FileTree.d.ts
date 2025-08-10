export type FilePath = WNode | string;
export declare function resfp(pathIn: FilePath): string;
export declare class WNode {
    protected path: string;
    constructor(path: string | WNode);
    relativeToParent(parent: string): this;
    isSymlink(): boolean;
    withExtension(newExtension: string, removeOld?: boolean): this;
    protected construct(pathIn: string): this;
    includes(value: string): boolean;
    filter(callback: (v: WNode) => void): this[];
    ctime(): Date;
    mtime(): Date;
    mtimeMs(): number;
    abs(slashType?: 'UNCHANGED' | 'FORWARD' | 'BACKWARD'): this;
    substring(start: number, end?: number): string;
    toLowerCase(): this;
    toUpperCase(): this;
    match(regex: RegExp): RegExpMatchArray;
    get length(): number;
    split(str: string | RegExp): string[];
    startsWith(start: string): boolean;
    endsWith(ending: string): boolean;
    relativeTo(pathIn: string | WNode): this;
    relativeFrom(pathIn: string | WNode): this;
    dirname(): WDirectory;
    doIn(callback: (pathIn: this) => any): Promise<void>;
    concat(...strings: string[]): WNode;
    join(...paths: (WNode | string)[]): this;
    basename(parent?: number): this;
    copy(dest: WNode | string, flushFolders?: boolean): this;
    copyOnNoTarget(dest: WNode): this;
    get(): string;
    exists(): boolean;
    isFile(): boolean;
    isDirectory(): boolean;
    toFile(): WFile;
    toDirectory(): WDirectory;
    unlink(): void;
    remove(): boolean;
    protected toString(): string;
    protected toJson(): string;
}
export type Overwrite = 'OVERWRITE' | 'DONT_OVERWRITE';
export declare class WFile extends WNode {
    protected construct(pathIn: string): this;
    extension(): string;
    writeBuffer(buffer: Buffer, encoding?: BufferEncoding, overwrite?: Overwrite): boolean;
    append(text: string): void;
    write(text: string, overwrite?: Overwrite): boolean;
    writeJson(obj: any, indents?: number, overwrite?: Overwrite): boolean;
    readBuffer(def?: Buffer): Buffer;
    readString(def?: string): string;
    readJson(def?: any): any;
    read(): Buffer;
    read(encoding: BufferEncoding): string;
    lastEdited(): Date;
}
export declare class WDirectory extends WNode {
    protected construct(pathIn: string): this;
    containsFile(file: string): boolean;
    readDir(rel?: 'RELATIVE' | 'ABSOLUTE'): WNode[];
    remove(): boolean;
    lastEdited(): Date;
    mkdir(): void;
    iterateDef(callback: (node: WNode) => 'HALT' | 'ENDPOINT' | void): void;
    iterate(rec: 'RECURSE' | 'FLAT', targets: 'FILES' | 'DIRECTORIES' | 'BOTH', pathType: 'RELATIVE' | 'FULL' | 'ABSOLUTE', callback: (node: WNode) => 'HALT' | 'ENDPOINT' | void): void;
}
export declare class WDynDirectory<T> {
    protected path: string;
    protected callback: (p: string) => any;
    constructor(path: string, callback: (p: string) => any);
    pick(name: string): WDirectory & T;
    all(): (WNode & T)[];
}
export declare function custom<T>(callback: (value: string) => T): T;
export declare function dynCustom<T>(callback: (pathIn: string, nameIn: string) => T): WDynDirectory<T>;
export declare function dir<T>(value: T): T & WDirectory;
export declare function dirn<T>(name: string, value: T): T & WDirectory;
export declare function dynfile(callback: (name: string) => string): (name: string) => WFile;
export declare function multifile(names: string[]): WFile[];
export declare function file(name: string): WFile;
export declare function dyndir<T>(callback: (key: string) => T): WDynDirectory<T>;
export type EnumType<T, Type> = {
    [Property in keyof Type]: T;
};
export declare function enumDir<T, S, U extends keyof EnumType<T, S>>(key: S, callback: (key: U) => T): WDynDirectory<T>;
export declare function generateTree<T>(pathIn: string, tree: T, nameIn?: string): T;
