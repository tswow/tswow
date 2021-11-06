import { BuildType } from "../util/BuildType";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { Timer } from "../util/Timer";
import { BuildCommand, ClearCommand, ListCommand } from "./CommandActions";
import { Datascripts } from "./Datascripts";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { getLivescriptCMakeLists } from "./LivescriptsCMakeLists";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeConfig } from "./NodeConfig";

const livescript_example =
`export function Main(events: TSEventHandlers) {
    // Register your events here!
}`;

/**
 * This is just used for VSCodium, not compiling.
 * See "TypeScript2Cxx/src/wowts.ts" for the tsconfig actually used for compiling.
 */
const scripts_tsconfig_json =
`{
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
}`;

const temp_config = {
    'compilerOptions': {
    'target': 'es5',
    'module': 'commonjs',
    'outDir': './livescripts/build/cpp',
    'rootDir': './livescripts',
    'strict': true,
    'esModuleInterop': true,
    'skipLibCheck': true,
    'forceConsistentCasingInFileNames': true
},
'include': ['./shared','./livescripts']
};


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

    async build(buildType: BuildType, args: string[] = []) {
        const timer = Timer.start();
        this.initialize();

        if(!args.includes('--no-inline')) {
            await Promise.all(Dataset.all()
                .filter(x=>x.modules().find(x=>x.fullName === this.mod.fullName))
                .map(x=>{
                    return Datascripts.build(x,['--inline-only'])
                }))
        }

        this.mod.path.livescript_tsconfig_temp.writeJson(temp_config)
        try {
            wsys.execIn(
                  `${this.mod.path.abs()}`
                , `node -r source-map-support/register`
                + ` ${ipaths.bin.scripts.typescript2cxx.typescript2cxx.main_js.abs()} tsconfig.json`
                + ` ${(args.join(' '))}`
                + ` --ipaths=${ipaths.abs()}`
                , 'inherit'
            )
        } catch(err) {
            // the error has already been printed
            throw new Error(`Failed to compile LiveScripts`);
        }
        this.mod.path.livescript_tsconfig_temp.remove();

        const SPECIAL_FILES = ['ModID','PacketCreator','TableCreator','TCLoader']
        this.path.build.cpp
            .iterate('RECURSE','FILES','FULL',node=>{
                let g = node.toFile().withExtension('').relativeTo(this.path.build.cpp)
                if(SPECIAL_FILES.includes(g.basename().get())) return;
                let ts = this.path.dirname().join(g).get()+'.ts'
                if(!wfs.exists(ts)) {
                    if(node.endsWith('.cpp')) { // don't double print on header
                        console.log(ts,"no longer exists, removing generated c++ files");
                    }
                    node.remove();
                }
            });

        this.path.build.cpp.cmakelists_txt
            .write(getLivescriptCMakeLists(buildType,this.mod.fullName))

            const cmake_generate =
            (isWindows()
                ? `"bin/cmake/bin/cmake.exe"`
                : 'cmake')
            + ` -S ${this.path.build.cpp.abs()}`
            + ` -B ${this.path.build.lib.abs()}`
        try {
            term.cyan(`Generating CMake project...`)
            wsys.exec(cmake_generate, !process.argv.includes('--silent')?'inherit':'ignore');
        } catch(err) {
            term.error(`Failed to generate CMake files, please report this error`);
        }
        const cmake_build =
            (isWindows()
                ? `"bin/cmake/bin/cmake.exe"`
                : `cmake`)
            + ` --build ${this.path.build.lib.abs()}`
            + ` --config ${buildType}`;

        try {
            term.cyan(`Compiling C++ binary...`)
            wsys.exec(cmake_build,!process.argv.includes('--silent') ? 'inherit' : 'ignore')
        } catch (error) {
            term.error(`Failed to compile library, please report this error`);
        }

        this.path.built_libs.pick(buildType).library
            .copy(ipaths.bin.trinitycore.build.pick(buildType).scripts.moduleLib(this.mod.fullName))

        if(isWindows()) {
            this.path.built_libs.pick(buildType).pdb
                .copy(ipaths.bin.trinitycore.build.pick(buildType).scripts.modulePdb(this.mod.fullName))
        }

        term.log(ipaths.bin.trinitycore.build.pick(buildType).scripts.moduleLib(this.mod.fullName).get())

        term.log(`Rebuilt code for ${this.mod.fullName} in ${timer.timeSec()}s`)
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
                    .forEach(x=>term.log(x.path.get()))
            }
        ).addAlias('livescript')
         .addAlias('script')
         .addAlias('scripts')

        BuildCommand.addCommand(
              'livescripts'
            , '(module|dataset)[]?'
            , 'Comiles and hotswaps livescripts for select modules or'
            + 'modules within a dataset'
            , args => {
                const buildType = Identifier
                    .getBuildType(args,NodeConfig.DefaultBuildType)
                let modules = Identifier.getModules(args,'ALLOW_NONE')
                    .concat(
                        Identifier.getDatasets(args,'ALLOW_NONE')
                            .reduce<ModuleEndpoint[]>(
                                (p,c)=>p.concat(c.modules()),[]
                            )
                    )
                if(modules.length === 0) {
                    modules = Module.endpoints()
                        .filter(x=>x.livescripts.exists());
                }

                return Promise.all(modules.map(x=>{
                    return x.livescripts.build(buildType,args);
                }))
            }
        ).addAlias('scripts').addAlias('script').addAlias('livescript')

        ClearCommand.addCommand(
            'livescripts'
          , 'modules'
          , ''
          , args => {
              return Promise.all(Identifier.getModules(args,'MATCH_ALL').map(x=>{
                  x.path.livescripts.build.remove();
              }))
          }
        ).addAlias('scripts').addAlias('script').addAlias('livescript')
    }
}