import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
export declare class EntityTag extends CellSystemTop {
    readonly ID: number;
    readonly Mod: string;
    readonly Name: string;
    protected fullId(): string;
    constructor(id: number, mod: string, name: string);
    isDeleted(): boolean;
    delete(): void;
    undelete(): void;
}
export declare class EntityTags<T> extends MultiRowSystem<EntityTag, T> {
    protected id: number;
    constructor(owner: T, id: number);
    add(mod: string, name: string): T;
    addUnique(mod: string, name: string): T;
    protected getAllRows(): EntityTag[];
    protected isDeleted(value: EntityTag): boolean;
}
export declare const Tags: {
    add(mod: string, name: string, id: number): void;
    addUnique(mod: string, name: string, id: number): void;
    remove(mod: string, name: string, id: number): void;
};
