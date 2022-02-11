import { watchTsc } from "../util/CompileTS";
import { ConfigFile, Property, Section } from "../util/ConfigFile";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { termCustom } from "../util/TerminalCategories";
import { termc } from "../util/TerminalColors";
import { BuildCommand, CleanCommand, ListCommand } from "./CommandActions";
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
    'main': `datascripts.js`,
    'types': `datascripts.d.ts`,
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

    logName() {
        return termCustom('datascripts',this.mod.fullName)
    }

    installLibrary() {
        if(this.config.TypeGeneration !== 'none') {
            this.path.build.package_json
                .writeJson(lib_package_json(this.mod.fullName))
            if(!ipaths.node_modules.join(this.mod.fullName).exists()) {
                term.log(
                      this.logName()
                    , `Installing ${this.mod.fullName} datascript library...`
                )
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
                , this.logName()
            );
        }
        this.installLibrary();
        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
        this.config = new DatascriptsConfig(this.path.datascripts_conf.get())
    }

    exists() {
        return this.path.exists()
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
        } catch(err) {
            this.path.swcrc.remove();
            throw new Error(`Failed to compile datascripts`)
        }
        this.path.swcrc.remove();
    }

    compileTypes(declare: boolean) {
        term.log(this.logName(),`Compiling types for ${this.path}`)
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
        if(!ipaths.node_modules.wow.exists()) {
            term.log('datascripts','Linking wow data libraries...');
            wsys.exec(`npm i -S ${ipaths.bin.scripts.wow.get()}`)
        }

        if(!ipaths.node_modules.wow.exists()) {
            wsys.exec(`npm i`);
        }

        BuildCommand.addCommand(
              'datascripts'
            , 'dataset '
            + '--(client|server|inline)-only'
            + ' --readonly'
            + ' --rebuild'
            + ' --no-shutdown(-server|-client|)'
            + ' --no-restart(-server|-client|)'
            , 'Builds datascripts for the selected dataset'
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
                    term.log('datascripts',x.path.get())
                })
            }
        )
        .addAlias('datascript').addAlias('data')

        CleanCommand.addCommand(
              'datascripts'
            , 'modules'
            , ''
            , args => {
                let mods = args.length === 0
                    ? Module.endpoints().filter(x=>x.datascripts.exists())
                    : Identifier.getModules(args,'MATCH_ALL')
                mods.forEach(x=>{
                    term.log('datascripts',`Removing ${x.path.livescripts.build}`)
                    x.path.datascripts.build.remove()
                })
                term.log('datascripts',`Removed ${mods.length} datascript builds`)
            }
        ).addAlias('datascript').addAlias('data')
    }

    static async build(
          dataset: Dataset
        , args: string[] = []
    ) {
        // 1. Parse exclusion arguments
        const isInlineOnly = args.includes('--inline-only');
        const isReadonlyArg = args.includes('--readonly')
        const isReadOnly = isInlineOnly || isReadonlyArg
        const isRebuild = args.includes('--rebuild')
        const serverOnly = args.includes('--server-only')
        const clientOnly = args.includes('--client-only')

        const noShutdownAnyArg = args.includes('--no-shutdown') || args.includes('--no-shutdowns')
        const noShutdownServerArg = noShutdownAnyArg
            || args.includes('--no-shutdown-server') || args.includes('--no-shutdowns-server')
        const noShutdownClientArg = noShutdownAnyArg
            || args.includes('--no-shutdown-client') || args.includes('--no-shutdowns-client')
        const noRestartAnyArg = args.includes('--no-restart') || args.includes('--no-restarts')
        const noRestartServerArg = noRestartAnyArg
            || args.includes('--no-restarts-server') || args.includes('--no-restart-server')
        const noRestartsClientArg = noRestartAnyArg
            || args.includes('--no-restarts-client') || args.includes('--no-restart-client')

        const writesServer = !clientOnly && !isReadOnly;
        const writesClient = !serverOnly && !isReadOnly;

        const shutdownsServer = !noShutdownServerArg && writesServer
        const shutdownsClient = !noShutdownClientArg && writesClient

        const restartsServer = shutdownsServer && !noRestartServerArg
        const restartsClient = shutdownsClient && !noRestartsClientArg

        // 2. Detect invalid arguments
        if(isRebuild && !shutdownsServer) {
            throw new Error(
                  `Incompatible arguments:`
                + ` --rebuild requires the server to be shutdown,`
                + ` so it cannot be combined with any of the following arguments: `
                + ` --inline-only, --readonly, --client-only,`
                + ` --no-shutdown, --no-shutdown-server`
            );
        }

        // 3. Shutdown clients and servers
        let runningClients = shutdownsClient ? [dataset.client] : []
        let runningWorldservers = shutdownsServer ? dataset.realms() : []
        await Promise.all(runningWorldservers.map(x=>x.worldserver.stop()))
        await Promise.all(runningClients.map(x=>x.kill()));

        // 4. Prepare dataset
        await dataset.setupClientData();
        if(args.includes('--rebuild')) {
            await dataset.setupDatabases('SOURCE',false);
            await dataset.setupDatabases('DEST',true);
        } else {
            await dataset.setupDatabases('BOTH', false);
        }
        dataset.refreshSymlinks();
        dataset.modules().forEach(endpoint=>{
            if(endpoint.datascripts.path.exists()) {
                endpoint.datascripts.compile();
                endpoint.datascripts.installLibrary()
                ipaths.bin.include.global_d_ts
                    .copy(endpoint.datascripts.path.global_d_ts)
            }
        });

        // 5. Run datascripts
        term.log('datascripts',
            `Building datascripts`
            + ` {`
            + ` server: ${termc.magenta(`${writesServer}`)},`
            + ` client: ${termc.magenta(`${writesClient}`)}`
            + ` }`
        )

        try {
            wsys.exec(
                    `node -r source-map-support/register`
                + ` ${ipaths.bin.scripts.wow.data.index.get()}`
                + ` --ipaths=./`
                + ` --dataset=${dataset.path.get()}`
                + ` --datasetName=${dataset.fullName}`
                + ` --clientPatch=${dataset.client.path.Data.devPatch}`
                + ` ${args.join(' ')}`
                // Please don't pass these two manually
                + ` ${writesServer?'--__writes-server':''}`
                + ` ${writesClient?'--__writes-client':''}`
                , 'inherit'
            )
        } catch(err) {
            term.error('datascripts',`Failed to build datascripts, see error message above`);
            return
        }

        // 6. Present profiling
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

        // 7. Restore servers/clients

        if(restartsClient) {
            await Promise.all(runningClients.map(x=>x.startup(NodeConfig.AutoStartClient)))
        }

        if(restartsServer) {
            let autorealms = NodeConfig.AutoStartRealms
                .map(x=>Identifier.getRealm(x))
            await Promise.all(runningWorldservers
                .filter(x=>autorealms.find(y=>y.fullName===x.fullName))
                .map(x=>x.start(x.lastBuildType)))
        }

        term.success('datascripts',`Finished building DataScripts for dataset ${dataset.name}`);
    }
}