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
import { MaskCell, MaskLongCell } from "wotlkdata/cell/systems/Mask";
import { SpellRow } from "wotlkdata/dbc/types/Spell";
import { Ids } from "../Misc/Ids";
import { IncludeExclude, IncludeExcludeMask } from "../Misc/IncludeExclude";
import { MainEntity } from "../Misc/MainEntity";
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
import { CellIndexWrapper } from "wotlkdata/cell/Cell";
import { SpellCastTime } from "./SpellCastTime";
import { SpellMissile } from "./SpellMissile";
import { SpellDescriptionVariable } from "./SpellDescriptionVariable";
import { SpellDifficulty } from "./SpellDifficulty";
import { SpellVisual, SpellVisualKit } from "./SpellVisual";
import { SpellDuration } from "./SpellDuration";
import { SpellRange } from "./SpellRange";
import { SchoolMask } from "../Misc/School";
import { SpellVisualEffect } from "./SpellVisualEffect";
import { Vector3 } from "wotlkdata/cell/systems/Vector3";
import { DBCIntCell } from "wotlkdata/dbc/DBCCell";
import { SpellVisualRow } from "wotlkdata/dbc/types/SpellVisual";
import { Transient } from "wotlkdata/cell/Transient";
import { SpellGroups } from "./SpellGroup";
import { SpellRank } from "./SpellRank";

export class Spell extends MainEntity<SpellRow> {
    get Attributes() { return new SpellAttributes(this, this); }

    @Transient
    get Visual() { return new SpellVisual(this, 
        [new CellIndexWrapper(undefined,this.row.SpellVisualID,0)]); }
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
    get FacingCasterFlags() { return new MaskCell(this, this.row.FacingCasterFlags); }
    
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

    get SkillLines() { return new SpellSkillLineAbilites(this, this); }
    /** How many stacks of this spell can be present on the target */
    get Stacks() { return this.wrap(this.row.CumulativeAura); }

    get ModalNextSpell() { return this.wrap(this.row.ModalNextSpell); }
    get Effects() { return new SpellEffects(this, this); }
    get Duration() { return new SpellDuration(this, [this.row.DurationIndex]); }
    get Range() { return new SpellRange(this, [this.row.RangeIndex]); }
    get Speed() { return this.wrap(this.row.Speed); }
    get ClassMask() { return new BaseClassSet(this); }
    get Power() { return new SpellPower(this,this); }
    get ItemEquips() { return new SpellItemEquips(this); }
    get Proc() { return new SpellProc(this); }
    get Priority() { return this.wrap(this.row.SpellPriority); }
    get Cooldown() { return new SpellRecovery(this, this); }
    get MaxTargetLevel() { return this.wrap(this.row.MaxTargetLevel); }
    get MaxTargets() { return this.wrap(this.row.MaxTargets); }
    get DefenseType() { return this.wrap(this.row.DefenseType); }
    get PreventionType() { return this.wrap(this.row.PreventionType); }
    get StanceBarOrder() { return this.wrap(this.row.StanceBarOrder); }
    get CastTime() { return new SpellCastTime(this,[this.row.CastingTimeIndex]); }
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

    get Missile() { return new SpellMissile(this, [this.row.SpellMissileID]) }

    get ShapeshiftMask() { return new IncludeExcludeMask(this, 
        new MaskLongCell(this,this.row.ShapeshiftMask),
        new MaskLongCell(this,this.row.ShapeshiftMask),
    )}

    get Levels() { return new SpellLevels(this); }
    get SpellDescriptionVariable() { return new SpellDescriptionVariable(this, [this.row.SpellDescriptionVariableID]) }
    get Difficulty() { return new SpellDifficulty(this, [this.row.SpellDifficultyID]); }
    get ChannelInterruptFlags() { return new MaskCell(this, this.row.ChannelInterruptFlags); }
    get AuraInterruptFlags() { return new AuraInterruptFlags(this); }
    get InterruptFlags() { return new InterruptFlags(this); }

    get MissileModel() { return new SpellVisualEffect(this, this.Visual.row.MissileModel); }
    get MissileAttachment() { return this.wrap(this.Visual.row.MissileAttachment); }
    get MissileCastOffset() { return new Vector3(
          this
        , this.Visual.row.MissileCastOffsetX
        , this.Visual.row.MissileCastOffsetY
        , this.Visual.row.MissileCastOffsetZ
        )}

    get MissileImpactOffset() { 
        return new Vector3(
              this
            , this.Visual.row.MissileImpactOffsetX
            , this.Visual.row.MissileImpactOffsetY
            , this.Visual.row.MissileImpactOffsetZ
        )
    } 

    private kit(name: string, kit: DBCIntCell<SpellVisualRow>): SpellVisualKit<Spell> {
        return new SpellVisualKit(this,kit, name);
    }

    get CastKit() { return this.kit("Cast", this.Visual.row.CastKit); }
    get StateKit() { return this.kit("State", this.Visual.row.StateKit); }
    get ImpactKit() { return this.kit("Impact", this.Visual.row.ImpactKit); }
    get ChannelKit() { return this.kit("Channel", this.Visual.row.ChannelKit); }
    get PrecastKit() { return this.kit("Precast", this.Visual.row.PrecastKit); }
    get StateDoneKit() { return this.kit("StateDone", this.Visual.row.StateDoneKit); }
    get ImpactAreaKit() { return this.kit("ImpactArea", this.Visual.row.ImpactAreaKit); }
    get InstantAreaKit() { return this.kit("InstantArea", this.Visual.row.InstantAreaKit); }
    get CasterImpactKit() { return this.kit("CasterImpact", this.Visual.row.CasterImpactKit); }
    get TargetImpactKit() { return this.kit("TargetImpact", this.Visual.row.TargetImpactKit); }
    get PersistentAreaKit() { return this.kit("PersistentArea", this.Visual.row.PersistentAreaKit); }
    get MissileTargetingKit() { return this.kit("MissileTargeting", this.Visual.row.MissileTargetingKit); }
    get Rank() { return new SpellRank(this, this.ID); }

    AllKits() {
        return ([
            [this.Visual.row.CastKit,"Cast"],
            [this.Visual.row.StateKit,"State"],
            [this.Visual.row.ImpactKit,"Impact"],
            [this.Visual.row.ChannelKit,"Channel"],
            [this.Visual.row.PrecastKit,"Precast"],
            [this.Visual.row.StateDoneKit,"StateDone"],
            [this.Visual.row.ImpactAreaKit,"ImpactArea"],
            [this.Visual.row.InstantAreaKit,"InstantArea"],
            [this.Visual.row.CasterImpactKit,"Impact"],
            [this.Visual.row.TargetImpactKit,"TargetImpact"],
            [this.Visual.row.PersistentAreaKit,"PersistentArea"],
            [this.Visual.row.MissileTargetingKit,"MissileTargeting"]
        ] as [DBCIntCell<any>,string][]).filter(([row])=>{
            return row.get()!=0;
        }).map(([row,name])=>new SpellVisualKit(this, row, name));
    }

    get Groups() { return new SpellGroups(this, this.ID); }

    /**
     * Creates a separate clone of this spell
     * @param mod 
     * @param id 
     * @param keepVisualLink - Whether the new spell should keep sharing visual rows with its parent.
     */
    clone(mod: string, id: string, keepVisualLink: boolean = false) {
        const newId = Ids.Spell.id(mod, id);
        let spell = new Spell(this.row.clone(newId));
        if(!keepVisualLink) {
            spell.Visual.makeUnique();
        }
        spell.Duration.makeUnique();
        for(let i=0;i<spell.Effects.length; ++i) {
            spell.Effects.get(i).Radius.makeUnique();
        }
        spell.CastTime.makeUnique();
        return spell;
    }
}