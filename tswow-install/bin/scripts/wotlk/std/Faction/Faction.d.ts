import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { FactionQuery, FactionRow } from "../../dbc/Faction";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { PercentCell } from "../Misc/PercentCell";
import { ReputationRank } from "../Misc/ReputationRank";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { FactionReputations } from "./FactionReputation";
import { FactionReputationIndex } from "./FactionReputationIndex";
import { FactionTemplates } from "./FactionTemplates";
export declare class FactionRepGain extends CellSystem<Faction> {
    protected index: number;
    constructor(owner: Faction, index: number);
    get Rate(): PercentCell<Faction>;
    /**
     * The maximum rank at which spillover can occur
     */
    get Cap(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<Faction, typeof ReputationRank>;
    set(rate: number, cap: number): Faction;
}
export declare class Faction extends MainEntity<FactionRow> {
    get Parent(): RefNoCreate<this, Faction>;
    /**
     * How much of this factions reputation spills over to its children
     */
    get RepSpilloverDown(): FactionRepGain;
    /**
     * How much of this factions reputation spills over to its parent
     * @note The "Cap" here is not used by TrinityCore
     */
    get RepSpilloverUp(): FactionRepGain;
    constructor(row: FactionRow);
    get ID(): number;
    get Templates(): FactionTemplates;
    /**
     * The bit index used to track reputation for this faction
     */
    get ReputationIndex(): FactionReputationIndex;
    /**
     * Up to 4 different reputation settings for
     * different race/classmasks
     */
    get Reputation(): FactionReputations;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
}
export declare class FactionRegistryClass extends RegistryRowBase<Faction, FactionRow, FactionQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, Faction>;
    protected Table(): Table<any, FactionQuery, FactionRow> & {
        add: (id: number) => FactionRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(r: FactionRow): Faction;
    protected FindByID(id: number): FactionRow;
    protected EmptyQuery(): FactionQuery;
    create(mod: string, id: string, hasReputation: boolean): Faction;
    ID(e: Faction): number;
}
export declare const FactionRegistry: FactionRegistryClass;
