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
import { mpath } from './FileSystem';

export class InstallPaths {
    readonly installBase: string;
    constructor(installBase: string) {
        this.installBase = installBase;
    }

    /** Core data paths */

    get coreData() { return mpath(this.installBase, 'coredata'); }
    get maps() {return mpath(this.coreData, 'maps'); }
    get mmaps() {return mpath(this.coreData, 'mmaps'); }
    get vmaps() {return mpath(this.coreData, 'vmaps'); }
    get mysqlData() {return mpath(this.coreData, 'mysql'); }
    get worldPlain1() {return mpath(this.coreData, 'world_plain_1'); }
    get worldPlain2() {return mpath(this.coreData, 'world_plain_2'); }
    get dbcSource() {return mpath(this.coreData, 'dbc_source'); }
    get dbcBuild() {return mpath(this.coreData, 'dbc'); }

    /** Bin paths */

    get bin() { return mpath(this.installBase, 'bin'); }
    get tcRelease() {return mpath(this.bin, 'trinitycore', 'release'); }
    get tcDebug() {return mpath(this.bin, 'trinitycore', 'release'); }

    /** Misc paths */
    get nodeModules() { return mpath(this.installBase, 'node_modules'); }

    /** Module paths */
    get modules() { return mpath(this.installBase, 'modules'); }
    moduleData(mod: string) {
        return mpath(this.modules, mod, 'data');
    }
    moduleAssets(mod: string) {
        return mpath(this.modules, mod, 'assets');
    }
    moduleScripts(mod: string) {
        return mpath(this.modules, mod, 'scripts');
    }
}
