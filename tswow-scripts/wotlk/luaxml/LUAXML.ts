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
import { loadLuaxml } from '../../data/luaxml/LUAXML';
import { TextFile } from '../../data/luaxml/TextFile';
import { LUAXMLFiles } from './LUAXMLFiles';

/**
 * Contains functions for manipulating LUA and XML files.
 */
export class LUAXML {
    /**
     * Loads a LUA or XML text file from a file path local to the LUAXML_SOURCE setting.
     */
    static anyfile(filepath: string): TextFile {
        return loadLuaxml(filepath);
    }

    /**
     * Like LUAXML:anyfile, but argument has autocomplete for common filenames.
     * @param filepath
     */
    static file(filepath: LUAXMLFiles): TextFile {
        return this.anyfile(filepath);
    }
}