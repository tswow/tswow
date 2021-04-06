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
import { Cell } from "wotlkdata/cell/Cell";
import { LocSystem } from "wotlkdata/cell/LocSystem";
import { PendingCell } from "wotlkdata/cell/PendingCell";
import { Language } from "wotlkdata/dbc/Localization";
import { DummyCell } from "wotlkdata/cell/DummyCell";
import { iterLocConstructor, loc_constructor } from "wotlkdata/primitives";

export abstract class SQLLocSystem<T> extends LocSystem<T> {
    protected abstract getMain() : Cell<string, any>;
    protected abstract getLoc(loc : Language) : Cell<string,any>;

    lang(lang: Language): Cell<string, T> & PendingCell {
        if(lang==='enGB') return this.ownerWrapExists(this.getMain());
        return this.ownerWrapExists(this.getLoc(lang));
    }

    get mask(): Cell<number, T> {
        return new DummyCell(this.owner, 0);
    }

    set(con: loc_constructor): T {
        iterLocConstructor(con, (lang, value) => {
            if(lang=='enGB') {
                this.getMain().set(value);
            } else {
                this.getLoc(lang).set(value);
            }
        });
        return this.owner;
    }
}