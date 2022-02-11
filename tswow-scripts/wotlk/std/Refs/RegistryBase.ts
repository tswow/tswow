/**
 * Provides basic array operations for registries
 */
export abstract class RegistryBase<E,R> {
    protected abstract getAll(): E[];
    protected abstract Entity(r: R): E;
    abstract ID(e: E): number;
    protected nullID = () => 0;

    Exists(entry: number) { return entry != this.nullID(); }

    filter(callback: (entity: E, index: number, array: E[])=>any) {
        return this.getAll().filter(callback);
    }

    find(callback: (entity: E, index: number, array: E[])=>boolean|number) {
        return this.getAll().find(callback);
    }

    map<T>(callback: (entity: E, index: number, array: E[])=>T) {
        return this.getAll().map(callback);
    }

    reduce<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.getAll().reduce(callback,initial);
    }

    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.getAll().reduceRight(callback,initial);
    }

    forEach(callback: (entity: E, index: number, array: E[])=>void) {
        return this.getAll().forEach(callback);
    }
}