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
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

const BOOST_URL = "https://github.com/tswow/misc/releases/download/boost-1.72/boost_1_72_0.zip"

export namespace Boost {
    export async function install() {
        await DownloadFile(BOOST_URL,bpaths.boostArchive.get())
        if(!bpaths.boost.exists()) {
            await ExtractZip(bpaths.boostArchive.get(),{dir:bpaths.boost.boost_1_72_0.abs().get()});
        }
        return bpaths.boost.boost_1_72_0.abs().get();
    }
}