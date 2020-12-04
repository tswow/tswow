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
import * as yaml from 'js-yaml';

const settings = yaml.load(fs.readFileSync('./config.yaml').toString());
const args = process.argv.slice(2);

function getDatabase(database: string) {
    if (settings.database_all) {
        return settings.database_all;
    }
    return settings[database];
}

function getDatabaseName(database: string) {
    if (settings.database_all) {
        return settings.database_all.name + database;
    } else {
        return settings[database].name;
    }
}

class SettingsClass {
    get LUAXML_SOURCE() {return './coredata/luaxml_source'; }
    get LUAXML_CLIENT() {return './coredata/luaxml'; }

    get MYSQL_DATABASE_SOURCE() {return getDatabaseName('world') + '_source'; }
    get MYSQL_PASSWORD_SOURCE() {return getDatabase('source').password; }
    get MYSQL_USER_SOURCE() {return getDatabase('source').user; }
    get MYSQL_HOST_SOURCE() {return getDatabase('source').host; }
    get MYSQL_PORT_SOURCE() {return getDatabase('source').port; }

    get MYSQL_DATABASE_DEST() {return getDatabaseName('world'); }
    get MYSQL_PASSWORD_DEST() {return getDatabase('world').password; }
    get MYSQL_USER_DEST() {return getDatabase('world').user; }
    get MYSQL_HOST_DEST() {return getDatabase('world').host; }
    get MYSQL_PORT_DEST() {return getDatabase('world').port; }

    get DBC_SOURCE() { return './coredata/dbc_source'; }
    get DBC_OUT() {return './coredata/dbc'; }
    get SQL_WRITE_TO_FILE() {return args.includes('file'); }
    get MYSQL_WRITE_TO_DB() {return args.includes('db'); }
    get SQL_FILE_PATH() {return './bin/sqlout'; }
    get ID_FILE_PATH() {return './config/ids.txt'; }

    get READONLY() {return args.includes('readonly'); }

    get PATCH_DIRECTORY() {
        return fs.readdirSync('./modules')
            .map(x => path.join('./modules', x, 'data'))
            .filter(x => fs.existsSync(x));
    }
}

export const Settings = new SettingsClass();
