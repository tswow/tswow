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
import { Language } from '../dbc/Localization';
import { loc_constructor } from '../primitives';
import { LocSystem } from './LocSystem';
import { PendingCell } from './PendingCell';
import { Cell } from './Cell';


export class WrappedLoc<T> extends LocSystem<any> {
    private wrapped: LocSystem<any>;

    constructor(owner: T, wrapped: LocSystem<any>) {
        super(owner);
        this.wrapped = wrapped;
    }

    lang(lang: Language): Cell<string, this> & PendingCell {
        return this.wrapExists(this.wrapped.lang(lang));
    }

    get mask(): Cell<number, this> {
        return this.wrap(this.wrapped.mask);
    }
    set(con: loc_constructor): T {
        this.wrapped.set(con);
        return this.owner;
    }

    objectify() {
        return this.wrapped.objectify();
    }
}
