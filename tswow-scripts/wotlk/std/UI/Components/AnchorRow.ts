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
import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { Edit } from "../../../../data/luaxml/TextFile";
import * as xml from 'xml2js';

let builder = new xml.Builder({headless: true});
export type Points = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
export type RelativePoint = Points | 'TOPLEFT' | 'TOPRIGHT' | 'BOTTOMLEFT' | 'BOTTOMRIGHT'

export class AnchorRow<T> extends CellSystem<T> {
    protected edit: Edit;

    protected getXml() : any {
        let g = undefined;
        xml.parseString(this.edit.text,(err,res)=>{
            g = res;
        });
        return g;
    }

    protected build(xml: any) : string {
        return builder.buildObject(xml);
    }

    protected apply(fields: {[key:string]:any}) {
        let xml = this.getXml();
        for(const key in fields) {
            xml.Anchor.$[key] = fields[key];
        }
        this.edit.text = this.build(xml);
    }

    constructor(owner: T, edit: Edit) {
        super(owner);
        this.edit = edit;
    }

    setPos(x: number, y: number) {
        this.apply({x,y});
        return this.owner;
    }

    setPoint(point: Points) {
        this.apply({point});
        return this.owner;
    }

    setRelativeTo(relativeTo: string) {
        this.apply({relativeTo});
        return this.owner;
    }

    setRelativePoint(relativePoint: string) {
        this.apply({relativePoint});
        return this.owner;
    }

    objectify() {
        return this.getXml().Anchor.$;
    }
}