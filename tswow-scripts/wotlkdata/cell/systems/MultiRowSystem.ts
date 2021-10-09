import { CellSystem } from "./CellSystem";

/**
 * System that handles multiple child rows pointing at a parent row
 * For example, multiple SkillLines may belong to a class
 */
export abstract class MultiRowSystem<A,T> extends CellSystem<T>{
    protected abstract getAllRows(): A[];
    protected abstract isDeleted(value: A): boolean;

    protected getAllRowsOrCached(): A[] {
        return this.getAllRows();
    }

    get length() { return this.get().length; }

    getIndex(index: number) {
        return this.get()[index];
    }

    get() {
        return this.getAllRowsOrCached().filter(x=>!this.isDeleted(x));
    }

    getDeleted() {
        return this.getAllRowsOrCached().filter(x=>this.isDeleted(x));
    }

    forEachDeleted(callback: (value: A, index: number) => void) {
        this.getDeleted().forEach(callback);
        return this.owner;
    }

    forEach(callback: (value: A, index: number)=>void) {
        this.get().forEach(callback);
        return this.owner;
    }

    map<T>(callback: (value: A, index: number)=>T) {
        return this.get().map(callback);
    }

    filter(callback: (value: A, index: number)=>boolean) {
        return this.get().filter(callback);
    }

    objectify(): any {
        return this.get().map(x=>{
            let y = x as any;
            return y.objectify && typeof(y.objectify) == 'function'
                ? y.objectify()
                : 'CANT_OBJECTIFY';
        });
    }
}

export abstract class MultirowSystemCached<A,T> extends MultiRowSystem<A,T> {
    protected cache?: A[] = undefined;
    protected getAllRowsOrCached(): A[] {
        if(this.cache!==undefined) return this.cache;
        this.cache = this.getAllRows();
        return this.cache;
    }

    clearCache() {
        this.cache = undefined;
        return this.owner;
    }

    setCache(cache: A[]) {
        this.cache = cache;
        return this.owner;
    }
}