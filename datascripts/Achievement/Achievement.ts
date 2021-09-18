import { FunctionalCell } from "wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/dbc/types/Achievement";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
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
    protected IDs           = Ids.Achievement
    protected Table         = DBC.Achievement
    protected EmptyQuery    = {}
    protected Entity        = (r: AchievementRow)=>new Achievement(r)
    protected FindByID      = (id: number)=>DBC.Achievement.find({ID:id})
    protected ID            = (e: Achievement)=>e.ID;
    protected Clear         = (r: Achievement)=> {
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