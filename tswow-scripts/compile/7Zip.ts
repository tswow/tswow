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
import { mpath, wfs } from '../util/FileSystem';
import { wsys } from '../util/System';
import { build_path, install_path } from './BuildConfig';
import { makeArchive } from '../util/7zip';


/**
 * Use 7zip in the build script
 */
export async function make7zip(path: string, outPath: string) {
    installSZip();
    makeArchive(path, outPath);
}

/**
 * We need 7zip to unzip TrinityCore TDB database dumps
 */
export async function installSZip() {
    const szip_install = install_path('bin', '7zip');

    const szip_build = build_path('7zip');

    while(!wfs.exists(szip_build)) {
        await wsys.userInput(`7zip is not installed:\n\t1. Download https://www.7-zip.org/a/7za920.zip\n\t2.Extract it to ${szip_build} (${mpath(szip_build,'7za.exe')} should exist)\n\t3.Press enter in this prompt`);
    }

    if(!wfs.exists(szip_install)) {
        wfs.copy(szip_build,szip_install);
    }
}
