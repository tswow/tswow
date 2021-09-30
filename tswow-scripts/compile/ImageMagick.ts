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
import { bpaths, ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';

export namespace IMInstall {
    export async function install() {
        if(!isWindows()) {
            return;
        }

        while(!wfs.exists(bpaths.imConvert) && !wfs.exists(bpaths.imMagick)) {
            await wsys.userInput(`ImageMagick is not installed:\n\t`
            + `1. Download https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.1.0-portable-Q16-x64.zip\n\t`
            + `2.Extract it to ${bpaths.imConvert} `
            + `(${mpath(bpaths.imConvert)} and ${mpath(bpaths.imMagick)} should exist)\n\t`
            + `3.Press enter in this prompt`);
        }

        if(!wfs.exists(ipaths.imConvert)) {
            wfs.copy(bpaths.imConvert,ipaths.imConvert);
        }

        if(!wfs.exists(ipaths.imMagick)) {
            wfs.copy(bpaths.imConvert,ipaths.imMagick);
        }
    }
}