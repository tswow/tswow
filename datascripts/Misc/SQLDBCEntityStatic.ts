import { Cell, CPrim } from "wotlkdata/cell/cells/Cell";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { CellSystem, CellSystemTop, LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";

export class SQLDBCChildStatic<DBC,SQL,O extends SQLDBCEntityStatic<DBC,SQL>> extends CellSystem<O> {
    protected ownerWrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC)=>Cell<T,any>): MaybeDBCCellStatic<T,DBC,O> {
        return new MaybeDBCCellStatic<T,DBC,O>(this.owner, def, safegetter);
    }

    protected ownerWrapSQL<T extends CPrim>(def: T, safegetter: (dbc: SQL)=>Cell<T,any>): MaybeSQLCellStatic<T,SQL,O> {
        return new MaybeSQLCellStatic<T,SQL,O>(this.owner, def, safegetter);
    }

    protected ownerWrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLocStatic<DBC,O> {
        return new MaybeDBCLocStatic<DBC,O>(this.owner, safegetter);
    }

    protected ownerWrapSQLLoc(safegetter: (sql: SQL)=>LocSystem<any>): MaybeSQLLocStatic<SQL,O> {
        return new MaybeSQLLocStatic<SQL,O>(this.owner, safegetter);
    }
}

export abstract class SQLDBCEntityStatic<DBC,SQL> extends CellSystemTop {
    private _cachedDBC: DBC | undefined;
    private _cachedSQL: SQL | undefined;

    abstract CreateDBC(mod: string, id: string): this;
    abstract CreateSQL(mod: string, id: string): this;
    protected abstract findDBC(): DBC;
    protected abstract findSQL(): SQL;
    protected abstract isValidDBC(dbc: DBC): boolean;
    protected abstract isValidSQL(sql: SQL): boolean;

    protected wrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC)=>Cell<T,any>): MaybeDBCCellStatic<T,DBC,this> {
        return new MaybeDBCCellStatic<T,DBC,this>(this, def, safegetter);
    }

    protected wrapSQL<T extends CPrim>(def: T, safegetter: (sql: SQL)=>Cell<T,any>): MaybeSQLCellStatic<T,SQL,this> {
        return new MaybeSQLCellStatic<T,SQL,this>(this, def, safegetter);
    }

    protected wrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLocStatic<DBC,this> {
        return new MaybeDBCLocStatic<DBC,this>(this, safegetter);
    }

    protected wrapSQLLoc(safegetter: (dbc: SQL)=>LocSystem<any>): MaybeSQLLocStatic<SQL,this> {
        return new MaybeSQLLocStatic<SQL,this>(this, safegetter);
    }

    GetDBC() {
        if(this._cachedDBC && this.isValidDBC(this._cachedDBC)) {
            return this._cachedDBC;
        } else {
            return this._cachedDBC = this.findDBC();
        }
    }

    GetSQL() {
        if(this._cachedSQL && this.isValidSQL(this._cachedSQL)) {
            return this._cachedSQL;
        } else {
            return this._cachedSQL = this.findSQL();
        }
    }

    HasSQL() { return this.GetDBC() !== undefined; }
    HasDBC() { return this.GetSQL() !== undefined; }
}

export class MaybeDBCCellStatic<C extends CPrim, DBC, T extends SQLDBCEntityStatic<DBC,any>> extends Cell<C,T>{
    private defaultValue: C;
    private safeGetter: (row: DBC)=>Cell<C,any>

    constructor(owner: T, defaultValue: C, safeGetter: (row: DBC)=>Cell<C,any>) {
        super(owner);
        this.defaultValue = defaultValue;
        this.safeGetter = safeGetter;
    }

    exists() { return this.owner.HasDBC(); }

    get(): C {
        if(!this.owner.HasDBC()) {
            return this.defaultValue;
        } else {
            return this.safeGetter(this.owner.GetDBC()).get();
        }
    }

    set(value: C): T {
        if(!this.owner.HasDBC()) {
            throw new Error(`Missing DBC row, please call "CreateDBC" manually`)
        }
        this.safeGetter(this.owner.GetDBC()).set(value);
        return this.owner;
    }
}

export class MaybeDBCLocStatic<DBC,T extends SQLDBCEntityStatic<DBC,any>> extends LocSystem<T> {
    private safeGetter: (row: DBC)=>LocSystem<any>;
    constructor(owner: T, safeGetter: (row: DBC)=>LocSystem<any>) {
        super(owner);
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, T> & PendingCell {
        return new MaybeDBCCellStatic<string,DBC,T>(
               this.owner
            , ''
            ,(dbc)=>this.safeGetter(dbc).lang(lang)
        )
    }

    get mask(): Cell<number, T> {
        return new MaybeDBCCellStatic<number,DBC,T>(
              this.owner
            , 0
            , (dbc)=>this.safeGetter(dbc).mask
        )
    }

    set(con: loc_constructor): T {
        if(!this.owner.HasDBC()) {
            throw new Error(`Missing DBC row, please call "CreateDBC" manually`)
        }
        this.safeGetter(this.owner.GetDBC()).set(con);
        return this.owner;
    }
}

export class MaybeSQLCellStatic<C extends CPrim, SQL, T extends SQLDBCEntityStatic<any,SQL>> extends Cell<C,T>{
    private defaultValue: C;
    private safeGetter: (sql: SQL)=>Cell<C,any>

    constructor(owner: T, defaultValue: C, safeGetter: (row: SQL)=>Cell<C,any>) {
        super(owner);
        this.defaultValue = defaultValue;
        this.safeGetter = safeGetter;
    }

    get(): C {
        if(!this.owner.HasSQL()) {
            return this.defaultValue;
        } else {
            return this.safeGetter(this.owner.GetSQL()).get();
        }
    }

    set(value: C): T {
        if(!this.owner.HasSQL()) {
            throw new Error(`Missing SQL row: Please call "CreateSQL" manually`)
        }
        this.safeGetter(this.owner.GetSQL()).set(value);
        return this.owner;
    }
}

export class MaybeSQLLocStatic<SQL,T extends SQLDBCEntityStatic<any,SQL>> extends LocSystem<T> {
    private safeGetter: (row: SQL)=>LocSystem<any>;
    constructor(owner: T, safeGetter: (row: SQL)=>LocSystem<any>) {
        super(owner);
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, T> & PendingCell {
        return new MaybeDBCCellStatic<string,SQL,T>(
               this.owner
            , ''
            ,(sql)=>this.safeGetter(sql).lang(lang)
        )
    }

    get mask(): Cell<number, T> {
        return new MaybeDBCCellStatic<number,SQL,T>(
              this.owner
            , 0
            , (sql)=>this.safeGetter(sql).mask
        )
    }

    set(con: loc_constructor): T {
        if(!this.owner.HasSQL()) {
            throw new Error(`Missing SQL row: Please call "CreatSQL" manually`)
        }
        this.safeGetter(this.owner.GetSQL()).set(con);
        return this.owner;
    }
}