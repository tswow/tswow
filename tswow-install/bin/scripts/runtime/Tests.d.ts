import { ConfigFile } from "../util/ConfigFile";
import { ModuleEndpoint } from "./Modules";
export declare class TestsConfig extends ConfigFile {
    protected description(): string;
    Framework: string;
    Timeout: number;
    protected _dependencies: string[];
    get Dependencies(): string[];
}
export declare class Tests {
    mod: ModuleEndpoint;
    config: TestsConfig;
    get path(): {
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        test_conf: import("../util/FileTree").WFile;
        package_json: import("../util/FileTree").WFile;
        mocharc_json: import("../util/FileTree").WFile;
        tests: {
            example_test_ts: import("../util/FileTree").WFile;
            utils_test_ts: import("../util/FileTree").WFile;
        } & import("../util/FileTree").WDirectory;
        bin: {
            tests: import("../util/FileTree").WDirectory;
        } & import("../util/FileTree").WDirectory;
    } & import("../util/FileTree").WDirectory;
    logName(): any;
    initialize(): this;
    constructor(mod: ModuleEndpoint);
    exists(): boolean;
    installDependencies(): void;
    compile(): void;
    run(): void;
    static all(): Tests[];
    static create(mod: ModuleEndpoint): Tests;
    static initialize(): void;
}
