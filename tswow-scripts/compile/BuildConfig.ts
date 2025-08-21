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

export interface FileDownload {
    url: string;
    hash: string;
}

export const CMAKE_DOWNLOAD: FileDownload = {
    url: 'https://github.com/Kitware/CMake/releases/download/v3.25.0/cmake-3.25.0-windows-x86_64.zip',
    hash: 'b46030c10cab1170355952f9ac59f7e6dabc248070fc53f15dff11d4ed2910f8'
}

export const SZIP_DOWNLOAD: FileDownload = {
    url: 'https://www.7-zip.org/a/7za920.zip',
    hash: '2a3afe19c180f8373fa02ff00254d5394fec0349f5804e0ad2f6067854ff28ac'
}

export const SZ_SFX_DOWNLOAD: FileDownload = {
    url: 'https://github.com/tswow/misc/releases/download/7z.sfx/7z.sfx',
    hash: '3af679ae9456a73095bea74ce4238b4a2f3793c261532f3818c5ee6b844bf2fa'
}

export const OPENSSL_DOWNLOAD: FileDownload = {
    url: 'https://github.com/tswow/misc/releases/download/openssl-test-1/openssl.zip',
    hash: 'e19bdb2524871a051aa7c32d8c46336e8f15922c59258b38b85b7c0b05585189'
}
export const SOURCE_ADT_DOWNLOAD = {
    url: 'https://github.com/tswow/misc/releases/download/adt-template/source.adt',
    hash: 'c8b5bfd19714e11a7becadf64598213c7d0ffec706e17d03a56c1a5caab1a9d4'
}
export const BOOST_DOWNLOAD = {
    url: 'https://github.com/tswow/misc/releases/download/boost-1.82/boost_1_82_0.zip',
    hash: '68fe96dadfedda15b6bfe71813d1af93d4903b1aedf265a7f0baf2fd042a730e'
}
export const MYSQL_DOWNLOAD = {
    url: 'https://github.com/tswow/misc/releases/download/mysql-5.7.32/mysql-5.7.32-winx64.zip',
    hash: '1171b71f1bcb2a5c71ee4cb86cdf981e3c7e390951edee43b70adf885b7154da'
}
export const IMAGEMAGICK_DOWNLOAD = {
    url: 'https://github.com/tswow/misc/releases/download/imagemagick-7.1.0/ImageMagick-7.1.0-portable-Q16-x64.zip',
    hash: '9be2e78f9f3e50b98207e718ed52f75af24e9333cbac9c0177977a9ea23799ca'
}
export const NODE_DOWNLOAD = {
    url: 'https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip',
    hash: 'f5cea43414cc33024bbe5867f208d1c9c915d6a38e92abeee07ed9e563662297'
}
export const CLIENT_EXTENSIONS_DOWNLOAD = {
    url: 'https://github.com/tswow/misc/releases/download/client-extensions-test/ClientExtensions.dll',
    hash: '9175062099d3034f25e146671d07632b0dd3db4994e50edcf36eaeff6771c530'
}

// Misc settings

export const CLEAR_ARCHIVES = process.argv.includes('clear-archives')
export const isInteractive = process.argv.includes("--interactive")
if(CLEAR_ARCHIVES && isInteractive) {
    throw new Error(`Cannot clear archives in an interactive build!`)
}