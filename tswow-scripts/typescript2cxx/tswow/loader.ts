import * as fs from 'fs';
import { WDirectory, WNode } from '../../util/FileTree';
import { ipaths } from '../../util/Paths';
import { CodeWriter } from "../codewriter";
import { TRANSPILER_CHANGES } from '../version';
import path = require('path');

const datasetName = process.argv.find(x=>x.startsWith('--datasetName=')).substring('--datasetName='.length)

export function writeLoader(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine(`#include "TSAll.h"`)
    header.writeStringNewLine(`#include "ModID.h"`)
    header.writeStringNewLine(`void WritePackets();`)
    header.writeStringNewLine(`void WriteTables();`)
    header.writeStringNewLine(`extern "C"`)
    header.BeginBlock()
    let exp = process.platform === 'win32' ? '__declspec(dllexport)' : '__attribute__((visibility("default")))'
    header.writeStringNewLine(`${exp} char const* GetScriptModuleRevisionHash();`);
    header.writeStringNewLine(`${exp} void AddTSScripts(TSEvents* handlers);`);
    header.writeStringNewLine(`${exp} void AddScripts();`);
    header.writeStringNewLine(`${exp} char const* GetScriptModule();`);
    header.writeStringNewLine(`${exp} char const* GetBuildDirective();`);
    header.EndBlock()

    TRANSPILER_CHANGES.writeIfChanged(
          path.join(outDir,'livescripts','TCLoader.h')
        , header.getText()
    )

    const mainHeader = `livescripts.h`
    const livescripts = path.join(process.cwd(),'livescripts');
    const loc1 = path.join(livescripts,mainHeader)
    const loc2 = path.join(livescripts,'build',datasetName,'cpp','livescripts',mainHeader)
    const mainExists = fs.existsSync(loc1) || fs.existsSync(loc2)
    const inlinePath = path.join(livescripts,'build',datasetName,'inline');

    let inlines: WNode[] = []
    new WDirectory(inlinePath).iterate('RECURSE','FILES','FULL',node=>{
       inlines.push(node.withExtension('').relativeTo(inlinePath));
    })

    const cpp = new CodeWriter();
    if(mainExists) {
        cpp.writeStringNewLine(`#include "${mainHeader}"`)
    }
    inlines.forEach(x=>{
        cpp.writeStringNewLine(`#include "build/${datasetName}/inline/${x}.h"`)
    })
    cpp.writeStringNewLine(`#include "TCLoader.h"`);
    cpp.writeStringNewLine(`char const* GetScriptModuleRevisionHash()`)
    cpp.BeginBlock();
    cpp.writeStringNewLine(
          `return `
        + `"${ipaths.bin.revisions.trinitycore.readString()}";`)
    cpp.EndBlock();

    cpp.writeStringNewLine(`void AddTSScripts(TSEvents* handlers)`);
    cpp.BeginBlock();
    cpp.writeStringNewLine(`WriteTables();`);
    cpp.writeStringNewLine(`SetID(handlers->m_modid);`)
    cpp.writeStringNewLine(`WritePackets();`);
    if(mainExists) {
        cpp.writeStringNewLine(`Main(handlers);`);
    }

    inlines.forEach(x=>{
        cpp.writeStringNewLine(`__inline_${x.split('/').join('_').split('\\').join('_').split('.').join('_').split('-').join('_')}(handlers);`)
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

    TRANSPILER_CHANGES.writeIfChanged(
        path.join(outDir,'livescripts','TCLoader.cpp')
      , cpp.getText()
    )
}