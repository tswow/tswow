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
import { wfs } from '../util/FileSystem';
import { build_path, install_path } from './BuildConfig';
import { download, unzip } from './CompileUtils';

/**
 * We need 7zip to unzip TrinityCore TDB database dumps
 */
export async function installSZip() {
    const szip_url = 'https://www.7-zip.org/a/7za920.zip';
    const szip_install = install_path('bin', '7zip');
    const szip_zip = build_path('7zip.zip');

    while (true) {
        if (wfs.exists(szip_install)) {
            return;
        }

        if (wfs.exists(szip_zip)) {
            unzip(szip_zip, szip_install);
            return;
        }

        await download(szip_url, szip_zip);
    }
}
