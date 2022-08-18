import { BuildType, findBuildType } from "../util/BuildType";
import { commands } from "../util/Commands";
import { patchTCConfig } from "../util/ConfigFile";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { Process } from "../util/Process";
import { term } from "../util/Terminal";
import { StartCommand, StopCommand } from "./CommandActions";
import { Dataset } from "./Dataset";
import { Connection, mysql } from "./MySQL";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";

export namespace AuthServer {
    const authserver = new Process('authserver')
    export let connection: Connection|undefined = undefined;

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

    export async function start(type: BuildType = NodeConfig.DefaultBuildType) {
        authserver.setAutoRestart(NodeConfig.AutoRestartAuthServer)

        await stop();
        if(authserver.isRunning()) {
            throw new Error(`Something else started the auth server while it was stopping`);
        }

        ipaths.bin.core.pick('trinitycore').build.pick(type).authserver_conf_dist
            .copy(ipaths.coredata.authserver.authserver_conf.get()+'.dist')

        ipaths.bin.core.pick('trinitycore').build.pick(type).authserver_conf_dist
            .copyOnNoTarget(ipaths.coredata.authserver.authserver_conf)

        await query('DELETE FROM realmlist;');
        await Promise.all(Realm.all().map(x=>query(x.realmlistSQL())));
        await Promise.all(Dataset.all().map(x=>query(x.gamebuildSQL())));

        patchTCConfig(
              ipaths.coredata.authserver.authserver_conf.get()
            ,'LoginDatabaseInfo',NodeConfig.DatabaseString('auth')
        )

        authserver.startIn(ipaths.coredata.authserver.get(),
            wfs.absPath(
                  ipaths.bin.core.pick('trinitycore').build.pick(type).authserver.get())
                , [`-c${wfs.absPath(
                    ipaths.coredata.authserver.authserver_conf.get()
                )}`]
            );
    }

    export const command = commands.addCommand('authserver');

    export async function initializeDatabase() {
        if(NodeConfig.AutoStartAuthServer) {
            connection = new Connection(NodeConfig.DatabaseSettings('auth'),'auth');
            await connection.connect();
            await mysql.installAuth(connection);
        }
    }

    export async function initializeServer() {
        if(NodeConfig.AutoStartAuthServer) {
            await start(NodeConfig.DefaultBuildType);
        }
        StopCommand.addCommand(
             'authserver'
            , ''
            , 'Stops the local authserver'
            , async (args)=>{
                if(!authserver.isRunning()) {
                    throw new Error(`Authserver isn't running`)
                }
                await authserver.stop();
                term.success('authserver','authserver was stopped')
        }).addAlias('auth');

        StartCommand.addCommand(
             'authserver'
            ,'debug|release?'
            ,'Starts the local authserver'
            , (args)=>{
            return start(findBuildType(args));
        }).addAlias('auth');
    }
}