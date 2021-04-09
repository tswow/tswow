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

export class GameObjectQuestGiver extends GameObjectTemplate<GameObjectQuestGiver> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setQuestgiver();
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get QuestList() { return this.wrap(this.row.Data1); }
    get PageMaterial() { return this.wrap(this.row.Data2); }
    get GossipID() { return this.wrap(this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get NoDamageImmune() { return this.wrap(this.row.Data5); }
    get OpenTextID() { return getBroadcast(this, this.row.Data6) }
    get IsLOSOk() { return getBroadcast(this, this.row.Data7) }
    get AllowMounted() { return getBroadcast(this, this.row.Data8) }
    get IsLarge() { return getBroadcast(this, this.row.Data9) }
    get ConditionID() { return getBroadcast(this, this.row.Data10) }
}