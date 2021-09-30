import { Cell, CPrim } from "wotlkdata/cell/cells/Cell";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem, CellSystemTop, LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/dbc/Localization";
import { loc_constructor } from "wotlkdata/primitives";

export class SQLDBCChild<O,DBC,SQL,T extends SQLDBCEntity<DBC,SQL>> extends CellSystem<O> {
    private container: T;

    constructor(owner: O, container: T) {
        super(owner);
        this.container = container;
    }

    protected ownerWrapDBC<C extends CPrim>(def: C, safegetter: (dbc: DBC)=>Cell<C,any>): MaybeDBCCell<O,C,DBC,T> {
        return new MaybeDBCCell(this.owner, this.container, def, safegetter);
    }

    protected ownerWrapSQL<C extends CPrim>(def: C, safegetter: (dbc: SQL)=>Cell<C,any>): MaybeSQLCell<O,C,SQL,T> {
        return new MaybeSQLCell(this.owner, this.container, def, safegetter);
    }

    protected ownerWrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLoc<O,DBC,T> {
        return new MaybeDBCLoc(this.owner, this.container, safegetter);
    }

    protected ownerWrapSQLLoc(safegetter: (sql: SQL)=>LocSystem<any>): MaybeSQLLoc<O,SQL,T> {
        return new MaybeSQLLoc(this.owner, this.container, safegetter);
    }
}

export interface IMaybeSQLEntity<SQL> {
    HasSQL(): boolean;
    GetSQL(): SQL;
    GetOrCreateSQL(): SQL;
}

export interface IMaybeDBCEntity<DBC> {
    HasDBC(): boolean;
    GetDBC(): DBC;
    GetOrCreateDBC(): DBC;
}

export class MaybeSQLEntityPublic<T,SQL> extends CellSystem<T> implements IMaybeSQLEntity<SQL> {
    private container: MaybeSQLEntity<T,SQL>

    constructor(owner: T, container: MaybeSQLEntity<T,SQL>) {
        super(owner);
        this.container = container;
    }

    HasSQL(): boolean {
        return MaybeSQLEntity.HasSQL(this.container);
    }

    GetSQL(): SQL {
        return MaybeSQLEntity.GetSQL(this.container);
    }
    GetOrCreateSQL(): SQL {
        return MaybeSQLEntity.GetOrCreateSQL(this.container);
    }
}
export abstract class MaybeSQLEntity<T,SQL> extends CellSystem<T> {
    private _cachedSQL: SQL | undefined;
    protected abstract createSQL(): SQL;
    protected abstract findSQL(): SQL;
    protected abstract isValidSQL(sql: SQL): boolean;

    protected toPublic(): MaybeSQLEntityPublic<T,SQL> { return new MaybeSQLEntityPublic(this.owner, this); }

    protected wrapSQL<C extends CPrim>(def: C, safegetter: (sql: SQL)=>Cell<C,any>): MaybeSQLCell<T,C,SQL,MaybeSQLEntityPublic<T,SQL>> {
        return new MaybeSQLCell(this.owner, this.toPublic(), def, safegetter);
    }

    protected wrapSQLLoc(safegetter: (dbc: SQL)=>LocSystem<any>): MaybeSQLLoc<T,SQL,MaybeSQLEntityPublic<T,SQL>> {
        return new MaybeSQLLoc(this.owner, this.toPublic(), safegetter);
    }

    static GetSQL<T,SQL>(entity: MaybeSQLEntity<T,SQL>) {
        if(entity._cachedSQL && entity.isValidSQL(entity._cachedSQL)) {
            return entity._cachedSQL;
        } else {
            return entity._cachedSQL = entity.findSQL();
        }
    }

    static GetOrCreateSQL<T,SQL>(entity: MaybeSQLEntity<T,SQL>) {
        return this.GetSQL(entity) || (entity._cachedSQL = entity.createSQL());
    }

    static HasSQL<T,SQL>(entity: MaybeSQLEntity<T,SQL>): boolean {
        return this.GetSQL(entity) !== undefined;
    }

    sqlRow(): SQL { return MaybeSQLEntity.GetSQL(this); }
    exists(): boolean { return MaybeSQLEntity.HasSQL(this); }
}

export abstract class MaybeDBCEntity<T,DBC> extends CellSystem<T> implements IMaybeDBCEntity<DBC> {
    @Transient
    private _cachedDBC: DBC | undefined;
    protected abstract createDBC(): DBC;
    protected abstract findDBC(): DBC;
    protected abstract isValidDBC(dbc: DBC): boolean;

    protected wrapDBC<C extends CPrim>(def: C, safegetter: (dbc: DBC)=>Cell<C,any>): MaybeDBCCell<T,C,DBC,this> {
        return new MaybeDBCCell(this.owner, this, def, safegetter);
    }

    protected wrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLoc<T,DBC,this> {
        return new MaybeDBCLoc(this.owner, this, safegetter);
    }

    GetDBC() {
        if(this._cachedDBC && this.isValidDBC(this._cachedDBC)) {
            return this._cachedDBC;
        } else {
            return this._cachedDBC = this.findDBC();
        }
    }

    GetOrCreateDBC() {
        return this.GetDBC() || (this._cachedDBC = this.createDBC())
    }

    HasDBC() { return this.GetDBC() !== undefined; }

    // todo: new syntax
    exists() { return this.HasDBC(); }
    force() { this.GetOrCreateDBC(); return this.owner; }

    static wrapDBC<C extends CPrim,T,DBC,O extends MaybeDBCEntity<T,DBC>>(
              owner: O
            , def: C
            , safegetter: (dbc: DBC)=>Cell<C,any>
            )
        : MaybeDBCCell<T,C,DBC,O>
    {
        return owner.wrapDBC(def,safegetter);
    }

    static wrapDBCLoc<T,DBC,O extends MaybeDBCEntity<T,DBC>>(
              owner: O
            , safegetter: (dbc: DBC)=>LocSystem<any>
            )
        : MaybeDBCLoc<T,DBC,O>
    {
            return owner.wrapDBCLoc(safegetter);
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

    protected wrapDBC<T extends CPrim>(def: T, safegetter: (dbc: DBC)=>Cell<T,any>): MaybeDBCCell<this,T,DBC,this> {
        return new MaybeDBCCell(this,this, def, safegetter);
    }

    protected wrapSQL<T extends CPrim>(def: T, safegetter: (sql: SQL)=>Cell<T,any>): MaybeSQLCell<this,T,SQL,this> {
        return new MaybeSQLCell(this,this, def, safegetter);
    }

    protected wrapDBCLoc(safegetter: (dbc: DBC)=>LocSystem<any>): MaybeDBCLoc<this,DBC,this> {
        return new MaybeDBCLoc(this,this, safegetter);
    }

    protected wrapSQLLoc(safegetter: (dbc: SQL)=>LocSystem<any>): MaybeSQLLoc<this,SQL,this> {
        return new MaybeSQLLoc(this,this, safegetter);
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

    HasSQL() { return this.GetSQL() !== undefined; }
    HasDBC() { return this.GetDBC() !== undefined; }
}

export class MaybeDBCCell<O,C extends CPrim, DBC, T extends IMaybeDBCEntity<DBC>> extends Cell<C,O>{
    private defaultValue: C;
    private container: T
    private safeGetter: (row: DBC)=>Cell<C,any>

    constructor(owner: O, container: T, defaultValue: C, safeGetter: (row: DBC)=>Cell<C,any>) {
        super(owner);
        this.container = container;
        this.defaultValue = defaultValue;
        this.safeGetter = safeGetter;
    }

    exists() { return this.container.HasDBC(); }

    get(): C {
        if(!this.container.HasDBC()) {
            return this.defaultValue;
        } else {
            return this.safeGetter(this.container.GetDBC()).get();
        }
    }

    set(value: C): O {
        this.safeGetter(this.container.GetOrCreateDBC()).set(value);
        return this.owner;
    }
}

export class MaybeDBCLoc<O,DBC,T extends IMaybeDBCEntity<DBC>> extends LocSystem<O> {
    private safeGetter: (row: DBC)=>LocSystem<any>;
    private container: T;

    constructor(owner: O, container: T, safeGetter: (row: DBC)=>LocSystem<any>) {
        super(owner);
        this.container = container;
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, O> & PendingCell {
        return new MaybeDBCCell<O,string,DBC,T>(
              this.owner
            , this.container
            , ''
            ,(dbc)=>this.safeGetter(dbc).lang(lang)
        )
    }

    get mask(): Cell<number, O> {
        return new MaybeDBCCell<O,number,DBC,T>(
              this.owner
            , this.container
            , 0
            , (dbc)=>this.safeGetter(dbc).mask
        )
    }

    set(con: loc_constructor): O {
        this.safeGetter(this.container.GetOrCreateDBC()).set(con);
        return this.owner;
    }
}

export class MaybeSQLCell<O,C extends CPrim, SQL, T extends IMaybeSQLEntity<SQL>> extends Cell<C,O>{
    private defaultValue: C;
    private container: T;
    private safeGetter: (sql: SQL)=>Cell<C,any>

    constructor(owner: O, container: T, defaultValue: C, safeGetter: (row: SQL)=>Cell<C,any>) {
        super(owner);
        this.container = container;
        this.defaultValue = defaultValue;
        this.safeGetter = safeGetter;
    }

    exists() {
        return this.container.HasSQL();
    }

    get(): C {
        if(!this.container.HasSQL()) {
            return this.defaultValue;
        } else {
            return this.safeGetter(this.container.GetSQL()).get();
        }
    }

    set(value: C): O {
        this.safeGetter(this.container.GetOrCreateSQL()).set(value);
        return this.owner;
    }
}

export class MaybeSQLLoc<O,SQL,T extends IMaybeSQLEntity<SQL>> extends LocSystem<O> {
    private safeGetter: (row: SQL)=>LocSystem<any>;
    private container: T;

    constructor(owner: O, container: T, safeGetter: (row: SQL)=>LocSystem<any>) {
        super(owner);
        this.container = container;
        this.safeGetter = safeGetter;
    }

    lang(lang: Language): Cell<string, O> & PendingCell {
        return new MaybeSQLCell<O,string,SQL,T>(
              this.owner
            , this.container
            , ''
            ,(sql)=>this.safeGetter(sql).lang(lang)
        )
    }

    get mask(): Cell<number, O> {
        return new MaybeSQLCell<O,number,SQL,T>(
              this.owner
            , this.container
            , 0
            , (sql)=>this.safeGetter(sql).mask
        )
    }

    set(con: loc_constructor): O {
        this.safeGetter(this.container.GetOrCreateSQL()).set(con);
        return this.owner;
    }
}