import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { CellSystem, CellSystemTop, LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
export declare class SQLDBCChild<O, DBC, SQL, T extends SQLDBCEntity<DBC, SQL>> extends CellSystem<O> {
    private container;
    constructor(owner: O, container: T);
    protected ownerWrapDBC<C extends CPrim>(def: C, safegetter: (dbc: DBC) => Cell<C, any>): MaybeDBCCell<O, C, DBC, T>;
    protected ownerWrapSQL<C extends CPrim>(def: C, safegetter: (dbc: SQL) => Cell<C, any>): MaybeSQLCell<O, C, SQL, T>;
    protected ownerWrapDBCLoc(safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLoc<O, DBC, T>;
    protected ownerWrapSQLLoc(safegetter: (sql: SQL) => LocSystem<any>): MaybeSQLLoc<O, SQL, T>;
}
export interface IMaybeSQLEntity<SQL> {
    hasSQL(): boolean;
    getSQL(): SQL;
    getOrCreateSQL(): SQL;
}
export interface IMaybeDBCEntity<DBC> {
    hasDBC(): boolean;
    getDBC(): DBC;
    getOrCreateDBC(): DBC;
}
export declare class MaybeSQLEntityPublic<T, SQL> extends CellSystem<T> implements IMaybeSQLEntity<SQL> {
    private container;
    constructor(owner: T, container: MaybeSQLEntity<T, SQL>);
    hasSQL(): boolean;
    getSQL(): SQL;
    getOrCreateSQL(): SQL;
}
export declare abstract class MaybeSQLEntity<T, SQL> extends CellSystem<T> {
    private _cachedSQL;
    protected abstract createSQL(): SQL;
    protected abstract findSQL(): SQL;
    protected abstract isValidSQL(sql: SQL): boolean;
    protected toPublic(): MaybeSQLEntityPublic<T, SQL>;
    protected wrapSQL<C extends CPrim>(def: C, safegetter: (sql: SQL) => Cell<C, any>): MaybeSQLCell<T, C, SQL, MaybeSQLEntityPublic<T, SQL>>;
    protected wrapSQLLoc(safegetter: (dbc: SQL) => LocSystem<any>): MaybeSQLLoc<T, SQL, MaybeSQLEntityPublic<T, SQL>>;
    static getSQL<T, SQL>(entity: MaybeSQLEntity<T, SQL>): SQL;
    static getOrCreateSQL<T, SQL>(entity: MaybeSQLEntity<T, SQL>): SQL;
    static hasSQL<T, SQL>(entity: MaybeSQLEntity<T, SQL>): boolean;
    create(): T;
    getSQL(): SQL;
    exists(): boolean;
}
export declare abstract class MaybeDBCEntity<T, DBC> extends CellSystem<T> implements IMaybeDBCEntity<DBC> {
    private _cachedDBC;
    protected abstract createDBC(): DBC;
    protected abstract findDBC(): DBC;
    protected abstract isValidDBC(dbc: DBC): boolean;
    protected wrapDBC<C extends CPrim>(def: C, safegetter: (dbc: DBC) => Cell<C, any>): MaybeDBCCell<T, C, DBC, this>;
    protected wrapDBCLoc(safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLoc<T, DBC, this>;
    getDBC(): DBC;
    getOrCreateDBC(): DBC;
    hasDBC(): boolean;
    exists(): boolean;
    create(): T;
    static wrapDBC<C extends CPrim, T, DBC, O extends MaybeDBCEntity<T, DBC>>(owner: O, def: C, safegetter: (dbc: DBC) => Cell<C, any>): MaybeDBCCell<T, C, DBC, O>;
    static wrapDBCLoc<T, DBC, O extends MaybeDBCEntity<T, DBC>>(owner: O, safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLoc<T, DBC, O>;
}
export declare abstract class SQLDBCEntity<DBC, SQL> extends CellSystemTop {
    private _cachedDBC;
    private _cachedSQL;
    protected abstract createDBC(): DBC;
    protected abstract createSQL(): SQL;
    protected abstract findDBC(): DBC;
    protected abstract findSQL(): SQL;
    protected abstract isValidDBC(dbc: DBC): boolean;
    protected abstract isValidSQL(sql: SQL): boolean;
    protected wrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC) => Cell<T, any>): MaybeDBCCell<this, T, DBC, this>;
    protected wrapSQL<T extends CPrim>(def: T, safegetter: (sql: SQL) => Cell<T, any>): MaybeSQLCell<this, T, SQL, this>;
    protected wrapDBCLoc(safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLoc<this, DBC, this>;
    protected wrapSQLLoc(safegetter: (dbc: SQL) => LocSystem<any>): MaybeSQLLoc<this, SQL, this>;
    getDBC(): DBC;
    getSQL(): SQL;
    getOrCreateDBC(): DBC;
    getOrCreateSQL(): SQL;
    hasSQL(): boolean;
    hasDBC(): boolean;
}
export declare class MaybeDBCCell<O, C extends CPrim, DBC, T extends IMaybeDBCEntity<DBC>> extends Cell<C, O> {
    private defaultValue;
    private container;
    private safeGetter;
    constructor(owner: O, container: T, defaultValue: C, safeGetter: (row: DBC) => Cell<C, any>);
    exists(): boolean;
    get(): C;
    set(value: C): O;
}
export declare class MaybeDBCLoc<O, DBC, T extends IMaybeDBCEntity<DBC>> extends LocSystem<O> {
    private safeGetter;
    private container;
    constructor(owner: O, container: T, safeGetter: (row: DBC) => LocSystem<any>);
    lang(lang: Language): Cell<string, O> & PendingCell;
    get mask(): Cell<number, O>;
    set(con: loc_constructor): O;
}
export declare class MaybeSQLCell<O, C extends CPrim, SQL, T extends IMaybeSQLEntity<SQL>> extends Cell<C, O> {
    private defaultValue;
    private container;
    private safeGetter;
    constructor(owner: O, container: T, defaultValue: C, safeGetter: (row: SQL) => Cell<C, any>);
    exists(): boolean;
    get(): C;
    set(value: C): O;
}
export declare class MaybeSQLLoc<O, SQL, T extends IMaybeSQLEntity<SQL>> extends LocSystem<O> {
    private safeGetter;
    private container;
    constructor(owner: O, container: T, safeGetter: (row: SQL) => LocSystem<any>);
    lang(lang: Language): Cell<string, O> & PendingCell;
    get mask(): Cell<number, O>;
    set(con: loc_constructor): O;
}
