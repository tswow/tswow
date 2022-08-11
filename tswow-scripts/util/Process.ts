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
import * as child_process from "child_process";
import { ChildProcessWithoutNullStreams } from 'child_process';
import { FilePath, resfp } from './FileTree';
import { isWindows } from './Platform';
import { term } from './Terminal';
import { termCustom } from "./TerminalCategories";

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
    private _name: string;
    private _process: ChildProcessWithoutNullStreams | undefined;
    private _stopPromise: Promise<void> | undefined;
    private _curString = '';
    private _color = 'white';
    private _outputShown = true;
    private _waiters: {[key: string]: (message: string) => void} = {};
    private _bufferSize = 2048;
    private _listeners: ((message: string) => void)[] = [];
    private _onFail: ((err: Error)=>void)|undefined = undefined;
    private _isStopping: boolean = false;
    private _autoRestart: boolean = false;
    private _lastStart?: {directory : FilePath, program: string, args: string[]} = undefined

    private _lineBuffers = {
        stderr: {value: '', idx: 0},
        stdout: {value: '', idx: 0},
    }

    /**
     * Creates a new process instance.
     * Call Process#start or Process#startIn to start it.
     * @param bufferSize
     */
    constructor(name: string, bufferSize: number =  1024) {
        this._bufferSize = bufferSize;
        this._name = name;
    }

    static spawn(name: string, program: string, args: string[], bufferSize: number = 1024) {
        return new Process(name,bufferSize)
            .showOutput(true)
            .start(program,args)
    }

    static spawnIn(name: string, directory: string, program: string, args: string[], bufferSize: number = 1024) {
        return new Process(name,bufferSize)
            .showOutput(true)
            .startIn(directory,program,args)
    }

    setAutoRestart(autoRestart: boolean) {
        this._autoRestart = autoRestart;
        return this;
    }

    isRunning() {
        return this._process !== undefined;
    }

    onFail(onFail: (message: Error)=>void){
        this._onFail = onFail;
        return this;
    }

    stopPromise() {
        return this._stopPromise
    }

    onMessage(listener: (message: string) => void ) {
        this._listeners.push(listener);
        return this;
    }

    /**
     * Waits for the process to output a specific message.
     * @param message Message that will be listened for.
     * @param useWildcard Whether to use * for wildcards.
     */
    waitForMessage(match: string, useWildcard: boolean = true) {
        const matches = !useWildcard ? [match] : match.split('*');
        let id = 0;
        while (this._waiters[id]) {
            ++id;
        }

        return new Promise<string>((res) => {
            this._waiters[id] = (message) => {
                for (const matchedString of matches) {
                    if (!message.includes(matchedString)) { return; }
                }
                delete this._waiters[id];
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
        this._outputShown = show;
        this._color = color || this._color;
        return this;
    }

    private stdinError(error: any) {
        term.error(termCustom('process',this._name),`Error writing to process: ${error.message}`)
    }

    /**
     * Sends a command to the process stdin
     * @param command Command to send to the process
     * @param useNewline Whether to append a newline to the end of the sent command (Almost always correlates to pressing the 'enter' key)
     * @throws If the process is starting, stopping or stopped.
     */
    send(command: string, useNewline: boolean = true) {
        if (!this._process) {
            throw new Error('Attempted to send message to a stopped process');
        }

        if (this._isStopping) {
            throw new Error('Attempted to send message to a stopping process');
        }

        try {
            this._process.stdin.write(Buffer.from(
                command + (useNewline
                    ? String.fromCharCode(10)
                    : '')
                , 'utf-8'
            ));
        } catch(error) {
            this.stdinError(error);
        }
        return this;
    }

    /**
     * Attempts to stop this process if it's running.
     * Does nothing if the process is not started.
     */
    async stop() {
        this._curString = '';

        if (this._process === undefined) {
            return;
        }

        this._process.kill();
        this._isStopping = true;
        return this._stopPromise;
    }

    /**
     * Attempt to start this proess in a specific working directory
     * @param directory Working directory the process will use
     * @param program Program the process will execute
     * @param args Arguments to the new process
     */
    async startIn(
          directory: FilePath
        , program: string
        , args: string[] = []
    ) {
        await this.stop();
        this._lastStart = {directory,program,args};
        this._isStopping = false;
        const proc = child_process.spawn(
              program
            , args
            , {stdio:'pipe',cwd:resfp(directory)}
        )
        this._process = processes[proc.pid] = proc;
        this._process.stdout.on('data', (data) => {
            this.handleOutput(data, false);
        });
        this._process.stderr.on('data', (data) => {
            this.handleOutput(data, true);
        });

        this._process.stdin.on('error', (err) => {
            this.stdinError(err);
        })

        return this._stopPromise = new Promise<void>((res) => {
            let killed = false;
            const onDestroyed = () => {
                if(!killed) {
                    killed = true;
                    if(this._process!==undefined
                        && proc.pid === this._process.pid) {
                            this._process = undefined;
                        res();
                        delete processes[proc.pid]
                    }
                }
            }
            proc.on('error', (err) => {
                this.fail(err)
                onDestroyed();
                this.postFail();
            });
            proc.on('exit', (code) => {
                let failed = code !== 0 && code !== null
                if(failed) {
                    this.fail(new Error('Process error code '+code))
                }
                onDestroyed()
                if(failed) {
                    this.postFail()
                }
            });
        });
    }

    private receiveLine(line: string, isError: boolean) {
        if(this._outputShown) {
            if(isError) {
                term.error(termCustom(this._name),line)
            } else {
                term.log(termCustom(this._name),line)
            }
        }

        const removedCharacters =
            (this._curString.length + line.length) - this._bufferSize;
        if (removedCharacters > 0) {
            this._curString = this._curString
                .substring(removedCharacters, this._curString.length);
        }
        this._curString = this._curString + line;
        this._listeners.forEach(x=>x(line))
        Object.values(this._waiters).forEach(x=>x(this._curString))
    }

    private fail(error: any) {
        if(this._onFail) {
            this._onFail(error);
        }

    }

    private postFail() {
        if(this._autoRestart && this._lastStart) {
            term.log('process',`Automatically restarting ${this._lastStart.program}`)
            this.startIn(this._lastStart.directory, this._lastStart.program, this._lastStart.args);
        }
    }

    /**
     * Handles output from the running process
     */
    private handleOutput(data: any, isError: boolean) {
        // Separate newlined and non-newlined chunks
        let str = (data.toString() as string).split('\r').join('');
        let chunks = str.split('\n')
        let newlinedChunks = chunks
            .slice(0,chunks.length-1)
            .filter(x=>x.split(/[ \t]/).join('').length>0);
        // only the last chunk can be non-newlined
        let lastChunk = chunks[chunks.length-1];
        let hasLastChunk = lastChunk.split(/[ \t]/).join('').length > 0
        // if the output contains no data, do not update the buffer counter
        if(newlinedChunks.length == 0 && !hasLastChunk) {
            return;
        }

        const buffer = this._lineBuffers[isError?'stderr':'stdout']
        // we know we have data now, buffer will change so update idx
        buffer.idx++;
        if(newlinedChunks.length > 0) {
            newlinedChunks[0] = buffer.value+newlinedChunks[0]
            buffer.value = ''
        }
        newlinedChunks.forEach(x=>this.receiveLine(x, isError));

        if(hasLastChunk) {
            buffer.value+=lastChunk;

            // if we don't receive more updates within 100ms,
            // empty the buffer so the user doesn't miss out on any
            // information

            // keep idx, we only flush from here if no new updates were
            // received

            const curIdx = buffer.idx;
            setTimeout(()=>{
                if(buffer.idx === curIdx) {
                    this.receiveLine(buffer.value,isError);
                    buffer.value = ""
                }
            },100)
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
