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
import { MaskCell } from "../../../data/cell/cells/MaskCell";
import { CreatureTemplate } from "./CreatureTemplate";

enum UnitFlags1 {
    SERVER_CONTROLLED             = 0x00000001,
    NON_ATTACKABLE                = 0x00000002,
    REMOVE_CLIENT_CONTROL         = 0x00000004,
    PLAYER_CONTROLLED             = 0x00000008,
    RENAME                        = 0x00000010,
    PREPARATION                   = 0x00000020,
    UNK_6                         = 0x00000040,
    NOT_ATTACKABLE_1              = 0x00000080,
    IMMUNE_TO_PC                  = 0x00000100,
    IMMUNE_TO_NPC                 = 0x00000200,
    LOOTING                       = 0x00000400,
    PET_IN_COMBAT                 = 0x00000800,
    PVP_ENABLING                  = 0x00001000,
    SILENCED                      = 0x00002000,
    CANNOT_SWIM                   = 0x00004000,
    CAN_SWIM                      = 0x00008000,
    NON_ATTACKABLE_2              = 0x00010000,
    PACIFIED                      = 0x00020000,
    STUNNED                       = 0x00040000,
    IN_COMBAT                     = 0x00080000,
    ON_TAXI                       = 0x00100000,
    DISARMED                      = 0x00200000,
    CONFUSED                      = 0x00400000,
    FLEEING                       = 0x00800000,
    POSSESSED                     = 0x01000000,
    UNINTERACTIBLE                = 0x02000000,
    SKINNABLE                     = 0x04000000,
    MOUNT                         = 0x08000000,
    UNK_28                        = 0x10000000,
    PREVENT_EMOTES_FROM_CHAT_TEXT = 0x20000000,
    SHEATHE                       = 0x40000000,
    IMMUNE                        = 0x80000000,
}

enum UnitFlags2 {
    FEIGN_DEATH                = 0x0001,
    HIDE_BODY                  = 0x0002,
    IGNORE_REPUTATION          = 0x0004,
    COMPREHEND_LANG            = 0x0008,
    MIRROR_IMAGE               = 0x0010,
    DO_NOT_FADE_IN             = 0x0020,
    FORCE_MOVEMENT             = 0x0040,
    DISARM_OFFHAND             = 0x0080,
    DISABLE_PRED_STATS         = 0x0100,
    DISARM_RANGED              = 0x0400,
    REGENERATE_POWER           = 0x0800,
    RESTRICT_PARTY_INTERACTION = 0x1000,
    PREVENT_SPELL_CLICK        = 0x2000,
    ALLOW_ENEMY_INTERACT       = 0x4000,
    CANNOT_TURN                = 0x8000,
    UNK2                       = 0x10000,
    PLAY_DEATH_ANIM            = 0x20000,
    ALLOW_CHEAT_SPELLS         = 0x40000,
    CALL_GUARDS                = 0x80000,
}

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

    private mask(index: number, mask: number) {
        let found = -1;
        for(let i=0;i<32;++i) {
            if(mask&(1<<i)) {
                if(found >= 0) {
                    throw new Error(`Multibits not supported for UnitFlags`)
                }
                found = i;
            }
        }
        if(found == -1) {
            throw new Error(`Invalid mask for UnitFlgs: ${mask}`)
        }
        return this.bit(found+index*32);
    }

    add(values: string[])
    {
        values.forEach(x=>{
            (this as any)[x].set(true);
        })
        return this.owner;
    }

    set(values: string[])
    {
        this.clearAll();
        return this.add(values);
    }

    setBit(no: number, value: boolean) {
        if(value) {
            const cell = this.cell(no);
            cell.set((cell.get()|1<<this.bitno(no))>>>0);
        } else {
            const cell = this.cell(no);
            cell.set((cell.get()&~(1<<this.bitno(no)))>>>0);
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

    get SERVER_CONTROLLED() {
        return this.mask(0, UnitFlags1.SERVER_CONTROLLED);
    }
    get NON_ATTACKABLE() {
        return this.mask(0,UnitFlags1.NON_ATTACKABLE)
    }
    get REMOVE_CLIENT_CONTROL() {
        return this.mask(0,UnitFlags1.REMOVE_CLIENT_CONTROL)
     }
    /** controlled by player, use _IMMUNE_TO_PC instead of _IMMUNE_TO_NPC */
    get PLAYER_CONTROLLED() {
        return this.mask(0,UnitFlags1.PLAYER_CONTROLLED)
    }
    get RENAME() {
        return this.mask(0,UnitFlags1.RENAME)
    }
    /** Don't take reagents for spells */
    get PREPARATION() {
        return this.mask(0,UnitFlags1.PREPARATION)
    }
    /** Needed to cast nontriggered spells in smart_scripts */
    get UNK6() {
        return this.mask(0,UnitFlags1.UNK_6)
    }
    get NON_ATTACKABLE1() {
        return this.mask(0,UnitFlags1.NON_ATTACKABLE)
    }
    /** Disables combat/assistance with Players */
    get IMMUNE_TO_PC() {
        return this.mask(0,UnitFlags1.IMMUNE_TO_PC)
    }
    /** Disables combat/assistance with NPCs */
    get IMMUNE_TO_NPC() {
        return this.mask(0,UnitFlags1.IMMUNE_TO_NPC)
    }
    /** Show loot animation */
    get LOOTING() {
        return this.mask(0,UnitFlags1.LOOTING)
    }
    get PET_IN_COMBAT() {
        return this.mask(0,UnitFlags1.PET_IN_COMBAT)
    }
    get PVP_ENABLING() {
        return this.mask(0,UnitFlags1.PVP_ENABLING)
    }
    /** Can't cast spells */
    get SILENCED() {
        return this.mask(0,UnitFlags1.SILENCED)
    }
    get CANNOT_SWIM() {
        return this.mask(0,UnitFlags1.CANNOT_SWIM)
    }
    /** Show swim animation in water */
    get CAN_SWIM() {
        return this.mask(0,UnitFlags1.CAN_SWIM)
    }
    /** Removes attackable icon */
    get NON_ATTACKABLE_2() {
        return this.mask(0,UnitFlags1.NON_ATTACKABLE_2)
    }
    /** Creature will never attack */
    get PACIFIED() {
        return this.mask(0,UnitFlags1.PACIFIED)
    }
    get STUNNED() {
        return this.mask(0,UnitFlags1.STUNNED)
    }

    get IN_COMBAT() {
        return this.mask(0,UnitFlags1.IN_COMBAT)
    }
    get ON_TAXI() {
        return this.mask(0,UnitFlags1.ON_TAXI)
    }
    get DISARMED() {
        return this.mask(0,UnitFlags1.DISARMED)
    }
    get CONFUSED() {
        return this.mask(0,UnitFlags1.CONFUSED)
    }
    /** Feared */
    get FLEEING() {
        return this.mask(0,UnitFlags1.FLEEING)
    }
    /** Under control by a player */
    get POSSESSED() {
        return this.mask(0,UnitFlags1.POSSESSED)
    }
    /** Can't be selected by mouse or /target */
    get NOT_SELECTABLE() {
        return this.mask(0,UnitFlags1.UNINTERACTIBLE)
    }
    /** Can be skinned */
    get SKINNABLE() {
        return this.mask(0,UnitFlags1.SKINNABLE)
    }
    /** Used to create custom mounts(?) */
    get MOUNT() {
        return this.mask(0,UnitFlags1.MOUNT)
    }
    /** Prevents kneeling when looting(?) */
    get UNK28() {
        return this.mask(0,UnitFlags1.UNK_28)
    }
    /** Used in feign death spell */
    get PREVENT_EMOTES_FROM_CHAT_TEXT() {
        return this.mask(0,UnitFlags1.PREVENT_EMOTES_FROM_CHAT_TEXT)
    }
    get SHEATHE() {
        return this.mask(0,UnitFlags1.SHEATHE)
    }
    /** Immune to damage */
    get IMMUNE() {
        return this.mask(0,UnitFlags1.IMMUNE)
    }

    get FEIGN_DEATH() {
        return this.mask(1,UnitFlags2.FEIGN_DEATH)
    }

    /**Hide unit model (show only player equip)*/
    get HIDE_BODY() {
        return this.mask(1,UnitFlags2.HIDE_BODY)
    }
    get IGNORE_REPUTATION() {
        return this.mask(1,UnitFlags2.IGNORE_REPUTATION)
    }
    get COMPREHEND_LANG() {
        return this.mask(1,UnitFlags2.COMPREHEND_LANG)
    }
    get MIRROR_IMAGE() {
        return this.mask(1,UnitFlags2.MIRROR_IMAGE)
    }

    /** Unit model instantly appears when summoned (does not fade in) */
    get DO_NOT_FADE_IN() {
        return this.mask(1,UnitFlags2.DO_NOT_FADE_IN)
    }
    get FORCE_MOVEMENT() {
        return this.mask(1,UnitFlags2.FORCE_MOVEMENT)
    }
    get DISARM_OFFHAND() {
        return this.mask(1,UnitFlags2.DISARM_OFFHAND)
    }

    /** Player has disabled predicted stats (Used by raid frames) */
    get DISABLE_PRED_STATS() {
        return this.mask(1,UnitFlags2.DISABLE_PRED_STATS)
    }

    /** this does not disable ranged weapon display (maybe additional flag needed?) */
    get DISARM_RANGED() {
        return this.mask(1,UnitFlags2.DISARM_RANGED)
    }
    get REGENERATE_POWER() {
        return this.mask(1,UnitFlags2.REGENERATE_POWER)
    }

    /** Restrict interaction to party or raid */
    get RESTRICT_PARTY_INTERACTION() {
        return this.mask(1,UnitFlags2.RESTRICT_PARTY_INTERACTION)
    }

    /** Prevent spellclick */
    get PREVENT_SPELL_CLICK() {
        return this.mask(1,UnitFlags2.PREVENT_SPELL_CLICK)
    }
    get ALLOW_ENEMY_INTERACT() {
        return this.mask(1,UnitFlags2.ALLOW_ENEMY_INTERACT)
    }
    get DISABLE_TURN() {
        return this.mask(1,UnitFlags2.CANNOT_TURN)
    }
    get UNK2__2() {
        return this.mask(1,UnitFlags2.UNK2)
    }

    /** Plays special death animation upon death */
    get PLAY_DEATH_ANIM() {
        return this.mask(1,UnitFlags2.PLAY_DEATH_ANIM)
    }
    get ALLOW_CHEAT_SPELLS() {
        return this.mask(1,UnitFlags2.ALLOW_CHEAT_SPELLS)
    }
    get CALL_GUARDS() {
        return this.mask(1,UnitFlags2.CALL_GUARDS)
    }
}