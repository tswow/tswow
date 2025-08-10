import { WDirectory, WNode } from '../util/FileTree';
import { Dataset } from './Dataset';
export declare const CLEAN_CLIENT_MD5 = "45892bdedd0ad70aed4ccd22d9fb5984";
export declare class Client {
    readonly dataset: Dataset;
    constructor(dataset: Dataset);
    get path(): {
        wow_exe: import("../util/FileTree").WFile;
        wow_exe_clean: import("../util/FileTree").WFile;
        Data: {
            devPatch: {
                Interface: {
                    FrameXML: {
                        TSAddons: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                DBFilesClient: WDirectory;
            } & WDirectory;
            locale: () => {
                realmlist_wtf: import("../util/FileTree").WFile;
            } & WDirectory;
        } & WDirectory;
        ClientExtensions_dll: import("../util/FileTree").WFile;
        Cache: import("../util/FileTree").WFile;
        Interface: {
            AddOns: WDirectory;
        } & WDirectory;
    } & WDirectory;
    patchDir(): WDirectory;
    locale(): {
        realmlist_wtf: import("../util/FileTree").WFile;
    } & WDirectory;
    kill(): Promise<number>;
    cleanFrameXML(): Promise<void>;
    mpqPatches(): WNode[];
    writeRealmlist(): void;
    start(count?: number): Promise<void>;
    startup(count?: number, ip?: string): Promise<void>;
    exePatches(): Promise<import("../util/ClientPatches").ClientPatchCat[]>;
    applyExePatches(): Promise<void>;
    patchPath(letter: string): ({
        realmlist_wtf: import("../util/FileTree").WFile;
    } & WDirectory) | ({
        devPatch: {
            Interface: {
                FrameXML: {
                    TSAddons: WDirectory;
                } & WDirectory;
            } & WDirectory;
            DBFilesClient: WDirectory;
        } & WDirectory;
        locale: () => {
            realmlist_wtf: import("../util/FileTree").WFile;
        } & WDirectory;
    } & WDirectory);
    verify(): void;
    installAddons(): void;
    clearCache(): boolean;
    freePatches(): WNode[];
    static initialize(): void;
}
