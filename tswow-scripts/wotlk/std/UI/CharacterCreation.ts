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
import { LUAXML } from "../../../data/index";
import { AnchorRow } from "./Components/AnchorRow";

const cc = LUAXML.file('Interface/GlueXML/CharacterCreate.xml');

export class CharacterCreationUI {
    private anchor(index: number) {
        return new AnchorRow(this, cc.emptyReplace(index));
    }

    get MaleButton() { return this.anchor(497); }
    get FemaleButton() { return this.anchor(518); }
    get ClassName() { return this.anchor(438); }
}