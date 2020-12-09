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

export class ItemFlagsExtra extends MaskCell<ItemBase> {
    get HordeOnly() { return this.bit(0); }
    get AllianceOnly() { return this.bit(0); }
    /** "When item uses ExtendedCost in npc_vendor, gold is also required"(?) */
    get GoldWithExtendedCost() { return this.bit(0); }
    get NoNeedRolls() { return this.bit(0);}
    get NeedRollsDisabled() { return this.bit(0);}
    get HasNormalPrice() { return this.bit(0);}
    get BattlenetAccountBound() { return this.bit(0);}
    get CannotBeTransmogged() { return this.bit(0);}

}