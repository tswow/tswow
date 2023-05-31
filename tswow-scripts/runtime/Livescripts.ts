import { Args } from "../util/Args";
import { BuildType, BUILD_TYPES } from "../util/BuildType";
import { ConfigFile, Property, Section } from "../util/ConfigFile";
import { mpath, wfs } from "../util/FileSystem";
import { WFile } from "../util/FileTree";
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
    "exclude":["../data","../addons"]
};

const temp_config = (dataset: Dataset) => ({
    'compilerOptions': {
    'target': 'es5',
    'module': 'commonjs',
    'outDir': `./livescripts/build/${dataset.fullName}/cpp`,
    'rootDir': './livescripts',
    'strict': true,
    'esModuleInterop': true,
    'skipLibCheck': true,
    'forceConsistentCasingInFileNames': true
},
'include': ['./shared','./livescripts']
});

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
            {     "name": ipaths.bin.scripts.addons.addons.lua_orm.abs().get()
                , 'import':'LuaORM'
            }
        ]
    }
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

    initialize() {
        if(!this.path.exists()) {
            this.path.mkdir();
            this.path.entry.write(livescript_example);
        }
        ipaths.bin.include.global_d_ts.copy(this.path.global_d_ts);
        this.path.tsconfig.writeJson(scripts_tsconfig_json);
        this.path.entry.write(livescript_example, 'DONT_OVERWRITE')
        this.config.generateIfNotExists();
        return this;
    }

    private buildLua(dataset: Dataset, args: string[] = []) {
        applyTSTLHack();
        ipaths.bin.include_lua.copy(dataset.path.lib.include_lua)
        let config = JSON.parse(JSON.stringify(lua_tsconfig_json));

        let buildDir = this.path.build.dataset.pick(dataset.fullName).lua
        config["compilerOptions"]["outDir"] = buildDir.relativeTo(this.path).get()
        this.path.tsconfig.writeJson(config);

        config["compilerOptions"]["outDir"] = buildDir.relativeTo(this.mod.path).get()
        config['include'] = ['livescripts','shared']
        config['compilerOptions']['rootDir'] = this.path.dirname().abs().get();
        this.mod.path.livescript_tsconfig_temp.writeJson(config)

        let foundTs = false;
        this.path.iterateDef(node=>{
            if(node.isFile() && node.endsWith('.ts')) {
                foundTs = true;
                return 'HALT'
            }
        })

        if(foundTs) {
            term.log(this.logName(),`Compiling ts->lua`)
            wsys.execIn(
                this.mod.path.get()
            , `node ${ipaths.node_modules.tstl_js.abs()}`
            )
        }

        term.log(this.logName(),`Copying lua sources`);

        [this.mod.path.shared,this.mod.path.livescripts].forEach(x=>{
            x.iterate('RECURSE','BOTH','FULL',node=>{
                if(node.basename().get() === 'build') {
                    return 'ENDPOINT'
                }
                if(node.isFile() && node.endsWith('.lua')) {
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

        this.luaInstallPath(dataset).iterate('RECURSE','FILES','ABSOLUTE',(node)=>{
            if(!node.isFile() || !node.endsWith('.lua')) {
                return;
            }

            let lines = node
                .toFile()
                .readString()
                .split('\r').join('')
                .split('\n')
                .map(contents=>{
                    return ApplyTagMacros(contents, dataset.fullName, 'LUA');
                })
                .join('\n');

            if(node.basename().get() === '__inline_main.lua') {
                lines = lines.split(`livescripts.build.${dataset.fullName}.inline.`).join('')
            }
            node.toFile().write(lines,'OVERWRITE');
        });
        IdPublic.flushMemory()

        term.success(this.logName(),`Finished building lua`)
    }

    private buildCxx(dataset: Dataset, buildType: BuildType, args: string[] = []) {
        let tracyArg = args.find(x=>x.startsWith('tracy'))

        this.mod.path.livescript_tsconfig_temp.writeJson(temp_config(dataset))
        try {
            wsys.execIn(
                  `${this.mod.path.abs()}`
                , `node -r source-map-support/register`
                + ` ${ipaths.bin.scripts.typescript2cxx.typescript2cxx.main_js.abs()} tsconfig.json`
                + ` ${(args.join(' '))}`
                + ` --ipaths=${ipaths.abs()}`
                + ` --datasetName=${dataset.fullName}`
                + ` --datasetPath=${dataset.path.abs().get()}`
                + ` ${tracyArg ? tracyArg : ''}`
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
        builddir.cpp
            .iterate('RECURSE','FILES','FULL',node=>{
                let g = node.toFile().withExtension('').relativeTo(builddir.cpp)
                if(SPECIAL_FILES.includes(g.basename().get())) return;
                let ts = this.path.dirname().join(g).get()+'.ts'
                if(!wfs.exists(ts)) {
                    if(node.endsWith('.cpp')) { // don't double print on header
                        console.log(ts,"no longer exists, removing generated c++ files");
                    }
                    node.remove();
                }
            });

        builddir.cpp.cmakelists_txt
            .write(getLivescriptCMakeLists(dataset.config.EmulatorCore,buildType,this.mod.fullName))

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

        // Delete old versions of the scripts
        if(!isTranspileOnly) {
            this.luaInstallPath(dataset).remove();
            BUILD_TYPES.forEach(x=>{
                dataset.path.lib.join(x,this.mod.fullName+'.dll').remove();
                dataset.path.lib.join(x,this.mod.fullName+'.so').remove();
                dataset.path.lib.join(x,this.mod.fullName+'.pdb').remove();
            })
        }

        // Build datascripts
        if(this.mod.datascripts.exists() && ! Args.hasFlag('--no-inline',args) && this.config.InlineScripts) {
            await Datascripts.build(dataset,['--inline-only'])
        }

        // Build scripts
        let generateType: 'lua'|'c++' = args.includes('lua')
            ? 'lua'
            : Args.hasFlag('c++',args) || Args.hasFlag('cxx',args)
            ? 'c++'
            : this.config.Backend
        
        switch(generateType) {
            case 'lua':
                this.buildLua(dataset,args);
                break;
            case 'c++':
                this.buildCxx(dataset,buildType,args);
                break;
        }

        // Reload
        if(!isTranspileOnly) {
            dataset.realms()
                .filter(x=>x.worldserver.isRunning())
                .forEach(x=>x.worldserver.send(`reload livescripts`))
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
        ListCommand.addCommand(
              'livescripts'
            , 'module?'
            , ''
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
            , '(module|dataset)[]? --transpile-only'
            , 'Comiles and hotswaps livescripts for select modules or'
            + 'modules within a dataset'
            , args => {
                const buildType = Identifier
                    .getBuildType(args,NodeConfig.DefaultBuildType)

                const datasets = Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                )

                return Promise.all(datasets.map(dataset=>{
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
                    return Promise.all(modules.map(x=>{
                        return x.livescripts.build(dataset,buildType,args);
                    }))
                }));
            }
        ).addAlias('scripts').addAlias('script').addAlias('livescript')

        CleanCommand.addCommand(
            'livescripts'
          , 'modules'
          , ''
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