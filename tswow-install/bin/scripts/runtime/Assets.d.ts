import { ModuleEndpoint } from './Modules';
export declare class Assets {
    mod: ModuleEndpoint;
    get path(): {
        Interface: {
            WorldMap: import("../util/FileTree").WDirectory;
            TAXIFRAME: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
        Textures: {
            Minimap: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
    } & import("../util/FileTree").WDirectory;
    initialize(): this;
    constructor(mod: ModuleEndpoint);
    exists(): boolean;
    static create(mod: ModuleEndpoint): Assets;
}
