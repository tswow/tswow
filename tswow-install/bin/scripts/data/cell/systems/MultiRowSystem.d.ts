import { ObjectifyOptions } from "../serialization/ObjectIteration";
import { CellSystem } from "./CellSystem";
/**
 * System that handles multiple child rows pointing at a parent row
 * For example, multiple SkillLines may belong to a class
 */
export declare abstract class MultiRowSystem<A, T> extends CellSystem<T> {
    protected abstract getAllRows(): A[];
    protected abstract isDeleted(value: A): boolean;
    protected getAllRowsOrCached(): A[];
    get length(): number;
    getIndex(index: number): A;
    get(): A[];
    getDeleted(): A[];
    forEachDeleted(callback: (value: A, index: number) => void): T;
    forEach(callback: (value: A, index: number) => void): T;
    map<T>(callback: (value: A, index: number) => T): T[];
    filter(callback: (value: A, index: number) => boolean): A[];
    objectify(options?: ObjectifyOptions): any;
}
export declare abstract class MultirowSystemCached<A, T> extends MultiRowSystem<A, T> {
    protected cache?: A[];
    protected getAllRowsOrCached(): A[];
    clearCache(): T;
    setCache(cache: A[]): T;
}
