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
import { ItemBase } from "./Item";

export class BagFamily extends MaskCell<ItemBase> {
    None() { return this.bit(0); }
    Arrows() { return this.bit(1); }
    Bullets() { return this.bit(2); }
    SoulShards() { return this.bit(3); }
    Leatherworking() { return this.bit(4); }
    InscriptionSupplies() { return this.bit(5); }
    Herbs() { return this.bit(6); }
    EnchantingSupplies() { return this.bit(0); }
    EngineeringSupplies() { return this.bit(0); }
    Keys() { return this.bit(0); }
    Gems() { return this.bit(0); }
    MiningSupplies() { return this.bit(0); }
    SoulboundEquipment() { return this.bit(0); }
    VanityPets() { return this.bit(0); }
    CurrencyTokens() { return this.bit(0); }
    QuestItems() { return this.bit(0); }
}