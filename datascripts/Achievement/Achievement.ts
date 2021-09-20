import { FunctionalCell } from "wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/dbc/types/Achievement";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { iconToPath, pathToIcon } from "../Spell/SpellIcon";
import { AchievementCriteria } from "./AchievementCriteria";
import { AchievementReward } from "./AchievementReward";

export class Achievement extends MainEntity<AchievementRow> {
    readonly Criteria : AchievementCriteria;

    constructor(row: AchievementRow) {
        super(row);
        this.Criteria = new AchievementCriteria(this);
    }

    get ID() { return this.row.ID.get(); }
    get Category() { return this.wrap(this.row.Category); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Icon() {
        return new FunctionalCell<string,this>(
              this
            , ()=>iconToPath(this.row.IconID.get()).get()
            , (value: string)=>this.row.IconID.set(pathToIcon(value).ID.get()))
    }
    get Map() { return this.wrap(this.row.Map); }
    get Points() { return this.wrap(this.row.Points); }
    get Name() { return this.wrapLoc(this.row.Title); }
    get UIOrder() { return this.wrap(this.row.Ui_Order); }
    get Rewards() { return new AchievementReward(this); }
}

export class AchievementRegistryClass extends
    RegistryStatic<Achievement,AchievementRow,AchievementQuery> {
    protected Table(): Table<any, AchievementQuery, AchievementRow> & { add: (id: number) => AchievementRow; } {
        return DBC.Achievement
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Achievement
    }
    protected Clone(mod: string, name: string, r: Achievement, parent: Achievement): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: AchievementRow): Achievement {
        return new Achievement(r);
    }
    protected FindByID(id: number): AchievementRow {
        return DBC.Achievement.find({ID:id});
    }
    protected EmptyQuery(): AchievementQuery {
        return {}
    }
    ID(e: Achievement): number {
        return e.ID;
    }
    Clear(r: Achievement) {
        r.row.Category.set(0)
             .Description.clear()
             .Faction.set(0)
             .Flags.set(0)
             .IconID.set(0)
             .Map.set(0)
             .Minimum_Criteria.set(0)
             .Points.set(0)
             .Previous.set(0)
             .Reward.clear()
             .Shares_Criteria.set(0)
             .Title.clear()
             .Ui_Order.set(0)
    }
}
export const AchievementRegistry = new AchievementRegistryClass()