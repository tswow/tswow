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
import { MaskCell } from "wotlkdata/cell/cells/MaskCell";
import { CreatureTemplate } from "./CreatureTemplate";

export class UnitFlags extends MaskCell<CreatureTemplate> {
    protected cells() {
        return [
            this.owner.row.unit_flags,
            this.owner.row.unit_flags2,
        ]
    }

    protected deserialize(value: any) {
        throw new Error(`Deserialize not implemented for UnitFlags`);
    }

    protected cell(no: number) {
        return this.cells()[Math.floor(no/32)]
    }

    protected bitno(no: number) { return no%32; }


    mark(no: number): CreatureTemplate {
        const cell = this.cell(no);
        cell.set((cell.get()|1<<this.bitno(no))>>>0);
        return this.owner;
    }

    clear(no: number): CreatureTemplate {
        const cell = this.cell(no);
        cell.set((cell.get()&~1<<this.bitno(no))>>>0);
        return this.owner;
    }

    check(no: number): boolean {
        const cell = this.cell(no);
        return ((cell.get()&1<<this.bitno(no))>>>0) !== 0;
    }

    clearAll(): CreatureTemplate {
        this.cells().forEach((x)=>x.set(0));
        return this.owner;
    }

    toString(): string {
        // ??
        return "";
    }

    get ServerControlled() { return this.bit(0); }
    get NonAttackable() { return this.bit(1); }
    get RemoveClientControl() { return this.bit(2); }
    /** Controlled by player */
    get PlayerControlled() { return this.bit(3); }
    get Rename() { return this.bit(4); }
    /** Don't take reagents for spells */
    get Preparation() { return this.bit(5); }
    /** Needed to cast nontriggered spells in smart_scripts */
    get Unk6() { return this.bit(6); }
    get NonAttackable1() { return this.bit(7); }
    /** Disables combat/assistance with Players */
    get ImmuneToPC() { return this.bit(8); }
    /** Disables combat/assistance with NPCs */
    get ImmuneToNPC() { return this.bit(9); }
    /** Show loot animation */
    get Looting() { return this.bit(10); }
    get PetInCombat() { return this.bit(11); }
    get PVP() { return this.bit(12); }
    /** Can't cast spells */
    get Silenced() { return this.bit(13); }
    get CannotSwim() { return this.bit(14); }
    /** Show swim animation in water */
    get Swimming() { return this.bit(15); }
    /** Removes attackable icon */
    get NonAttackable2() { return this.bit(16); }
    /** Creature will never attack */
    get Pacified() { return this.bit(17); }
    get Stunned() { return this.bit(18); }
    get InCombat() { return this.bit(19); }
    get TaxiFlight() { return this.bit(20); }
    get Disarmed() { return this.bit(21); }
    get Confused() { return this.bit(22); }
    /** Feared */
    get Fleeing() { return this.bit(23); }
    /** Under control by a player */
    get Possessed() { return this.bit(24); }
    /** Can't be selected by mouse or /target */
    get NotSelectable() { return this.bit(25); }
    /** Can be skinned */
    get Skinnable() { return this.bit(26); }
    /** Used to create custom mounts(?) */
    get Mount() { return this.bit(27); }
    /** Prevents kneeling when looting(?) */
    get Unk28() { return this.bit(28); }
    /** Used in feign death spell */
    get Unk29() { return this.bit(29); }
    get Sheathe() { return this.bit(30); }
    /** Immune to damage */
    get Immune() { return this.bit(31); }
    get FeignDeath() {return this.bit(32); }
    get Unk1_2() {return this.bit(33); }
    get IgnoreReputation() {return this.bit(34); }
    get ComprehendLang() {return this.bit(35); }
    get MirrorImage() {return this.bit(36); }
    get InstantlyAppearModel() {return this.bit(37); }
    get ForceMovement() {return this.bit(38); }
    get DisarmOffhand() {return this.bit(39); }
    get DisablePredStats() {return this.bit(40); }
    get DisarmRanged() {return this.bit(41); }
    get RegeneratePower() {return this.bit(42); }
    get RestrictPartyInteraction() {return this.bit(43); }
    get PreventSpellClick() {return this.bit(44); }
    get AllowEnemyInteract() {return this.bit(45); }
    get DisableTurn() {return this.bit(46); }
    get Unk2_2() {return this.bit(47); }
    get PlayDeathAnim() {return this.bit(48); }
    get AllowCheatSpells() {return this.bit(49); }
}