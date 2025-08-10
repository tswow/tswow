import { CellSystem, CellSystemTop } from "../systems/CellSystem";
import { Schema } from "./ObjectIteration";
export type ArgumentType = 'string' | 'boolean' | 'number';
export type CreateArgument = {
    name: string;
    type: ArgumentType;
};
export declare abstract class SystemStore<D, T extends CellSystem<D>> {
    constructor();
    protected abstract template(): T;
    protected abstract loadRaw(args: any[]): T;
    protected abstract createInt(mod: string, id: string, args: any[]): T;
    protected abstract createArguments(): CreateArgument[];
    protected abstract className(): string;
    protected abstract registeredClass(): new (...args: any[]) => T;
    static serializeEdit(args: any[], obj: any): any;
    static serializeCreate(mod: string, id: string, args: any[], obj: any): any;
    static deserialize(json: any): any;
    static template<D, T extends CellSystem<D>>(store: SystemStore<D, T>): T;
    static generateSchemas(): {
        [key: string]: Schema;
    };
    static schema(store: SystemStore<any, any>): Schema;
    static forEach(callback: (key: string, store: SystemStore<any, any>) => void): void;
    static load(className: string, args: any[]): any;
    static create(className: string, mod: string, id: string, args: any[]): void;
}
export declare abstract class SystemStoreTop<T extends CellSystemTop> extends SystemStore<undefined, T> {
}
