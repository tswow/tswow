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
import { build_path, OPENSSL_DOWNLOAD_URL } from './BuildConfig';
import { download } from './CompileUtils';
import { wsys } from '../util/System';

export async function findOpenSSL() {
    const exepath = build_path('openssl.exe');
    const dirpath = build_path('openssl');

    if (fs.existsSync(dirpath)) {
        return dirpath;
    }

    if (!fs.existsSync(exepath)) {
        await download(OPENSSL_DOWNLOAD_URL, exepath);
    }

    while (!fs.existsSync(dirpath)) {
        await wsys.userInput(`OpenSSL not found. Please run the file ${exepath}, and install to the "${dirpath}" directory, then press enter in this command prompt`);
    }

    return dirpath;
}
