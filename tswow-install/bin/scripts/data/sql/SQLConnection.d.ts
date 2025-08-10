import * as mysql from 'mysql2';
import { SqlRow } from './SQLRow';
import { SqlTable } from './SQLTable';
export declare class PreparedStatement {
    private asyncStatement;
    readonly query: string;
    private early;
    private normal;
    private late;
    constructor(statement: string);
    writeEarly(values: any[]): void;
    writeNormal(values: any[]): void;
    writeLate(values: any[]): void;
    static clear(stmnt: PreparedStatement): void;
    static setStatement(stmnt: PreparedStatement, asyncStatement: any): void;
    static getStatement(stmnt: PreparedStatement): any;
}
export declare class Connection {
    static end(connection: Connection): void;
    static connect(connection: Connection): void;
    protected settings: any;
    protected async: mysql.Pool | mysql.Connection | undefined;
    protected sync: mysql.Pool | mysql.Connection | undefined;
    protected syncQuery: any;
    constructor(obj: any);
    protected statements: PreparedStatement[];
    protected early: string[];
    protected normal: string[];
    protected late: string[];
    databaseName(): any;
    read(query: string): any;
    prepare(statement: string): PreparedStatement;
    write(query: string): void;
    writeEarly(query: string): void;
    writeLate(query: string): void;
    apply(): Promise<void>;
}
/**
 * Represents the global SQL connection.
 *
 * @motivation Since we already decided not to allow parallell patching, this might
 * just as well be static so we avoid having to pass around a script context to all
 * data structures. Can always change if we want to support paralellism later.
 */
export declare class SqlConnection {
    static additional: Connection[];
    static logFile: number;
    static log(db: string, sql: string): void;
    static auth: Connection;
    static world_dst: Connection;
    static world_src: Connection;
    private static query_cache;
    protected static endConnection(): void;
    static connect(): void;
    static getRows<C, Q, T extends SqlRow<C, Q>>(table: SqlTable<C, Q, T>, where: Q, first: boolean): T[];
    static querySource(sql: string): any;
    static allDbs(): Connection[];
}
