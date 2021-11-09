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
import { FilePath } from './FileTree';
import { isWindows } from './Platform';
import { wsys } from './System';
import { term } from './Terminal';

const processes : {[key: number]: ChildProcessWithoutNullStreams} = {};
function cleanup() {
    for(const proc of Object.values(processes)) {
        proc.kill('SIGTERM');
    }
}

// causes major terminal glitching
if(!isWindows())
{
    process.on('exit', cleanup);
    process.on('SIGINT', cleanup);
    process.on('SIGUSR1', cleanup);
    process.on('SIGUSR2', cleanup);
    process.on('uncaughtException', cleanup);
    process.on('SIGINT', cleanup)
}

/**
 * Represents a concurrently running child process.
 */
export class Process {
    private process: ChildProcessWithoutNullStreams | undefined;
    private stopPromise: Promise<void> | undefined;
    private curString = '';
    private color = 'white';
    private outputShown = true;
    private waiters: {[key: string]: (message: string) => void} = {};
    private bufferSize = 2048;
    private listeners: ((message: string) => void)[] = [];
    private onFail: ((err: Error)=>void)|undefined = undefined;

    /**
     * Creates a new process instance. Call Process#start or Process#startIn to start it.
     * @param bufferSize
     */
    constructor(bufferSize: number =  1024) {
        this.bufferSize = bufferSize;
    }

    isRunning() {
        return this.process !== undefined;
    }

    setOnFail(onFail: (message: Error)=>void){
        this.onFail = onFail;
    }

    listenSimple(listener: (message: string) => void ) {
        this.listeners.push(listener);
        return this;
    }

    /**
     * Waits for the process to output a specific message.
     * @param message Message that will be listened for.
     * @param useWildcard Whether to use * for wildcards.
     */
    waitFor(match: string, useWildcard: boolean = true) {
        const matches = !useWildcard ? [match] : match.split('*');
        let id = 0;
        while (this.waiters[id]) {
            ++id;
        }

        return new Promise<string>((res) => {
            this.waiters[id] = (message) => {
                for (const matchedString of matches) {
                    if (!message.includes(matchedString)) { return; }
                }
                delete this.waiters[id];
                res(message);
            };
        });
    }

    /**
     * Sets up whether to show output or not
     * @param show
     * @param color
     */
    showOutput(show: boolean, color?: string) {
        this.outputShown = show;
        this.color = color || this.color;
        return this;
    }

    /**
     * Sends a command to the process stdin
     * @param command Command to send to the process
     * @param useNewline Whether to append a newline to the end of the sent command (Almost always correlates to pressing the 'enter' key)
     * @throws If the process is starting, stopping or stopped.
     */
    send(command: string, useNewline: boolean = true) {
        if (this.stopPromise) {
            throw new Error('Attempted to send message to a stopping process');
        }

        if (!this.process) {
            throw new Error('Attempted to send message to a stopped process');
        }

        if (useNewline) {
            this.process.stdin.write(Buffer.from(command + String.fromCharCode(10), 'ascii'));
        } else {
            this.process.stdin.write(Buffer.from(command, 'ascii'));
        }
        return this;
    }

    /**
     * Attempts to stop this process if it's running.
     * Does nothing if the process is not started.
     */
    async stop() {
        this.curString = '';

        if (this.process === undefined) {
            return;
        }

        this.process.kill();
        return this.stopPromise;
    }

    /**
     * Attempt to start this proess in a specific working directory
     * @param directory Working directory the process will use
     * @param program Program the process will execute
     * @param args Arguments to the new process
     */
    async startIn(directory: FilePath, program: string, args: string[] = []) {
        await this.stop();
        const proc = wsys.spawnIn(directory,program,args)
        this.process = proc;
        processes[proc.pid] = proc;
        this.process.stdout.on('data', (data) => {
            this.handleOutput(data, false);
        });
        this.process.stderr.on('data', (data) => {
            this.handleOutput(data, true);
        });

        const nullProcess = ()=>{
            if(this.process!==undefined
                && proc.pid === this.process.pid) {
                    this.process = undefined;
            }
        }
        return this.stopPromise = new Promise<void>((res) => {
            let killed = false;
            const onDestroyed = () => {
                if(!killed) {
                    nullProcess();
                    res();
                    delete processes[proc.pid]
                    killed = true;
                }
            }
            proc.on('error', () => {
                onDestroyed();
            });
            proc.on('exit', () => {
                onDestroyed()
            });
        });
    }

    /**
     * Handles output from the running process
     */
    private handleOutput(data: any, isError: boolean) {
        if (this.outputShown) {
            term.pipe(isError ? 'red' : this.color, [data.toString()]);
        }

        const strData = data.toString();
        const removedCharacters = (this.curString.length + strData.length) - this.bufferSize;
        if (removedCharacters > 0) {
            this.curString = this.curString.substring(removedCharacters, this.curString.length);
        }
        this.curString = this.curString + strData;

        for (const listener of this.listeners) {
            listener(strData);
        }

        for (const listener of Object.values(this.waiters)) {
            listener(this.curString);
        }
    }

    /**
     * Attempt to start this proess
     * @param program Program the process will execute
     * @param args Arguments to the new process
     */
    start(program: string, args: string[] = []) {
        return this.startIn(process.cwd(), program, args);
    }
}
