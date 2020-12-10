/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { ChildProcessWithoutNullStreams } from 'child_process';
import { mpath, wfs } from './FileSystem';
import { wsys } from './System';
import { term } from './Terminal';
import * as chokidar from 'chokidar';

function defaultError(err: Error) {
    term.error(`TSC Error: ${err.name} ${err.message}`);
    return false;
}

let removes : {[key:string]:string[]} = {}
setInterval(()=>{
    for(let key in removes) {
        if(!wfs.exists(key)) {
            continue;
        }
        const json = JSON.parse(wfs.read(key));
        for(const file of removes[key]) {
            delete json.program.fileInfos[file];
            json.program.semanticDiagnosticsPerFile = 
                json.program.semanticDiagnosticsPerFile.filter((x: string)=>
                    x !== file
            );
        }
        wfs.write(key,JSON.stringify(json,null,4));
    }
    removes = {};
},200);

/**
 * Wrapper around a "tsc --w" process that also cleans up removed source files
 */
export class TypeScriptWatcher {
    process: ChildProcessWithoutNullStreams;
    private killed = false;
    private chokidar: chokidar.FSWatcher | undefined;

    constructor(path: string, showOutput: boolean = true, onError: (error: Error) => boolean = defaultError) {
        term.log(`TSC Watching ${path}`);
        this.process = wsys.spawnIn(path, 'node', [wfs.absPath(mpath('node_modules', 'typescript', 'lib', 'tsc.js')), '--w']);

        this.process.on('error', (error) => {
            term.pipe('red', [error.name, error.message]);
            onError(error);
        });

        this.process.stdout.on('data', (data) => {
            if (showOutput) {
                term.log(data.toString());
            }
        });

        const cpath = mpath(path, 'tsconfig.json');
        if (!wfs.exists(cpath)) {
            return;
        }
        const tsconfig = JSON.parse(wfs.read(cpath));
        if (tsconfig.compilerOptions === undefined
            || tsconfig.compilerOptions.outDir === undefined) {
                return;
        }

        const outDir = tsconfig.compilerOptions.outDir;
        const buildinfoPath = mpath(path,outDir,'tsconfig.tsbuildinfo');

        this.chokidar = chokidar.watch(path).on('unlink', (p) => {
            if(!p.endsWith('.ts')||p.endsWith('.d.ts')) {
                return;
            }
            const relPath = wfs.relative(path, p);
            console.log(relPath);
            let baseFilePath = mpath(path, outDir, relPath);
            baseFilePath = baseFilePath.substring(0,baseFilePath.length-3);
            wfs.remove(baseFilePath +'.js.map');
            wfs.remove(baseFilePath +'.js');
            wfs.remove(baseFilePath + '.d.ts');
            const relFromBuild = wfs.relative(outDir, relPath).split('\\').join('/');
            console.log(buildinfoPath);
            if(wfs.exists(buildinfoPath)) {
                if(removes[buildinfoPath]===undefined) {
                    removes[buildinfoPath] = [];
                }
                removes[buildinfoPath].push(relFromBuild);
            }
        });
    }

    async kill() {
        this.process.kill();
        this.killed = true;

        if(this.chokidar) {
            await this.chokidar.close();
        }
    }
}

export function watchTs(path: string, showOutput: boolean = true, onError: (error: Error) => boolean = defaultError) {
    return new TypeScriptWatcher(path, showOutput, onError);
}
