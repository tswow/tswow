/**
 * Provides basic array operations for registries
 */
export declare abstract class RegistryBase<E, R> {
    protected abstract getAll(): E[];
    protected abstract Entity(r: R): E;
    abstract ID(e: E): number;
    protected nullID: () => number;
    Exists(entry: number): boolean;
    filter(callback: (entity: E, index: number, array: E[]) => any): E[];
    find(callback: (entity: E, index: number, array: E[]) => boolean | number): E;
    map<T>(callback: (entity: E, index: number, array: E[]) => T): T[];
    reduce<T>(callback: (last: T, cur: E, index: number, array: E[]) => T, initial: T): T;
    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[]) => T, initial: T): T;
    forEach(callback: (entity: E, index: number, array: E[]) => void): void;
}
