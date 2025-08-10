import { Cell } from "../../../data/cell/cells/Cell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
export declare const descriptions: {
    [key: number]: loc_constructor;
};
export declare class LocValueEntry<T> extends Cell<string, T> {
    protected value: string;
    constructor(owner: T);
    exists(): boolean;
    get(): string;
    set(value: string): T;
}
export declare class LocValue<T> extends LocSystem<T> {
    protected locs: {
        [key: string]: LocValueEntry<T>;
    };
    lang(lang: Language): LocValueEntry<T>;
    map(callback: (lang: Language, value: LocValueEntry<T>) => void): void[];
    forEach(callback: (lang: Language, value: LocValueEntry<T>) => void): void;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}
