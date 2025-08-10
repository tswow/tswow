import { BuildType } from "../util/BuildType";
import { ConfigFile } from "../util/ConfigFile";
import { WFile, WDirectory } from "../util/FileTree";
import { Dataset } from "./Dataset";
import { ModuleEndpoint } from "./Modules";
export declare class LiveScriptsConfig extends ConfigFile {
    protected description(): string;
    Backend: 'lua' | 'c++';
    InlineScripts: boolean;
    FilteredPaths: string;
}
export declare class Livescripts {
    readonly mod: ModuleEndpoint;
    readonly config: LiveScriptsConfig;
    get path(): {
        global_d_ts: WFile;
        tsconfig: WFile;
        entry: WFile;
        livecripts_conf: WFile;
        built_library: WFile;
        built_pdb: WFile;
        build: {
            dataset: import("../util/FileTree").WDynDirectory<{
                lua: WDirectory;
                built_libs: import("../util/FileTree").WDynDirectory<{
                    library: WFile;
                    pdb: WFile;
                }>;
                cpp: {
                    livescripts: WDirectory;
                    cmakelists_txt: WFile;
                } & WDirectory;
                lib: WDirectory;
            }>;
        } & WDirectory;
    } & WDirectory;
    constructor(mod: ModuleEndpoint);
    static create(mod: ModuleEndpoint): Livescripts;
    logName(): any;
    private getCacheFile;
    private getSourceFiles;
    private hasSourcesChanged;
    private updateCache;
    initialize(): this;
    private buildLua;
    private buildCxx;
    private luaInstallPath;
    private cxxInstallPath;
    build(dataset: Dataset, buildType: BuildType, args?: string[]): Promise<void>;
    exists(): boolean;
    static all(): Livescripts[];
    static initialize(): void;
}
