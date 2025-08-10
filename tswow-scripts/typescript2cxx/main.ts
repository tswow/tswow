import { Run } from './compiler';
import { terminal } from './terminal';

declare var process: any;

try {
    new Run().run(Run.processFiles(process.argv), Run.processOptions(process.argv));
} catch (e) {
    if (e.message.indexOf(`Could not find a valid 'tsconfig.json'`) !== -1) {
        print();
    } else {
        if(!process.argv.includes('--silent')) {
            terminal.error(e.stack);
        } else {
            terminal.error(e.message);
        }
    }
    process.exit(-1);
}

function print() {
    console.log(`Version 1.0.1
    Syntax:   tsc-cxx [options] [file...]

    Examples: tsc-cxx hello.ts
              tsc-cxx tsconfig.json
              tsc-cxx

    Options:
     -varAsLet                                          Use all 'var' variables as 'let'.
     `);
}
