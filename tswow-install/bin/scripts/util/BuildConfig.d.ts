import { ConfigFile } from "./ConfigFile";
export declare class BuildConfigClass extends ConfigFile {
    protected description(): string;
    BuildDirectory: string;
    InstallDirectory: string;
    TerminalDisplayNames: boolean;
    TerminalDisplayTimestamps: boolean;
}
