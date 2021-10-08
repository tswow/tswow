import { sort } from "wotlkdata";
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AchievementQuery, AchievementRow } from "wotlkdata/dbc/types/Achievement";
import { Table } from "wotlkdata/table/Table";
import { getInlineID } from "../InlineScript/InlineScript";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SpellIconCell } from "../Spell/SpellIcon";
import { AchievementCategoryRegistry } from "./AchievementCategory";
import { AchievementCriteria } from "./AchievementCriteria";
import { AchievementReward } from "./AchievementReward";

export class AchievementFaction extends EnumCell<Achievement> {
    get Horde() { return this.value(0); }
    get Alliance() { return this.value(1); }
    get Both() { return this.value(-1); }
}

export class AchievementFlags extends MaskCell32<Achievement> {
    /** just count statistic (never stop and complete) */
    Statistic()                { return this.bit(0); }
    /** client side only */
    Hidden()                   { return this.bit(0); }
    /** client does not play achievement earned visual */
    NoToast()                  { return this.bit(0); }
    /** combine criteria from all requirements */
    Cumulative()               { return this.bit(0); }
    /** show max criteria */
    DisplayHighest()           { return this.bit(0); }
    /** use non-zero req count */
    CriteriaCount()            { return this.bit(0); }
    /** show as average value (value / time_in_days) */
    AvgPerDay()                { return this.bit(0); }
    /** show as progress bar (value / max value) */
    HasProgressBar()           { return this.bit(0); }
    ServerFirst()              { return this.bit(0); }
    ServerFirstKill()          { return this.bit(0); }
    HideNameInTie()            { return this.bit(0); }
    /** hide from ui if not completed */
    HiddenTilAwarded()         { return this.bit(0); }
    ShowInGuildNews()          { return this.bit(0); }
    ShowInGuildHeader()        { return this.bit(0); }
    Guild()                    { return this.bit(0); }
    ShowGuildMembers()         { return this.bit(0); }
    ShowCriteriaMembers()      { return this.bit(0); }
    AccountBound()             { return this.bit(0); }
    /** statistics are hidden from ui if no criteria value exists */
    HideZeroCounter()          { return this.bit(0); }
    TrackLocalUntilAwarded()   { return this.bit(0); }
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
    get Faction() { return new AchievementFaction(this, this.row.Faction); }
    get Flags() { return new AchievementFlags(this, this.row.Flags); }
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