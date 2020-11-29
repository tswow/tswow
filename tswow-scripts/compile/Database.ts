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
import { term } from '../util/Terminal';
import { wfs } from '../util/FileSystem';
import { install_path } from './BuildConfig';

export function dbAssemble() {
    term.log('Assembling DB files');

    function readdir(dir: string, str: string) {
        wfs.readDir(dir, false, 'files')
            .filter(x => x.endsWith('.sql'))
            .forEach(x => str += wfs.read(x));
        return str;
    }

    function assembleSql(type: string) {
        const basedir = `./trinitycore/data/sql/base/db_${type}`;
        const updatedir = `./trinitycore/data/sql/updates/db_${type}`;
        const customdir = `./trinitycore/data/sql/custom/db_${type}`;
        let str = '';
        str = readdir(basedir, str);
        str = readdir(updatedir, str);
        str = readdir(customdir, str);
        wfs.write(install_path(`bin/sql/trinitycore_${type}.sql`), str);
        return str;
    }

    assembleSql('auth');
    assembleSql('characters');
    assembleSql('world');
}
