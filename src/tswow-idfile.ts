import * as fs from 'fs';
import * as path from 'path';
import { CodeWriter } from "./codewriter";

export function writeIdFile(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine("#pragma once");
    header.writeStringNewLine('#include <cstdint>')
    header.writeStringNewLine('uint32_t ModID();')
    header.writeStringNewLine('void SetID(uint32_t newId);')
    const headerPath = path.join(outDir,'scripts','ModID.h');
    fs.writeFileSync(headerPath,header.getText());

    const cpp = new CodeWriter();
    cpp.writeStringNewLine('uint32_t id = 0;');
    cpp.writeStringNewLine('void SetID(uint32_t newId){id = newId;}');
    cpp.writeStringNewLine('uint32_t ModID(){return id;}')

    const cppPath = path.join(outDir,'scripts','ModID.cpp');
    fs.writeFileSync(cppPath,cpp.getText());
}