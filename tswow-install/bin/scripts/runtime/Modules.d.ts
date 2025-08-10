import { commands } from '../util/Commands';
import { WDirectory } from '../util/FileTree';
import { Addon } from './Addon';
import { Assets } from './Assets';
import { Datascripts } from './Datascripts';
import { Datasets } from './Dataset';
import { Tests } from './Tests';
import { Livescripts } from './Livescripts';
import { Realms } from './Realm';
import { Shared } from './Shared';
declare const initializedEndpoints: readonly ["datascripts", "livescripts", "addon", "shared", "lua"];
type EndpointType = typeof initializedEndpoints[number];
export declare class ModuleEndpoint {
    readonly mod: Module;
    readonly subdir: string;
    constructor(mod: Module, subdir: string);
    endpoints(): ModuleEndpoint[];
    get subId(): string;
    get relativePath(): {
        addon: {
            beforelib_toc: import("../util/FileTree").WFile;
            before_toc: import("../util/FileTree").WFile;
            after_toc: import("../util/FileTree").WFile;
            module_toc: import("../util/FileTree").WFile;
            index_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            global_d_ts: import("../util/FileTree").WFile;
            build: {
                lualib_bundle_lua: import("../util/FileTree").WFile;
                lib: WDirectory;
            } & WDirectory;
        } & WDirectory;
        datascripts: {
            global_d_ts: import("../util/FileTree").WFile;
            index: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            datascripts_conf: import("../util/FileTree").WFile;
            build: {
                package_json: import("../util/FileTree").WFile;
            } & WDirectory;
            swcrc: import("../util/FileTree").WFile;
        } & WDirectory;
        livescripts: {
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig: import("../util/FileTree").WFile;
            entry: import("../util/FileTree").WFile;
            livecripts_conf: import("../util/FileTree").WFile;
            built_library: import("../util/FileTree").WFile;
            built_pdb: import("../util/FileTree").WFile;
            build: {
                dataset: import("../util/FileTree").WDynDirectory<{
                    lua: WDirectory;
                    built_libs: import("../util/FileTree").WDynDirectory<{
                        library: import("../util/FileTree").WFile;
                        pdb: import("../util/FileTree").WFile;
                    }>;
                    cpp: {
                        livescripts: WDirectory;
                        cmakelists_txt: import("../util/FileTree").WFile;
                    } & WDirectory;
                    lib: WDirectory;
                }>;
            } & WDirectory;
        } & WDirectory;
        tests: {
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            test_conf: import("../util/FileTree").WFile;
            package_json: import("../util/FileTree").WFile;
            mocharc_json: import("../util/FileTree").WFile;
            tests: {
                example_test_ts: import("../util/FileTree").WFile;
                utils_test_ts: import("../util/FileTree").WFile;
            } & WDirectory;
            bin: {
                tests: WDirectory;
            } & WDirectory;
        } & WDirectory;
        lua: {
            example: import("../util/FileTree").WFile;
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            _inline: WDirectory;
        } & WDirectory;
        shared: {
            global_d_ts: import("../util/FileTree").WFile;
        } & WDirectory;
        snippets: WDirectory;
        datasets: {
            dataset: import("../util/FileTree").WDynDirectory<{
                Buildings: WDirectory;
                Cameras: WDirectory;
                Crashes: WDirectory;
                dbc: WDirectory;
                dbc_source: WDirectory;
                dbc_temp: {
                    dbc: WDirectory;
                } & WDirectory;
                lib: {
                    lua: WDirectory;
                    include_lua: WDirectory;
                } & WDirectory;
                luaxml: {
                    Interface: {
                        FrameXML: {
                            framexml_toc: import("../util/FileTree").WFile;
                            TSAddons: {
                                mod: import("../util/FileTree").WDynDirectory<{}>;
                            } & WDirectory;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
                luaxml_source: {
                    Interface: {
                        FrameXML: {
                            framexml_toc: import("../util/FileTree").WFile;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
                maps: WDirectory;
                mmaps: WDirectory;
                vmaps: WDirectory;
                config: import("../util/FileTree").WFile;
                ids_txt: import("../util/FileTree").WFile;
                modules_txt: import("../util/FileTree").WFile;
                world_sql: import("../util/FileTree").WFile;
            } & WDirectory>;
        } & WDirectory;
        realms: {
            realm: import("../util/FileTree").WDynDirectory<{
                worldserver_conf: import("../util/FileTree").WFile;
                worldserver_conf_dist: import("../util/FileTree").WFile;
                config: import("../util/FileTree").WFile;
                realm_id: import("../util/FileTree").WFile;
                core_config: (name: string) => import("../util/FileTree").WFile;
            } & WDirectory>;
        } & WDirectory;
        assets: {
            Interface: {
                WorldMap: WDirectory;
                TAXIFRAME: WDirectory;
            } & WDirectory;
            Textures: {
                Minimap: WDirectory;
            } & WDirectory;
        } & WDirectory;
        livescript_tsconfig_temp: import("../util/FileTree").WFile;
    } & WDirectory;
    get fullName(): string;
    get realms(): Realms;
    get datasets(): Datasets;
    get datascripts(): Datascripts;
    get shared(): Shared;
    get livescripts(): Livescripts;
    get addon(): Addon;
    get assets(): Assets;
    get tests(): Tests;
    get path(): {
        addon: {
            beforelib_toc: import("../util/FileTree").WFile;
            before_toc: import("../util/FileTree").WFile;
            after_toc: import("../util/FileTree").WFile;
            module_toc: import("../util/FileTree").WFile;
            index_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            global_d_ts: import("../util/FileTree").WFile;
            build: {
                lualib_bundle_lua: import("../util/FileTree").WFile;
                lib: WDirectory;
            } & WDirectory;
        } & WDirectory;
        datascripts: {
            global_d_ts: import("../util/FileTree").WFile;
            index: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            datascripts_conf: import("../util/FileTree").WFile;
            build: {
                package_json: import("../util/FileTree").WFile;
            } & WDirectory;
            swcrc: import("../util/FileTree").WFile;
        } & WDirectory;
        livescripts: {
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig: import("../util/FileTree").WFile;
            entry: import("../util/FileTree").WFile;
            livecripts_conf: import("../util/FileTree").WFile;
            built_library: import("../util/FileTree").WFile;
            built_pdb: import("../util/FileTree").WFile;
            build: {
                dataset: import("../util/FileTree").WDynDirectory<{
                    lua: WDirectory;
                    built_libs: import("../util/FileTree").WDynDirectory<{
                        library: import("../util/FileTree").WFile;
                        pdb: import("../util/FileTree").WFile;
                    }>;
                    cpp: {
                        livescripts: WDirectory;
                        cmakelists_txt: import("../util/FileTree").WFile;
                    } & WDirectory;
                    lib: WDirectory;
                }>;
            } & WDirectory;
        } & WDirectory;
        tests: {
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            test_conf: import("../util/FileTree").WFile;
            package_json: import("../util/FileTree").WFile;
            mocharc_json: import("../util/FileTree").WFile;
            tests: {
                example_test_ts: import("../util/FileTree").WFile;
                utils_test_ts: import("../util/FileTree").WFile;
            } & WDirectory;
            bin: {
                tests: WDirectory;
            } & WDirectory;
        } & WDirectory;
        lua: {
            example: import("../util/FileTree").WFile;
            global_d_ts: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            _inline: WDirectory;
        } & WDirectory;
        shared: {
            global_d_ts: import("../util/FileTree").WFile;
        } & WDirectory;
        snippets: WDirectory;
        datasets: {
            dataset: import("../util/FileTree").WDynDirectory<{
                Buildings: WDirectory;
                Cameras: WDirectory;
                Crashes: WDirectory;
                dbc: WDirectory;
                dbc_source: WDirectory;
                dbc_temp: {
                    dbc: WDirectory;
                } & WDirectory;
                lib: {
                    lua: WDirectory;
                    include_lua: WDirectory;
                } & WDirectory;
                luaxml: {
                    Interface: {
                        FrameXML: {
                            framexml_toc: import("../util/FileTree").WFile;
                            TSAddons: {
                                mod: import("../util/FileTree").WDynDirectory<{}>;
                            } & WDirectory;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
                luaxml_source: {
                    Interface: {
                        FrameXML: {
                            framexml_toc: import("../util/FileTree").WFile;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
                maps: WDirectory;
                mmaps: WDirectory;
                vmaps: WDirectory;
                config: import("../util/FileTree").WFile;
                ids_txt: import("../util/FileTree").WFile;
                modules_txt: import("../util/FileTree").WFile;
                world_sql: import("../util/FileTree").WFile;
            } & WDirectory>;
        } & WDirectory;
        realms: {
            realm: import("../util/FileTree").WDynDirectory<{
                worldserver_conf: import("../util/FileTree").WFile;
                worldserver_conf_dist: import("../util/FileTree").WFile;
                config: import("../util/FileTree").WFile;
                realm_id: import("../util/FileTree").WFile;
                core_config: (name: string) => import("../util/FileTree").WFile;
            } & WDirectory>;
        } & WDirectory;
        assets: {
            Interface: {
                WorldMap: WDirectory;
                TAXIFRAME: WDirectory;
            } & WDirectory;
            Textures: {
                Minimap: WDirectory;
            } & WDirectory;
        } & WDirectory;
        livescript_tsconfig_temp: import("../util/FileTree").WFile;
    } & WDirectory;
    private _path;
    static fromName(name: string): ModuleEndpoint;
    static fromPath(pathIn: string): ModuleEndpoint;
}
export declare class Module {
    private static shouldCacheEndpoints;
    private static cachedEndpoints?;
    private static cachedNamedEndpoints?;
    static cacheEndpoints(shouldCache: boolean): void;
    static modules(): Module[];
    static endpoints(identifier?: string): ModuleEndpoint[];
    destroy(): Promise<void>;
    initialize(initializedTypes?: EndpointType[]): this;
    asEndpoint(): ModuleEndpoint;
    static create(name: string, initializedTypes?: EndpointType[]): Module;
    static getEndpoint(p: string): ModuleEndpoint;
    readonly id: string;
    get path(): WDirectory & {
        gitignore: import("../util/FileTree").WFile;
        endpoints: () => ({
            addon: {
                beforelib_toc: import("../util/FileTree").WFile;
                before_toc: import("../util/FileTree").WFile;
                after_toc: import("../util/FileTree").WFile;
                module_toc: import("../util/FileTree").WFile;
                index_ts: import("../util/FileTree").WFile;
                tsconfig_json: import("../util/FileTree").WFile;
                global_d_ts: import("../util/FileTree").WFile;
                build: {
                    lualib_bundle_lua: import("../util/FileTree").WFile;
                    lib: WDirectory;
                } & WDirectory;
            } & WDirectory;
            datascripts: {
                global_d_ts: import("../util/FileTree").WFile;
                index: import("../util/FileTree").WFile;
                tsconfig_json: import("../util/FileTree").WFile;
                datascripts_conf: import("../util/FileTree").WFile;
                build: {
                    package_json: import("../util/FileTree").WFile;
                } & WDirectory;
                swcrc: import("../util/FileTree").WFile;
            } & WDirectory;
            livescripts: {
                global_d_ts: import("../util/FileTree").WFile;
                tsconfig: import("../util/FileTree").WFile;
                entry: import("../util/FileTree").WFile;
                livecripts_conf: import("../util/FileTree").WFile;
                built_library: import("../util/FileTree").WFile;
                built_pdb: import("../util/FileTree").WFile;
                build: {
                    dataset: import("../util/FileTree").WDynDirectory<{
                        lua: WDirectory;
                        built_libs: import("../util/FileTree").WDynDirectory<{
                            library: import("../util/FileTree").WFile;
                            pdb: import("../util/FileTree").WFile;
                        }>;
                        cpp: {
                            livescripts: WDirectory;
                            cmakelists_txt: import("../util/FileTree").WFile;
                        } & WDirectory;
                        lib: WDirectory;
                    }>;
                } & WDirectory;
            } & WDirectory;
            tests: {
                global_d_ts: import("../util/FileTree").WFile;
                tsconfig_json: import("../util/FileTree").WFile;
                test_conf: import("../util/FileTree").WFile;
                package_json: import("../util/FileTree").WFile;
                mocharc_json: import("../util/FileTree").WFile;
                tests: {
                    example_test_ts: import("../util/FileTree").WFile;
                    utils_test_ts: import("../util/FileTree").WFile;
                } & WDirectory;
                bin: {
                    tests: WDirectory;
                } & WDirectory;
            } & WDirectory;
            lua: {
                example: import("../util/FileTree").WFile;
                global_d_ts: import("../util/FileTree").WFile;
                tsconfig_json: import("../util/FileTree").WFile;
                _inline: WDirectory;
            } & WDirectory;
            shared: {
                global_d_ts: import("../util/FileTree").WFile;
            } & WDirectory;
            snippets: WDirectory;
            datasets: {
                dataset: import("../util/FileTree").WDynDirectory<{
                    Buildings: WDirectory;
                    Cameras: WDirectory;
                    Crashes: WDirectory;
                    dbc: WDirectory;
                    dbc_source: WDirectory;
                    dbc_temp: {
                        dbc: WDirectory;
                    } & WDirectory;
                    lib: {
                        lua: WDirectory;
                        include_lua: WDirectory;
                    } & WDirectory;
                    luaxml: {
                        Interface: {
                            FrameXML: {
                                framexml_toc: import("../util/FileTree").WFile;
                                TSAddons: {
                                    mod: import("../util/FileTree").WDynDirectory<{}>;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                    } & WDirectory;
                    luaxml_source: {
                        Interface: {
                            FrameXML: {
                                framexml_toc: import("../util/FileTree").WFile;
                            } & WDirectory;
                        } & WDirectory;
                    } & WDirectory;
                    maps: WDirectory;
                    mmaps: WDirectory;
                    vmaps: WDirectory;
                    config: import("../util/FileTree").WFile;
                    ids_txt: import("../util/FileTree").WFile;
                    modules_txt: import("../util/FileTree").WFile;
                    world_sql: import("../util/FileTree").WFile;
                } & WDirectory>;
            } & WDirectory;
            realms: {
                realm: import("../util/FileTree").WDynDirectory<{
                    worldserver_conf: import("../util/FileTree").WFile;
                    worldserver_conf_dist: import("../util/FileTree").WFile;
                    config: import("../util/FileTree").WFile;
                    realm_id: import("../util/FileTree").WFile;
                    core_config: (name: string) => import("../util/FileTree").WFile;
                } & WDirectory>;
            } & WDirectory;
            assets: {
                Interface: {
                    WorldMap: WDirectory;
                    TAXIFRAME: WDirectory;
                } & WDirectory;
                Textures: {
                    Minimap: WDirectory;
                } & WDirectory;
            } & WDirectory;
            livescript_tsconfig_temp: import("../util/FileTree").WFile;
        } & WDirectory)[];
    };
    endpoints(): ModuleEndpoint[];
    constructor(id: string);
    static command: commands.Command;
    static initialize(): void;
}
export {};
