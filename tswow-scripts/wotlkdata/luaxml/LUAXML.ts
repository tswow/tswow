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
import { LUAXMLFiles } from './LUAXMLFiles';
import { TextFile } from './TextFile';
import { Settings } from '../Settings';
import * as path from 'path';
import * as fs from 'fs';

let files: {[key: string]: TextFile} = {};

/**
 * Contains functions for manipulating LUA and XML files.
 */
export class LUAXML {
    /**
     * Loads a LUA or XML text file from a file path local to the LUAXML_SOURCE setting.
     */
    static anyfile(filepath: string): TextFile {
        if (files[filepath] !== undefined) { return files[filepath]; }
        const fullpath = path.join(Settings.LUAXML_SOURCE, filepath);
        const tf = new TextFile(filepath, fs.readFileSync(fullpath).toString());
        files[filepath] = tf;
        return tf;
    }

    /**
     * Like LUAXML:anyfile, but argument has autocomplete for common filenames.
     * @param filepath
     */
    static file(filepath: LUAXMLFiles): TextFile {
        return this.anyfile(filepath);
    }
}

/**
 * Internal function for clearing the LUAXML loaded file data.
 * @warn Erases all edits from memory without writing them to disk
 */
export function _clearLUAXML() {
    files = {};
}

/**
 * Internal function for writing LUAXML edits to disk.
 * @param indir
 * @param outdir
 * @warn indiscriminately removes anything previously in the target directory
 */
export function _writeLUAXML(indir = Settings.LUAXML_SOURCE, outdir = Settings.LUAXML_CLIENT) {
    function copydir(cur: string) {
        const incur = path.join(indir, cur);
        const outcur = path.join(outdir, cur);
        if (fs.existsSync(outcur)) {
            fs.rmdirSync(outcur, {recursive: true});
        }
        fs.mkdirSync(outcur, {recursive: true});

        const read = fs.readdirSync(incur);
        const lxmlfiles: string[] = [];
        const folders: string[] = [];
        read.forEach(x => {
            if (fs.lstatSync(path.join(incur, x)).isFile()) {
                lxmlfiles.push(x);
            } else {
                folders.push(x);
            }
        });

        lxmlfiles.forEach(x => {
            const infile = path.join(incur, x);
            const outfile = path.join(outcur, x);
            fs.copyFileSync(infile, outfile);
        });

        folders.forEach(x => {
            copydir(path.join(cur, x));
        });
    }
    copydir('');

    for (const fname in files) {
        if (files[fname] === undefined) {
            throw new Error(`Internal error: filename ${fname} points at undefined value`);
        } else {
            const file = files[fname];
            TextFile._write(file, path.join(outdir, fname));
        }
    }
}
