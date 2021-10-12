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
import jsyaml from "js-yaml";
import { wfs } from "./FileSystem";
import { ipaths } from "./Paths";

/** Settings for connecting to an TrinityCore database. */
export interface DatabaseSettings {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

/** The three types of databases in TrinityCore. */
export type DatabaseType = 'world' | 'auth' | 'characters' | 'world_source';

/**
 * Safely read a yaml setting from disk
 * @param path
 * @param defaultValue
 * @param settingsPath
 */
export function yaml<T>(path: string, defaultValue: T, settingsPath: string[]|string): T {
    if(!Array.isArray(settingsPath)) {
        settingsPath = [settingsPath];
    }

    try {
        let cur: any = jsyaml.safeLoad(wfs.readOr(path, '')) || {};
        for (const part of settingsPath) {
            if (cur[part] === undefined) {
                return defaultValue;
            }
            cur = cur[part];
        }

        if(defaultValue !== undefined && typeof cur != typeof defaultValue) {
            throw new Error(`Invalid type in yaml: Got ${typeof(cur)} but expected ${typeof(defaultValue)}`)
        }

        return cur as T;
    } catch(err) {
        if(err.message.includes("unknown escape sequence")) {
            throw new Error(
                  `Yaml file ${path} is broken, `
                + `you've likely used a setting with double quotes and single backslashes: \n\n`
                + `Example:\n`
                + `client_path = a\\b\\c\\d      <-- valid\n`
                + `client_path = "a\\\\b\\\\c\\\\d" <-- valid\n`
                + `client_path = "a\\b\\c\\d"    <-- INVALID\n`
                )
        } else {
            throw err;
        }
    }
}

/**
 * Finds database settings of a specific database type in a yaml configuration
 * @param database The database type to find settings for.
 */
export function databaseSettings(database: DatabaseType, nameSuffix?: string): DatabaseSettings {
    let cfg = yaml(ipaths.nodeYaml,undefined,`database_${database}`);
    if(!cfg) {
        cfg = yaml(ipaths.nodeYaml, undefined, `database_all`);
    }
    if(!cfg) {
        throw new Error(
          `Missing YAML database settings for ${database}`
        + `, check your node.yaml file`);
    }

    const {host, user, password, port, prefix} = cfg;
    return {
        host
     ,  user
     , password
     , port: typeof(port) === 'number' ? port : parseInt(port, 10)
     , database: `${prefix}_${database}${nameSuffix?`_${nameSuffix}`:''}`};
}

export class YamlFile {
    protected filepath: string;

    protected get<T>(path: string, defValue: T) {
        return yaml(this.filepath, defValue,path);
    }

    protected getArray<T>(path: string, defValue: T): T {
        let v = this.get<any>(path,defValue);
        return (Array.isArray(v) ? v : [v]) as any as T;
    }

    constructor(filepath: string) {
        this.filepath = filepath;
    }
}