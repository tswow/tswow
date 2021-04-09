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
import { gameobject_templateRow } from "wotlkdata/sql/types/gameobject_template";

export class GameObjectDestructibleBuilding extends GameObjectTemplate<GameObjectDestructibleBuilding> {
    constructor(row: gameobject_templateRow) {
        super(row);
        this.Type.setDestructibleBuilding();
    }
    get InteractNumHits() { return this.wrap(this.row.Data0); }
    get CreditProxyCreature() { return this.wrap(this.row.Data1); }
    get Empty1() { return this.wrap(this.row.Data2); }
    get IntactEvent() { return this.wrap(this.row.Data3); }
    get Empty2() { return this.wrap(this.row.Data4); }
    get DamageNumHits() { return this.wrap(this.row.Data5); }
    get Empty3() { return this.wrap(this.row.Data6); }
    get Empty4() { return this.wrap(this.row.Data7); }
    get Empty5() { return this.wrap(this.row.Data8); }
    get DamagedEvent() { return this.wrap(this.row.Data9); }
    get Empty6() { return this.wrap(this.row.Data10); }
    get Empty7() { return this.wrap(this.row.Data11); }
    get Empty8() { return this.wrap(this.row.Data12); }
    get Empty9() { return this.wrap(this.row.Data13); }
    get DestroyedEvent() { return this.wrap(this.row.Data14); }
    get Empty10() { return this.wrap(this.row.Data15); }
    get RebuildingTimeSecs() { return this.wrap(this.row.Data16); }
    get Empty11() { return this.wrap(this.row.Data17); }
    get DestructibleData() { return this.wrap(this.row.Data18); }
    get RebuildingEvent() { return this.wrap(this.row.Data19); }
    get Empty12() { return this.wrap(this.row.Data20); }
    get Empty13() { return this.wrap(this.row.Data21); }
    get DamageEvent() { return this.wrap(this.row.Data22); }
    get Empty14() { return this.wrap(this.row.Data23); }
}