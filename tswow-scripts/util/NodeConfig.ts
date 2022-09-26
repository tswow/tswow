import { BuildType } from "../util/BuildType";
import { ConfigFile, Property, Section } from "../util/ConfigFile";

export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export type DatabaseType = 'world' | 'auth' | 'characters' | 'world_source';

export class NodeConfigClass extends ConfigFile {
    protected description(): string {
        return "Installation Configuration"
    }

    @Section('Defaults')

    @Property({
        name: 'Default.Client'
      , description: 'The client that is automatically selected if none is specified in the current dataset'
      , important: 'No spaces allowed!'
      , examples: [['C:\\dev\\wow335','']]
    })
    DefaultClient!: string

    @Property({
          name: 'Default.Realm'
        , description: 'The realm automatically selected in commands if none other is specified'
        , examples: [['default.realm','']]
    })
    DefaultRealm!: string

    @Property({
        name: 'Default.Dataset'
      , description: 'The dataset automatically selected in commands if none other is specified'
      , examples: [['default.dataset','']]
    })
    DefaultDataset!: string

    @Property({
        name: 'Default.BuildType'
      , description: 'The build type automatically selected in commands if none other is specified'
      , examples: [
            ['RelWithDebInfo','Has debugging symbols. Rarely slower han release, but needs individual profiling.']
          , ['Release','No debugging symbols, but worthless error logs.']
          , ['Debug','All debugging symbols, but (very) slow. Only recommended when debugging a specific problem']
    ]
    })
    DefaultBuildType!: BuildType

    @Section('AutoStart')

    @Property({
          name: 'AutoStart.Client'
        , description: 'How many of the default client that should be started every startup'
        , examples: [[1,'']]
    })
    AutoStartClient!: number

    @Property({
        name: 'AutoStart.AuthServer'
      , description: 'Whether the authserver should be automatically started'
      , examples: [[true,'']]
    })
    AutoStartAuthServer!: boolean

    @Property({
        name: 'AutoRestart.AuthServer'
      , description: 'Whether the authserver should be automatically restarted if it crashes.'
      , examples: [[false,'']]
    })
    AutoRestartAuthServer!: boolean

    @Property({
      name: 'AutoStart.LauncherServer'
    , description: 'Whether the launcher server should be automatically started'
    , examples: [[true,'']]
    })
    AutoStartLauncherServer!: boolean

    @Property({
        name: 'AutoStart.Realms'
      , description: 'What clients should be automatically started'
      , examples: [
          [['default.realm'],'Default realm'],
          [[],'no realm']
        ]
    })
    AutoStartRealms!: string[]

    @Section("Database")

    @Property({
        name: 'Database.UsePooling'
      , description:
        'If the MySQL connector in datascripts should use pooling.'
      + ' Sometimes necessary on slower systems to avoid connection loss,'
      + ' but causes issues for others.'
      , examples: [[false,'']]
    })
    UsePooling!: boolean

    @Property({
        name: 'Database.MySQLExecutable'
      , description:
              'Location of an external MySQL executable.'
            + 'Set this if you plan to use an external database on Windows'
      , examples: [['','']]
    })
    MySQLExecutable!: string

    @Property({
      name: 'Database.HostedPort'
    , description: 'What port to host MySQL on, if any. Windows-only'
    , examples: [[3306,''],[0,'Will not host a MySQL process']]
    })
    DatabaseHostedPort!: number

    @Property({
        name: 'Database.Prefix'
      , description: 'Prefix used for all tswow databases'
      , examples: [
          ['','no prefix']
        , ['example','All databases will start with "example."']
      ]
    })
    DatabasePrefix!: string

    @Property({
        name: 'Database.WorldSource'
      , description: 'This is the database used to read datascripts.'
      , examples: [["localhost;3306;tswow;password",'']]
    })
    DatabaseWorldSource!: string

    @Property({
        name: 'Database.WorldDest'
      , description:  'This is the database used by the worldserver. '
                    + 'Datascripts writes to this database.'
      , examples: [["localhost;3306;tswow;password",'']]
    })
    DatabaseWorldDest!: string

    @Property({
        name: 'Database.Auth'
      , description:  'This is the database used by the auth server. '
      , examples: [["localhost;3306;tswow;password",'']]
    })
    DatabaseAuth!: string

    @Property({
        name: 'Database.Characters'
      , description:  'This is the database storing dynamic game data, such as characters. '
      , examples: [["localhost;3306;tswow;password",'']]
    })
    DatabaseCharacters!: string

    DatabaseString(type: DatabaseType, name?: string) {
        let settings = this.DatabaseSettings(type, name);
        return `${settings.host};${settings.port};${settings.user};${settings.password};${settings.database}`
    }

    DatabaseSettings(type: DatabaseType, name?: string) {
        const makeSettings = (str: string, suffix?: string)=>{
            const [host,port,user,password] = str.split(';')
            let prefix = this.DatabasePrefix.length > 0
                ? `${this.DatabasePrefix}.`
                : ''
            name = name
                ? `${name}.`
                : ''
            return {
                  host
                , port : parseInt(port)
                , user
                , password
                , database:`${prefix}${name}${suffix}`
            }
        }
        switch(type) {
            case 'auth':
                return makeSettings(this.DatabaseAuth,'auth')
            case 'characters':
                return makeSettings(this.DatabaseCharacters,'characters')
            case 'world':
                return makeSettings(this.DatabaseWorldDest,'world.dest')
            case 'world_source':
                return makeSettings(this.DatabaseWorldSource,'world.source')
        }
    }

    @Section("Launcher")

    // todo: launcher stuff not implemented
    /*
    @Property({
        name: 'Launcher.Enabled'
      , description:'Whether launcher web services should be enabled from this node.'
      , examples: [
        [false,'Do not start launcher services'],
        [true,'Starts the launcher http service on startup']
      ]
    })
    LauncherEnabled!: boolean

    @Property({
        name: 'Launcher.Datasets'
      , description: 'What datasets should be hosted by the launcher service'
      , examples: [['["*"]','List all datasets']]
    })
    LauncherDatasets: string[] = this.undefined();

    @Property({
        name: 'Launcher.Port'
      , description: 'What port the launcher http service should be hosted through'
      , examples: [['3726','The port assumed by launchers if none is explicitly specified']]
    })
    LauncherPort!: number
    */

    @Property({
        name: 'Launcher.PatchChunkSize'
      , description: 'How large individual download patch chunks should be'
      , examples: [[33554432,'32mb']]
    })
    LauncherPatchChunkSize!: number

    @Section("Misc")

    @Property({
          name: 'Terminal.History'
        , description: 'How many lines of terminal input should be stored'
        , examples: [[100,'']]
    })
    TerminalHistory!: number

    @Property({
          name: 'Terminal.DisplayTimestamps'
        , description: 'Whether terminal output should include timestamps'
        , examples: [[true,'']]
    })
    TerminalTimestamps!: boolean

    @Property({
      name: 'Terminal.DisplayNames'
    , description: 'Whether terminal output should include submodule names'
    , examples: [[true,'']]
    })
    TerminalNames!: boolean

    @Property({
          name: 'Positions.WriteToClipboard'
        , description: 'Whether .at command output is written to the clipboard'
        , examples: [[true,'']]
    })
    WritePosToClipboard!: boolean
}