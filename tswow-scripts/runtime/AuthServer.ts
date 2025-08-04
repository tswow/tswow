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
        term.debug('authserver', 'Stopping authserver')
        return authserver.stop();
    }

    export async function start(type: BuildType = NodeConfig.DefaultBuildType) {
        term.log('authserver', `Starting ${type} authserver`)
        authserver.setAutoRestart(NodeConfig.AutoRestartAuthServer)

        await stop();
        if(authserver.isRunning()) {
            throw new Error(`Something else started the auth server while it was stopping`);
        }

        ipaths.bin.core.pick('trinitycore').build.pick(type).authserver_conf_dist
            .copy(ipaths.coredata.authserver.authserver_conf.get()+'.dist')

        ipaths.bin.core.pick('trinitycore').build.pick(type).authserver_conf_dist
            .copyOnNoTarget(ipaths.coredata.authserver.authserver_conf)

        term.debug('authserver', 'Setting up realmlist table for authserver')

        // Check for port conflicts
        const portMap: {[port: number]: string[]} = {};
        for (const realm of Realm.all()) {
            const port = realm.getPort();
            if (!portMap[port]) {
                portMap[port] = [];
            }
            portMap[port].push(realm.fullName);
        }

        // Warn about port conflicts
        const portConflicts = Object.entries(portMap)
            .filter(([port, realms]) => realms.length > 1);

        if (portConflicts.length > 0) {
            term.warn('authserver', '='.repeat(60));
            term.warn('authserver', 'WARNING: Port conflicts detected!');
            term.warn('authserver', '='.repeat(60));
            for (const [port, realms] of portConflicts) {
                term.warn('authserver', `Port ${port} is used by multiple realms:`);
                for (const realmName of realms) {
                    term.warn('authserver', `  - ${realmName}`);
                }
            }
            term.warn('authserver', '');
            term.warn('authserver', 'Multiple realms cannot run on the same port.');
            term.warn('authserver', 'Only one realm per port can be started at a time.');
            term.warn('authserver', 'Consider changing WorldServerPort in worldserver.conf');
            term.warn('authserver', 'for one or more conflicting realms.');
            term.warn('authserver', '='.repeat(60));
        }

        await query('DELETE FROM realmlist;');
        await Promise.all(Realm.all().map(x=>query(x.realmlistSQL())));
        await Promise.all(Dataset.all().map(x=>query(x.gamebuildSQL())));

        patchTCConfig(
              ipaths.coredata.authserver.authserver_conf.get()
            ,'LoginDatabaseInfo',NodeConfig.DatabaseString('auth')
        )

        // Add debug to check if process management is affected
        term.debug('authserver', `Starting authserver with executable: ${ipaths.bin.core.pick('trinitycore').build.pick(type).authserver.get()}`);
        term.debug('authserver', `Config file: ${ipaths.coredata.authserver.authserver_conf.get()}`);
        
        authserver.startIn(ipaths.coredata.authserver.get(),
            wfs.absPath(
                  ipaths.bin.core.pick('trinitycore').build.pick(type).authserver.get())
                , [`-c${wfs.absPath(
                    ipaths.coredata.authserver.authserver_conf.get()
                )}`]
            );
        term.log('authserver', 'Authserver process started');
        
        // Wait a moment to see if it stays running
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!authserver.isRunning()) {
            term.error('authserver', 'Authserver process exited immediately after starting!');
        }
    }

    export const command = commands.addCommand('authserver', '', 'Authentication server management commands');

    export async function initializeDatabase() {
        term.debug('authserver', `Initializing authserver database`)
        if(NodeConfig.AutoStartAuthServer) {
            const dbSettings = NodeConfig.DatabaseSettings('auth');
            connection = new Connection(dbSettings,'auth');
            await connection.connect();
            await mysql.installAuth(connection);
        }
    }

    export async function initializeServer() {
        term.debug('misc', `Initializing authserver`)
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
