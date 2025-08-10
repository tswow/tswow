import { Cell } from "../../../data/cell/cells/Cell";
import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { CellSystem, LocSystem } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { LanguagesQuery, LanguagesRow } from "../../dbc/Languages";
import { ClassMask } from "../Class/ClassRegistry";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RaceMask } from "../Race/RaceType";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SkillLine } from "../SkillLines/SkillLine";
import { Spell } from "../Spell/Spell";
import { SkillLineAbility } from "../Spell/SpellSkillLines";
export declare class LanguageAutoLearn extends CellSystem<WoWLanguage> {
    add(classes?: MaskCon<keyof typeof ClassMask>, races?: MaskCon<keyof typeof RaceMask>): WoWLanguage;
}
export declare class LanguageWords extends CellSystem<WoWLanguage> {
    add(words: string[]): WoWLanguage;
    get(): import("../../dbc/LanguageWords").LanguageWordsRow[];
    getText(): string[];
}
export declare class LanguageName extends LocSystem<WoWLanguage> {
    lang(lang: Language): Cell<string, WoWLanguage> & PendingCell;
    clear(): WoWLanguage;
    get mask(): Cell<number, WoWLanguage>;
    set(con: loc_constructor): WoWLanguage;
}
export declare class LanguageSkills extends MultirowSystemCached<SkillLine, WoWLanguage> {
    private cachedSkills?;
    protected getAllRows(): SkillLine[];
    protected isDeleted(value: SkillLine): boolean;
}
export declare class LanguageAbilities extends MultirowSystemCached<SkillLineAbility, WoWLanguage> {
    protected getAllRows(): SkillLineAbility[];
    protected isDeleted(value: SkillLineAbility): boolean;
}
export declare class LanguageSpells extends MultirowSystemCached<Spell, WoWLanguage> {
    protected getAllRows(): Spell[];
    protected isDeleted(value: Spell): boolean;
}
/**
 * Creates and handles languages in World of Warcraft,
 * such as Orcish or Common.
 */
export declare class WoWLanguage extends MainEntity<LanguagesRow> {
    constructor(row: LanguagesRow);
    get ID(): number;
    get Name(): LanguageName;
    readonly Spells: LanguageSpells;
    readonly Abilities: LanguageAbilities;
    readonly Skills: LanguageSkills;
    readonly AutoLearn: LanguageAutoLearn;
    readonly Words: LanguageWords;
}
export declare class LanguageRegistryClass extends RegistryStaticNoClone<WoWLanguage, LanguagesRow, LanguagesQuery> {
    protected Table(): Table<any, LanguagesQuery, LanguagesRow> & {
        add: (id: number) => LanguagesRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: LanguagesRow): WoWLanguage;
    protected FindByID(id: number): LanguagesRow;
    protected EmptyQuery(): LanguagesQuery;
    ID(e: WoWLanguage): number;
    Clear(lang: WoWLanguage, mod: string, id: string): void;
}
export declare const LanguageRegistry: LanguageRegistryClass;
