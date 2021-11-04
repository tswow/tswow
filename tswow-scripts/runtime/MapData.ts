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
import { ipaths } from '../util/Paths';
import { wsys } from '../util/System';
import { InitializeCommand } from './CommandActions';
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
      dataset.path.dbc_temp.mkdir();
      wsys.exec(
        `${ipaths.bin.trinitycore.build.pick(type).mapextractor.get()}`
          + ` -e 2`
          + ` -d 0`
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
        wsys.exec(
          `${ipaths.bin.trinitycore.build.pick(type).mapextractor.get()}`
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
      let prog = `${ipaths.bin.trinitycore.build.pick(type).vmap4extractor.get()}`
        + ` -o ${dataset.path.Buildings.abs()}`
        + ` -i ${dataset.client.path.Data.abs()}/`
      wsys.exec(prog,'inherit')
    }

    export function vmap_assemble(
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
      ) {
        let prog = `${ipaths.bin.trinitycore.build.pick(type).vmap4assembler.get()}`
          + ` ${dataset.path.Buildings.get()} ${dataset.path.vmaps.get()}`
        wsys.exec(prog,'inherit');
    }

    export function mmaps(
        dataset: Dataset
      , type: BuildType = NodeConfig.DefaultBuildType
      , maps: number[] = []
      , tiles: number[] = []
    ) {
      wsys.execIn(
          dataset.path.get()
        ,   ipaths.bin.trinitycore.build.pick(type).mmaps_generator.get()
          + (maps.length>0?` --maps=${maps.join(',')}`:'')
          + (tiles.length>0?` --tiles=${tiles.join(',')}`:'')
        , 'inherit'
        );
    }

    export function luaxml(dataset: Dataset) {
        wsys.exec(
              `"${ipaths.bin.mpqbuilder.luaxml_exe.get()}"`
            + ` ${dataset.path.luaxml_source.abs()}`
            + ` ${dataset.client.path.Data.abs()}`, 'inherit');
        dataset.path.luaxml_source.copy(dataset.path.luaxml)
    }

    export function initialize() {
        InitializeCommand.addCommand(
              'luaxml'
            , 'dataset'
            , 'builds luaxml data for the specified datasets'
            , args => {
                Identifier.getDatasets(args,'MATCH_ANY',NodeConfig.DefaultDataset)
                    .forEach(x=>luaxml(x))
            }
        )
    }
}