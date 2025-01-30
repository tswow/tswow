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
import { BuildType } from '../util/BuildType';
import { mpath, wfs } from '../util/FileSystem';
import { WNode } from '../util/FileTree';
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { util } from '../util/Util';
import { BuildCommand } from './CommandActions';
import { Dataset } from './Dataset';
import { Identifier } from './Identifiers';
import { NodeConfig } from './NodeConfig';

/**
 * Contains functions for extracting map data from the client that TrinityCore uses for its AI.
 * If you're familiar with wow server emulation from before, this module
 * runs `mapextractor`, `vmap4extractor`, `vmap4assembler` etc. and installs the results to TrinityCore.
 */
export namespace MapData {
    export function dbc (
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
    ) {
      term.debug('misc', `Extracting dbc from ${dataset.client.path.abs()}`)
      dataset.path.dbc_temp.mkdir();

      wsys.exec(
        `${ipaths.bin.core.pick(dataset.config.EmulatorCore).build.pick(type).mapextractor.get()}`
          + ` -e 2`
          + (dataset.config.EmulatorCore === 'trinitycore' ? ` -d 0` : '')
          + ` -o ${dataset.path.dbc_temp.abs()}`
          + ` -i ${dataset.client.path.abs()}`
        , 'inherit')
      dataset.path.dbc_temp.dbc.copy(dataset.path.dbc_source)
      dataset.path.dbc_temp.dbc.copy(dataset.path.dbc)
      dataset.path.dbc_temp.remove()
    }

    export function map (
          dataset: Dataset
        , type: BuildType = NodeConfig.DefaultBuildType
        , maps: number[] = []
        , tiles: number[] = []
    ) {
        term.debug('misc', `Extracting maps from ${dataset.client.path.abs()}`)
        wsys.exec(
          `${ipaths.bin.core.pick(dataset.config.EmulatorCore).build.pick(type).mapextractor.get()}`
            + ` -e 1`
            + ` -o ${dataset.path.abs()}`
            + ` -i ${dataset.client.path.abs()}`
            + (maps.length>0?` --maps=${maps.join(',')}`:'')
            + (tiles.length>0?` --tiles=${tiles.join(',')}`:'')
          ,'inherit'
        )
    }

    export function vmap_extract(
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
      //, models: string[] = []
      //, maps: number[] = []
      //, tiles: number[] = []
    ) {
      switch(dataset.config.EmulatorCore) {
        case 'trinitycore':
          term.debug('misc', `Extracting vmaps from ${dataset.client.path.abs()}`)
          let prog = `${ipaths.bin.core.pick(dataset.config.EmulatorCore).build.pick(type).vmap4extractor.get()}`
            + ` -o ${dataset.path.Buildings.abs()}`
            + ` -i ${dataset.client.path.Data.abs()}/`
          wsys.exec(prog,'inherit')
          break;
      }
    }

    export function vmap_assemble(
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
    ) {
      switch(dataset.config.EmulatorCore) {
        case 'trinitycore':
          break;
      }
        term.debug('misc', `Assembling vmaps from ${dataset.client.path.abs()}`)
        let prog = `${ipaths.bin.core.pick(dataset.config.EmulatorCore).build.pick(type).vmap4assembler.get()}`
          + ` ${dataset.path.Buildings.get()} ${dataset.path.vmaps.get()}`
        wsys.exec(prog,'inherit');
    }

    export function mmaps(
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
      , maps: number[] = []
      , tiles: number[] = []
      , threadCount?: number
    ) {
      term.debug('misc', `Building mmaps from ${dataset.client.path.abs()}`)
      wsys.execIn(
          dataset.path.get()
        ,   ipaths.bin.core.pick(dataset.config.EmulatorCore).build.pick(type).mmaps_generator.abs().get()
          + (maps.length>0?` --maps=${maps.join(',')}`:'')
          + (tiles.length>0?` --tiles=${tiles.join(',')}`:'')
          + (threadCount !== undefined ? ` --threads=${threadCount}`:'')
        , 'inherit'
        );
    }

    export function luaxml(dataset: Dataset) {
        term.debug('misc', `Building luaxml from ${dataset.client.path.abs()}`)
        wsys.exec(
              `"${ipaths.bin.mpqbuilder.luaxml_exe.get()}"`
            + ` ${dataset.path.luaxml_source.abs()}`
            + ` ${dataset.client.path.Data.abs()}`, 'inherit');
        dataset.path.luaxml_source.copy(dataset.path.luaxml)
    }

    export function initialize() {
        term.debug('misc', `Initializing mapdata`)
        BuildCommand.addCommand(
              'luaxml'
            , 'dataset'
            , 'builds luaxml data for the specified datasets'
            , args => {
                Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                    .forEach(x=>luaxml(x))
            }
        )

        BuildCommand.addCommand(
              'maps'
            , 'dataset --maps=map1,map2.. --tiles=tile1x,tile1y,tile2x,tile2y..'
            , 'Extracts mapfiles for the selected dataset'
            , (args) => {
                let maps = util.intListArgument('--maps=',args);
                let tiles = util.intListArgument('--tiles=',args);
                Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                    .forEach(x=>
                        map(
                            x
                            , Identifier.getBuildType(args,NodeConfig.DefaultBuildType)
                            , maps
                            , tiles
                        ))
            }
        )

        BuildCommand.addCommand('vmaps','','Extracts and assembles vmaps into the selected datasets',(args)=>{
            const bt = Identifier.getBuildType(args,NodeConfig.DefaultBuildType);
            Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                .forEach(x=>{
                    if(!args.includes('--assemble-only'))
                        vmap_extract(x, bt)

                    if(!args.includes('--extract-only'))
                        vmap_assemble(x, bt)
                });
            }
        )

        BuildCommand.addCommand(
                'mmaps'
              , '--maps=map1,map2.. --tiles=tile1x,tile1y,tile2x,tile2y..'
              , 'Extracts mmaps into the selected dataset'
              , args => {
                let maps = util.intListArgument('--maps=',args);
                let tiles = util.intListArgument('--tiles=',args);
                let threadArgs = util.intListArgument('--threads=',args);
                let threadCount = threadArgs.length > 0 ? threadArgs[0] : undefined;
                const bt = Identifier.getBuildType(args, NodeConfig.DefaultBuildType)
                Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                ).forEach(x=>{
                    mmaps(
                          x
                        , bt
                        , maps
                        , tiles
                        , threadCount
                    )
                })
            }
        )
    }
}
