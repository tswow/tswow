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

export class SpellTargetType<T> extends MaskCell32<T> {
    /**
     * No comment (yet!)
     */
    get Unused1() { return this.bit(0); }

    /**
     * No comment (yet!)
     */
    get Unit() { return this.bit(1); }

    /**
     * No comment (yet!)
     */
    get UnitRaid() { return this.bit(2); }

    /**
     * No comment (yet!)
     */
    get UnitParty() { return this.bit(3); }

    /**
     * No comment (yet!)
     */
    get Item() { return this.bit(4); }

    /**
     * No comment (yet!)
     */
    get SourceLocation() { return this.bit(5); }

    /**
     * No comment (yet!)
     */
    get DestLocation() { return this.bit(6); }

    /**
     * No comment (yet!)
     */
    get UnitEnemy() { return this.bit(7); }

    /**
     * No comment (yet!)
     */
    get UnitAlly() { return this.bit(8); }

    /**
     * No comment (yet!)
     */
    get CorpseEnemy() { return this.bit(9); }

    /**
     * No comment (yet!)
     */
    get UnitDead() { return this.bit(10); }

    /**
     * No comment (yet!)
     */
    get GameObject() { return this.bit(11); }

    /**
     * No comment (yet!)
     */
    get TradeItem() { return this.bit(12); }

    /**
     * No comment (yet!)
     */
    get String() { return this.bit(13); }

    /**
     * No comment (yet!)
     */
    get GameObjectItem() { return this.bit(14); }

    /**
     * No comment (yet!)
     */
    get CorpseAlly() { return this.bit(15); }

    /**
     * No comment (yet!)
     */
    get UnitMinipet() { return this.bit(16); }

    /**
     * No comment (yet!)
     */
    get GlyphSlot() { return this.bit(17); }

    /**
     * No comment (yet!)
     */
    get DestTarget() { return this.bit(18); }

    /**
     * No comment (yet!)
     */
    get Unused20() { return this.bit(19); }

    /**
     * No comment (yet!)
     */
    get UnitPassenger() { return this.bit(20); }
}
