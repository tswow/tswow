import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";

/**
 * Used to track what type an identifier refers to
 * - modules
 * - realms
 * - datasets
 */
export namespace Identifiers {
    export type Identifier = 'dataset'|'module'|'realm'|'none'

    export function assertUnused(identifier: string) {
        let prev = getType(identifier);

        if(identifier.includes(' ')) {
            throw new Error(
                  `The identifier "${identifier}" contains spaces`
                + `, please use a name without spaces.`
            )
        }


        if(prev!='none') {
            throw new Error(`${identifier} already refers to a ${prev}`);
        }
    }

    export function getType(identifier: string): Identifier {
        let cur: Identifier = 'none';
        let all: Identifier[] = [];

        if(wfs.exists(ipaths.moduleRoot(identifier))) {
            cur = 'module';
            all.push(cur);
        }

        if(wfs.exists(ipaths.datasetRoot(identifier))) {
            cur = 'dataset';
            all.push(cur);
        }

        if(wfs.exists(ipaths.realmDir(identifier))) {
            cur = 'realm';
            all.push(cur);
        }

        if(all.length>1) {
            throw new Error(
                `Identifier ${identifier} can refer to a `
                +`${all.join('or a')}. Please rename your folders manually.`);
        }

        return cur;
    }

    /**
     * Checks that at least one of the provided arguments is a valid instance of type
     * @param type 
     * @param identifiers 
     */
    export function assertExists(type: Identifier, identifiers: string[]) {
        let res = getTypes(type, identifiers);
        if(res.length===0) {
            throw new Error(`No ${type} in ${identifiers.join(',')}`);
        }
        return res;
    }

    /**
     * Asserts all arguments are valid instances of type
     * , and that |identifiers|>0
     * 
     * @param type 
     * @param identifiers 
     */
    export function assertTypeNoEmpty(type: Identifier, identifiers: string[]) {
        if(identifiers.length===0) {
            throw new Error(`Requires at least one ${type}, but received 0`);
        }
        return assertType(type,identifiers);
    }

    /**
     * Asserts all arguments, if any, are valid instances of type, 
     * then returns the identifiers again
     * 
     * @param type 
     * @param identifiers 
     */
    export function assertType(type: Identifier, identifiers: string[]) {
        let offending = identifiers.filter(x=>getType(x)!=type);
        if(offending.length!=0) {
            throw new Error(`${offending.join(',')} are not valid ${type}s`)
        }
        return identifiers;
    }

    /**
     * Returns all names in identifiers that are instances of type
     * @param type 
     * @param identifiers 
     */
    export function getTypes(type: Identifier, identifiers: string[]) {
        return identifiers.filter(x=>getType(x)==type);
    }
}