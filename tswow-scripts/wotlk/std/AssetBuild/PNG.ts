/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
import { FileChangeModule } from "wotlkdata/util/FileChanges"
import { wfs } from "wotlkdata/util/FileSystem"
import { FilePath, WFile } from "wotlkdata/util/FileTree"
import { wsys } from "wotlkdata/util/System"
import { ipaths } from "wotlkdata/wotlkdata/Settings"

const MAGICK = process.platform === 'win32'
    ? `"${ipaths.bin.im.magick.abs()}" -define png:color-type=6`
    : 'magick -define png:color-type=6'

const CONVERT = process.platform === 'win32'
    ? `"${ipaths.bin.im.convert.abs()}" -define png:color-type=6`
    : 'convert -define png:color-type=6'

type converter = {suffix: string,convert:(i: string, o: string)=>void}

// make this a list so we have well-defined precedence
const converters: converter[] = [
    {suffix:'psd', convert: (i,o)=>{
        wsys.exec(
            `${CONVERT} ${i} -background none -flatten ${o}`
        )
    }}
    ,
    {suffix:'xcf', convert: (i,o)=>{
        wsys.exec(
            `${CONVERT} ${i} -background none -flatten ${o}`
        )
    }}
    ,
    {suffix:'png', convert: (i,o)=>{
        if(i!==o) {
            wfs.copy(i,o);
        }
    }}
]

function full(conv: converter, filenameNoSuffix: WFile) {
    return filenameNoSuffix.withExtension(`.${conv.suffix}`)
}

function getEffectiveConverter(filenameNoSuffix: WFile) {
    for(const conv of converters) {
        if(wfs.exists(full(conv,filenameNoSuffix))) return conv;
    }
}

export function getEffectiveFile(filenameNoSuffix: WFile) {
    let effConv = getEffectiveConverter(filenameNoSuffix);
    if(effConv === undefined) return undefined;
    return full(effConv,filenameNoSuffix);
}

export function onDirtyPNG(
      filenameNoSuffix: WFile
    , changes: FileChangeModule
    , force: boolean
    , callback: (png: WFile)=>void
) {
    const png = filenameNoSuffix.withExtension('.png',false);
    for(const conv of converters) {
        const fullname = filenameNoSuffix.withExtension(`.${conv.suffix}`);
        if(wfs.exists(fullname)) {
            if(changes.isChanged(fullname.abs().get()) || force) {
                conv.convert(fullname.abs().get(),png.abs().get());
                callback(png.abs());
                if(conv.suffix !== 'png') {
                    png.remove();
                }
                changes.markChanged(fullname.abs().get());
            }
            return;
        }
    }
}

export function splitPng(pngPath: FilePath, xTiles: number, yTiles: number, outputFormat: string) {
    wsys.execIn(
        wfs.dirname(pngPath)
      , `${MAGICK} ${pngPath}`
      + ` -scene 1`
      + ` -define png:color-type=6`
      + ` -crop ${xTiles}x${yTiles}`
      + ` "${outputFormat}"`
  )
}