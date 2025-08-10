import { ConfigFile } from "./ConfigFile";
import { EmulatorCore } from "./EmulatorCore";
export declare const GAME_BUILD_FIELD = "Dataset.GameBuild";
export declare class DatasetConfig extends ConfigFile {
    protected description(): string;
    private _modules;
    get modules(): string[];
    DatasetGameBuild: number;
    private _client_patches;
    get client_patches(): string[];
    private _client_path;
    get client_path(): string;
    ClientDevPatchLetter: string;
    ClientPatchUseLocale: boolean;
    EmulatorCore: EmulatorCore;
    PackageMapping: string[];
}
