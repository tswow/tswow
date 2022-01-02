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
import { wsys } from '../util/System';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

const BOOST_URL = "https://boostorg.jfrog.io/artifactory/main/release/1.72.0/source/boost_1_72_0.zip"
const BOOST_PATH = `C:\\local\\boost_1_72_0`;
const BOOST_VARIABLE = `C:/local/boost_1_72_0`;

export namespace Boost {
    export async function install() {
        await DownloadFile(BOOST_URL,bpaths.boostArchive.get())
        if(!wfs.exists(BOOST_PATH)) {
            ExtractZip(bpaths.boostArchive.get(),{dir:BOOST_PATH});
        }
        wsys.exec(`setx BOOST_ROOT ${BOOST_VARIABLE}`);
        return BOOST_PATH;
    }
}