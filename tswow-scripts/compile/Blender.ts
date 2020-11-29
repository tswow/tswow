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
import { build_path, install_path, BLENDER_DOWNLOAD_URL } from './BuildConfig';
import { term } from '../util/Terminal';
import { wfs } from '../util/FileSystem';
import { download, unzip } from './CompileUtils';

export async function installBlenderWmoAddon() {
    // TODO: Enable again
    // wfs.copy('./blender-wmo-import-export-scripts/io_scene_wmo', install_path('bin/blender/2.79/scripts/addons/io_scene_wmo'));
}

export async function installBlender() {
    const blender_zip = build_path('blender.zip');
    const blender_build = build_path('blender');
    const blender_install = install_path('bin/blender');

    term.log('Installing blender...');

    if (wfs.exists(blender_install)) {
        return;
    }


    if (!wfs.exists(blender_build)) {
        if (!wfs.exists(blender_zip)) {
            await download(BLENDER_DOWNLOAD_URL, blender_zip);
        }

        if (!wfs.exists(blender_zip)) {
            throw new Error('Failed to download blender zip');
        }

        await unzip(blender_zip, blender_build);
    }

    if (!wfs.exists(blender_build)) {
        throw new Error('Failed to unzip blender');
    }

    const folders = wfs.readDir(blender_build, false, 'directories');
    if (folders.length !== 1) {
        throw new Error('Blender build directory is corrupt');
    }

    const folder = folders[0];

    // TODO: Move to release function
    wfs.copy(folder, blender_install);
    term.success('Installed Blender!"');
}
