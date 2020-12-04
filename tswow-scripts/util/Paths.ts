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
    get worldPlain1() {return mpath(this.coreData, 'mysql', 'world_plain_1'); }
    get worldPlain2() {return mpath(this.coreData, 'mysql', 'world_plain_2'); }
    get dbcSource() {return mpath(this.coreData, 'dbc_source'); }
    get dbcBuild() {return mpath(this.coreData, 'dbc'); }
    get luaxmlSource() { return mpath(this.coreData, 'luaxml_base'); }
    get luaxmlBuild() { return mpath(this.coreData, 'luaxml'); }

    /** Bin paths */

    get bin() { return mpath(this.installBase, 'bin'); }
    get tcRelease() {return mpath(this.bin, 'trinitycore', 'release'); }
    get tcDebug() {return mpath(this.bin, 'trinitycore', 'release'); }
    // TODO: Linux
    get luaxmlExe() {return mpath(this.bin, 'mpqbuilder', 'luaxmlreader.exe'); }
    get mysqlExe() {return mpath(this.bin, 'mysql', 'bin', 'mysql.exe'); }
    get mysqldExe() {return mpath(this.bin, 'mysql', 'bin', 'mysqld.exe'); }
    get sevenZaExe() { return mpath(this.bin, '7zip', '7za.exe'); }
    get startupSql() { return mpath(this.bin, 'sql'); }

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
