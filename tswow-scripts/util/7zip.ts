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
import { isWindows } from './Platform';
import { wsys } from './System';

export namespace SevenZip {
    export function extract(sevenZipPath: string, archive: string, out: string) {
        if(isWindows()) {
            wsys.exec(`"${sevenZipPath}" e -o${out} ${archive}`);
        } else {
            // todo: unused but needs out directory
            wsys.exec(`p7zip -d -k e "${archive}"`)
        }
    }

    export function makeArchive(sevenZipPath: string, zipPath: string, directoryIn: string[]) {
        wsys.exec(`"${sevenZipPath}" a ${zipPath} ${directoryIn.join(' ')} -mx=9 -mmt=on`,'inherit');
    }
}