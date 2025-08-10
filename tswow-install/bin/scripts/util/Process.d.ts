import { FilePath } from './FileTree';
/**
 * Represents a concurrently running child process.
 */
export declare class Process {
    private _name;
    private _process;
    private _stopPromise;
    private _curString;
    private _color;
    private _outputShown;
    private _waiters;
    private _bufferSize;
    private _listeners;
    private _onFail;
    private _isStopping;
    private _autoRestart;
    private _lastStart?;
    private _lineBuffers;
    /**
     * Creates a new process instance.
     * Call Process#start or Process#startIn to start it.
     * @param bufferSize
     */
    constructor(name: string, bufferSize?: number);
    static spawn(name: string, program: string, args: string[], bufferSize?: number): Promise<void>;
    static spawnIn(name: string, directory: string, program: string, args: string[], bufferSize?: number): Promise<void>;
    setAutoRestart(autoRestart: boolean): this;
    isRunning(): boolean;
    onFail(onFail: (message: Error) => void): this;
    stopPromise(): Promise<void>;
    onMessage(listener: (message: string) => void): this;
    /**
     * Waits for the process to output a specific message.
     * @param message Message that will be listened for.
     * @param useWildcard Whether to use * for wildcards.
     */
    waitForMessage(match: string, useWildcard?: boolean): Promise<string>;
    /**
     * Sets up whether to show output or not
     * @param show
     * @param color
     */
    showOutput(show: boolean, color?: string): this;
    private stdinError;
    /**
     * Sends a command to the process stdin
     * @param command Command to send to the process
     * @param useNewline Whether to append a newline to the end of the sent command (Almost always correlates to pressing the 'enter' key)
     * @throws If the process is starting, stopping or stopped.
     */
    send(command: string, useNewline?: boolean): this;
    /**
     * Attempts to stop this process if it's running.
     * Does nothing if the process is not started.
     */
    stop(): Promise<void>;
    /**
     * Attempt to start this proess in a specific working directory
     * @param directory Working directory the process will use
     * @param program Program the process will execute
     * @param args Arguments to the new process
     */
    startIn(directory: FilePath, program: string, args?: string[]): Promise<void>;
    private receiveLine;
    private fail;
    private postFail;
    /**
     * Handles output from the running process
     */
    private handleOutput;
    /**
     * Attempt to start this proess
     * @param program Program the process will execute
     * @param args Arguments to the new process
     */
    start(program: string, args?: string[]): Promise<void>;
}
