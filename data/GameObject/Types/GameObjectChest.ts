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

export class GameObjectChest extends GameObjectTemplate {
    LockID() { return this.wrap(this.row.Data0); }
    LootID() { return this.wrap(this.row.Data1); }

    /**
     * Restock time in seconds
     */
    get RestockTime() { return this.wrap(this.row.Data2); }

    get IsConsumable() { return this.wrap(this.row.Data3); }

    get MinRestock() { return this.wrap(this.row.Data4); }
    get MaxRestock() { return this.wrap(this.row.Data5); }

    /**
     * EventID from event_scripts
     */
    get LootedEvent() { return this.wrap(this.row.Data6); }

    /**
     * Spawned GO type 6
     */
    get LinkedTrap() { return this.wrap(this.row.Data7); }

    get QuestID() { return this.wrap(this.row.Data8); }
    get MinLevel() { return this.wrap(this.row.Data9); }

    get LosOK() { return this.wrap(this.row.Data10); }

    get LeaveLoot() { return this.wrap(this.row.Data11); }

    get NotInCombat() { return this.wrap(this.row.Data12); }

    get LogLoot() { return this.wrap(this.row.Data13); }

    get OpenTextID() { return getBroadcast(this, this.row.Data14); }

    get UseGroupLoot() { return this.wrap(this.row.Data15); }

    get TooltipID() { return this.wrap(this.row.Data16); }

    get Condition() { return this.wrap(this.row.Data17); }

    get XPLevel() { return this.wrap(this.row.Data18); }

    get XPDifficulty() { return this.wrap(this.row.Data19); }

    get LootLevel() { return this.wrap(this.row.Data20); }

    get GroupXP() { return this.wrap(this.row.Data21); }

    get DamageImmune() { return this.wrap(this.row.Data22); }

    get TrivialSkillLow() { return this.wrap(this.row.Data23); }
}