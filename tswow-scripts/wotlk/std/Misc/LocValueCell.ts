import { Cell } from "../../../data/cell/cells/Cell";
import { DummyCell } from "../../../data/cell/cells/DummyCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language, Languages } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";

export const descriptions: {[key: number]: /*description:*/ loc_constructor}= {}

export class LocValueEntry<T> extends Cell<string,T> {
    protected value: string;

    constructor(owner: T) {
        super(owner);
    }

    exists() {
        return this.value !== undefined;
    }
    get(): string {
        return this.value || "";
    }

    set(value: string) {
        this.value = value;
        return this.owner;
    }
}

export class LocValue<T> extends LocSystem<T> {
    
    protected locs: {[key: string]: LocValueEntry<T>} = {}
    lang(lang: Language): LocValueEntry<T> {
        return (this.locs[lang] || (this.locs[lang] = new LocValueEntry<T>(this.owner)))
    }

    map(callback: (lang: Language, value: LocValueEntry<T>) => void) {
        return Languages.map(x=> callback(x,this.lang(x))).concat([callback('enUS' as Language,this.lang('enGB'))])
    }

    forEach(callback: (lang: Language, value: LocValueEntry<T>) => void) {
        Languages.forEach(x=>{
            callback(x,this.lang(x));
        })
        callback('enUS' as Language, this.lang('enGB'));
    }

    get mask(): Cell<number, T> {
        return new DummyCell(this.owner,0);
    }

    set(con: loc_constructor): T {
        for(let key in con)
        {
            this.lang(key as Language).set(con[key]);
        }
        return this.owner;
    }
}