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
import { WFile } from '../../util/FileTree';
import { BuildArgs, dataset } from '../../data/Settings';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCFiles } from '../DBCFiles';
import { SQLTables } from '../SQLFiles';
import { SqlTable } from '../../data/sql/SQLTable';
import { SqlConnection } from '../../data/sql/SQLConnection';

function saveDbc() {
    for (const file of DBCFiles) {
        const srcpath = dataset.dbc_source.join(file.name + '.dbc');

        // if we skip the server, we should write dbcs to client directly
        const outPaths: WFile[] = [];
        if(BuildArgs.WRITE_CLIENT) {
            outPaths.push(BuildArgs.CLIENT_PATCH_DIR.join('DBFilesClient',file.name+'.dbc').toFile())
        }

        if(BuildArgs.WRITE_SERVER) {
            outPaths.push(dataset.dbc.join(file.name+'.dbc').toFile())
        }

        if(file.isLoaded()) {
            outPaths[0].writeBuffer(DBCFile.getBuffer(file).write());
        } else {
            srcpath.copy(outPaths[0]);
        }

        if(outPaths.length > 1) {
            outPaths.slice(1).forEach(x=>{
                outPaths[0].copy(outPaths[1])
            })
        }
    }
}

async function saveSQL() {
    SQLTables.map(x=>{
        SqlTable.writeSQL(x);
    })
    await Promise.all(SqlConnection.allDbs().map(x=>x.apply()));
}

export async function __internal_wotlk_save() {
    if(!BuildArgs.READ_ONLY) {
        saveDbc();
    }

    if(BuildArgs.WRITE_SERVER) {
        await saveSQL();
    }
}