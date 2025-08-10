import { patchTCConfig } from "../util/ConfigFile";
import { DatasetConfig, GAME_BUILD_FIELD } from "../util/DatasetConfig";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { term } from "../util/Terminal";
import { termCustom } from "../util/TerminalCategories";
import { Client } from "./Client";
import { BuildCommand, CreateCommand, ListCommand } from "./CommandActions";
import { Identifier } from "./Identifiers";
import { MapData } from "./MapData";
import { Module, ModuleEndpoint } from "./Modules";
import { Connection, mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";

class DatasetManager {
    worldSource: Connection;
    worldDest: Connection;

    constructor(name: string) {
        this.worldSource = new Connection(
              NodeConfig.DatabaseSettings('world_source',name)
            , 'world_source'
        )
        this.worldDest = new Connection(
            NodeConfig.DatabaseSettings('world',name)
          , 'world'
        )
    }
}

export class Dataset {
    private static managers: {[key: string]: DatasetManager} = {}

    private manager() {
        return Dataset.managers[this.fullName]
           || (Dataset.managers[this.fullName] = new DatasetManager(this.fullName))
    }

    readonly mod: ModuleEndpoint
    readonly name: string;
    readonly client: Client = new Client(this)

    get worldSource() { return this.manager().worldSource; }
    get worldDest() { return this.manager().worldDest; }

    get fullName() {
        return this.mod.fullName+'.'+this.name
    }

    get config() {
        return new DatasetConfig(this.path.config.get());
    }

    get path() {
        if(this._path) return this._path
        return (this._path as any) = this.mod.path.datasets.dataset.pick(this.name)
    }
    private _path: never = undefined as never;

    constructor(mod: ModuleEndpoint, name: string) {
        this.mod = mod;
        this.name = name;
    }

    realms() {
        return Realm.all().filter(x=>x.config.Dataset.path.get() === this.path.get());
    }

    logName() {
        return termCustom('dataset',this.fullName)
    }

    initialize() {
        this.config.generateIfNotExists();
        this.writeModulesTxt()
        return this;
    }

    writeModulesTxt() {
        this.path.modules_txt.write(
            this.modules().reduce((p,c)=>p+c.fullName+'\n','')
        )
    }

    async shutdown() {
        let realms = this.realms();
        realms.filter(x=>x.worldserver.isRunning());
        await Promise.all(realms.map(x=>x.worldserver.stop()))
        return realms;
    }

    gamebuildSQL() {
        return `INSERT INTO build_info VALUES`
            +  ` (${this.config.DatasetGameBuild}, 3, 3, 5,"a")`
            +  ` ON DUPLICATE KEY UPDATE`
            +  ` majorVersion=3,`
            +  ` minorVersion=3,`
            +  ` bugfixVersion=5,`
            +  ` hotfixVersion="a"`
            +  `;`
    }

    async setupClientData() {
        term.debug(this.logName(), `Setting up client data`)
        let anyChange: boolean = false;
        if(!this.path.luaxml_source.exists()) {
            MapData.luaxml(this);
            anyChange = true;
        }

        this.path.luaxml_source.copyOnNoTarget(this.path.luaxml)

        if(!this.path.dbc_source.exists()) {
            MapData.dbc(this);
        }

        if(!this.path.maps.exists()) {
            MapData.map(this);
            anyChange = true;
        }

        if(!this.path.vmaps.exists()) {
            MapData.vmap_extract(this);
            MapData.vmap_assemble(this)
            anyChange = true;
        }

        if(anyChange) {
            term.success(this.logName(),'Finished installing server data');
        }
    }

    protected async setupDatabase(db: Connection, force: boolean) {
        await this.connect();
        if(force || !await mysql.isWorldInstalled([db])) {
            if(db === this.worldDest) {
                await this.realms()
                    .map(x=>x.worldserver.isRunning() ? x.worldserver.stop() : undefined)
            }

            let worldSql: string;
            if(this.path.world_sql.exists()) {
                worldSql = this.path.world_sql.abs().get()
            } else {
                switch(this.config.EmulatorCore) {
                    case 'trinitycore': {
                        worldSql = ipaths.bin.tdb.get()
                        break;
                    }
                }
            }
            await mysql.rebuildDatabase(db,worldSql)
        }

        switch(this.config.EmulatorCore) {
            case 'trinitycore':
                await mysql.applySQLFiles(db,'world');
                break;
        }
    }

    async setupDatabases(type: 'DEST'|'SOURCE'|'BOTH', force: boolean) {
        await this.connect();
        if(type === 'SOURCE' || type === 'BOTH') {
            await this.setupDatabase(this.worldSource, force);
        }

        if(type === 'DEST' || type === 'BOTH') {
            if (force)
            {
                if(this.path.dbc_source.exists() && this.path.dbc.exists())
                {
                    this.path.dbc_source.copy(this.path.dbc,true);
                }

                if(this.path.luaxml_source.exists() && this.path.luaxml.exists())
                {
                    this.path.luaxml_source.copy(this.path.luaxml,true);
                }
            }
            await this.setupDatabase(this.worldDest , force);
        }
    }

    connect() {
        return Promise.all([
            this.worldSource,
            this.worldDest
        ].filter(x=>!x.isConnected).map(x=>x.connect()));
    }

    modules() {
        return this.config.modules.map(x=>ModuleEndpoint.fromName(x))
    }

    async dumpDatabase(outFile: string) {
        term.log(this.logName(),`Dumping database`
        +` ${this.worldDest.cfg.database}`
        +` to ${outFile}...`)
        await mysql.rebuildDatabase(
                this.worldDest
            , await mysql.extractTdb());

        await mysql.dump(
                this.worldDest
            , outFile);
    }

    refreshSymlinks() {
        // Clear existing symlinks
        [this.client.path.Data,this.client.path.Data.locale()].forEach(x=>{
            const symlinks = x.readDir('ABSOLUTE').filter(y => y.isSymlink());
            if(symlinks.length > 0) {
                term.debug('datascripts', `Clearing ${symlinks.length} existing symlinks from ${x.get()}`);
                symlinks.forEach(y=>{
                    term.debug('datascripts', `  - Removing symlink: ${y.basename().get()}`);
                    y.unlink();
                })
            }
        })
        
        // Create new symlinks for module assets
        const modulesWithAssets = this.modules().filter(x=>x.path.assets.exists());
        if(modulesWithAssets.length === 0) {
            term.debug('datascripts', `No modules with assets found for dataset ${this.fullName}`);
            return;
        }
        
        term.log('datascripts', `Linking ${modulesWithAssets.length} module asset folder(s) to client patches:`);
        modulesWithAssets.forEach(x=>{
            let patches = this.client.freePatches()
            if(patches.length === 0) {
                throw new Error(`Client has no more free patches to symlink: ${this.client.path}`)
            }
            const patchName = patches[0].basename().get();
            
            // Count assets in this module for summary
            let assetCount = 0;
            let assetTypes = new Set<string>();
            x.assets.path.iterate('RECURSE','FILES','FULL', node => {
                assetCount++;
                const ext = node.toFile().extension().toLowerCase();
                if(ext) assetTypes.add(ext);
            });
            
            term.log('datascripts', `  - ${x.fullName}: ${assetCount} files → ${patchName}`);
            term.debug('datascripts', `    Path: ${x.assets.path.abs().get()}`);
            if(assetTypes.size > 0) {
                term.debug('datascripts', `    Types: ${Array.from(assetTypes).join(', ')}`);
            }
            
            wfs.symlink(x.assets.path.abs().get(),patches[0].abs().get());
        })
    }

    static all() {
        return Module.endpoints()
            .filter(x=>x.path.datasets.exists())
            .reduce<Dataset[]>((p,c)=>p.concat(c.datasets.all()),[])
    }

    static create(mod: ModuleEndpoint, name: string, gamebuild?: number) {
        const dataset = new Dataset(mod,name).initialize();
        if(gamebuild !== undefined) {
            patchTCConfig(dataset.config.filename,GAME_BUILD_FIELD,`${gamebuild}`);
        }
        return dataset;
    }

    static initialize() {
        term.debug('dataset', `Initializing datasets`)
        CreateCommand.addCommand(
            'dataset'
          , 'module dataset clientPatch=12340'
          , 'Creates a new dataset with specified module and client patch version'
          , args => {
              const module = Identifier.getModule(args[0])
              const dataset = Identifier.assertUnused(args[1],'dataset');
              const gamebuild = parseInt(args[2]||'12340');
              if(isNaN(gamebuild)) {
                  throw new Error(`Invalid gamebuild: ${args[2]}`)
              }
              this.create(module,dataset,gamebuild);
            }
        ).addAlias('datasets')

        BuildCommand.addCommand(
              'database'
            , 'dataset = node.conf:Default.Dataset, --source? --dest?'
            , 'Creates base tables'
            , async args => {
                return Promise.all(Identifier
                    .getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                    .map(x=>{
                        return x.setupDatabases(
                              args.includes('--source') && args.includes('--dest')
                            ? 'BOTH'
                            : args.includes('--source')
                            ? 'SOURCE'
                            : args.includes('--dest')
                            ? 'DEST'
                            : 'BOTH'
                        , true)
                    }));
            }
        )

        ListCommand.addCommand(
              'dataset'
            , 'module?'
            , 'lists all available datasets'
            , args => {
                let isModule = Identifier.isModule(args[0])
                Dataset.all()
                    .filter(x=> !isModule || x.mod.mod.id === args[0])
                    .forEach(x=>term.log('dataset',x.fullName +': '+x.path.get()))
            }
        ).addAlias('datasets')

        // Create default dataset if it's selected
        if(NodeConfig.DefaultDataset === 'default.dataset') {
            ipaths.modules.join('default/datasets/dataset').mkdir()
        }
    }
}

export class Datasets {
    readonly mod: ModuleEndpoint;

    get path() {
        return this.mod.path.datasets
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    pick(name: string) {
        return new Realm(this.mod,this.path.dataset.pick(name).get())
    }

    all() {
        return this.path.dataset.all()
            .map(x=>new Dataset(this.mod, x.basename().get()))
    }

    create(name: string, gamebuild?: number) {
        return Dataset.create(this.mod,name,gamebuild)
    }
}
