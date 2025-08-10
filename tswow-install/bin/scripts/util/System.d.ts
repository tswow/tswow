import * as child_process from 'child_process';
import { FilePath } from './FileTree';
/**
 * Contains functions for running external programs and managing processes and working directories.
 *
 * As opposed to the built-in 'child_process' module, wsys functions are synchronous unless otherwise stated
 * and prefer promises to callbacks.
 */
export declare namespace wsys {
    /**
     * Execute a function in a specific working directory.
     * @param dir The directory to execute in
     * @param cb The function to execute
     */
    function inDirectory(dir: string, cb: () => any): Promise<void>;
    /**
     * Execute a function in a specific working directory, does not allow async calls.
     * TODO: This should be the default behavior, not the other way around
     * @param dir
     * @param cb
     */
    function inDirectorySync(dir: string, cb: () => any): void;
    /**
     * Checks if a process is running
     * @param winName Name of the process in windows
     * @param macName Name of the process in mac
     * @param linuxName Name of the process in linux
     * @returns true if the process is found running, false otherwise.
     */
    function isRunning(winName: string, macName: string, linuxName: string): boolean;
    /**
     * Executes a child process asynchronously
     * @param program Command to execute
     * @throws if the child process exits with an error
     * @returns Promise when the child process exits
     */
    function execAsync(program: string, cwd?: string): Promise<string>;
    /**
     * Execute a child process.
     * @param program Command to execute
     * @param stdio How to handle output from the child process
     *              ('inherit' will display output to the current command window,
     *               'pipe' will return output as a string instead)
     * @returns Command output of the child process if `stdio` is 'pipe', undefined otherwise.
     */
    function exec(program: string, stdio?: 'ignore' | 'inherit' | 'pipe', settings?: child_process.ExecSyncOptionsWithBufferEncoding): string;
    /**
     * Executes a child process in a specific working directory.
     * @param dirname Working directory to run the child process in
     * @param program Command to execute
     * @param stdio How to handle output from the child process
     *              ('inherit' will display output to the current command window,
     *               'pipe' will return output as a string instead)
     * @returns Command output of the child process if `stdio` is 'pipe', undefined otherwise.
     */
    function execIn(dirname: FilePath, program: string, stdio?: 'ignore' | 'inherit' | 'pipe', settings?: child_process.ExecSyncOptionsWithBufferEncoding): string;
    /**
     * Executes a Node.js script using the current Node.js executable
     * @param scriptPath Path to the JavaScript file to execute
     * @param args Array of arguments to pass to the script
     * @param stdio How to handle output from the child process
     * @param options Additional spawn options
     * @returns Command output if stdio is 'pipe', undefined otherwise
     */
    function execNode(scriptPath: string, args?: string[], stdio?: 'ignore' | 'inherit' | 'pipe', options?: child_process.SpawnSyncOptions): string;
    /**
     * Sleeps for a specified time
     * @param timeout Milliseconds to sleep for.
     * @returns Promise that resolves after `timeout` milliseconds.
     */
    function sleep(timeout: number): Promise<void>;
    /**
     * Accept user input in the terminal.
     * @param query Text to display before the input
     */
    function userInput(query: string): Promise<string>;
}
