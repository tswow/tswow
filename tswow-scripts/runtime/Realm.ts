import { BuildType } from "../util/BuildType";
import { commands } from "../util/Commands";
import { ConfigFile, patchTCConfig, Property, Section } from "../util/ConfigFile";
import { EmulatorCore } from "../util/EmulatorCore";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { Process } from "../util/Process";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { termCustom } from "../util/TerminalCategories";
import { CreateCommand, ListCommand, StartCommand, StopCommand } from "./CommandActions";
import { Identifier } from "./Identifiers";
import { Module, ModuleEndpoint } from "./Modules";
import { Connection, mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";

const REALM_NAME_FIELD = 'Realm.Name'
export class RealmConfig extends ConfigFile {
    protected description(): string {
        return "Realm Configuration"
    }

    constructor(filename: string, name: string) {
        super(filename);
        if(this.RealmName.length === 0) {
            patchTCConfig(this.filename,REALM_NAME_FIELD,name);
        }
    }

    @Section("Realm")
    @Property({
          name: 'Realm.Dataset'
        , description: 'What dataset to use for this realm'
        , examples: [
            ['default.dataset','']
        ]
        , note: 'The first part of the path is a module id, '
              + 'and the last is a dataset id'
    })
    private _Dataset: string = this.undefined()
    get Dataset() {
        return Identifier.getDataset(this._Dataset);
    }

    @Property({
          name: REALM_NAME_FIELD
        , description: 'The displayed name of this realm'
        , examples: [
            ['TSWoW Realm','']
        ]
    })
    RealmName: string = this.undefined();

    @Property({
        name: 'Realm.PublicAddress'
      , description: 'The public IP of this realm'
      , examples: [
            ['127.0.0.1','Localhost']
          , ['192.168.0.5','Local area network']
          , ['17.5.7.8','Public IP (google "what is my ip" for yours)']
      ]
      , important: 'This is **not** a hostname/DNS'
    })
    PublicAddress: string = this.undefined();

    @Property({
          name: 'Realm.LocalAddress'
        , description: 'The local address of this realm'
        , examples: [
              ['127.0.0.1','Localhost']
            , ['25.4.23.9','Hamachi IP']
        ]
        , important: 'If using reverse tunnelling or a VPN,'
            + 'this must be the IP your friends connect to, not localhost'
    })
    LocalAddress: string = this.undefined()

    @Property({
          name: 'Realm.LocalSubnetMask'
        , description: 'The subnet mask of the local address'
        , examples: [
            ['255.0.0.0','Localhost subnet mask']
        ]
        , important: 'Must match the IP in Realm.LocalAddress'
    })
    LocalSubnetMask: string = this.undefined()

    @Property({
          name: 'Realm.Type'
        , description: 'The type of realm'
        , examples: [
              [0,'PvE']
            , [4,'PvP']
            , [6,'RP']
            , [8,'RP PvP']
        ]
    })
    Type: number = this.undefined()

    @Property({
        name: 'Realm.RequiredSecurityLevel'
      , description: 'What type of account is required to log in to this realm'
      , examples: [
            [0,'Any account']
          , [1,'Moderators']
          , [2,'GM']
          , [3,'Super GM']
      ]
    })
    RequiredSecurityLevel: number = this.undefined()

    @Property({
          name: 'Realm.Recommended'
        , description: 'Whether to list this realm as "Recommended"'
        , examples: [[true,'']]
    })
    Recommended: boolean = this.undefined()

    @Property({
        name: 'Realm.Full'
      , description: 'Whether to list this realm as "Full"'
      , examples: [[true,'']]
    })
    Full: boolean = this.undefined()

    @Property({
        name: 'Realm.Offline'
      , description: 'Whether to list this realm as "Offline"'
      , examples: [[true,'']]
    })
    Offline: boolean = this.undefined()

    @Property({
        name: 'Realm.NewPlayers'
      , description: 'Whether to list this realm as "New Players"'
      , examples: [[true,'']]
    })
    NewPlayers: boolean = this.undefined()

    @Property({
          name: 'Timezone'
        , description: 'The realm timezone, specifies what realmlist tab to use'
        , examples: [[1,'Development']]
        , note: 'See possible values here: https://trinitycore.atlassian.net/wiki/spaces/tc/pages/2130016/realmlist#realmlist-timezone'
    })
    TimeZone: number = this.undefined()

    @Property({
          name: 'Realm.AutoRestart'
        , description: 'Whether to restart the worldserver if it crashes'
        , examples: [[false,'']]
        , note: 'See possible values here: https://trinitycore.atlassian.net/wiki/spaces/tc/pages/2130016/realmlist#realmlist-timezone'
    })
    AutoRestart: boolean = this.undefined();
}

class RealmManager {
    characters: Connection;
    worldserver: Process;
    constructor(name: string) {
        this.characters = new Connection(
              NodeConfig.DatabaseSettings('characters',name)
            , 'characters'
        )
        this.worldserver = new Process(`realm/${name}`)
            .showOutput(true)
            .onFail(err=>{
                term.error(termCustom('realm',name),err.message)
            })
    }
}

export class Realm {
    private static managers: {[key: string]: RealmManager} = {};

    readonly mod: ModuleEndpoint
    readonly name: string
    lastBuildType: BuildType = NodeConfig.DefaultBuildType
    readonly config: RealmConfig

    private manager() {
        return Realm.managers[this.fullName]
           || (Realm.managers[this.fullName] = new RealmManager(this.fullName))
    }

    get characters() {
        return this.manager().characters;
    }

    get worldserver() {
        return this.manager().worldserver;
    }

    get fullName() {
        return this.mod.fullName+'.'+this.name;
    }

    get path() {
        if(this._path) return this._path;
        return ( this._path as any) = this.mod.path.realms.realm.pick(this.name);
    }
    private _path: never;

    hasID() {
        return this.path.realm_id.exists()
    }

    getID() {
        if(this.path.realm_id.exists()) {
            return parseInt(this.path.realm_id.readString())
        }
        let used: {[key: string]: boolean} = {}
        Realm.all().forEach(x=>{
            if(x.hasID()) {
                used[x.getID()] = true;
            }
        })
        let i = 1;
        while(used[i] !== undefined) ++i;
        this.path.realm_id.write(`${i}`);
        return i;
    }

    realmlistSQL() {
        let flag = 0;
        if(this.config.Offline) flag |=0x2
        if(this.config.NewPlayers) flag |= 0x10;
        if(this.config.Recommended) flag |= 0x20;
        if(this.config.Full) flag |= 0x40

        let port: number;
        if(!this.path.worldserver_conf.exists()) {
            port = 8085;
        } else {
            let portMatch = this.path.worldserver_conf.readString()
                .match(/WorldServerPort *= *(\d+)/)
            if(portMatch) {
                port = parseInt(portMatch[1]);
            }
        }

        let values = [
            ['id',this.getID()],
            ['name',`"${this.config.RealmName}"`],
            ['address',`"${this.config.PublicAddress}"`],
            ['localAddress',`"${this.config.LocalAddress}"`],
            ['localSubnetMask',`"${this.config.LocalSubnetMask}"`],
            ['port',port],
            ['icon',this.config.Type],
            ['flag',flag],
            ['timezone', this.config.TimeZone],
            ['allowedSecurityLevel', this.config.RequiredSecurityLevel],
            ['population', 0],
            ['game_build', this.config.Dataset.config.DatasetGameBuild ]
        ]

        return (
            `INSERT INTO realmlist VALUES (${values.map(x=>x[1])
                .join(',')});`
        );
    }

    constructor(mod: ModuleEndpoint, name: string) {
        this.mod = mod;
        this.name = name;
        this.config = new RealmConfig(this.path.config.get(),name)
    }

    logName() {
        return termCustom('realm',this.fullName)
    }

    get core(): EmulatorCore {  return this.config.Dataset.config.EmulatorCore }

    async start(type: BuildType) {
        term.log(this.logName(),`Starting worlserver for ${this.config.RealmName}...`)
        this.lastBuildType = type;
        await this.connect();
        await this.config.Dataset.setupDatabases('BOTH',false);
        await this.config.Dataset.setupClientData()
        this.config.Dataset.writeModulesTxt()

        // Generate .conf files
        ipaths.bin.core.pick(this.config.Dataset.config.EmulatorCore).build.pick(type)
            .iterate('FLAT','FILES','FULL',node=>{
                if(!node.endsWith('.conf.dist')) return;
                if(node.endsWith('authserver.conf.dist')) {
                    return;
                }
                const fname = node.basename()
                node.copy(this.path.join(fname))
                node.copyOnNoTarget(this.path.join(fname.substring(0,fname.length-'.dist'.length)))
            });

        patchTCConfig(
              this.path.worldserver_conf.get()
            , 'LoginDatabaseInfo'
            , NodeConfig.DatabaseString('auth')
        )

        patchTCConfig(
            this.path.worldserver_conf.get()
          , 'CharacterDatabaseInfo'
          , NodeConfig.DatabaseString('characters',this.fullName)
        )

        patchTCConfig(
            this.path.worldserver_conf.get()
          , 'WorldDatabaseInfo'
          , NodeConfig.DatabaseString('world',this.config.Dataset.fullName)
        )

        patchTCConfig(
              this.path.worldserver_conf.get()
            , 'MySQLExecutable'
            , NodeConfig.MySQLExecutable.length === 0
                ? ipaths.bin.mysql.mysql_exe.abs().get()
                : '"NodeConfig.MySQLExecutable"'
        )

        if(this.core === 'trinitycore') {
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.Enabled',1)
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.EnableReCompiler',0)
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.EnableEarlyTermination',0)
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.EnableBuildFileRecreation',0)
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.EnableInstall',0)
            patchTCConfig(this.path.worldserver_conf.get(), 'HotSwap.EnablePrefixCorrection',0)
        }

        patchTCConfig(this.path.worldserver_conf.get(), 'Updates.EnableDatabases', 0)
        patchTCConfig(this.path.worldserver_conf.get(), 'Updates.AutoSetup', 0)
        patchTCConfig(this.path.worldserver_conf.get(), 'Updates.Redundancy', 0)
        patchTCConfig(this.path.worldserver_conf.get(), 'RealmID',this.getID())
        patchTCConfig(this.path.worldserver_conf.get(), 'DataDir',this.config.Dataset.path.abs().get())

        this.worldserver.setAutoRestart(this.config.AutoRestart);

        switch(this.core) {
            case 'azerothcore':
                this.path.worldserver_conf.copy(this.path.join('configs/worldserver.conf.dist'))
                this.worldserver.startIn(this.path.get(),
                    wfs.absPath(ipaths.bin.core.pick(this.config.Dataset.config.EmulatorCore).build.pick(type).worldserver.get()));
                break;
            case 'trinitycore':
                this.worldserver.startIn(this.path.get(),
                    wfs.absPath(ipaths.bin.core.pick(this.config.Dataset.config.EmulatorCore).build.pick(type).worldserver.get()),
                        [`-c${wfs.absPath(this.path.worldserver_conf.get())}`]);
                break;
        }
    }

    async connect() {
        await this.characters.connect()
        await this.config.Dataset.connect();
        await mysql.installCharacters(this.characters,this.core);
    }

    sendWorldserverCommand(command: string, useNewline: boolean = true) {
        if(this.worldserver.isRunning()) {
            this.worldserver.send(command,useNewline);
        }
    }

    initialize() {
        try {
            ipaths.bin.core.pick(this.config.Dataset.config.EmulatorCore).build.pick(NodeConfig.DefaultBuildType)
                .worldserver_conf_dist.copy(this.path.worldserver_conf_dist)
            this.path.worldserver_conf_dist
                .copyOnNoTarget(this.path.worldserver_conf)
            this.config.generateIfNotExists()
        } catch(err) {
            term.error(this.logName(),`Error during intialization: ${err.message}`)
        }
        return this;
    }

    static create(mod: ModuleEndpoint, name: string, displayname: string = name) {
        let existed = new Realm(mod,name).path.config.exists()
        const realm = new Realm(mod, name).initialize();
        if(!existed) {
            patchTCConfig(realm.config.filename,REALM_NAME_FIELD,displayname);
        }
        return realm;
    }

    static all() {
        return Module.endpoints()
            .filter(x=>x.path.realms.exists())
            .reduce<Realm[]>((p,c)=>p.concat(c.realms.all()),[])
    }

    static async initialize() {
        // Create default realm if it's selected
        if(NodeConfig.DefaultRealm === 'default.realm') {
            ipaths.modules.join('default/realms/realm').mkdir()
        }

        if(
               !process.argv.includes('noac')
            && !process.argv.includes('norealm')
        ) {
            await Promise.all(NodeConfig.AutoStartRealms
                .map(x=>Identifier.getRealm(x)
                    .start(NodeConfig.DefaultBuildType)))
        }

        StopCommand.addCommand(
              'realm'
            , 'relamnames time --force'
            , 'Shuts down the specified realms. If the --force flag is supplied, time is ignored.'
            , args => {
                let delay = args.map(x=>parseInt(x)).find(x=>x!==NaN) || 0
                let realms = Identifier.getRealms(
                        args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultRealm
                )

                let runningRealms = realms.filter(x=>x.worldserver.isRunning())
                if(runningRealms.length === 0) {
                    throw new Error(`None of the specified realms are started: ${realms.map(x=>x.fullName).join(' ')}`)
                }

                return Promise.all(runningRealms.map(x=>{
                    if(args.includes('--force')) {
                        return x.worldserver.stop();
                    } else {
                        x.worldserver.send(`server shutdown force ${delay}`)
                        return x.worldserver.stopPromise()
                    }
                }))
            }
        )

        CreateCommand.addCommand(
              'realm'
            , 'module realmname displayname?'
            , ''
            , args => {
                const module = Identifier.getModule(args[0])
                const realmname = Identifier.assertUnused(args[1],'realmname');
                const displayname = args[2];
                this.create(module,realmname,displayname);
            }
        ).addAlias('realms')

        StartCommand.addCommand(
              'realm'
            , ''
            , ''
            , async args => {
                await Promise.all(Identifier.getRealms(args,'MATCH_ANY',NodeConfig.DefaultRealm)
                    .map(x=>{
                        return x.start(Identifier.getBuildType(args,NodeConfig.DefaultBuildType))
                    }))
            }
        ).addAlias('realms')

        commands.addCommand('realm')
            .addCommand('send','','',args=>{
                let realm = Identifier.getRealm(args[0]);
                let message = args.slice(1);
                realm.worldserver.send(message.join(' '),true);
            });

        ListCommand.addCommand(
              'realm'
            , ''
            , ''
            , args => {
                let isModule = Identifier.isModule(args[0])
                Realm.all()
                    .sort((a,b)=>{
                        let ar = a.worldserver.isRunning();
                        let br = b.worldserver.isRunning();
                        return ar === br ? 0 : ar ? 1 : -1;
                    })
                    .filter(x=> !isModule || x.mod.mod.id === args[0])
                    .forEach(x=>{
                        if(x.worldserver.isRunning()) {
                            term.success('realm',x.name+': '+x.path.get()+' (running)')
                        } else {
                            term.error('realm',x.name+': '+x.path.get()+' (not running)')
                        }
                    })
          }
        ).addAlias('realms')

        CreateCommand.addCommand(
              'account'
            , 'accountName password gmLevel=0 (3 is highest)'
            , 'Creates a new account for the specified realm'
            , async args => {
                if(args.length < 2) {
                    throw new Error(`This command requires at least an account name and password.`)
                }
                const username = args[0].toUpperCase();
                const password = args[1].toUpperCase();
                const gmlevel = parseInt(args[2]||'0')

                for(const realm of Realm.all()) {
                    if(realm.worldserver.isRunning()) {
                        // hackfix: this doesn't work if the
                        // worldserver is currently starting.
                        realm.sendWorldserverCommand(
                            `account create ${username} ${password}`
                        )
                        await wsys.sleep(500);
                        realm.sendWorldserverCommand(
                            `account set gmlevel ${username} ${gmlevel} -1`
                        )
                        return;
                    }
                }
                throw new Error(
                        `No worldserver found.`
                    + ` The 'create account' command only currently works`
                    + ` if at least one worldserver is running.`
                )
            }
        )
    }
}

export class Realms {
    readonly mod: ModuleEndpoint;

    get path() {
        return this.mod.path.realms
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    pick(name: string) {
        return new Realm(this.mod,this.path.realm.pick(name).get())
    }

    all() {
        return this.path.realm.all()
            .map(x=>new Realm(this.mod, x.basename().get()))
    }

    create(name: string) {
        return Realm.create(this.mod,name)
    }
}