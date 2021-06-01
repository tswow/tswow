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
export type TransformType = ((x: number)=>any) | null

export type ConditionTemplate = {
    name: string,
    args: string[],
    transforms: TransformType[]
}

const typemap : {[key:number]: ConditionTemplate} = {}

export function ConditionType(type: number, args: string[], transforms: TransformType[] = []) {
    return function(prototype: any, field: string) {
        if(field.startsWith('add')&&field.length>3) {
            field = field.substring(3);
        }
        typemap[type] = {
            name: field,
            args: args,
            transforms: transforms
        }
    };
}

export function getTemplate(type: number) : ConditionTemplate {
    return typemap[type];
}