import { Cell, CPrim } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { Language } from "wotlkdata/wotlkdata/dbc/Localization";
import { SQL } from "wotlkdata/wotlkdata/sql/SQLFiles";
import { achievement_rewardRow } from "wotlkdata/wotlkdata/sql/types/achievement_reward";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Achievement } from "./Achievement";

export class AchievementMailSubject extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any> {
        return AchievementReward.wrap(this.owner,'',sql=>sql.Subject)
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return this.owner.Rewards.localeRow(loc).Subject;
    }
}

export class AchievementMailBody extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any> {
        return AchievementReward.wrap(this.owner,'',sql=>sql.Body)
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return this.owner.Rewards.localeRow(loc).Body;
    }
}

export class AchievementRewardMail extends CellSystem<Achievement> {
    get Sender() {
        return AchievementReward.wrap(this.owner,0,sql=>sql.Sender)
    }
    get Subject() {
        return new AchievementMailSubject(this.owner)
    };
    get Body() {
        return new AchievementMailSubject(this.owner)
    };
    get MailTemplate() {
        return AchievementReward.wrap(this.owner,0,sql=>sql.MailTemplateID)
    }
}

export class AchievementRewardTitle extends CellSystem<Achievement> {
    get Horde() {
        return AchievementReward.wrap(this.owner,0,sql=>sql.TitleH)
    }
    get Alliance() {
        return AchievementReward.wrap(this.owner,0,sql=>sql.TitleA)
    }

    set(both: number) {
        this.Horde.set(both)
        this.Alliance.set(both)
        return this.owner;
    }
}

export class AchievementReward extends MaybeSQLEntity<Achievement,achievement_rewardRow> {
    static wrap<T extends CPrim>(achievement: Achievement, def: T, callback: (row: achievement_rewardRow)=>Cell<T,any>) {
        return achievement.Rewards.wrapSQL(def,callback);
    }

    protected createSQL(): achievement_rewardRow {
        return SQL.achievement_reward.add(this.owner.ID)
            .ItemID.set(0)
            .MailTemplateID.set(0)
            .Sender.set(0)
            .Subject.set('')
            .TitleA.set(0)
            .TitleH.set(0)
    }
    protected findSQL(): achievement_rewardRow {
        return SQL.achievement_reward.find({ID:this.owner.ID})
    }
    protected isValidSQL(sql: achievement_rewardRow): boolean {
        return sql.ID.get() === this.owner.ID
    }

    localeRow(language: Language) {
        let row = SQL.achievement_reward_locale.find({ID:this.owner.ID});
        if(!row) {
            row = SQL.achievement_reward_locale.add(this.owner.ID,language)
                .Body.set('')
                .Subject.set('')
        }
        return row;
    }

    get Mail() { return new AchievementRewardMail(this.owner); }
    get Item() { return this.wrapSQL(0,sql=>sql.ItemID)}
    get Title() { return new AchievementRewardTitle(this.owner); }
}