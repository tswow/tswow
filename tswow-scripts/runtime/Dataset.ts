import { patchTCConfig } from "../util/ConfigFile";
import { DatasetConfig, GAME_BUILD_FIELD } from "../util/DatasetConfig";
import { wfs } from "../util/FileSystem";
import { collectSubmodules, ipaths } from "../util/Paths";
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
            +  ` (${this.config.DatasetGameBuild}, 3, 3, 5,"a",NULL,NULL,NULL,`
            +  ` "CDCBBD5188315E6B4D19449D492DBCFAF156A347",`
            +  ` "B706D13FF2F4018839729461E3F8A0E2B5FDC034")`
            +  ` ON DUPLICATE KEY UPDATE`
            +  ` majorVersion=3,`
            +  ` minorVersion=3,`
            +  ` bugfixVersion=5,`
            +  ` hotfixVersion="a",`
            +  ` winChecksumSeed="CDCBBD5188315E6B4D19449D492DBCFAF156A347",`
            +  ` macChecksumSeed="B706D13FF2F4018839729461E3F8A0E2B5FDC034"`
            +  `;`
    }

    async setupClientData() {
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
            await mysql.rebuildDatabase(db,ipaths.bin.tdb.get());
        }
        await mysql.applySQLFiles(db,'world');
    }

    async setupDatabases(type: 'DEST'|'SOURCE'|'BOTH', force: boolean) {
        await this.connect();
        if(type === 'SOURCE' || type === 'BOTH') {
            await this.setupDatabase(this.worldSource, force);
        }

        if(type === 'DEST' || type === 'BOTH') {
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
        return collectSubmodules(this.config.modules)
            .map(x=>ModuleEndpoint.fromPath(x.get()))
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
        [this.client.path.Data,this.client.path.Data.locale()].forEach(x=>{
            x.readDir('ABSOLUTE').forEach(y=>{
                if(y.isSymlink()) {
                    y.unlink();
                }
            })
        })
        this.modules().filter(x=>x.path.assets.exists()).forEach(x=>{
            let patches = this.client.freePatches()
            if(patches.length === 0) {
                throw new Error(`Client has no more free patches to symlink: ${this.client.path}`)
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
        CreateCommand.addCommand(
            'dataset'
          , 'module dataset clientPatch=12340'
          , ''
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