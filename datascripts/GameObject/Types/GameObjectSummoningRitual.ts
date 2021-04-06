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

export class GameObjectSummoningRitual extends GameObjectTemplate {
    get RequiredParticipants() { return this.wrap(this.row.Data0); }
    get SpellID() { return this.wrap(this.row.Data1); }
    get AnimSpell() { return this.wrap(this.row.Data2); }
    get RitualPersistent() { return this.wrap(this.row.Data3); }
    get CasterTargetSpell() { return this.wrap(this.row.Data4); }
    get CasterTargetSpellTargets() { return this.wrap(this.row.Data5); }
    get CasterGrouped() { return this.wrap(this.row.Data6); }
    get RitualNoTargetCheck() { return this.wrap(this.row.Data7); }
    get ConditionID() { return this.wrap(this.row.Data8); }
}