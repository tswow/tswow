import * as fs from 'fs';
import { FilePath } from './FileTree';
/**
 * Async file system access using promises
 */
export declare namespace wfsa {
    function exists(fpath: FilePath): Promise<boolean>;
    function mkDirs(dname: FilePath, clear?: boolean): Promise<void>;
    function read(fpath: FilePath): Promise<string>;
    function write(fpath: FilePath, text: string): Promise<void>;
    function move(source: FilePath, target: FilePath, flushFolders?: boolean): Promise<void>;
    function copy(source: FilePath, target: FilePath, flushFolders?: boolean, ignored?: string[]): Promise<void>;
    function readDir(dir: FilePath, isRelative?: boolean, accepted?: 'files' | 'directories' | 'both'): Promise<string[]>;
    function readBin(fpath: FilePath): Promise<Buffer>;
    function remove(fpath: FilePath): Promise<void>;
    function isFile(fpath: FilePath): Promise<boolean>;
    function isDirectory(fpath: FilePath): Promise<boolean>;
    /**
     * Calls a callback for a file, or recursively all files in a directory and its subdirectories.
     * @param iterPath The path to start iterating. If this is a file, calls `cb` just for the file.
     *             If this is a directory, calls `cb` for all items in it and its subfolders.
     *             If this path doesn't exist, the function does nothing.
     * @param cb The function to call for the file(s) found at or from `path`
     */
    function iterate(iterPath: FilePath, cb: (name: string) => any): Promise<void>;
}
/**
 * Contains functions to simplify interacting with the file system in Node.
 *
 * As opposed to the built-in 'fs' module, wfs functions are synchronous unless otherwise stated
 * and prefer promises to callbacks.
 */
export declare namespace wfs {
    function stat(file: FilePath): fs.Stats;
    /**
     * Finds all files and/or folders in a directory.
     * @param dir The directory to scan
     * @param isRelative Whether to return relative path names (dir exluded) or not (as dir/filename).
     * @param accepted Whether to accept files, directories or both.
     * @returns List of files in dir, with or without `dir` prepended depending on the value of `relative`.
     */
    function readDir(dir: FilePath, isRelative?: boolean, accepted?: 'files' | 'directories' | 'both'): string[];
    /**
     * Creates a directory hierarchy with all necessary parent directories.
     *
     * Optionally clears out the created directory.
     * @param dname The directory path to create
     * @param clear Whether to clear out the directory at `dname`
     */
    function mkDirs(dname: FilePath, clear?: boolean): void;
    /**
     * Checks if **all** of multiple paths exists on the file system.
     * @param paths Paths to be checked.
     * @returns True if all `paths` exists on the file system, false otherwise.
     */
    function exists(...paths: FilePath[]): boolean;
    /**
     * Calls a callback for a file, or recursively all files in a directory and its subdirectories.
     * @param iterPath The path to start iterating. If this is a file, calls `cb` just for the file.
     *             If this is a directory, calls `cb` for all items in it and its subfolders.
     *             If this path doesn't exist, the function does nothing.
     * @param cb The function to call for the file(s) found at or from `path`
     */
    function iterate(iterPath: FilePath, cb: (name: string) => any): void;
    function isSymlink(path: FilePath): boolean;
    /**
     * Removes a file or folder (with all its contents) from the file system.
     * @param removedPath Path to the file or folder to remove. If this path doesn't exist, the function does nothing.
     */
    function remove(removedPath: FilePath): void;
    /**
     * Check if a path points at a file on the file system.
     * @param filePath The path to check
     * @returns true if `path` points to an (existing) file, false otherwise.
     */
    function isFile(filePath: FilePath): boolean;
    /**
     * Check if a path points at a directory on the file system.
     * @param dirPath The path to check
     * @returns true if `path` points to an (existing) directory, false otherwise.
     */
    function isDirectory(dirPath: FilePath): boolean;
    function write(file: FilePath, data: Buffer, encoding?: BufferEncoding): any;
    function write(file: FilePath, data: string): any;
    /**
     * Write a binary file to the file system.
     * @param file Path to the file to write
     * @param data Buffer to write
     * @throws if `file` points at an existing directory.
     */
    function writeBin(file: FilePath, data: Buffer): void;
    function writeStream(file: FilePath): fs.WriteStream;
    /**
     * Read a text file from the file system
     * @param filePath Path to the file to read
     * @throws if `path` doesn't point at a file
     * @returns Text contents of the file at `path`
     */
    function read(filePath: FilePath): string;
    /**
     * Reads a text file from the file system
     * @param filepath
     * @throws if `path` doesn't point at a file
     * @returns Text contents of the file at `path` split by lines
     */
    function readLines(filepath: FilePath): string[];
    /**
     * Writes a text file to the file system
     * @param filepath
     * @param lines
     */
    function writeLines(filepath: FilePath, lines: string[]): void;
    /**
     * Creates a numbered backup of a file, checking for previous backups
     * so they are not overwritten.
     * @param filePath
     * @param backupBase
     */
    function makeBackup(filePath: FilePath): void;
    /**
     * Reads a binary file from the file system
     * @throws if `path` doesn't point at a file
     * @returns Buffer containing the file at `path`
     */
    function readBin(filePath: FilePath): Buffer;
    /**
     * Read a text file from the file system if it exists or use a default string.
     * @param filePath Path to the file to read
     * @param def Default string to use if the file system contains no file at `path`
     */
    function readOr(filePath?: FilePath, def?: string): string;
    /**
     * Remove any files or directories at a target location and create a folder there.
     * @param dir The path to create the new clean directory at
     * @deprecated Use wfs#mkDirs
     */
    function clearDir(dir: FilePath): void;
    /**
     * Moves a file or folder between two paths on the file system.
     * Any parent directories are automatically created for the target directory.
     * @param source Path to the file/folder to move. If this path does not exist on the file system, the function does nothing.
     * @param target Path to move the file/folder
     */
    function move(source: FilePath, target: FilePath): void;
    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other.
     * This is actually the reverse transform of path.resolve.
     * @param from
     * @param to
     */
    function relative(from: FilePath, to: FilePath): string;
    /**
     * Finds the absolute path of a path. Uses the built-in `path.resolve`.
     * @param pathIn Path to find the absolute path to.
     * @returns Absolute path to `pathIn`
     */
    function absPath(pathIn: FilePath): string;
    function basename(pathIn: FilePath): string;
    function dirname(pathIn: FilePath): string;
    /**
     * Copies a file or folder to a new location. Creates any parent directories necessary at the target.
     * @param source The source folder to copy from
     * @param target The target folder to copy to
     * @param flushFolders Whether to clear out any previous contents at `target`
     */
    function copy(source: FilePath, target: FilePath, flushFolders?: boolean, ignored?: string[]): void;
    function removeDot(pathIn: FilePath): FilePath;
    function symlink(from: FilePath, to: FilePath): void;
    function watch(file: FilePath, callback: (event: any, filename: string) => void): void;
}
/**
 * Joins multiple paths together. Uses the built-in `path.join` function, but is shorter to write.
 * @param str Paths to combine
 * @returns All arguments joined together as a path.
 */
export declare function mpath(...str: FilePath[]): string;
/**
 * Makes a relative path
 */
export declare function rpath(from: FilePath, to: FilePath): any;
