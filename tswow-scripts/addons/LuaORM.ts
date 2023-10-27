import * as ts from 'typescript';
import { CompilerOptions, EmitHost, Plugin } from "typescript-to-lua";
import { EmitFile } from 'typescript-to-lua/dist/transpilation/utils';
import { WDirectory } from '../util/FileTree';
import { parseORMClass } from '../util/ORMClass';

export const LuaORM: Plugin = {
    beforeEmit(program: ts.Program, options: CompilerOptions, emitHost: EmitHost, result: EmitFile[]) {
        void program;
        void options;
        void emitHost;
    
        let databaseFile = ``
        result.forEach(file => {
            if(!file.sourceFiles) {
                return;
            }

            file.sourceFiles.forEach(source=>{
                source.getChildAt(0).getChildren().forEach(child => {
                    if(child.kind !== ts.SyntaxKind.ClassDeclaration) {
                        return;
                    }
                    let cls = parseORMClass(child as ts.ClassDeclaration);
                    if(!cls) {
                        return;
                    }

                    let index = file.code.lastIndexOf('return ____exports')
                    let suffix = ''
                    if(index > 0) {
                        suffix = file.code.slice(index);
                        file.code = file.code.slice(0,index);
                    }

                    file.code += `\n\n\n-- ${cls.className} ORM Code\n`

                    // CreateTable
                    file.code += cls.createDatabaseSpec('lua') + '\n'

                    // Load
                    const loadVar = `__${cls.className}__loadStatement`
                    file.code += `local ${loadVar} = ` + cls.prepareStatement(0,'lua',cls.loadStatement)
                    switch(cls.tableType) {
                        case 'DBEntry':
                            file.code += `function ${cls.className}.prototype.Load(self)\n`
                            file.code += `    local res = ${loadVar}:Create()\n`
                            file.code += cls.loadPks(8,false,true,'lua')
                            file.code += `        :Send()\n`
                            file.code += '    if not res:GetRow() then return end\n'
                            file.code += cls.loadFromRes(4,'self','res','lua')
                            break;
                        case 'DBArrayEntry':
                            file.code += `function ${cls.className}.Load(${cls.pksNoIndex().map(x=>x.memoryName()).join(',')})\n`
                            file.code += `    local res = ${loadVar}:Create()\n`
                            file.code += cls.loadPks(8,false,false,'lua')
                            file.code += `        :Send()\n`

                            file.code += `    local container = CreateDBContainer()\n`
                            file.code += `    while(res:GetRow()) do\n`
                            file.code += `        value = ____lualib.__TS__New(${cls.className})\n`
                            file.code += cls.loadFromRes(8,'value','res','lua')
                            // @alsoin LuaORM.ts
                            file.code += `        container:__Add(value)\n`
                            file.code += `    end\n`
                            file.code += `    return container\n`
                            break;
                    }
                    file.code += 'end\n'

                    // LoadSQL
                    switch(cls.tableType) {
                        case 'DBEntry':
                            file.code += `function ${cls.className}.LoadSQL(sql)\n`
                            file.code += '    local arr = {}\n'
                            file.code += '    local res = ' + cls.sqlQuery(4,'sql','lua',cls.loadSql)
                            file.code += `    while(res:GetRow()) do\n`
                            file.code += `        local value = ____lualib.__TS__New(${cls.className})\n`
                            file.code += cls.loadFromRes(8,'value','res','lua')
                            file.code += `        arr[#arr + 1] = value`
                            file.code += `    end\n`
                            file.code += `    return arr\n`
                            file.code += `end\n`
                            break;
                        case 'DBArrayEntry':
                            // no loadsql for array entries, it makes little sense
                            break;
                    }

                    // Save
                    const saveVar = `__${cls.className}__saveStatement`
                    file.code += `local ${saveVar} = ` + cls.prepareStatement(0,'lua',cls.saveStatement)
                    file.code += `function ${cls.className}.prototype.Save(self)\n`
                    switch(cls.tableType) {
                        case 'DBEntry':
                            file.code += `    ${saveVar}:Create()\n`
                            file.code += cls.saveFields(8,'lua')
                            file.code += `        :Send()\n`
                            file.code += 'end\n'
                            break;
                        case 'DBArrayEntry':
                            file.code += `    if self.__index == 0 then\n`
                            file.code += `        local con = Get${cls.capitalizedDbType()}DBConnection()\n`
                            file.code += `        ${saveVar}:Create()\n`
                            file.code += cls.saveFields(12,'lua')
                            file.code += `            :Send(con)\n`
                            file.code += `        local res = con:Query("SELECT LAST_INSERT_ID();")\n`
                            file.code += `        res:GetRow();\n`
                            file.code += `        self.__index = res:GetUInt64(0);\n`
                            file.code += `        con:Unlock();\n`
                            file.code += `    else\n`
                            file.code += `        ${saveVar}:Create()\n`
                            file.code += cls.saveFields(12,'lua')
                            file.code += `            :Send()\n`
                            file.code += `    end\n`
                            file.code += `end\n`
                            break;
                    }

                    // Delete
                    const deleteVar = `__${cls.className}__deleteStatement`
                    file.code += `local ${deleteVar} = ` + cls.prepareStatement(0,'lua',cls.deleteStatement)
                    switch(cls.tableType)
                    {
                        case 'DBEntry':
                            file.code += `function ${cls.className}.prototype.Delete(self)\n`
                            break;
                        case 'DBArrayEntry':
                            file.code += `function ${cls.className}.prototype._Delete(self)\n`
                            break;
                    }
                    file.code += `    ${deleteVar}:Create()\n`
                    file.code += cls.loadPks(8,true,true,'lua')
                    file.code += `        :Send()\n`
                    file.code += `end\n`

                    // DeleteSQL
                    switch(cls.tableType) {
                        case 'DBEntry':
                            file.code += `function ${cls.className}.DeleteSQL(sql)\n`
                            file.code += `    ${cls.sqlQuery(4,'sql','lua',cls.deleteSql)}`
                            file.code += `end\n`
                            break;
                        case 'DBArrayEntry':
                            break;
                    }
                    file.code += suffix;

                })
            })
        });

        let dbpath = new WDirectory(options.outDir).join('__create_tables.lua')
        dbpath.toFile().write(databaseFile);
    },
} 