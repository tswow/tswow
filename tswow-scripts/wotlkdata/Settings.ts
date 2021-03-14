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

const settings = JSON.parse(Buffer.from(process.argv[2],'base64').toString())

export function getDatabase(database: string) {
    if (settings.database_all) {
        return settings.database_all;
    }
    return settings[database];
}

class SettingsClass {
    get LUAXML_SOURCE() {return settings.luaxml_source; }
    get LUAXML_CLIENT() {return settings.luaxml_out; }

    get MYSQL_DATABASE_SOURCE() {return getDatabase('world_source').name; }
    get MYSQL_PASSWORD_SOURCE() {return getDatabase('world_source').password; }
    get MYSQL_USER_SOURCE() {return getDatabase('world_source').user; }
    get MYSQL_HOST_SOURCE() {return getDatabase('world_source').host; }
    get MYSQL_PORT_SOURCE() {return getDatabase('world_source').port; }

    get MYSQL_DATABASE_DEST() {return getDatabase('world').name; }
    get MYSQL_PASSWORD_DEST() {return getDatabase('world').password; }
    get MYSQL_USER_DEST() {return getDatabase('world').user; }
    get MYSQL_HOST_DEST() {return getDatabase('world').host; }
    get MYSQL_PORT_DEST() {return getDatabase('world').port; }

    get USE_POOLING() { return settings.use_pooling || false; }

    get USE_TIMER() { return settings.use_timer; }

    get DBC_SOURCE() { return settings.dbc_source; }
    get DBC_OUT() {return settings.dbc_out; }
    // TODO: Fix this
    get SQL_WRITE_TO_FILE() {return false; }
    get MYSQL_WRITE_TO_DB() {return true; }
    get SQL_FILE_PATH() {return './bin/sqlout'; }
    get ID_FILE_PATH() {return settings.id_path }
    get READONLY() {return settings.readonly; }
    get PATCH_DIRECTORY() { 
        if(typeof(settings.modules)=='string') {
            settings.modules = [settings.modules];
        }

        if(settings.modules.includes('all')) {
            settings.modules = [];
            fs.readdirSync('./modules').forEach(x=>{
                if(fs.existsSync(path.join('./modules',x,'data'))){
                    settings.modules.push(x);
                }
            });
        }

        return settings.modules 
    }
}

export const Settings = new SettingsClass();