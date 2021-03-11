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
import { wfs } from './FileSystem';
import { FileChanges } from './FileChanges';
import { ipaths } from './Paths';

/**
 * Contains functions for finding and handling MPQ files.
 */
export namespace mpq {
    /**
     * Find all MPQ files in the configured client directory.
     * @throws If there are multiple directories not ending in .mpq/.MPQ in the Data directory,
     *         since we don't know which one is the real Data/lang directory.
     * @returns All MPQ files in the clients Data and Data/lang directories
     */
    export function getMPQFiles(dataset: string) {
        const dataMpqs = wfs.readDir(ipaths.clientData(dataset), false, 'files')
            .filter(x => x.toLowerCase().endsWith('.mpq'));
        const langDir = wfs.readDir(ipaths.clientData(dataset), false, 'directories')
            .filter(x => !x.toLowerCase().endsWith('.mpq'));

        if (langDir.length === 0) {
            throw new Error('Can\'t find any language directory in ' + ipaths.clientData);
        }

        if (langDir.length > 1) {
            throw new Error('Multiple language directory candidates in ' + ipaths.clientData);
        }

        const langmpqs = wfs.readDir(langDir[0], false, 'files').filter(x => x.toLowerCase().endsWith('.mpq'));
        return dataMpqs.concat(langmpqs);
    }


    /**
     * Check if the mpq files have changed.
     * @param tag The changefile tag to check for
     */
    export function changed(dataset: string, tag: string) {
        return getMPQFiles(dataset).filter(x => FileChanges.isChanged(x, tag)).length > 0;
    }

    /**
     * Writes new changes of the mpq files.
     * @param tag The changefile tag to check for
     */
    export function tagChanges(dataset: string, tag: string) {
        getMPQFiles(dataset).forEach((x) => FileChanges.tagChange(x, tag));
    }

    /**
     * Flushes all mpq changes
     * @param tag The changefile tag to flush
     */
    export function flushChanges(tag: string) {
        FileChanges.flushChanges(tag);
    }
}
