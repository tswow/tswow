import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { achievement_rewardRow } from "../../sql/achievement_reward";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { Achievement } from "./Achievement";
export declare class AchievementMailSubject extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class AchievementMailBody extends SQLLocSystem<Achievement> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class AchievementRewardMail extends CellSystem<Achievement> {
    get Sender(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, number, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    get Subject(): AchievementMailSubject;
    get Body(): AchievementMailSubject;
    get MailTemplate(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, number, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    set(sender: number, mailTemplate: number): Achievement;
    set(sender: number, subject: loc_constructor | string, body: loc_constructor | string): Achievement;
}
export declare class AchievementRewardTitle extends CellSystem<Achievement> {
    get Horde(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, number, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    get Alliance(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, number, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    set(both: number): Achievement;
}
export declare class AchievementReward extends MaybeSQLEntity<Achievement, achievement_rewardRow> {
    static wrap<T extends CPrim>(achievement: Achievement, def: T, callback: (row: achievement_rewardRow) => Cell<T, any>): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, T, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    protected createSQL(): achievement_rewardRow;
    protected findSQL(): achievement_rewardRow;
    protected isValidSQL(sql: achievement_rewardRow): boolean;
    localeRow(language: Language): import("../../sql/achievement_reward_locale").achievement_reward_localeRow;
    get Mail(): AchievementRewardMail;
    get Item(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Achievement, number, achievement_rewardRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Achievement, achievement_rewardRow>>;
    get Title(): AchievementRewardTitle;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<Achievement>;
}
