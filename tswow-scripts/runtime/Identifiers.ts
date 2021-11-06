import { BuildType, BUILD_TYPES } from "../util/BuildType";
import { Dataset } from "./Dataset";
import { Module, ModuleEndpoint } from "./Modules";
import { NodeConfig } from "./NodeConfig";
import { Realm } from "./Realm";

export type IdentifierType =
      'DATASET'
    | 'MODULE'
    | 'REALM'
    | 'KEYWORD'
    | 'PATCHLETTER'
    | 'NONE'
    | 'BUILT_TYPE'
    | 'UNDEFINED'
    | 'OPTION'

export type CollectMode =
      'MATCH_ANY'
    | 'ALLOW_NONE'

export type CollectModeMatchAll = CollectMode | 'MATCH_ALL'

export class Identifier {
    protected payload: any;
    readonly type: IdentifierType

    constructor(type: IdentifierType, payload: any) {
        this.type = type;
        this.payload = payload;
    }

    asDataset() {
        return this.payload as Dataset
    }

    asOption() {
        return this.payload as string
    }

    asModule() {
        return this.payload as ModuleEndpoint
    }

    asRealm() {
        return this.payload as Realm
    }

    asBuildType() {
        return this.payload as BuildType
    }

    static assertUnused(identifier: string, name: string) {
        if(identifier === undefined) {
            throw new Error(`Missing required parameter: ${name}`);
        }
        let v = this.resolve(identifier);
        if(v.type !== 'NONE') {
            throw new Error(
                  `Identifier ${identifier}`
                + ` already refers to a ${v.type}`
            )
        }
        return identifier;
    }

    static resolve(identifier: string, expectedType?: IdentifierType) {
        if(identifier === undefined) {
            if(expectedType) {
                throw new Error(`Expected a ${expectedType}, but got undefined`)
            }
            return new Identifier('UNDEFINED',undefined);
        }
        if(identifier.startsWith('--')) {
            if(expectedType && expectedType !== 'KEYWORD') {
                throw new Error(`Expected a ${expectedType}, but ${identifier} is an ARGUMENT`);
            }
            return new Identifier('KEYWORD',identifier);
        }
        identifier = identifier.toLowerCase();
        const keywords = [
              /all/,/modules/,/datasets/,/livescript/,/realms/
            , /datascripts/,/livescripts/,/addons/,/bin/
            , /release/,/relwithdebinfo/,/debug/
        ]
        for(const keyword of keywords) {
            if(identifier.match(keyword) != null) {
                if(expectedType && expectedType !== 'KEYWORD') {
                    throw new Error(`Expected a ${expectedType}, but ${identifier} is a KEYWORD`)
                }
                return new Identifier('KEYWORD',keyword)
            }
        }

        const all: [Identifier,string][] = []
        const modules = Module.endpoints().find(x=>x.fullName === identifier)
        // multiple modules are impossible
        if(modules !== undefined) {
            all.push([
                  new Identifier('MODULE',modules)
                , `Module:${modules.fullName}`
            ])
        }

        Realm.all()
            .filter(x=>x.fullName === identifier)
            .forEach(x=>all.push(
                [new Identifier('REALM',x),`Realm:${x.path.get()}`]
            ));

        Dataset.all()
            .filter(x=>x.fullName === identifier)
            .forEach(x=>all.push(
                [new Identifier('DATASET',x),`Dataset:${x.path.get()}`]
            ));

        if(all.length > 1) {
            throw new Error(
                  `Identifier "${identifier}"`
                + ` refers to multiple entities:\n\n`
                + all.map(x=>x[1]).join('\n') + '\n'
            )
        }

        if(all.length === 0) {
            if(expectedType && expectedType !== 'NONE') {
                throw new Error(
                      `Expected ${identifier} to be a ${expectedType},`
                    + ` but it's not an existing identifier.`
                )
            }
            return new Identifier('NONE',undefined);
        }

        if(expectedType && all[0][0].type !== expectedType) {
            throw new Error(
                  `Expected ${identifier} to be a ${expectedType}`
                + ` but it's a ${all[0][0]}`
            )
        }
        return all[0][0]
    }

    static isModule(identifier: string) {
        return this.resolve(identifier).type === 'MODULE'
    }

    static isDataset(identifier: string) {
        return this.resolve(identifier).type === 'DATASET'
    }

    static isRealm(identifier: string) {
        return this.resolve(identifier).type === 'REALM'
    }

    private static find(identifiers: string[], expectedType: IdentifierType, mode: CollectModeMatchAll, def?: string) {
        if(mode === 'MATCH_ALL' && def !== undefined) {
            throw new Error(
                  `Internal error: Tried finding ${expectedType} with MATCH_ALL`
                + ` but supplied default argument ${def}. This does not make sense.`
            )
        }
        let invalids: {[key: string]: IdentifierType} = {}
        let valids: Identifier[] = []
        identifiers.forEach(c=>{
            let v = this.resolve(c);
            if(v.type === expectedType) {
                valids.push(v);
            } else {
                invalids[c] = v.type;
            }
        })

        if(mode === 'MATCH_ALL' && valids.length !== identifiers.length) {
            throw new Error(
                  `Expected ${identifiers.join()} to all be ${expectedType},`
                + ` but the following mappings don't conform:\n`
                + ` ${Object.entries(invalids).map(([k,v])=>`${k}: ${v}`).join('\n')}\n\n`
            )
        }

        if(valids.length === 0 && def !== undefined) {
            let v = this.resolve(def);
            if(v.type !== expectedType) {
                throw new Error(
                      `Expected default value '${def}' to be ${expectedType},`
                    + ` but it's ${v.type}`
                )
            }
            valids.push(v);
        }

        if(mode === 'MATCH_ANY' && valids.length === 0) {
            throw new Error(
                  `Expected any of ${identifiers.join()} to be ${expectedType},`
                + ` but none conform:\n`
                + ` ${Object.entries(invalids).map(([k,v])=>`${k}: ${v}`).join('\n')}\n\n`
            )
        }

        return valids;
    }

    static getBuildType(identifiers: string[], def?: BuildType): BuildType {
        let buildTypes = identifiers.filter(x=>BUILD_TYPES.includes(x as any))
        if(buildTypes.length === 0) {
            if(def === undefined) {
                throw new Error(
                      `No build type provided,`
                    + ` expected at least one:: ${identifiers}`
                )
            } else {
                return def;
            }
        }

        if(buildTypes.length > 1) {
            throw new Error(
                `Multiple build types specified: ${buildTypes}`
            )
        }

        return buildTypes[0] as BuildType
    }

    static getModules(identifiers: string[], mode: CollectMode, def?: string): ModuleEndpoint[];
    static getModules(identifiers: string[], mode: CollectModeMatchAll): ModuleEndpoint[];
    static getModules(identifiers: string[], mode: CollectModeMatchAll, def?: string): ModuleEndpoint[] {
        return this.find(identifiers,'MODULE',mode,def)
            .map(x=>x.asModule())
    }

    static getModulesOrAll(identifiers: string[]) {
        let modules = this.getModules(identifiers,'ALLOW_NONE');
        return modules.length > 0 ? modules : Module.endpoints()
    }

    static getRealms(identifiers: string[], mode: CollectMode, def?: string): Realm[];
    static getRealms(identifiers: string[], mode: CollectModeMatchAll): Realm[];
    static getRealms(identifiers: string[], mode: CollectModeMatchAll, def?: string): Realm[] {
        return this.find(identifiers,'REALM',mode,def)
            .map(x=>x.asRealm())
    }

    static getDatasets(identifiers: string[], mode: CollectMode, def?: string): Dataset[];
    static getDatasets(identifiers: string[], mode: CollectModeMatchAll): Dataset[];
    static getDatasets(identifiers: string[], mode: CollectModeMatchAll, def?: string): Dataset[] {
        return this.find(identifiers,'DATASET',mode,def)
            .map(x=>x.asDataset())
    }

    static getDatasetsOrDefault(identifiers: string[], collectMode: CollectModeMatchAll) {
        if(identifiers.length === 0) return [this.getDataset(NodeConfig.DefaultDataset)]
        else return this.getDatasets(identifiers,collectMode);
    }

    static getModule(identifier: string) {
        return this.resolve(identifier,'MODULE').asModule()
    }

    static getRealm(identifier: string) {
        return this.resolve(identifier,'REALM').asRealm()
    }

    static getDataset(identifier: string) {
        return this.resolve(identifier,'DATASET').asDataset()
    }
}