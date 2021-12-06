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
import { CellSystem, LocSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { loc_constructor } from "wotlkdata/wotlkdata/primitives";

export type GenderedTextMode = 'WRITE_BOTH' | 'WRITE_MALE'

export class GenderedText<T> extends CellSystem<T> {
    protected defaultMode: GenderedTextMode
    protected male: LocSystem<any>;
    protected female: LocSystem<any>;

    constructor(
          owner: T
        , defaultMode: GenderedTextMode
        , male: LocSystem<any>
        , female: LocSystem<any>
        )
        {
            super(owner);
            this.defaultMode = defaultMode
            this.male = male;
            this.female = female;
        }

    get Male() { return this.ownerWrapLoc(this.male); }
    get Female() { return this.ownerWrapLoc(this.female); }

    clear() {
        this.Male.clear();
        this.Female.clear();
        return this.owner;
    }

    set(con: loc_constructor) {
        switch(this.defaultMode) {
            case 'WRITE_BOTH':
                this.Male.set(con);
                this.Female.set(con);
                break;
            case 'WRITE_MALE':
                this.Male.set(con);
                break;
        }
        return this.owner;
    }
}