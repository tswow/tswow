import { sort } from "wotlkdata";
import { makeEnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/wotlkdata/dbc/types/Achievement";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { getInlineID } from "../InlineScript/InlineScript";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SpellIconCell } from "../Spell/SpellIcon";
import { AchievementCategoryRegistry } from "./AchievementCategory";
import { AchievementCriteria } from "./AchievementCriteria";
import { AchievementReward } from "./AchievementReward";

export enum AchievementFaction {
    Horde    = 0,
    Alliance = 1,
    Both     = -1,
}

export enum AchievementFlags {
    /** just count statistic (never stop and complete) */
    Statistic               = 0x000001,
    /** client side only */
    Hidden                  = 0x000002,
    /** client does not play achievement earned visual */
    Notoast                 = 0x000004,
    /** combine criteria from all requirements */
    Cumulative              = 0x000008,
    /** show max criteria */
    DisplayHighest          = 0x000010,
    /** use non-zero req count */
    CriteriaCount           = 0x000020,
    /** show as average value (value / time_in_days) */
    AvgPerDay               = 0x000040,
    /** show as progress bar (value / max value) */
    HasProgressBar          = 0x000080,
    ServerFirst             = 0x000100,
    ServerFirstKill         = 0x000200,
    HideNameInTie           = 0x000400,
    /** hide from ui if not completed */
    HiddenTillAwarded       = 0x000800,
    ShowInGuildNews         = 0x001000,
    ShowInGuildHeader       = 0x002000,
    Guild                   = 0x004000,
    ShowGuildMembers        = 0x008000,
    ShowCriteriaMembers     = 0x010000,
    AccountBound            = 0x020000,
    /** statistics are hidden from ui if no criteria value exists */
    HideZeroCounter         = 0x080000,
    TrackLocalUntilAwarded  = 0x100000,
}

export class Achievement extends MainEntity<AchievementRow> {
    readonly Criteria : AchievementCriteria;

    constructor(row: AchievementRow) {
        super(row);
        this.Criteria = new AchievementCriteria(this);
    }

    get ID() { return this.row.ID.get(); }
    get Category() { return AchievementCategoryRegistry.ref(this,this.row.Category); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Icon() { return new SpellIconCell(this, this.row.IconID); }
    get Map() { return this.wrap(this.row.Map); }
    get Points() { return this.wrap(this.row.Points); }
    get Name() { return this.wrapLoc(this.row.Title); }
    get UIOrder() { return this.wrap(this.row.Ui_Order); }
    get Rewards() { return new AchievementReward(this); }
    get Faction() {
        return makeEnumCell(AchievementFaction,this, this.row.Faction);
    }
    get Flags() {
        return makeMaskCell32(AchievementFlags, this, this.row.Flags);
    }
    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'AchievementID'
        ) as _hidden.Achievements<this>
    }
}

export class AchievementRegistryClass extends
    RegistryStaticNoClone<Achievement,AchievementRow,AchievementQuery> {
    protected Table(): Table<any, AchievementQuery, AchievementRow> & { add: (id: number) => AchievementRow; } {
        return DBC.Achievement
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Achievement
    }
    protected Entity(r: AchievementRow): Achievement {
        return new Achievement(r);
    }
    protected FindByID(id: number): AchievementRow {
        return DBC.Achievement.query({ID:id});
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
             .Faction.set(-1)
             .Flags.set(0)
             .IconID.set(0)
             .Map.set(-1)
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

sort('Achievement',()=>{
    DBC.Achievement.binarySort(0,row=>row.Ui_Order.get());
})