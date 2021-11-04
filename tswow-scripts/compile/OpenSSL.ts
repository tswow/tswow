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
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';

export namespace OpenSSL {
    export async function find() {
        while (!bpaths.openssl.exists()) {
            await wsys.userInput(`OpenSSL not found. `
            + `\n\t1. Download the .exe installer from here: `
            + `https://slproweb.com/products/Win32OpenSSL.html\n\t`
            + `2. Run and install to the "${bpaths.openssl.get()}" directory\n\t`
            + `3. Set it to copy OpenSSL binaries to `
            + `"The OpenSSL binaries (/bin) directory" \n\t`
            + `4. Wait for installation to complete \n\t`
            + `5. Press enter in this command prompt\n`);
        }
        return bpaths.openssl;
    }
}