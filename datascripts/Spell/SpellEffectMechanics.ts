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
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export class SpellEffectMechanicEnum<T> extends EnumCellWrapper<T> {
    /**
     * No comment (yet!)
     */
    @EnumField(0)
    setNone() { return this.set(0);}

    /**
     * No comment (yet!)
     */

    @EnumField(1)
    setCharmed() { return this.set(1); }

    /**
     * No comment (yet!)
     */
    @EnumField(2)
    setDisoriented() { return this.set(2); }

    /**
     * No comment (yet!)
     */
    @EnumField(3)
    setDisarmed() { return this.set(3); }

    /**
     * No comment (yet!)
     */
    @EnumField(4)
    setDistracted() { return this.set(4); }

    /**
     * No comment (yet!)
     */
    @EnumField(5)
    setFleeing() { return this.set(5); }

    /**
     * No comment (yet!)
     */
    @EnumField(6)
    setGripped() { return this.set(6); }

    /**
     * No comment (yet!)
     */
    @EnumField(7)
    setRooted() { return this.set(7); }

    /**
     * No comment (yet!)
     */
    @EnumField(8)
    setSlowed() { return this.set(8); }

    /**
     * No comment (yet!)
     */
    @EnumField(9)
    setSilenced() { return this.set(9); }

    /**
     * No comment (yet!)
     */
    @EnumField(10)
    setAsleep() { return this.set(10); }

    /**
     * No comment (yet!)
     */
    @EnumField(11)
    setSnared() { return this.set(11); }

    /**
     * No comment (yet!)
     */

    @EnumField(12)
    setStunned() { return this.set(12); }

    /**
     * No comment (yet!)
     */

    @EnumField(13)
    setFrozen() { return this.set(13); }

    /**
     * No comment (yet!)
     */
    @EnumField(14)
    setIncapacitated() { return this.set(14); }

    /**
     * No comment (yet!)
     */
    @EnumField(15)
    setBleeding() { return this.set(15); }

    /**
     * No comment (yet!)
     */
    @EnumField(16)
    setHealing() { return this.set(16); }

    /**
     * No comment (yet!)
     */
    @EnumField(17)
    setPolymorphed() { return this.set(17); }

    /**
     * No comment (yet!)
     */
    @EnumField(18)
    setBanished() { return this.set(18); }

    /**
     * No comment (yet!)
     */
    @EnumField(19)
    setShielded() { return this.set(19); }

    /**
     * No comment (yet!)
     */
    @EnumField(20)
    setShackled() { return this.set(20); }

    /**
     * No comment (yet!)
     */
    @EnumField(21)
    setMounted() { return this.set(21); }

    /**
     * No comment (yet!)
     */
    @EnumField(22)
    setInfected() { return this.set(22); }

    /**
     * No comment (yet!)
     */
    @EnumField(23)
    setTurned() { return this.set(23); }

    /**
     * No comment (yet!)
     */
    @EnumField(24)
    setHorrified() { return this.set(24); }

    /**
     * No comment (yet!)
     */
    @EnumField(25)
    setInvulnerable() { return this.set(25); }

    /**
     * No comment (yet!)
     */
    @EnumField(26)
    setInterrupted() { return this.set(26); }

    /**
     * No comment (yet!)
     */
    @EnumField(27)
    setDazed() { return this.set(27); }

    /**
     * No comment (yet!)
     */
    @EnumField(28)
    setDiscovery() { return this.set(28); }

    /**
     * No comment (yet!)
     */
    @EnumField(29)
    setInvulnerable2() { return this.set(29); }

    /**
     * No comment (yet!)
     */
    @EnumField(30)
    setSapped() { return this.set(30); }

    /**
     * No comment (yet!)
     */
    @EnumField(31)
    setEnraged() { return this.set(31);}
}

export class SpellEffectMechanicMask<T> extends MaskCell32<T> {
    get None() { return this.bit(0);}
    get Charmed() { return this.bit(1); }
    get Disoriented() { return this.bit(2); }
    get Disarmed() { return this.bit(3); }
    get Distracted() { return this.bit(4); }
    get Fleeing() { return this.bit(5); }
    get Gripped() { return this.bit(6); }
    get Rooted() { return this.bit(7); }
    get Slowed() { return this.bit(8); }
    get Silenced() { return this.bit(9); }
    get Asleep() { return this.bit(10); }
    get Snared() { return this.bit(11); }
    get Stunned() { return this.bit(12); }
    get Frozen() { return this.bit(13); }
    get Incapacitated() { return this.bit(14); }
    get Bleeding() { return this.bit(15); }
    get Healing() { return this.bit(16); }
    get Polymorphed() { return this.bit(17); }
    get Banished() { return this.bit(18); }
    get Shielded() { return this.bit(19); }
    get Shackled() { return this.bit(20); }
    get Mounted() { return this.bit(21); }
    get Infected() { return this.bit(22); }
    get Turned() { return this.bit(23); }
    get Horrified() { return this.bit(24); }
    get Invulnerable() { return this.bit(25); }
    get Interrupted() { return this.bit(26); }
    get Dazed() { return this.bit(27); }
    get Discovery() { return this.bit(28); }
    get Invulnerable2() { return this.bit(29); }
    get Sapped() { return this.bit(30); }
    get Enraged() { return this.bit(31);}
}