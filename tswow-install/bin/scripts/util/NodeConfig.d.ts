import { BuildType } from "../util/BuildType";
export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export type DatabaseType = 'world' | 'auth' | 'characters' | 'world_source';
interface ConfigProperty {
    name: string;
    description: string;
    defaultValue: any;
    examples?: [any, string][];
    important?: string;
}
interface ConfigSection {
    name: string;
    description?: string;
    properties: ConfigProperty[];
}
interface ConfigSchema {
    description: string;
    sections: ConfigSection[];
}
declare abstract class ModernConfigFile {
    protected readonly filename: string;
    protected abstract getSchema(): ConfigSchema;
    private cachedValues;
    constructor(filename: string);
    protected getValue<T>(propertyName: string): T;
    private parseValue;
    private ensurePropertyInFile;
    generateIfNotExists(): void;
}
export declare class NodeConfigClass extends ModernConfigFile {
    private readonly buildType;
    constructor(filename: string, buildType?: string);
    protected getSchema(): ConfigSchema;
    get DefaultClient(): string;
    get DefaultRealm(): string;
    get DefaultDataset(): string;
    get DefaultBuildType(): BuildType;
    get AutoStartClient(): number;
    get AutoStartAuthServer(): boolean;
    get AutoRestartAuthServer(): boolean;
    get AutoStartLauncherServer(): boolean;
    get AutoStartRealms(): string[];
    get UsePooling(): boolean;
    get MySQLExecutable(): string;
    get DatabaseHostedPort(): number;
    get DatabasePrefix(): string;
    get DatabaseWorldSource(): string;
    get DatabaseWorldDest(): string;
    get DatabaseAuth(): string;
    get DatabaseCharacters(): string;
    get LauncherPatchChunkSize(): number;
    get TerminalHistory(): number;
    get TerminalTimestamps(): boolean;
    get TerminalNames(): boolean;
    get WritePosToClipboard(): boolean;
    DatabaseString(type: DatabaseType, name?: string): string;
    DatabaseSettings(type: DatabaseType, name?: string): DatabaseSettings;
}
export {};
