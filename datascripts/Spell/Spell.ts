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
import { SpellRow } from "wotlkdata/dbc/types/Spell";
import { Ids } from "../Misc/Ids";
import { IncludeExclude, IncludeExcludeMask } from "../Misc/IncludeExclude";
import { MainEntity } from "../Misc/Entity";
import { AuraInterruptFlags } from "./AuraInterruptFlags";
import { InterruptFlags } from "./InterruptFlags";
import { SpellAttributes } from "./SpellAttributes";
import { BaseClassSet } from "./SpellClassSet";
import { SpellEffects } from "./SpellEffect";
import { SpellIconCell } from "./SpellIcon";
import { SpellItemEquips } from "./SpellItemEquips";
import { SpellLevels } from "./SpellLevels";
import { SpellPower } from "./SpellPower";
import { SpellPowerDisplay } from "./SpellPowerDisplay";
import { SpellProc } from "./SpellProc";
import { SpellReagents } from "./SpellReagents";
import { SpellRecovery } from "./SpellRecovery";
import { SpellReputation } from "./SpellReputation";
import { SpellSkillLineAbilites } from "./SpellSkillLines";
import { SpellCreatureTarget } from "./TargetCreatureType";
import { SpellTargetType } from "./TargetType";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellCastTimePointer } from "./SpellCastTime";
import { SpellMissilePointer } from "./SpellMissile";
import { SpellDescriptionVariablePointer } from "./SpellDescriptionVariable";
import { SpellDifficultyPointer } from "./SpellDifficulty";
import { SpellVisualPointer } from "./SpellVisual";
import { SpellDurationPointer } from "./SpellDuration";
import { SpellRangePointer } from "./SpellRange";
import { SchoolMask } from "../Misc/School";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { SpellGroups } from "./SpellGroup";
import { SpellRank } from "./SpellRank";
import { MaskCell32, MaskCell64 } from "wotlkdata/cell/cells/MaskCell";
import { RaceType } from "../Race/RaceType";
import { Classes } from "../Class/Class";
import { RefStatic } from "../Refs/Ref";
import { Spells } from "./Spells";

export class Spell extends MainEntity<SpellRow> {
    get Attributes() { return new SpellAttributes(this, this); }

    @Transient
    get Visual() { return new SpellVisualPointer(this, this.wrapIndex(this.row.SpellVisualID,0)); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get ActiveIcon() { return new SpellIconCell(this, this.row.ActiveIconID); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Subtext() { return this.wrapLoc(this.row.NameSubtext); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get AuraDescription() { return this.wrapLoc(this.row.AuraDescription); }
    get PowerDisplay() { return new SpellPowerDisplay(this, this.row.PowerDisplayID); }

    get ID() { return this.row.ID.get(); }

    get TargetType() { return new SpellTargetType(this, this.row.Targets); }
    get CreatureTargets() { return new SpellCreatureTarget(this, this.row.TargetCreatureType); }

    get Totems() { return new SingleArraySystem(this,this.row.Totem,0); }
    get Reagents() { return new SpellReagents(this,this); }

    get RequiresSpellFocus() { return this.wrap(this.row.RequiresSpellFocus); }
    get FacingCasterFlags() { return new MaskCell32(this, this.row.FacingCasterFlags); }
    
    get CasterAuraState() : IncludeExclude<number, this> { 
        return new IncludeExclude(this, 
            this.wrap(this.row.CasterAuraState),
            this.wrap(this.row.ExcludeCasterAuraState)
    )}

    get TargetAuraState() : IncludeExclude<number, this> { 
        return new IncludeExclude(this, 
            this.wrap(this.row.TargetAuraState),
            this.wrap(this.row.ExcludeTargetAuraState)
    )}

    get CasterAuraSpell() : IncludeExclude<number, this> { 
        return new IncludeExclude(this, 
        this.wrap(this.row.CasterAuraSpell),
        this.wrap(this.row.ExcludeCasterAuraSpell)
    )}

    get TargetAuraSpell() : IncludeExclude<number, this> { 
        return new IncludeExclude(this, 
        this.wrap(this.row.TargetAuraSpell),
        this.wrap(this.row.ExcludeTargetAuraSpell)
    )}

    get SkillLines() { return new SpellSkillLineAbilites(this); }
    /** How many stacks of this spell can be present on the target */
    get Stacks() { return this.wrap(this.row.CumulativeAura); }

    get ModalNextSpell() { return this.wrap(this.row.ModalNextSpell); }
    get Effects() { return new SpellEffects(this); }
    get Duration() { return new SpellDurationPointer(this, this.row.DurationIndex); }
    get Range() { return new SpellRangePointer(this, this.row.RangeIndex); }
    get Speed() { return this.wrap(this.row.Speed); }
    get ClassMask() { return new BaseClassSet(this); }

    get Power() { return new SpellPower(this,this); }

    /**
     * Note: This field is just an alias for "Power"
     */
    @Transient
    get Mana() { return new SpellPower(this,this);}


    get ItemEquips() { return new SpellItemEquips(this, this.row); }
    get Proc() { return new SpellProc(this); }
    get Priority() { return this.wrap(this.row.SpellPriority); }
    get Cooldown() { return new SpellRecovery(this, this); }
    get MaxTargetLevel() { return this.wrap(this.row.MaxTargetLevel); }
    get MaxTargets() { return this.wrap(this.row.MaxTargets); }
    get DefenseType() { return this.wrap(this.row.DefenseType); }
    get PreventionType() { return this.wrap(this.row.PreventionType); }
    get StanceBarOrder() { return this.wrap(this.row.StanceBarOrder); }
    get CastTime() { return new SpellCastTimePointer(this,this.row.CastingTimeIndex); }
    get Category() { return this.wrap(this.row.Category); }

    /** Points to a TotemCategory */
    get RequiredTotems() { return new SingleArraySystem(this,this.row.RequiredTotemCategoryID,0); }
    get Faction() { return new SpellReputation(this); }
    get RequiredAuraVision() { return this.wrap(this.row.RequiredAuraVision); }

    /** Points to a WorldMapArea */
    get RequiredAreaID() { return this.wrap(this.row.RequiredAreasID); }
    get SchoolMask() { return new SchoolMask(this, this.row.SchoolMask); }
    get DispelType() { return this.wrap(this.row.DispelType); }
    get Mechanic() { return this.wrap(this.row.Mechanic); }
    get Missile() { return new SpellMissilePointer(this, this.row.SpellMissileID) }

    get ShapeshiftMask() { return new IncludeExcludeMask(this, 
        new MaskCell64(this,this.row.ShapeshiftMask),
        new MaskCell64(this,this.row.ShapeshiftMask),
    )}

    get Levels() { return new SpellLevels(this); }
    get SpellDescriptionVariable() { return new SpellDescriptionVariablePointer(this, this.row.SpellDescriptionVariableID) }
    get Difficulty() { return new SpellDifficultyPointer(this, this.row.SpellDifficultyID); }
    get ChannelInterruptFlags() { return new MaskCell32(this, this.row.ChannelInterruptFlags); }
    get AuraInterruptFlags() { return new AuraInterruptFlags(this); }
    get InterruptFlags() { return new InterruptFlags(this); }
    get Rank() { return new SpellRank(this, this.ID); }
    get Groups() { return new SpellGroups(this, this.ID); }

    addStartButton(clazz: number, button: number, races?: RaceType[]) {
        Classes.load(clazz).StartButtons.addSpell(button, this.ID, races);
        return this;
    }

    /**
     * Creates a separate clone of this spell
     * @param mod 
     * @param id 
     */
    clone(mod: string, id: string) {
        const newId = Ids.Spell.staticId(mod, id);
        let spell = new Spell(this.row.clone(newId));
        return spell;
    }
}

export class SpellRef<T> extends RefStatic<T,Spell> {
    protected create(mod: string, id: string, parent?: number): Spell {
        return Spells.create(mod,id,parent);
    }
    protected clone(mod: string, id: string): Spell {
        return Spells.create(mod,id,this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Spell): number {
        return v.ID;
    }
    protected resolve(): Spell {
        return Spells.load(this.cell.get());
    }
}