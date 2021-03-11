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
import { mpath, wfs } from './FileSystem';
import { Process } from './Process';
import { wsys } from './System';
import { term } from './Terminal';
import { ipaths } from './Paths';

/**
 * Wrapper around a "tsc --w" process
 */
export class TypeScriptWatcher {
    /** The tsconfig path */
    get tsconfig() { return mpath(this.path, 'tsconfig.json'); }

    constructor(path: string) {
        this.path = path;
        this.tscProcess = new Process()
            .showOutput(false);
    }
    protected tscProcess: Process;
    protected isWaiting = false;
    protected errors: string[] = [];

    /** The base path */
    protected path: string;

    /** The current output/build directory */
    protected outDir = '';

    /** The current .buildinfo file */
    protected buildInfo = '';

    getErrors() {
        return this.errors.slice();
    }

    getIsWaiting() {
        return this.isWaiting;
    }

    /**
     * Removes lines from the build info file
     */
    protected async removeBuildInfo(paths: string[]) {
        if (paths.length === 0) {
            return;
        }
        if (!wfs.exists(this.buildInfo)) {
            return;
        }
        const wasRunning = this.tscProcess.isRunning();
        await this.tscProcess.stop();
        const json = JSON.parse(wfs.read(this.buildInfo));
        for (let remove of paths) {
            remove = wfs.relative(this.outDir, remove);
            term.log('Removing ', remove);
            remove = remove.split('\\').join('/');
            delete json.program.fileInfos[remove];
            json.program.semanticDiagnosticsPerFile =
                json.program.semanticDiagnosticsPerFile
                    .filter((x: string) => x !== remove);
        }
        wfs.write(this.buildInfo, JSON.stringify(json, null, 4));
        if (wasRunning) {
            await this.startTSCWatch();
        }
    }

    protected tscPath() {
        return wfs.absPath(ipaths.tsc)
    }

    protected startTSCWatch() {
        this.isWaiting = true;
        if(process.argv.includes('--log-tsc')) {
            this.tscProcess.showOutput(true);
        }
        return this.tscProcess
            .startIn(this.path, 'node', [this.tscPath(), '--w']);
    }

    async setup() {
        term.log(`Setting up TSWatcher at ${this.path}`);
        this.tscProcess = new Process()
            .showOutput(false)
            .listenSimple((x) => {
                x = x.split('\r').join('');
                if (x.includes('File change detected')) {
                    this.isWaiting = true;
                }
                if (x.includes('Found 0 errors.')) {
                    this.isWaiting = false;
                    if (this.errors.length > 0) {
                        term.success(`No more errors in ${this.path}`);
                        if (checkErrors().length === 0) {
                            term.success(`No more errors at all!`);
                        }
                    }
                    if (checkReady()) {
                        term.success(`All modules finished compiling!`);
                    }
                    this.errors = [];
                } else if (x.includes('error') && !x.includes('. Watching for file changes.')) {
                    this.errors.push(x);
                    term.error(x);
                    return;
                }
            });
        const tsconfig = JSON.parse(wfs.read(this.tsconfig));
        if (tsconfig.compilerOptions === undefined
            || tsconfig.compilerOptions.outDir === undefined) {
                return this;
        }

        this.outDir = mpath(this.path, tsconfig.compilerOptions.outDir);
        this.buildInfo = mpath(this.outDir, 'tsconfig.tsbuildinfo');
        await this.startTSCWatch();

        const old: {[key: string]: boolean} = {};
        wfs.iterate(this.path, (thing) => {
            if (thing.endsWith('ts') && !thing.endsWith('d.ts')) {
                old[thing] = true;
            }
        });

        return this;
    }

    async compile(timeout: number) {
        const throwError = () => {
            if (this.errors.length > 0) {
                throw new Error(this.errors.join('\n'));
            }
        };

        throwError();

        // Don't log if we're not watching
        if (!this.isWaiting) {
            return this;
        }

        let timer = 0;

        term.log(`Waiting for script to compile: ${this.path}`);
        while (this.isWaiting) {
            if(timer>timeout && timeout > 0) {
                throw new Error(`Took too long to compile: Check your dependency chain`);
            }
            throwError();
            // Ignore paths with no files.
            if(!wfs.exists(this.path) || wfs.readDir(this.path).length==0) {
                break;
            }
            await wsys.sleep(100);
            timer+=100;
        }

        term.success(`Finished compiling: ${this.path}`);

        return this;
    }

    async pause() {
        this.isWaiting = true;
        await this.tscProcess.stop();
    }

    async kill() {
        await this.pause();
        delete watchers[this.path];
    }
}

const watchers: {[key: string]: TypeScriptWatcher} = {};

export async function compileAll(timeout: number) {
    const errors: string[] = [];

    await Promise.all(Object.values(watchers).map(async (x) => {
        try {
            await x.compile(timeout);
        } catch (error) {
            errors.push(error.message);
        }
    }));

    if (errors.length > 0) {
        throw new Error(errors.join('\n') + '\n\nYou have TypeScript compiler errors, fix them.');
    }
}

export function checkReady() {
    for (const watcher of Object.values(watchers)) {
        if (watcher.getIsWaiting()) { return false; }
    }
    return true;
}

export function checkErrors() {
    let errors: string[] = [];
        for (const watcher of Object.values(watchers)) {
        errors = errors.concat(watcher.getErrors());
    }
    return errors;
}

export async function hasWatcher(path: string) {
    return watchers[path] !== undefined;
}

export async function getTSWatcher(path: string) {
    if (watchers[path] !== undefined) { return watchers[path]; }
    const w = await new TypeScriptWatcher(path).setup();
    watchers[path] = w;
    return w;
}

export async function destroyTSWatcher(path: string) {
    if (watchers[path] !== undefined) {
        await watchers[path].kill();
        return true;
    }
    return false;
}

export async function destroyAllWatchers() {
    for (const value of Object.values(watchers)) {
        await value.kill();
    }
}
