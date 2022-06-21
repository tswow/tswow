import { Args } from "../util/Args";
import { BuildType } from "../util/BuildType";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
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


export class Livescripts {
    readonly mod: ModuleEndpoint

    get path() {
        return this.mod.path.livescripts
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
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
        return this;
    }

    async build(dataset: Dataset, buildType: BuildType, args: string[] = []) {
        const timer = Timer.start();
        this.initialize();

        if(this.mod.datascripts.exists() && ! args.includes('--no-inline')) {
            await Datascripts.build(dataset,['--inline-only'])
        }

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

        if(args.includes('--transpile-only')) {
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
                ? `"bin/cmake/bin/cmake.exe" -DCMAKE_GENERATOR="Visual Studio 16 2019"`
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
        lib.copy(dataset.path.lib.join(buildType,lib.basename()))
        if(isWindows()) {
            let pdb = builddir.built_libs.pick(buildType).pdb;
            pdb.copy(dataset.path.lib.join(buildType).join(pdb.basename()))
        }
        dataset.realms()
            .filter(x=>x.worldserver.isRunning())
            .forEach(x=>x.worldserver.send(`reload livescripts`))

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