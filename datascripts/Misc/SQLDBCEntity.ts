import { Cell, CPrim } from "wotlkdata/cell/cells/Cell";
import { CellSystem, CellSystemTop, LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";

export class SQLDBCChild<DBC,SQL,O extends SQLDBCEntity<DBC,SQL>> extends CellSystem<O> {
    protected ownerWrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC)=>Cell<T,any>): MaybeDBCCell<T,DBC,O> {
        return new MaybeDBCCell<T,DBC,O>(this.owner, def, safegetter);
    }

    protected ownerWrapSQL<T extends CPrim>(def: T, safegetter: (dbc: SQL)=>Cell<T,any>): MaybeSQLCell<T,SQL,O> {
        return new MaybeSQLCell<T,SQL,O>(this.owner, def, safegetter);
    }

    protected ownerWrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLoc<DBC,O> {
        return new MaybeDBCLoc<DBC,O>(this.owner, safegetter);
    }

    protected ownerWrapSQLLoc(safegetter: (sql: SQL)=>LocSystem<any>): MaybeSQLLoc<SQL,O> {
        return new MaybeSQLLoc<SQL,O>(this.owner, safegetter);
    }
}

export abstract class SQLDBCEntity<DBC,SQL> extends CellSystemTop {
    private _cachedDBC: DBC | undefined;
    private _cachedSQL: SQL | undefined;

    protected abstract createDBC(): DBC;
    protected abstract createSQL(): SQL;
    protected abstract findDBC(): DBC;
    protected abstract findSQL(): SQL;
    protected abstract isValidDBC(dbc: DBC): boolean;
    protected abstract isValidSQL(sql: SQL): boolean;

    protected wrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC)=>Cell<T,any>): MaybeDBCCell<T,DBC,this> {
        return new MaybeDBCCell<T,DBC,this>(this, def, safegetter);
    }

    protected wrapSQL<T extends CPrim>(def: T, safegetter: (sql: SQL)=>Cell<T,any>): MaybeSQLCell<T,SQL,this> {
        return new MaybeSQLCell<T,SQL,this>(this, def, safegetter);
    }

    protected wrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLoc<DBC,this> {
        return new MaybeDBCLoc<DBC,this>(this, safegetter);
    }

    protected wrapSQLLoc(safegetter: (dbc: SQL)=>LocSystem<any>): MaybeSQLLoc<SQL,this> {
        return new MaybeSQLLoc<SQL,this>(this, safegetter);
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

    GetOrCreateDBC() {
        return this.GetDBC() || (this._cachedDBC = this.createDBC()) 
    }

    GetOrCreateSQL() {
        return this.GetSQL() || (this._cachedSQL = this.createSQL()) 
    }

    HasSQL() { return this.GetDBC() !== undefined; }
    HasDBC() { return this.GetSQL() !== undefined; }
}

export class MaybeDBCCell<C extends CPrim, DBC, T extends SQLDBCEntity<DBC,any>> extends Cell<C,T>{ 
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
        this.safeGetter(this.owner.GetOrCreateDBC()).set(value);
        return this.owner;
    }
}

export class MaybeDBCLoc<DBC,T extends SQLDBCEntity<DBC,any>> extends LocSystem<T> {
    private safeGetter: (row: DBC)=>LocSystem<any>;
    constructor(owner: T, safeGetter: (row: DBC)=>LocSystem<any>) {
        super(owner);
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, T> & PendingCell {
        return new MaybeDBCCell<string,DBC,T>(
               this.owner
            , ''
            ,(dbc)=>this.safeGetter(dbc).lang(lang)
        )
    }

    get mask(): Cell<number, T> {
        return new MaybeDBCCell<number,DBC,T>(
              this.owner
            , 0
            , (dbc)=>this.safeGetter(dbc).mask
        )
    }

    set(con: loc_constructor): T {
        this.safeGetter(this.owner.GetOrCreateDBC()).set(con);
        return this.owner;
    }
}

export class MaybeSQLCell<C extends CPrim, SQL, T extends SQLDBCEntity<any,SQL>> extends Cell<C,T>{ 
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
        this.safeGetter(this.owner.GetOrCreateSQL()).set(value);
        return this.owner;
    }
}

export class MaybeSQLLoc<SQL,T extends SQLDBCEntity<any,SQL>> extends LocSystem<T> {
    private safeGetter: (row: SQL)=>LocSystem<any>;
    constructor(owner: T, safeGetter: (row: SQL)=>LocSystem<any>) {
        super(owner);
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, T> & PendingCell {
        return new MaybeDBCCell<string,SQL,T>(
               this.owner
            , ''
            ,(sql)=>this.safeGetter(sql).lang(lang)
        )
    }

    get mask(): Cell<number, T> {
        return new MaybeDBCCell<number,SQL,T>(
              this.owner
            , 0
            , (sql)=>this.safeGetter(sql).mask
        )
    }

    set(con: loc_constructor): T {
        this.safeGetter(this.owner.GetOrCreateSQL()).set(con);
        return this.owner;
    }
}