import ts = require("typescript");
import * as path from 'path';
import { InterfaceDeclaration } from "typescript";
import { CodeWriter } from "./codewriter";
import { TRANSPILER_CHANGES } from "./version";

type DBType = 'world'|'auth'|'characters'

const MethodTypes =
{
    'string': 0,
    'uint8': 1,
    'uint16': 2,
    'uint32': 3,
    'uint64': 4,
    'int8': 5,
    'int16': 6,
    'int32': 7,
    'int64': 8,
    'float': 9,
    'double': 10,
    'int': 11,
}

type FieldType = keyof typeof MethodTypes

class Field {
    name: string;
    type: FieldType;
    initialization: string;
    isPrimaryKey: boolean;

    sqlInitialization() {
        return this.type == 'string' ? `\\${this.initialization.slice(0,this.initialization.length-1)}\\"` : this.initialization
    }

    constructor(name: string, type: FieldType, isPrimaryKey: boolean, initialization: string) {
        this.name = name;
        this.type = type;
        this.initialization = initialization;
        this.isPrimaryKey = isPrimaryKey;
    }
}

class Entry {
    className: string;
    databaseType: DBType;
    fields: Field[] = []

    constructor(className: string, databaseType: DBType) {
        this.className = className;
        this.databaseType = databaseType;
    }

    get tableName() { return this.className.toLowerCase()}
}

let entries: Entry[] = [];
let baseClassMap: {[key:string]:string} = {}

export function handleClass(node: ts.ClassDeclaration, writer: CodeWriter) {
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

    node.members.forEach((memberRaw)=>{
        if(memberRaw.kind!==ts.SyntaxKind.PropertyDeclaration) {
            return;
        }

        const member = memberRaw as ts.PropertyDeclaration;

        let isField = false;
        let isPrimaryKey = false;
        if(member.decorators) {
            member.decorators.forEach((deco)=>{
                if(deco.getText(deco.getSourceFile())=='@Field') {
                    isField = true;
                }

                if(deco.getText(deco.getSourceFile())=='@PrimaryKey') {
                    isPrimaryKey = true;
                    isField = true;
                }
            });
        }

        if(!isField) {
            return;
        }

        const type = member.type.getText(member.getSourceFile()) as FieldType;
        if(!Object.keys(MethodTypes).includes(type)) {
            throw new Error(`Invalid type for database filed: ${type}`);
        }

        if(type=='string'&&isPrimaryKey) {
            throw new Error(`Strings cannot be primary keys (yet)`);
        }

        const name = member.name.getText(member.getSourceFile());
        if(!member.initializer) {
            throw new Error(`Database fields must be initialized (= something in the declaration)`);
        }
        const defValue = member.initializer.getText(member.getSourceFile());

        entry.fields.push(new Field(name,type,isPrimaryKey,defValue));
    });

    const pks = entry.fields.filter(x=>x.isPrimaryKey);

    if(pks.length===0) {
        throw new Error(`Database rows must have at least one primary key.`)
    }

    entries.push(entry);

    writer.writeString('\n\n    ');
    writer.writeString('TSString loadQuery()');
    writer.BeginBlock();
    writer.writeString(`return JSTR("SELECT * FROM \`${entry.tableName}\` WHERE `);
    writer.writeString(
        pks.map(x=>`\`${x.name}\` = ")+this->${x.name}+JSTR("`)
            .join(' AND '));

    writer.writeString(';");');
    writer.EndBlock();

    writer.writeString('\n    ');
    writer.writeString('TSString saveQuery()');
    writer.BeginBlock();
    writer.writeString(`return JSTR("INSERT INTO \`${entry.tableName}\` VALUES ( `);
    writer.writeString(
        entry.fields.map(x=>{
            let str = "";
            if(x.type==='string') {
                str+=`\\"") + this->${x.name} + JSTR("\\"`
            } else {
                str+=`") + this->${x.name} + JSTR("`;
            }
            return str;
        }).join(' , ')
    )
    writer.writeString(') ON DUPLICATE KEY UPDATE ');
    writer.writeString(
        entry.fields.map(x=>{
            let str =`\`${x.name}\` = `;
            if(x.type==='string') {
                str+='\\"'
            }
            str+=`") + this->${x.name} + JSTR("`

            if(x.type==='string') {
                str+='\\"';
            }

            return str;
        }).join(' , ')
    )

    writer.writeString(';");')
    writer.EndBlock();

    writer.writeString('\n');

    writer.writeString('    TSString removeQuery() ');
    writer.BeginBlock();
    writer.writeString(`return JSTR("DELETE FROM \`${entry.tableName}\` WHERE `);
    writer.writeString(
        pks.map(x=>`\`${x.name}\` = ")+this->${x.name}+JSTR("`)
            .join(' AND '));
    writer.writeString(';");');
    writer.EndBlock();

    const queryType = entry.databaseType == 'world' ? 'QueryWorld' :
        entry.databaseType == 'auth' ? 'QueryAuth' : 'QueryCharacters';
    writer.writeString(`void save() {${queryType}(saveQuery());}\n\n`);
    writer.writeString(`    void remove() {${queryType}(removeQuery());}\n\n`)

    writer.writeString(`    static TSString LoadQuery(TSString query)`)
    writer.BeginBlock();
    writer.writeStringNewLine(`return JSTR("SELECT * from ${entry.tableName} WHERE ") + query + JSTR(";");`)
    writer.EndBlock();

    writer.writeString(`\n    static TSArray<std::shared_ptr<${entry.className}>> Load(TSString query)`);
    writer.BeginBlock();
    writer.writeStringNewLine(`auto arr = TSArray<std::shared_ptr<${entry.className}>>{};`);
    writer.writeStringNewLine(`auto res = ${queryType}(LoadQuery(query));`)
    writer.writeStringNewLine(`while(res->GetRow())`)
    writer.BeginBlock();
    writer.writeStringNewLine(`auto obj = std::make_shared<${entry.className}>();`);
    entry.fields.forEach((v,i)=>{
        const resolveType = ()=> {
            switch(v.type) {
                case 'double': return 'GetDouble';
                case 'float': return 'GetFloat';
                case 'int8': return 'GetInt8';
                case 'int16': return 'GetInt16';
                case 'int32': return 'GetInt32';
                case 'int64': return 'GetInt64';
                case 'uint8': return 'GetUInt8';
                case 'uint16': return 'GetUInt16';
                case 'uint32': return 'GetUInt32';
                case 'uint64': return 'GetUInt64';
                case 'int': return 'GetInt32';
                case 'string': return 'GetString';
            }
        }
        writer.writeStringNewLine(`obj->${v.name} = res->${resolveType()}(${i});`)
    });

    writer.writeStringNewLine(`arr.push(obj);`);
    writer.EndBlock();
    writer.writeStringNewLine(`return arr;`);
    writer.EndBlock();

    const constructor = node.members.find((x)=>x.kind==ts.SyntaxKind.Constructor) as ts.ConstructorDeclaration;
    if(constructor!==undefined) {
        // add a default constructor if there is none already
        if(constructor.parameters.length>0) {
            const name = baseClassMap[entry.className];
            writer.writeStringNewLine(`${entry.className}() : ${name}() {}`)
        }
    }
}

export function setBaseClass(node: ts.ClassDeclaration | InterfaceDeclaration, cls: string) {
    if(!node.name) {
        return;
    }
    const nodename = node.name.getText(node.getSourceFile());

    baseClassMap[nodename] = cls;
}

export function writeIncludeTableCreator(writer: CodeWriter) {
    writer.writeStringNewLine('#include "TableCreator.h"')
}

export function writeTableCreationCall(writer: CodeWriter) {
    writer.writeStringNewLine('    WriteTables();');
}

const getReadSQLType = (field: Field)=>{
    switch(field.type) {
        case 'int': return 'INT(11)'
        case 'int8': return 'TINYINT(4)'
        case 'int16': return 'SMALLINT(6)'
        case 'int32': return 'INT(11)'
        case 'int64': return 'BIGINT(20)'
        case 'uint8': return 'TINYINT(3) UNSIGNED'
        case 'uint16': return 'SMALLINT(5) UNSIGNED'
        case 'uint32': return 'INT(10) UNSIGNED'
        case 'uint64': return 'BIGINT(20) UNSIGNED'
        case 'float': return 'FLOAT'
        case 'double': return 'DOUBLE'
        case 'string': return 'TEXT'
    }
}

const getWriteSQLType = (field: Field)=>{
    switch(field.type) {
        case 'int': return 'INT'
        case 'int8': return 'TINYINT'
        case 'int16': return 'SMALLINT'
        case 'int32': return 'INT'
        case 'int64': return 'BIGINT'
        case 'uint8': return 'TINYINT UNSIGNED'
        case 'uint16': return 'SMALLINT UNSIGNED'
        case 'uint32': return 'INT UNSIGNED'
        case 'uint64': return 'BIGINT UNSIGNED'
        case 'float': return 'FLOAT'
        case 'double': return 'DOUBLE'
        case 'string': return 'TEXT'
    }
}

export function writeTableCreationFile(outDir: string) {
    const writer = new CodeWriter();
    writer.writeStringNewLine('#include "TSDatabase.h"')
    writer.writeStringNewLine('#include <fstream>')
    writer.writeStringNewLine('#include <iostream>')
    writer.writeStringNewLine('#include <algorithm>')
    writer.writeStringNewLine('#include <string>')
    writer.writeStringNewLine('#include <cstdlib>')
    writer.writeStringNewLine(`#define COLUMN_NAME_INDEX 3`)
    writer.writeStringNewLine(`#define COLUMN_TYPE_INDEX 15`)

    writer.writeStringNewLine('');
    writer.writeString(`void ask(std::string msg)`)
    writer.BeginBlock();
    writer.writeStringNewLine(`std::cout << msg << ", this is a destructive operation.\\n";`);
    writer.EndBlock();
    writer.writeString('void WriteTables()')
    writer.BeginBlock();
    entries.forEach((entry)=>{
        writer.BeginBlock();
        writer.writeStringNewLine(`// ${entry.className}`)
        let dbid = entry.databaseType
              .slice(0,1).toUpperCase()
            + entry.databaseType.slice(1)

        writer.writeStringNewLine(`bool should_create = true;`)

        writer.writeStringNewLine(
            `auto db = ${dbid}DatabaseInfo()->Database().std_str();`)
        writer.writeString(
            `auto rows = QueryWorld(JSTR(`)
        writer.writeStringNewLine(
              `"SELECT * from \`information_schema\`.\`COLUMNS\``
            + ` WHERE \`TABLE_SCHEMA\`= \\""+ db + "\\"`
            + ` AND \`TABLE_NAME\` = \\"${entry.tableName}\\";"));`)

        writer.writeString(
            `if(rows->GetRow())`)
        writer.BeginBlock();
        writer.writeStringNewLine(`should_create = false;`);
        entry.fields.forEach((x,i)=>{
            writer.writeStringNewLine(`bool found_${x.name} = false;`);
        });

        writer.writeString('do ');
        writer.BeginBlock();
        writer.writeStringNewLine(
            `auto column = rows->GetString(COLUMN_NAME_INDEX).std_str();`)

        writer.writeStringNewLine(
              `auto was_pk = QueryWorld(JSTR(`
            + ` "SELECT * from \`information_schema\`.\`KEY_COLUMN_USAGE\``
            + ` WHERE \`CONSTRAINT_SCHEMA\` = \\"\"+db+\"\\"`
            + ` and \`TABLE_NAME\` = \\"${entry.tableName}\\"`
            + ` and \`COLUMN_NAME\` = \\"\"+column+\"\\"`
            + ` ;"))->GetRow();`);

        entry.fields.forEach((x,i)=>{
            if(i==0) writer.writeString(`if `)
            else writer.writeString(` else if `)

            writer.writeString(
                `(column == "${x.name}")`)
            writer.BeginBlock();

            writer.writeStringNewLine(
                `found_${x.name} = true;`);

            writer.writeStringNewLine(
                `auto type = rows->GetString(COLUMN_TYPE_INDEX).std_str();`);

            writer.writeStringNewLine(
                `for(auto & c: type) c = toupper((unsigned char)c);`
            );

            writer.writeString(
                `if (type != "${getReadSQLType(x)}")`)
            writer.BeginBlock();
            // mismatch + we're a string = we have to remove and add again
            if(x.type=='string') {
                writer.writeStringNewLine(`ask("${entry.tableName}:"+column+" changed type from "+type+" to ${x.type}");`);
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` DROP \`\"+column+\"\`;"));`)
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` ADD \`\"+column+\"\` TEXT;"));`)
            } else {
                writer.writeStringNewLine(`if (type == "TEXT")`)
                writer.BeginBlock();
                writer.writeStringNewLine(`ask("${entry.tableName}:"+column+" changed type from "+type+" to ${x.type}");`);
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` DROP \`\"+column+\"\`;"));`)
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` ADD \`\"+column+\"\` ${getWriteSQLType(x)};"));`)
                writer.EndBlock(false);
                writer.writeString(` else `);
                writer.BeginBlock();

                writer.writeString(`if (was_pk) `)
                writer.BeginBlock();
                writer.writeStringNewLine(`ask("${entry.tableName}:"+column+" changed type from "+type+" to ${x.type} and was a primary key (whole db will be destroyed)");`);
                writer.writeStringNewLine(`should_create = true;`);
                writer.writeStringNewLine(`break;`)
                writer.EndBlock();
                writer.writeStringNewLine(`ask("${entry.tableName}:"+column+" changed type from "+type+" to ${x.type}");`);
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\``
                    + ` MODIFY \`${x.name}\` ${getWriteSQLType(x)}`
                    + `;"));`);
                writer.EndBlock();
            }

            writer.EndBlock();
            writer.EndBlock(true);
        });

        writer.writeString(
            ' else ')
        writer.BeginBlock();
        writer.writeStringNewLine(`ask("${entry.tableName}:"+column+" was removed");`);
        writer.writeStringNewLine(
            `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` DROP \`"+rows->GetString(COLUMN_NAME_INDEX)+"\`;"));`)
        writer.EndBlock();


        writer.EndBlock(true);
        writer.writeStringNewLine(
            ' while(rows->GetRow());')
        entry.fields.forEach((x,i)=>{
            writer.writeString(
                `if( !should_create && !found_${x.name} )`);
            writer.BeginBlock();
            if(x.isPrimaryKey) {
                writer.writeStringNewLine(`ask("${entry.tableName}: new primary key ${x.name} missing, need to rebuild database.");`);
                writer.writeStringNewLine(`should_create = true;`);
            } else {
                writer.writeStringNewLine(
                    `Query${dbid}(JSTR("ALTER TABLE \`${entry.tableName}\` ADD \`${x.name}\` ${getWriteSQLType(x)};"));`)
            }
            writer.EndBlock();
        });

        writer.EndBlock();
        writer.writeString(
            `if (should_create)`
        )
        writer.BeginBlock();
        writer.writeStringNewLine(`Query${dbid}(JSTR("DROP TABLE IF EXISTS \`${entry.tableName}\`;"));`)
        writer.writeString(
            `Query${dbid}(JSTR("CREATE TABLE \`${entry.tableName}\` (`);
        entry.fields.forEach((field,index,arr)=>{
            writer.writeString(
                `\`${field.name}\` ${getWriteSQLType(field)}, `);
        });
        writer.writeString('PRIMARY KEY (')
        entry.fields.filter(x=>x.isPrimaryKey).forEach((field,i,arr)=>{
            writer.writeString(`${field.name}`)
            if(i<arr.length-1) {
                writer.writeString(',');
            }
        });
        writer.writeStringNewLine('));"));');
        writer.EndBlock();
        entry.fields.filter(x=>!x.isPrimaryKey).forEach(x=>{
            writer.writeStringNewLine(
                `Query${dbid}(JSTR("UPDATE \`${entry.tableName}\` SET ${x.name} = ${x.sqlInitialization()} WHERE ${x.name} IS NULL;"));`)
        });
        writer.EndBlock();
    });

    writer.EndBlock();

    const tableFile = path.join(outDir,'livescripts','TableCreator.cpp');
    TRANSPILER_CHANGES.writeIfChanged(
        tableFile
      , writer.getText()
    )
}