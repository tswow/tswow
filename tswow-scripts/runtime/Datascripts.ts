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
import { NodeExecutable, NpmExecutable, NpxExecutable } from "./Node";
import { NodeConfig } from "./NodeConfig";

/**
 * The example patch file that will be written to the 'datascripts' directory of new modules.
 */
const patch_example_ts = (name: string) =>
`import { std } from "wow/wotlk";

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
    "target": "es2021",
    "module": "commonjs",
    "outDir": "./build",
    "rootDir": "./",
    "emitDeclarationOnly": true,
    "strict": false,
    "esModuleInterop": true,
    "declaration": true,
    "skipLibCheck": true,
    "incremental": true,
    "allowJs": false,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "sourceMap": true,
    "paths": {
      "wow/wotlk": ["../../../bin/scripts/wow/wotlk"],
      "wow/wotlk/*": ["../../../bin/scripts/wow/wotlk/*"]
    }
  },
  "exclude":["**/build/**","**/tswow/wotlkdata/**"]
};

const datascripts_swcrc = {
    "module": {
        "type": "commonjs",
        "strict": false,
        "strictMode": false,
        "lazy": false,
        "noInterop": false
    },
    "exclude":[".*.js$",".*\\.d.ts$"],
    "jsc": {
        "parser": {
            "syntax": "typescript",
            "tsx": false,
            "decorators": true,
            "dynamicImport": true
        },
        "transform": {
            "legacyDecorator": true,
            "decoratorMetadata": true,
            "useDefineForClassFields": false
        },
        "target":"es2021",
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
                try {
                    // Add timeout and capture output
                    const cmd = `${NpmExecutable} i ${this.path.build.abs()}`;
                    term.debug(this.logName(), `Running: ${cmd}`);
                    wsys.exec(cmd, 'inherit');
                    term.log(this.logName(), `Successfully installed ${this.mod.fullName} datascript library`);
                } catch (e) {
                    term.error(this.logName(), `Failed to install datascript library: ${e}`);
                    term.error(this.logName(), `Command was: ${NpmExecutable} i ${this.path.build.abs()}`);
                    // Continue anyway - the library may already be installed
                }
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
        if(this.config.TypeGeneration === 'watch' && ! process.argv.includes('server-mode')) {
            watchTsc(
                  NodeExecutable
                , ipaths.node_modules.typescript_js.abs().get()
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
            wsys.exec(`${NpmExecutable} i ${this.path.build.get()}`)
        }
    }

    compile() {
        this.path.swcrc.writeJson(datascripts_swcrc)
        try {
            term.log('datascripts', `Compiling datascripts at ${this.path.abs().get()}`)
            const compileCommand = `${NpxExecutable} swc . -d build --sync`;
            term.debug('datascripts', `SWC compile command: ${compileCommand}`);
            wsys.execIn(
                this.path.get()  // Execute from datascripts directory instead
                , compileCommand,'inherit'
            )
            term.debug('datascripts', `Successfully compiled datascripts at ${this.path.abs().get()}`)
        } catch(err) {
            this.path.swcrc.remove();
            term.error('datascripts', `Failed to compile datascripts at ${this.path.abs().get()}`);
            term.error('datascripts', `Error: ${err}`);
            throw new Error(`Failed to compile datascripts: ${err}`)
        }
        this.path.swcrc.remove();
    }

    compileTypes(declare: boolean) {
        term.log(this.logName(),`Compiling types for ${this.path}`)
        try {
            wsys.execIn(this.path.get(),`${NpxExecutable} tsc`,'inherit');
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

    static installWowLib() {
        if(!ipaths.node_modules.wow.exists()) {
            term.log('datascripts','Linking wow data libraries...');
            const wowPackagePath = ipaths.bin.scripts.wow.get();
            term.debug('datascripts', `Checking if wow package exists at: ${wowPackagePath}`);
            
            if (!wfs.exists(wowPackagePath)) {
                term.error('datascripts', `ERROR: wow package not found at ${wowPackagePath}`);
                term.error('datascripts', `This is likely a build issue. The wow package should be at bin/scripts/wow`);
                return; // Don't throw, just skip the install
            }
            
            term.debug('datascripts', `NpmExecutable is: ${NpmExecutable}`);
            term.debug('datascripts', `Installing from path: ${wowPackagePath}`);
            
            try {
                // Use 'pipe' instead of 'inherit' to avoid interfering with authserver's IO
                const output = wsys.exec(`${NpmExecutable} i ${wowPackagePath}`, 'pipe')
                if (output) {
                    term.debug('datascripts', `npm install output: ${output.trim()}`);
                }
                term.log('datascripts', 'Successfully linked wow data libraries');
            } catch (e) {
                term.error('datascripts', `Failed to install wow library: ${e}`);
                term.error('datascripts', `Command was: ${NpmExecutable} i ${wowPackagePath}`);
                term.error('datascripts', `This might be because npm is not in PATH or the path is incorrect.`);
                // Don't throw - let TSWoW continue without the wow module
                return;
            }
        } else {
            term.debug('datascripts', 'wow module already exists, skipping install');
        }
    }

    static initialize() {
        term.debug('misc', `Initializing datascripts`)
        try {
            this.installWowLib();
        } catch (err) {
            term.error('datascripts', `Error during installWowLib: ${err}`);
            throw err;
        }
        
        if(!ipaths.node_modules.wow.exists()) {
            term.error('datascripts', `CRITICAL: wow module not found at ${ipaths.node_modules.wow.abs().get()} after installation!`);
            term.error('datascripts', `This suggests the npm install did not create the expected symlink.`);
            // Don't run npm i here - it could cause issues with the authserver
            // The installWowLib() should have already handled the installation
        }

        BuildCommand.addCommand(
              'datascripts'
            , 'dataset '
            + '--(client|server|inline)-only'
            + ' --readonly'
            + ' --rebuild'
            + ' --no-shutdown(-server|-client|)'
            + ' --no-restart(-server|-client|)'
            + ' --debug'
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
            , 'Lists all modules with datascripts or datascripts in specified dataset'
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
            , 'Removes datascripts build artifacts for specified modules'
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
        term.log('datascripts', `Starting datascripts build for dataset: ${dataset.fullName}`);
        term.log('datascripts', `Build arguments: ${args.join(' ')}`);

        // 1. Install core libraries
        term.log('datascripts', 'Installing core libraries...');
        this.installWowLib();

        // 2. Parse exclusion arguments
        term.log('datascripts', 'Parsing build arguments...');
        const isInlineOnly = args.includes('--inline-only');
        const isReadonlyArg = args.includes('--readonly')
        const isReadOnly = isInlineOnly || isReadonlyArg
        const isRebuild = args.includes('--rebuild')
        const serverOnly = args.includes('--server-only')
        const clientOnly = args.includes('--client-only')

        term.log('datascripts', `Build mode: ${isInlineOnly ? 'inline-only' : isReadOnly ? 'readonly' : isRebuild ? 'rebuild' : 'normal'}`);
        term.log('datascripts', `Target: ${serverOnly ? 'server-only' : clientOnly ? 'client-only' : 'both server and client'}`);

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

        // 3. Detect invalid arguments
        if(isRebuild && !shutdownsServer) {
            throw new Error(
                  `Incompatible arguments:`
                + ` --rebuild requires the server to be shutdown,`
                + ` so it cannot be combined with any of the following arguments: `
                + ` --inline-only, --readonly, --client-only,`
                + ` --no-shutdown, --no-shutdown-server`
            );
        }

        // 4. Shutdown clients and servers
        let runningClients = shutdownsClient ? [dataset.client] : []
        let runningWorldservers = shutdownsServer ? dataset.realms() : []

        if(runningWorldservers.length > 0) {
            term.log('datascripts', `Stopping ${runningWorldservers.length} worldserver(s)...`);
        }
        await Promise.all(runningWorldservers.map(x=>x.worldserver.stop()))

        if(runningClients.length > 0) {
            term.log('datascripts', `Stopping ${runningClients.length} client(s)...`);
        }
        await Promise.all(runningClients.map(x=>x.kill()));

        // 5. Prepare dataset
        term.log('datascripts', 'Setting up client data...');
        await dataset.setupClientData();

        if(args.includes('--rebuild')) {
            term.log('datascripts', 'Setting up databases for rebuild (SOURCE and DEST)...');
            await dataset.setupDatabases('SOURCE',false);
            await dataset.setupDatabases('DEST',true);
        } else {
            term.log('datascripts', 'Setting up databases (BOTH)...');
            await dataset.setupDatabases('BOTH', false);
        }

        term.log('datascripts', 'Refreshing symlinks...');
        dataset.refreshSymlinks();

        const modulesToCompile = dataset.modules().filter(endpoint => endpoint.datascripts.path.exists());
        term.log('datascripts', `Compiling ${modulesToCompile.length} module(s)...`);

        modulesToCompile.forEach(endpoint=>{
            term.log('datascripts', `  - Compiling module: ${endpoint.fullName}`);
            endpoint.datascripts.compile();
            endpoint.datascripts.installLibrary()
            ipaths.bin.include.global_d_ts
                .copy(endpoint.datascripts.path.global_d_ts)
        });

        // 6. Run datascripts
        term.log('datascripts',
            `Building datascripts`
            + ` {`
            + ` server: ${termc.magenta(`${writesServer}`)},`
            + ` client: ${termc.magenta(`${writesClient}`)}`
            + ` }`
        )

        const buildCommand = `${NodeExecutable} --enable-source-maps`
            + ` ${ipaths.node_modules.wow.data.index.get()}`
            + ` --ipaths=./`
            + ` --dataset=${dataset.path.get()}`
            + ` --datasetName=${dataset.fullName}`
            + ` --clientPatch=${dataset.client.path.Data.devPatch}`
            + ` ${args.join(' ')}`
            // Please don't pass these two manually
            + ` ${writesServer?'--__writes-server':''}`
            + ` ${writesClient?'--__writes-client':''}`;

        term.log('datascripts', 'Executing datascripts build command...');
        term.debug('datascripts', `Command: ${buildCommand}`);

        try {
            wsys.exec(buildCommand, 'inherit')
        } catch(err) {
            term.error('datascripts',`Failed to build datascripts`);
            term.error('datascripts',`Error: ${err}`);
            if(err.stack) {
                term.debug('datascripts', `Stack trace: ${err.stack}`);
            }
            return
        }

        // 7. Present profiling
        if(args.includes('--prof')) {
            wfs.readDir('./',true,'files')
            .filter(x=>x.startsWith('isolate-')
                && x.endsWith('-v8.log'))
            .forEach((x,i)=>{
                wsys.exec(
                      `${NodeExecutable} --prof-process ${x}`
                    + ` > node-profiling${i==0?'':`-${i}`}.txt`
                )
                wfs.remove(x)
            })
        }

        // 8. Restore servers/clients

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
        term.log('datascripts', 'Datascripts build completed successfully!');
    }
}
