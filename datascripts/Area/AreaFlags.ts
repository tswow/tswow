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
import { Area } from "./Area";

export class AreaFlags extends MaskCell32<Area> {
    
    /**
     * Whether there are breath particles in this area
     */
    get HasBreathParticles() { return this.bit(0); }

    /**
     * Whether breath particles overrides the parent
     */
    get ParticlesOverride() { return this.bit(1); }

    get UNK2() { return this.bit(2); }

    get IsCapital() { return this.bit(3); }

    get UNK3() { return this.bit(4); }

    get IsCapital2() { return this.bit(4); }

    get AllowDuels() { return this.bit(5); }

    get Arena() { return this.bit(6); }

    get IsCapital3() { return this.bit(7); }

    get LinkedChatArea() { return this.bit(8); }

    get IsOutlandBattleground() { return this.bit(9); }

    get IsSanctuary() { return this.bit(10); }

    get NeedsFlying() { return this.bit(11); }

    /**
     * Whether ambient multiplier should be applied to the player
     * (Unused in 3.0.3)
     */
    get AmbientOnPlayer() { return this.bit(12); }

    get IsOutland() { return this.bit(13); }

    get IsPvPObjective() { return this.bit(14); }

    get IsArena() { return this.bit(15); }

    get Unused2() { return this.bit(16); }

    get IsContested() { return this.bit(17); }

    get Unk6() { return this.bit(18); }

    get IsStartingArea() { return this.bit(19); }

    get IsTown() { return this.bit(20); }

    get Unk7() { return this.bit(21); }

    get Unk8() { return this.bit(22); }

    /**
     * Used by wintergrasp
     */
    get UseCombatState() { return this.bit(23); }

    get IsInside() { return this.bit(24); }
    get IsOutside() { return this.bit(25); }

    /**
     * Used by wintergrasp
     */
    get CanHearthAndResurrect() { return this.bit(26); }

    /**
     * Used by Dalaran
     */
    get NoFlying() { return this.bit(27); }


    /**
     * "Use parent for world defense visibility check"
     */
    get UseParentForVisibility() { return this.bit(28); }
}