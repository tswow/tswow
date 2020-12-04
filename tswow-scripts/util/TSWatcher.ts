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
import { mpath, rpath, wfs } from './FileSystem';
import { wsys } from './System';
import { term } from './Terminal';

function defaultError(err: Error) {
    term.error(`TSC Error: ${err.name} ${err.message}`);
    return false;
}

/**
 * Wrapper around a "tsc --w" process that also cleans up removed source files
 */
export class TypeScriptWatcher {
    process: ChildProcessWithoutNullStreams;
    private killed = false;

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
        this.cleanLoop(mpath(path, tsconfig.compilerOptions.outDir));
    }

    private async cleanLoop(outDir: string) {
        while (true) {
            wfs.iterate(outDir, (name) => {
                if (!name.endsWith('.map')) {
                    return;
                }
                const obj = JSON.parse(wfs.read(name));
                if (obj.sources === undefined || obj.sources.length !== 1) {
                    return;
                }
                const sourcefile = mpath(wfs.dirname(name), obj.sources[0]);
                if (!wfs.exists(sourcefile)) {
                    const plainfile = name.substring(0, name.length - 7);
                    const jsfile = plainfile + '.js';
                    const dtsfile = plainfile + '.d.ts';
                    wfs.remove(name);
                    wfs.remove(jsfile);
                    wfs.remove(dtsfile);
                }
            });
            await(wsys.sleep(1000));
            if (this.killed) { break; }
        }
    }

    kill() {
        this.process.kill();
        this.killed = true;
    }
}

export function watchTs(path: string, showOutput: boolean = true, onError: (error: Error) => boolean = defaultError) {
    return new TypeScriptWatcher(path, showOutput, onError);
}
