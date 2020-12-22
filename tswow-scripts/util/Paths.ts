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

let installBase = './';
let buildBase = '';

export class InstallPaths {
    static setInstallBase(ipath: string) {
        installBase = ipath;
    }

    /** Core data paths */

    get coreData() { return mpath(installBase, 'coredata'); }
    get maps() {return mpath(this.coreData, 'maps'); }
    get mmaps() {return mpath(this.coreData, 'mmaps'); }
    get vmaps() {return mpath(this.coreData, 'vmaps'); }
    get mysqlData() {return mpath(this.coreData, 'mysql'); }
    get worldPlain1() {return mpath(this.coreData, 'mysql_plain', 'world_plain_1'); }
    get worldPlain2() {return mpath(this.coreData, 'mysql_plain', 'world_plain_2'); }
    get dbcSource() {return mpath(this.coreData, 'dbc_source'); }
    get dbcBuild() {return mpath(this.coreData, 'dbc'); }
    get luaxmlSource() { return mpath(this.coreData, 'luaxml_source'); }
    get luaxmlBuild() { return mpath(this.coreData, 'luaxml'); }
    get startjs() {return mpath(this.coreData, 'start.js'); }
    get coreIds() { return mpath(this.coreData, 'ids.txt'); }

    /** Bin paths */
    get bin() { return mpath(installBase, 'bin'); }
    get blpConverter() { return mpath(this.bin, 'BLPConverter', 'blpconverter.exe'); }
    get tcRelease() {return mpath(this.bin, 'trinitycore', 'release'); }
    get tcReleaseScripts() { return mpath(this.tcRelease, 'scripts'); }
    get tcDebug() {return mpath(this.bin, 'trinitycore', 'release'); }
    get tcDebugScripts() { return mpath(this.tcDebug, 'scripts'); }
    get tcRoot() {return mpath(this.bin, 'trinitycore'); }
    get transpilerEntry() { return mpath(this.bin, 'scripts', 'transpiler', 'wowts.js'); }
    get mpqBuilderExe() { return mpath(this.bin, 'mpqbuilder', 'mpqbuilder.exe'); }
    get tdb() { return mpath(this.bin, 'tdb.7z'); }
    get cmakeExe() { return mpath(this.bin, 'cmake', 'bin', 'cmake.exe'); }
    get cmakeShare() { return mpath(this.bin, 'cmake', 'share'); }
    get tsc() { return mpath(installBase, 'node_modules', 'typescript', 'lib', 'tsc.js'); }
    get addons() { return mpath(this.bin, 'addons')}

    // TODO: Linux
    get luaxmlExe() {return mpath(this.bin, 'mpqbuilder', 'luaxmlreader.exe'); }
    get mysqlBin() {return mpath(this.bin, 'mysql'); }
    get mysqlExe() {return mpath(this.bin, 'mysql', 'bin', 'mysql.exe'); }
    get mysqldExe() {return mpath(this.bin, 'mysql', 'bin', 'mysqld.exe'); }
    get sevenZaExe() { return mpath(this.bin, '7zip', '7za.exe'); }

    get startupSql() { return mpath(this.bin, 'sql'); }

    /** Misc paths */
    get nodeModules() { return mpath(installBase, 'node_modules'); }
    get vscodeWorkspace() { return mpath(installBase, '.vscode'); }
    get createCharactersSql() { return mpath(this.bin, 'sql', 'characters_create.sql')}

    /** Config paths */
    get config() { return mpath(installBase, 'config'); }
    get tswowConfig() { return mpath(this.config, 'tswow.yaml'); }
    get configIds() { return mpath(this.config, 'ids.txt'); }

    /** Module paths */
    get modules() { return mpath(installBase, 'modules'); }
    moduleData(mod: string) {
        return mpath(this.modules, mod, 'data');
    }

    moduleRoot(mod: string) {
        return mpath(this.modules, mod);
    }

    moduleGit(mod: string) {
        return mpath(this.modules, mod, '.git');
    }

    moduleDataBuild(mod: string) {
        return mpath(this.modules, mod, 'data', 'build' );
    }
    moduleAssets(mod: string) {
        return mpath(this.modules, mod, 'assets');
    }
    moduleScripts(mod: string) {
        return mpath(this.modules, mod, 'scripts');
    }
    moduleNoEdit(mod: string) {
        return mpath(this.modules, mod, 'noedit');
    }
}

export const ipaths = new InstallPaths();

export class BuildPaths {
    static setBuildBase(bpath: string) {
        buildBase = bpath;
    }

    get base() {
        if (buildBase.length === 0) {
            throw new Error(`Tried to access a build path, but no build path is configured`);
        }
        return buildBase;
    }

    get tdb() { return mpath(this.base, 'tdb.7z'); }
}

export const bpaths = new BuildPaths();
