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
import * as child_process from 'child_process';
import * as readline from 'readline';

/**
 * Contains functions for running external programs and managing processes and working directories.
 *
 * As opposed to the built-in 'child_process' module, wsys functions are synchronous unless otherwise stated
 * and prefer promises to callbacks.
 */
export namespace wsys {
    /**
     * Execute a function in a specific working directory.
     * @param dir The directory to execute in
     * @param cb The function to execute
     */
    export async function inDirectory(dir: string, cb: () => any) {
        const old = process.cwd();
        process.chdir(dir);
        try {
            await cb();
        } catch (err) {
            process.chdir(old);
            throw err;
        }
        process.chdir(old);
    }

    /**
     * Execute a function in a specific working directory, does not allow async calls.
     * TODO: This should be the default behavior, not the other way around
     * @param dir
     * @param cb
     */
    export function inDirectorySync(dir: string, cb: () => any) {
        const old = process.cwd();
        process.chdir(dir);
        try {
            cb();
        } catch (err) {
            process.chdir(old);
            throw err;
        }
        process.chdir(old);
    }

    /**
     * Checks if a process is running
     * @param winName Name of the process in windows
     * @param macName Name of the process in mac
     * @param linuxName Name of the process in linux
     * @returns true if the process is found running, false otherwise.
     */
    export function isRunning(winName: string, macName: string, linuxName: string) {
        const plat = process.platform;
        const cmd = plat === 'win32' ? 'tasklist' : (plat === 'darwin' ? 'ps -ax | grep ' + macName : (plat === 'linux' ? 'ps -A' : ''));
        const proc = plat === 'win32' ? winName : (plat === 'darwin' ? macName : (plat === 'linux' ? linuxName : ''));
        if (cmd === '' || proc === '') {
            return false;
        }
        return execOut(cmd).toLowerCase().indexOf(proc.toLowerCase()) > -1;
    }

    /**
     * Executes a child process asynchronously
     * @param program Command to execute
     * @throws if the child process exits with an error
     * @returns Promise when the child process exits
     */
    export function execAsync(program: string, cwd?: string) {
        return new Promise<any>((res, rej) => {
            const proc = child_process.exec(program, {cwd: cwd ? cwd : process.cwd()}, (err) => {
                return err ? rej(err) : res();
            });
        });
    }

    /**
     * Execute a child process.
     * @param program Command to execute
     * @param stdio How to handle output from the child process
     *              ('inherit' will display output to the current command window,
     *               'pipe' will return output as a string instead)
     * @returns Command output of the child process if `stdio` is 'pipe', undefined otherwise.
     */
    export function exec(program: string, stdio: 'ignore'|'inherit'|'pipe' = 'pipe') {
        return child_process.execSync(program, {stdio: stdio});
    }

    /**
     * Executes a child process to an output string.
     * @param program Command to execute
     * @returns Command output of the child process.
     */
    export function execOut(program: string) {
        return child_process.execSync(program, {stdio: 'pipe'}).toString();
    }

    /**
     * Executes a child process in a specific working directory.
     * @param dirname Working directory to run the child process in
     * @param program Command to execute
     * @param stdio How to handle output from the child process
     *              ('inherit' will display output to the current command window,
     *               'pipe' will return output as a string instead)
     * @returns Command output of the child process if `stdio` is 'pipe', undefined otherwise.
     */
    export function execIn(dirname: string, program: string, stdio: 'ignore'|'inherit'|'pipe' = 'inherit')  {
        let str = '';
        inDirectorySync(dirname, () => {
            const data = child_process.execSync(program, {stdio: stdio});
            if (stdio === 'pipe' && data !== null && data !== undefined) {
                str = data.toString();
            }
        });
        return str;
    }

    /**
     * Spawns a new child process in a specific working directory.
     * Use this for long-running processes such as `tsc --w`.
     * @param dirname Working directory to spawn the child process in
     * @param program Command the child process should execute
     * @param args Arguments to the child process
     * @returns Child process handle
     */
    export function spawnIn(dirname: string, program: string, args: string[] = []) {
        return child_process.spawn(program, args, {stdio: 'pipe', cwd: dirname});
    }

    /**
     * Spawns a new child process.
     * Use this for long-running processes such as `tsc --w`
     * @param program Command the child process should execute
     * @param args Arguments to the child process
     */
    export function spawn(program: string, args: string[] = []) {
        return child_process.spawn(program, args, {stdio: 'pipe'});
    }

    /**
     * Sleeps for a specified time
     * @param timeout Milliseconds to sleep for.
     * @returns Promise that resolves after `timeout` milliseconds.
     */
    export function sleep(timeout: number) {
        return new Promise<void>((res) => {
            setTimeout(() => {
                res();
            }, timeout);
        });
    }

    export function detached(program: string, args: string[] = []) {
        child_process.spawn(program, args, {detached: true}).on('error', (data) => {
            console.log(data.name, data.message);
        });
    }

    /**
     * Accept user input in the terminal.
     * @param query Text to display before the input
     */
    export function userInput(query: string) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise(resolve => rl.question(query, ans => {
            rl.close();
            resolve(ans);
        }));
    }
}
