import { GetId as _GetId, GetIdRange as _GetIdRange } from '../util/ids/Ids';
export type Stages = 'SETUP' | 'READ' | 'WRITE' | 'PATCH' | 'FINISH' | 'LUAXML' | 'SORT';
export declare function GetStage(): Stages;
/**
 * Step 1 of script loading.
 * - Runs CONCURRENTLY with global scopes.
 * - Runs BEFORE read/write/patch/finish
 *
 * This stage should:
 * - Initialize ALL the modules own public entities
 * - Modify ONLY the modules own public entities
 * - NOT read other modules public entities (stateless library functions are fine)
 * @param name
 * @param callback
 */
export declare function setup(name: string, callback: () => any): void;
/**
 * Step 2 of script loading.
 * - Runs AFTER setup and global scope.
 * - Runs BEFORE write/patch/finish
 *
 * This stage should:
 * - Read entities from other modules
 * - NOT modify any public entities.
 * @param name
 * @param callback
 */
export declare function read(name: string, callback: () => any): void;
/**
 * Step 3 of script loading.
 * - Runs AFTER global scope, setup and read.
 * - Runs BEFORE patch/finish
 *
 * This stage should:
 * - NOT read other modules public entities (stateless library functions are fine)
 * - Modify ONLY the modules own public entities.
 * @param name
 * @param callback
 */
export declare function write(name: string, callback: () => any): void;
/**
 * Step 4 of script loading
 * - Runs AFTER global scope, setup, read and write.
 * - Runs BEFORE finish
 *
 * This stage should:
 * - Be called at most once by a single module.
 * - Never be called from a library module.
 * - Read or modify any public entities.
 * @param name
 * @param callback
 */
export declare function patch(name: string, callback: () => any): void;
/**
 * Step 5 of script loading (final step that can handle existing data)
 * - Runs AFTER global scope, setup, read, write and patch.
 *
 * This stage should:
 * - Not access any public entities in other modules.
 * - NOT modify any public entities at all
 * - Serialize entity builders
 * - Find and report any conflicts in entity builders.
 * @param name
 * @param callback
 */
export declare function finish(name: string, callback: () => any): void;
/**
 * Step 6 of script loading (final step)
 * - Runs AFTER luaxml data has been written
 *
 * This stage should:
 * - Write any custom luaxml
 *
 * @param name
 * @param callback
 */
export declare function luaxml(name: string, callback: () => any): void;
/**
 * Step 7 of script loading (final step)
 * - Runs AFTER global scope, setup, read, write, patch, finish and luaxml.
 *
 * This stage should:
 * - Sort DBC files in place.
 *
 * At this stage, all previous DBC pointers can become invalid, and the only valid
 * API operation is calling DBCTable#sort and reading the rows it calls back with
 *
 * @param name
 * @param callback
 */
export declare function sort(name: string, callback: () => any): void;
/**
 * Finds a unique range of ids that will persist through multiple runs of the program
 */
export declare const GetIdRange: typeof _GetIdRange;
/**
 * Finds a unique id that will persist through multiple runs of the program
 */
export declare const GetId: typeof _GetId;
/**
 * Exports uint32 so id files in tswow can use them.
 * Include this instead of defining it yourself.
 */
export type uint32 = number;
/**
 * Functions for transforming objects
 */
export declare const Objects: {
    getEntryType(entry: any): import("./cell/serialization/ObjectIteration").EntryType;
    generateSchema(entry: any, objIn?: import("./cell/serialization/ObjectIteration").Schema): import("./cell/serialization/ObjectIteration").Schema;
    getAllPropertyNames(obj: any): Set<string>;
    objectifyObj(thiz: any, options?: import("./cell/serialization/ObjectIteration").ObjectifyOptions): {
        [key: string]: any;
    };
    mapObject(objIn: any, type: import("./cell/serialization/ObjectIteration").TypeOfTypes[], filter: (key: string, obj: any) => boolean, map?: (key: string, obj: any) => any): {
        [key: string]: any;
    };
};
