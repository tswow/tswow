import { mpath } from "../util/FileSystem";
import { WDirectory } from "../util/FileTree";
import { CodeWriter } from "./codewriter";
import { TRANSPILER_CHANGES } from "./version";
import ts = require("typescript");

type DBType = 'world'|'auth'|'characters'

class DBFieldType {
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

const DBFiledTypes = {
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

const TableTypes = ['DBEntry','DBArrayEntry'] as const
type TableType = typeof TableTypes[number]
type FieldType = keyof typeof DBFiledTypes

class Field {
    private name: string;

    dbName() {
        return this.name.toLowerCase()
    }

    memoryName() {
        return this.name;
    }

    type: FieldType;
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
        , type: FieldType
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

class Entry {
    className: string;
    databaseType: DBType;
    fields: Field[] = []
    tableType: TableType;

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
}

let entries: Entry[] = [];

export function handleClassImpl(node: ts.ClassDeclaration, writer: CodeWriter) {
    // 1. Find entry
    const entry = entries.find(x=>x.className === node.name.getText())
    if(entry === undefined) return;

    // 2. Generate queries
    const statementName =
          `TSPreparedStatement`
        + `${entry.dbCallName()}`

    const queryName =
          `Prepare`
        + `${entry.dbCallName()}`
        + `Query`

    // Load
    writer.writeStringNewLine()
    writer.writeStringNewLine()

    const loadStmnt = () => {
        writer.writeStringNewLine(
            `static ${statementName} LoadStatement = ${queryName}(JSTR(`)
        writer.IncreaseIntent()
        writer.writeStringNewLine(
            `" SELECT ${entry.fields.map(x=>`\`${x.dbName()}\``).join(',')}"`)
        writer.writeStringNewLine(
            `" FROM \`${entry.tableName}\`"`)
        writer.writeStringNewLine(
            `" WHERE ${entry
                .pksNoIndex().map(x=>`\`${x.dbName()}\` = ?`).join(' AND ')
            };"`)
        writer.DecreaseIntent()
        writer.writeStringNewLine("));")
    }

    const saveStmnt = () => {
        writer.writeStringNewLine()
        writer.writeStringNewLine(
            `static ${statementName} SaveStatement = ${queryName}(JSTR(`)
        writer.IncreaseIntent()
        writer.writeStringNewLine(`" INSERT INTO \`${entry.tableName}\`"`)
        writer.writeStringNewLine(
            `" (${entry.fields.map(x=>`\`${x.dbName()}\``).join(',')})"`)
        writer.writeStringNewLine(`" VALUES "`)
        writer.writeStringNewLine(
            `" (${entry.fields.map(x=>'?').join(',')})"`)
        writer.writeStringNewLine(`" ON DUPLICATE KEY UPDATE "`)
        writer.writeStringNewLine(
            `" ${entry.fields
                    .filter(x=>!x.isPrimaryKey)
                    .map(x=>`\`${x.dbName()}\` = ?`)
                    .join(' , ')
                };"`)
        writer.DecreaseIntent()
        writer.writeStringNewLine(`));`);
    }

    const deleteStmnt = () => {
        writer.writeStringNewLine()
        writer.writeStringNewLine(
            `static ${statementName} DeleteStatement = ${queryName}(JSTR(`)
        writer.IncreaseIntent()
        writer.writeStringNewLine(`" DELETE FROM ${entry.tableName}"`)
        writer.writeStringNewLine(`" WHERE "`)
        writer.writeStringNewLine(
            `" ${entry.pks().map(x=>`${x.dbName()} = ?`).join(' AND ')}"`)
        writer.DecreaseIntent()
        writer.writeStringNewLine(`));`);
    }

    if(entry.tableType === 'DBEntry') {
        writer.writeStringNewLine(`void ${entry.className}::Load()`)
        writer.BeginBlock()
        loadStmnt()
        writer.writeStringNewLine(
            `auto res = LoadStatement.Query()`)
        writer.IncreaseIntent()
        entry.pks().forEach((x,i)=>writer.writeStringNewLine(
            `->${x.settings().setMethod}(${i},this->${x.memoryName()})`
        ))
        writer.writeStringNewLine(`->Send();`)
        writer.DecreaseIntent()
        writer.writeStringNewLine(`if(!res->GetRow()) return;`)
        entry.fields.forEach((x,i)=>{
            writer.writeStringNewLine(
                `this->${x.memoryName()} = res->${x.settings().getMethod}(${i});`)
        })
        writer.EndBlock();
        writer.writeStringNewLine()
    } else {
        writer.writeStringNewLine(
              `std::shared_ptr<DBContainer<${entry.className}>> ${entry.className}::Load`
            + `(${entry.pksNoIndex().map(x=>`${x.type} ${x.memoryName()}`).join(', ')})`
        )
        writer.BeginBlock()
        loadStmnt()
        writer.writeStringNewLine(`auto res = LoadStatement.Query()`)
        writer.IncreaseIntent()
        entry.pksNoIndex().forEach((x,i)=>{
            writer.writeStringNewLine(`->${x.settings().setMethod}(${i},${x.memoryName()})`)
        })
        writer.writeStringNewLine(`->Send();`)
        writer.DecreaseIntent()
        writer.writeStringNewLine(
              `std::shared_ptr<DBContainer<${entry.className}>> container `
            + `= std::make_shared<DBContainer<${entry.className}>>();`
        )
        writer.writeStringNewLine(`while(res->GetRow())`)
        writer.BeginBlock()
        writer.writeStringNewLine(
              `std::shared_ptr<${entry.className}> value`
            + ` = std::make_shared<${entry.className}>();`
        )
        writer.writeStringNewLine(`value->m_isDirty = false;`)
        entry.fields.forEach((x,i)=>{
            writer.writeStringNewLine(`value->${x.memoryName()} = res->${x.settings().getMethod}(${i});`)
        })
        writer.writeStringNewLine(`container->Add(value);`)
        writer.EndBlock()
        writer.writeStringNewLine(`return container;`)
        writer.EndBlock()
    }

    // LoadSQL
    if(entry.tableType === 'DBEntry') {
        writer.writeStringNewLine(
              `TSArray<std::shared_ptr<${entry.className}>>`
            + ` ${entry.className}::LoadSQL(TSString sql)`
        );
    } else {
        writer.writeStringNewLine(
              `std::shared_ptr<DBContainer<${entry.className}>>`
            + ` ${entry.className}::LoadSQL(TSString sql)`
        );
    }
    writer.BeginBlock()
    writer.writeStringNewLine(`auto res = Query${entry.dbCallName()}(`)
    writer.IncreaseIntent()
    writer.writeStringNewLine(`" SELECT "`)
    writer.writeStringNewLine(`" ${entry.fields.map(x=>`\`${x.dbName()}\``).join(',')}"`)
    writer.writeStringNewLine(`" FROM \`${entry.tableName}\`"`)
    writer.writeStringNewLine(`" " + sql.std_str() + ";"`)
    writer.DecreaseIntent()
    writer.writeStringNewLine(');')
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(
                  `TSArray<std::shared_ptr<${entry.className}>> arr`
                + ` = TSArray<std::shared_ptr<${entry.className}>>();`
            )
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(
                `std::shared_ptr<DBContainer<${entry.className}>> arr = std::make_shared<DBContainer<${entry.className}>>();`
            )
            break;
        default:
            throw new Error(`Invalid table type: ${entry.tableType}`)
    }
    writer.writeStringNewLine(`while(res->GetRow())`)
    writer.BeginBlock()
    writer.writeStringNewLine(`std::shared_ptr<${entry.className}> value = std::make_shared<${entry.className}>();`)
    entry.fields.forEach((x,i)=>{
        writer.writeStringNewLine(
            `value->${x.memoryName()} = res->${x.settings().getMethod}(${i});`
        )
    })
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(`arr.push(value);`)
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(`arr->Add(value);`);
            break;
        default:
            throw new Error(`Invalid table type: ${entry.tableType}`)
    }
    writer.EndBlock()
    writer.writeStringNewLine(`return arr;`)
    writer.EndBlock()

    // DeleteSQL
    writer.writeStringNewLine(`void ${entry.className}::DeleteSQL(TSString sql)`)
    writer.BeginBlock()
    writer.writeStringNewLine(`Query${entry.dbCallName()}(`)
    writer.IncreaseIntent()
    writer.writeStringNewLine(`" DELETE FROM \`${entry.tableName}\`"`)
    writer.writeStringNewLine(`" " + sql.std_str() +`)
    writer.writeStringNewLine(`";"`)
    writer.DecreaseIntent()
    writer.writeStringNewLine(`);`)
    writer.EndBlock()

    // Save
    writer.writeStringNewLine()
    writer.writeStringNewLine(`void ${entry.className}::Save()`)
    writer.BeginBlock()
    saveStmnt();
    const saveCall = (lastCall: string) => {
        writer.writeStringNewLine(`SaveStatement.Query()`)
        writer.IncreaseIntent()
        entry.fields.forEach((x,i)=>{
            if(x.varCharSize > 0) {
                writer.writeStringNewLine(
                    `->${x.settings().setMethod}(${i},this->${x.memoryName()}.substring(0,${x.varCharSize}))`)
            } else {
                writer.writeStringNewLine(
                    `->${x.settings().setMethod}(${i},this->${x.memoryName()})`)
            }
        })
        // necessary for duplicate things
        entry.nonPks().forEach((x,i)=>{
            i = i+entry.fields.length
            if(x.varCharSize > 0) {
                writer.writeStringNewLine(
                    `->${x.settings().setMethod}(${i},this->${x.memoryName()}.substring(0,${x.varCharSize}))`)
            } else {
                writer.writeStringNewLine(
                    `->${x.settings().setMethod}(${i},this->${x.memoryName()})`)
            }
        })
        writer.writeStringNewLine(`->${lastCall};`)
        writer.DecreaseIntent()
    }
    if(entry.tableType === 'DBArrayEntry') {
        writer.writeStringNewLine(`if(this->__index == 0)`)
        writer.BeginBlock()
        writer.writeStringNewLine(
            `auto connection = Get${entry.dbCallName()}DBConnection();`
        )
        saveCall('Send(connection);');
        writer.writeStringNewLine(
            `auto res = connection->Query(JSTR("SELECT LAST_INSERT_ID();"));`)
        writer.writeStringNewLine(`res->GetRow();`)
        writer.writeStringNewLine(`this->__index = res->GetUInt64(0);`)
        writer.writeStringNewLine(`connection->Unlock();`);
        writer.EndBlock()
        writer.writeStringNewLine(`else`)
        writer.BeginBlock()
        saveCall('Send();')
        writer.EndBlock()
    } else {
        saveCall('Send();')
    }
    writer.EndBlock()

    // Delete
    writer.writeStringNewLine()
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(`void ${entry.className}::Delete()`)
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(`void ${entry.className}::_Delete()`)
            break;
        default: throw new Error(`Invalid TableType: ${entry.tableType}`)
    }
    writer.BeginBlock()
    deleteStmnt()
    writer.writeStringNewLine(`DeleteStatement.Query()`)
    writer.IncreaseIntent()
    entry.pks().forEach((x,i)=>
        writer.writeStringNewLine(
            `->${x.settings().setMethod}(${i},this->${x.memoryName()})`)
    )
    writer.writeStringNewLine(`->Send();`)
    writer.DecreaseIntent()
    writer.EndBlock()

    // __CreateTable
    writer.writeStringNewLine()
    writer.writeStringNewLine(`void ${entry.className}::__CreateTable()`)
    writer.BeginBlock()
    writer.writeStringNewLine(`DatabaseSpec spec`)
    writer.BeginBlock()
    writer.writeStringNewLine(
        `  DatabaseType::${entry.databaseType.toUpperCase()}`)
    writer.writeStringNewLine(
        `, ${entry.dbCallName()}DatabaseInfo()->Database().std_str()`)
    writer.writeStringNewLine(`, "${entry.tableName}"`)
    writer.writeStringNewLine(`, `)
    writer.BeginBlock()
    entry.fields.forEach(x=>{
        writer.writeStringNewLine(
            `{"${x.dbName()}","${x.dbType()}",${x.isPrimaryKey},${x.isAuto}},`)
    })
    writer.EndBlock()
    writer.EndBlock()
    writer.writeStringNewLine(`;`)
    writer.writeStringNewLine(`spec.update();`)
    writer.EndBlock()
    if(entry.tableType === 'DBArrayEntry') {
        writer.writeStringNewLine(`uint64 ${entry.className}::Index() { return __index; }`)
    }
}

export function handleClass(node: ts.ClassDeclaration, writer: CodeWriter) {
    // 1. Check if it's a table class
    if(!node.decorators) {
        return;
    }

    const className = node.name.getText(node.getSourceFile());
    let entry: Entry|undefined = undefined;
    node.decorators.forEach((x)=>{
        const ft = x.getText(x.getSourceFile());
        switch(ft) {
            case '@WorldTable':
            entry = new Entry(className,'world');
            break;
            case '@AuthTable':
            entry = new Entry(className,'auth');
            break;
            case '@CharactersTable':
            entry = new Entry(className,'characters');
            break;
            default:
        }
    });
    if(!entry) {
        return;
    }
    entries.push(entry);

    // 2. Figure out the type
    let tableType: TableType = TableTypes
        .find(x=>node.heritageClauses[0].getText().endsWith(x));
    if(!tableType) {
        throw new Error(
              `Database class ${node.name.getText()}`
            + ` does not extend either of ${TableTypes.join(' or ')}`
        )
    }
    entry.tableType = tableType

    // 3. Write default constructor
    const constructor = node.members.find((x)=>x.kind==ts.SyntaxKind.Constructor) as ts.ConstructorDeclaration;
    if(constructor!==undefined) {
        // add a default constructor if there is none already
        if(constructor.parameters.length>0) {
            writer.writeStringNewLine(`${entry.className}() = default;`)
        }
    }

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

        const type = member.type.getText(member.getSourceFile()) as FieldType;
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
        entry.fields.push(new Field(
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

    // 5. Statements
    writer.writeStringNewLine()
    if(entry.tableType === 'DBArrayEntry') {
        writer.writeStringNewLine(`uint64 Index();`)
        entry.fields.unshift(new Field('__index','uint64',true,'0',true,'0'))
    }
    writer.writeStringNewLine()

    // 6. Database Functions
    if(entry.tableType === 'DBEntry') {
        writer.writeStringNewLine(`void Load();`)
    } else {
        writer.writeStringNewLine(
              `static std::shared_ptr<DBContainer<${entry.className}>> Load`
            + `(${entry.pksNoIndex().map(x=>`${x.type} ${x.memoryName()}`).join(', ')});`
        )
    }
    if(entry.tableType === 'DBEntry') {
        writer.writeStringNewLine(
              `static TSArray<std::shared_ptr<${entry.className}>>`
            + ` LoadSQL(TSString sql);`
        );
    } else {
        writer.writeStringNewLine(
              `static std::shared_ptr<DBContainer<${entry.className}>>`
            + ` LoadSQL(TSString sql);`
        );
    }
    writer.writeStringNewLine(`static void DeleteSQL(TSString sql);`)
    writer.writeStringNewLine(`void Save();`)
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(`void Delete();`)
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(`void _Delete();`)
            break;
        default:
            throw new Error(`Invalid table type: ${entry.tableType}`)
    }
    writer.writeStringNewLine(`static void __CreateTable();`)
    writer.writeStringNewLine()
}

export function writeTableCreationFile(outDir: string) {
    const imports: string[] = []
    const classes: string[] = []
    let outdir = new WDirectory(outDir);
    outdir.iterate('RECURSE','FILES','FULL',node=>{
        if(!node.isFile() || !node.endsWith('.h')) return;
        let matches = node.toFile().readString()
            .match(/class +.+? *: *public *(DBEntry|DBArrayEntry)/g)
        if(!matches) return;
        matches
            .map(x=>x.match(/class +(.+?) *:/)[1])
            .forEach(x=>classes.push(x))
        imports.push(node.relativeTo(outdir.join('livescripts')).get())
    })

    const writer = new CodeWriter();
    imports.forEach(x=>{
        writer.writeStringNewLine(`#include "${x}"`)
    })
    writer.writeStringNewLine(`void WriteTables()`);
    writer.BeginBlock()
    classes.forEach(x=>{
        writer.writeStringNewLine(`${x}::__CreateTable();`);
    })
    writer.EndBlock()
    const tableFile = mpath(outDir,'livescripts','TableCreator.cpp');
    TRANSPILER_CHANGES.writeIfChanged(
        tableFile
      , writer.getText()
    )
}