import { YamlFile, DatabaseType } from "../util/Yaml";
import { ipaths } from "../util/Paths";
import { wfs, mpath } from "../util/FileSystem";
import { Connection, mysql } from "./MySQL";
import { MapData } from "./MapData";
import { bool } from "../wotlkdata/primitives";
import { commands } from "./Commands";
import { Client } from "./Client";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";
import { Identifiers } from "./Identifiers";
import { term } from "../util/Terminal";

function defaultYaml(id: string) {
    return `# ${id} dataset configuration
# Whether this dataset should build and enable mmaps
use_mmaps: false

# The client directory to use for development with this dataset
client_path: ""

# What modules this dataset uses
modules: all

# What extensions to ignore when building assets
ignore_assets:
    .png
    .blend
`
}

/**
 * Contains functions for managing TSWoW datasets
 */
export namespace Datasets {
    /**
     * Represents the configuration file of a single dataset
     */
    export class DatasetConfig extends YamlFile {
        private set: Dataset;

        constructor(set: Dataset) {
            super(ipaths.datasetYaml(set.id));
            this.set = set;
        }

        get modules() {
            let mods = this.getArray<string[]>('modules',[]);
            if(mods.includes('all')) {
                return wfs.readDir(ipaths.modules,true,'directories');
            } else {
                return mods;
            }
        }
        get use_mmaps() { return this.get<bool>('use_mmaps',false); }
        get client_path() { 
            let val = this.get<string>('client_path',''); 

            if(val.includes(' ')) {
                throw new Error(
                     `The client path for dataset ${this.set.id}`
                    +` contains spaces somewhere in its pathname`
                    +`, please move it somewhere without spaces.`
                )
            }

            // don't use ipaths here, they will recurse
            // don't use wow.exe for validation, it's sometimes named Wow.exe and sometimes wow.exe
            if(!wfs.exists(mpath(val,'Data'))) {
                throw new Error(
                      `No valid client at: ${val}` 
                    + `\n(check your client_path settings in`
                    + ` ${ipaths.datasetYaml(this.set.id)})`);
            }
            return val;
        }
        get mpq_suffix() { 
            let val = this.get<string>('mpq_suffix','')
            if(val.length!==1 || val.charCodeAt(0)<97 || val.charCodeAt(0)>122)  {
                let type = val.length===0 ? 'an empty' : 'an invalid';
                throw new Error(
                      `Dataset ${this.set.id} has ${type} mpq_suffix set`
                    + `, please set a valid mpq_suffix`
                    +` (single lowercase ascii letter)`
                    + ` in ${ipaths.datasetYaml(this.set.id)}`)
            }
            return val;
        }
        get ignore_assets() { return this.get<string[]>('ignore_assets',['.png','.blend'])}
        get mpq_path() { return mpath(ipaths.clientData(this.set.id),`patch-${this.mpq_suffix}.MPQ`)}
    }

    /**
     * Represents a single TSWoW dataset.
     * 
     * These objects are unique for each dataset in memory.
     */
    export class Dataset {
        readonly id: string;
        readonly worldSource: Connection;
        readonly worldDest: Connection;
        readonly client: Client.Client;
        config: DatasetConfig;

        private database_settings(database: DatabaseType) {
            return NodeConfig.database_settings(database,this.id);
        }

        constructor(id: string) {
            this.id = id;
            this.config = new DatasetConfig(this);
            this.worldSource = new Connection(
                this.database_settings('world_source'),'world_source')
            this.worldDest = new Connection(
                this.database_settings('world'),'world');
            this.client = new Client.Client(this);
        }

        realms() {
            return Realm.getRealms().filter(x=>x.set === this);
        }

        async shutdownRealms() {
            let realms = this.realms().filter(x=>x.isWorldserverRunning());
            await Promise.all(realms.map(x=>x.stopWorldserver()));
            return realms;
        }

        installServerData() {
            let anyChange: boolean = false;
            if(!wfs.exists(ipaths.datasetLuaxmlSource(this.id))) {
                MapData.buildLuaXML(this.id);
                anyChange = true;
            }

            if(!wfs.exists(ipaths.datasetLuaxml(this.id))) {
                wfs.copy(
                      ipaths.datasetLuaxmlSource(this.id)
                    , ipaths.datasetLuaxml(this.id));
            }

            if(
                   ! wfs.exists(ipaths.datasetMaps(this.id)) 
                || ! wfs.exists(ipaths.datasetDBCSource(this.id))
              ) {

                MapData.buildMaps(this.id);
                anyChange = true;
            }

            if(!wfs.exists(ipaths.datasetDBC(this.id))) {
                wfs.copy(
                      ipaths.datasetDBCSource(this.id)
                    , ipaths.datasetDBC(this.id));
                anyChange = true;
            }

            if(!wfs.exists(ipaths.datasetVmaps(this.id))) {
                MapData.buildVmaps(this.id);
                anyChange = true;
            }

            if(
                   this.config.use_mmaps 
                && !wfs.exists(ipaths.datasetMmaps(this.id))
              ) {

                MapData.buildMMaps(this.id);
                anyChange = true;
            }

            if(anyChange) {
                term.success('Finished installing server data');
            }
        }

        async dumpReleaseDatabase() {
                term.log(`Dumping release database`
                +` ${this.worldDest.cfg.name}`
                +` to ${ipaths.datasetSqlDump}...`)

                await mysql.rebuildDatabase(
                      this.worldDest
                    , await mysql.extractTdb());

            await mysql.dump(
                  this.worldDest
                , ipaths.datasetSqlDump(this.id));
        }

        async installDatabase(force: boolean) {
            await this.connect();
            // Rebuild both world databases if one of them is missing
            if(
                    force 
                || !await mysql.isWorldInstalled([this.worldSource,this.worldDest])
               ) {

                const tdb = await mysql.extractTdb();
                await Promise.all([
                    await mysql.rebuildDatabase(this.worldSource,tdb),
                    await mysql.rebuildDatabase(this.worldDest,tdb)
                ])
            }
            
            // Apply all SQL files and updates
            await Promise.all([
                await mysql.applySQLFiles(this.worldSource,'world'),
                await mysql.applySQLFiles(this.worldDest,'world')
            ]);
        }

        connect() {
            return Promise.all([
                this.worldSource,
                this.worldDest
            ].filter(x=>!x.isConnected).map(x=>x.connect()));
        }
    }

    const datasets : {[key:string]: Dataset} = {}

    export function defaultName(dataset: string | undefined ) {
        if(dataset != undefined) {
            return dataset;
        }
        return getDefault();
    }

    export function getAll() {
        return wfs.readDir(ipaths.datasets,true,'directories')
            .map(x=>get(x));
    }

    export function getDefault() {
        return NodeConfig.default_dataset;
    }

    export function getDatasetsOrDefault(candidates: string[]) {
        let res = Identifiers.getTypes('dataset',candidates);
        return (res.length > 0 ? res : [getDefault()]).map(x=>get(x));
    }

    export function get(dataset: string) {
        if(datasets[dataset] !== undefined) {
            return datasets[dataset];
        }

        if(!wfs.exists(ipaths.datasetRoot(dataset))) {
            try {
                return Realm.getRealm(dataset).set;
            } catch(err) {
                throw new Error(`No such dataset or realm: ${dataset}`)
            }
        }

        return datasets[dataset] = new Dataset(dataset);
    }

    export function create(name: string) {
        Identifiers.assertUnused(name);
        wfs.write(ipaths.datasetYaml(name),defaultYaml(name));
    }

    export const command = commands.addCommand('dataset');

    export function initialize() {
        if (
            ! wfs.exists(ipaths.datasets) 
            || wfs.readDir(ipaths.datasets,false,'directories').length == 0
           ) 
        {
            create('default');
        }

        command.addCommand(
              'install'
            , 'name --skip-data --skip-database'
            , 'Installs missing server data for a dataset'
            , async (args: any[])=>{

            await Promise.all(getDatasetsOrDefault(args).map(x=>{
                if(!args.includes('--skip-data')) {
                    x.installServerData();
                }

                if(!args.includes('--skip-database')) {
                    return x.installDatabase(false);
                }
            }));
        });

        command.addCommand(
              'luaxml'
            , '...dataset'
            , 'Rebuilds luaxml data'
            , async(args: any[])=>{

            await Promise.all(getDatasetsOrDefault(args).map(x=>{
                return MapData.buildLuaXML(x.id);
            }));
        });

        command.addCommand(
              'database'
            , '...dataset'
            , 'Rebuilds databases'
            , async(args: any[])=>{

            await Promise.all(getDatasetsOrDefault(args).map(x=>{
                return x.installDatabase(true);
            }));
        });

        command.addCommand(
              'create'
            , 'name'
            , 'Creates a new dataset with the provided id'
            , (args: any[])=>{

            if(args.length<1) {
                throw new Error(`Must provide an id for the created dataset`);
            }
            create(args[0]);
        });
    }
}