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
import { mpath, wfs } from './FileSystem';
import { isWindows } from './Platform';

export const TDB_URL = "https://github.com/TrinityCore/TrinityCore/releases/download/TDB335.21021/TDB_full_world_335.21021_2021_02_15.7z";

export function tdbFilename() {
    let split = TDB_URL.split('/')
    let joined = split[split.length-1];
    return joined.substring(0,joined.length-3);
}

let installBase = './';
let buildBase = '';

export class InstallPaths {
    static setInstallBase(ipath: string) {
        if(ipath.includes(' ')) {
            throw new Error(
                  `Your TSWoW installation directory contains spaces somewhere in its path,`
                + `please move it to a directory without spaces.`)
        }
        installBase = ipath;
    }

    get revisions() {
        return mpath(this.bin,'revision');
    }

    get tcRevision() {
        return mpath(this.revisions,'trinitycore');
    }

    get tswowRevision() {
        return mpath(this.revisions,'tswow');
    }

    freeBackupPath(base: string) {
        let backup_no = 0;
        const fmt = ()=>`${base}.backup_${backup_no}`;
        while(wfs.exists(fmt())) {
            ++backup_no;
        }
        return fmt();
    }

    /**
     * Returns a path relative to the tswow install root
     * @param path 
     */
    rel(path: string) {
        return wfs.relative(installBase,path);
    }

    addonBuildLib(mod: string) {
        return mpath(
            this.addonBuild(mod)
            , 'addon'
            , 'lib'
        )
    }

    addonLualibGarbage(mod: string) {
        return mpath(
            this.addonBuild(mod)
            , 'lualib_bundle.lua'
        )
    }

    /**
     * Root data paths
     */
    get packageJson() {
        return mpath(installBase,'package.json');
    }

    get base() {
        return installBase;
    }

    /** Publish paths */
    get package() {
        return mpath(installBase, 'package');
    }

    get packageServerZip() {
        return mpath(this.package, 'server.7z');
    }

    packageMpq(dataset: string) {
        return mpath(this.package, `patch-${dataset}.MPQ`);
    }

    datasetSqlDump(dataset: string) {
        return mpath(this.datasetRoot(dataset),'world_dump.sql');
    }

    /** Core data paths */

    moduleFreeGarbage(mod: string) { 
        return this.freeBackupPath(mpath(this.coredata, 'garbage',mod));
    }

    get databaseDir() {return mpath(this.coredata, 'database'); }

    get authRoot() { return mpath(this.coredata, 'authserver');}
    get authConfig() { return mpath(this.authRoot, 'authserver.conf'); }
    get startjs() {return mpath('start.js'); }

    get commandFile() {
        return mpath(installBase,'commands.yaml');
    }

    wsWorkingDir(realm: string) { 
        return mpath(this.realms,realm);
    }

    get coredata() {
        return mpath(installBase,'coredata');
    }

    datasetDir(dataset: string) { 
        return mpath(this.datasets, dataset);
    }

    get defaultDataset() {
        return mpath(this.datasets, 'default-set');
    }

    datasetMaps(dataset: string) {
        return mpath(this.datasetDir(dataset),'maps');
    }

    datasetVmaps(dataset: string) {
        return mpath(this.datasetDir(dataset),'vmaps')
    }

    datasetMmaps(dataset: string) {
        return mpath(this.datasetDir(dataset),'mmaps');
    }

    datasetLuaxmlSource(dataset: string) {
        return mpath(this.datasetDir(dataset),'luaxml_source');
    }

    datasetLuaxml(dataset: string) {
        return mpath(this.datasetDir(dataset),'luaxml');
    }

    datasetLuaxmlToc(dataset: string) {
        return mpath(
            this.datasetLuaxml(dataset)
            ,'Interface'
            ,'FrameXML'
            ,'FrameXML.toc');
    }

    datasetDBCSource(dataset: string) {
        return mpath(this.datasetDir(dataset),'dbc_source');
    }

    datasetModuleList(dataset: string) {
        return mpath(this.datasetDir(dataset),'modules.txt');
    }

    datasetDBC(dataset: string) {
        return mpath(this.datasetDir(dataset),'dbc');
    }

    datasetLuaXML(dataset: string) {
        return mpath(this.datasetDir(dataset),'luaxml');
    }

    /** Dataset paths */
    get datasets() { return mpath(this.coredata, 'datasets'); }
    datasetRoot(dataset: string) { 
        return mpath(this.datasets,dataset); 
    }

    datasetYaml(dataset: string) {
        return mpath(this.datasetRoot(dataset),`${dataset}.dataset.yaml`);
    }

    /** Bin paths */
    get bin() { return mpath(installBase, 'bin'); }

    get binInclude() { return mpath(this.bin, 'include'); }

    get mysqlStartup() { return mpath(this.bin, 'mysql_startup.txt');}
    binLibraries(type: string) { return mpath(this.bin, 'libraries', type); }

    get changeFile() {
        return mpath(this.bin,'tmp','file_changes.txt');
    }

    get binSql() {
        return mpath(this.bin, 'sql');
    }

    get addonInclude() {
        return mpath(this.bin,'include-addon');
    }

    get addonIncludeGlobal() {
        return mpath(this.addonInclude,'global.d.ts');
    }

    get addonIncludeBase64() {
        return mpath(this.addonInclude,'Base64.lua');
    }

    get addonIncludeBinReader() {
        return mpath(this.addonInclude,'BinReader.ts');
    }

    get addonIncludeEventsTs() {
        return mpath(this.addonInclude,'Events.ts');
    }

    get addonIncludeSharedGlobal() {
        return mpath(this.addonInclude,'shared.global.d.ts');
    }

    get addonIncludeLualib() {
        return mpath(this.addonInclude, 'LualibBundle.lua');
    }

    get addonIncludeRequireStub() {
        return mpath(this.addonInclude,'RequireStub.lua')
    }

    tc(type: 'Release'|'Debug') {
        return mpath(this.bin, 'trinitycore', type);
    }

    tcScripts(type: 'Release'|'Debug') {
        return mpath(this.tc(type), 'scripts');
    }

    tcWorldserver(type: 'Release'|'Debug') {
        return isWindows()
            ? mpath(this.tc(type),'worldserver.exe')
            : mpath(this.tc(type),'worldserver')
    }

    tcAuthServer(type: 'Release'|'Debug') {
        return isWindows()
            ? mpath(this.tc(type),'authserver.exe')
            : mpath(this.tc(type), 'authserver');
    }

    tcModuleScript(type: 'Release'|'Debug', mod: string) {
        return isWindows()
            ? mpath(this.tcScripts(type),`scripts_tswow_${mod}.dll`)
            : mpath(this.tcScripts(type),`libscripts_tswow_${mod}.so`);
    }

    tcModulePdb(type: 'Release'|'Debug',mod: string) {
        return mpath(this.tcScripts(type), `${mod}.pdb`);
    }

    get tcTypes(): ('Release'|'Debug')[] {
        return ['Release','Debug'];
    }

    tcAuthserverDist(type: 'Release'|'Debug') {
        return mpath(this.tc(type),'authserver.conf.dist')
    }

    tcWorldserverDist(type: 'Release'|'Debug') {
        return mpath(this.tc(type),'worldserver.conf.dist');
    }

    get sqlUpdates() { return mpath(this.bin, 'sql','updates');}

    sqlUpdateDir(type: 'world'|'auth'|'characters') {
        return mpath(this.sqlUpdates, type);
    }

    get blpConverter() { return mpath(this.bin, 'BLPConverter', 'blpconverter.exe'); }
    get tcRoot() {return mpath(this.bin, 'trinitycore'); }
    get transpilerEntry() { return mpath(this.bin, 'scripts', 'transpiler', 'wowts.js'); }
    get mpqBuilderExe() { 
        return isWindows() 
            ? mpath(this.bin, 'mpqbuilder', 'mpqbuilder.exe')
            : mpath(this.bin, 'mpqbuilder', 'mpqbuilder');
    }
    get tdb() { return mpath(this.bin, tdbFilename()+'.sql'); }
    get cmakeExe() {
        return isWindows()
            ? mpath(this.bin, 'cmake', 'bin', 'cmake.exe')
            : mpath('cmake');
    }
    get cmakeShare() { return mpath(this.bin, 'cmake', 'share'); }
    get tsc() { return mpath(installBase, 'node_modules', 'typescript', 'lib', 'tsc.js'); }
    get addons() { return mpath(this.bin, 'addons')}
    get symlinkMaker() { return mpath(this.bin, 'symlinkmaker.js')}
    get binglobaldts() { return mpath(this.bin, 'include','global.d.ts')}
    get wotlkdata() { return mpath(this.bin, 'scripts','tswow','wotlkdata')}
    get wotlkdataPackageJson() { return mpath(this.wotlkdata, 'package.json')}

    get wotlkdataIndex() { return mpath(this.wotlkdata, 'wotlkdata'); }
    get addonSourceGlobal() { return mpath(this.bin,'scripts','tswow','addons','_global.d.ts')}

    /** node_modules paths */
    get tstlDecorators() { return mpath(`./node_modules/typescript-to-lua/dist/transformation/visitors/class/decorators.js`)}
    get nodeModulesWotlkdata() { return mpath(this.nodeModules, 'wotlkdata'); }

    // TODO: Linux
    get luaxmlExe() {
        return isWindows()
            ? mpath(this.bin, 'mpqbuilder', 'luaxmlreader.exe')
            : mpath(this.bin, 'mpqbuilder', 'luaxmlreader')
    }

    get mysqlBin() {return mpath(this.bin, 'mysql'); }
    get mysqlExe() {
        return isWindows()
            ? mpath(this.bin, 'mysql', 'bin', 'mysql.exe')
            : 'mysql';
    }

    get mysqldExe() {return mpath(this.bin, 'mysql', 'bin', 'mysqld.exe'); }

    get mysqlDumpExe() {
        return isWindows()
            ? mpath(this.bin, 'mysql', 'bin', 'mysqldump.exe')
            : 'mysqldump';
    }

    get sevenZip() { return mpath(this.bin, '7zip'); }

    get sevenZaExe() {
        return isWindows() ? mpath(this.sevenZip, '7za.exe') : '7z';
    }

    get startupSql() { return mpath(this.bin, 'sql'); }


    startupSqlDir(type: 'world'|'auth'|'characters') { 
        return mpath(this.startupSql, type)
    }

    /** Misc paths */
    get nodeModules() { return mpath(installBase, 'node_modules'); }
    get vscodeWorkspace() { return mpath(installBase, '.vscode'); }
    get createCharactersSql() { return mpath(this.bin, 'sql', 'characters_create.sql')}
    get createAuthSql() { return mpath(this.bin, 'sql', 'auth_create.sql')}

    /** Config paths */
    get config() { return mpath(installBase, 'config'); }
    get nodeYaml() { return mpath(installBase, 'node.yaml'); }
    get messageIds() { return mpath('ids.txt'); }

    /** Realm paths */
    get realms() {
        return mpath(this.coredata, 'realms');
    }

    datasetIds(dataset: string) {
        return mpath(this.datasetDir(dataset),'ids.txt');
    }

    realmDir(realm: string) {
        return mpath(this.realms,realm);
    }

    realmWorldserverConf(realm: string) {
        return mpath(this.realmDir(realm),'worldserver.conf');
    }

    realmYaml(realm: string) {
        return mpath(this.realmDir(realm),`${realm}.realm.yaml`);
    }

    realmId(realm: string) {
        return mpath(this.realmDir(realm),'realmid');
    }

    tcConfig(profile: string, config: string) {
        config = config.replace('.conf.dist','.conf');
        if(!config.endsWith('.conf')) config = config+'.conf';
        return mpath(this.realmDir(profile),config);
    }

    /** Client paths */

    luaxmlFrameXML(dataset: string) {
        return mpath(
            this.datasetLuaXML(dataset)
            , 'Interface'
            , 'FrameXML'
        )
    }

    luaxmlAddons(dataset: string){
        return mpath(
            this.datasetLuaxml(dataset)
            ,'Interface'
            ,'FrameXML'
            ,'TSAddons');
    }

    luaxmlAddon(dataset: string, addon:string) {
        return mpath(this.luaxmlAddons(dataset),addon);
    }

    /** Module paths */
    get modules() { return mpath(installBase, 'modules'); }
    moduleData(mod: string) {
        return mpath(this.modules, mod, 'datascripts');
    }

    /**
     * Name of the main data file for a module.
     * @param mod 
     * @example modules/my-module/data/my-module-data.ts
     */
    moduleDataMain(mod: string) {
        return mpath(this.moduleData(mod), `${mod}-data.ts`);
    }

    moduleRoot(mod: string) {
        return mpath(this.modules, mod);
    }

    moduleGit(mod: string) {
        return mpath(this.modules, mod, '.git');
    }

    moduleGitignore(mod: string) {
        return mpath(this.moduleRoot(mod), '.gitignore');
    }

    moduleDataBuild(mod: string) {
        return mpath(this.modules, mod, 'datascripts', 'build' );
    }

    moduleDataTsConfig(mod: string) {
        return mpath(this.moduleData(mod), 'tsconfig.json');
    }

    moduleAssets(mod: string) {
        return mpath(this.modules, mod, 'assets');
    }
    moduleScripts(mod: string) {
        return mpath(this.modules, mod, 'livescripts');
    }

    moduleScriptsGlobaldts(mod: string) {
        return mpath(this.moduleScripts(mod), 'global.d.ts');
    }

    moduleScritpsTsConfig(mod: string) {
        return mpath(this.moduleScripts(mod), 'tsconfig.json');
    }

    moduleMainScript(mod: string) {
        return mpath(this.moduleScripts(mod),`${mod.split('-').join('_')}_scripts.ts`);
    }

    moduleMainScriptName(mod: string) {
        return `${mod.split('-').join('_')}_scripts.ts`;
    }

    moduleScriptsBuild(mod: string) {
        return mpath(this.moduleScripts(mod),'build');
    }

    moduleScriptsLib(mod: string, type: 'Release'|'Debug') {
        return isWindows()
            ? mpath(this.moduleScriptsBuild(mod), 'lib',type)
            : mpath(this.moduleScriptsBuild(mod), 'lib')
    }

    /**
     * The built library path of a module
     * @param mod 
     * @param type 
     */
    moduleScriptsBuiltLibrary(mod: string, type: 'Release'|'Debug') {
        return isWindows()
            ? mpath(this.moduleScriptsLib(mod,type),`${mod}.dll`)
            : mpath(this.moduleScriptsLib(mod,type),`lib${mod}.so`)
    }

    /**
     * @param mod 
     * @param type 
     * @note windows only
     */
    moduleScriptsBuiltPdb(mod: string, type: 'Release'|'Debug') {
        return mpath(this.moduleScriptsLib(mod,type), `${mod}.pdb`);
    }

    moduleNoEdit(mod: string) {
        return mpath(this.modules, mod, 'noedit');
    }

    moduleDataLink(mod: string) {
        return mpath(installBase,'node_modules',mod);
    }

    moduleDataPackagePath(mod: string) {
        return mpath(this.moduleDataBuild(mod),'package.json');
    }

    moduleSymlink(mod: string) {
        return mpath(this.modules, mod, 'symlinked');
    }

    /**
     * The symlinked path to this modules data directory in ./node_modules
     */
    moduleNodeModule(mod: string) {
        return mpath(this.nodeModules, mod);
    }

    moduleShared(mod: string) {
        return mpath(this.modules, mod, 'shared');
    }

    sharedGlobal(mod: string) {
        return mpath(this.moduleShared(mod),'global.d.ts');
    }

    moduleAddons(mod: string) {
        return mpath(this.modules,mod,'addon');
    }

    moduleAddonSourceFile(mod: string, file: string) {
        return mpath(this.moduleAddons(mod),file);
    }

    moduleAddonDestFile(mod: string, file: string) {
        return mpath(this.addonBuild(mod), 'addon', file);
    }

    /**
     * 
     * TODO: What is this file for?
     */
    moduleAddonClasses(mod: string) {
        return mpath(this.moduleAddons(mod), 'classes.json');
    }

    addonToc(mod: string) {
        return mpath(this.moduleAddons(mod),`${mod}.toc`);
    }

    /*
    addonBuildTS(mod: string) {
        return mpath(this.addonBuild(mod),'ts');
    }

    addonBuildTSOut(mod: string) {
        return mpath(
            this.addonBuildTS(mod)
            ,'Interface'
            ,'FrameXML'
            ,'TSAddons',mod)
    }
    */

    addonBuild(mod: string) {
        return mpath(this.moduleAddons(mod),'build');
    }

    addonIndex(mod: string) {
        return mpath(this.moduleAddons(mod),`${mod}-addon.ts`);
    }

    addonTsConfig(mod: string) {
        return mpath(this.moduleAddons(mod),`tsconfig.json`);
    }

    addonDestGlobal(mod: string) {
        return mpath(this.moduleAddons(mod),'global.d.ts');
    }

    addonEventsDest(mod: string) {
        return mpath(this.moduleAddons(mod),'lib','Events.ts');
    }

    addonBinReader(mod: string) {
        return mpath(mpath(this.moduleAddons(mod),'lib','BinReader.ts'));
    }
    
    addonDouble(mod: string) {
        return mpath(this.addonBuild(mod),'Double.lua');
    }
}

export const ipaths = new InstallPaths();

export class BuildPaths {
    static setBuildBase(bpath: string) {
        buildBase = wfs.absPath(bpath);
        if(buildBase.includes(' ')) {
            throw new Error(
                  `Your build directory contains spaces somewhere in its path,`
                + `please move it to a directory without spaces.`)
        }
    }

    get base() {
        if (buildBase.length === 0) {
            throw new Error(`Tried to access a build path, but no build path is configured`);
        }
        return buildBase;
    }

    get cmake() {
        return mpath(this.base, 'cmake');
    }

    get stormlibInstall() {
        return mpath(this.base, 'StormLibInstall');
    }

    get stormlibBuild() {
        return mpath(this.base, 'StormLibBuild');
    }

    get stormLibBuildRelease() {
        return mpath(this.stormlibBuild,'Release');
    }

    get stormLibInclude() {
        return isWindows() 
            ? mpath(this.stormLibBuildRelease)
            : mpath(this.stormlibInstall, 'include')
    }

    // windows-only
    get zlibLibrary() {
        return mpath(this.base,'zlib','lib','zlib.lib');
    }

    // windows-only
    get zlibInclude() {
        return mpath(this.base,'zlib','include');
    }

    // windows-only
    get bzip2Library() {
        return mpath(this.base,'bzip2','lib','bzip2.lib');
    }

    // windows-only
    get bzip2Include() {
        return mpath(this.base,'bzip2','include');
    }

    get stormLibLibraryFile() {
        return isWindows() 
            ? mpath(this.stormlibBuild, 'Release','storm.lib') 
            : mpath(this.stormlibInstall,'lib','libstorm.a');
    }

    get mpqBuilder() {
        return mpath(this.base, 'mpqbuilder');
    }

    get mpqBuilderBinary() {
        return isWindows() 
            ? mpath(this.mpqBuilder,'Release','mpqbuilder.exe')
            : mpath(this.mpqBuilder,'mpqbuilder')

    }

    get luaxmlBinary() {
        return isWindows() 
            ? mpath(this.mpqBuilder,'Release','luaxmlreader.exe')
            : mpath(this.mpqBuilder,'luaxmlreader')

    }

    get trinitycore() { return mpath(this.base,'trinitycore'); }

    trinitycoreBin(type: string) {
        return isWindows() ? mpath(this.trinitycore, 'Bin', type)
            : mpath(this.trinitycore, 'install', 'trinitycore', 'bin');
    }

    trinitycoreConf(type: string) {
        return isWindows() ? bpaths.trinitycoreBin(type)
            : mpath(this.trinitycore, 'install', 'trinitycore', 'etc');
    }
    
    get mysql() { return mpath(this.base, 'mysql'); }

    get openssl() { return mpath(this.base,'openssl'); }

    get blpConverterBuilt() { return mpath(this.base, 'BLPConverter','Release','BLPConverter.exe'); }
    get blpConverterDownload() { return mpath(this.base, 'BLPConverter.exe'); }

    get tdb7z() { return mpath(this.base, tdbFilename()+'.7z'); }
    get tdbSql() { return mpath(this.base, tdbFilename()+'.sql'); }

    get sevenZip() {return mpath(this.base, '7zip')}

    mysqlLibs(mysqlRoot: string) {
        return ['libmysql.dll','libmysqld.dll']
            .map(x=>mpath(mysqlRoot,'lib',x))
    }

    libcrypto(opensslRoot: string) {
        return mpath(opensslRoot,'libcrypto-1_1-x64.dll');
    }

    tcStaticLibraries(type: string) {
        if(isWindows()) {
            return [
                `dep/zlib/${type}/zlib.lib`,
                `src/server/shared/${type}/shared.lib`,
                `dep/SFMT/${type}/sfmt.lib`,
                `dep/g3dlite/${type}/g3dlib.lib`,
                `dep/fmt/${type}/fmt.lib`,
                `dep/recastnavigation/Detour/${type}/detour.lib`,
                `src/server/database/${type}/database.lib`,
                `src/server/game/${type}/game.lib`,
                `src/common/${type}/common.lib`,
                `dep/argon2/${type}/argon2.lib`]
            .map(x=>mpath(this.trinitycore,x))
        } else {
            return [
                `install/trinitycore/lib/libcommon.so`,
                `install/trinitycore/lib/libdatabase.so`,
                `install/trinitycore/lib/libgame.so`,
                `install/trinitycore/lib/libshared.so`,
            ].map(x=>mpath(this.trinitycore,x));
        }
    }

    get stormLibMainHeader() {
        return mpath(this.stormlibBuild,'Release','StormLib.h')
    }

    get stormLibPortHeader() {
        return mpath(this.stormlibBuild,'Release','StormPort.h')
    }
}

export const bpaths = new BuildPaths();

export class SourcePaths {
    get installConfig() { 
        return './install-config';
    }

    get trinityCore() {
        return './TrinityCore';
    }

    get liveScriptHeaders() {
        return mpath(this.trinityCore,'src','server','game','Tswow','Scripting','Public');
    }

    get buildYaml() {
        return './build.yaml';
    }
    
    get installAddonInclude() {
        return mpath(this.installConfig, 'include-addon');
    }

    get installPackageJson() {
        return mpath(this.installConfig,'package.json');
    }

    get installNodeYaml() {
        return mpath(this.installConfig, 'node.yaml');
    }

    get installVscodeSettings() {
        return mpath(this.installConfig, '.vscode-install');
    }

    get installAddons() {
        return mpath(this.installConfig, 'addons');
    }

    get installSymlinkMaker() {
        return mpath(this.installConfig, 'symlinkmaker.js');
    }

    get sqlUpdates() {
        return mpath(this.trinityCore,'sql','updates');
    }

    get scripts() {
        return mpath('./tswow-scripts');
    }

    get scriptsSql() {
        return mpath(this.scripts, 'sql');
    }

    get tcGlobaldts() {
        return mpath(this.liveScriptHeaders, 'global.d.ts');
    }

    get wotlkdataPackageJson() {
        return mpath(this.scripts,'wotlkdata','package.json')
    }

    get startJs() {
        return mpath(this.installConfig,'start.js');
    }

    get stormLib() {
        return './StormLib';
    }

    get stormLibMainHeader() {
        return mpath(this.stormLib,'src','StormLib.h');
    }

    get stormLibPortHeader() {
        return mpath(this.stormLib,'src','StormPort.h')
    }

    get typeScript2Cxx() {
        return mpath('./TypeScript2Cxx');
    }
}

export const spaths = new SourcePaths();

import { Datasets } from '../runtime/Dataset';