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
import { Objects } from "wotlkdata/cell/ObjectIteration";

// @deprecated
export function ZeroFill(obj : any) {
    Objects.getAllPropertyNames(obj)
        .forEach((x: any)=>{
            const v = obj[x];
            if(v!==undefined && v!==null && typeof(v)==='object' && !v.isReadOnly) {
                if(v.isCell && v.set && v.get) {
                    const inner = v.get();
                    if(typeof(inner)==='string') {
                        v.set('');
                    } else if(typeof(inner)==='number') {
                        v.set(0)
                    } else if(typeof(inner)==='boolean') {
                        v.set(false);
                    }
                }

                else if(v.isSubsystem) {
                    ZeroFill(v);
                }
            }
        });
}