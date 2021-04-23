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
import { wfs, mpath } from '../util/FileSystem';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { Timer } from '../util/Timer';
import { isWindows } from '../util/Platform';
import { ipaths } from '../util/Paths';
import { Datasets } from './Dataset';
import { DEFAULT_BUILD_TYPE } from '../util/BuildType';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    function prepareBuild(dataset: Datasets.Dataset) {
        const copiedFiles = isWindows()
            ? [
                  'mapextractor.exe'
                , 'mmaps_generator.exe'
                , 'vmap4assembler.exe'
                , 'vmap4extractor.exe'
                , 'common.dll'
              ]
            : [
                  'mapextractor'
                , 'mmaps_generator'
                , 'vmap4assembler'
                , 'vmap4extractor'
              ];

        // TODO: move to Paths.ts
        const copiedLibraries = isWindows() 
            ? [
                  'libcrypto-1_1-x64.dll'
                , 'libmysql.dll'
                , 'libmysqld.dll'
              ] 

            : [

              ];

        // TODO: Let user choose which to use
        const inDir =  ipaths.tc(DEFAULT_BUILD_TYPE)

        // Copy over all necessary library files
        for (const file of copiedFiles) {
            wfs.copy(mpath(inDir, file), mpath(dataset.client.path, file));
        }

        for (const file of copiedLibraries) {
            wfs.copy(mpath(inDir,file), mpath(dataset.client.path, file));
        }
    }

    export function buildMaps(dataset: Datasets.Dataset) {
        prepareBuild(dataset);
        wfs.remove(mpath(dataset.client.path,'maps'))
        wsys.execIn(
              dataset.client.path
            , `${isWindows() ? '' : './'}mapextractor`);
        wfs.copy(
            mpath(dataset.client.path,'maps')
          , ipaths.datasetMaps(dataset.id), true);
        wfs.copy(
            mpath(dataset.client.path,'dbc')
          , ipaths.datasetDBC(dataset.id), true);

        wfs.copy(
            mpath(dataset.client.path,'dbc')
          , ipaths.datasetDBCSource(dataset.id), true);
    }

    export function buildVmaps(dataset: Datasets.Dataset) {
        wfs.remove(mpath(dataset.client.path,'vmaps'));
        wfs.remove(mpath(dataset.client.path,'Buildings'));
        wsys.execIn(
              dataset.client.path
            , `${isWindows() ? '' : './'}vmap4extractor`);
        wfs.mkDirs(mpath(dataset.client.path,'vmaps'));
        wsys.execIn(
              dataset.client.path
            , `${isWindows() ? '' : './'}vmap4assembler Buildings vmaps`);
        wfs.copy(mpath(dataset.client.path,'vmaps'), ipaths.datasetVmaps(dataset.id), true);
    }

    export function buildMMaps(dataset: Datasets.Dataset) {
        term.log('Building MMAPS (this will take a very long time)');
        const timer = Timer.start();
        if(!wfs.exists(mpath(dataset.client.path,'maps'))) {
            buildMaps(dataset);
        }

        if(!wfs.exists(mpath(dataset.client.path,'vmaps'))) {
            buildVmaps(dataset);
        }

        wsys.execIn(
              dataset.client.path
            , `${isWindows() ? '' : './'}mmaps_generator`);
        wfs.copy(
            mpath(dataset.client.path,'mmaps')
          , ipaths.datasetMmaps(dataset.id));
        term.success(`Rebuilt mmaps in ${timer.timeSec()}s`);
    }

    export function buildLuaXML(dataset: Datasets.Dataset) {
        wsys.exec(
              `"${ipaths.luaxmlExe}"`
            + ` ${wfs.absPath(ipaths.datasetLuaxmlSource(dataset.id))}`
            + ` ${dataset.client.dataPath}`, 'inherit');
    }
}