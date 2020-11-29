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
import { DBCFiles } from './DBCFiles';
import path = require('path');
import { Settings } from '../Settings';
import fs = require('fs');
import { DBCFile } from './DBCFile';

export function saveDbc() {
    if (Settings.READONLY) { return; }
    for (const file of DBCFiles) {
        const srcpath = path.join(Settings.DBC_SOURCE, file.name + '.dbc');
        const cpath = path.join(Settings.DBC_CLIENT, file.name + '.dbc');
        const spath = path.join(Settings.DBC_SERVER, file.name + '.dbc');
        if (file.isLoaded()) {
            const buf = DBCFile.getBuffer(file).write();
            fs.writeFileSync(cpath, buf);
            fs.writeFileSync(spath, buf);
        } else {
            if (fs.existsSync(cpath)) { fs.unlinkSync(cpath); }
            if (fs.existsSync(spath)) { fs.unlinkSync(spath); }
            fs.copyFileSync(srcpath, cpath);
            fs.copyFileSync(srcpath, spath);
        }
    }
}
