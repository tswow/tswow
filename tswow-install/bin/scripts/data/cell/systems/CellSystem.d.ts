import { Language } from '../../dbc/Localization';
import { loc_constructor } from '../../primitives';
import { Cell, CellUnlocker, CellWrapper, CPrim } from '../cells/Cell';
import { CellArray, CellArrayWrapper, CellIndexWrapper } from '../cells/CellArray';
import { CellReadOnly, CellWrapperReadOnly } from '../cells/CellReadOnly';
import { CellWrapperExists, PendingCell } from '../cells/PendingCell';
import { ObjectifyOptions } from '../serialization/ObjectIteration';
export declare class CellSystem<T> {
    static cloneFrom(tar: any, src: any): void;
    protected owner: T;
    protected uniqueRefs: boolean;
    constructor(owner: T);
    protected get isSubsystem(): boolean;
    static isSystem(candidate: any): boolean;
    protected wrapReadOnly<W extends CPrim>(cell: CellReadOnly<W, any>): CellWrapperReadOnly<W, this>;
    protected wrap<W extends CPrim>(cell: Cell<W, any>): CellWrapper<W, this>;
    protected wrapArray<W extends CPrim>(cell: CellArray<W, any>): CellArrayWrapper<W, this>;
    protected ownerWrapArray<W extends CPrim>(cell: CellArray<W, any>): CellArrayWrapper<W, T>;
    protected ownerWrap<G extends CPrim>(cell: Cell<G, any>): CellWrapper<G, T>;
    protected ownerWrapExists<G extends CPrim>(cell: Cell<G, any>): CellWrapperExists<G, T>;
    protected ownerWrapLoc(loc: LocSystem<any>): WrappedLoc<T>;
    protected wrapLoc(loc: LocSystem<any>): WrappedLoc<this>;
    protected wrapIndex<W extends CPrim>(cell: CellArray<W, any>, index: number): CellIndexWrapper<W, this>;
    protected ownerWrapIndex<D extends CPrim>(cell: CellArray<D, any>, index: number): CellIndexWrapper<D, T>;
    protected wrapExists<D extends CPrim>(cell: Cell<D, any>): CellWrapperExists<D, this>;
    protected wrapMulticast<D extends CPrim>(cells: Cell<D, any>[]): CellWrapper<D, this>;
    protected ownerWrapLocMulticast(cells: LocSystem<any>[]): LocSystem<T>;
    protected wrapLocMulticast(cells: LocSystem<any>[]): LocSystem<this>;
    protected wrapUnlock(cell: CellReadOnly<number, any>): CellUnlocker<number, this>;
    protected deserialize(json: any): void;
    protected serialize(obj: any, key: string): void;
    stringify(options?: ObjectifyOptions): string;
    objectify(options?: ObjectifyOptions): any;
}
export declare class CellSystemTop extends CellSystem<undefined> {
    constructor();
}
export declare abstract class LocSystem<T> extends CellSystem<T> {
    abstract lang(lang: Language): Cell<string, T> & PendingCell;
    abstract get mask(): Cell<number, T>;
    abstract set(con: loc_constructor): T;
    get isLocalization(): boolean;
    get enGB(): Cell<string, T> & PendingCell;
    get koKR(): Cell<string, T> & PendingCell;
    get frFR(): Cell<string, T> & PendingCell;
    get deDE(): Cell<string, T> & PendingCell;
    get enCN(): Cell<string, T> & PendingCell;
    get zhCN(): Cell<string, T> & PendingCell;
    get enTW(): Cell<string, T> & PendingCell;
    get zhTW(): Cell<string, T> & PendingCell;
    get esES(): Cell<string, T> & PendingCell;
    get esMX(): Cell<string, T> & PendingCell;
    get ruRU(): Cell<string, T> & PendingCell;
    get ptPT(): Cell<string, T> & PendingCell;
    get ptBR(): Cell<string, T> & PendingCell;
    get itIT(): Cell<string, T> & PendingCell;
    get Unk(): Cell<string, T> & PendingCell;
    get Unk2(): Cell<string, T> & PendingCell;
    clear(): T;
}
export declare class WrappedLoc<T> extends LocSystem<T> {
    private wrapped;
    constructor(owner: T, wrapped: LocSystem<T>);
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
    objectify(options?: ObjectifyOptions): any;
    stringify(options?: ObjectifyOptions): string;
}
export declare class MulticastLocCell<T> extends LocSystem<T> {
    protected cells: LocSystem<any>[];
    constructor(owner: T, cells: LocSystem<any>[]);
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}
