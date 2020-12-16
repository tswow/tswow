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
import { build_path, install_path } from './BuildConfig';
import { mpath, wfs } from '../util/FileSystem';
import { download, unzip } from './CompileUtils';
import { ipaths } from '../util/Paths';

const MYSQL_DOWNLOAD_URL = 'https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.32-winx64.zip';

const mysqlInstallFiles = [
    'bin/mysqld.exe',
    'bin/mysql.exe',
    'bin/mysqldump.exe'
];

export async function findMysql() {
    const mysql_build = build_path('mysql');
    const mysql_zip = build_path('mysql.zip');

    if (!wfs.exists(mysql_zip)) {
        await download(MYSQL_DOWNLOAD_URL, mysql_zip);
    }

    if (!wfs.exists(mysql_build)) {
        unzip(mysql_zip, mysql_build);
    }

    const finBuilds = wfs.readDir(mysql_build);
    if (finBuilds.length !== 1) {
        throw new Error(`Corrupt mysql directory in ${mysql_build}, please remove it manually.`);
    }
    mysqlInstallFiles.forEach((x) => {
        const ip = install_path(ipaths.mysqlBin, x);
        if (!wfs.exists(ip)) {
            wfs.copy(mpath(finBuilds[0], x), ip);
        }
    });

    return finBuilds[0];
}
