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
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { ItemTemplate } from "./ItemTemplate";

export class ItemFlagsCustom extends MaskCell32<ItemTemplate> {
    /** Item duration will tick even if player is offline */
    get RealtimeDuration() { return this.bit(0) ;}

    /** Quest status will not be checked when item is dropped */
    get QuestStatus() { return this.bit(1) ;}

    /** Item will always follow group/master/need before greed looting rules */
    get FollowLootRules() { return this.bit(2) ;}
}