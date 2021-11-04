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
import { mpath } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';

export namespace IMInstall {
    export async function install() {
        if(!isWindows()) {
            return;
        }

        while(!bpaths.im.exists()) {
            await wsys.userInput(`ImageMagick is not installed:\n\t`
            + `1. Download https://download.imagemagick.org/ImageMagick/download/binaries/ImageMagick-7.1.0-portable-Q16-x64.zip\n\t`
            + `2.Extract it to ${bpaths.im.get()} `
            + `(${mpath(bpaths.im.convert_exe.get())} and ${mpath(bpaths.im.magic_exe.get())} should exist)\n\t`
            + `3.Press enter in this prompt`);
        }

        bpaths.im.convert_exe.copy(ipaths.bin.im.convert)
        bpaths.im.magic_exe.copy(ipaths.bin.im.magick)
    }
}