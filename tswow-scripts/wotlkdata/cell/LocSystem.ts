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
import { Language, Languages } from '../dbc/Localization';
import { loc_constructor } from '../primitives';
import { PendingCell } from './PendingCell';
import { Subsystem } from './Subsystem';
import { Cell } from './Cell';

export abstract class LocSystem<T> extends Subsystem<T> {
    abstract lang(lang: Language): Cell<string, T> & PendingCell;
    abstract get mask(): Cell<number, T>;
    abstract set(con: loc_constructor): T;

    get enGB() { return this.lang('enGB'); }
    get koKR() { return this.lang('koKR'); }
    get frFR() { return this.lang('frFR'); }
    get deDE() { return this.lang('deDE'); }
    get enCN() { return this.lang('enCN'); }
    get zhCN() { return this.lang('zhCN'); }
    get enTW() { return this.lang('enTW'); }
    get zhTW() { return this.lang('zhTW'); }
    get esES() { return this.lang('esES'); }
    get esMX() { return this.lang('esMX'); }
    get ruRU() { return this.lang('ruRU'); }
    get ptPT() { return this.lang('ptPT'); }
    get ptBR() { return this.lang('ptBR'); }
    get itIT() { return this.lang('itIT'); }
    get Unk() { return this.lang('Unk'); }

    clear() {
        Languages.forEach(x=>{
            let c = this.lang(x);
            if(c && c.get() && c.get().length>0) {
                c.set('')
            }
        });
    }
}
