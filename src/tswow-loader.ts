import * as fs from 'fs';
import { CodeWriter } from "./codewriter";
import { onMD5Changed } from './version';
import path = require('path');

export function writeLoader(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine(`void WritePackets();`)
    header.writeStringNewLine(`void WriteTables();`)
    header.writeStringNewLine(`extern "C"`)
    header.BeginBlock()
    let exp = process.platform === 'win32' ? '__declspec(dllexport)' : '__attribute__((visibility("default")))'
    header.writeStringNewLine(`${exp} char const* GetScriptModuleRevisionHash();`);
    header.writeStringNewLine(`${exp} void AddTSScripts(TSEventHandlers* handlers);`);
    header.writeStringNewLine(`${exp} void AddScripts();`);
    header.writeStringNewLine(`${exp} char const* GetScriptModule();`);
    header.writeStringNewLine(`${exp} char const* GetBuildDirective();`);
    header.EndBlock()

    const headerText = header.getText()
    const headerPath = path.join(outDir,'livescripts','TCLoader.h')
    onMD5Changed(headerPath,headerText,()=>{
        fs.writeFileSync(headerPath,headerText);
    })

    const mainHeader = `${path.basename(process.cwd())}-scripts.h`
    const livescripts = path.join(process.cwd(),'livescripts');
    const loc1 = path.join(livescripts,mainHeader)
    const loc2 = path.join(livescripts,'build','cpp','livescripts',mainHeader)
    const mainExists = fs.existsSync(loc1) || fs.existsSync(loc2)
    const inlinePath = path.join(livescripts,'build','inline');

    let inlines: string[] = fs.existsSync(inlinePath)
        ?  fs.readdirSync(inlinePath)
            .map(x=>x.replace(/\.[^/.]+$/, ""))
        : []

    const cpp = new CodeWriter();
    if(mainExists) {
        cpp.writeStringNewLine(`#include "${mainHeader}"`)
    }
    inlines.forEach(x=>{
        cpp.writeStringNewLine(`#include "build/inline/${x}.h"`)
    })
    cpp.writeStringNewLine(`#include "TCLoader.h"`);
    cpp.writeStringNewLine(`char const* GetScriptModuleRevisionHash()`)
    cpp.BeginBlock();
    cpp.writeStringNewLine(
          `return `
        + `"${fs.readFileSync('../../bin/revision/trinitycore')}";`)
    cpp.EndBlock();

    cpp.writeStringNewLine(`void AddTSScripts(TSEventHandlers* handlers)`);
    cpp.BeginBlock();
    cpp.writeStringNewLine(`WriteTables();`);
    cpp.writeStringNewLine(`SetID(handlers->m_modid);`)
    cpp.writeStringNewLine(`WritePackets();`);
    if(mainExists) {
        cpp.writeStringNewLine(`Main(handlers);`);
    }

    inlines.forEach(x=>{
        cpp.writeStringNewLine(`__inline_${x}(handlers);`)
    })

    cpp.EndBlock();
    cpp.writeStringNewLine(`void AddScripts(){}`);
    cpp.writeStringNewLine(`char const* GetScriptModule()`);
    cpp.BeginBlock();
    cpp.writeStringNewLine(`return "${path.basename(process.cwd())}";`);
    cpp.EndBlock();

    cpp.writeStringNewLine(`char const* GetBuildDirective()`);
    cpp.BeginBlock();
    cpp.writeStringNewLine(`return "Release";`); // <-- ??
    cpp.EndBlock();

    const cppText = cpp.getText()
    const cppPath = path.join(outDir,'livescripts','TCLoader.cpp')
    onMD5Changed(cppPath,cppText,()=>{
        fs.writeFileSync(cppPath,cppText);
    })
}