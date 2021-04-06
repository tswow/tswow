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

export class GameObjectTrap extends GameObjectTemplate {
    get LockID() { return this.wrap(this.row.Data0); }
    get Level() { return this.wrap(this.row.Data1); }
    get Diameter() { return this.wrap(this.row.Data2); }
    get SpellID() { return this.wrap(this.row.Data3); }
    /* 
     * 0 trap with no despawn after cast. 
     * 1 trap despawns after cast. 
     * 2 bomb casts on spawn. 
     */
    get TrapType() { return this.wrap(this.row.Data4); }
    get Cooldown() { return this.wrap(this.row.Data5); }
    get AutoCloseTime() { return this.wrap(this.row.Data6); }
    get StartDelay() { return this.wrap(this.row.Data7); }
    get ServerOnly() { return this.wrap(this.row.Data8); }
    get Stealthed() { return this.wrap(this.row.Data9); }
    get Large() { return this.wrap(this.row.Data10); }
    get Invisible() { return this.wrap(this.row.Data11); }
    get OpenTextID() { return this.wrap(this.row.Data12); }
    get CloseTextID() { return this.wrap(this.row.Data13); }
    get IgnoreTotems() { return this.wrap(this.row.Data14); }
    get ConditionID() { return this.wrap(this.row.Data15); }
}