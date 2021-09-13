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
import { wfs } from './FileSystem';
import * as fs from 'fs';
import { ipaths } from './Paths';

/** Contains functions for tracking changes on the file system. */
export namespace FileChanges {
    /**
     * The file used for tracking changes
     *
     * This would be a direct reference, but for some reason
     * there's a test that can actually change this.
     *
     * (That should never happen in production)
     */
    let changedFile = ipaths.changeFile;

    /**
     * Do not use this function
     */
    export function setLogFile(file: string) {
        changedFile = file;
    }

    let curData: any;

    export function startCache() {
        if (!curData) {
            curData = readChangedFile();
        }
    }

    export function endCache() {
        if (curData) {
            writeChangedFile(curData);
        }
        curData = undefined;
    }


    /**
     * Writes the contents of the changed file to disk.
     * @param data
     */
    function writeChangedFile(data: object) {
        wfs.write(changedFile, JSON.stringify(data, null, 4));
    }

    /**
     * Reads the contents of the changed file from disk.
     */
    function readChangedFile() {
        if (curData) { return curData; }
        return JSON.parse(wfs.readOr(changedFile, '{}'));
    }

    /**
     * Checks when a file was last changed on the file system.
     * @param file
     */
    export function curChanged(file: string) {
        if (!wfs.exists(file)) { return '1'; }
        return fs.lstatSync(file).mtimeMs.toString();
    }

    /**
     * Checks the last stored value of a file change for a specific tag in the changefile.
     *
     * The tag and file are combined to create a unique lookup in the changefile.
     * @param tag The tag to look for
     * @param file The file to look for
     */
    export function lastChanged(file: string, tag = 'default') {
        const changed = readChangedFile();
        if (changed[tag] === undefined) {
            return '0';
        }
        return changed[tag][file] || '0';
    }

    /**
     * Flushes all the changes for a specific tag+file, tag, or the entire changefile.
     * @param tag The tag to remove values from (skipping flushes the entire changefile)
     * @param file The file to remove values from (skipping flushes the entire tag)
     */
    export function flushChanges(tag?: string, file?: string) {
        if (tag === undefined) {
            writeChangedFile({});
        } else {
            const changed = readChangedFile();
            if (file === undefined) {
                delete changed[tag];
            } else {
                if (changed[tag] !== undefined) {
                    delete changed[tag][file];
                }
            }
            writeChangedFile(changed);
        }
    }

    /**
     * Checks if the changed status on disk of a file matches the last value we stored in the changefile.
     *
     * The tag and file are combined to create a unique lookup in the changefile.
     * @param tag The tag to look for
     * @param file The file to look for
     */
    export function isChanged(file: string, tag = 'default') {
        const cur = curChanged(file);
        const last = lastChanged(file, tag);
        return cur !== last;
    }

    /**
     * Updates the change file with the current change status of a file on disk.
     *
     * The tag and file are combined to create a unique lookup in the changefile.
     * @param tag The tag to look for
     * @param file The file to look for
     */
    export function tagChange(file: string, tag: string = 'default') {
        const changes = readChangedFile();
        if (changes[tag] === undefined) {
            changes[tag] = {};
        }
        changes[tag][file] = curChanged(file);

        if (!curData) {
            writeChangedFile(changes);
        }
    }
}
