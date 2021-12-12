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
import * as fs from 'fs';
import { Cell } from '../cell/cells/Cell';
import { CellSystem } from '../cell/systems/CellSystem';

export type EditType = 'before' | 'after' | 'replace';

export type Match = number | RegExp | string;

export class Edit {
    readonly type: EditType;
    readonly line: number;
    text: string;
    readonly sortIndex: number;

    constructor(type: EditType, line: number, text: string, sortIndex: number) {
        this.type = type;
        this.line = line;
        this.text = text;
        this.sortIndex = sortIndex;
    }

    toCell<T>(owner: T) {
        return new EditCell(owner, this);
    }
}

export class EditCell<T> extends Cell<string, T> {
    private edit: Edit;

    constructor(owner: T, edit: Edit) {
        super(owner);
        this.edit = edit;
    }

    set(value: string): T {
        this.edit.text = value;
        return this.owner;
    }

    get(): string {
        return this.edit.text;
    }
}

export class EditSystem<T> extends CellSystem<T> {
    protected edit: Edit;
    constructor(owner: T, edit: Edit) {
        super(owner);
        this.edit = edit;
    }
}

export class WrappedResult {
    rows: string[];
    constructor(rows: string[]) {
        this.rows = rows;
    }

    getRow(row: number) {
        return this.rows[row - 1];
    }
}

export class TextFile {
    private _sourceLines: string[];
    readonly filename: string;
    private edits: Edit[] = [];
    private moddedInPlace: boolean = false;

    constructor(filename: string, text: string) {
        this.filename = filename;
        this._sourceLines = text.split('\n');
    }

    /**
     * @warn calling this multiple times for the same file leads to a race!
     */
    modInPlace(callback: (source: string)=>string) {
        if(this.moddedInPlace) {
            throw new Error(
                    `Multiple scripts are trying to exclusively modify`
                  + `${this.filename}. This is not permitted`
            )
        }
        this._sourceLines = callback(this._sourceLines.join('\n')).split('\n');
        this.moddedInPlace = true;
    }

    static _sort(file: TextFile) {
        function score(edit: Edit) {
            return ['replace', 'after', 'before'].indexOf(edit.type);
        }
        file.edits.sort((a, b) => {
            const linediff = b.line - a.line;
            if (linediff !== 0) { return linediff; }
            if (a.line !== b.line) { return a.line - b.line; }
            const scoreDiff = score(a) - score(b);
            if (scoreDiff !== 0) { return scoreDiff; }
            return b.sortIndex - a.sortIndex;
        });
    }

    static _applyWrap(file: TextFile) {
        return new WrappedResult(this._apply(file));
    }

    static _apply(file: TextFile): string[] {
        this._sort(file);
        const destLines = file._sourceLines.slice();

        for (const edit of file.edits) {
            switch (edit.type) {
                case 'replace':
                    destLines[edit.line - 1] = edit.text;
                    break;
                case 'before':
                    destLines.splice(edit.line - 1, 0, edit.text);
                    break;
                case 'after':
                    destLines.splice(edit.line, 0, edit.text);
                    break;
            }
        }
        return destLines;
    }

    static _write(file: TextFile, outpath: string) {
        const string = this._apply(file).join('\n');
        fs.writeFileSync(outpath, string);
    }

    /**
     * Copy of the source lines in this LUAXML File
     */
    get lines() {
        return this._sourceLines.slice();
    }

    getRow(row: number) {
        return this._sourceLines[row - 1];
    }

    private verifyRowNo(row: number): number {
        if (row < 1 || row > this._sourceLines.length) {
            throw new Error(`Invalid row number ${row} in file ${this.filename}`);
        }

        return row;
    }

    /**
     * Finds a row based on a string or regex match. Used by all other edit functions
     * @param match
     */
    findRow(match: Match): number {
        if (typeof(match) === 'number') {
            return this.verifyRowNo(match);
        }
        let typechecker: (str: string) => boolean;
        if (typeof(match) === 'string') {
            typechecker = (str => str.includes(match));
        } else {
            typechecker = (str => str.match(match as RegExp) != null);
        }

        let matchRow = -1;
        for (const rowno in this._sourceLines) {
            if (typechecker(this._sourceLines[rowno])) {
                if (matchRow >= 0) { throw new Error(`Multiple matches for regex ${match}`); }
                matchRow = parseInt(rowno, 10);
            }
        }
        if (matchRow === -1) { throw new Error(`No matches for regex ${match}`); }
        return this.verifyRowNo(matchRow) + 1;
    }

    /**
     * Inserts a new row before a matching row.
     * @param match Match to find the row to insert before
     * @param text Text to be inserted before the matching row
     */
    before(match: Match, text: string): Edit {
        const line = this.findRow(match);
        const edit = new Edit('before', line, text, this.edits.length);
        this.edits.push(edit);
        return edit;
    }

    private oldEdit(line: number, text?: string): Edit|undefined {
        for (const x of this.edits) {
            if (x.type === 'replace' && x.line === line) {
                if (text !== undefined) {
                    x.text = text;
                }
                return x;
            }
        }
        return undefined;
    }

    /**
     * Inserts a new row after a matching row.
     * @param match Match to find the row to insert after
     * @param text Text to be inserted after the matching row
     */
    after(match: Match, text: string): Edit {
        const line = this.findRow(match);
        const edit = new Edit('after', line, text, this.edits.length);
        this.edits.push(edit);
        return edit;
    }

    /**
     * Returns a new replacement object without overwriting the old one
     * @param match
     */
    emptyReplace(match: Match): Edit {
        const line = this.findRow(match);
        const oe = this.oldEdit(line);
        if (oe !== undefined) {
            return oe;
        }
        return this.replace(line, this.lines[line - 1]);
    }

    /**
     * Replaces a row with new text
     * @param match Match to find the row to replace
     * @param text Text to replace with
     * @throws if this row was already replaced with text not identical to text
     */
    replace(match: Match, text: string): Edit {
        const line = this.findRow(match);
        const oe = this.oldEdit(line, text);
        if (oe) {
            return oe;
        }
        const nutype = new Edit('replace', line, text, this.edits.length);
        this.edits.push(nutype);
        return nutype;
    }
}
