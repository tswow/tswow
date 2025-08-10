import { FilePath, WNode } from "./FileTree";
export declare class ChangeMap<T> {
    constructor(filepath: string);
    beginCache(): void;
    endCache(): void;
    doCached(callback: () => void): void;
    read(filepath: string): T;
    write(filepath: string, value: T): void;
    clear(): void;
    protected values: {
        [filepath: string]: T;
    };
    protected filepath: string;
    protected cached: boolean;
    protected changed: boolean;
    protected save(): void;
}
export declare class FileChangeModule {
    readonly filepath: string;
    protected hashes: ChangeMap<string>;
    protected modifies: ChangeMap<number>;
    constructor(name: string);
    beginCache(): void;
    endCache(): void;
    doCached(callback: (self: this) => void): void;
    writeIfChanged(filepath: FilePath, value: Buffer, encoding?: BufferEncoding): any;
    writeIfChanged(filepath: FilePath, value: string): any;
    isChanged(input: FilePath): boolean;
    markChanged(input: FilePath): void;
    onChangedAny(input: FilePath[], outputs: string[], callback: (inputs: FilePath[]) => void): void;
    onChanged(input: FilePath, outputs: (string | (() => boolean))[], callback: (filepath: WNode) => void): void;
}
