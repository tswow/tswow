import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Language } from "wotlkdata/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Achievement } from "./Achievement";

export class AchievementMailSubject extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any> {
        return this.owner.Rewards.row.Subject;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return this.owner.Rewards.localeRow(loc).Subject;
    }
}

export class AchievementMailBody extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any> {
        return this.owner.Rewards.row.Body;
    }
    protected getLoc(loc: Language): Cell<string, any> {
        return this.owner.Rewards.localeRow(loc).Body;
    }
}

export class AchievementRewardMail extends CellSystem<Achievement> {
    get Sender() { return this.ownerWrap(this.owner.Rewards.row.Sender); }
    get Subject() { return new AchievementMailSubject(this.owner) };
    get Body() { return new AchievementMailSubject(this.owner) };
    get MailTemplate() { return this.ownerWrap(this.owner.Rewards.row.MailTemplateID); }
}

export class AchievementRewardTitle extends CellSystem<Achievement> {
    get Horde() { return this.ownerWrap(this.owner.Rewards.row.TitleH); }
    get Alliance() { return this.ownerWrap(this.owner.Rewards.row.TitleA); }

    set(both: number) {
        this.Horde.set(both)
        this.Alliance.set(both)
        return this.owner;
    }
}

export class AchievementReward extends CellSystem<Achievement> {
    get row() { 
        let row = SQL.achievement_reward.find({ID:this.owner.ID});
        if(!row) {
            row = SQL.achievement_reward.add(this.owner.ID)
                .ItemID.set(0)
                .MailTemplateID.set(0)
                .Sender.set(0)
                .Subject.set('')
                .TitleA.set(0)
                .TitleH.set(0)
        }
        return row;
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

    get Description() { return this.ownerWrapLoc(this.owner.row.Reward); }
    get Mail() { return new AchievementRewardMail(this.owner); }
    get Item() { return this.ownerWrap(this.row.ItemID)}
    get Title() { return new AchievementRewardTitle(this.owner); }
}