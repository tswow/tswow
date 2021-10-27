import * as fs from 'fs';
import * as path from 'path';
import { CodeWriter } from "./codewriter";
import { onMD5Changed } from './version';

export function writeIdFile(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine("#pragma once");
    header.writeStringNewLine('#include <cstdint>')
    header.writeStringNewLine('uint32_t ModID();')
    header.writeStringNewLine('void SetID(uint32_t newId);')
    const headerPath = path.join(outDir,'livescripts','ModID.h');

    let htext = header.getText()
    onMD5Changed(headerPath,htext,()=>{
        fs.writeFileSync(headerPath,header.getText());
    })

    const cpp = new CodeWriter();
    cpp.writeStringNewLine('#include "ModID.h"');
    cpp.writeStringNewLine('uint32_t id = 0;');
    cpp.writeStringNewLine('void SetID(uint32_t newId){id = newId;}');
    cpp.writeStringNewLine('uint32_t ModID(){return id;}')

    const cppPath = path.join(outDir,'livescripts','ModID.cpp');

    let text = cpp.getText();
    onMD5Changed(cppPath,text,()=>{
        fs.writeFileSync(cppPath,cpp.getText());
    })
}