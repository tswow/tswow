import { Cell } from "../../../../data/cell/cells/Cell";
import { Edit } from "../../../../data/luaxml/TextFile";
export declare class LuaStringProperty<T> extends Cell<string, T> {
    protected edit: Edit;
    constructor(owner: T, edit: Edit);
    get(): string;
    set(value: string): T;
}
export declare class LuaNumberProperty<T> extends Cell<number, T> {
    protected edit: Edit;
    constructor(owner: T, edit: Edit);
    get(): number;
    set(value: number): T;
}
