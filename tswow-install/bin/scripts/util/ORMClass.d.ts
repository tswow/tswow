import * as ts from 'typescript';
export type DBType = 'world' | 'auth' | 'characters';
export declare class DBFieldType {
    private __dbType;
    readonly setMethod: string;
    readonly getMethod: string;
    constructor(type: string, getMethod: string, setMethod: string);
    dbType(varCharSize: number): string;
}
export declare const DBFiledTypes: {
    readonly uint8: DBFieldType;
    readonly int8: DBFieldType;
    readonly uint16: DBFieldType;
    readonly int16: DBFieldType;
    readonly uint32: DBFieldType;
    readonly int32: DBFieldType;
    readonly uint64: DBFieldType;
    readonly int64: DBFieldType;
    readonly float: DBFieldType;
    readonly double: DBFieldType;
    readonly string: DBFieldType;
    readonly TSGUID: DBFieldType;
    readonly 'TSArray<uint8>': DBFieldType;
};
export declare const ORMTableTypes: readonly ["DBEntry", "DBArrayEntry"];
export type ORMTableType = typeof ORMTableTypes[number];
export type ORMFieldType = keyof typeof DBFiledTypes;
export declare class ORMField {
    private name;
    dbName(): string;
    memoryName(): string;
    type: ORMFieldType;
    initialization: string;
    isPrimaryKey: boolean;
    isAuto: boolean;
    varCharSize: number;
    sqlInitialization(): string;
    dbType(): string;
    settings(): DBFieldType;
    constructor(name: string, type: ORMFieldType, isPrimaryKey: boolean, initialization: string, isAuto: boolean, varCharSize: string);
}
export declare class ORMClass {
    className: string;
    databaseType: DBType;
    fields: ORMField[];
    tableType: ORMTableType;
    constructor(className: string, databaseType: DBType);
    dbCallName(): string;
    pks(): ORMField[];
    pksNoIndex(): ORMField[];
    nonPks(): ORMField[];
    get tableName(): string;
    createDatabaseSpec(target: 'lua' | 'c++'): string;
    capitalizedDbType(): string;
    prepareStatement(indents: number, target: 'lua' | 'c++', fn: (indents: number, target: 'lua' | 'c++') => void): string;
    sqlQuery(indents: number, varName: string, target: 'c++' | 'lua', fn: (indents: number, varName: string, target: 'lua' | 'c++') => void): string;
    databaseIndex(): 2 | 0 | 1;
    loadFromRes(indents: number, valName: string, resName: string, target: 'lua' | 'c++'): string;
    saveFields(indents: number, target: 'lua' | 'c++'): string;
    loadPks(indents: number, includeIndex: boolean, useSelf: boolean, target: 'lua' | 'c++'): string;
    loadSql(indents: number, varName: string, target: 'lua' | 'c++'): string;
    deleteSql(indents: number, varName: string, target: 'lua' | 'c++'): string;
    private getPfs;
    saveStatement(indents: number, target: 'lua' | 'c++'): string;
    loadStatement(indents: number, target: 'lua' | 'c++'): string;
    deleteStatement(indents: number, target: 'lua' | 'c++'): string;
}
export declare function parseORMClass(node: ts.ClassDeclaration): ORMClass | undefined;
