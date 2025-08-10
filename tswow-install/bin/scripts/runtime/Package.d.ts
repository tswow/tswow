import { commands } from "../util/Commands";
import { Dataset } from "./Dataset";
export interface PackageMeta {
    size: number;
    md5s: string[];
    filename: string;
    chunkSize: number;
}
export declare class Package {
    static packageClient(dataset: Dataset, fullDBC: boolean, fullInterface: boolean): Promise<void>;
    static Command: commands.Command;
    static initialize(): void;
}
