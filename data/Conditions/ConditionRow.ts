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
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { conditionsRow } from "wotlkdata/sql/types/conditions";
import { getTemplate } from "./ConditionType";

export class ConditionRow<T> extends Subsystem<T> {
    row: conditionsRow;

    constructor(owner: T, row: conditionsRow) {
        super(owner);
        this.row = row;
    }

    get Type() { return this.row.SourceTypeOrReferenceId.get(); }

    get Value1() { return this.row.ConditionValue1.get(); }
    get Value2() { return this.row.ConditionValue2.get(); }
    get Value3() { return this.row.ConditionValue3.get(); }

    objectify() {
        const template = getTemplate(this.Type);
        const obj : {[key:string]:any}= {
            Type: template.name,
        }

        for(let i=0;i<template.args.length;++i) {
            const arg = template.args[i];
            if(arg.length===0) continue;
            let trans = (template.transforms[i]) || ((x:number)=>x);
            obj[arg] = trans(([this.Value1,this.Value2,this.Value3][i]))
        }

        return obj;
    }
}