import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { loc_constructor } from "wotlkdata/primitives";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Ids } from "../Misc/Ids";
import { SkillLine } from "../SkillLines/SkillLine";
import { Spell } from "../Spell/Spell";
import { Trainer } from "../Trainer/Trainer";
import { std } from "../tswow-stdlib-data";
import { ProfessionGatheringNodes } from "./ProfessionGatheringNodes";
import { ProfessionGatheringSpells } from "./ProfessionGatheringSpells";
import { ProfessionNameSystem } from "./ProfessionName";
import { ProfessionRecipes } from "./ProfessionRecipe";
import { ProfessionTier, resolveProfessionRank } from "./ProfessionType";

export class Profession {
    readonly SkillLine: SkillLine;
    private _ApprenticeSpell: Spell|undefined;

    setHasCrafting(value: boolean) {
        this.Ranks.forEach(rank=>{
            let spell = rank.ProfessionSpell();
            if(value) {
                spell.Attributes.isHiddenInSpellbook.set(false);
                spell.Attributes.unk41.set(false);
            } else {
                spell.Attributes.unk41.set(true);
                spell.Attributes.isHiddenInSpellbook.set(true);
            }
        })
        return this;
    }

    constructor(skillLine: SkillLine) {
        this.SkillLine = skillLine;
    }

    get Recipes() { return new ProfessionRecipes(this); }
    get GatheringNodes() { return new ProfessionGatheringNodes(this); }
    get GatheringSpells() { return new ProfessionGatheringSpells(this); }
    get Name() { return new ProfessionNameSystem(this); }
    get ID() { return this.SkillLine.ID; }
    get Ranks() { return new ProfessionRanks(this); }

    static findApprenticeSpell(thiz: Profession) {
        // cached because it's expensive to find, and shouldn't change
        if(thiz._ApprenticeSpell!==undefined) return thiz._ApprenticeSpell;
        let spell = DBC.SkillLineAbility.filter({SkillLine:thiz.ID})
            .map(x=>std.Spells.load(x.Spell.get()))
            [0]

        if(!spell) return undefined;
        let spellRank = SQL.spell_ranks.find({spell_id:spell.ID});
        if(!spellRank) return undefined;
        let firstSpell = std.Spells.load(spellRank.first_spell_id.get());
        if(!firstSpell) {
            throw new Error(`Profession ${thiz.SkillLine.Name.enGB.get()} has an invalid first spell rank in spell_ranks`);
        }
        return firstSpell;
    }

    static getLearnSpells(profession: Profession, rank: number) {
        let rankSpell = this.getSkillRank(profession, rank);
        if(!rankSpell) return [];
        let spells = std.Spells.filter({Effect:36,EffectTriggerSpell:rankSpell.ID})
        if(spells.length === 0) {
            throw new Error(`Profession ${profession.ID} lacks a learn spell for rank ${rank}!`)
        }
        return spells;
    }

    static getSkillRank(profession: Profession, index: number) {
        if(index==1) {
            return this.findApprenticeSpell(profession);
        }

        let apprentice = this.findApprenticeSpell(profession);
        if(!apprentice) {
            return undefined;
        }

        let rank = SQL.spell_ranks.find({
              first_spell_id:apprentice.ID
            , rank:index
        });

        if(rank===undefined) {
            return undefined;
        }
        let spl = std.Spells.load(rank.spell_id.get());

        if(spl===undefined) {
            throw new Error(`Spell ${profession.SkillLine.Name.enGB} has an invalid spell at rank ${index}`);
        }
        return spl;
    }

    static getTiers(profession: Profession) {
        return DBC.SkillTiers.findById(
            profession.SkillLine.RaceClassInfos.get()[0].SkillTierID.get()
        )
    }

    static copyTiers(profession: Profession) {
        profession.SkillLine.RaceClassInfos
            .get()[0].SkillTierID.set
                (
                    this.getTiers(profession)
                        .clone(Ids.SkillTiers.id())
                        .ID.get()
                )
    }

    addToTrainer(trainer: Trainer, tier: ProfessionTier, reqSkillValue: number, cost: number = 0, reqLevel: number = 0) {
        let index = resolveProfessionRank(tier);
        let len = this.Ranks.length;
        if(index > len) {
            throw new Error(
              `Attempted to add rank ${resolveProfessionRank(index)}`
            + ` for profession ${this.ID} to a trainer`
            + `, but it only has ${len} ranks`
            )
        }
        trainer.addSpell(
              this.Ranks.get(index).LearnSpells()[0].ID
            , cost
            , reqLevel
            , this.ID
            , reqSkillValue
            , index == 0 ? [] : [this.Ranks.get(resolveProfessionRank(index)-1).ProfessionSpell().ID]
            )
        return this;
    }
}

export class ProfessionRankNumber extends CellSystem<Profession> {
    private readonly index: number;

    constructor(owner: Profession, index: number) {
        super(owner);
        this.index = index;
    }

    set(value: number) {
        Profession.getTiers(this.owner).Value.setIndex(this.index,value);
        return this.owner;
    }

    copyTiersAndSet(value: number) {
        Profession.copyTiers(this.owner);
        return this.set(value);
    }
}

export class ProfessionRank extends CellSystem<Profession> {
    private readonly rank;
    constructor(owner: Profession, rank: number) {
        super(owner);
        this.rank = rank;
    }

    get SkillLevel() { return new ProfessionRankNumber(this.owner,this.rank); }
    LearnSpells() { return Profession.getLearnSpells(this.owner, this.rank) }
    ProfessionSpell() { return Profession.getSkillRank(this.owner, this.rank) as any as Spell; }
}

export class ProfessionRanks extends CellSystem<Profession> {
    get length() {
        let fst = Profession.findApprenticeSpell(this.owner);
        if(fst == undefined) {
            return 0;
        }
        let ranks = SQL.spell_ranks
            .filter({first_spell_id:fst.ID})
            .sort((a,b)=>a.rank.get()>b.rank.get() ? -1 : 1)
            .map(x=>x.rank.get())

        if(ranks.length == 0) {
            throw new Error(`Profession ${this.owner.ID} does not have any correct spell ranks`);
        }

        return ranks[0];
    }

    forEach(callback: (rank: ProfessionRank)=>void) {
        let len = this.length;
        for(let i=0;i<len; ++i) {
            callback(this.get(i));
        }
        return this.owner;
    }

    add(modid: string, id: string, maxSkill: number, subtext: loc_constructor) {
        let newIndex = this.length;
        let spell = std.Spells.create(modid,id)
            .Name.set(this.owner.SkillLine.Name.objectify())
            .Subtext.set(subtext)
            .Description.set(this.owner.SkillLine.Description.objectify())
            .Attributes.isAbility.set(true)
            .Attributes.notShapeshifted.set(true)
            .Attributes.castableWhileMounted.set(true)
            .Attributes.castableOnVehicle.set(true)
            .Icon.set('Interface\\Icons\\Trade_BlackSmithing')
            .SchoolMask.Physical.set(true)
            .Visual.set(0)
            .Effects.addMod(eff=>{
                eff.EffectType.TradeSkill.set()
            })
            .Effects.addMod(eff=>{
                eff.EffectType.Skill.set()
                    .SkillTier.set(newIndex)
                    .SkillID.set(this.owner.ID)
                    .TargetA.set(0)
                    .TargetB.set(0)
                    .ChainAmplitude.set(1)
                    .AsRawEffect()
                    .DieSides.set(1)
                    .BonusMultiplier.set(1)
            })
            .SkillLines.addMod(this.owner.ID,false,sla=>{
                sla
                   .ClassMaskForbidden.set(0)
                   .MinSkillRank.set(1)
                   .AcquireMethod.set(0)
                   .RaceMask.set(0)
                   .ClassMask.set(0)
            })

        spell.Rank.set(newIndex == 0 ? spell.ID : this.get(0).ProfessionSpell().ID,newIndex+1)
        if(newIndex > 0) {
            this.get(newIndex-1).ProfessionSpell().SkillLines.forEach(x=>{
                x.SupercededBy.set(spell.ID);
            })
        }

        std.Spells.create(modid,`${id}_learn`)
            .Name.set(this.owner.SkillLine.Name.objectify())
            .Subtext.set(subtext)
            .Attributes.isHiddenFromLog.set(true)
            .Attributes.sheatheUnchanged.set(true)
            .TargetType.UnitAlly.set(true)
            .SchoolMask.Physical.set(true)
            .Effects.addMod(effect=>{
                effect.EffectType.LearnSpell.set()
                    .LearntSpell.set(spell.ID)
            })
            .Effects.addMod(effect=>{
                effect.EffectType.SkillStep.set()
                        .Skill.set(this.owner.ID)
                        .Tier.set(newIndex)
                        .AsRawEffect()
                        .DieSides.set(1)
            })
        Profession.getTiers(this.owner).Value.setIndex(newIndex,maxSkill);
        return this.owner;
    }

    copyTiersAndAdd(modid: string, id: string, maxSkill: number, subtext: loc_constructor) {
        Profession.copyTiers(this.owner);
        this.add(modid,id,maxSkill,subtext);
        return this.owner;
    }

    get(index: ProfessionTier) {
        return new ProfessionRank(
              this.owner
            , resolveProfessionRank(index)+1
            );
    }
}