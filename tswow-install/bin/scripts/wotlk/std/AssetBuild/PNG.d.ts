import { FileChangeModule } from "../../../util/FileChanges";
import { FilePath, WFile } from "../../../util/FileTree";
export declare function getEffectiveFile(filenameNoSuffix: WFile): WFile;
export declare function onDirtyPNG(filenameNoSuffix: WFile, changes: FileChangeModule, force: boolean, callback: (png: WFile) => void): void;
export declare function splitPng(pngPath: FilePath, xTiles: number, yTiles: number, outputFormat: string): void;
