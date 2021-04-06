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

export class GameObjectCapturePoint extends GameObjectTemplate {
    get Radius() { return this.wrap(this.row.Data0); }
    get Spell() { return this.wrap(this.row.Data1); }
    get WorldState1() { return this.wrap(this.row.Data2); }
    get WorldState2() { return this.wrap(this.row.Data3); }
    get WinEventID1() { return this.wrap(this.row.Data4); }
    get WinEventID2() { return this.wrap(this.row.Data5); }
    get ContestedEventID1() { return this.wrap(this.row.Data6); }
    get ContestedEventID2() { return this.wrap(this.row.Data7); }
    get ProgressEventID1() { return this.wrap(this.row.Data8); }
    get ProgressEventID2() { return this.wrap(this.row.Data9); }
    get NeutralEventID1() { return this.wrap(this.row.Data10); }
    get NeutralEventID2() { return this.wrap(this.row.Data11); }
    get NeutralPercent() { return this.wrap(this.row.Data12); }
    get WorldState3() { return this.wrap(this.row.Data13); }
    get MinSuperiority() { return this.wrap(this.row.Data14); }
    get MaxSuperiority() { return this.wrap(this.row.Data15); }
    get MinTime() { return this.wrap(this.row.Data16); }
    get MaxTime() { return this.wrap(this.row.Data17); }
    get Large() { return this.wrap(this.row.Data18); }
    get Highlight() { return this.wrap(this.row.Data19); }
    get StartingValue() { return this.wrap(this.row.Data20); }
    get Unidirectional() { return this.wrap(this.row.Data21); }
}