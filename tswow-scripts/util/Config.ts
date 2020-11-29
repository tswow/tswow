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
import * as path from 'path';
import * as jsyaml from 'js-yaml';

import { wfs, mpath } from './FileSystem';
import { util } from './Util';
import { isWindows } from './Platform';

/** The config.yaml file, which is read from disk at startup */

function yaml<T>(defaultValue: T, ...fpath: string[]) {
    return () => {
        let cur: any = jsyaml.safeLoad(wfs.readOr('./config.yaml', '')) || {};
        for (const part of fpath) {
            if (cur[part] === undefined) {
                return defaultValue;
            }
            cur = cur[part];
        }
        return cur;
    };
}

/** Settings for connecting to an TrinityCore database. */
export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
}

/** The three types of databases in TrinityCore. */
export type DatabaseType = 'world' | 'auth' | 'characters' | 'world_source';

/** Contains functions for managing tswow and TrinityCore settings. */
export namespace cfg {
    function acConfigDir() {
        return isWindows() ? './bin/trinitycore/' : './bin/trinitycore/etc';
    }

    /**
     * Finds the name of an TrinityCore configuration file.
     * @param configName
     */
    function cleanConfigName(configName: string) {
        return configName.replace('.conf.dist', '').replace('.conf', '');
    }

    /**
     * Finds the configuration file of a specific name in the TrinityCore installation directory.
     *
     * If configName.conf does not exist, we try to create it by copying configName.conf.dist.
     * @param configName
     */
    function acConfigPath(configName: string) {
        configName = cleanConfigName(configName);
        const configPath = mpath(acConfigDir(), `${configName}.conf`);
        if (!wfs.exists(configPath)) {
            const srcPath = configPath.replace('.conf', '.conf.dist');
            if (!wfs.exists(srcPath)) {
                return;
            }
            wfs.copy(srcPath, configPath);
        }
        return configPath;
    }

    /**
     * Converts a yaml value to the corresponding values used in TrinityCore configuration files.
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
     * Finds the database settings of a specific database type.
     * @param database The database type to find settings for.
     */
    export function databaseSettings(database: DatabaseType): DatabaseSettings {
        if (yaml(undefined, 'database_all')() !== undefined) {
            const {host, user, password, port, name} = yaml({} as any, 'database_all')();
            return {host, user, password, port: typeof(port) === 'number' ? port : parseInt(port, 10), name: `${name}${database}`};
        } else if (yaml(undefined, `database_${database}`)() === undefined) {
            throw new Error(`Missing YAML database settings for ${database}`);
        } else {
            const {host, user, password, port, name} = yaml({} as any, `database_${database}`)();
            return {host, user, password, port: typeof(port) === 'number' ? port : parseInt(port, 10), name};
        }

    }

    /** Contains functions for managing TrinityCore configurations specifically. */
    export namespace trinitycore {
        /**
         * Updates the TrinityCore configuration with values from config.yaml.
         *
         * Database fields must always be copied from config.yaml,
         * but other settings are only written if they are actually present in config.yaml.
         */
        export function updateAcConfigs() {
            wfs.readDir(acConfigDir(), false, 'files')
                .filter(x => x.endsWith('.conf.dist'))
                .forEach(x => updateAcConfig(cleanConfigName(path.basename(x))));
        }

        /**
         * Updates a single TrinityCore configuration file
         * @param configName Name of the configuration file to update.
         */
        function updateAcConfig(configName: string): any {
            configName = cleanConfigName(configName);
            const cpath = acConfigPath(configName);
            if (cpath === undefined) {
                throw new Error('No config file for name ' + configName);
            }

            const {file, settings} = readAcConfig(configName);

            if (yaml(undefined, configName)() !== undefined && typeof(yaml(undefined, configName))() === 'object') {
                const flatyaml = util.flattenJson(yaml(undefined, configName)());
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

            const acs = (dbs: DatabaseSettings) => `"${dbs.host};${dbs.port};${dbs.user};${dbs.password};${dbs.name}"`;

            if (configName === 'worldserver') {
                file[settings['logindatabaseinfo'].line] = `LoginDatabaseInfo = ${acs(databaseSettings('auth'))}`;
                file[settings['worlddatabaseinfo'].line] = `WorldDatabaseInfo = ${acs(databaseSettings('world'))}`;
                file[settings['characterdatabaseinfo'].line] = `CharacterDatabaseInfo = ${acs(databaseSettings('characters'))}`;
            } else if (configName === 'authserver') {
                file[settings['logindatabaseinfo'].line] = `LoginDatabaseInfo = ${acs(databaseSettings('auth'))}`;
            }

            wfs.write(cpath, file.join('\n'));
        }

        /**
         * Returns the contents of an TrinityCore configuration file.
         * @param configName Name of the configuration file to read.
         */
        export function readAcConfig(configName: string): any {
            configName = configName.replace('.conf.dist', '').replace('.conf', '');
            const file = wfs.readOr(acConfigPath(configName)).split('\n');
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
    }

    /** Contains settings about generating mmaps and vmaps.*/
    export const generation = {
        /** Whether to generate mmaps during map generation */
        generate_mmaps : yaml(false, 'generation', 'generate_mmaps'),
        /** Whether to generate vmaps during map generation */
        generate_vmaps : yaml(false, 'generation', 'generate_vmaps'),
    };

    export const display = {
        /** Whether to print stacktraces or not */
        print_stacktrace : yaml(false, 'display', 'print_stacktrace')
    };

    export const client = {
        directory : yaml<string|undefined>(undefined, 'client', 'directory'),
        mpq_suffix : yaml('z', 'client', 'mpq_suffix'),
    };

    export const build = {
        mpq_ignore : yaml<string[]>([], 'build', 'mpq_ignore'),
    };

    export const tdb_file = yaml<string>('unused', 'tdb_file');
}
