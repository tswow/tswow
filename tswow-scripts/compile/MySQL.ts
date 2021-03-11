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
import { install_path } from './BuildConfig';
import { mpath, wfs } from '../util/FileSystem';
import { ipaths, bpaths } from '../util/Paths';
import { wsys } from '../util/System';

const mysqlInstallFiles = [
    'bin/mysqld.exe',
    'bin/mysql.exe',
    'bin/mysqldump.exe'
];

function query(reason: string) {
    return wsys.userInput(
        `${reason}`
        + `\n\t1. Download the .zip from here: `
        + `https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.32-winx64.zip\n\t`
        + `2. Extract it to "${bpaths.mysql}" (${mpath(bpaths.mysql,"mysql-5.7.32-winx64")} should exist)`
        + `\n\t3. Press enter in this prompt\n`);
}

export async function findMysql() {
    // Find the corrupt MySQL subdirectory
    let read: string[]
    do {
        read = wfs.readDir(bpaths.mysql);
        if(read.length==0) {
            await query('MySQL not found');
        }
        else if(read.length>1) {
            await query('MySQL is corrupt, please reinstall it');
        }
    } while(read.length != 1)

    // Install the necessary mysql files
    mysqlInstallFiles.forEach((x) => {
        const ip = mpath(ipaths.mysqlBin, x);
        if (!wfs.exists(x)) {
            wfs.copy(mpath(read[0], x), ip);
        }
    });

    return read[0];
}
