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
import { ipaths } from '../util/Paths';
import { CLEAR_ARCHIVES, MYSQL_URL } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace MySQL {
    export async function find() {
        await DownloadFile(
             MYSQL_URL
           , bpaths.mysqlArchive
        )

        if(!bpaths.mysql.exists()) {
            await ExtractZip(
                  bpaths.mysqlArchive.get()
                , {dir:bpaths.mysql.abs().get()}
            )
        }


        // Delete unused library
        bpaths.mysql.find_subdir().lib.mysqlserver_lib.remove();

        // Install the necessary mysql files
        ;[
              bpaths.mysql.find_subdir().bin.mysql_exe
            , bpaths.mysql.find_subdir().bin.mysqld_exe
            , bpaths.mysql.find_subdir().bin.mysqldump_exe
        ].forEach(x=>{
            x.copyOnNoTarget(ipaths.bin.mysql.join(x.basename()))
        })

        if(CLEAR_ARCHIVES) {
            bpaths.mysqlArchive.remove();
        }

        return bpaths.mysql.find_subdir().get()
    }
}
