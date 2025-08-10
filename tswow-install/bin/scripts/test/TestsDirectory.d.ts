export declare function TestsDirectory(inPath: string): {
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
