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

export class GameObjectDoor extends GameObjectTemplate<GameObjectDoor> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setDoor();
    }
    /**
     * Whether or not the door starts open (0=closed, 1=open)
     */
    get StartOpen() { return this.wrap(this.row.Data0); }


    /**
     * Lock ID to DBC.Lock that opens this door
     */
    get LockID() { return this.wrap(this.row.Data1); }

    /**
     * After how many milliseconds the door autocloses
     */
    get AutoClose() { return this.wrap(this.row.Data2); }

    /**
     * 
     */
    get NoDamageImmune() { return this.wrap(this.row.Data3); }

    /**
     * Text displayed when the door is opened
     */
    get OpenText() { return getBroadcast(this, this.row.Data4); }

    /**
     * Text displayed when the door is closed
     */
    get CloseText() { return getBroadcast(this, this.row.Data5); }

    /**
     * Whether pathfinding should ignore this door
     */
    get IgnoredByPathfinding() { return getBroadcast(this, this.row.Data6); }

    /**
     * Unknown
     */
    get Condition1() { return getBroadcast(this, this.row.Data7); }
}