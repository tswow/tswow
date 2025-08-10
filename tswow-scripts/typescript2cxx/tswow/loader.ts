import * as fs from 'fs';
import { WFile } from '../../util/FileTree';
import { ipaths } from '../../util/Paths';
import { CodeWriter } from "../codewriter";
import { TRANSPILER_CHANGES } from '../version';
import path = require('path');

const datasetName = process.argv.find(x=>x.startsWith('--datasetName=')).substring('--datasetName='.length)

export function writeLoader(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine(`#include "TSAll.h"`)
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

    const inlinePath = new WFile(livescripts).join('build',datasetName,'inline','__inline_main.ts');

    const cpp = new CodeWriter();
    if(mainExists) {
        cpp.writeStringNewLine(`#include "${mainHeader}"`)
    }

    if(inlinePath.exists()) {
        // Check if the inline header was compiled to C++
        const inlineHeaderPath = path.join(outDir, '..', 'inline', '__inline_main.h');
        if(fs.existsSync(inlineHeaderPath)) {
            cpp.writeStringNewLine(`#include "../inline/__inline_main.h"`)
        }
    }
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
    if(mainExists) {
        cpp.writeStringNewLine(`Main(handlers);`);
    }

    if(inlinePath.exists()) {
        // Check if the inline header was compiled to C++
        const inlineHeaderPath = path.join(outDir, '..', 'inline', '__inline_main.h');
        if(fs.existsSync(inlineHeaderPath)) {
            cpp.writeStringNewLine('__InlineMain(handlers);');
        }
    }
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
