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
import { wfs } from '../../util/FileSystem';
import { BuildArgs, dataset } from '../Settings';
import { LUAXMLFiles } from './LUAXMLFiles';
import { TextFile } from './TextFile';

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
        const fullpath = path.join(dataset.luaxml_source.get(), filepath);
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
export function _writeLUAXML() {
    const indir = dataset.luaxml_source;
    const outdir = dataset.luaxml

    let tocPath = outdir.Interface.FrameXML.framexml_toc;
    let tocValue = undefined;
    if(tocPath.exists()) {
        tocValue = tocPath.readString();
    }
    wfs.copy(indir,outdir,false);
    if(tocValue !== undefined) {
        tocPath.write(tocValue);
    }

    for (const fname in files) {
        if (files[fname] === undefined) {
            throw new Error(
                  `Internal error:`
                + ` filename ${fname} points at undefined value`
            );
        } else {
            const file = files[fname];
            TextFile._write(file, outdir.join(fname).get());
        }
    }
}
