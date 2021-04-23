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
import { SharedRefs } from "../../Refs/SharedRefs";
import { SQL } from "wotlkdata";
import { Ids } from "../../Misc/Ids";
import { AttachedLootSet } from "../../Loot/Loot";
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";
import { SimpleLock } from "../../Locks/SimpleLock";

export class GameObjectChest extends GameObjectTemplate<GameObjectChest> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setChest();
    }

    get Lock() {
        return new SimpleLock(this,[this.row.Data0]);
    }

    get Loot() {
        return SharedRefs.getOrCreateLoot(this, new AttachedLootSet(
                  this
                , this.row.Data1
                , Ids.GameObjectLoot
                , SQL.gameobject_loot_template
                ));
    }

    /**
     * Restock time in seconds
     */
    get RestockTime() { return this.wrap(this.row.Data2); }
    get IsConsumable() { return this.wrap(this.row.Data3); }
    /**
     * EventID from event_scripts
     */
    get LootedEvent() { return this.wrap(this.row.Data6); }
    get LinkedTrap() { return this.wrap(this.row.Data7); }
    //get QuestID() { return this.wrap(this.row.Data8); }
    get Level() { return this.wrap(this.row.Data9); }
    get LosOK() { return this.wrap(this.row.Data10); }
    get LeaveLoot() { return this.wrap(this.row.Data11); }
    get NotInCombat() { return this.wrap(this.row.Data12); }
    get LogLoot() { return this.wrap(this.row.Data13); }
    get OpenTextID() { return getBroadcast(this, this.row.Data14); }
    get UseGroupLoot() { return this.wrap(this.row.Data15); }
    get TooltipID() { return this.wrap(this.row.Data16); }
    get Condition() { return this.wrap(this.row.Data17); }
}