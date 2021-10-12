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
import * as jsyaml from 'js-yaml';
import { args } from '../util/Args';
import { mpath, wfs } from '../util/FileSystem';
import { spaths } from '../util/Paths';

export const CMAKE_DOWNLOAD_URL = 'https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip';
export const OPENSSL_DOWNLOAD_URL = 'https://slproweb.com/download/Win64OpenSSL-1_1_1h.exe';
export const BLENDER_DOWNLOAD_URL = 'https://download.blender.org/release/Blender2.79/blender-2.79b-windows64.zip';

const yaml: any = jsyaml.safeLoad(wfs.readOr(spaths.buildYaml, ''));
export const build_directory = args.getValue('build_directory') || yaml.build_directory;
export const install_directory = args.getValue('install_directory') || yaml.install_directory;
export const build_tdb = yaml.build_tdb;

export function build_path (...values: string[]): string {
    if (!wfs.exists(build_directory)) {
        wfs.mkDirs(build_directory);
    }
    return mpath.apply(undefined, [build_directory].concat(values));
}

export function install_path (...values: string[]): string {
    if (!wfs.exists(install_directory)) {
        wfs.mkDirs(install_directory);
    }
    return mpath.apply(undefined, [install_directory].concat(values));
}

export const isInteractive = process.argv.includes("--interactive")