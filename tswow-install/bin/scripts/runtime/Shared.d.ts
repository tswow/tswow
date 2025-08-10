import { ModuleEndpoint } from "./Modules";
export declare class Shared {
    readonly mod: ModuleEndpoint;
    get path(): {
        global_d_ts: import("../util/FileTree").WFile;
    } & import("../util/FileTree").WDirectory;
    initialize(): this;
    constructor(mod: ModuleEndpoint);
    static create(mod: ModuleEndpoint): Shared;
}
