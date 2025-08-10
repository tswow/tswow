import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { creature_textRow } from "../../sql/creature_text";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { MainEntity } from "../Misc/Entity";
import { PercentCell } from "../Misc/PercentCell";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
export declare class CreatureTextLoc extends SQLLocSystem<CreatureText> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare enum CreatureTextType {
    SAY = 12,
    YELL = 14,
    EMOTE = 16,
    BOSS_EMOTE = 41,
    WHISPER = 15,
    BOSS_WHISPER = 42
}
export declare class CreatureText extends MainEntity<creature_textRow> {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, CreatureTemplate>;
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureTextType>;
    get Group(): number;
    get Index(): number;
    get Probability(): PercentCell<this>;
    get Language(): import("../Refs/Ref").RefNoCreate<this, import("../Languages/Languages").WoWLanguage>;
    get BroadcastText(): import("./BroadcastText").BroadcastTextRef<this>;
    get Text(): CreatureTextLoc;
}
export declare class CreatureTextGroup {
    private texts;
    private creature;
    private group;
    constructor(template: number, group: number, texts: CreatureText[]);
    get Group(): number;
    addGet(): CreatureText;
    add(text: loc_constructor, type: EnumCon<keyof typeof CreatureTextType>, probability?: number, language?: number): this;
    addMod(callback: (text: CreatureText) => void): this;
    objectify(options?: ObjectifyOptions): any[];
}
export declare class CreatureTextsTexts extends CellSystem<CreatureTexts> {
    private groups;
    private creature;
    constructor(owner: CreatureTexts, creature: number, groups: CreatureTextGroup[]);
    get(index: number): CreatureTextGroup;
    get length(): number;
    addGet(): CreatureTextGroup;
    addMod(callback: (group: CreatureTextGroup) => void): this;
    mod(index: number, callback: (group: CreatureTextGroup) => void): this;
}
export declare class CreatureTexts extends CellSystemTop {
    constructor(creature: number, groups: CreatureTextGroup[]);
    readonly Texts: CreatureTextsTexts;
}
export declare class CreatureTextsAttached extends CellSystem<CreatureTemplate> {
    private texts;
    constructor(owner: CreatureTemplate);
    get(index: number): CreatureTextGroup;
    mod(index: number, callback: (group: CreatureTextGroup) => void): CreatureTemplate;
    get length(): number;
    addGet(): CreatureTextGroup;
    addMod(callback: (group: CreatureTextGroup) => void): CreatureTemplate;
    objectify(options?: ObjectifyOptions): any;
}
export declare class CreatureTextRegistryClass {
    load(creature: number): CreatureTexts;
}
export declare const CreatureTextRegistry: CreatureTextRegistryClass;
