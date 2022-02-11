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
import { LUAXML } from "wotlkdata";
import { FunctionalCell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Edit, EditSystem } from "wotlkdata/wotlkdata/luaxml/TextFile";
import { TSImage } from "../Images/Image";
import { AnchorRow } from "../UI/Components/AnchorRow";
import { Class } from "./Class";
import { stitchClassIcon } from "./ClassIcon";

function float(rgb : number) {
    let str = `{ r = ${(((rgb>>16)&0xff)/255.0).toFixed(2)} , `
    str+= `g = ${(((rgb>>8)&0xff)/255.0).toFixed(2)} , `
    str+= `b = ${((rgb&0xff)/255.0).toFixed(2)} }`
    return str;
}

function unfloat(str : string) {
    const [r,g,b]  = str.split('{')[1].split('}')[0]
        .split(' ').join('')
        .split(',').map(x=>parseFloat(x.split('=')[1]))
    return (Math.floor(r*255)<<16)+(Math.floor(g*255)<<8)+Math.floor(b*255);
}

class TCoordSystem extends CellSystem<Class> {
    private _tCoordsCCEdit: Edit;
    private _tCoordsEdit: Edit;
    private _tCoordsWSEdit: Edit;

    constructor(owner: Class, tcoords: Edit, tcoordsCC: Edit, tcoordsWS: Edit) {
        super(owner);
        this._tCoordsCCEdit = tcoordsCC;
        this._tCoordsEdit = tcoords;
        this._tCoordsWSEdit = tcoordsWS;
    }

    set(x1: number, y1: number, x2: number, y2: number) {
        const txt = `["${this.owner.Filename}"] = {${[x1,y1,x2,y2].join(', ')}},`
        this._tCoordsCCEdit.text = txt;
        this._tCoordsEdit.text = txt;
        this._tCoordsWSEdit.text = txt;
        return this.owner;
    }

    get() : [number,number,number,number] {
        return this._tCoordsEdit.text
            .split('{')[1]
            .split('}')[0]
            .split(' ').join('')
            .split(',')
            .map(x=>parseFloat(x)) as [number,number,number,number];
    }

    objectify() {
        return this.get();
    }
}

class ClassColor extends EditSystem<Class> {
    set(rgb: number) {
        this.edit.text = `\t["${this.owner.Filename}"] = ${float(rgb)},`;
        return this.owner;
    }

    get() : number {
        return unfloat(this.edit.text);
    }
}

function cleanNewline(str: string) {
    return str.split('\n').join('\\n');
}

class ClassInfoRows extends CellSystem<Class> {
    private rows: Edit[];

    constructor(owner: Class, rows: Edit[]) {
        super(owner);
        this.rows = rows;
    }

    private descPayload(desc : string) {
        return desc.substring(desc.indexOf('"'),desc.length-2);
    }

    private makeInfo(index: number, value: string) {
        return `CLASS_INFO_${this.owner.Filename}${index} = "${cleanNewline(value)}";`
    }

    get(index: number) {
        return this.descPayload(this.rows[index].text);
    }

    set(index: number, value: string) {
        this.rows[index].text = this.makeInfo(index, cleanNewline(value));
        return this.owner;
    }

    add(value: string) {
        this.rows.push(LUAXML.file('Interface/GlueXML/GlueStrings.lua')
            .after(1, this.makeInfo(this.rows.length, cleanNewline(value))))
        return this.owner;
    }
}

// TODO: Not all builtin classes have female text rows, so this needs to be fixed.
class ClassDescription extends CellSystem<Class> {
    private male: Edit;
    private female: Edit;

    constructor(owner: Class, male: Edit, female: Edit) {
        super(owner);
        this.male = male;
        this.female = female;
    }

    get Male() {
        return new FunctionalCell(
              this.owner
            , ()=>this.descPayload(this.male.text)
            , (value: string)=>this.male.text = `CLASS_${this.owner.Filename} = "${cleanNewline(value)}";`)
    }

    get Female() {
        return new FunctionalCell(
              this.owner
            , ()=>this.descPayload(this.female.text)
            , (value: string)=>this.female.text = `CLASS_${this.owner.Filename}_FEMALE = "${cleanNewline(value)}";`)
    }

    private descPayload(desc : string) {
        return desc.substring(desc.indexOf('"'),desc.length-2);
    }

    set(text: string) {
        this.Male.set(cleanNewline(text));
        this.Female.set(cleanNewline(text));
        return this.owner;
    }
}

export class ClassDisabledText extends CellSystem<Class> {
    private edit: Edit;
    constructor(owner: Class, edit: Edit) {
        super(owner);
        this.edit = edit;
    }

    set(value: string) {
        this.edit.text = `${this.owner.Filename}_DISABLED = "${value.split('"').join('\\"')}";`;
    }

    get() {
        // note: can break, but $ isn't working here for whatever reason
        return ((this.edit.text.match(/"(.+?)";/) as any)[1]) as string
    }
}

// TODO: Fix sort order
export class ClassUISettings extends CellSystem<Class> {
    readonly Color: ClassColor;

    /**
     * Texture coordinates for this class button
     * on the character creation screen.
     *
     * @deprecated - don't modify this directly, use
     *               'setIcon' to set an image instead.
     */
    readonly ButtonTCoords: TCoordSystem;

    /**
     * The position of this class button on the
     * character creation screen.
     */
    readonly ButtonPos: AnchorRow<Class>;
    readonly Info: ClassInfoRows;
    readonly Description: ClassDescription;
    readonly DisabledText: ClassDisabledText;

    setIcon(image: TSImage, oldIndex?: number) {
        let index = stitchClassIcon(image,oldIndex);
        let x1 = (index%8)/8
        let y1 = Math.floor(index/8)/8;
        this.ButtonTCoords.set(x1,x1+0.125,y1,y1+0.125);
        return this.owner;
    }

    constructor(cls : Class,tCoordsCC : Edit, tCoordsWS: Edit, classColor : Edit, sortOrder : Edit, tCoords : Edit, xmlEdit : Edit, maleDescription : Edit, femaleDescription : Edit,infoRows : Edit[], disabled: Edit) {
        super(cls);
        this.ButtonTCoords = new TCoordSystem(cls, tCoords, tCoordsCC, tCoordsWS);
        this.Color = new ClassColor(cls, classColor);
        this.ButtonPos = new AnchorRow(cls, xmlEdit);
        this.Description = new ClassDescription(cls, maleDescription, femaleDescription )
        this.Info = new ClassInfoRows(cls, infoRows);
        this.DisabledText = new ClassDisabledText(cls, disabled);
    }
}
