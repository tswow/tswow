import { MaskCell32, MaskCell64 } from "../../../data/cell/cells/MaskCell";
import { loc_constructor } from "../../../data/primitives";
import { SpellRow } from "../../dbc/Spell";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntityID } from "../Misc/Entity";
import { IncludeExclude, IncludeExcludeGeneric, IncludeExcludeMask } from "../Misc/IncludeExclude";
import { SchoolMask } from "../Misc/School";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { AuraInterruptFlags } from "./AuraInterruptFlags";
import { CastSpells } from "./CastOnCreate";
import { SpellFacingFlags } from "./FacingCasterFlags";
import { InterruptFlags } from "./InterruptFlags";
import { SpellAttributes } from "./SpellAttributes";
import { AuraStateType } from "./SpellAuraState";
import { SpellAutoLearns } from "./SpellAutoLearn";
import { SpellBonusData } from "./SpellBonusData";
import { BaseClassSet } from "./SpellClassSet";
import { SpellCustomAttr } from "./SpellCustomAttr";
import { DispelType } from "./SpellDispelType";
import { SpellEffects } from "./SpellEffect";
import { SpellIconCell } from "./SpellIcon";
import { SpellItemEquips } from "./SpellItemEquips";
import { SpellLevels } from "./SpellLevels";
import { SpellPower } from "./SpellPower";
import { SpellPowerDisplay } from "./SpellPowerDisplay";
import { SpellPreventionType } from "./SpellPreventionType";
import { SpellProc } from "./SpellProc";
import { SpellRank } from "./SpellRank";
import { SpellReagents } from "./SpellReagents";
import { SpellRecovery } from "./SpellRecovery";
import { SpellReputation } from "./SpellReputation";
import { SpellScript } from "./SpellScript";
import { SpellSkillLineAbilites } from "./SpellSkillLines";
import { SpellSpellStackGroups } from "./SpellStackGroup";
import { SpellThreat } from "./SpellThreat";
import { SpellCreatureTarget } from "./TargetCreatureType";
import { SpellTargetType } from "./TargetType";
export declare class Spell extends MainEntityID<SpellRow> {
    get Attributes(): SpellAttributes<this>;
    get Visual(): import("../Refs/Ref").RefDynamic<this, import("./SpellVisual").SpellVisual>;
    get Icon(): SpellIconCell<this>;
    get ActiveIcon(): SpellIconCell<this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Subtext(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get AuraDescription(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get PowerDisplay(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellPowerDisplay>;
    get ID(): number;
    get TargetType(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellTargetType>;
    get CreatureTargets(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellCreatureTarget>;
    get Totems(): SingleArraySystem<number, this>;
    get Reagents(): SpellReagents<this>;
    /** @deprecated use RequiredSpellFocus */
    get RequiresSpellFocus(): import("../Refs/Ref").RefDynamic<this, import("../SpellFocus/SpellFocus").SpellFocus>;
    get RequiredSpellFocus(): import("../Refs/Ref").RefDynamic<this, import("../SpellFocus/SpellFocus").SpellFocus>;
    get FacingCasterFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellFacingFlags>;
    get CasterAuraState(): IncludeExcludeGeneric<this, import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AuraStateType>, import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AuraStateType>>;
    get TargetAuraState(): IncludeExcludeGeneric<this, import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AuraStateType>, import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AuraStateType>>;
    get CasterAuraSpell(): IncludeExclude<number, this>;
    get TargetAuraSpell(): IncludeExclude<number, this>;
    get SkillLines(): SpellSkillLineAbilites;
    /** How many stacks of this spell can be present on the target */
    get Stacks(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ModalNextSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Effects(): SpellEffects;
    get Duration(): import("./SpellDuration").SpellDurationRef<this>;
    get Range(): import("./SpellRange").SpellRangeRef<this>;
    get Speed(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ClassMask(): BaseClassSet;
    get Family(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Power(): SpellPower<this>;
    /**
     * Note: This field is just an alias for "Power"
     */
    get Mana(): SpellPower<this>;
    get ItemEquips(): SpellItemEquips<this>;
    get Proc(): SpellProc<this>;
    get Priority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Cooldown(): SpellRecovery<this>;
    get MaxTargetLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxTargets(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DefenseType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PreventionType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SpellPreventionType>;
    get StanceBarOrder(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CastTime(): import("./SpellCastTime").SpellCastTimeRef<this>;
    /** @deprecated use Cooldown.Category */
    get Category(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /** Points to a TotemCategory */
    get RequiredTotems(): SingleArraySystem<number, this>;
    get Faction(): SpellReputation;
    get RequiredAuraVision(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /** Points to a WorldMapArea */
    get RequiredArea(): import("../Refs/Ref").RefDynamic<this, import("../Area/AreaGroup").AreaGroup>;
    get SchoolMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
    get DispelType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof DispelType>;
    get Mechanic(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Missile(): import("../Refs/Ref").RefDynamic<this, import("./SpellMissile").SpellMissile>;
    get ShapeshiftMask(): IncludeExcludeMask<this, MaskCell64<this>>;
    get Levels(): SpellLevels;
    get DescriptionVariable(): import("./SpellDescriptionVariable").SpellDescriptionVariableRef<this>;
    get Difficulty(): import("./SpellDifficulty").SpellDifficultyRef<this>;
    get ChannelInterruptFlags(): MaskCell32<this>;
    get AuraInterruptFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof AuraInterruptFlags>;
    get InterruptFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof InterruptFlags>;
    get Rank(): SpellRank<this>;
    get StackGroups(): SpellSpellStackGroups;
    get AutoLearn(): SpellAutoLearns;
    /** Custom server core attributes for this spell */
    readonly CustomAttributes: SpellCustomAttr;
    /** Custom server core damage bonuses */
    readonly BonusData: SpellBonusData;
    /** Custom server core spell threat bonuses */
    readonly Threat: SpellThreat;
    /**
     * Does **not** support setting this attribute,
     * please use TSWoW Spell events instead.
     */
    get CoreScript(): SpellScript;
    get CastOnPlayerCreate(): CastSpells<this>;
    get InlineScripts(): _hidden.Spell<this>;
    clear(): this;
    codify(settings: {
        mod?: string;
        id?: string;
        name?: loc_constructor;
    } & CodegenSettings): string;
}
