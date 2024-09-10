/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2022 tswow <https://github.com/tswow/>
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
import { ipaths } from "../util/Paths"
import { isWindows } from "../util/Platform"
import { bpaths } from "./CompilePaths"

export function copyExtLibs(core: 'trinitycore', type: string) {
    if (isWindows()) {
        [
            bpaths.mysql.find_subdir().lib.libmysql_dll,
            bpaths.mysql.find_subdir().lib.libmysqld_dll
        ].forEach(x=>{
            x.copy(ipaths.bin.core.pick(core).build.pick(type).join(x.basename()))
        })
        bpaths.openssl.libcrypto_dll
            .copy(ipaths.bin.core.pick(core).build.pick(type).libcrypto)
    }
}
