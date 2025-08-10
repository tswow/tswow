import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { CellSystem, CellSystemTop, LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
export declare class SQLDBCChildStatic<DBC, SQL, O extends SQLDBCEntityStatic<DBC, SQL>> extends CellSystem<O> {
    protected ownerWrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC) => Cell<T, any>): MaybeDBCCellStatic<T, DBC, O>;
    protected ownerWrapSQL<T extends CPrim>(def: T, safegetter: (dbc: SQL) => Cell<T, any>): MaybeSQLCellStatic<T, SQL, O>;
    protected ownerWrapDBCLoc(safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLocStatic<DBC, O>;
    protected ownerWrapSQLLoc(safegetter: (sql: SQL) => LocSystem<any>): MaybeSQLLocStatic<SQL, O>;
}
export declare abstract class SQLDBCEntityStatic<DBC, SQL> extends CellSystemTop {
    private _cachedDBC;
    private _cachedSQL;
    abstract createDBC(mod: string, id: string): this;
    abstract createSQL(mod: string, id: string): this;
    protected abstract findDBC(): DBC;
    protected abstract findSQL(): SQL;
    protected abstract isValidDBC(dbc: DBC): boolean;
    protected abstract isValidSQL(sql: SQL): boolean;
    protected wrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC) => Cell<T, any>): MaybeDBCCellStatic<T, DBC, this>;
    protected wrapSQL<T extends CPrim>(def: T, safegetter: (sql: SQL) => Cell<T, any>): MaybeSQLCellStatic<T, SQL, this>;
    protected wrapDBCLoc(safegetter: (dbc: DBC) => LocSystem<any>): MaybeDBCLocStatic<DBC, this>;
    protected wrapSQLLoc(safegetter: (dbc: SQL) => LocSystem<any>): MaybeSQLLocStatic<SQL, this>;
    getDBC(): DBC;
    getSQL(): SQL;
    hasSQL(): boolean;
    hasDBC(): boolean;
}
export declare class MaybeDBCCellStatic<C extends CPrim, DBC, T extends SQLDBCEntityStatic<DBC, any>> extends Cell<C, T> {
    private defaultValue;
    private safeGetter;
    constructor(owner: T, defaultValue: C, safeGetter: (row: DBC) => Cell<C, any>);
    exists(): boolean;
    get(): C;
    set(value: C): T;
}
export declare class MaybeDBCLocStatic<DBC, T extends SQLDBCEntityStatic<DBC, any>> extends LocSystem<T> {
    private safeGetter;
    constructor(owner: T, safeGetter: (row: DBC) => LocSystem<any>);
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}
export declare class MaybeSQLCellStatic<C extends CPrim, SQL, T extends SQLDBCEntityStatic<any, SQL>> extends Cell<C, T> {
    private defaultValue;
    private safeGetter;
    constructor(owner: T, defaultValue: C, safeGetter: (row: SQL) => Cell<C, any>);
    get(): C;
    set(value: C): T;
}
export declare class MaybeSQLLocStatic<SQL, T extends SQLDBCEntityStatic<any, SQL>> extends LocSystem<T> {
    private safeGetter;
    constructor(owner: T, safeGetter: (row: SQL) => LocSystem<any>);
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}
