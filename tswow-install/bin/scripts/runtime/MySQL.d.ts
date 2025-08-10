import * as mysql_lib from 'mysql2';
import { EmulatorCore } from '../util/EmulatorCore';
import { DatabaseSettings, DatabaseType } from '../util/NodeConfig';
/**
 * Represents a single connection to a mysql server.
 */
export declare class Connection {
    con?: mysql_lib.Pool | mysql_lib.Connection;
    cfg: DatabaseSettings;
    status?: Promise<void>;
    isConnected: boolean;
    type: DatabaseType;
    /**
     * Creates a new connection for a specific database type.
     * @param type
     */
    constructor(cfg: DatabaseSettings, type: DatabaseType);
    private configWithoutDb;
    private configForConnection;
    private configForPool;
    private config;
    /**
     * Return the database name configured for this connection.
     */
    name(): string;
    /**
     * Send a query over this connection.
     *
     * Since connections are database-specific, you specify the database by choosing a connection and not in the query itself.
     * @param query The query to execute.
     * @returns Promise with the return value of the query.
     */
    query(query: string): Promise<any>;
    queryPrepared(query: string, args: any[]): Promise<any>;
    /**
     * Check if the database of this connection contains a specific table.
     * @param tableName Name of the table to check for
     */
    hasTable(tableName: string): Promise<boolean>;
    /**
     * Initiates this connection to the database server. Creates the database if it does not yet exist.
     *
     * @returns Promise that resolves when the connection has been established.
     */
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    clean(): Promise<void>;
}
/**
 * Contains functions and fields for managing the mysql server that tswow handles.
 */
export declare namespace mysql {
    function dump(connection: Connection, outputFile: string): void;
    function startProcess(): Promise<void>;
    /**
     * Returns whether this instance of TSWoW should manage its own MySQL process.
     */
    function hasOwnProcess(): boolean;
    /**
     * Sets whether the MySQL process should display output in the console
     * (very messy, only use when you need to debug)
     * @param show
     */
    function showProcessOutput(show: boolean): void;
    /**
     * Checks if world databases are installed on multiple connections
     * @param worldConnections
     */
    function isWorldInstalled(worldConnections: Connection[]): Promise<boolean>;
    /**
     * Extracts the TDB file in bin and returns the filepath
     */
    function extractTdb(): Promise<string>;
    /**
     * Rebuilds a database from an sql file
     * @param con
     * @param sqlFilePath
     */
    function rebuildDatabase(con: Connection, sqlFilePath: string): Promise<void>;
    function applySQLFiles(cons: Connection, type: 'world' | 'auth' | 'characters'): Promise<void>;
    function disconnect(): Promise<void>;
    function installCharacters(connection: Connection, core: EmulatorCore): Promise<void>;
    function installAuth(connection: Connection): Promise<void>;
    function initialize(): Promise<void>;
}
