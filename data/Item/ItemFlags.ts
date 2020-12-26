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
import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { ItemTemplate } from "./ItemTemplate";

export class ItemFlags extends MaskCell<ItemTemplate> {
    
    get NoPickup() { return this.bit(0); }
    get Conjured() { return this.bit(1); }
    get Openable() { return this.bit(2); }
    get Heroic() { return this.bit(3); }
    get Deprecated() { return this.bit(4); }
    get CantDestroy() { return this.bit(5); }
    /** Not sure what this means */
    get PlayerCast() { return this.bit(6); }
    get NoEquipCooldown() { return this.bit(7); }
    get MultiLootQuest() { return this.bit(8); }
    get WrapsItems() { return this.bit(9); }
    get UsesResources() { return this.bit(10); }
    get PartyLoot() { return this.bit(11); }
    get Refundable() { return this.bit(12); }
    get Petition() { return this.bit(13); }
    get HasText() { return this.bit(14); }
    get NoDisenchant() { return this.bit(15); }
    get RealDuration() { return this.bit(16); }
    get NoCreator() { return this.bit(17); }
    get CanBeProspected() { return this.bit(18); }
    get UniqueEquipped() { return this.bit(19); }
    get IgnoreForAuras() { return this.bit(20); }
    get ArenaEnabled() { return this.bit(21); }
    get NoDurabilityLoss() { return this.bit(22); }
    get UsableInShapeshift() { return this.bit(23); }
    get HasQuestGlow() { return this.bit(24); }
    get ProfessionRecipe() { return this.bit(25); }
    get ArenaDisabled() { return this.bit(26); }
    /** Also needs Quality=7 */
    get BindToAccount() { return this.bit(27); }
    get IgnoreReagents() { return this.bit(28); }
    get Millable() { return this.bit(29); }
    get ReportToGuildChat() { return this.bit(30); }
    /** Does this exist in wotlk? */
    get NoProgressiveLoot() { return this.bit(31); }
}