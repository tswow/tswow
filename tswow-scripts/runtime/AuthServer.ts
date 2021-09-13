import { BuildType, findBuildType } from "../util/BuildType";
import { mpath, wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { Process } from "../util/Process";
import { copyLibraryFiles, writeYamlToConf } from "../util/TCConfig";
import { commands } from "./Commands";
import { Datasets } from "./Dataset";
import { Connection, mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";

export namespace AuthServer {
    const authserver = new Process().showOutput(true);
    let connection: Connection|undefined = undefined;

    export function query(sql: string) {
        if(!connection) {
            throw new Error('Internal error: Auth database connection not initialized');
        } else {
            return connection.query(sql);
        }
    }

    export function isStarted() {
        return authserver.isRunning();
    }

    export function stop() {
        return authserver.stop();
    }

    export async function start(type: BuildType = NodeConfig.default_build_type) {
        await stop();
        if(authserver.isRunning()) {
            throw new Error(`Something else started the auth server while it was stopping`);
        }

        wfs.copy(ipaths.tcAuthserverDist(type),ipaths.authConfig+'.dist');

        if(!wfs.exists(ipaths.authConfig)) {
            wfs.copy(ipaths.tcAuthserverDist(type),ipaths.authConfig);
        }

        writeYamlToConf(ipaths.nodeYaml,ipaths.authConfig,{
            // authserver executes in coredata, so we need the .. prefix
            'MySQLExecutable':mpath('..',ipaths.rel(ipaths.mysqldExe))
        });

        await query('DELETE FROM realmlist;');
        await Promise.all(Realm.getRealms().map(x=>query(x.realmListSql())));
        await Promise.all(Datasets.getAll().map(x=>query(x.gamebuildSql())));
        copyLibraryFiles(type);

        authserver.startIn(ipaths.authRoot,
            wfs.absPath(ipaths.tcAuthServer(type)),[`-c${wfs.absPath(ipaths.authConfig)}`]);
    }

    export const command = commands.addCommand('auth');

    export async function initialize() {
        connection = new Connection(NodeConfig.database_settings('auth'),'auth');
        await mysql.installAuth(connection);

        if(NodeConfig.autostart_authserver) {
            await start(NodeConfig.default_build_type);
        }

        AuthServer.command.addCommand(
             'stop'
            , ''
            , 'Stops the local authserver'
            , async (args)=>{

            await stop();
        });

        AuthServer.command.addCommand(
             'start'
            ,'debug|release?'
            ,'Starts the local authserver'
            ,async (args)=>{

            await start(findBuildType(args));
        });
    }
}