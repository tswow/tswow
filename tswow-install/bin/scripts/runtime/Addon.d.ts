import { Dataset } from "./Dataset";
import { ModuleEndpoint } from "./Modules";
export declare class Addon {
    mod: ModuleEndpoint;
    get path(): {
        beforelib_toc: import("../util/FileTree").WFile;
        before_toc: import("../util/FileTree").WFile;
        after_toc: import("../util/FileTree").WFile;
        module_toc: import("../util/FileTree").WFile;
        index_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        global_d_ts: import("../util/FileTree").WFile;
        build: {
            lualib_bundle_lua: import("../util/FileTree").WFile;
            lib: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
    } & import("../util/FileTree").WDirectory;
    addFilelistToToc(tocFile: string[]): void;
    logName(): any;
    build(dataset: Dataset): Promise<void>;
    initialize(): this;
    constructor(mod: ModuleEndpoint);
    static create(mod: ModuleEndpoint): Addon;
    exists(): boolean;
    static all(): Addon[];
    static updateAddons(dataset: Dataset): void;
    static build(dataset: Dataset): Promise<void>;
    static clearDevBuild(): void;
    static initialize(): void;
}
