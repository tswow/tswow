/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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

import path from "path";
import { mpath, wfs } from "./FileSystem";
import { ipaths } from "./Paths";
import { isWindows } from "./Platform";
import { util } from "./Util";
import { databaseSettings, yaml } from "./Yaml";

/** Settings for connecting to an TrinityCore database. */
export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
}

function cleanConfigName(configName: string) {
    return configName.replace('.conf.dist', '.conf');
}

/**
 * Converts yaml settings to corresponding .conf values
 * @param value 
 */
function yamlToConfigValue(value: string) {
    // booleans
    if (value === 'true') { return 1; }
    if (value === 'false') { return 0; }

    // strings
    if (isNaN(parseInt(value, 10)) && isNaN(parseFloat(value))) {
        return `"${value.split('"').join('')}"`;
    }

    return value;
}

/**
 * Returns the contents of a TrinityCore configuration file.
 * @param configName Name of the configuration file to read.
 */
function readTcConfig(configPath: string): any {
    configPath = cleanConfigName(configPath);
    const file = wfs.readOr(configPath).split('\n');
    const settings: any = {};
    for (let i = 0; i < file.length; ++i) {
        const line = file[i];
        let str = '';
        let isString = false;
        let cancelString = false;
        for (const char of line) {
            if (char === '#' && !isString) { break; }
            if (char === '\\' && isString) {
                cancelString = true;
            } else {
                cancelString = false;
            }
            if (char === '"' && ! cancelString) { isString = ! isString; }
            str += char;
        }

        if (!str.includes('=')) {
            continue;
        }

        const values = str.split('=');
        const left = values[0].split(' ').join('');
        settings[left.toLowerCase()] = {line : i, value: values[1], realName: left};
    }
    return {file, settings};
}

/**
 * Writes YAML configurations to a TC config file
 */
export function writeYamlToConf(yamlPath: string, configPath: string, extraValues: {[key: string]: any} = {}, database_prefixes: {[key: string]:string} = {}): any {
    configPath = cleanConfigName(configPath);
    const {file, settings} = readTcConfig(configPath);

    const configName = path.basename(configPath).replace('.conf','');

    const acs = (dbs: DatabaseSettings) => `"${dbs.host};${dbs.port};${dbs.user};${dbs.password};${dbs.name}"`;
    if (configName === 'worldserver') {
        file[settings['logindatabaseinfo'].line] 
            = `LoginDatabaseInfo = ${acs(databaseSettings('auth',database_prefixes['auth']))}`;
        file[settings['worlddatabaseinfo'].line] 
            = `WorldDatabaseInfo = ${acs(databaseSettings('world',database_prefixes['world']))}`;
        file[settings['characterdatabaseinfo'].line] 
            = `CharacterDatabaseInfo = ${acs(databaseSettings('characters',database_prefixes['characters']))}`;
    } else if (configName === 'authserver') {
        file[settings['logindatabaseinfo'].line] 
            = `LoginDatabaseInfo = ${acs(databaseSettings('auth',database_prefixes['auth']))}`;
    }

    const submap = yaml(yamlPath,{},configName);
    Object.assign(submap,extraValues);
    if(submap !== undefined) {
        const flatyaml = util.flattenJson(submap);
        for (const key in flatyaml) {
            if (flatyaml[key] === undefined) {
                throw new Error(`Internal error: Missing key in flatyaml:${key}`);
            } else {
                const setting = settings[key.toLowerCase()];
                if (setting === undefined) {
                    continue;
                }
                const {realName, line} = setting;
                file[line] = `${realName} = ${yamlToConfigValue('' + flatyaml[key])}`;
            }
        }
    }

    wfs.write(configPath, file.join('\n'));
}

/**
 * Updates all TrinityCore config files in a mod profile.
 * @param realm 
 */
export function writeRealmYamlToConf(realm: string) {
    wfs.readDir(ipaths.realmDir(realm), false, 'files')
        .filter(x => x.endsWith('.conf'))
        .forEach(x => writeYamlToConf(realm,path.basename(x)));
}

/**
 * Copies all library files
 * @param type 
 */
export function copyLibraryFiles(type: 'Release'|'Debug') {
    if (isWindows()) {
        wfs.readDir(ipaths.tcRoot, true)
            .filter(x => x.endsWith('.dll'))
            .forEach(x => {
                const dst = mpath(ipaths.tc(type),x);
                if(!wfs.exists(dst)) {
                    wfs.copy(
                        mpath(ipaths.tcRoot, x), 
                        dst)
                }
            });
    }
}