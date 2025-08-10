import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { loc_constructor } from "../../../data/primitives";
import { SkillLineRow } from "../../dbc/SkillLine";
import { MainEntity } from "../Misc/Entity";
import { SelfRef } from "../Refs/Ref";
import { SkillLine } from "../SkillLines/SkillLine";
import { Spell } from "../Spell/Spell";
import { TrainerBase } from "../Trainer/Trainer";
import { ProfessionGatheringNodes } from "./ProfessionGatheringNodes";
import { ProfessionGatheringSpells } from "./ProfessionGatheringSpells";
import { ProfessionNameSystem } from "./ProfessionName";
import { ProfessionRecipes } from "./ProfessionRecipe";
import { ProfessionTier } from "./ProfessionType";
export declare class Profession extends MainEntity<SkillLineRow> {
    get AsSkillLine(): SelfRef<this, SkillLine>;
    private _cachedApprenticeSpell;
    private _cachedLearnSpells;
    /** contains all except the apprentice spell */
    private _cachedRanks;
    setHasCrafting(value: boolean): this;
    get Recipes(): ProfessionRecipes;
    get GatheringNodes(): ProfessionGatheringNodes;
    get GatheringSpells(): ProfessionGatheringSpells;
    get Name(): ProfessionNameSystem;
    get ID(): number;
    readonly Ranks: ProfessionRanks;
    static findApprenticeSpell(thiz: Profession): Spell;
    static getLearnSpells(profession: Profession, rank: number): Spell[];
    static getSkillRank(profession: Profession, index: number): Spell;
    static setCacheRanks(profession: Profession): void;
    static setCacheNonApprenticeSpell(profession: Profession, spell: Spell): void;
    static setCacheApprenticeSpell(profession: Profession, spell: Spell): void;
    static setCacheLearnSpells(profession: Profession): void;
    static addCachedLearnSpell(profession: Profession, rank: number, spell: Spell): void;
    static getTiers(profession: Profession): import("../../dbc/SkillTiers").SkillTiersRow;
    static copyTiers(profession: Profession): void;
    addToTrainer(trainer: TrainerBase, tier: ProfessionTier, reqSkillValue: number, cost?: number, reqLevel?: number): this;
}
export declare class ProfessionRankNumber extends CellSystem<Profession> {
    private readonly index;
    constructor(owner: Profession, index: number);
    set(value: number): Profession;
    copyTiersAndSet(value: number): Profession;
}
export declare class ProfessionRank extends CellSystem<Profession> {
    private readonly rank;
    constructor(owner: Profession, rank: number);
    get SkillLevel(): ProfessionRankNumber;
    LearnSpells(): Spell[];
    ProfessionSpell(): Spell;
}
export declare class ProfessionRanks extends CellSystem<Profession> {
    private cachedLength?;
    static setCached(ranks: ProfessionRanks, length: number): void;
    clearCache(): void;
    get length(): number;
    forEach(callback: (rank: ProfessionRank) => void): Profession;
    add(modid: string, id: string, maxSkill: number, subtext: loc_constructor): Profession;
    addGet(modid: string, id: string, maxSkill: number, subtext: loc_constructor): ProfessionRank;
    copyTiersAndAdd(modid: string, id: string, maxSkill: number, subtext: loc_constructor): Profession;
    get(index: ProfessionTier): ProfessionRank;
}
