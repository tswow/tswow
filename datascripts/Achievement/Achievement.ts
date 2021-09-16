import { FunctionalCell } from "wotlkdata/cell/cells/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/dbc/types/Achievement";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { RefBase, RefReadOnly } from "../Refs/Ref";
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

export const Achievements = {
    create : (mod : string, id : string) => {
        return new Achievement(
            DBC.Achievement.add(Ids.Achievement.id(mod,id)))
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

// TODO: can be upgraded when we can clone
export class AchievementRef<T> extends RefBase<T,Achievement> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Achievement): number {
        return v.ID;
    }
    protected resolve(): Achievement {
        return Achievements.load(this.cell.get());
    }
}

export class AchievementRefReadOnly<T> extends RefReadOnly<T,Achievement> {
    getRef(): Achievement {
        return Achievements.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}