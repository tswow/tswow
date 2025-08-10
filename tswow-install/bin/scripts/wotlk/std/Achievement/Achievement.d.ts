import { Table } from "../../../data/table/Table";
import { AchievementQuery, AchievementRow } from "../../dbc/Achievement";
import { MainEntityID } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SpellIconCell } from "../Spell/SpellIcon";
import { AchievementCriteria } from "./AchievementCriteria";
import { AchievementReward } from "./AchievementReward";
export declare enum AchievementFaction {
    Horde = 0,
    Alliance = 1,
    Both = -1
}
export declare enum AchievementFlags {
    /** just count statistic (never stop and complete) */
    Statistic = 1,
    /** client side only */
    Hidden = 2,
    /** client does not play achievement earned visual */
    Notoast = 4,
    /** combine criteria from all requirements */
    Cumulative = 8,
    /** show max criteria */
    DisplayHighest = 16,
    /** use non-zero req count */
    CriteriaCount = 32,
    /** show as average value (value / time_in_days) */
    AvgPerDay = 64,
    /** show as progress bar (value / max value) */
    HasProgressBar = 128,
    ServerFirst = 256,
    ServerFirstKill = 512,
    HideNameInTie = 1024,
    /** hide from ui if not completed */
    HiddenTillAwarded = 2048,
    ShowInGuildNews = 4096,
    ShowInGuildHeader = 8192,
    Guild = 16384,
    ShowGuildMembers = 32768,
    ShowCriteriaMembers = 65536,
    AccountBound = 131072,
    /** statistics are hidden from ui if no criteria value exists */
    HideZeroCounter = 524288,
    TrackLocalUntilAwarded = 1048576
}
export declare class Achievement extends MainEntityID<AchievementRow> {
    readonly Criteria: AchievementCriteria;
    constructor(row: AchievementRow);
    get ID(): number;
    get Category(): import("./AchievementCategory").AchievementCategoryRef<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Icon(): SpellIconCell<this>;
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Points(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get UIOrder(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Rewards(): AchievementReward;
    get Faction(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof AchievementFaction>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof AchievementFlags>;
    get InlineScripts(): _hidden.Achievement<this>;
}
export declare class AchievementRegistryClass extends RegistryStaticNoClone<Achievement, AchievementRow, AchievementQuery> {
    protected Table(): Table<any, AchievementQuery, AchievementRow> & {
        add: (id: number) => AchievementRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: AchievementRow): Achievement;
    protected FindByID(id: number): AchievementRow;
    protected EmptyQuery(): AchievementQuery;
    ID(e: Achievement): number;
    Clear(r: Achievement): void;
}
export declare const AchievementRegistry: AchievementRegistryClass;
