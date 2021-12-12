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
import { DBCBuffer } from './dbc/DBCBuffer';
import { Language, Languages } from './dbc/Localization';

export type bool = boolean;
export type byte = number;
export type int = number;
export type float = number;
export type uint = number;
export type long = bigint;
export type ulong = bigint;

export type mediumint = number;
export type tinyint = number;
export type smallint = number;
export type text = string;
export type varchar = string;
export type char = string;
export type longtext = string;
export type timestamp = string;
export type tinytext = string;
export type bit = number;

// tslint:disable-next-line
export interface loc_constructor {
    enGB?: string;
    koKR?: string;
    frFR?: string;
    deDE?: string;
    enCN?: string;
    zhCN?: string;
    enTW?: string;
    zhTW?: string;
    esES?: string;
    esMX?: string;
    ruRU?: string;
    ptPT?: string;
    ptBR?: string;
    itIT?: string;
    Unk?: string;
    _mask?: number;
}

export function iterLocConstructor(con: loc_constructor, callback: (lang: Language, value: string) => void) {
    for (const key in con) {
        if (!Languages.includes(key as Language)) {
            continue;
        }

        const val = (con as any)[key];
        if (val !== undefined && typeof(val) === 'string') {
            callback(key as Language, val);
        }
    }
}

// tslint:disable-next-line
export class loc {
    private file: DBCBuffer;
    private offset: number;

    get languages() {
        return [
            'enGB', 'koKR', 'frFR', 'deDE',
            'enCN', 'zhCN', 'enTW', 'zhTW',
            'esES', 'esMX', 'ruRU', 'ptPT',
            'ptBR', 'itIT', 'Unk'];
    }

    get presentLanguages(): Language[] {
        // @ts-ignore: Promise languages() only point at valid fields in this class
        return this.languages.filter(x => this[x].length > 0);
    }

    get values(): string[] {
        return [
            this.enGB, this.koKR, this.frFR, this.deDE,
            this.enCN, this.zhCN, this.enTW, this.zhTW,
            this.esES, this.esMX, this.ruRU, this.ptPT,
            this.ptBR, this.itIT, this.Unk
        ];
    }

    read(con: loc_constructor) {
        iterLocConstructor(con, (lang, value) => this[lang] = value);
    }

    forEachKeys(callback: (lang: Language, value: string) => any) {
        this.presentLanguages.forEach((lang) => callback(lang, this[lang]));
    }

    forEach(cb: (value: string, index: number, list: string[]) => any) {
        this.values.forEach(cb);
    }

    get enGB() {return this.file.readstring(this.offset + 0); }
    set enGB(value: string) {this.file.writestring(value, this.offset + 0); }
    get koKR() {return this.file.readstring(this.offset + 4); }
    set koKR(value: string) {this.file.writestring(value, this.offset + 4); }
    get frFR() {return this.file.readstring(this.offset + 8); }
    set frFR(value: string) {this.file.writestring(value, this.offset + 8); }
    get deDE() {return this.file.readstring(this.offset + 12); }
    set deDE(value: string) {this.file.writestring(value, this.offset + 12); }
    get enCN() {return this.file.readstring(this.offset + 16); }
    set enCN(value: string) {this.file.writestring(value, this.offset + 16); }
    get zhCN() {return this.file.readstring(this.offset + 20); }
    set zhCN(value: string) {this.file.writestring(value, this.offset + 20); }
    get enTW() {return this.file.readstring(this.offset + 24); }
    set enTW(value: string) {this.file.writestring(value, this.offset + 24); }
    get zhTW() {return this.file.readstring(this.offset + 28); }
    set zhTW(value: string) {this.file.writestring(value, this.offset + 28); }
    get esES() {return this.file.readstring(this.offset + 32); }
    set esES(value: string) {this.file.writestring(value, this.offset + 32); }
    get esMX() {return this.file.readstring(this.offset + 36); }
    set esMX(value: string) {this.file.writestring(value, this.offset + 36); }
    get ruRU() {return this.file.readstring(this.offset + 40); }
    set ruRU(value: string) {this.file.writestring(value, this.offset + 40); }
    get ptPT() {return this.file.readstring(this.offset + 44); }
    set ptPT(value: string) {this.file.writestring(value, this.offset + 44); }
    get ptBR() {return this.file.readstring(this.offset + 48); }
    set ptBR(value: string) {this.file.writestring(value, this.offset + 48); }
    get itIT() {return this.file.readstring(this.offset + 52); }
    set itIT(value: string) {this.file.writestring(value, this.offset + 52); }
    get Unk() {return this.file.readstring(this.offset + 56); }
    set Unk(value: string) {this.file.writestring(value, this.offset + 56); }

    get _mask() {return this.file.readuint(this.offset + 60); }
    set _mask(value: number) {this.file.writeuint(this.offset + 60, value); }

    toObject() {
        const obj: {[key: string]: string} = {};
        this.forEachKeys((lang, value) => obj[lang] = value);
        return obj;
    }

    get isLoc() { return true; }

    constructor(file: DBCBuffer, offset: number) {
        this.file = file;
        this.offset = offset;
    }
}
