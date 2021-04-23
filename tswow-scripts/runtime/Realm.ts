import { mpath, wfs } from "../util/FileSystem";
import { Connection, mysql } from "./MySQL";
import { ipaths } from "../util/Paths";
import { Process } from "../util/Process";
import { copyLibraryFiles, writeYamlToConf } from "../util/TCConfig";
import { term } from "../util/Terminal";
import { yaml } from "../util/Yaml";
import { commands } from "./Commands";
import { Datasets } from "./Dataset";
import { NodeConfig } from "./NodeConfig";
import { Identifiers } from "./Identifiers";
import { realmYaml } from "../util/ConfigFiles";
import { BuildType, DEFAULT_BUILD_TYPE, findBuildType } from "../util/BuildType";


export namespace Realm {

    /**
     * Generates realm ids for all realms
     */
    function generateIds() {
        const used_ids : {[key: string]: boolean}= {}
        let generated: Realm[] = [];

        getRealms().forEach(x=>{
            if(!wfs.exists(ipaths.realmId(x.identifier))) {
                generated.push(x);
            } else {
                used_ids[x.realm_id] = true;
            }
        });

        let i = 1;
        while(used_ids[i] !== undefined) ++i;
        generated.forEach(x=>{
            wfs.write(ipaths.realmId(x.identifier),`${i++}`);
        });
    }

    export class RealmConfig {
        constructor(realm: Realm) {
            this.realm = realm;
        }
        protected realm: Realm;
        protected ryaml<T>(path: string, defValue: T) { 
            return yaml(ipaths.realmYaml(this.realm.identifier), defValue,path); 
        }

        get dataset() { return this.ryaml('dataset','default')}
        get realm_name() { return this.ryaml("realm_name","TSWoW"); }
        get address() { return this.ryaml("address","127.0.0.1")}
        get local_address() { return this.ryaml("local_address","127.0.0.1")}
        get local_subnet_mask() { return this.ryaml("local_subnet_mask","255.255.255.0")}
        get port() { return this.ryaml("port",8085); }
        get icon() { return this.ryaml("icon",0); }
        get flag() { return this.ryaml("flag",0); }
        get security_level() { return this.ryaml("security_level",0); }
        get timezone() { return this.ryaml("timezone",1); }
        get modules(): string[] { 
            if(this.dataset=='default') {
                return wfs.readDir(ipaths.modules);
            }
            if(this.dataset=='define') {
                return this.ryaml<string[]>("modules",[]);
            }
            return getRealm(this.dataset).config.modules;
        }
    }

    export class Realm {
        readonly identifier: string;
        characters: Connection;
        worldserver: Process;
        config: RealmConfig;
        set: Datasets.Dataset;
        lastBuildType: BuildType = DEFAULT_BUILD_TYPE;

        constructor(name: string) {
            this.identifier = name;
            this.config = new RealmConfig(this);
            this.set = Datasets.get(this.config.dataset)

            this.characters = new Connection(
                NodeConfig.database_settings('characters',this.identifier),'characters');
            this.worldserver = new Process().showOutput(true);
            this.worldserver.showOutput(true);
            this.worldserver.setOnFail((err)=>{
                term.error(err.message);
            });
        }

        connect() {
            return Promise.all([
                this.set.connect(),
                this.characters.isConnected ? undefined: this.characters.connect(),
                // can this be concurrent with the connection?
                mysql.installCharacters(this.characters)
            ])
        }

        sendWorldserverCommand(command: string, useNewline: boolean = true) {
            if(this.worldserver.isRunning()) {
                this.worldserver.send(command,useNewline); 
            }
        }

        isWorldserverRunning() {
            return this.worldserver.isRunning();
        }

        stopWorldserver() {
            return this.worldserver.stop();
        }

        async startWorldserver(type: BuildType) {
            term.log(`Starting worlserver for realm ${this.config.realm_name}...`)
            this.lastBuildType = type;
            await this.connect();
            copyLibraryFiles(type);
            await this.set.installDatabase(false);
            this.set.installServerData();
        
            // Generate .conf files
            wfs.readDir(ipaths.tc(type),false,'files').forEach(x=>{
                if(!x.endsWith('.conf.dist')) return;
                if(x.endsWith('authserver.conf.dist')) {
                    return;
                }

                const fname = wfs.basename(x);
                const targetDist  = mpath(ipaths.wsWorkingDir(this.identifier),fname);
                const targetConf = targetDist.replace('.conf.dist','.conf');

                wfs.copy(x,targetDist);
                if(!wfs.exists(targetConf)) {
                    wfs.copy(x,targetConf);
                }


                writeYamlToConf(ipaths.realmYaml(this.identifier),targetConf,
                    {
                        'RealmID': this.realm_id,
                        'DataDir':wfs.absPath(ipaths.datasetDir(this.config.dataset)),
                        'HotSwap.Enabled': 1,
                        'HotSwap.EnableReCompiler': 0,
                        'MySQLExecutable': '../../bin/mysql/bin/mysqld.exe',
                        'Updates.EnableDatabases': 0,
                        'Updates.AutoSetup': 0,
                        'Updates.Redundancy': 0,
                        'WorldServerPort': this.config.port
                    },{characters: this.identifier, world: this.set.id});
            });

            this.worldserver.startIn(ipaths.wsWorkingDir(this.identifier),
                wfs.absPath(ipaths.tcWorldserver(type)),
                    [`-c${wfs.absPath(ipaths.realmWorldserverConf(this.identifier))}`]);
        }

        get realm_id() {
            let rif = ipaths.realmId(this.identifier);
            if(!wfs.exists(rif)) {
                generateIds();
            }

            let id = parseInt(wfs.read(rif));

            if(isNaN(id)) {
                throw new Error(
                      `Realm ${this.identifier} has an invalid realm id,`
                    + ` please fix your the file ${rif}.`)
            }
            return id;
        }

        realmListSql() {
            let values = [
                ['id',this.realm_id],
                ['name',`"${this.config.realm_name}"`],
                ['address',`"${this.config.address}"`],
                ['localAddress',`"${this.config.local_address}"`],
                ['localSubnetMask',`"${this.config.local_subnet_mask}"`],
                ['port',this.config.port],
                ['icon',this.config.icon],
                ['flag',this.config.flag],
                ['timezone', this.config.timezone],
                ['allowedSecurityLevel', this.config.security_level],
                ['population', 0],
                ['game_build', this.set.config.game_build ]
            ]

            return (
                `INSERT INTO realmlist VALUES (${values.map(x=>x[1])
                    .join(',')});`
            );
        }
    }

    const realms : {[key:string]: Realm}= {};

    export function getDatasets(): {[key:string]:Realm[]} {
        let ds : {[key:string]: Realm[]}= {}
        getRealms().forEach(x=>{
            if(ds[x.config.dataset]===undefined) {
                ds[x.config.dataset] = []
            }
            ds[x.config.dataset].push(x);
        });
        return ds;
    }

    export function getDataSet(realm: string) {
        return new Realm(realm).config.dataset;
    }

    export function getRealms() {
        return wfs.readDir(ipaths.realms,true,'directories')
            .map(x=>getRealm(x))
    }

    export function getRealm(name: string) {
        if(realms[name]!==undefined) return realms[name];

        if(!wfs.exists(ipaths.realmDir(name))) {
            throw new Error(`No such realm: ${name}`);
        }

        return realms[name] = new Realm(name);
    }

    export async function removeRealm(name: string) {
        if(!wfs.exists(ipaths.realmDir(name))) {
            return;
        }
        await getRealm(name).stopWorldserver();
        wfs.remove(ipaths.realmDir(name));
    }

    export function createRealm(name: string) {
        Identifiers.assertUnused(name);
        wfs.write(ipaths.realmYaml(name),realmYaml(name));
    }

    export function exists(identifier: string) {
        return wfs.exists(ipaths.realmDir(identifier));
    }

    /**
     * Returns the candidates that are existing realm names, 
     * or the default realm configured in node.yaml
     * 
     * @param candidates 
     */
    export function getRealmsOrDefault(candidates: string[]) {
        if(candidates.includes('all')) {
            return getRealms();
        }
        let realms = Identifiers.getTypes('realm',candidates);
        if(wfs.readDir(ipaths.realms,true,'directories').length === 0) {
            createRealm(NodeConfig.default_realm);
        }
        return (realms.length > 0 ? realms : [NodeConfig.default_realm])
            .map(x=>getRealm(x));
    }

    export function getRealmsOrAll(candidates: string[]) {
        let realms = Identifiers.getTypes('realm',candidates);
        if(realms.length === 0) {
            return getRealms();
        } else {
            return realms.map(x=>getRealm(x));
        }
    }

    export async function initialize() {
        const realm = commands.addCommand('realm');

        realm.addCommand(
              'send'
            , 'realm? command'
            , 'Sends a command to the realms worldserver'
            , async(args)=>{

            let realms : Realm[] = [];
            while(getRealms().find(x=>x.identifier==args[0])) {
                realms.push(getRealm(args.shift() as string));
            }
            let cmd = args.join(' ')
            realms.forEach(x=>x.sendWorldserverCommand(cmd,true));
        });

        realm.addCommand(
              'start'
            , 'debug|release|relwithdebinfo?, realmnames[] | all'
            , 'Starts one, multiple or all realms'
            , async (args)=>{

            let type = findBuildType(args,NodeConfig.default_build_type);

            let realms = getRealmsOrDefault(args);
            await Promise.all(
                realms.map(x=>x.startWorldserver(type)));
        });

        realm.addCommand(
              'stop'
            , 'realmnames[]|all'
            , 'Stops one, multiple or all realms'
            , async(args)=>{

            let realms = Identifiers.assertType('realm',args)
                .map(x=>getRealm(x));
            await Promise.all(realms.map(x=>x.stopWorldserver())); 
        });

        realm.addCommand(
              'status'
            , 'realmnames...'
            , 'Checks if the provided realms are online'
            , async(args)=>{

            getRealmsOrDefault(args).forEach(x=>{
                if(x.worldserver.isRunning()) {
                    term.success(`Realm ${x.identifier} is running (${x.lastBuildType})`);
                } else {
                    term.error(`Realm ${x.identifier} is not running`);
                }
            });
        });

        realm.addCommand(
              'create'
            , 'name'
            , 'Creates a new realm'
            , async(args)=>{

            if(args.length==0 || args[0].length===0) {
                throw new Error(`Must provide a valid realm name`);
            }
            createRealm(args[0]);
        });

        realm.addCommand(
              'remove'
            , 'name...'
            , 'Removes one or multiple existing realms'
            , async(args)=>{

            await Promise.all(args.map(x=>removeRealm(x)));
        });

        if(!wfs.exists(ipaths.realms)) {
            wfs.mkDirs(ipaths.realms);
        }

        NodeConfig.autostart_realms.forEach(x=>x.startWorldserver(NodeConfig.default_build_type));
    }
}