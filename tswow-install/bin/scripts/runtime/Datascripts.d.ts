import { ConfigFile } from "../util/ConfigFile";
import { Dataset } from "./Dataset";
import { ModuleEndpoint } from "./Modules";
type TypeGeneration = 'none' | 'startup' | 'watch';
export declare class DatascriptsConfig extends ConfigFile {
    protected description(): string;
    protected _dependencies: string[];
    get Dependencies(): string[];
    TypeGeneration: TypeGeneration;
}
export declare class Datascripts {
    mod: ModuleEndpoint;
    config: DatascriptsConfig;
    get path(): {
        global_d_ts: import("../util/FileTree").WFile;
        index: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        datascripts_conf: import("../util/FileTree").WFile;
        build: {
            package_json: import("../util/FileTree").WFile;
        } & import("../util/FileTree").WDirectory;
        swcrc: import("../util/FileTree").WFile;
    } & import("../util/FileTree").WDirectory;
    logName(): any;
    installLibrary(): void;
    initialize(): this;
    constructor(mod: ModuleEndpoint);
    exists(): boolean;
    symlink(): void;
    compile(): void;
    compileTypes(declare: boolean): void;
    static all(): Datascripts[];
    static create(mod: ModuleEndpoint): Datascripts;
    static installWowLib(): void;
    static initialize(): void;
    static build(dataset: Dataset, args?: string[]): Promise<void>;
}
export {};
