import { Args } from "../util/Args";
import { BuildType, BUILD_TYPES } from "../util/BuildType";
import { ConfigFile, Property, Section } from "../util/ConfigFile";
import { mpath, wfs } from "../util/FileSystem";
import { WFile, WDirectory } from "../util/FileTree";
import { IdPrivate } from "../util/ids/Ids";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { ApplyTagMacros } from "../util/TagMacros";
import { term } from "../util/Terminal";
import { termCustom } from "../util/TerminalCategories";
import { Timer } from "../util/Timer";
import { BuildCommand, CleanCommand, ListCommand } from "./CommandActions";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { getLivescriptCMakeLists } from "./LivescriptsCMakeLists";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeExecutable } from "./Node";
import { NodeConfig } from "./NodeConfig";
import { applyTSTLHack } from "./TSTLHack";

const livescript_example =
`export function Main(events: TSEvents) {
    // Register your events here!
}`;

/**
 * This is just used for VSCodium, not compiling.
 * See "TypeScript2Cxx/src/wowts.ts" for the tsconfig actually used for compiling.
 */
const scripts_tsconfig_json =
{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "outDir": "./build",
      "rootDir": "../",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "experimentalDecorators": true,
      "forceConsistentCasingInFileNames": true
    },
    "include":["./","../Ids.ts","../shared"],
    "exclude":["./build", "../data","../addons"]
};

const temp_config = (dataset: Dataset) => {
    const include = ['./shared','./livescripts'];
    // Only include inline directory if it exists
    const inlineDir = `./build/${dataset.fullName}/inline`;
    if (require('fs').existsSync(inlineDir)) {
        include.push(inlineDir);
    }

    return {
        '__tswow_backend': 'c++', // Add identifier to track which config this is
        'compilerOptions': {
        'target': 'es5',
        'module': 'commonjs',
        'outDir': `./livescripts/build/${dataset.fullName}/cpp`,
        'rootDir': './',
        'strict': true,
        'esModuleInterop': true,
        'skipLibCheck': true,
        'forceConsistentCasingInFileNames': true,
        'typeRoots': [], // Don't search for types in node_modules/@types or system paths
        'types': [], // Don't include any automatic type packages
        'moduleResolution': 'node', // Use Node.js-style module resolution
        'noResolve': false, // Do resolve modules
        'paths': {} // No path mappings
    },
        'include': include,
        'exclude': ['./livescripts/build']
    };
};

export class LiveScriptsConfig extends ConfigFile {
    protected description(): string {
        return "LiveScript Settings"
    }

    @Section('LiveScripts')

    @Property({
          name: 'LiveScripts.Backend'
        , description: 'What these scripts should be transpiled into by default'
        , examples: [
            ['lua','Transpiles ts* script files to lua'],
            ['c++','Transpiles ts* script files to c++']
        ]
    })
    Backend: 'lua'|'c++' = this.undefined()

    @Property({
          name: 'LiveScripts.InlineScripts'
        , description: 'Whether to build minimal datascripts every script build to find inlinescripts'
        , examples: [
            [true,''],
            [false,'']
        ]
    })
    InlineScripts: boolean = this.undefined()

    @Property({
          name: 'LiveScripts.FilteredPaths'
        , description: 'Paths to exclude from PATH environment during compilation to avoid symbolic link loops'
        , examples: [
            ['/bin','Excludes /bin directory'],
            ['/bin:/usr/local/bin','Excludes multiple directories separated by colon']
        ]
    })
    FilteredPaths: string = '/bin'
}

const lua_tsconfig_json = {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "sourceMap": true,
      "experimentalDecorators": true,
      "forceConsistentCasingInFileNames": true
    },
    "tstl": {
      "luaTarget": "5.4",
      "noImplicitSelf": true,
      "luaPlugins": [
            {     "name": ipaths.bin.scripts.addons.lua_orm.abs().get()
                , 'import':'LuaORM'
            }
        ]
    },
    "exclude": ["./livescripts/build/lib"]
}

export class Livescripts {
    readonly mod: ModuleEndpoint
    readonly config: LiveScriptsConfig

    get path() {
        return this.mod.path.livescripts
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
        this.config = new LiveScriptsConfig(this.path.livecripts_conf.get())
    }

    static create(mod: ModuleEndpoint) {
        return new Livescripts(mod).initialize()
    }

    logName() {
        return termCustom('livescripts',this.mod.fullName)
    }

    private getCacheFile(dataset: Dataset, buildType: BuildType): WFile {
        return new WFile(this.path.build.dataset.pick(dataset.fullName).join(`.cache_${buildType}.json`).get());
    }

    private async getSourceFiles(): Promise<WFile[]> {
        const files: WFile[] = [];

        // Collect TypeScript files from livescripts directory
        this.path.iterate('RECURSE', 'FILES', 'ABSOLUTE', (node) => {
            if (node.isFile() && (node.endsWith('.ts') || node.endsWith('.lua'))) {
                files.push(node.toFile());
            }
        });

        // Also check shared directory
        if (this.mod.path.shared.exists()) {
            this.mod.path.shared.iterate('RECURSE', 'FILES', 'ABSOLUTE', (node) => {
                if (node.isFile() && (node.endsWith('.ts') || node.endsWith('.lua'))) {
                    files.push(node.toFile());
                }
            });
        }

        return files;
    }

    private async hasSourcesChanged(dataset: Dataset, buildType: BuildType, generateType: 'lua' | 'c++'): Promise<boolean> {
        const cacheFile = this.getCacheFile(dataset, buildType);

        // If no cache file exists, sources have "changed" (need to build)
        if (!cacheFile.exists()) {
            if (Args.hasFlag('debug', process.argv)) {
                term.log(this.logName(), `Cache file not found: ${cacheFile.get()}`);
            }
            return true;
        }

        // Check if output files exist
        if (generateType === 'c++') {
            const outputLib = this.cxxInstallPath(dataset, buildType);
            if (!outputLib.exists()) {
                if (Args.hasFlag('debug', process.argv)) {
                    term.log(this.logName(), `Output library not found: ${outputLib.get()}`);
                }
                return true;
            }
        } else {
            const luaPath = this.luaInstallPath(dataset);
            if (!luaPath.exists()) {
                if (Args.hasFlag('debug', process.argv)) {
                    term.log(this.logName(), `Lua output path not found: ${luaPath.get()}`);
                }
                return true;
            }
        }

        // Read cache
        let cache: {[path: string]: number};
        try {
            cache = cacheFile.readJson();
        } catch {
            if (Args.hasFlag('debug', process.argv)) {
                term.log(this.logName(), `Invalid cache file: ${cacheFile.get()}`);
            }
            return true; // Invalid cache
        }

        // Get current source files
        const sourceFiles = await this.getSourceFiles();

        // Check if any file has been modified or added
        for (const file of sourceFiles) {
            const path = file.abs().get();
            const currentMtime = file.mtimeMs();

            // Skip generated files that shouldn't be tracked
            if (path.includes('/build/') || path.endsWith('/tsconfig.json') ||
                path.endsWith('/global.d.ts') || path.endsWith('.conf')) {
                continue;
            }

            if (!cache[path] || cache[path] !== currentMtime) {
                if (Args.hasFlag('debug', process.argv)) {
                    term.log(this.logName(), `File changed: ${path} (cached: ${cache[path] || 'not found'}, current: ${currentMtime})`);
                }
                return true;
            }
        }

        // Check if any cached file has been deleted
        for (const cachedPath in cache) {
            // Skip checking generated files
            if (cachedPath.includes('/build/') || cachedPath.endsWith('/tsconfig.json') ||
                cachedPath.endsWith('/global.d.ts') || cachedPath.endsWith('.conf')) {
                continue;
            }

            if (!wfs.exists(cachedPath)) {
                if (Args.hasFlag('debug', process.argv)) {
                    term.log(this.logName(), `Cached file deleted: ${cachedPath}`);
                }
                return true;
            }
        }

        return false;
    }

    private async updateCache(dataset: Dataset, buildType: BuildType): Promise<void> {
        const cacheFile = this.getCacheFile(dataset, buildType);
        const sourceFiles = await this.getSourceFiles();

        const cache: {[path: string]: number} = {};
        for (const file of sourceFiles) {
            const path = file.abs().get();
            // Skip generated files that shouldn't be tracked
            if (path.includes('/build/') || path.endsWith('/tsconfig.json') ||
                path.endsWith('/global.d.ts') || path.endsWith('.conf')) {
                continue;
            }
            cache[path] = file.mtimeMs();
        }

        cacheFile.writeJson(cache);
    }

    initialize() {
        if(!this.path.exists()) {
            this.path.mkdir();
            this.path.entry.write(livescript_example);
        }
        // Only copy/write files if they don't exist or have changed
        const globalDtsTarget = this.path.global_d_ts;
        if (!globalDtsTarget.exists() ||
            ipaths.bin.include.global_d_ts.toFile().readString() !== globalDtsTarget.readString()) {
            ipaths.bin.include.global_d_ts.copy(globalDtsTarget);
        }

        const tsconfigTarget = this.path.tsconfig;
        const tsconfigContent = JSON.stringify(scripts_tsconfig_json, null, 2);
        if (!tsconfigTarget.exists() || tsconfigTarget.readString() !== tsconfigContent) {
            tsconfigTarget.writeJson(scripts_tsconfig_json);
        }

        this.path.entry.write(livescript_example, 'DONT_OVERWRITE')
        this.config.generateIfNotExists();
        return this;
    }

    private async buildLua(dataset: Dataset, args: string[] = []): Promise<void> {
        applyTSTLHack();
        ipaths.bin.include_lua.copy(dataset.path.lib.include_lua)
        let config = JSON.parse(JSON.stringify(lua_tsconfig_json));
        config['__tswow_backend'] = 'lua'; // Add identifier to track which config this is

        let buildDir = this.path.build.dataset.pick(dataset.fullName).lua
        config["compilerOptions"]["outDir"] = buildDir.relativeTo(this.path).get()
        this.path.tsconfig.writeJson(config);

        config["compilerOptions"]["outDir"] = buildDir.relativeTo(this.mod.path).get()
        config['include'] = ['livescripts','shared']
        config['compilerOptions']['rootDir'] = this.path.dirname().abs().get();

        // Remove any existing temp config to ensure clean state
        this.mod.path.livescript_tsconfig_temp.remove();
        this.mod.path.livescript_tsconfig_temp.writeJson(config)

        let foundTs = false;
        if (Args.hasFlag('debug', args)) {
            term.log(this.logName(), `Scanning for TypeScript files in ${this.path.get()}`);
        }
        this.path.iterateDef(node=>{
            if(node.isFile() && node.endsWith('.ts')) {
                if (Args.hasFlag('debug', args)) {
                    term.log(this.logName(), `Found TypeScript file: ${node.get()}`);
                }
                foundTs = true;
                return 'HALT'
            }
        })

        if(foundTs) {
            term.log(this.logName(),`Compiling ts->lua`)
            wsys.execIn(
                this.mod.path.get()
            , `${NodeExecutable} ${ipaths.node_modules.tstl_js.abs()} --project livescript_tsconfig_temp.json`
            )
        }

        term.log(this.logName(),`Copying lua sources`);

        [this.mod.path.shared,this.mod.path.livescripts].forEach(x=>{
            if (Args.hasFlag('debug', args)) {
                term.log(this.logName(), `Scanning directory for lua files: ${x.get()}`);
            }
            x.iterate('RECURSE','BOTH','FULL',node=>{
                if(node.basename().get() === 'build') {
                    return 'ENDPOINT'
                }
                if(node.isFile() && node.endsWith('.lua')) {
                    if (Args.hasFlag('debug', args)) {
                        term.log(this.logName(), `Copying lua file: ${node.get()} -> ${buildDir.join(node.relativeTo(this.mod.path)).get()}`);
                    }
                    node.copy(buildDir.join(node.relativeTo(this.mod.path)))
                }
            })
        })

        if(Args.hasFlag('transpile-only',args)) {
            term.log(this.logName(),`Successfully transpiled LiveScript Lua`)
            return;
        }

        buildDir.iterate('RECURSE','FILES','FULL', node => {
            let rel = node.relativeTo(buildDir)
            let file = this.mod.path.join(rel)
            if(!node.basename().startsWith('__') && node.endsWith('.lua') && !file.withExtension('.ts',true).exists() && !file.withExtension('.lua',true).exists()) {
                if(rel.basename().get() !== 'lualib_bundle.lua') {
                    term.log(this.logName(),`Cleaning up removed lua file ${rel.get()}`)
                }
                node.remove();
            }
        })

        buildDir.copy(this.luaInstallPath(dataset))

        // todo: please fix this singleton hell already.
        //       this is fine because we're not multithreading.
        class IdPublic extends IdPrivate {
            static readFile = () => IdPrivate.readFile(dataset.path.ids_txt.get());
            static flushMemory = () => IdPrivate.flushMemory();
        }
        IdPublic.readFile();

        const luaFiles: any[] = [];
        this.luaInstallPath(dataset).iterate('RECURSE','FILES','ABSOLUTE',(node)=>{
            if(!node.isFile() || !node.endsWith('.lua')) {
                return;
            }
            luaFiles.push(node);
        });

        for (const node of luaFiles) {
            let fileContent = node
                .toFile()
                .readString();

            // Apply tag macros to the entire file content
            fileContent = await ApplyTagMacros(fileContent, dataset.fullName, 'LUA');

            if(node.basename().get() === '__inline_main.lua') {
                fileContent = fileContent.split(`livescripts.build.${dataset.fullName}.inline.`).join('')
            }
            node.toFile().write(fileContent,'OVERWRITE');
        }
        IdPublic.flushMemory()

        term.success(this.logName(),`Finished building lua`)
    }

    private buildCxx(dataset: Dataset, buildType: BuildType, args: string[] = []) {
        let tracyArg = args.find(x=>x.startsWith('tracy'))

        // Remove any existing temp config to ensure clean state
        this.mod.path.livescript_tsconfig_temp.remove();
        this.mod.path.livescript_tsconfig_temp.writeJson(temp_config(dataset))

        try {
            // Create a modified PATH that excludes configured paths to avoid symbolic link loops
            const currentPath = process.env.PATH || '';
            const filteredPathsConfig = this.config.FilteredPaths || '';
            const pathsToFilter = filteredPathsConfig.split(':').filter(p => p.trim().length > 0);

            let filteredPath = currentPath;
            if (pathsToFilter.length > 0) {
                filteredPath = currentPath.split(':').filter(p => !pathsToFilter.includes(p)).join(':');
            }

            // Filter args to only include flags (starting with -)
            const flagArgs = args.filter(arg => arg.startsWith('-'));

            const tsxCommand = `PATH="${filteredPath}" ${NodeExecutable} --enable-source-maps --stack-trace-limit=1000`
                + ` ${ipaths.bin.scripts.typescript2cxx.main_js.abs()} livescript_tsconfig_temp.json`
                + ` ${(flagArgs.join(' '))}`
                + ` --ipaths=${ipaths.abs()}`
                + ` --datasetName=${dataset.fullName}`
                + ` --datasetPath=${dataset.path.abs().get()}`
                + ` ${tracyArg ? tracyArg : ''}`;


            wsys.execIn(
                  `${this.mod.path.abs()}`
                , tsxCommand
                , 'inherit'
            )

        } catch(err) {
            // the error has already been printed
            throw new Error(`Failed to compile LiveScripts`);
        }

        if(Args.hasFlag('transpile-only',args)) {
            term.log(this.logName(),`Successfully transpiled LiveScript C++`)
            return;
        }

        this.mod.path.livescript_tsconfig_temp.remove();

        const SPECIAL_FILES = ['ModID','PacketCreator','TableCreator','TCLoader']
        const builddir = this.path.build.dataset.pick(dataset.fullName)

        if (Args.hasFlag('debug', args)) {
            term.log(this.logName(), `Cleaning up orphaned C++ files in: ${builddir.cpp.get()}`);
        }

        builddir.cpp
            .iterate('RECURSE','FILES','FULL',node=>{
                let g = node.toFile().withExtension('').relativeTo(builddir.cpp)
                if(SPECIAL_FILES.includes(g.basename().get())) return;
                // Look for the .ts file in the module root, not just livescripts
                let ts = this.mod.path.join(g).get()+'.ts'
                if(!wfs.exists(ts)) {
                    if (Args.hasFlag('debug', args)) {
                        term.log(this.logName(), `Removing orphaned C++ file: ${node.get()} (no corresponding .ts file found at ${ts})`);
                    }
                    node.remove();
                }
            });


        builddir.cpp.cmakelists_txt
            .write(getLivescriptCMakeLists(buildType,this.mod.fullName))

            const cmake_generate =
            (isWindows()
                ? `"bin/cmake/bin/cmake.exe" -G "Visual Studio 17 2022" -DCMAKE_GENERATOR="Visual Studio 17 2022"`
                : 'cmake')
            + ` -DTRACY_ENABLE="${Args.hasFlag('tracy',args) ? 'ON': 'OFF'}"`
            + ` -S ${builddir.cpp.abs()}`
            + ` -B ${builddir.lib.abs()}`
        try {
            term.log(this.logName(),`Generating CMake project...`)
            wsys.exec(cmake_generate, !process.argv.includes('--silent')?'inherit':'ignore');
        } catch(err) {
            term.error(this.logName(),`Failed to generate CMake files, please report this error`);
        }
        const cmake_build =
            (isWindows()
                ? `"bin/cmake/bin/cmake.exe"`
                : `cmake`)
            + ` --build ${builddir.lib.abs()}`
            + ` --config ${buildType}`;

        try {
            term.log(this.logName(),`Compiling C++ binary...`)
            wsys.exec(cmake_build,!process.argv.includes('--silent') ? 'inherit' : 'ignore')
        } catch (error) {
            term.error(this.logName(),`Failed to compile library, please report this error`);
        }

        let lib = builddir.built_libs.pick(buildType).library
        lib.copy(this.cxxInstallPath(dataset, buildType))
        if(isWindows()) {
            let pdb = builddir.built_libs.pick(buildType).pdb;
            pdb.copy(dataset.path.lib.join(buildType).join(pdb.basename()))
        }
    }

    private luaInstallPath(dataset: Dataset)  {
        return dataset.path.lib.lua.join(this.mod.fullName).abs();
    }

    private cxxInstallPath(dataset: Dataset, buildType: BuildType) {
        return isWindows()
            ? new WFile(mpath(dataset.path.lib,buildType,`${this.mod.fullName}.dll`))
            : new WFile(mpath(dataset.path.lib,buildType,`${this.mod.fullName}.so`))
    }

    async build(dataset: Dataset, buildType: BuildType, args: string[] = []) {
        // Init
        this.initialize();
        const timer = Timer.start();
        const isTranspileOnly = Args.hasFlag('transpile-only',args)
        const forceRebuild = Args.hasFlag('force',args) || Args.hasFlag('rebuild',args)

        if (Args.hasFlag('debug', args)) {
            term.log(this.logName(), `Starting build for module: ${this.mod.fullName}`);
            term.log(this.logName(), `Dataset: ${dataset.fullName}, BuildType: ${buildType}`);
            term.log(this.logName(), `Args: ${args.join(' ')}`);
            term.log(this.logName(), `Livescripts path: ${this.path.get()}`);
        }

        // Determine build type
        let generateType: 'lua'|'c++' = args.includes('lua')
            ? 'lua'
            : Args.hasFlag('c++',args) || Args.hasFlag('cxx',args)
            ? 'c++'
            : this.config.Backend

        // Check if sources have changed
        if (!forceRebuild && !isTranspileOnly) {
            const sourcesChanged = await this.hasSourcesChanged(dataset, buildType, generateType);
            if (!sourcesChanged) {
                term.log(this.logName(), `Skipping ${this.mod.fullName} - no changes detected`);
                return;
            }
        }

        // Delete old versions of the scripts
        if(!isTranspileOnly) {
            this.luaInstallPath(dataset).remove();
            BUILD_TYPES.forEach(x=>{
                dataset.path.lib.join(x,this.mod.fullName+'.dll').remove();
                dataset.path.lib.join(x,this.mod.fullName+'.so').remove();
                dataset.path.lib.join(x,this.mod.fullName+'.pdb').remove();
            })
        }

        term.log(this.logName(), `Build backend: ${generateType} (config: ${this.config.Backend}, args: ${args.join(' ')})`);

        switch(generateType) {
            case 'lua':
                await this.buildLua(dataset,args);
                break;
            case 'c++':
                this.buildCxx(dataset,buildType,args);
                break;
        }

        // Update cache after successful build
        if (!isTranspileOnly) {
            await this.updateCache(dataset, buildType);
        }

        term.log(this.logName(),`Rebuilt code for ${this.mod.fullName} in ${timer.timeSec()}s`)
    }

    exists() {
        return this.path.exists()
    }

    static all() {
        return Module.endpoints()
            .filter(x=>x.livescripts.exists())
            .map(x=>new Livescripts(x))
    }

    static initialize() {
        term.debug('misc', `Initializing livescripts`)
        ListCommand.addCommand(
              'livescripts'
            , 'module?'
            , 'Lists all modules with livescripts or livescripts in specified module'
            , args => {
                let isModule = Identifier.isModule(args[0])
                Livescripts.all()
                    .filter(x=> !isModule || x.mod.mod.id === args[0])
                    .forEach(x=>term.log('livescripts',x.path.get()))
            }
        ).addAlias('livescript')
         .addAlias('script')
         .addAlias('scripts')

        BuildCommand.addCommand(
              'livescripts'
            , '(module|dataset)[]? --transpile-only --debug --force'
            , 'Compiles and hotswaps livescripts for select modules or '
            + 'modules within a dataset (skips unchanged files unless --force)'
            , async args => {
                const buildType = Identifier
                    .getBuildType(args,NodeConfig.DefaultBuildType)

                const datasets = Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                );

                // Build datascripts
                if(!Args.hasFlag('--no-inline',args))
                {
                    for(const dataset of datasets)
                    {
                        if(dataset.modules().find(x=>x.datascripts.exists()))
                        {
                            await Datascripts.build(dataset,['--inline-only'])
                        }
                    }
                }

                // Build livescripts
                for(const dataset of datasets) {
                    let modules = Identifier.getModules(args,'ALLOW_NONE')
                    if(modules.length === 0) {
                        modules = dataset.modules().filter(x=>x.livescripts.exists())
                        if(modules.length === 0) {
                            throw new Error(`Dataset ${dataset.fullName} has no modules with livescripts`)
                        }
                    } else {
                        modules = modules
                            .filter(x=>x.livescripts.exists())
                            .filter(
                                module => dataset.modules()
                                    .find(x=>x.fullName === module.fullName)
                            )
                        if(modules.length === 0) {
                            throw new Error(
                                  `Specified modules ${args.filter(x=>Identifier.isModule(x))} `
                                + ` and dataset ${dataset.fullName} have no overlapping modules with livescripts`
                            )
                        }
                    }

                    if (Args.hasFlag('debug', args)) {
                        term.log('livescripts', `Dataset ${dataset.fullName}: Found ${modules.length} modules with livescripts`);
                        modules.forEach(module => {
                            term.log('livescripts', `  - Module: ${module.fullName} at ${module.path.livescripts.get()}`);
                        });
                    }

                    for(const module of modules)
                    {
                        await module.livescripts.build(dataset,buildType,args);
                    }
                };

                // Reload scripts
                if(!Args.hasFlag('transpile-only',args)) {
                    datasets.forEach(dataset=>{
                        dataset.realms()
                            .filter(x=>x.worldserver.isRunning())
                            .forEach(x=>{
                                term.log(x.logName(),'Sending script reloading command')
                                x.worldserver.send(`reload livescripts`)
                            })
                    })
                }
            }
        ).addAlias('scripts').addAlias('script').addAlias('livescript')

        CleanCommand.addCommand(
            'livescripts'
          , 'modules'
          , 'Removes livescripts build artifacts for specified modules'
          , async args => {
            let mods = args.length === 0
                ? Module.endpoints().filter(x=>x.livescripts.exists())
                : Identifier.getModules(args,'MATCH_ALL')

            mods.forEach(mod=>{
                // First, at least try to remove the cpp builds
                const builddir = mod.path.livescripts.build;

                builddir.dataset.all().forEach(x=>{
                    if(x.cpp.exists()) {
                        term.log('livescripts',`Removing ${x.cpp.get()}`)
                    }
                    x.cpp.remove();

                    // Remove cache files
                    if (x.exists() && x.isDirectory()) {
                        x.toDirectory().iterate('FLAT', 'FILES', 'ABSOLUTE', (file) => {
                            if (file.basename().get().startsWith('.cache_')) {
                                term.log('livescripts', `Removing cache file ${file.get()}`);
                                file.remove();
                            }
                        });
                    }
                })

                try {
                    if(builddir.exists()) {
                        term.log('livescripts',`Removing ${mod.path.livescripts.build}`)
                    }
                    builddir.remove()
                } catch(err) {
                    term.error(
                          'livescripts'
                        , `Failed to remove lib for ${mod.fullName},`
                        + ` do you have the project open in visual studio?`
                        + ` code files were still cleaned, so this might not matter.`
                    )
                }

                Dataset.all().forEach(dataset=>{
                    mods.forEach(mod=>dataset.path.lib.iterateDef(subdir=>
                        subdir.toDirectory().iterateDef(file=>{
                            if(file.basename().startsWith(mod.fullName+'.')) {
                                file.remove();
                            }
                        })
                    ))
                })
            })
          }
        ).addAlias('scripts').addAlias('script').addAlias('livescript')
    }
}
