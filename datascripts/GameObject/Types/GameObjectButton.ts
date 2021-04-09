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
import { getBroadcast } from "../../BroadcastText/BroadcastText";
import { GameObjectTemplate } from "../GameObjectTemplate";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";

export class GameObjectButton extends GameObjectTemplate<GameObjectButton> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setButton();
    }
    /**
     * Whether this button starts pressed
     */
    get StartsActive() { return this.wrap(this.row.Data0); }

    /**
     * The lock used to press this button
     */
    get LockID() { return this.wrap(this.row.Data1); }

    get AutoClose() { return this.wrap(this.row.Data2); }


    /**
     * A linked spawned gameobject of type 6
     */
    get LinkedTrap() { return this.wrap(this.row.Data3); }

    get NoDamageImmune() { return this.wrap(this.row.Data4); }

    get IsLarge() { return this.wrap(this.row.Data5); }

    /**
     * Text displayed when the button is pressed
     */
    get ActivateTextID() { return getBroadcast(this, this.row.Data6) }


    /**
     * Text displayed when the button is unpressed
     */
    get DeactivateTextID() { return getBroadcast(this, this.row.Data7) }

    /**
     * TODO: ??
     */
    get LineOfSightOK() { return getBroadcast(this, this.row.Data8) }

    get ConditionID() { return this.wrap(this.row.Data9); }
}