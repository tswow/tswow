import { Row } from "../../../data/table/Row";
import { Table } from "../../../data/table/Table";
import { TwoRowMainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryBase } from "./RegistryBase";

/**
 * Base registry for entities always defined in both DBC and SQL
 */
export abstract class DBCSQLRegistryBase<
      DBC extends Row<any,DBCQuery> & {clone: (id: number)=>DBC}
    , SQL extends Row<any,SQLQuery> & {clone: (id: number)=>SQL}
    , DBCQuery
    , SQLQuery
    , E extends TwoRowMainEntity<DBC,SQL>
> extends RegistryBase<E,DBCQuery>{
    protected abstract DBCTable(): Table<any,DBCQuery,DBC>
    protected abstract SQLTable(): Table<any,SQLQuery,SQL>
    protected abstract EntityFromDBC(row: DBC): E
    protected abstract EntityFromSQL(row: SQL): E
    protected abstract EntityFromBoth(dbc: DBC, sql: SQL): E

    protected abstract LoadDBC(id: number): DBC
    protected abstract LoadSQL(id: number): SQL

    protected abstract EmptyQuery(): DBCQuery;

    getAll() {
        return this.DBCTable()
            .queryAll(this.EmptyQuery())
            .map(x=>this.EntityFromDBC(x))
    }

    queryAllDBC(query: DBCQuery) {
        return this.DBCTable().queryAll(query).map(x=>this.EntityFromDBC(x));
    }

    queryDBC(query: DBCQuery) {
        let v = this.DBCTable().query(query);
        return (v ? this.EntityFromDBC(v) : undefined) as E;
    }

    queryAllSQL(query: SQLQuery) {
        return this.SQLTable().queryAll(query).map(x=>this.EntityFromSQL(x));
    }

    querySQL(query: SQLQuery) {
        let v = this.SQLTable().query(query);
        return (v ? this.EntityFromSQL(v) : undefined) as E;
    }
}

/**
 * Registry for entities defined in both DBC and SQL
 *
 */
export abstract class DBCSQLRegistryStatic<
      DBC extends Row<any,DBCQuery> & {clone: (id: number)=>DBC}
    , SQL extends Row<any,SQLQuery> & {clone: (id: number)=>SQL}
    , DBCQuery
    , SQLQuery
    , E extends TwoRowMainEntity<DBC,SQL>
> extends DBCSQLRegistryBase<DBC,SQL,DBCQuery,SQLQuery,E>{
    protected abstract DBCTable(): Table<any,DBCQuery,DBC> & { add: (id: number)=>DBC}
    protected abstract SQLTable(): Table<any,SQLQuery,SQL> & { add: (id: number)=>SQL}
    protected abstract Clear(e: E, mod: string, id: string): void;
    protected abstract Clone(e: E, parent: E, mod: string, id: string): void;
    protected abstract IDs(): StaticIDGenerator;

    create(mod: string, id: string, parent = this.nullID()) {
        let nid = this.IDs().id(mod,id);
        if(parent !== this.nullID()) {
            let parentDbc = this.LoadDBC(parent);
            let parentSql = this.LoadSQL(parent);
            let parentEntity = this.EntityFromBoth(parentDbc,parentSql);
            let dbcRow = parentDbc.clone(nid);
            let sqlRow = parentSql.clone(nid);
            let entity = this.EntityFromBoth(dbcRow,sqlRow);
            this.Clone(entity,parentEntity,mod,id);
            return entity;
        } else {
            let dbcRow = this.DBCTable().add(nid);
            let sqlRow = this.SQLTable().add(nid);
            let entity = this.EntityFromBoth(dbcRow,sqlRow);
            this.Clear(entity,mod,id);
            return entity;
        }
    }
}
