import { watchTsc } from "../util/CompileTS";
import { ConfigFile, Property, Section } from "../util/ConfigFile";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { BuildCommand, ClearCommand, ListCommand } from "./CommandActions";
import { Dataset } from "./Dataset";
import { Identifier } from "./Identifiers";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeConfig } from "./NodeConfig";

/**
 * The example patch file that will be written to the 'datascripts' directory of new modules.
 */
const patch_example_ts = (name: string) =>
`import { std } from "tswow-stdlib";

console.log("Hello from ${name} data script!");`;

/**
 * The default package.json that will be written to datascript build directory of new modules.
 */
const lib_package_json =
    (name: string) => ({
    'name': name,
    'version': '1.0.0',
    'description': '',
    'main': `${name}-data.js`,
    'types': `${name}-data.d.ts`,
    'dependencies': {
    },
    'devDependencies': {},
    'scripts': {},
});

/**
 * The tsconfig.json that will be used to compile 'datascript' directories
 */
const data_tsconfig =
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./build",
    "rootDir": "./",
    "emitDeclarationOnly": true,
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "skipLibCheck": true,
    "incremental": true,
    "allowJs": false,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "sourceMap": true
  },
  "exclude":["**/build/**","**/tswow/wotlkdata/**"]
};

const datascripts_swcrc = {
    "module": {
        "type":"commonjs"
    },
    "exclude":[".*.js$",".*\\.d.ts$"],
    "jsc": {
        "parser": {
            "syntax": "typescript",
            "tsx": false,
            "decorators": true,
            "dynamicImport": true
        },
        "transform":null,
        "target":"es2016",
        "loose":false
    },
    "sourceMaps": true
}

type TypeGeneration = 'none'|'startup'|'watch'
export class DatascriptsConfig extends ConfigFile {
    protected description(): string {
        return "Datascript settings"
    }

    @Section('Datascripts')

    @Property({
          name: 'Datascript.Dependencies'
        , description: ''
        , examples: [
            [[],'No dependencies'],
            [['other-module'],'other-module will be built before this one']
        ]
    })
    protected _dependencies: string[] = this.undefined()
    get Dependencies() {
        return this.getArrayAll(this._dependencies, [])
    }

    @Property({
          name: 'Datascript.TypeGeneration'
        , description:''
        , examples: [
              ['none','']
            , ['startup','']
            , ['watch','']
        ]
    })
    TypeGeneration: TypeGeneration = this.undefined();
}

export class Datascripts {
    mod: ModuleEndpoint
    config: DatascriptsConfig;
    get path() {
        return this.mod.path.datascripts
    }

    installLibrary() {
        if(this.config.TypeGeneration !== 'none') {
            this.path.build.package_json
                .writeJson(lib_package_json(this.mod.fullName))
            if(!ipaths.node_modules.join(this.mod.fullName).exists()) {
                term.log(`Installing ${this.mod.fullName} datascript library...`)
                wsys.exec(`npm i -S ${this.path.build.abs()}`)
            }
        }
    }

    initialize() {
        this.path.mkdir();
        if(!this.path.index.exists()) {
            this.path.index.write(patch_example_ts(this.mod.subId))
        }
        ipaths.bin.include.global_d_ts.copy(this.path.global_d_ts)
        this.path.tsconfig_json.writeJson(data_tsconfig);
        if(!this.path.datascripts_conf.exists()) {
            this.config.generateIfNotExists();
        }
        if(this.config.TypeGeneration === 'startup') {
            this.compileTypes(true);
        }
        if(this.config.TypeGeneration === 'watch') {
            watchTsc(
                  ipaths.node_modules.typescript_js.abs().get()
                , this.path.abs().get()
                , this.mod.fullName
            );
        }
        this.installLibrary();
        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
        this.config = new DatascriptsConfig(this.path.datascripts_conf.get())
    }

    symlink() {
        this.path.build.package_json.writeJson(lib_package_json(this.mod.fullName))
        if(!ipaths.node_modules.join(this.mod.fullName).exists()) {
            wsys.exec(`npm i -S ${this.path.build.get()}`)
        }
    }

    compile() {
        this.path.swcrc.writeJson(datascripts_swcrc)
        try {
            wsys.execIn(
                  this.path.dirname().get()
                , `swc datascripts -d datascripts/build`,'inherit'
            )
        } catch(error) {
            // error is printed by swc
        }
        this.path.swcrc.remove();
    }

    compileTypes(declare: boolean) {
        term.log(`Compiling types for ${this.path}`)
        try {
            wsys.execIn(this.path.get(),'tsc','inherit');
        } catch(error) {
            // error printed by tsc
        }
        this.compile(); // ensure all sources exist
        if(declare) {
            this.symlink();
            this.path.build.package_json.writeJson(
                lib_package_json(this.mod.fullName)
            )
        }
    }

    static all() {
        return Module.endpoints()
            .filter(x=>x.path.datascripts.exists())
            .map(x=>new Datascripts(x))
    }

    static create(mod: ModuleEndpoint) {
        return new Datascripts(mod).initialize();
    }

    static initialize() {
        if(!ipaths.node_modules.wotlkdata.exists()) {
            term.log('Linking wotlkdata...');
            wsys.exec(`npm i -S ${ipaths.bin.scripts.wotlkdata.get()}`)
        }

        BuildCommand.addCommand(
              'datascripts'
            , 'dataset'
            , ''
            , async args => {
                for(const value of Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                )) {
                    await this.build(value,args)
                }
            }
        )
        .addAlias('datascript')
        .addAlias('data')

        ListCommand.addCommand(
            'datascripts'
            , 'dataset?'
            , ''
            , args => {
                let isDataset = Identifier.isDataset(args[0])
                let eps = isDataset
                    ? Dataset.all()
                        .find(x=>x.name === args[0])
                        .modules()
                    : Module.endpoints()
                eps.forEach(x=>{
                    term.log(x.path.get())
                })
            }
        )
        .addAlias('datascript').addAlias('data')

        ClearCommand.addCommand(
              'datascripts'
            , 'modules'
            , ''
            , args => {
                return Promise.all(Identifier.getModules(args,'MATCH_ALL').map(x=>{
                    x.path.datascripts.build.remove();
                }))
            }
        ).addAlias('datascript').addAlias('data')
    }

    static async build(
          dataset: Dataset
        , args: string[] = []
    ) {
        await dataset.setupClientData();
        await dataset.setupDatabases('BOTH', false);
        dataset.modules().forEach(endpoint=>{
            if(endpoint.datascripts.path.exists()) {
                endpoint.datascripts.compile();
                endpoint.datascripts.installLibrary()
                ipaths.bin.include.global_d_ts
                    .copy(endpoint.datascripts.path.global_d_ts)
            }
        });

        await dataset.client.kill();

        let runningWorldservers =
            (args.includes('--skip-server')||args.includes('--readonly'))
            ? []
            : dataset.realms()

        await Promise.all(runningWorldservers.map(x=>x.worldserver.stop()))

        wsys.exec(
                `node -r source-map-support/register`
              + ` ${ipaths.bin.scripts.wotlkdata.wotlkdata.index.get()}`
              + ` --ipaths=./`
              + ` --dataset=${dataset.path.get()}`
              + ` --datasetName=${dataset.fullName}`
              + ` ${args.join(' ')}`
            , 'inherit'
        )

        wfs.copy(dataset.path.dbc,dataset.client.path.Data.devPatch.DBFilesClient)
        wfs.copy(dataset.path.luaxml,dataset.client.path.Data.devPatch)

        if(args.includes('--prof')) {
            wfs.readDir('./',true,'files')
            .filter(x=>x.startsWith('isolate-')
                && x.endsWith('-v8.log'))
            .forEach((x,i)=>{
                wsys.exec(
                      `node --prof-process ${x}`
                    + ` > node-profiling${i==0?'':`-${i}`}.txt`
                )
                wfs.remove(x)
            })
        }

        if(!args.includes('--skip-client') && !args.includes('--readonly')) {
            dataset.client.startup(NodeConfig.AutoStartClient);
        }
        runningWorldservers.forEach(x=>x.start(x.lastBuildType))
        term.success(`Finished building DataScripts for dataset ${dataset.name}`);
    }
}