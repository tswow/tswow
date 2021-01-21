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
import { build_path } from './BuildConfig';
import { wsys } from '../util/System';

export async function findOpenSSL() {
    const dirpath = build_path('openssl');

    while (!fs.existsSync(dirpath)) {
        await wsys.userInput(`OpenSSL not found. \n\t1. Download the .exe installer from here: https://slproweb.com/products/Win32OpenSSL.html\n\t2. Run and install to the "${dirpath}" directory\n\t3. Set it to copy OpenSSL binaries to "The OpenSSL binaries (/bin) directory" \n\t4. Press enter in this command prompt`);
    }

    return dirpath;
}
