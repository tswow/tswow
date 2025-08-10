import { CPrim } from "../cells/Cell";
export type TypeOfTypes = 'string' | 'null' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
export type EntryType = 'primitive' | 'cell' | 'system' | 'struct' | 'entity';
export type Entry = CPrim | {
    ref: 'struct' | 'entity';
    name: string;
};
export type Schema = {
    __schema_type: 'entity' | 'struct';
    [key: string]: Schema | Entry;
};
export type ObjectifyOptions = {
    refDepth?: number;
} | undefined;
export interface Objectified {
    objectify(options?: ObjectifyOptions): any;
}
export declare let structSchemas: {
    [key: string]: Schema;
};
export declare const Objects: {
    getEntryType(entry: any): EntryType;
    generateSchema(entry: any, objIn?: Schema): Schema;
    getAllPropertyNames(obj: any): Set<string>;
    objectifyObj(thiz: any, options?: ObjectifyOptions): {
        [key: string]: any;
    };
    mapObject(objIn: any, type: TypeOfTypes[], filter: (key: string, obj: any) => boolean, map?: (key: string, obj: any) => any): {
        [key: string]: any;
    };
};
