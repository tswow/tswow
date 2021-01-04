import ts = require("typescript");
import { CodeWriter } from "./codewriter";
import * as fs from 'fs';
import * as path from 'path';

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
}

let entries: Entry[] = [];

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
    writer.writeString(`return JSTR("SELECT * FROM \`${entry.className}\` WHERE `);

    writer.writeString(
        pks.map(x=>`\`${x.name}\` = ")+this->${x.name}+JSTR("`)
            .join(' AND '));

    writer.writeString(';");');
    writer.EndBlock();

    writer.writeString('\n    ');
    writer.writeString('TSString saveQuery()');
    writer.BeginBlock();
    writer.writeString(`return JSTR("INSERT INTO \`${entry.className}\` VALUES ( `);
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

    writer.writeString('    void save() {QueryWorld(saveQuery());}\n\n');

    writer.writeString('    bool load()');
    writer.BeginBlock();
    switch(entry.databaseType) {
        case 'world':
            writer.writeStringNewLine('auto res = QueryWorld(loadQuery());');
            break;
        case 'auth':
            writer.writeStringNewLine('auto res = QueryAuth(loadQuery());');
            break;
        case 'characters':
            writer.writeStringNewLine('auto res = QueryCharacters(loadQuery());');
            break;
    }

    writer.writeStringNewLine('if(!res->IsValid()) return false;');
    writer.writeStringNewLine('if(!res->GetRow()) return false;');
    entry.fields.forEach((x,i)=>{
        const resolveType = ()=> {
            switch(x.type) {
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
        writer.writeStringNewLine(`this->${x.name} = res->${resolveType()}(${i});`);
    })
    writer.writeStringNewLine('return true;');

    writer.EndBlock();
}

export function writeIncludeTableCreator(writer: CodeWriter) {
    writer.writeStringNewLine('#include "TableCreator.h"')
}

export function writeTableCreationCall(writer: CodeWriter) {
    writer.writeStringNewLine('    WriteTables();');
}

export function writeTableCreationFile(outDir: string) {
    const writer = new CodeWriter();
    writer.writeString('void WriteTables()')
    writer.BeginBlock();
    entries.forEach((entry)=>{
        switch(entry.databaseType) {
            case 'world':
                writer.writeString('QueryWorld(JSTR("');
                break;
            case 'auth':
                writer.writeString('QueryAuth(JSTR("');
                break;
            case 'characters':
                writer.writeString('QueryCharacters(JSTR("');
                break;
        }

        writer.writeString(`CREATE TABLE IF NOT EXISTS \`${entry.className}\` (`);

        entry.fields.forEach((field,index,arr)=>{
            const getSQLType = ()=>{
                console.log(field.type);
                switch(field.type) {
                    case 'int': return 'INT NOT NULL'
                    case 'int8': return 'TINYINT NOT NULL'
                    case 'int16': return 'SMALLINT NOT NULL'
                    case 'int32': return 'INT NOT NULL'
                    case 'int64': return 'BIGINT NOT NULL'
                    case 'uint8': return 'UNSIGNED TINYINT NOT NULL'
                    case 'uint16': return 'UNSIGNED SMALLINT NOT NULL'
                    case 'uint32': return 'UNSIGNED INT NOT NULL'
                    case 'uint64': return 'UNSIGNED BIGINT NOT NULL'
                    case 'float': return 'FLOAT NOT NULL'
                    case 'double': return 'DOUBLE NOT NULL'
                    case 'string': return 'TEXT'
                }
            }
            writer.writeString(`\`${field.name}\` ${getSQLType()}, `);
        });

        writer.writeString('PRIMARY KEY (')
        entry.fields.filter(x=>x.isPrimaryKey).forEach((field,i,arr)=>{
            writer.writeString(`${field.name}`)
            if(i<arr.length-1) {
                writer.writeString(',');
            }
        });
        writer.writeString('));"));');
    });

    writer.EndBlock();

    const tableFile = path.join(outDir,'scripts','TableCreator.h');
    fs.writeFileSync(tableFile,writer.getText());
}