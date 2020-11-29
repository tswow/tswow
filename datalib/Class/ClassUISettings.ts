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
import { Edit } from "wotlkdata/luaxml/TextFile";
import { Class } from "./Class";

export function classXml(id : number, offsetX = 25, offsetY = 0) {
    return `\t\t\t\t\t\t\t<CheckButton name="CharacterCreateClassButton${id-1}" inherits="CharacterCreateClassButtonTemplate" id="${id-1}">
    \t\t\t\t\t\t\t\t<Anchors>
    \t\t\t\t\t\t\t\t\t<Anchor point="TOP" x="${offsetX}" y="${offsetY}"/>
    \t\t\t\t\t\t\t\t</Anchors>
    \t\t\t\t\t\t\t</CheckButton>
    `
}
    
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
    
export class ClassUISettings {
    private _cls : Class;
    private _tCoordsCCEdit : Edit;
    private _classColorEdit : Edit;
    private _tCoordsEdit : Edit;
    private _xmlEdit : Edit;
    // TODO: Use?
    private _sortOrderEdit : Edit;
    private _infoRows : Edit[];

    private _maleDescription : Edit;
    private _femaleDescription : Edit;

    constructor(cls : Class,tCoordsCC : Edit, classColor : Edit, sortOrder : Edit, tCoords : Edit, xmlEdit : Edit, maleDescription : Edit, femaleDescription : Edit,infoRows : Edit[]) {
        this._cls = cls;
        this._tCoordsCCEdit = tCoordsCC;
        this._classColorEdit = classColor;
        this._sortOrderEdit = sortOrder;
        this._tCoordsEdit = tCoords;
        this._xmlEdit = xmlEdit;
        this._infoRows = infoRows;
        this._maleDescription = maleDescription;
        this._femaleDescription = femaleDescription;
        return this;
    }

    private descPayload(desc : string) {
        return desc.substring(desc.indexOf('"'),desc.length-2);
    }

    get maleDescription() {
        return this.descPayload(this._maleDescription.text);
    }

    set maleDescription(value : string) {
        this._maleDescription.text = `CLASS_${this.id} = "${value}";`;
    }

    get femaleDescription() {
        return this.descPayload(this._femaleDescription.text);
    }

    set femaleDescription(value : string) {
        this._femaleDescription.text = `CLASS_${this.id}_FEMALE = "${value}";`
    }

    setBothGenderDescription(value : string) {
        this.maleDescription = value;
        this.femaleDescription = value;
    }

    infoRowCount() {
        return this._infoRows.length;
    }

    private get id() {
        return this._cls.row.Filename;
    }

    private makeClassInfoRow(num: number,value : string) {
        return `CLASS_INFO_${this.id}${num} = "${value}";`
    }

    getInfoRow(num : number) {
        return this.descPayload(this._infoRows[num].text);
    }

    setInfoRow(num : number, value : string) {
        if(num<this.infoRowCount()) {
            this._infoRows[num].text = this.makeClassInfoRow(num,value);
        } else {
            throw new Error(`Tried to replace non-existing info row ${num}, use "addInfoRow" instead!`);
        }
    }

    addInfoRow(value : string) {
        if(this._infoRows.length===0) {
            LUAXML.file('Interface/GlueXML/GlueStrings.lua')
                .after(1,this.makeClassInfoRow(this.infoRowCount(),value));
        } else {
            LUAXML.file('Interface/GlueXML/GlueStrings.lua')
                .after(this._infoRows[this._infoRows.length-1].line,
                    this.makeClassInfoRow(this.infoRowCount(),value));
        }
    }

    /**
     * Sets the location of the creation button for this class.
     * @param x 
     * @param y 
     */
    setCreationButtonLocation(x : number, y : number) {
        this._xmlEdit.text = classXml(this._cls.row.ID.get(),x,y);
    }

    /**
     * Sets the color when the name of this class is displayed (red for warriors, yellow for rogues etc.)
     * @param rgb 
     */
    setClassColor(rgb : number) {
        this._classColorEdit.text = `\t["${this._cls.row.Filename}"] = ${float(rgb)},`;
    }

    /**
     * Returns the color when the name of this class is displayed (red for warriors, yellow for rogues etc.)
     */
    getClassColor() {
        return unfloat(this._classColorEdit.text);
    }

    /**
     * Returns the tcoords of this class icon. 
     * @warn Editing the array will NOT work.
     */
    getTcoords() {
        return this._tCoordsEdit.text
            .split('{')[1]
            .split('}')[0]
            .split(' ').join('')
            .split(',')
            .map(x=>parseFloat(x)) as [number,number,number,number];
    }

    /**
     * Sets the tcoords of this class icon
     * @param nums 
     */
    setTcoords(nums : [number,number,number,number]) {
        const txt = `["${this._cls.row.Filename}"] = {${nums.join(', ')}},`
        this._tCoordsCCEdit.text = txt;
        this._tCoordsEdit.text = txt;
    }
}
