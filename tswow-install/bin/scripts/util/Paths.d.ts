import { FilePath, WDirectory, WFile } from "./FileTree";
export declare const TDB_URL = "https://github.com/TrinityCore/TrinityCore/releases/download/TDB335.24081/TDB_full_world_335.24081_2024_08_17.7z";
export declare const DATASET_MODULES_CONFIG = "Dataset.Modules";
export declare const DATASET_CLIENT_PATCH_LETTER = "Client.Patch.Letter";
export declare function tdbFilename(): string;
export declare function DatasetDirectory(inPath: string, inName: string): {
    Buildings: WDirectory;
    Cameras: WDirectory;
    Crashes: WDirectory;
    dbc: WDirectory;
    dbc_source: WDirectory;
    dbc_temp: {
        dbc: WDirectory;
    } & WDirectory;
    lib: {
        lua: WDirectory;
        include_lua: WDirectory;
    } & WDirectory;
    luaxml: {
        Interface: {
            FrameXML: {
                framexml_toc: WFile;
                TSAddons: {
                    mod: import("./FileTree").WDynDirectory<{}>;
                } & WDirectory;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    luaxml_source: {
        Interface: {
            FrameXML: {
                framexml_toc: WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    maps: WDirectory;
    mmaps: WDirectory;
    vmaps: WDirectory;
    config: WFile;
    ids_txt: WFile;
    modules_txt: WFile;
    world_sql: WFile;
} & WDirectory;
export declare function RealmDirectory(inPath: string, inName: string): {
    worldserver_conf: WFile;
    worldserver_conf_dist: WFile;
    config: WFile;
    realm_id: WFile;
    core_config: (name: string) => WFile;
} & WDirectory;
export declare function DatascriptsDirectory(inPath: string): {
    global_d_ts: WFile;
    index: WFile;
    tsconfig_json: WFile;
    datascripts_conf: WFile;
    build: {
        package_json: WFile;
    } & WDirectory;
    swcrc: WFile;
} & WDirectory;
export declare function LivescriptsDirectory(inPath: string): {
    global_d_ts: WFile;
    tsconfig: WFile;
    /** @todo: how to handle these names? */
    entry: WFile;
    livecripts_conf: WFile;
    built_library: WFile;
    built_pdb: WFile;
    build: {
        dataset: import("./FileTree").WDynDirectory<{
            lua: WDirectory;
            built_libs: import("./FileTree").WDynDirectory<{
                library: WFile;
                pdb: WFile;
            }>;
            cpp: {
                livescripts: WDirectory;
                cmakelists_txt: WFile;
            } & WDirectory;
            lib: WDirectory;
        }>;
    } & WDirectory;
} & WDirectory;
export declare function AddonDirectory(inPath: string): {
    beforelib_toc: WFile;
    before_toc: WFile;
    after_toc: WFile;
    module_toc: WFile;
    index_ts: WFile;
    tsconfig_json: WFile;
    global_d_ts: WFile;
    build: {
        lualib_bundle_lua: WFile;
        lib: WDirectory;
    } & WDirectory;
} & WDirectory;
export declare function EndpointDirectory(inPath: string): {
    addon: {
        beforelib_toc: WFile;
        before_toc: WFile;
        after_toc: WFile;
        module_toc: WFile;
        index_ts: WFile;
        tsconfig_json: WFile;
        global_d_ts: WFile;
        build: {
            lualib_bundle_lua: WFile;
            lib: WDirectory;
        } & WDirectory;
    } & WDirectory;
    datascripts: {
        global_d_ts: WFile;
        index: WFile;
        tsconfig_json: WFile;
        datascripts_conf: WFile;
        build: {
            package_json: WFile;
        } & WDirectory;
        swcrc: WFile;
    } & WDirectory;
    livescripts: {
        global_d_ts: WFile;
        tsconfig: WFile;
        /** @todo: how to handle these names? */
        entry: WFile;
        livecripts_conf: WFile;
        built_library: WFile;
        built_pdb: WFile;
        build: {
            dataset: import("./FileTree").WDynDirectory<{
                lua: WDirectory;
                built_libs: import("./FileTree").WDynDirectory<{
                    library: WFile;
                    pdb: WFile;
                }>;
                cpp: {
                    livescripts: WDirectory;
                    cmakelists_txt: WFile;
                } & WDirectory;
                lib: WDirectory;
            }>;
        } & WDirectory;
    } & WDirectory;
    tests: {
        global_d_ts: WFile;
        tsconfig_json: WFile;
        test_conf: WFile;
        package_json: WFile;
        mocharc_json: WFile;
        tests: {
            example_test_ts: WFile;
            utils_test_ts: WFile;
        } & WDirectory;
        bin: {
            tests: WDirectory;
        } & WDirectory;
    } & WDirectory;
    lua: {
        example: WFile;
        global_d_ts: WFile;
        tsconfig_json: WFile;
        _inline: WDirectory;
    } & WDirectory;
    shared: {
        global_d_ts: WFile;
    } & WDirectory;
    snippets: WDirectory;
    datasets: {
        dataset: import("./FileTree").WDynDirectory<{
            Buildings: WDirectory;
            Cameras: WDirectory;
            Crashes: WDirectory;
            dbc: WDirectory;
            dbc_source: WDirectory;
            dbc_temp: {
                dbc: WDirectory;
            } & WDirectory;
            lib: {
                lua: WDirectory;
                include_lua: WDirectory;
            } & WDirectory;
            luaxml: {
                Interface: {
                    FrameXML: {
                        framexml_toc: WFile;
                        TSAddons: {
                            mod: import("./FileTree").WDynDirectory<{}>;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            luaxml_source: {
                Interface: {
                    FrameXML: {
                        framexml_toc: WFile;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            maps: WDirectory;
            mmaps: WDirectory;
            vmaps: WDirectory;
            config: WFile;
            ids_txt: WFile;
            modules_txt: WFile;
            world_sql: WFile;
        } & WDirectory>;
    } & WDirectory;
    realms: {
        realm: import("./FileTree").WDynDirectory<{
            worldserver_conf: WFile;
            worldserver_conf_dist: WFile;
            config: WFile;
            realm_id: WFile;
            core_config: (name: string) => WFile;
        } & WDirectory>;
    } & WDirectory;
    assets: {
        Interface: {
            WorldMap: WDirectory;
            TAXIFRAME: WDirectory;
        } & WDirectory;
        Textures: {
            Minimap: WDirectory;
        } & WDirectory;
    } & WDirectory;
    livescript_tsconfig_temp: WFile;
} & WDirectory;
export declare function findLocaleDir(dirIn: FilePath): {
    realmlist_wtf: WFile;
} & WDirectory;
export declare const Languages: string[];
export declare function ClientPath(pathIn: string, devPatch: string): {
    /** The Wow.exe used to start the game */
    wow_exe: WFile;
    /** The Wow.exe without any patches applied */
    wow_exe_clean: WFile;
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
            realmlist_wtf: WFile;
        } & WDirectory;
    } & WDirectory;
    ClientExtensions_dll: WFile;
    Cache: WFile;
    Interface: {
        AddOns: WDirectory;
    } & WDirectory;
} & WDirectory;
export declare function InstallPath(pathIn: string, tdb: string): {
    vscode: {
        snippets_out: WFile;
    } & WDirectory;
    node_modules: {
        typescript_js: WFile;
        tstl_decorators: WFile;
        tstl_js: WFile;
        wow: {
            data: {
                index: WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    node_conf: WFile;
    Crashes: WDirectory;
    startBat: WFile;
    startJs: WFile;
    mise_toml: WFile;
    bin: {
        package: {
            file: (name: string) => WFile;
        } & WDirectory;
        node: {
            node_exe: WFile;
            npx_exe: WFile;
            npm_exe: WFile;
        } & WDirectory;
        changes: {
            changeFile: (name: string) => WFile;
        } & WDirectory;
        libraries: {
            build: import("./FileTree").WDynDirectory<{}>;
        } & WDirectory;
        libraries_ac: {
            build: import("./FileTree").WDynDirectory<{}>;
        } & WDirectory;
        sourceAdt: WFile;
        mysql_startup: WFile;
        addons: WDirectory;
        revisions: {
            trinitycore: WFile;
            tswow: WFile;
        } & WDirectory;
        scripts: {
            addons: {
                require_preload: WFile;
                lua_orm: WFile;
            } & WDirectory;
            tests: WDirectory;
            runtime: {
                TSWoW_js: WFile;
            } & WDirectory;
            typescript2cxx: {
                wowts_js: WFile;
                main_js: WFile;
            } & WDirectory;
            wow: {
                package_json: WFile;
                data: {
                    index: WFile;
                } & WDirectory;
                wotlk: {
                    package_json: WFile;
                } & WDirectory;
            } & WDirectory;
            snippets_example: WFile;
        } & WDirectory;
        adtcreator: {
            adt_creator_exe: WFile;
        } & WDirectory;
        mpqbuilder: {
            mpqbuilder_exe: WFile;
            luaxml_exe: WFile;
        } & WDirectory;
        mysql: {
            mysql_exe: WFile;
            mysqld_exe: WFile;
            mysqldump_exe: WFile;
        } & WDirectory;
        sZip: {
            sza_exe: WFile;
        } & WDirectory;
        /** imagemagick binaries */
        im: {
            convert: WFile;
            magick: WFile;
            identify: WFile;
        } & WDirectory;
        tdb: WFile;
        cmake: {
            bin: {
                cmake_exe: WFile;
            } & WDirectory;
            share: WDirectory;
        } & WDirectory;
        ClientExtensions_dll: WFile;
        include: {
            global_d_ts: WFile;
            tracy: {
                tracy_hpp: WFile;
                common: WDirectory;
                client: WDirectory;
            } & WDirectory;
            lua: WDirectory;
        } & WDirectory;
        include_lua: WDirectory;
        BLPConverter: {
            blpconverter: WFile;
        } & WDirectory;
        tmp: {
            file_changes_txt: WFile;
        } & WDirectory;
        sql_ac: {
            db_auth: WFile;
            db_characters: WFile;
            db_world: WFile;
        } & WDirectory;
        sql: {
            characters_create_sql: WFile;
            auth_create_sql: WFile;
            updates: {
                type: import("./FileTree").WDynDirectory<{
                    _335: WDirectory;
                }>;
            } & WDirectory;
            custom: {
                type: import("./FileTree").WDynDirectory<{}>;
            } & WDirectory;
        } & WDirectory;
        include_addon: {
            global_d_ts: WFile;
            Events_ts: WFile;
            Events_lua: WFile;
            shared_global_d_ts: WFile;
            RequireStub_lua: WFile;
            tsconfig_json: WFile;
            lualib_bundle: WFile;
        } & WDirectory;
        core: import("./FileTree").WDynDirectory<{
            build: import("./FileTree").WDynDirectory<{
                scripts: {
                    moduleLib: (name: string) => WFile;
                    modulePdb: (name: string) => WFile;
                } & WDirectory;
                worldserver: WFile;
                mapextractor: WFile;
                mmaps_generator: WFile;
                vmap4assembler: WFile;
                vmap4extractor: WFile;
                authserver: WFile;
                tracy_client: WFile;
                authserver_conf_dist: WFile;
                worldserver_conf_dist: WFile;
                libcrypto: WFile;
                configs: WDirectory;
            }>;
        }>;
    } & WDirectory;
    coredata: {
        positions_txt: WFile;
        database: WFile;
        authserver: {
            authserver_conf: WFile;
        } & WDirectory;
        commands_yaml: WFile;
        terminal_history_txt: WFile;
        last_datascript: WFile;
        tags: {
            tagfile: (name: string) => WFile;
        } & WDirectory;
    } & WDirectory;
    modules: {
        module: import("./FileTree").WDynDirectory<{
            gitignore: WFile;
            endpoints: () => ({
                addon: {
                    beforelib_toc: WFile;
                    before_toc: WFile;
                    after_toc: WFile;
                    module_toc: WFile;
                    index_ts: WFile;
                    tsconfig_json: WFile;
                    global_d_ts: WFile;
                    build: {
                        lualib_bundle_lua: WFile;
                        lib: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                datascripts: {
                    global_d_ts: WFile;
                    index: WFile;
                    tsconfig_json: WFile;
                    datascripts_conf: WFile;
                    build: {
                        package_json: WFile;
                    } & WDirectory;
                    swcrc: WFile;
                } & WDirectory;
                livescripts: {
                    global_d_ts: WFile;
                    tsconfig: WFile;
                    /** @todo: how to handle these names? */
                    entry: WFile;
                    livecripts_conf: WFile;
                    built_library: WFile;
                    built_pdb: WFile;
                    build: {
                        dataset: import("./FileTree").WDynDirectory<{
                            lua: WDirectory;
                            built_libs: import("./FileTree").WDynDirectory<{
                                library: WFile;
                                pdb: WFile;
                            }>;
                            cpp: {
                                livescripts: WDirectory;
                                cmakelists_txt: WFile;
                            } & WDirectory;
                            lib: WDirectory;
                        }>;
                    } & WDirectory;
                } & WDirectory;
                tests: {
                    global_d_ts: WFile;
                    tsconfig_json: WFile;
                    test_conf: WFile;
                    package_json: WFile;
                    mocharc_json: WFile;
                    tests: {
                        example_test_ts: WFile;
                        utils_test_ts: WFile;
                    } & WDirectory;
                    bin: {
                        tests: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                lua: {
                    example: WFile;
                    global_d_ts: WFile;
                    tsconfig_json: WFile;
                    _inline: WDirectory;
                } & WDirectory;
                shared: {
                    global_d_ts: WFile;
                } & WDirectory;
                snippets: WDirectory;
                datasets: {
                    dataset: import("./FileTree").WDynDirectory<{
                        Buildings: WDirectory;
                        Cameras: WDirectory;
                        Crashes: WDirectory;
                        dbc: WDirectory;
                        dbc_source: WDirectory;
                        dbc_temp: {
                            dbc: WDirectory;
                        } & WDirectory;
                        lib: {
                            lua: WDirectory;
                            include_lua: WDirectory;
                        } & WDirectory;
                        luaxml: {
                            Interface: {
                                FrameXML: {
                                    framexml_toc: WFile;
                                    TSAddons: {
                                        mod: import("./FileTree").WDynDirectory<{}>;
                                    } & WDirectory;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        luaxml_source: {
                            Interface: {
                                FrameXML: {
                                    framexml_toc: WFile;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        maps: WDirectory;
                        mmaps: WDirectory;
                        vmaps: WDirectory;
                        config: WFile;
                        ids_txt: WFile;
                        modules_txt: WFile;
                        world_sql: WFile;
                    } & WDirectory>;
                } & WDirectory;
                realms: {
                    realm: import("./FileTree").WDynDirectory<{
                        worldserver_conf: WFile;
                        worldserver_conf_dist: WFile;
                        config: WFile;
                        realm_id: WFile;
                        core_config: (name: string) => WFile;
                    } & WDirectory>;
                } & WDirectory;
                assets: {
                    Interface: {
                        WorldMap: WDirectory;
                        TAXIFRAME: WDirectory;
                    } & WDirectory;
                    Textures: {
                        Minimap: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                livescript_tsconfig_temp: WFile;
            } & WDirectory)[];
        }>;
    } & WDirectory;
    package: {
        server_7z: WFile;
        file: (name: string) => WFile;
    } & WDirectory;
    package_json: WFile;
    package_lock_json: WFile;
} & WDirectory;
export declare function BuildPaths(pathIn: string, tdb: string): {
    release_7z: WFile;
    terminal_history: WFile;
    ClientExtensionsDll: WFile;
    client_extensions: {
        dll_path: WFile;
    } & WDirectory;
    scripts_config: {
        typescript2cxx: WDirectory;
        wow: WDirectory;
        runtime: WDirectory;
        addons: WDirectory;
        tests: WDirectory;
    } & WDirectory;
    lua_events: {
        events_ts: WFile;
        events_d_ts: WFile;
        events_lua: WFile;
        lualib_bundle: WFile;
        global_d_ts: WFile;
        tsconfig_json: WFile;
    } & WDirectory;
    include_lua: WDirectory;
    zlib: {
        include: WDirectory;
        lib: {
            zlib_lib: WFile;
        } & WDirectory;
    } & WDirectory;
    cmake: WDirectory;
    cmakeArchive: WFile;
    mysqlArchive: WFile;
    nodeArchive: WFile;
    node: WDirectory;
    sourceAdt: WFile;
    mysql: {
        find_subdir: () => {
            bin: {
                mysqld_exe: WFile;
                mysql_exe: WFile;
                mysqldump_exe: WFile;
            } & WDirectory;
            lib: {
                libmysql_dll: WFile;
                libmysqld_dll: WFile;
                mysqlserver_lib: WFile;
                libmysql_lib: WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    opensslArchive: WFile;
    openssl: {
        libcrypto_dll: WFile;
        lib: {
            libcrypto_lib: WFile;
        } & WDirectory;
    } & WDirectory;
    boost: {
        boost_1_82_0: {
            lib64_msvc_14_3: {
                fslib: WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    boostArchive: WFile;
    tdbArchive: WFile;
    tdbSql: WFile;
    sevenZipArchive: WFile;
    sevenZip: {
        sevenZa_exe: WFile;
        sz_sfx: WFile;
    } & WDirectory;
    imArchive: WFile;
    im: {
        convert_exe: WFile;
        magic_exe: WFile;
        identify_exe: WFile;
    } & WDirectory;
    TrinityCore: {
        sol_headers: WDirectory;
        lua_headers: WDirectory;
        bin_linux: WDirectory;
        etc_linux: WDirectory;
        lib_linux: WDirectory;
        tracy_dll: (type: string) => WFile;
        tracy_source: {
            tracy_header: WFile;
            common: WDirectory;
            client: WDirectory;
        } & WDirectory;
        bin: (name: string) => {
            worldserver_exe: WFile;
            authserver_exe: WFile;
            scripts: WDirectory;
        } & WDirectory;
        configs: (name: string) => WDirectory;
        libraries: (type: string) => WFile[];
        libraries2: (pathIn: string, type: string) => WFile[];
    } & WDirectory;
    mpqbuilder: {
        mpqbuilder_exe: WFile;
        luaxml_exe: WFile;
    } & WDirectory;
    blpconverter: {
        blpconverter_exe: WFile;
    } & WDirectory;
    adtcreator: {
        adt_creator_exe: WFile;
        Release: {
            adt_creator_exe: WFile;
        } & WDirectory;
    } & WDirectory;
    bzip2: {
        lib: {
            bzip2_lib: WFile;
        } & WDirectory;
    } & WDirectory;
} & WDirectory;
export declare function SourcePaths(pathIn: string): {
    package_json: WFile;
    package_lock_json: WFile;
    node_modules: {
        typescript_js: WFile;
    } & WDirectory;
    misc: {
        mpqbuilder: WDirectory;
        adtcreator: WDirectory;
        blpconverter: WDirectory;
        install_config: {
            include_addon: {
                global_d_ts: WFile;
                Events_ts: WFile;
                shared_global_d_ts: WFile;
                LualibBundle_lua: WFile;
                RequireStub_lua: WFile;
            } & WDirectory;
            include_lua: WDirectory;
            characters_create: WFile;
            auth_create: WFile;
            package_json: WFile;
            node_yaml: WFile;
            vscode_install: WFile;
            addons: WDirectory;
            snippet_example: WFile;
            mise_toml: WFile;
        } & WDirectory;
        client_extensions: {
            CustomPackets: WDirectory;
            lua_51: {
                src: WDirectory;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    cores: {
        TrinityCore: {
            src: WDirectory;
            sql: {
                updates: WDirectory;
                custom: WDirectory;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    tswow_scripts: {
        sql: WDirectory;
        data: {
            package_json: WFile;
        } & WDirectory;
        wotlk: {
            global_d_ts: WFile;
            package_json: WFile;
        } & WDirectory;
        runtime: WDirectory;
        typescript2cxx: WDirectory;
        util: WDirectory;
        addons: WDirectory;
        test: WDirectory;
    } & WDirectory;
    TypeScript2Cxx: WDirectory;
    tswow_core: {
        /** Contains all public headers for tswow livescripts */
        Public: {
            /** Contains global.d.ts placed in livescripts */
            global_d_ts: WFile;
            TSProfile_h: WFile;
        } & WDirectory;
    } & WDirectory;
    ClientExtensions: {
        CustomPackets: WDirectory;
    } & WDirectory;
    build_yaml: WDirectory;
} & WDirectory;
export declare const ipaths: {
    vscode: {
        snippets_out: WFile;
    } & WDirectory;
    node_modules: {
        typescript_js: WFile;
        tstl_decorators: WFile;
        tstl_js: WFile;
        wow: {
            data: {
                index: WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    node_conf: WFile;
    Crashes: WDirectory;
    startBat: WFile;
    startJs: WFile;
    mise_toml: WFile;
    bin: {
        package: {
            file: (name: string) => WFile;
        } & WDirectory;
        node: {
            node_exe: WFile;
            npx_exe: WFile;
            npm_exe: WFile;
        } & WDirectory;
        changes: {
            changeFile: (name: string) => WFile;
        } & WDirectory;
        libraries: {
            build: import("./FileTree").WDynDirectory<{}>;
        } & WDirectory;
        libraries_ac: {
            build: import("./FileTree").WDynDirectory<{}>;
        } & WDirectory;
        sourceAdt: WFile;
        mysql_startup: WFile;
        addons: WDirectory;
        revisions: {
            trinitycore: WFile;
            tswow: WFile;
        } & WDirectory;
        scripts: {
            addons: {
                require_preload: WFile;
                lua_orm: WFile;
            } & WDirectory;
            tests: WDirectory;
            runtime: {
                TSWoW_js: WFile;
            } & WDirectory;
            typescript2cxx: {
                wowts_js: WFile;
                main_js: WFile;
            } & WDirectory;
            wow: {
                package_json: WFile;
                data: {
                    index: WFile;
                } & WDirectory;
                wotlk: {
                    package_json: WFile;
                } & WDirectory;
            } & WDirectory;
            snippets_example: WFile;
        } & WDirectory;
        adtcreator: {
            adt_creator_exe: WFile;
        } & WDirectory;
        mpqbuilder: {
            mpqbuilder_exe: WFile;
            luaxml_exe: WFile;
        } & WDirectory;
        mysql: {
            mysql_exe: WFile;
            mysqld_exe: WFile;
            mysqldump_exe: WFile;
        } & WDirectory;
        sZip: {
            sza_exe: WFile;
        } & WDirectory;
        /** imagemagick binaries */
        im: {
            convert: WFile;
            magick: WFile;
            identify: WFile;
        } & WDirectory;
        tdb: WFile;
        cmake: {
            bin: {
                cmake_exe: WFile;
            } & WDirectory;
            share: WDirectory;
        } & WDirectory;
        ClientExtensions_dll: WFile;
        include: {
            global_d_ts: WFile;
            tracy: {
                tracy_hpp: WFile;
                common: WDirectory;
                client: WDirectory;
            } & WDirectory;
            lua: WDirectory;
        } & WDirectory;
        include_lua: WDirectory;
        BLPConverter: {
            blpconverter: WFile;
        } & WDirectory;
        tmp: {
            file_changes_txt: WFile;
        } & WDirectory;
        sql_ac: {
            db_auth: WFile;
            db_characters: WFile;
            db_world: WFile;
        } & WDirectory;
        sql: {
            characters_create_sql: WFile;
            auth_create_sql: WFile;
            updates: {
                type: import("./FileTree").WDynDirectory<{
                    _335: WDirectory;
                }>;
            } & WDirectory;
            custom: {
                type: import("./FileTree").WDynDirectory<{}>;
            } & WDirectory;
        } & WDirectory;
        include_addon: {
            global_d_ts: WFile;
            Events_ts: WFile;
            Events_lua: WFile;
            shared_global_d_ts: WFile;
            RequireStub_lua: WFile;
            tsconfig_json: WFile;
            lualib_bundle: WFile;
        } & WDirectory;
        core: import("./FileTree").WDynDirectory<{
            build: import("./FileTree").WDynDirectory<{
                scripts: {
                    moduleLib: (name: string) => WFile;
                    modulePdb: (name: string) => WFile;
                } & WDirectory;
                worldserver: WFile;
                mapextractor: WFile;
                mmaps_generator: WFile;
                vmap4assembler: WFile;
                vmap4extractor: WFile;
                authserver: WFile;
                tracy_client: WFile;
                authserver_conf_dist: WFile;
                worldserver_conf_dist: WFile;
                libcrypto: WFile;
                configs: WDirectory;
            }>;
        }>;
    } & WDirectory;
    coredata: {
        positions_txt: WFile;
        database: WFile;
        authserver: {
            authserver_conf: WFile;
        } & WDirectory;
        commands_yaml: WFile;
        terminal_history_txt: WFile;
        last_datascript: WFile;
        tags: {
            tagfile: (name: string) => WFile;
        } & WDirectory;
    } & WDirectory;
    modules: {
        module: import("./FileTree").WDynDirectory<{
            gitignore: WFile;
            endpoints: () => ({
                addon: {
                    beforelib_toc: WFile;
                    before_toc: WFile;
                    after_toc: WFile;
                    module_toc: WFile;
                    index_ts: WFile;
                    tsconfig_json: WFile;
                    global_d_ts: WFile;
                    build: {
                        lualib_bundle_lua: WFile;
                        lib: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                datascripts: {
                    global_d_ts: WFile;
                    index: WFile;
                    tsconfig_json: WFile;
                    datascripts_conf: WFile;
                    build: {
                        package_json: WFile;
                    } & WDirectory;
                    swcrc: WFile;
                } & WDirectory;
                livescripts: {
                    global_d_ts: WFile;
                    tsconfig: WFile;
                    /** @todo: how to handle these names? */
                    entry: WFile;
                    livecripts_conf: WFile;
                    built_library: WFile;
                    built_pdb: WFile;
                    build: {
                        dataset: import("./FileTree").WDynDirectory<{
                            lua: WDirectory;
                            built_libs: import("./FileTree").WDynDirectory<{
                                library: WFile;
                                pdb: WFile;
                            }>;
                            cpp: {
                                livescripts: WDirectory;
                                cmakelists_txt: WFile;
                            } & WDirectory;
                            lib: WDirectory;
                        }>;
                    } & WDirectory;
                } & WDirectory;
                tests: {
                    global_d_ts: WFile;
                    tsconfig_json: WFile;
                    test_conf: WFile;
                    package_json: WFile;
                    mocharc_json: WFile;
                    tests: {
                        example_test_ts: WFile;
                        utils_test_ts: WFile;
                    } & WDirectory;
                    bin: {
                        tests: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                lua: {
                    example: WFile;
                    global_d_ts: WFile;
                    tsconfig_json: WFile;
                    _inline: WDirectory;
                } & WDirectory;
                shared: {
                    global_d_ts: WFile;
                } & WDirectory;
                snippets: WDirectory;
                datasets: {
                    dataset: import("./FileTree").WDynDirectory<{
                        Buildings: WDirectory;
                        Cameras: WDirectory;
                        Crashes: WDirectory;
                        dbc: WDirectory;
                        dbc_source: WDirectory;
                        dbc_temp: {
                            dbc: WDirectory;
                        } & WDirectory;
                        lib: {
                            lua: WDirectory;
                            include_lua: WDirectory;
                        } & WDirectory;
                        luaxml: {
                            Interface: {
                                FrameXML: {
                                    framexml_toc: WFile;
                                    TSAddons: {
                                        mod: import("./FileTree").WDynDirectory<{}>;
                                    } & WDirectory;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        luaxml_source: {
                            Interface: {
                                FrameXML: {
                                    framexml_toc: WFile;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        maps: WDirectory;
                        mmaps: WDirectory;
                        vmaps: WDirectory;
                        config: WFile;
                        ids_txt: WFile;
                        modules_txt: WFile;
                        world_sql: WFile;
                    } & WDirectory>;
                } & WDirectory;
                realms: {
                    realm: import("./FileTree").WDynDirectory<{
                        worldserver_conf: WFile;
                        worldserver_conf_dist: WFile;
                        config: WFile;
                        realm_id: WFile;
                        core_config: (name: string) => WFile;
                    } & WDirectory>;
                } & WDirectory;
                assets: {
                    Interface: {
                        WorldMap: WDirectory;
                        TAXIFRAME: WDirectory;
                    } & WDirectory;
                    Textures: {
                        Minimap: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                livescript_tsconfig_temp: WFile;
            } & WDirectory)[];
        }>;
    } & WDirectory;
    package: {
        server_7z: WFile;
        file: (name: string) => WFile;
    } & WDirectory;
    package_json: WFile;
    package_lock_json: WFile;
} & WDirectory;
export declare function modulePathToName(modulePath: string): string;
export declare function moduleNameToPath(moduleName: string): {
    addon: {
        beforelib_toc: WFile;
        before_toc: WFile;
        after_toc: WFile;
        module_toc: WFile;
        index_ts: WFile;
        tsconfig_json: WFile;
        global_d_ts: WFile;
        build: {
            lualib_bundle_lua: WFile;
            lib: WDirectory;
        } & WDirectory;
    } & WDirectory;
    datascripts: {
        global_d_ts: WFile;
        index: WFile;
        tsconfig_json: WFile;
        datascripts_conf: WFile;
        build: {
            package_json: WFile;
        } & WDirectory;
        swcrc: WFile;
    } & WDirectory;
    livescripts: {
        global_d_ts: WFile;
        tsconfig: WFile;
        /** @todo: how to handle these names? */
        entry: WFile;
        livecripts_conf: WFile;
        built_library: WFile;
        built_pdb: WFile;
        build: {
            dataset: import("./FileTree").WDynDirectory<{
                lua: WDirectory;
                built_libs: import("./FileTree").WDynDirectory<{
                    library: WFile;
                    pdb: WFile;
                }>;
                cpp: {
                    livescripts: WDirectory;
                    cmakelists_txt: WFile;
                } & WDirectory;
                lib: WDirectory;
            }>;
        } & WDirectory;
    } & WDirectory;
    tests: {
        global_d_ts: WFile;
        tsconfig_json: WFile;
        test_conf: WFile;
        package_json: WFile;
        mocharc_json: WFile;
        tests: {
            example_test_ts: WFile;
            utils_test_ts: WFile;
        } & WDirectory;
        bin: {
            tests: WDirectory;
        } & WDirectory;
    } & WDirectory;
    lua: {
        example: WFile;
        global_d_ts: WFile;
        tsconfig_json: WFile;
        _inline: WDirectory;
    } & WDirectory;
    shared: {
        global_d_ts: WFile;
    } & WDirectory;
    snippets: WDirectory;
    datasets: {
        dataset: import("./FileTree").WDynDirectory<{
            Buildings: WDirectory;
            Cameras: WDirectory;
            Crashes: WDirectory;
            dbc: WDirectory;
            dbc_source: WDirectory;
            dbc_temp: {
                dbc: WDirectory;
            } & WDirectory;
            lib: {
                lua: WDirectory;
                include_lua: WDirectory;
            } & WDirectory;
            luaxml: {
                Interface: {
                    FrameXML: {
                        framexml_toc: WFile;
                        TSAddons: {
                            mod: import("./FileTree").WDynDirectory<{}>;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            luaxml_source: {
                Interface: {
                    FrameXML: {
                        framexml_toc: WFile;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            maps: WDirectory;
            mmaps: WDirectory;
            vmaps: WDirectory;
            config: WFile;
            ids_txt: WFile;
            modules_txt: WFile;
            world_sql: WFile;
        } & WDirectory>;
    } & WDirectory;
    realms: {
        realm: import("./FileTree").WDynDirectory<{
            worldserver_conf: WFile;
            worldserver_conf_dist: WFile;
            config: WFile;
            realm_id: WFile;
            core_config: (name: string) => WFile;
        } & WDirectory>;
    } & WDirectory;
    assets: {
        Interface: {
            WorldMap: WDirectory;
            TAXIFRAME: WDirectory;
        } & WDirectory;
        Textures: {
            Minimap: WDirectory;
        } & WDirectory;
    } & WDirectory;
    livescript_tsconfig_temp: WFile;
} & WDirectory;
