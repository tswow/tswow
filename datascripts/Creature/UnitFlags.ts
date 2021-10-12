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


    setBit(no: number, value: boolean) {
        if(value) {
            const cell = this.cell(no);
            cell.set((cell.get()|1<<this.bitno(no))>>>0);
        } else {
            const cell = this.cell(no);
            cell.set((cell.get()&~1<<this.bitno(no))>>>0);
        }
        return this.owner;
    }

    getBit(no: number): boolean {
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

    get SERVER_CONTROLLED() { return this.bit(0); }
    get NON_ATTACKABLE() { return this.bit(1); }
    get REMOVE_CLIENT_CONTROL() { return this.bit(2); }
    /** Controlled by player */
    get PLAYER_CONTROLLED() { return this.bit(3); }
    get RENAME() { return this.bit(4); }
    /** Don't take reagents for spells */
    get PREPARATION() { return this.bit(5); }
    /** Needed to cast nontriggered spells in smart_scripts */
    get UNK6() { return this.bit(6); }
    get NON_ATTACKABLE1() { return this.bit(7); }
    /** Disables combat/assistance with Players */
    get IMMUNE_TO_P_C() { return this.bit(8); }
    /** Disables combat/assistance with NPCs */
    get IMMUNE_TO_N_P_C() { return this.bit(9); }
    /** Show loot animation */
    get LOOTING() { return this.bit(10); }
    get PET_IN_COMBAT() { return this.bit(11); }
    get PV_P() { return this.bit(12); }
    /** Can't cast spells */
    get SILENCED() { return this.bit(13); }
    get CANNOT_SWIM() { return this.bit(14); }
    /** Show swim animation in water */
    get SWIMMING() { return this.bit(15); }
    /** Removes attackable icon */
    get NON_ATTACKABLE2() { return this.bit(16); }
    /** Creature will never attack */
    get PACIFIED() { return this.bit(17); }
    get STUNNED() { return this.bit(18); }
    get IN_COMBAT() { return this.bit(19); }
    get TAXI_FLIGHT() { return this.bit(20); }
    get DISARMED() { return this.bit(21); }
    get CONFUSED() { return this.bit(22); }
    /** Feared */
    get FLEEING() { return this.bit(23); }
    /** Under control by a player */
    get POSSESSED() { return this.bit(24); }
    /** Can't be selected by mouse or /target */
    get NOT_SELECTABLE() { return this.bit(25); }
    /** Can be skinned */
    get SKINNABLE() { return this.bit(26); }
    /** Used to create custom mounts(?) */
    get MOUNT() { return this.bit(27); }
    /** Prevents kneeling when looting(?) */
    get UNK28() { return this.bit(28); }
    /** Used in feign death spell */
    get UNK29() { return this.bit(29); }
    get SHEATHE() { return this.bit(30); }
    /** Immune to damage */
    get IMMUNE() { return this.bit(31); }
    get FEIGN_DEATH() {return this.bit(32); }
    get UNK1__2() {return this.bit(33); }
    get IGNORE_REPUTATION() {return this.bit(34); }
    get COMPREHEND_LANG() {return this.bit(35); }
    get MIRROR_IMAGE() {return this.bit(36); }
    get INSTANTLY_APPEAR_MODEL() {return this.bit(37); }
    get FORCE_MOVEMENT() {return this.bit(38); }
    get DISARM_OFFHAND() {return this.bit(39); }
    get DISABLE_PRED_STATS() {return this.bit(40); }
    get DISARM_RANGED() {return this.bit(41); }
    get REGENERATE_POWER() {return this.bit(42); }
    get RESTRICT_PARTY_INTERACTION() {return this.bit(43); }
    get PREVENT_SPELL_CLICK() {return this.bit(44); }
    get ALLOW_ENEMY_INTERACT() {return this.bit(45); }
    get DISABLE_TURN() {return this.bit(46); }
    get UNK2__2() {return this.bit(47); }
    get PLAY_DEATH_ANIM() {return this.bit(48); }
    get ALLOW_CHEAT_SPELLS() {return this.bit(49); }
}