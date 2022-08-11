import { mpath } from "../../util/FileSystem";
import { WDirectory } from "../../util/FileTree";
import { ORMClass, parseORMClass } from "../../util/ORMClass";
import { CodeWriter } from "../codewriter";
import { TRANSPILER_CHANGES } from "../version";
import ts = require("typescript");

let entries: ORMClass[] = [];

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

    const deleteStmnt = () => {
        writer.writeStringNewLine()
        writer.writeStringNewLine(
            `static ${statementName} DeleteStatement = ${queryName}(`)
        writer.IncreaseIntent()
        writer.writeStringNewLine(`" DELETE FROM \`${entry.tableName}\`"`)
        writer.writeStringNewLine(`" WHERE "`)
        writer.writeStringNewLine(
            `" ${entry.pks().map(x=>`\`${x.dbName()}\` = ?`).join(' AND ')}"`)
        writer.DecreaseIntent()
        writer.writeStringNewLine(`);`);
    }

    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(`void ${entry.className}::Load()`)
            writer.BeginBlock()
            writer.writeStringNewLine(`static ${statementName} LoadStatement = ${entry.prepareStatement(4,'c++',entry.loadStatement)};`)
            writer.writeString(
                `auto res = LoadStatement.Create()`)
            writer.writeString('\n'+entry.loadPks(8,false,true,'c++'));
            writer.writeStringNewLine(`        ->Send();`)
            writer.writeStringNewLine('')
            writer.writeString(`if(!res->GetRow()) return;`)
            writer.writeStringNewLine('')
            writer.writeString('\n'+entry.loadFromRes(4,'this','res','c++'));
            writer.EndBlock();
            writer.writeStringNewLine()
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(
                    `std::shared_ptr<DBContainer<${entry.className}>> ${entry.className}::Load`
                + `(${entry.pksNoIndex().map(x=>`${x.type} ${x.memoryName()}`).join(', ')})`
            )
            writer.BeginBlock()
            writer.writeStringNewLine(`static ${statementName} LoadStatement = ${entry.prepareStatement(4,'c++',entry.loadStatement)};`)
            writer.writeString(`auto res = LoadStatement.Create()`)
            writer.writeString('\n'+entry.loadPks(8,false,false,'c++'))
            writer.writeStringNewLine(`        ->Send();`)
            writer.writeStringNewLine(``);
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
            writer.writeStringNewLine(entry.loadFromRes(8,'value','res','c++'))
            writer.writeStringNewLine(`container->Add(value);`)
            writer.EndBlock()
            writer.writeStringNewLine(`return container;`)
            writer.EndBlock()
            break;
        default: throw new Error(`Invalid TableType: ${entry.tableType}`)
    }

    // LoadSQL
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeStringNewLine(
                `TSArray<std::shared_ptr<${entry.className}>>`
                + ` ${entry.className}::LoadSQL(std::string const& sql)`
            );
            writer.BeginBlock()
            writer.writeStringNewLine(`auto res = ${entry.sqlQuery(4,'sql','c++',entry.loadSql)};`)
            writer.writeStringNewLine(
                  `TSArray<std::shared_ptr<${entry.className}>> arr`
                + ` = TSArray<std::shared_ptr<${entry.className}>>();`
            )

            writer.writeStringNewLine(`while(res->GetRow())`)
            writer.BeginBlock()
            writer.writeString(`std::shared_ptr<${entry.className}> value = std::make_shared<${entry.className}>();`)
            writer.writeStringNewLine('\n'+entry.loadFromRes(8,'value','res','c++'))
            writer.writeStringNewLine('arr.push(value);');
            writer.EndBlock()
            writer.writeStringNewLine(`return arr;`)
            writer.EndBlock()
            break;
        case 'DBArrayEntry':
            break;
        default: throw new Error(`Invalid TableType: ${entry.tableType}`)
    }

    // DeleteSQL
    writer.writeStringNewLine(`void ${entry.className}::DeleteSQL(std::string const& sql)`)
    writer.BeginBlock()
    writer.writeStringNewLine(`Query${entry.dbCallName()}(`)
    writer.IncreaseIntent()
    writer.writeStringNewLine(`" DELETE FROM \`${entry.tableName}\`"`)
    writer.writeStringNewLine(`" " + sql +`)
    writer.writeStringNewLine(`";"`)
    writer.DecreaseIntent()
    writer.writeStringNewLine(`);`)
    writer.EndBlock()

    // Save
    writer.writeStringNewLine()
    writer.writeStringNewLine(`void ${entry.className}::Save()`)
    writer.BeginBlock()
    writer.writeStringNewLine(`static ${statementName} SaveStatement = ${entry.prepareStatement(4,'c++',entry.saveStatement)};`)
    switch(entry.tableType) {
        case 'DBEntry':
            writer.writeString(`SaveStatement->Create()`)
            writer.writeString('\n'+entry.saveFields(8,'c++'))
            writer.writeStringNewLine(`        ->Send();`)
            writer.EndBlock()
            break;
        case 'DBArrayEntry':
            writer.writeStringNewLine(`if(this->__index == 0)`)
            writer.BeginBlock()
            writer.writeStringNewLine(
                `auto con = Get${entry.dbCallName()}DBConnection();`
            )
            writer.writeString(`SaveStatement->Create()`);
            writer.writeString('\n'+entry.saveFields(12,'c++'))
            writer.writeStringNewLine(`            ->Send(con);`);
            writer.writeStringNewLine(
                `auto res = con->Query("SELECT LAST_INSERT_ID();");`)
            writer.writeStringNewLine(`res->GetRow();`)
            writer.writeStringNewLine(`this->__index = res->GetUInt64(0);`)
            writer.writeStringNewLine(`con->Unlock();`);
            writer.EndBlock()
            writer.writeStringNewLine(`else`)
            writer.BeginBlock()
            writer.writeString(`SaveStatement->Create()`);
            writer.writeString('\n'+entry.saveFields(12,'c++'))
            writer.writeStringNewLine(`            ->Send();`);
            writer.EndBlock()
            writer.EndBlock();
            break;
        default: throw new Error(`Invalid TableType: ${entry.tableType}`)
    }

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
    writer.writeStringNewLine(`static ${statementName} DeleteStatement = ${entry.prepareStatement(4,'c++',entry.deleteStatement)};`)
    writer.writeString(`DeleteStatement->Create()`)
    writer.writeString(`\n${entry.loadPks(8,true,true,'c++')}`)
    writer.writeStringNewLine(`        ->Send();`)
    writer.EndBlock()

    // __CreateTable
    writer.writeStringNewLine()
    writer.writeStringNewLine(`void ${entry.className}::__CreateTable()`)
    writer.BeginBlock()
    writer.writeString(entry.createDatabaseSpec('c++')+';')
    writer.EndBlock()
    if(entry.tableType === 'DBArrayEntry') {
        writer.writeStringNewLine(`uint64 ${entry.className}::Index() { return __index; }`)
    }
}

export function handleClass(node: ts.ClassDeclaration, writer: CodeWriter) {
    let entry = parseORMClass(node);
    if(!entry) {
        return;
    }
    entries.push(entry);

    // 3. Write default constructor
    const constructor = node.members.find((x)=>x.kind==ts.SyntaxKind.Constructor) as ts.ConstructorDeclaration;
    if(constructor!==undefined) {
        // add a default constructor if there is none already
        if(constructor.parameters.length>0) {
            writer.writeStringNewLine(`${entry.className}() = default;`)
        }
    }

    // 5. Statements
    writer.writeStringNewLine()
    if(entry.tableType === 'DBArrayEntry') {
        writer.writeStringNewLine(`uint64 Index();`)
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
            + ` LoadSQL(std::string const& sql);`
        );
    } else {
        writer.writeStringNewLine(
              `static std::shared_ptr<DBContainer<${entry.className}>>`
            + ` LoadSQL(std::string const& sql);`
        );
    }
    writer.writeStringNewLine(`static void DeleteSQL(std::string const& sql);`)
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