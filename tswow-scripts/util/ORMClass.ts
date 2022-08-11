import * as ts from 'typescript';

export type DBType = 'world'|'auth'|'characters'

export class DBFieldType {
    private __dbType: string;
    readonly setMethod: string;
    readonly getMethod: string;
    constructor(
          type: string
        , getMethod: string
        , setMethod: string
    ) {
        this.__dbType = type
        this.setMethod = setMethod
        this.getMethod = getMethod
    }

    dbType(varCharSize: number) {
        if(varCharSize > 0) {
            return `varchar(${varCharSize})`
        } else {
            return this.__dbType
        }
    }
}

export const DBFiledTypes = {
    uint8: new DBFieldType(
          'tinyint(3) unsigned'
        , 'GetUInt8'
        , 'SetUInt8'
    ),
    int8: new DBFieldType(
          'tinyint(4)'
        , 'GetUInt8'
        , 'SetUInt8'
    ),
    uint16: new DBFieldType(
          'smallint(5) unsigned'
        , 'GetUInt16'
        , 'SetUInt16'
    ),
    int16: new DBFieldType(
          'smallint(6)'
        , 'GetInt16'
        , 'SetInt16'
    ),
    uint32: new DBFieldType(
          'int(10) unsigned'
        , 'GetUInt32'
        , 'SetUInt32'
    ),
    int32: new DBFieldType(
          'int(11)'
        , 'GetInt32'
        , 'SetInt32'
    ),
    uint64: new DBFieldType(
        'bigint(20) unsigned'
      , 'GetUInt64'
      , 'SetUInt64'
    ),
    int64: new DBFieldType(
        'bigint(20)'
      , 'GetInt64'
      , 'SetInt64'
    ),
    float: new DBFieldType(
        'float'
      , 'GetFloat'
      , 'SetFloat'
    ),
    double: new DBFieldType(
        'double'
      , 'GetDouble'
      , 'SetDouble'
    ),
    string: new DBFieldType(
          'text'
        , 'GetString'
        , 'SetString'
    )
} as const

export const ORMTableTypes = ['DBEntry','DBArrayEntry'] as const
export type ORMTableType = typeof ORMTableTypes[number]
export type ORMFieldType = keyof typeof DBFiledTypes

export class ORMField {
    private name: string;

    dbName() {
        return this.name.toLowerCase()
    }

    memoryName() {
        return this.name;
    }

    type: ORMFieldType;
    initialization: string;
    isPrimaryKey: boolean;
    isAuto: boolean;
    varCharSize: number;

    sqlInitialization() {
        return this.type == 'string' ? `\\${this.initialization.slice(0,this.initialization.length-1)}\\"` : this.initialization
    }

    dbType() {
        return this.settings().dbType(this.varCharSize)
    }

    settings() {
        return DBFiledTypes[this.type];
    }

    constructor(
          name: string
        , type: ORMFieldType
        , isPrimaryKey: boolean
        , initialization: string
        , isAuto: boolean
        , varCharSize: string
    ) {
        this.name = name;
        this.type = type;
        this.initialization = initialization;
        this.isPrimaryKey = isPrimaryKey;
        this.isAuto = isAuto;
        this.varCharSize = parseInt(varCharSize)
        if(isNaN(this.varCharSize)) {
            throw new Error(`Invalid varchar size: ${varCharSize}`)
        }
    }

}

export class ORMClass {
    className: string;
    databaseType: DBType;
    fields: ORMField[] = []
    tableType: ORMTableType;

    constructor(className: string, databaseType: DBType) {
        this.className = className;
        this.databaseType = databaseType;
    }

    dbCallName()  {
        return this.databaseType[0].toUpperCase()
            + this.databaseType.slice(1)
    }

    pks() { return this.fields.filter(x=>x.isPrimaryKey)}
    pksNoIndex() { return this.pks().filter(x=>x.memoryName() !== '__index')}
    nonPks() { return this.fields.filter(x=>!x.isPrimaryKey)}

    get tableName() { return this.className.toLowerCase()}

    createDatabaseSpec(target: 'lua'|'c++') {
        let arrow = target === 'c++' ? '->' : ':'
        let i = target === 'c++' ? '    ' : ''
        let str = ''
        str += `${i}CreateDatabaseSpec(\n`
        str += `${i}    ${this.databaseIndex()},\n`
        str += `${i}    ${this.capitalizedDbType()}DatabaseInfo()${arrow}Database(),\n`
        str += `${i}    "${this.tableName}",\n`
        str += `${i}    {\n`
        this.fields.forEach(x=>{
            str += `${i}        {"${x.dbName()}","${x.dbType()}",${x.isPrimaryKey},${x.isAuto}},\n`
        })
        str += `${i}    }\n`
        str += `${i})`
        return str
    }

    capitalizedDbType() {
        return this.databaseType.substring(0,1).toUpperCase() + this.databaseType.substring(1)
    }

    prepareStatement(indents: number, target: 'lua'|'c++', fn: (indents: number, target: 'lua'|'c++') => void) {
        return `Prepare${this.capitalizedDbType()}Query(${target==='c++' ? '(':''}\n${fn.bind(this)(indents,target)}${' '.repeat(indents)}${target === 'c++' ? ')':''})\n`
    }

    sqlQuery(indents: number, varName: string, target: 'c++'|'lua', fn: (indents: number, varName: string, target: 'lua'|'c++') => void) {
        return `Query${this.capitalizedDbType()}(\n${fn.bind(this)(indents,varName,target)}${' '.repeat(indents)})\n`
    }

    databaseIndex() {
        // @alsoin TSOrmGenerator.h:DatabaseType
        switch(this.databaseType) {
            case 'world': return 0
            case 'auth': return 1
            case 'characters': return 2
        }
    }

    loadFromRes(indents: number, valName: string, resName: string, target: 'lua'|'c++') {
        let s = ' '.repeat(indents)
        let res = ``
        let valProp = target === 'c++' ? '->' : '.'
        let resProp = target === 'c++' ? '->' : ':'
        this.fields.forEach((x,i)=>{
            res += `${s}${valName}${valProp}${x.memoryName()} = ${resName}${resProp}${x.settings().getMethod}(${i});\n`
        })
        return res;
    }

    saveFields(indents: number, target: 'lua'|'c++') {
        let selfName = target === 'c++' ? 'this->' : 'self.'
        let arrow = target === 'c++' ? '->' : ':'
        let s = ' '.repeat(indents)
        return this.fields
            .map((x,i) => `${s}${arrow}${x.settings().setMethod}(${i},${selfName}${x.memoryName()})\n`).join('')

    }

    loadPks(indents: number, includeIndex: boolean, useSelf: boolean, target: 'lua'|'c++') {
        let selfName = !useSelf ? '' : target === 'c++' ? 'this->' : 'self.'
        let arrow = target === 'c++' ? '->' : ':'
        let s = ' '.repeat(indents)
        return (includeIndex ? this.pks() : this.pksNoIndex())
            .map((x,i)=>`${s}${arrow}${x.settings().setMethod}(${i},${selfName}${x.memoryName()})\n`).join('')
    }

    loadSql(indents: number, varName: string, target: 'lua'|'c++') {
        const {p,f,s} = this.getPfs(indents,target);
        const plus = target === 'lua' ? '..' : '+'
        return `${p}${f}" SELECT "\n`
            +  `${p}${s}"     ${this.fields.map(x=>`\`${x.dbName()}\``).join(',')}"\n`
            +  `${p}${s}" FROM"\n`
            +  `${p}${s}"     \`${this.tableName}\`"\n`
            +  `${p}${s}" " ${plus} ${varName} ${plus} ";"\n`
    }

    deleteSql(indents: number, varName: string, target: 'lua'|'c++') {
        const {p} = this.getPfs(indents,target);
        const plus = target === 'lua' ? '..' : '+'
        return `${p}" DELETE FROM \`${this.tableName}\` " ${plus} ${varName} ${plus} ";"\n`
    }

    private getPfs(indents: number, target: 'lua'|'c++') {
        return {p: ' '.repeat(indents+4), f: target === 'lua' ? '   ' : '', s: target === 'lua' ? '.. ': ''}
    }

    saveStatement(indents: number, target: 'lua'|'c++') {
        const {p,f,s} = this.getPfs(indents,target);
        return `${p}${f}" REPLACE INTO \`${this.tableName}\`"\n`
            +  `${p}${s}"    (${this.fields.map(x=>`\`${x.dbName()}\``).join(',')})"\n`
            +  `${p}${s}" VALUES "\n`
            +  `${p}${s}"    (${this.fields.map(()=>'?').join(',')});"\n`
    }

    loadStatement(indents: number, target: 'lua'|'c++') {
        const {p,f,s} = this.getPfs(indents,target);
        return `${p}${f}" SELECT ${this.fields.map(x=>`\`${x.dbName()}\``).join(',')}"\n`
            +  `${p}${s}" FROM"\n`
            +  `${p}${s}"     \`${this.tableName}\`"\n`
            +  `${p}${s}" WHERE"\n`
            +  `${p}${s}"    ${this.pksNoIndex().map(x=>`\`${x.dbName()}\` = ?`).join(' AND ')};"\n`
    }

    deleteStatement(indents: number, target: 'lua'|'c++') {
        const {p,f,s} = this.getPfs(indents,target);
        return `${p}${f}" DELETE FROM \`${this.tableName}\`"\n`
            +  `${p}${s}" WHERE "\n`
            +  `${p}${s}"    ${this.pks().map(x=>`\`${x.dbName()}\` = ?`).join(' AND ')};"\n`
    }
}

export function parseORMClass(node: ts.ClassDeclaration): ORMClass | undefined {
    let decorators = node.decorators || []
    const className = node.name.getText(node.getSourceFile());    
    let entry: ORMClass|undefined = undefined;
    decorators.forEach((x)=>{
        const ft = x.getText(x.getSourceFile());
        switch(ft) {
            case '@WorldTable':
                entry = new ORMClass(className,'world');
                break;
            case '@AuthTable':
                entry = new ORMClass(className,'auth');
                break;
            case '@CharactersTable':
                entry = new ORMClass(className,'characters');
                break;
        }
    });

    // 2. Figure out the table type
    let tableType: ORMTableType = ORMTableTypes
    .find(x=>{
        if(node.heritageClauses === undefined) {
            return false;
        }
        return node.heritageClauses[0].getText().endsWith(x)
    });

    if(entry && !tableType) {
        throw new Error(
              `Database class ${node.name.getText()}`
            + ` does not extend either of ${ORMTableTypes.join(' or ')}`
        )
    }

    if(tableType && !entry) {
        throw new Error(
              `Database class ${node.name.getText()}`
            + ` does not specify a valid database`
            + ` (add @WorldTable/@AuthTable/@CharactersTable decorator)`
        )
    }

    if(!tableType && !entry) {
        return undefined;
    }

    entry.tableType = tableType

    // 4. Find all database field members
    node.members.forEach((memberRaw)=>{
        if(
            memberRaw.kind!==ts.SyntaxKind.PropertyDeclaration
            || !memberRaw.decorators
        ) {
            return;
        }
        const member = memberRaw as ts.PropertyDeclaration;

        let varCharField = member.decorators
            .map(x=>x.getText().match(/\@(DBFieldVarChar|DBPrimaryKeyVarChar)\((\d+)\)/))
            .find(x=>x)

        let isVarChar = varCharField !== undefined;
        let isPKString = varCharField && varCharField[1] == 'DBPrimaryKeyVarChar'

        let isField = member.decorators
            .find(x=>x.getText()=='@DBField') !== undefined;
        let isPK = isPKString || member.decorators
            .find(x=>x.getText()=='@DBPrimaryKey') !== undefined;

        if(!isField && !isPK && !isVarChar) {
            return;
        }

        const type = member.type.getText(member.getSourceFile()) as ORMFieldType;
        if(!Object.keys(DBFiledTypes).includes(type)) {
            throw new Error(`Invalid type for database field: ${type}`);
        }

        if(type=='string'&& isPK && !isPKString) {
            throw new Error(
                    `Strings cannot be primary keys,`
                + ` use @PrimaryKeyVarChar and specify a maximum width`
            );
        }

        const name = member.name.getText(member.getSourceFile());
        if(!member.initializer) {
            throw new Error(`Database fields must be initialized (= something in the declaration)`);
        }
        const defValue = member.initializer.getText(member.getSourceFile());
        entry.fields.push(new ORMField(
              name
            , type
            , isPK
            , defValue
            , false
            , isVarChar ? varCharField[2] : '0'
        ));
    });
    if(entry.pks().length===0) {
        throw new Error(`Database rows must have at least one primary key.`)
    }

    if(entry.tableType === 'DBArrayEntry') {
        entry.fields.unshift(new ORMField('__index','uint64',true,'0',true,'0'))
    }

    return entry;
}