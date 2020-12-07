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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Edit, EditSystem } from "wotlkdata/luaxml/TextFile";
import { AnchorRow } from "../UI/Components/AnchorRow";
import { Class } from "./Class";

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

class TCoordSystem extends Subsystem<Class> {
    private _tCoordsCCEdit: Edit;
    private _tCoordsEdit: Edit;

    constructor(owner: Class, tcoords: Edit, tcoordsCC: Edit) {
        super(owner);
        this._tCoordsCCEdit = tcoordsCC;
        this._tCoordsEdit = tcoords;
    }
    
    set(x1: number, y1: number, x2: number, y2: number) {
        const txt = `["${this.owner.Filename}"] = {${[x1,y1,x2,y2].join(', ')}},`
        this._tCoordsCCEdit.text = txt;
        this._tCoordsEdit.text = txt;
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

class ClassInfoRows extends Subsystem<Class> {
    private rows: Edit[];

    constructor(owner: Class, rows: Edit[]) {
        super(owner);
        this.rows = rows;
    }

    private descPayload(desc : string) {
        return desc.substring(desc.indexOf('"'),desc.length-2);
    }

    private makeInfo(index: number, value: string) {
        return `CLASS_INFO_${this.owner.Filename}${index} = "${value}";`
    }

    get(index: number) {
        return this.descPayload(this.rows[index].text);
    }

    set(index: number, value: string) {
        this.rows[index].text = this.makeInfo(index, value);
        return this.owner;
    }

    add(value: string) {
        this.rows.push(LUAXML.file('Interface/GlueXML/GlueStrings.lua')
            .after(1, this.makeInfo(this.rows.length, value)))
        return this.owner;
    }
}

// TODO: Not all builtin classes have female text rows, so this needs to be fixed.
class ClassDescription extends Subsystem<Class> {
    private male: Edit;
    private female: Edit;

    constructor(owner: Class, male: Edit, female: Edit) {
        super(owner);
        this.male = male;
        this.female = female;
    }

    private descPayload(desc : string) {
        return desc.substring(desc.indexOf('"'),desc.length-2);
    }

    setMale(text: string) {
        this.male.text = `CLASS_${this.owner.Filename} = "${text}";`;
        return this.owner;
    }

    setFemale(text: string) {
        this.female.text = `CLASS_${this.owner.Filename} = "${text}";`
        return this.owner;
    }

    getMale() {
        return this.descPayload(this.male.text);
    }

    getFemale() {
        return this.descPayload(this.female.text);
    }

    set(text: string) {
        this.setMale(text);
        this.setFemale(text);
        return this.owner;
    }
}

// TODO: Fix sort order
export class ClassUISettings extends Subsystem<Class> {
    readonly color: ClassColor;
    readonly tcoords: TCoordSystem;
    readonly classButton: AnchorRow<Class>;
    readonly info: ClassInfoRows;
    readonly description: ClassDescription;

    constructor(cls : Class,tCoordsCC : Edit, classColor : Edit, sortOrder : Edit, tCoords : Edit, xmlEdit : Edit, maleDescription : Edit, femaleDescription : Edit,infoRows : Edit[]) {
        super(cls);
        this.tcoords = new TCoordSystem(cls, tCoords, tCoordsCC);
        this.color = new ClassColor(cls, classColor);
        this.classButton = new AnchorRow(cls, xmlEdit);
        this.description = new ClassDescription(cls, maleDescription, femaleDescription )
        this.info = new ClassInfoRows(cls, infoRows);
        return this;
    }
}
