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
import * as fs from 'fs';
import * as path from 'path';

/**
 * Async file system access using promises
 */
export namespace wfsa {
    export function exists(fpath: string) {
        return new Promise<boolean>((res, rej) => {
            fs.access(fpath, (err) => {
                return res(!err);
            });
        });
    }

    export function mkDirs(dname: string, clear: boolean = false) {
        return new Promise<void>(async (res, rej) => {
            if (await wfsa.isFile(dname)) {
                return rej(new Error(`${dname} is not a directory!`));
            }

            if (clear && await wfsa.exists(dname)) {
                await wfsa.remove(dname);
            }

            if (! await wfsa.exists(dname)) {
                fs.mkdir(dname, {recursive: true}, (err) => {
                    if (err) {
                        return rej(err);
                    } else {
                        return res();
                    }
                });
            } else {
                return res();
            }
        });
    }

    export async function read(fpath: string) {
        return (await readBin(fpath)).toString();
    }

    export async function write(fpath: string, text: string) {
        return new Promise<void>((res, rej) => {
            fs.writeFile(fpath, text, (error) => {
                if (error) {
                    rej(error);
                } else {
                    res();
                }
            });
        });
    }

    export function move(source: string, target: string, flushFolders: boolean = false) {
        return new Promise<void>(async (res, rej) => {
            if (!wfsa.exists(source)) {
                return;
            }
            await remove(target);
            await mkDirs(path.dirname(target));
            fs.rename(source, target, (error) => {
                if (error) {
                    rej(error);
                } else {
                    res();
                }
            });
        });
    }

    export function copy(source: string, target: string, flushFolders: boolean = false, ignored: string[] = []) {
        return new Promise<void>(async (res, rej) => {
            if (!await wfsa.exists(source)) {
                return rej(new Error(`Attempt to copy from non-existent source ${source}`));
            }

            if (flushFolders) {
                await wfsa.remove(target);
            }


            function copyFile(sourceFile: string, targetFile: string) {
                return new Promise<void>(async (fres, frej) => {
                    if (ignored.includes(sourceFile)) {
                        return fres();
                    }
                    await wfsa.mkDirs(path.dirname(targetFile));
                    return fs.copyFile(sourceFile, targetFile, (err) => {
                        if (err) {
                            frej(err);
                        } else {
                            fres();
                        }
                    });
                });
            }

            if (await wfsa.isFile(source)) {
                await copyFile(source, target);
                return res();
            }

            async function copyFolder(sourceDir: string, targetDir: string) {
                if (ignored.includes(sourceDir)) {
                    return;
                }
                await wfsa.mkDirs(targetDir);
                const items = await wfsa.readDir(sourceDir, true);
                for (const item of items) {
                    const ipath = mpath(sourceDir, item);
                    const tpath = mpath(targetDir, item);
                    if (ignored.includes(ipath)) { continue; }
                    if (await isFile(ipath)) {
                        await copyFile(ipath, tpath);
                    } else {
                        await copyFolder(ipath, tpath);
                    }
                }
            }
            await copyFolder(source, target);
            res();
        });
    }

    export function readDir(dir: string, isRelative = false, accepted: 'files'|'directories'|'both' = 'both'): Promise<string[]> {
        return new Promise<string[]>((res, rej) => {
            if (!wfsa.exists(dir)) {
                return res([]);
            }

            fs.readdir(dir, (err, files) => {
                if (err) {
                    rej(err);
                } else {
                    files = files.map(x => isRelative ? x : path.join(dir, x));
                    // TODO: Remove lstatsync
                    if (accepted === 'files') {
                        files = files.filter(x => fs.lstatSync(isRelative ? path.join(dir, x) : x).isFile());
                    } else if (accepted === 'directories') {
                        files = files.filter(x => fs.lstatSync(isRelative ? path.join(dir, x) : x).isDirectory());
                    }
                    res(files);
                }
            });
        });
    }

    export function readBin(fpath: string) {
        return new Promise<Buffer>((res, rej) => {
            fs.readFile(fpath, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            });
        });
    }

    export function remove(fpath: string) {
        return new Promise<void>(async (res, rej) => {
            if (!await wfsa.exists(fpath)) {
                res();
            }

            if (await wfsa.isFile(fpath)) {
                fs.unlink(fpath, (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                });
            } else if (await wfsa.isDirectory(fpath)) {
                fs.rmdir(fpath, {recursive: true}, (err) => {
                    if (err) {
                        rej(err);
                    } else {
                        res();
                    }
                });
            }
        });
    }

    export function isFile(fpath: string) {
        return new Promise<boolean>((res, rej) => {
            fs.lstat(fpath, (err, stats) => {
                if (err) {
                    return res(false);
                }
                res(stats.isFile());
            });
        });
    }

    export function isDirectory(fpath: string) {
        return new Promise<boolean>((res, rej) => {
            fs.lstat(fpath, (err, stats) => {
                if (err) {
                    return res(false);
                }
                res(stats.isDirectory());
            });
        });
    }

    /**
     * Calls a callback for a file, or recursively all files in a directory and its subdirectories.
     * @param iterPath The path to start iterating. If this is a file, calls `cb` just for the file.
     *             If this is a directory, calls `cb` for all items in it and its subfolders.
     *             If this path doesn't exist, the function does nothing.
     * @param cb The function to call for the file(s) found at or from `path`
     */
    export async function iterate(iterPath: string, cb: (name: string) => any) {
        if (! (await exists(iterPath))) { return; }
        if (await isFile(iterPath)) {
            await cb(iterPath);
        } else {
            const files = await readDir(iterPath, false);
            for (const file of files) {
                await iterate(file, cb);
            }
        }
    }
}

/**
 * Contains functions to simplify interacting with the file system in Node.
 *
 * As opposed to the built-in 'fs' module, wfs functions are synchronous unless otherwise stated
 * and prefer promises to callbacks.
 */
export namespace wfs {

    /**
     * Creates the parent directory to a file or folder.
     * @param file The file or folder to create a parent directory to.
     */
    function makeParentDir(file: string) {
        const pdir = path.dirname(file);
        if (!fs.existsSync(pdir)) {
            fs.mkdirSync(pdir, {recursive: true});
        }
    }

    /**
     * Finds all files and/or folders in a directory.
     * @param dir The directory to scan
     * @param isRelative Whether to return relative path names (dir exluded) or not (as dir/filename).
     * @param accepted Whether to accept files, directories or both.
     * @returns List of files in dir, with or without `dir` prepended depending on the value of `relative`.
     */
    export function readDir(dir: string, isRelative = false, accepted: 'files'|'directories'|'both' = 'both'): string[] {
        if (!fs.existsSync(dir)) { return []; }

        let items = fs.readdirSync(dir).map(x => isRelative ? x : path.join(dir, x));
        if (accepted === 'files') {
            items = items.filter(x => fs.lstatSync(isRelative ? path.join(dir, x) : x).isFile());
        } else if (accepted === 'directories') {
            items = items.filter(x => fs.lstatSync(isRelative ? path.join(dir, x) : x).isDirectory());
        }
        return items;
    }

    /**
     * Creates a directory hierarchy with all necessary parent directories.
     *
     * Optionally clears out the created directory.
     * @param dname The directory path to create
     * @param clear Whether to clear out the directory at `dname`
     */
    export function mkDirs(dname: string, clear: boolean = false) {
        if (isFile(dname)) {
            throw new Error(`${dname} is not a directory!`);
        }

        if (wfs.exists(dname) && clear) {
            remove(dname);
        }

        if (!fs.existsSync(dname)) {
            fs.mkdirSync(dname, {recursive: true});
        }
    }

    /**
     * Checks if **all** of multiple paths exists on the file system.
     * @param paths Paths to be checked.
     * @returns True if all `paths` exists on the file system, false otherwise.
     */
    export function exists(...paths: string[]) {
        for (const p of paths) {
            if (!fs.existsSync(p)) { return false; }
        }
        return true;
    }

    /**
     * Calls a callback for a file, or recursively all files in a directory and its subdirectories.
     * @param iterPath The path to start iterating. If this is a file, calls `cb` just for the file.
     *             If this is a directory, calls `cb` for all items in it and its subfolders.
     *             If this path doesn't exist, the function does nothing.
     * @param cb The function to call for the file(s) found at or from `path`
     */
    export function iterate(iterPath: string, cb: (name: string) => any) {
        if (!wfs.exists(iterPath)) { return; }
        if (isFile(iterPath)) {
            cb(iterPath);
        } else {
            const files = readDir(iterPath, false);
            for (const file of files) {
                iterate(file, cb);
            }
        }
    }

    /**
     * Removes a file or folder (with all its contents) from the file system.
     * @param removedPath Path to the file or folder to remove. If this path doesn't exist, the function does nothing.
     */
    export function remove(removedPath: string) {
        if (!fs.existsSync(removedPath)) {
            return;
        }

        if (fs.lstatSync(removedPath).isFile()) {
            fs.unlinkSync(removedPath);
        } else {
            fs.rmdirSync(removedPath, {recursive: true});
        }
    }

    /**
     * Check if a path points at a file on the file system.
     * @param filePath The path to check
     * @returns true if `path` points to an (existing) file, false otherwise.
     */
    export function isFile(filePath: string) {
        if (!fs.existsSync(filePath)) { return false; }
        return fs.lstatSync(filePath).isFile();
    }

    /**
     * Check if a path points at a directory on the file system.
     * @param dirPath The path to check
     * @returns true if `path` points to an (existing) directory, false otherwise.
     */
    export function isDirectory(dirPath: string) {
        if (!fs.existsSync(dirPath)) { return false; }
        return fs.lstatSync(dirPath).isDirectory();
    }

    /**
     * Write a text file to the file system.
     * @param file Path to the file to write
     * @param data Text data to write
     * @throws if `file` points at an existing directory.
     */
    export function write(file: string, data: string) {
        mkDirs(path.dirname(file));
        fs.writeFileSync(file, data);
    }

    /**
     * Write a binary file to the file system.
     * @param file Path to the file to write
     * @param data Buffer to write
     * @throws if `file` points at an existing directory.
     */
    export function writeBin(file: string, data: Buffer) {
        mkDirs(path.dirname(file));
        fs.writeFileSync(file, data);
    }

    export function writeStream(file: string) {
        return fs.createWriteStream(file, {flags: 'a'});
    }

    /**
     * Read a text file from the file system
     * @param filePath Path to the file to read
     * @throws if `path` doesn't point at a file
     * @returns Text contents of the file at `path`
     */
    export function read(filePath: string) {
        return fs.readFileSync(filePath).toString();
    }

    /**
     * Reads a text file from the file system
     * @param filepath
     * @throws if `path` doesn't point at a file
     * @returns Text contents of the file at `path` split by lines
     */
    export function readLines(filepath: string) {
        return read(filepath)
            .split('\r')
            .join('')
            .split('\n');
    }

    /**
     * Writes a text file to the file system
     * @param filepath
     * @param lines
     */
    export function writeLines(filepath: string, lines: string[]) {
        write(filepath, lines.join('\n'));
    }

    /**
     * Creates a numbered backup of a file, checking for previous backups
     * so they are not overwritten.
     * @param filePath
     * @param backupBase
     */
    export function makeBackup(filePath: string, backupBase = filePath+'.backup') {
        let i = 1;
        while(wfs.exists(`${backupBase}_${i}`)) {
            ++i;
        }
        wfs.copy(filePath,`${backupBase}_${i}`);
    }

    /**
     * Reads a binary file from the file system
     * @throws if `path` doesn't point at a file
     * @returns Buffer containing the file at `path`
     */
    export function readBin(filePath: string) {
        return fs.readFileSync(filePath);
    }

    /**
     * Read a text file from the file system if it exists or use a default string.
     * @param filePath Path to the file to read
     * @param def Default string to use if the file system contains no file at `path`
     */
    export function readOr(filePath?: string, def: string = '') {
        if (filePath === undefined) {
            return def;
        }
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath).toString();
        } else {
            return def;
        }
    }

    /**
     * Remove any files or directories at a target location and create a folder there.
     * @param dir The path to create the new clean directory at
     * @deprecated Use wfs#mkDirs
     */
    export function clearDir(dir: string) {
        remove(dir);
        mkDirs(dir);
    }

    /**
     * Moves a file or folder between two paths on the file system.
     * Any parent directories are automatically created for the target directory.
     * @param source Path to the file/folder to move. If this path does not exist on the file system, the function does nothing.
     * @param target Path to move the file/folder
     */
    export function move(source: string, target: string) {
        if (!wfs.exists(source)) {
            return;
        }
        remove(target);
        mkDirs(path.dirname(target));
        fs.renameSync(source, target);
    }

    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other.
     * This is actually the reverse transform of path.resolve.
     * @param from
     * @param to
     */
    export function relative(from: string, to: string) {
        return path.relative(from, to);
    }

    /**
     * Finds the absolute path of a path. Uses the built-in `path.resolve`.
     * @param pathIn Path to find the absolute path to.
     * @returns Absolute path to `pathIn`
     */
    export function absPath(pathIn: string) {
        return path.resolve(pathIn);
    }

    export function basename(pathIn: string) {
        return path.basename(pathIn);
    }

    export function dirname(pathIn: string) {
        return path.dirname(pathIn);
    }

    /**
     * Copies a file or folder to a new location. Creates any parent directories necessary at the target.
     * @param source The source folder to copy from
     * @param target The target folder to copy to
     * @param flushFolders Whether to clear out any previous contents at `target`
     */
    export function copy(source: string, target: string, flushFolders: boolean = false, ignored: string[] = []) {
        if (!wfs.exists(source)) {
            throw new Error(`Attempted to copy from non-existent source:'${source}'`);
        }
        if (flushFolders) {
            remove(target);
        }

        if (isFile(source) && !ignored.includes(source)) {
            makeParentDir(target);
            remove(target);
            fs.copyFileSync(source, target);
            return;
        }

        function copyFolder(sourceDir: string, targetDir: string) {
            if (ignored.includes(sourceDir)) { return; }
            mkDirs(targetDir);

            const items = wfs.readDir(sourceDir, true);
            for (const item of items) {
                const ipath = mpath(sourceDir, item);
                const tpath = mpath(targetDir, item);
                if (ignored.includes(ipath)) { continue; }

                if (isFile(ipath)) {
                    fs.copyFileSync(ipath, tpath);
                } else {
                    copyFolder(ipath, tpath);
                }
            }
        }
        copyFolder(source, target);
    }

    export function removeDot(pathIn: string) {
        return pathIn.startsWith('./') ? pathIn.substring(2) : pathIn;
    }

    export function symlink(pathFrom: string, pathTo: string) {
        fs.symlinkSync(absPath(pathFrom), absPath(pathTo), wfs.isDirectory(pathFrom) ? 'dir':'file');
    }

    export function watch(file: string, callback: (event: any,filename: string)=>void) {
        fs.watch(file,callback);
    }
}

/**
 * Joins multiple paths together. Uses the built-in `path.join` function, but is shorter to write.
 * @param str Paths to combine
 * @returns All arguments joined together as a path.
 */
export function mpath(...str: string[]) {
    return path.join.apply(path, str);
}

/**
 * Makes a relative path
 */
export function rpath(from: string, to: string) {
    return path.relative.apply(path, [from, to]);
}
