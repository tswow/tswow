import { DatasetConfig } from "../util/DatasetConfig";
import { Client } from "./Client";
import { ModuleEndpoint } from "./Modules";
import { Connection } from "./MySQL";
import { Realm } from "./Realm";
export declare class Dataset {
    private static managers;
    private manager;
    readonly mod: ModuleEndpoint;
    readonly name: string;
    readonly client: Client;
    get worldSource(): Connection;
    get worldDest(): Connection;
    get fullName(): string;
    get config(): DatasetConfig;
    get path(): import("../util/FileTree").WDirectory & {
        Buildings: import("../util/FileTree").WDirectory;
        Cameras: import("../util/FileTree").WDirectory;
        Crashes: import("../util/FileTree").WDirectory;
        dbc: import("../util/FileTree").WDirectory;
        dbc_source: import("../util/FileTree").WDirectory;
        dbc_temp: {
            dbc: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
        lib: {
            lua: import("../util/FileTree").WDirectory;
            include_lua: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
        luaxml: {
            Interface: {
                FrameXML: {
                    framexml_toc: import("../util/FileTree").WFile;
                    TSAddons: {
                        mod: import("../util/FileTree").WDynDirectory<{}>;
                    } & import("../util/FileTree").WDirectory;
                } & import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
        luaxml_source: {
            Interface: {
                FrameXML: {
                    framexml_toc: import("../util/FileTree").WFile;
                } & import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
        maps: import("../util/FileTree").WDirectory;
        mmaps: import("../util/FileTree").WDirectory;
        vmaps: import("../util/FileTree").WDirectory;
        config: import("../util/FileTree").WFile;
        ids_txt: import("../util/FileTree").WFile;
        modules_txt: import("../util/FileTree").WFile;
        world_sql: import("../util/FileTree").WFile;
    };
    private _path;
    constructor(mod: ModuleEndpoint, name: string);
    realms(): Realm[];
    logName(): any;
    initialize(): this;
    writeModulesTxt(): void;
    shutdown(): Promise<Realm[]>;
    gamebuildSQL(): string;
    setupClientData(): Promise<void>;
    protected setupDatabase(db: Connection, force: boolean): Promise<void>;
    setupDatabases(type: 'DEST' | 'SOURCE' | 'BOTH', force: boolean): Promise<void>;
    connect(): Promise<void[]>;
    modules(): ModuleEndpoint[];
    dumpDatabase(outFile: string): Promise<void>;
    refreshSymlinks(): void;
    static all(): Dataset[];
    static create(mod: ModuleEndpoint, name: string, gamebuild?: number): Dataset;
    static initialize(): void;
}
export declare class Datasets {
    readonly mod: ModuleEndpoint;
    get path(): {
        dataset: import("../util/FileTree").WDynDirectory<{
            Buildings: import("../util/FileTree").WDirectory;
            Cameras: import("../util/FileTree").WDirectory;
            Crashes: import("../util/FileTree").WDirectory;
            dbc: import("../util/FileTree").WDirectory;
            dbc_source: import("../util/FileTree").WDirectory;
            dbc_temp: {
                dbc: import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
            lib: {
                lua: import("../util/FileTree").WDirectory;
                include_lua: import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
            luaxml: {
                Interface: {
                    FrameXML: {
                        framexml_toc: import("../util/FileTree").WFile;
                        TSAddons: {
                            mod: import("../util/FileTree").WDynDirectory<{}>;
                        } & import("../util/FileTree").WDirectory;
                    } & import("../util/FileTree").WDirectory;
                } & import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
            luaxml_source: {
                Interface: {
                    FrameXML: {
                        framexml_toc: import("../util/FileTree").WFile;
                    } & import("../util/FileTree").WDirectory;
                } & import("../util/FileTree").WDirectory;
            } & import("../util/FileTree").WDirectory;
            maps: import("../util/FileTree").WDirectory;
            mmaps: import("../util/FileTree").WDirectory;
            vmaps: import("../util/FileTree").WDirectory;
            config: import("../util/FileTree").WFile;
            ids_txt: import("../util/FileTree").WFile;
            modules_txt: import("../util/FileTree").WFile;
            world_sql: import("../util/FileTree").WFile;
        } & import("../util/FileTree").WDirectory>;
    } & import("../util/FileTree").WDirectory;
    constructor(mod: ModuleEndpoint);
    pick(name: string): Realm;
    all(): Dataset[];
    create(name: string, gamebuild?: number): Dataset;
}
