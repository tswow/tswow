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

export class GameObjectGoober extends GameObjectTemplate<GameObjectGoober> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setGoober();
    }
    get LockID() { return this.wrap(this.row.Data0); }
    get QuestID() { return this.wrap(this.row.Data1); }
    get EventID() { return this.wrap(this.row.Data2); }
    get AutoCloseTime() { return this.wrap(this.row.Data3); }
    get CustomAnim() { return this.wrap(this.row.Data4); }
    get Consumable() { return this.wrap(this.row.Data5); }
    get Cooldown() { return this.wrap(this.row.Data6); }
    get PageID() { return this.wrap(this.row.Data7); }
    get Language() { return this.wrap(this.row.Data8); }
    get PageMaterial() { return this.wrap(this.row.Data9); }
    get SpellID() { return this.wrap(this.row.Data10); }
    get NoDamageImmune() { return this.wrap(this.row.Data11); }
    get LinkedTrapID() { return this.wrap(this.row.Data12); }
    get Large() { return this.wrap(this.row.Data13); }
    get OpenTextID() { return this.wrap(this.row.Data14); }
    get CloseTextID() { return this.wrap(this.row.Data15); }
    get LineOfSightOK() { return this.wrap(this.row.Data16); }
    get AllowMounted() { return this.wrap(this.row.Data17); }
    get FloatingTooltip() { return this.wrap(this.row.Data18); }
    get GossipID() { return this.wrap(this.row.Data19); }
    get WorldStateSetsState() { return this.wrap(this.row.Data20); }
    get FloatOnWater() { return this.wrap(this.row.Data21); }
    get ConditionID() { return this.wrap(this.row.Data22); }
}