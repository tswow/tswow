import { BuildType } from "../util/BuildType";
import { commands } from "../util/Commands";
import { Connection } from "./MySQL";
export declare namespace AuthServer {
    let connection: Connection | undefined;
    function query(sql: string): Promise<any>;
    function isStarted(): boolean;
    function stop(): Promise<void>;
    function start(type?: BuildType): Promise<void>;
    const command: commands.Command;
    function initializeDatabase(): Promise<void>;
    function initializeServer(): Promise<void>;
}
