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
import { Map } from "./Map";

/**
 * TODO: Don't think these are at all applicable to WotLK
 */
export class MapFlags extends MaskCell32<Map> {
    get CanToggleDifficulty() { return this.bit(8); }

    /**
     * TODO: Probably not valid for wotlk...
     */
    get FlexLocking() { return this.bit(15); }


}