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
import { term } from '../util/Terminal';
import { wfs } from '../util/FileSystem';
import { download, unzip } from './CompileUtils';

const MYSQL_DOWNLOAD_URL = 'https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.32-winx64.zip';

export async function findMysql() {
    const mysql_install = install_path('bin', 'mysql');
    const mysql_build = build_path('mysql');
    const mysql_zip = build_path('mysql.zip');

    while (true) {
        if (wfs.exists(mysql_install)) {
            return mysql_install;
        } else if (wfs.exists(mysql_build)) {
            const subs = wfs.readDir(mysql_build);
            if (subs.length !== 1) {
                term.log('Corrupt mysql directory, reinstalling...');
                wfs.remove(mysql_build);
            } else {
                wfs.copy(subs[0], mysql_install);
            }
        } else if (wfs.exists(mysql_zip)) {
            unzip(mysql_zip, mysql_build);
        } else {
            await download(MYSQL_DOWNLOAD_URL, mysql_zip);
        }
    }
}
