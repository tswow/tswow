import { Relation } from './Relations';
interface Query {
    [key: string]: Relation<any>;
}
declare class AnyQuery {
    values: Query[];
    isAnyQuery: boolean;
    constructor(values: Query[]);
}
declare class AllQuery {
    values: Query[];
    isAllQuery: boolean;
    constructor(values: Query[]);
}
export declare function qany(...query: Query[]): AnyQuery;
export declare function qall(...query: Query[]): AllQuery;
export declare function queryToSql(query: Query | AnyQuery | AllQuery, addSemicolon?: boolean): string;
export declare function inMemory(query: Query | AnyQuery | AllQuery, obj: any): boolean;
export {};
