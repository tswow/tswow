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

import { generateTree, dir, file } from "../util/FileTree";

export function TestsDirectory(inPath: string) {
    return generateTree(inPath, dir({
        global_d_ts: file('global.d.ts'),
        tsconfig_json: file('tsconfig.json'),
        test_conf: file('test.conf'),
        package_json: file('package.json'),
        mocharc_json: file('.mocharc.json'),
        tests: dir({
            example_test_ts: file('example.test.ts'),
            utils_test_ts: file('utils.test.ts')
        }),
        bin: dir({
            tests: dir({})
        })
    }));
}
