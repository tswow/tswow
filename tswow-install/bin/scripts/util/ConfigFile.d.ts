import { FilePath } from './FileTree';
type ConfigParse = {
    [key: string]: any;
};
export declare function parseConf(str: string): ConfigParse;
export declare function Section(name: string): (obj: any, propname: any) => void;
export declare function Property(props: {
    name: string;
    note?: string;
    important?: string;
    description: string;
    examples: [any, string][];
}): (obj: any, field: any) => void;
export declare abstract class ConfigFile {
    protected abstract description(): string;
    protected getArrayAll(arr: string[], allValues: string[]): string[];
    private properties;
    readonly filename: string;
    undefined(): any;
    private findProperty;
    private generateValue;
    generateIfNotExists(): this;
    constructor(filename: string);
}
export declare function patchTCConfig(file: FilePath, property: string, value: any): void;
export {};
