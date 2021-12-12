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

export const CMAKE_DOWNLOAD_URL = 'https://github.com/Kitware/CMake/releases/download/v3.18.3/cmake-3.18.3-win64-x64.zip';
export const OPENSSL_DOWNLOAD_URL = 'https://slproweb.com/download/Win64OpenSSL-1_1_1h.exe';
export const BLENDER_DOWNLOAD_URL = 'https://download.blender.org/release/Blender2.79/blender-2.79b-windows64.zip';

export const isInteractive = process.argv.includes("--interactive")