import { CellSystem } from "./CellSystem";

/**
 * System that handles multiple child rows pointing at a parent row
 * For example, multiple SkillLines may belong to a class
 */
export abstract class MultiRowSystem<A,T> extends CellSystem<T>{
    protected abstract getAllRows(): A[];
    protected abstract isDeleted(value: A): boolean;

    get length() { return this.get().length; }

    getIndex(index: number) {
        return this.get()[index];
    }

    get() {
        return this.getAllRows().filter(x=>!this.isDeleted(x));
    }

    getDeleted() {
        return this.getAllRows().filter(x=>this.isDeleted(x));
    }

    forEachDeleted(callback: (value: A, index: number) => void) {
        this.getDeleted().forEach(callback);
    }

    forEach(callback: (value: A, index: number)=>void) {
        this.get().forEach(callback);
    }

    map<T>(callback: (value: A, index: number)=>T) {
        return this.get().map(callback);
    }

    filter(callback: (value: A, index: number)=>boolean) {
        return this.get().filter(callback);
    }

    objectify() {
        return this.get().map(x=>{
            let y = x as any;
            return y.objectify && typeof(y.objectify) == 'function'
                ? y.objectify()
                : 'CANT_OBJECTIFY';
        });
    }
}