import { CellSystem, CellSystemTop } from "../systems/CellSystem";
import { Objects, Schema, structSchemas } from "./ObjectIteration";

let stores: {[key: string]: SystemStore<any,any>} = {}

export type ArgumentType = 'string' | 'boolean' | 'number'

export type CreateArgument = {name: string, type: ArgumentType}

export abstract class SystemStore<D,T extends CellSystem<D>> {
    constructor() {
        if(stores[this.className()] != undefined) {
            throw new Error(`Duplicate system store name: ${this.className()}`);
        }
        stores[this.className()] = this;
        this.registeredClass().prototype.__entity_id = this.className();
    }

    protected abstract template(): T;
    protected abstract loadRaw(args: any[]): T;
    protected abstract createInt(mod: string, id: string, args: any[]): T;
    protected abstract createArguments(): CreateArgument[]
    protected abstract className(): string;
    protected abstract registeredClass(): new (...args: any[])=>T

    static serializeEdit(args: any[], obj: any) {
        if(!obj.__entity_id) {
            throw new Error(`Tried to serialize non-entity`);
        }
        let ret : any = {
            type: 'edit',
            class: obj.__entity_id,
            args,
        }
        obj.serialize(ret,'data');
        return ret;
    }

    static serializeCreate(mod: string, id: string, args: any[], obj: any) {
        if(!obj.__entity_id) {
            throw new Error(`Tried to serialize non-entity`);
        }
        let ret : any = {
            type: 'create',
            class: obj.__entity_id,
            mod,
            id,
            args,
        }
        obj.serialize(ret,'data');
        return ret;
    }

    static deserialize(json: any) {
        let cls = stores[json.class]
        let obj: any;

        switch(json.type) {
            case 'edit': {
                obj = cls.loadRaw(json.args);
                break;
            }
            case 'create': {
                obj = cls.createInt(json.mod,json.id,json.args||[]);
                break;
            }
            default: {
                throw new Error(`Invalid json type: ${json.type}`);
            }
        }
        obj.deserialize(json.data);
        return obj;
    }

    static template<D, T extends CellSystem<D>>(store: SystemStore<D,T>) {
        return store.template();
    }

    static generateSchemas() {
        let schemas: {[key: string]: Schema} = {}
        this.forEach((name,store)=>{
            let schema = this.schema(store)
            if(schemas[name] !== undefined) {
                throw new Error(`Schema name clash: ${name}`);
            }
            schemas[name] = schema;
        });

        for(let name in structSchemas) {
            if(schemas[name] !== undefined) {
                throw new Error(`Schema name clash: ${name}`);
            }
            schemas[name] = structSchemas[name];
        }
        return schemas;
    }

    static schema(store: SystemStore<any,any>) {
        return Objects.generateSchema(store.template());
    }

    static forEach(callback: (key: string, store: SystemStore<any,any>)=>void) {
        for(let key in stores) {
            callback(key,stores[key]);
        }
    }

    static load(className: string, args: any[]) {
        return stores[className].loadRaw(args);
    }

    static create(className: string, mod: string, id: string, args: any[]) {
        stores[className].createInt(mod,id,args);
    }
}

export abstract class SystemStoreTop<T extends CellSystemTop> extends SystemStore<undefined,T> {}