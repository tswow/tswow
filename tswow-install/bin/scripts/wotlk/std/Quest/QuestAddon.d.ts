import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { quest_template_addonRow } from "../../sql/quest_template_addon";
import { ClassMask } from "../Class/ClassRegistry";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Quest } from "./Quest";
import { QuestSpecialFlags } from "./QuestSpecialFlags";
export declare class QuestRequiredReputation extends CellSystem<Quest> {
    private facCell;
    private repCell;
    constructor(owner: Quest, facCell: Cell<number, any>, repCell: Cell<number, any>);
    get Faction(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    get Reputation(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    set(faction: number, reputation: number): Quest;
}
export declare class QuestRequiredSkill extends CellSystem<Quest> {
    private skillCell;
    private pointsCell;
    constructor(owner: Quest, facCell: Cell<number, any>, repCell: Cell<number, any>);
    get Skill(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    get Points(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    set(skill: number, points: number): Quest;
}
export declare class QuestRewardMail extends CellSystem<Quest> {
    private templateCell;
    private delayCell;
    constructor(owner: Quest, templateCell: Cell<number, any>, delayCell: Cell<number, any>);
    get MailTemplate(): import("../Refs/Ref").RefStatic<Quest, import("../Mail/MailTemplate").MailTemplate>;
    get Delay(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    set(skill: number, points: number): Quest;
}
export declare class QuestAddon extends MaybeSQLEntity<Quest, quest_template_addonRow> {
    protected createSQL(): quest_template_addonRow;
    protected findSQL(): quest_template_addonRow;
    protected isValidSQL(sql: quest_template_addonRow): boolean;
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<Quest, typeof ClassMask>;
    get MaxLevel(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, quest_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, quest_template_addonRow>>;
    get SourceSpell(): import("../Refs/Ref").RefStatic<Quest, import("../Spell/Spell").Spell>;
    get PrevQuest(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, quest_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, quest_template_addonRow>>;
    get NextQuest(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, quest_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, quest_template_addonRow>>;
    get ProvidedItemCount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, quest_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, quest_template_addonRow>>;
    get SpecialFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<Quest, typeof QuestSpecialFlags>;
    get BreadcrumbForQuest(): import("../Refs/Ref").RefStatic<Quest, Quest>;
    get ExclusiveGroup(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Quest, number, quest_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Quest, quest_template_addonRow>>;
    get MinReputation(): QuestRequiredReputation;
    get MaxReputation(): QuestRequiredReputation;
    get RequiredSkill(): QuestRequiredSkill;
    get RewardMail(): QuestRewardMail;
}
