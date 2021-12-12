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
import { mpath } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';

export namespace MySQL {
    function query(reason: string) {
        return wsys.userInput(
            `${reason}`
            + `\n\t1. Download the .zip from here: `
            + `https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.32-winx64.zip\n\t`
            + `2. Extract it to "${bpaths.mysql.get()}" (${mpath(bpaths.mysql.get(),"mysql-5.7.32-winx64")} should exist)`
            + `\n\t3. Press enter in this prompt\n`);
    }

    export async function find() {
        // Find the corrupt MySQL subdirectory
        let read: string[]

        while(!bpaths.mysql.find_subdir().exists()) {
            await query('MySQL not found');
        }

        // Install the necessary mysql files
        [
              bpaths.mysql.find_subdir().bin.mysql_exe
            , bpaths.mysql.find_subdir().bin.mysqld_exe
            , bpaths.mysql.find_subdir().bin.mysqldump_exe
        ].forEach(x=>{
            x.copyOnNoTarget(ipaths.bin.mysql.join(x.basename()))
        })

        return bpaths.mysql.find_subdir().get()
    }
}
