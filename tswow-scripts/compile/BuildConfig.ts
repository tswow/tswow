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

import { TDB_URL } from "../util/Paths";

// Dependency locations

export const CMAKE_DOWNLOAD_URL = 'https://github.com/Kitware/CMake/releases/download/v3.25.0/cmake-3.25.0-windows-x86_64.zip';
export const SZIP_DOWNLOAD_URL = 'https://www.7-zip.org/a/7za920.zip';
export const OPENSSL_DOWNLOAD_URL = 'https://github.com/tswow/misc/releases/download/openssl-test-1/openssl.zip';
export const SOURCE_ADT_URL = 'https://github.com/tswow/misc/releases/download/adt-template/source.adt'
export const BLPCONVERTER_URL = 'https://github.com/tswow/BLPConverter/releases/download/1.0/BLPConverter.exe'
export const BOOST_URL = 'https://github.com/tswow/misc/releases/download/boost-1.74/boost_1_74_0.zip'
export const MYSQL_URL = 'https://github.com/tswow/misc/releases/download/mysql-5.7.32/mysql-5.7.32-winx64.zip'
export const OPENSSL_URL = 'https://github.com/tswow/misc/releases/download/openssl-test-1/openssl.zip'
export const IMAGEMAGICK_URL = 'https://github.com/tswow/misc/releases/download/imagemagick-7.1.0/ImageMagick-7.1.0-portable-Q16-x64.zip'
export const TDB_URL_COMPILE = TDB_URL // change value at reference

// Misc settings

export const CLEAR_ARCHIVES = process.argv.includes('clear-archives')
export const isInteractive = process.argv.includes("--interactive")
if(CLEAR_ARCHIVES && isInteractive) {
    throw new Error(`Cannot clear archives in an interactive build!`)
}