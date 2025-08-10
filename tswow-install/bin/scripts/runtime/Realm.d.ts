import { BuildType } from "../util/BuildType";
import { ConfigFile } from "../util/ConfigFile";
import { EmulatorCore } from "../util/EmulatorCore";
import { Process } from "../util/Process";
import { ModuleEndpoint } from "./Modules";
import { Connection } from "./MySQL";
export declare class RealmConfig extends ConfigFile {
    protected description(): string;
    constructor(filename: string, name: string);
    private _Dataset;
    get Dataset(): import("./Dataset").Dataset;
    RealmName: string;
    PublicAddress: string;
    LocalAddress: string;
    LocalSubnetMask: string;
    Type: number;
    RequiredSecurityLevel: number;
    Recommended: boolean;
    Full: boolean;
    Offline: boolean;
    NewPlayers: boolean;
    TimeZone: number;
    AutoRestart: boolean;
}
export declare class Realm {
    private static managers;
    readonly mod: ModuleEndpoint;
    readonly name: string;
    lastBuildType: BuildType;
    readonly config: RealmConfig;
    private manager;
    get characters(): Connection;
    get worldserver(): Process;
    get fullName(): string;
    get path(): import("../util/FileTree").WDirectory & {
        worldserver_conf: import("../util/FileTree").WFile;
        worldserver_conf_dist: import("../util/FileTree").WFile;
        config: import("../util/FileTree").WFile;
        realm_id: import("../util/FileTree").WFile;
        core_config: (name: string) => import("../util/FileTree").WFile;
    };
    private _path;
    hasID(): boolean;
    getID(): number;
    getPort(): number;
    realmlistSQL(): string;
    constructor(mod: ModuleEndpoint, name: string);
    logName(): any;
    get core(): EmulatorCore;
    start(type: BuildType): Promise<void>;
    connect(): Promise<void>;
    sendWorldserverCommand(command: string, useNewline?: boolean): void;
    initialize(): this;
    static create(mod: ModuleEndpoint, name: string, displayname?: string): Realm;
    static all(): Realm[];
    static initialize(): Promise<void>;
}
export declare class Realms {
    readonly mod: ModuleEndpoint;
    get path(): {
        realm: import("../util/FileTree").WDynDirectory<{
            worldserver_conf: import("../util/FileTree").WFile;
            worldserver_conf_dist: import("../util/FileTree").WFile;
            config: import("../util/FileTree").WFile;
            realm_id: import("../util/FileTree").WFile;
            core_config: (name: string) => import("../util/FileTree").WFile;
        } & import("../util/FileTree").WDirectory>;
    } & import("../util/FileTree").WDirectory;
    constructor(mod: ModuleEndpoint);
    pick(name: string): Realm;
    all(): Realm[];
    create(name: string): Realm;
}
