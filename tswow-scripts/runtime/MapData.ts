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
import { BuildType, findBuildType } from '../util/BuildType';
import { mpath, wfs } from '../util/FileSystem';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { util } from '../util/Util';
import { commands } from './Commands';
import { Datasets } from './Dataset';
import { NodeConfig } from './NodeConfig';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    export function dbc (
        dataset: Datasets.Dataset
      , type: BuildType = NodeConfig.default_build_type
    ) {
      let tempDbc = ipaths.datasetTempDBC(dataset.id);
      let tmp = ipaths.datasetTemp(dataset.id);

      wfs.mkDirs(tmp);

      let clientPath = dataset.client.path;
      if(clientPath.endsWith('\\') || clientPath.endsWith('/')) {
        clientPath = clientPath.substring(0,clientPath.length-1);
      }
      let prog = `${ipaths.tcMapExtractor(type)}`
        + ` -e 2`
        + ` -d 0`
        + ` -o ${tmp}`
        + ` -i ${clientPath}`

      wsys.exec(prog,'inherit')
      wfs.copy(tempDbc,ipaths.datasetDBC(dataset.id),true);
      wfs.copy(tempDbc,ipaths.datasetDBCSource(dataset.id),true);
      wfs.remove(tempDbc);
    }

    export function map (
          dataset: Datasets.Dataset
        , type: BuildType = NodeConfig.default_build_type
        , maps: number[] = []
        , tiles: number[] = []
        ) {

        let prog = `${ipaths.tcMapExtractor(type)}`
          + ` -e 1`
          + ` -o ${ipaths.datasetDir(dataset.id)}`
          + ` -i ${dataset.client.path}`
          + (maps.length>0?` --maps=${maps.join(',')}`:'')
          + (tiles.length>0?` --tiles=${tiles.join(',')}`:'')

        wsys.exec(prog,'inherit')
    }

    export function vmap_extract(
      dataset: Datasets.Dataset
      , type: BuildType = NodeConfig.default_build_type
      , models: string[] = []
      , maps: number[] = []
      , tiles: number[] = []
    ) {
      let prog = `${ipaths.tcVmap4extractor(type)}`
        + ` -o ${wfs.absPath(mpath(ipaths.datasetDir(dataset.id),'Buildings'))}`
        + ` -i ${dataset.client.dataPath}/`
      wsys.exec(prog,'inherit')
    }

    export function vmap_assemble(
        dataset: Datasets.Dataset
      , type: BuildType = NodeConfig.default_build_type
      ) {
        let prog = `${ipaths.tcVmap4Assembler(type)}`
          + ` ${ipaths.datasetBuildings(dataset.id)} ${ipaths.datasetVmaps(dataset.id)}`
        wsys.exec(prog,'inherit');
    }

    export function mmaps(
        dataset: Datasets.Dataset
      , type: BuildType = NodeConfig.default_build_type
      , maps: number[] = []
      , tiles: number[] = []
    ) {
      let prog = `${wfs.absPath(ipaths.tcMMapsGenerator(type))}`
      + (maps.length>0?` --maps=${maps.join(',')}`:'')
      + (tiles.length>0?` --tiles=${tiles.join(',')}`:'')

      wsys.execIn(
          ipaths.datasetDir(dataset.id)
        , prog
        , 'inherit'
        );
    }

    export function luaxml(dataset: Datasets.Dataset) {
        wsys.exec(
              `"${ipaths.luaxmlExe}"`
            + ` ${wfs.absPath(ipaths.datasetLuaxmlSource(dataset.id))}`
            + ` ${dataset.client.dataPath}`, 'inherit');
    }

    export function initialize() {
        const extractors = commands.addCommand('extract');

        extractors.addCommand(
            'dbc'
          , ''
          , 'Extracts dbc files for the selected dataset.'
          , (args)=>{
          Datasets.getDatasetsOrDefault(args).forEach(x=>{
            dbc(
                x
              , findBuildType(args)
            );
          });
        });

        extractors.addCommand(
            'maps'
          , '--maps=map1,map2.. --tiles=tile1x,tile1y,tile2x,tile2y..'
          , 'Extracts map files for the selected dataset'
          ,(args)=>{
          let maps = util.intListArgument('--maps=',args);
          let tiles = util.intListArgument('--tiles=',args);
          Datasets.getDatasetsOrDefault(args).forEach(x=>{
            map(
                x
              , findBuildType(args)
              , maps
              , tiles)
          });
        });

        extractors.addCommand('vmaps','','Extracts and assembles vmaps into the selected datasets',(args)=>{
          Datasets.getDatasetsOrDefault(args).forEach(x=>{
            if(!args.includes('--assemble-only'))
              vmap_extract(
                  x
                , findBuildType(args)
                , []
                , []
                , []
              )

            if(!args.includes('--extract-only'))
              vmap_assemble(
                  x
                , findBuildType(args)
              )
          });
        });

        extractors.addCommand(
            'mmaps'
          , '--maps=map1,map2.. --tiles=tile1x,tile1y,tile2x,tile2y..'
          , 'Extracts mmaps into the selected dataset'
          , (args)=>{
          let maps = util.intListArgument('--maps=',args);
          let tiles = util.intListArgument('--tiles=',args);
          Datasets.getDatasetsOrDefault(args).forEach(x=>{
            mmaps(
                x
              , findBuildType(args)
              , maps
              , tiles
            )
          });
        });
    }
}