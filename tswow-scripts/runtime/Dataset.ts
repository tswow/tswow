import { YamlFile, DatabaseType } from "../util/Yaml";
import { ipaths } from "../util/Paths";
import { wfs, mpath } from "../util/FileSystem";
import { Connection, mysql } from "../util/MySQL";
import { MapData } from "./MapData";
import { bool } from "../wotlkdata/primitives";
import { commands } from "./Commands";
import { Client } from "./Client";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";
import { Identifiers } from "./Identifiers";

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

        get modules() { return this.get<string[]>('modules',[]) }
        get use_mmaps() { return this.get<bool>('use_mmaps',false); }
        get client_path() { return this.get<string>('client_path',''); }
        get mpq_suffix() { return this.get<string>('mpq_suffix','')}
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
            this.worldSource = new Connection(this.database_settings('world_source'),'world_source')
            this.worldDest = new Connection(this.database_settings('world'),'world');
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
            if(!wfs.exists(ipaths.datasetMaps(this.id)) || !wfs.exists(ipaths.datasetDBC(this.id))) {
                MapData.buildMaps(this.id);
            }

            if(!wfs.exists(ipaths.datasetVmaps(this.id))) {
                MapData.buildVmaps(this.id);
            }

            if(this.config.use_mmaps && !wfs.exists(ipaths.datasetMmaps(this.id))) {
                MapData.buildMMaps(this.id);
            }
        }

        async installDatabase() {
            await this.connect();
            // Rebuild both world databases if one of them is missing
            if(!await mysql.isWorldInstalled([this.worldSource,this.worldDest])) {
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

    export function initialize() {
        const dsCommand = commands.addCommand('dataset');
        if(
            !wfs.exists(ipaths.datasets) 
            || wfs.readDir(ipaths.datasets,false,'directories').length == 0) 
        {
            create('default');
        }

        dsCommand.addCommand('create','name','Creates a new dataset with the provided id',(args: any[])=>{
            if(args.length<1) {
                throw new Error(`Must provide an id for the created dataset`);
            }
            create(args[0]);
        });
    }
}