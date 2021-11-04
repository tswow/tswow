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
import { BuildArgs, dataset } from '../Settings';
import { DBCFile } from './DBCFile';
import { DBCFiles } from './DBCFiles';
import fs = require('fs');

export function saveDbc() {
    if (BuildArgs.NO_CLIENT) { return; }
    for (const file of DBCFiles) {
        const srcpath = dataset.dbc_source.join(file.name + '.dbc');
        const spath = dataset.dbc.join(file.name + '.dbc')
        if (file.isLoaded()) {
            const buf = DBCFile.getBuffer(file).write();
            fs.writeFileSync(spath.get(), buf);
        } else {
            if (fs.existsSync(spath.get())) { fs.unlinkSync(spath.get()); }
            fs.copyFileSync(srcpath.get(), spath.get());
        }
    }
}
