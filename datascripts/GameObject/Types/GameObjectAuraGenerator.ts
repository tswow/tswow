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
import { GameObjectTemplate } from "../GameObjectTemplate";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";

export class GameObjectAuraGenerator extends GameObjectTemplate<GameObjectAuraGenerator> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setAuraGenerator();
    }

    get StartOpen() { return this.wrap(this.row.Data0); }
    get Radius() { return this.wrap(this.row.Data1); }
    get AuraID1() { return this.wrap(this.row.Data2); }
    get ConditionID1() { return this.wrap(this.row.Data3); }
    get AuraID2() { return this.wrap(this.row.Data4); }
    get ConditionID2() { return this.wrap(this.row.Data5); }
    get ServerOnly() { return this.wrap(this.row.Data6); }
}