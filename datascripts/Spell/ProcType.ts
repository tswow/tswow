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
import { Spell } from "./Spell";

export class ProcType extends MaskCell32<Spell> {
    constructor(owner: Spell) {
        super(owner, owner.row.ProcTypeMask);
    }

    get killed() { return this.bit(0); }
    get kill() { return this.bit(1); }
    get DoneMeleeAutoAttack() { return this.bit(2); }
    get TakenMeleeAutoAttack() { return this.bit(3); }
    get DoneSpellMeleeDmg() { return this.bit(4); }
    get TakenSpellMeleeDmg() { return this.bit(5); }
    get DoneRangedAutoAttack() { return this.bit(6); }
    get TakenRangedAutoAttack() { return this.bit(7); }
    get DoneSpellRangedDmg() { return this.bit(8); }
    get TakenSpellRangedDmg() { return this.bit(9); }
    get DoneSpellNoneDmgClassPos() { return this.bit(10); }
    get TakenSpellNoneDmgClassPos() { return this.bit(11); }
    get DoneSpellNoneDmgClassNeg() { return this.bit(12); }
    get TakenSpellNoneDmgClassNeg() { return this.bit(13); }
    get DoneSpellMagicPos() { return this.bit(14); }
    get TakenSpellMagicDmgPos() { return this.bit(15); }
    get DoneSpellMagicDmgNeg() { return this.bit(16); }
    get TakenSpellMagicDmgNeg() { return this.bit(17); }
    get DonePeriodic() { return this.bit(18); }
    get TakenPeriodic() { return this.bit(19); }
    get TakenDamage() { return this.bit(20); }
    get TrapActivation() { return this.bit(21); }
    get MainhandAttack() { return this.bit(22); }
    get OffhandAttack() { return this.bit(23); }
    get Death() { return this.bit(24); }
}