import { SQL } from "../../SQLFiles";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { access_requirementQuery, access_requirementRow } from "../../sql/access_requirement";
import { AchievementRegistry } from "../Achievement/Achievement";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MapRegistry } from "../Map/Maps";
import { MinMaxCell } from "../Misc/LimitCells";
import { QuestRegistry } from "../Quest/Quests";

export class AccessRequirement<T> extends CellSystem<T> {
    readonly row: access_requirementRow;

    constructor(owner: T, row: access_requirementRow) {
        super(owner);
        this.row = row;
    }

    get Map() { return MapRegistry.readOnlyRef(this.owner, this.row.mapId); }
    get Difficulty() { return this.row.difficulty.get(); }
    get Level() {
        return new MinMaxCell(
              this.owner
            , this.row.level_min
            , this.row.level_max
        )
    }
    get ItemLevel() { return this.ownerWrap(this.row.item_level); }
    get Achievement() {
        return AchievementRegistry.ref(this.owner, this.row.completed_achievement)
    }
    get Text() { return this.ownerWrap(this.row.quest_failed_text); }
    get HordeQuest() { return QuestRegistry.ref(this.owner, this.row.quest_done_H); }
    get AllianceQuest() { return QuestRegistry.ref(this.owner, this.row.quest_done_A); }
    get HordeItem() { return ItemTemplateRegistry.ref(this.owner, this.row.item); }
    get AllianceItem() {
        return ItemTemplateRegistry.ref(this.owner, this.row.item2);
    }
}

export class AccessRequirementStandalone extends AccessRequirement<AccessRequirementStandalone> {
    constructor(row: access_requirementRow) {
        super(undefined as any, row);
        this.owner = this;
    }
}

export const AccessRequirementRegistry = {
    get(map: number, difficulty: number) {
        return new AccessRequirementStandalone(
            (SQL.access_requirement
                .query({mapId:map,difficulty:difficulty}))
            ||
            SQL.access_requirement
                .add(map,difficulty)
                .completed_achievement.set(0)
                .item.set(0)
                .item2.set(0)
                .item_level.set(0)
                .level_max.set(0)
                .level_min.set(0)
                .quest_done_A.set(0)
                .quest_done_H.set(0)
                .quest_failed_text.set('')
                .comment.set('tswow')
        )
    },

    filter(query: access_requirementQuery) {
        return SQL.access_requirement
            .queryAll(query)
            .map(x=>new AccessRequirementStandalone(x))
    },

    find(query: access_requirementQuery) {
        let res = SQL.access_requirement.query(query);
        return (res ? new AccessRequirementStandalone(res) : undefined) as AccessRequirementStandalone
    }
}