import * as path from 'path';
import { CodeWriter } from "./codewriter";
import { TRANSPILER_CHANGES } from './version';

export function writeIdFile(outDir: string) {
    const header = new CodeWriter();
    header.writeStringNewLine("#pragma once");
    header.writeStringNewLine('#include <cstdint>')
    header.writeStringNewLine('uint32_t ModID();')
    header.writeStringNewLine('void SetID(uint32_t newId);')
    TRANSPILER_CHANGES.writeIfChanged(
          path.join(outDir,'livescripts','ModID.h')
        , header.getText()
    );

    const cpp = new CodeWriter();
    cpp.writeStringNewLine('#include "ModID.h"');
    cpp.writeStringNewLine('uint32_t id = 0;');
    cpp.writeStringNewLine('void SetID(uint32_t newId){id = newId;}');
    cpp.writeStringNewLine('uint32_t ModID(){return id;}')

    TRANSPILER_CHANGES.writeIfChanged(
          path.join(outDir,'livescripts','ModID.cpp')
        , cpp.getText()
    )
}