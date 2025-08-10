import { MaskCell } from "../../../data/cell/cells/MaskCell";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class UnitFlags extends MaskCell<CreatureTemplate> {
    protected cells(): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/creature_template").creature_templateRow>[];
    protected deserialize(value: any): void;
    protected cell(no: number): import("../../../data/sql/SQLCell").SQLCell<number, import("../../sql/creature_template").creature_templateRow>;
    protected bitno(no: number): number;
    private mask;
    add(values: string[]): CreatureTemplate;
    set(values: string[]): CreatureTemplate;
    setBit(no: number, value: boolean): CreatureTemplate;
    getBit(no: number): boolean;
    clearAll(): CreatureTemplate;
    toString(): string;
    get SERVER_CONTROLLED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get NON_ATTACKABLE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get REMOVE_CLIENT_CONTROL(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** controlled by player, use _IMMUNE_TO_PC instead of _IMMUNE_TO_NPC */
    get PLAYER_CONTROLLED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get RENAME(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Don't take reagents for spells */
    get PREPARATION(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Needed to cast nontriggered spells in smart_scripts */
    get UNK6(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get NON_ATTACKABLE1(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Disables combat/assistance with Players */
    get IMMUNE_TO_PC(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Disables combat/assistance with NPCs */
    get IMMUNE_TO_NPC(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Show loot animation */
    get LOOTING(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get PET_IN_COMBAT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get PVP_ENABLING(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Can't cast spells */
    get SILENCED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get CANNOT_SWIM(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Show swim animation in water */
    get CAN_SWIM(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Removes attackable icon */
    get NON_ATTACKABLE_2(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Creature will never attack */
    get PACIFIED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get STUNNED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get IN_COMBAT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get ON_TAXI(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get DISARMED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get CONFUSED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Feared */
    get FLEEING(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Under control by a player */
    get POSSESSED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Can't be selected by mouse or /target */
    get NOT_SELECTABLE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Can be skinned */
    get SKINNABLE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Used to create custom mounts(?) */
    get MOUNT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Prevents kneeling when looting(?) */
    get UNK28(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Used in feign death spell */
    get PREVENT_EMOTES_FROM_CHAT_TEXT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get SHEATHE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Immune to damage */
    get IMMUNE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get FEIGN_DEATH(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /**Hide unit model (show only player equip)*/
    get HIDE_BODY(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get IGNORE_REPUTATION(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get COMPREHEND_LANG(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get MIRROR_IMAGE(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Unit model instantly appears when summoned (does not fade in) */
    get DO_NOT_FADE_IN(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get FORCE_MOVEMENT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get DISARM_OFFHAND(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Player has disabled predicted stats (Used by raid frames) */
    get DISABLE_PRED_STATS(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** this does not disable ranged weapon display (maybe additional flag needed?) */
    get DISARM_RANGED(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get REGENERATE_POWER(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Restrict interaction to party or raid */
    get RESTRICT_PARTY_INTERACTION(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Prevent spellclick */
    get PREVENT_SPELL_CLICK(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get ALLOW_ENEMY_INTERACT(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get DISABLE_TURN(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get UNK2__2(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    /** Plays special death animation upon death */
    get PLAY_DEATH_ANIM(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
    get ALLOW_CHEAT_SPELLS(): import("../../../data/cell/cells/MaskCell").MaskBit<CreatureTemplate, this>;
}
