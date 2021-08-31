import { FunctionalCell } from "wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/dbc/types/Achievement";
import { Ids } from "../Misc/Ids";
import { MainEntity } from "../Misc/Entity";
import { iconToPath, pathToIcon } from "../Spell/SpellIcon";
import { AchievementCriteria } from "./AchievementCriteria";

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
}

export const Achievements = {
    create : (mod : string, achievementId : string) => {     
        return new Achievement(
            DBC.Achievement.add(Ids.Achievement.id(mod,achievementId)))
    },

    filter : (query: AchievementQuery) => {
        return DBC.Achievement.filter(query).map(x=>new Achievement(x));
    },

    find: (query: AchievementQuery) => {
        return Achievements.filter(query)[0];
    },
    
    load : (id : number) => {
        return new Achievement(DBC.Achievement.find({ID:id}))
    }
}