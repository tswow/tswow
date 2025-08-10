import { WDirectory } from "../util/FileTree";
import { NodeConfigClass } from "../util/NodeConfig";
export declare const ipaths: {
    vscode: {
        snippets_out: import("../util/FileTree").WFile;
    } & WDirectory;
    node_modules: {
        typescript_js: import("../util/FileTree").WFile;
        tstl_decorators: import("../util/FileTree").WFile;
        tstl_js: import("../util/FileTree").WFile;
        wow: {
            data: {
                index: import("../util/FileTree").WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    node_conf: import("../util/FileTree").WFile;
    Crashes: WDirectory;
    startBat: import("../util/FileTree").WFile;
    startJs: import("../util/FileTree").WFile;
    mise_toml: import("../util/FileTree").WFile;
    bin: {
        package: {
            file: (name: string) => import("../util/FileTree").WFile;
        } & WDirectory;
        node: {
            node_exe: import("../util/FileTree").WFile;
            npx_exe: import("../util/FileTree").WFile;
            npm_exe: import("../util/FileTree").WFile;
        } & WDirectory;
        changes: {
            changeFile: (name: string) => import("../util/FileTree").WFile;
        } & WDirectory;
        libraries: {
            build: import("../util/FileTree").WDynDirectory<{}>;
        } & WDirectory;
        libraries_ac: {
            build: import("../util/FileTree").WDynDirectory<{}>;
        } & WDirectory;
        sourceAdt: import("../util/FileTree").WFile;
        mysql_startup: import("../util/FileTree").WFile;
        addons: WDirectory;
        revisions: {
            trinitycore: import("../util/FileTree").WFile;
            tswow: import("../util/FileTree").WFile;
        } & WDirectory;
        scripts: {
            addons: {
                require_preload: import("../util/FileTree").WFile;
                lua_orm: import("../util/FileTree").WFile;
            } & WDirectory;
            tests: WDirectory;
            runtime: {
                TSWoW_js: import("../util/FileTree").WFile;
            } & WDirectory;
            typescript2cxx: {
                wowts_js: import("../util/FileTree").WFile;
                main_js: import("../util/FileTree").WFile;
            } & WDirectory;
            wow: {
                package_json: import("../util/FileTree").WFile;
                data: {
                    index: import("../util/FileTree").WFile;
                } & WDirectory;
                wotlk: {
                    package_json: import("../util/FileTree").WFile;
                } & WDirectory;
            } & WDirectory;
            snippets_example: import("../util/FileTree").WFile;
        } & WDirectory;
        adtcreator: {
            adt_creator_exe: import("../util/FileTree").WFile;
        } & WDirectory;
        mpqbuilder: {
            mpqbuilder_exe: import("../util/FileTree").WFile;
            luaxml_exe: import("../util/FileTree").WFile;
        } & WDirectory;
        mysql: {
            mysql_exe: import("../util/FileTree").WFile;
            mysqld_exe: import("../util/FileTree").WFile;
            mysqldump_exe: import("../util/FileTree").WFile;
        } & WDirectory;
        sZip: {
            sza_exe: import("../util/FileTree").WFile;
        } & WDirectory;
        im: {
            convert: import("../util/FileTree").WFile;
            magick: import("../util/FileTree").WFile;
            identify: import("../util/FileTree").WFile;
        } & WDirectory;
        tdb: import("../util/FileTree").WFile;
        cmake: {
            bin: {
                cmake_exe: import("../util/FileTree").WFile;
            } & WDirectory;
            share: WDirectory;
        } & WDirectory;
        ClientExtensions_dll: import("../util/FileTree").WFile;
        include: {
            global_d_ts: import("../util/FileTree").WFile;
            tracy: {
                tracy_hpp: import("../util/FileTree").WFile;
                common: WDirectory;
                client: WDirectory;
            } & WDirectory;
            lua: WDirectory;
        } & WDirectory;
        include_lua: WDirectory;
        BLPConverter: {
            blpconverter: import("../util/FileTree").WFile;
        } & WDirectory;
        tmp: {
            file_changes_txt: import("../util/FileTree").WFile;
        } & WDirectory;
        sql_ac: {
            db_auth: import("../util/FileTree").WFile;
            db_characters: import("../util/FileTree").WFile;
            db_world: import("../util/FileTree").WFile;
        } & WDirectory;
        sql: {
            characters_create_sql: import("../util/FileTree").WFile;
            auth_create_sql: import("../util/FileTree").WFile;
            updates: {
                type: import("../util/FileTree").WDynDirectory<{
                    _335: WDirectory;
                }>;
            } & WDirectory;
            custom: {
                type: import("../util/FileTree").WDynDirectory<{}>;
            } & WDirectory;
        } & WDirectory;
        include_addon: {
            global_d_ts: import("../util/FileTree").WFile;
            Events_ts: import("../util/FileTree").WFile;
            Events_lua: import("../util/FileTree").WFile;
            shared_global_d_ts: import("../util/FileTree").WFile;
            RequireStub_lua: import("../util/FileTree").WFile;
            tsconfig_json: import("../util/FileTree").WFile;
            lualib_bundle: import("../util/FileTree").WFile;
        } & WDirectory;
        core: import("../util/FileTree").WDynDirectory<{
            build: import("../util/FileTree").WDynDirectory<{
                scripts: {
                    moduleLib: (name: string) => import("../util/FileTree").WFile;
                    modulePdb: (name: string) => import("../util/FileTree").WFile;
                } & WDirectory;
                worldserver: import("../util/FileTree").WFile;
                mapextractor: import("../util/FileTree").WFile;
                mmaps_generator: import("../util/FileTree").WFile;
                vmap4assembler: import("../util/FileTree").WFile;
                vmap4extractor: import("../util/FileTree").WFile;
                authserver: import("../util/FileTree").WFile;
                tracy_client: import("../util/FileTree").WFile;
                authserver_conf_dist: import("../util/FileTree").WFile;
                worldserver_conf_dist: import("../util/FileTree").WFile;
                libcrypto: import("../util/FileTree").WFile;
                configs: WDirectory;
            }>;
        }>;
    } & WDirectory;
    coredata: {
        positions_txt: import("../util/FileTree").WFile;
        database: import("../util/FileTree").WFile;
        authserver: {
            authserver_conf: import("../util/FileTree").WFile;
        } & WDirectory;
        commands_yaml: import("../util/FileTree").WFile;
        terminal_history_txt: import("../util/FileTree").WFile;
        last_datascript: import("../util/FileTree").WFile;
        tags: {
            tagfile: (name: string) => import("../util/FileTree").WFile;
        } & WDirectory;
    } & WDirectory;
    modules: {
        module: import("../util/FileTree").WDynDirectory<{
            gitignore: import("../util/FileTree").WFile;
            endpoints: () => ({
                addon: {
                    beforelib_toc: import("../util/FileTree").WFile;
                    before_toc: import("../util/FileTree").WFile;
                    after_toc: import("../util/FileTree").WFile;
                    module_toc: import("../util/FileTree").WFile;
                    index_ts: import("../util/FileTree").WFile;
                    tsconfig_json: import("../util/FileTree").WFile;
                    global_d_ts: import("../util/FileTree").WFile;
                    build: {
                        lualib_bundle_lua: import("../util/FileTree").WFile;
                        lib: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                datascripts: {
                    global_d_ts: import("../util/FileTree").WFile;
                    index: import("../util/FileTree").WFile;
                    tsconfig_json: import("../util/FileTree").WFile;
                    datascripts_conf: import("../util/FileTree").WFile;
                    build: {
                        package_json: import("../util/FileTree").WFile;
                    } & WDirectory;
                    swcrc: import("../util/FileTree").WFile;
                } & WDirectory;
                livescripts: {
                    global_d_ts: import("../util/FileTree").WFile;
                    tsconfig: import("../util/FileTree").WFile;
                    entry: import("../util/FileTree").WFile;
                    livecripts_conf: import("../util/FileTree").WFile;
                    built_library: import("../util/FileTree").WFile;
                    built_pdb: import("../util/FileTree").WFile;
                    build: {
                        dataset: import("../util/FileTree").WDynDirectory<{
                            lua: WDirectory;
                            built_libs: import("../util/FileTree").WDynDirectory<{
                                library: import("../util/FileTree").WFile;
                                pdb: import("../util/FileTree").WFile;
                            }>;
                            cpp: {
                                livescripts: WDirectory;
                                cmakelists_txt: import("../util/FileTree").WFile;
                            } & WDirectory;
                            lib: WDirectory;
                        }>;
                    } & WDirectory;
                } & WDirectory;
                tests: {
                    global_d_ts: import("../util/FileTree").WFile;
                    tsconfig_json: import("../util/FileTree").WFile;
                    test_conf: import("../util/FileTree").WFile;
                    package_json: import("../util/FileTree").WFile;
                    mocharc_json: import("../util/FileTree").WFile;
                    tests: {
                        example_test_ts: import("../util/FileTree").WFile;
                        utils_test_ts: import("../util/FileTree").WFile;
                    } & WDirectory;
                    bin: {
                        tests: WDirectory;
                    } & WDirectory;
                } & WDirectory;
                lua: {
                    example: import("../util/FileTree").WFile;
                    global_d_ts: import("../util/FileTree").WFile;
                    tsconfig_json: import("../util/FileTree").WFile;
                    _inline: WDirectory;
                } & WDirectory;
                shared: {
                    global_d_ts: import("../util/FileTree").WFile;
                } & WDirectory;
                snippets: WDirectory;
                datasets: {
                    dataset: import("../util/FileTree").WDynDirectory<{
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
                                    framexml_toc: import("../util/FileTree").WFile;
                                    TSAddons: {
                                        mod: import("../util/FileTree").WDynDirectory<{}>;
                                    } & WDirectory;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        luaxml_source: {
                            Interface: {
                                FrameXML: {
                                    framexml_toc: import("../util/FileTree").WFile;
                                } & WDirectory;
                            } & WDirectory;
                        } & WDirectory;
                        maps: WDirectory;
                        mmaps: WDirectory;
                        vmaps: WDirectory;
                        config: import("../util/FileTree").WFile;
                        ids_txt: import("../util/FileTree").WFile;
                        modules_txt: import("../util/FileTree").WFile;
                        world_sql: import("../util/FileTree").WFile;
                    } & WDirectory>;
                } & WDirectory;
                realms: {
                    realm: import("../util/FileTree").WDynDirectory<{
                        worldserver_conf: import("../util/FileTree").WFile;
                        worldserver_conf_dist: import("../util/FileTree").WFile;
                        config: import("../util/FileTree").WFile;
                        realm_id: import("../util/FileTree").WFile;
                        core_config: (name: string) => import("../util/FileTree").WFile;
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
                livescript_tsconfig_temp: import("../util/FileTree").WFile;
            } & WDirectory)[];
        }>;
    } & WDirectory;
    package: {
        server_7z: import("../util/FileTree").WFile;
        file: (name: string) => import("../util/FileTree").WFile;
    } & WDirectory;
    package_json: import("../util/FileTree").WFile;
    package_lock_json: import("../util/FileTree").WFile;
} & WDirectory;
export declare const NodeConfig: NodeConfigClass;
export declare const dataset: {
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
                framexml_toc: import("../util/FileTree").WFile;
                TSAddons: {
                    mod: import("../util/FileTree").WDynDirectory<{}>;
                } & WDirectory;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    luaxml_source: {
        Interface: {
            FrameXML: {
                framexml_toc: import("../util/FileTree").WFile;
            } & WDirectory;
        } & WDirectory;
    } & WDirectory;
    maps: WDirectory;
    mmaps: WDirectory;
    vmaps: WDirectory;
    config: import("../util/FileTree").WFile;
    ids_txt: import("../util/FileTree").WFile;
    modules_txt: import("../util/FileTree").WFile;
    world_sql: import("../util/FileTree").WFile;
} & WDirectory;
export declare const datasetName: string;
export declare const AllModules: ({
    addon: {
        beforelib_toc: import("../util/FileTree").WFile;
        before_toc: import("../util/FileTree").WFile;
        after_toc: import("../util/FileTree").WFile;
        module_toc: import("../util/FileTree").WFile;
        index_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        global_d_ts: import("../util/FileTree").WFile;
        build: {
            lualib_bundle_lua: import("../util/FileTree").WFile;
            lib: WDirectory;
        } & WDirectory;
    } & WDirectory;
    datascripts: {
        global_d_ts: import("../util/FileTree").WFile;
        index: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        datascripts_conf: import("../util/FileTree").WFile;
        build: {
            package_json: import("../util/FileTree").WFile;
        } & WDirectory;
        swcrc: import("../util/FileTree").WFile;
    } & WDirectory;
    livescripts: {
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig: import("../util/FileTree").WFile;
        entry: import("../util/FileTree").WFile;
        livecripts_conf: import("../util/FileTree").WFile;
        built_library: import("../util/FileTree").WFile;
        built_pdb: import("../util/FileTree").WFile;
        build: {
            dataset: import("../util/FileTree").WDynDirectory<{
                lua: WDirectory;
                built_libs: import("../util/FileTree").WDynDirectory<{
                    library: import("../util/FileTree").WFile;
                    pdb: import("../util/FileTree").WFile;
                }>;
                cpp: {
                    livescripts: WDirectory;
                    cmakelists_txt: import("../util/FileTree").WFile;
                } & WDirectory;
                lib: WDirectory;
            }>;
        } & WDirectory;
    } & WDirectory;
    tests: {
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        test_conf: import("../util/FileTree").WFile;
        package_json: import("../util/FileTree").WFile;
        mocharc_json: import("../util/FileTree").WFile;
        tests: {
            example_test_ts: import("../util/FileTree").WFile;
            utils_test_ts: import("../util/FileTree").WFile;
        } & WDirectory;
        bin: {
            tests: WDirectory;
        } & WDirectory;
    } & WDirectory;
    lua: {
        example: import("../util/FileTree").WFile;
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        _inline: WDirectory;
    } & WDirectory;
    shared: {
        global_d_ts: import("../util/FileTree").WFile;
    } & WDirectory;
    snippets: WDirectory;
    datasets: {
        dataset: import("../util/FileTree").WDynDirectory<{
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
                        framexml_toc: import("../util/FileTree").WFile;
                        TSAddons: {
                            mod: import("../util/FileTree").WDynDirectory<{}>;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            luaxml_source: {
                Interface: {
                    FrameXML: {
                        framexml_toc: import("../util/FileTree").WFile;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            maps: WDirectory;
            mmaps: WDirectory;
            vmaps: WDirectory;
            config: import("../util/FileTree").WFile;
            ids_txt: import("../util/FileTree").WFile;
            modules_txt: import("../util/FileTree").WFile;
            world_sql: import("../util/FileTree").WFile;
        } & WDirectory>;
    } & WDirectory;
    realms: {
        realm: import("../util/FileTree").WDynDirectory<{
            worldserver_conf: import("../util/FileTree").WFile;
            worldserver_conf_dist: import("../util/FileTree").WFile;
            config: import("../util/FileTree").WFile;
            realm_id: import("../util/FileTree").WFile;
            core_config: (name: string) => import("../util/FileTree").WFile;
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
    livescript_tsconfig_temp: import("../util/FileTree").WFile;
} & WDirectory)[];
export declare const DatascriptModules: ({
    addon: {
        beforelib_toc: import("../util/FileTree").WFile;
        before_toc: import("../util/FileTree").WFile;
        after_toc: import("../util/FileTree").WFile;
        module_toc: import("../util/FileTree").WFile;
        index_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        global_d_ts: import("../util/FileTree").WFile;
        build: {
            lualib_bundle_lua: import("../util/FileTree").WFile;
            lib: WDirectory;
        } & WDirectory;
    } & WDirectory;
    datascripts: {
        global_d_ts: import("../util/FileTree").WFile;
        index: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        datascripts_conf: import("../util/FileTree").WFile;
        build: {
            package_json: import("../util/FileTree").WFile;
        } & WDirectory;
        swcrc: import("../util/FileTree").WFile;
    } & WDirectory;
    livescripts: {
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig: import("../util/FileTree").WFile;
        entry: import("../util/FileTree").WFile;
        livecripts_conf: import("../util/FileTree").WFile;
        built_library: import("../util/FileTree").WFile;
        built_pdb: import("../util/FileTree").WFile;
        build: {
            dataset: import("../util/FileTree").WDynDirectory<{
                lua: WDirectory;
                built_libs: import("../util/FileTree").WDynDirectory<{
                    library: import("../util/FileTree").WFile;
                    pdb: import("../util/FileTree").WFile;
                }>;
                cpp: {
                    livescripts: WDirectory;
                    cmakelists_txt: import("../util/FileTree").WFile;
                } & WDirectory;
                lib: WDirectory;
            }>;
        } & WDirectory;
    } & WDirectory;
    tests: {
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        test_conf: import("../util/FileTree").WFile;
        package_json: import("../util/FileTree").WFile;
        mocharc_json: import("../util/FileTree").WFile;
        tests: {
            example_test_ts: import("../util/FileTree").WFile;
            utils_test_ts: import("../util/FileTree").WFile;
        } & WDirectory;
        bin: {
            tests: WDirectory;
        } & WDirectory;
    } & WDirectory;
    lua: {
        example: import("../util/FileTree").WFile;
        global_d_ts: import("../util/FileTree").WFile;
        tsconfig_json: import("../util/FileTree").WFile;
        _inline: WDirectory;
    } & WDirectory;
    shared: {
        global_d_ts: import("../util/FileTree").WFile;
    } & WDirectory;
    snippets: WDirectory;
    datasets: {
        dataset: import("../util/FileTree").WDynDirectory<{
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
                        framexml_toc: import("../util/FileTree").WFile;
                        TSAddons: {
                            mod: import("../util/FileTree").WDynDirectory<{}>;
                        } & WDirectory;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            luaxml_source: {
                Interface: {
                    FrameXML: {
                        framexml_toc: import("../util/FileTree").WFile;
                    } & WDirectory;
                } & WDirectory;
            } & WDirectory;
            maps: WDirectory;
            mmaps: WDirectory;
            vmaps: WDirectory;
            config: import("../util/FileTree").WFile;
            ids_txt: import("../util/FileTree").WFile;
            modules_txt: import("../util/FileTree").WFile;
            world_sql: import("../util/FileTree").WFile;
        } & WDirectory>;
    } & WDirectory;
    realms: {
        realm: import("../util/FileTree").WDynDirectory<{
            worldserver_conf: import("../util/FileTree").WFile;
            worldserver_conf_dist: import("../util/FileTree").WFile;
            config: import("../util/FileTree").WFile;
            realm_id: import("../util/FileTree").WFile;
            core_config: (name: string) => import("../util/FileTree").WFile;
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
    livescript_tsconfig_temp: import("../util/FileTree").WFile;
} & WDirectory)[];
export declare const EmulatorCore: "trinitycore";
export declare function isTrinityCore(): boolean;
export declare const BuildArgs: {
    USE_TIMER: boolean;
    INLINE_ONLY: boolean;
    READ_ONLY: boolean;
    WRITE_CLIENT: boolean;
    WRITE_SERVER: boolean;
    CLIENT_PATCH_DIR: WDirectory;
    LOG_SQL: boolean;
    NO_LUAXML: boolean;
    DEBUG: boolean;
};
