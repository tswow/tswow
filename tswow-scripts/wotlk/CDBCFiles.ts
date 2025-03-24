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
/* tslint:disable */
import { CDBCFile } from "./cdbc/CDBCFile"
import { LFGRolesCDBCFile } from "./cdbc/LFGRoles";
import { SpellAdditionalAttributesCDBCFile } from "./cdbc/SpellAdditionalAttributes";
import { SpellAdditionalCostDataCDBCFile } from "./cdbc/SpellAdditionalCostData";
import { ZoneLightCDBCFile } from "./cdbc/ZoneLight";
import { ZoneLightPointCDBCFile } from "./cdbc/ZoneLightPoint";

export const CDBC = {
    LFGRoles : new LFGRolesCDBCFile(),
    SpellAdditionalAttributes : new SpellAdditionalAttributesCDBCFile(),
    SpellAdditionalCostData : new SpellAdditionalCostDataCDBCFile(),
    ZoneLight : new ZoneLightCDBCFile(),
    ZoneLightPoint : new ZoneLightPointCDBCFile()
}

export const CDBCLoader = {
    LFGRoles : (path: string) => LFGRolesCDBCFile.read(path),
    SpellAdditionalAttributes : (path: string) => SpellAdditionalAttributesCDBCFile.read(path),
    SpellAdditionalCostData : (path: string) => SpellAdditionalCostDataCDBCFile.read(path),
    ZoneLight : (path: string) => ZoneLightCDBCFile.read(path),
    ZoneLightPoint : (path: string) => ZoneLightCDBCFile.read(path),
}

export type CDBCNames = "LFGRoles" | "SpellAdditionalAttributes" | "SpellAdditionalCostData" | "ZoneLight" | "ZoneLightPoint"

export const CDBCFiles : CDBCFile<any,any,any>[] = Object.values(CDBC);
