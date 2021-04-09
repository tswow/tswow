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

export class GameObjectFishingHole extends GameObjectTemplate<GameObjectFishingHole> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setFishinghole();
    }
    /**
     * How close bobber must be
     */
    get Radius() { return this.wrap(this.row.Data0); }
    get LootID() { return this.wrap(this.row.Data1); }
    get MinSuccessOpens() { return this.wrap(this.row.Data2); }
    get MaxSuccessOpens() { return this.wrap(this.row.Data3); }
    /**
     * Possibly 1628 for all fishing holes.
     */
    get LockID() { return this.wrap(this.row.Data4); }
}