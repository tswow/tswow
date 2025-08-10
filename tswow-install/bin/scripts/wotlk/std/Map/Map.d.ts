import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { CellSystem, LocSystem, MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { BattlemasterListRow } from "../../dbc/BattlemasterList";
import { MapRow } from "../../dbc/Map";
import { battleground_templateRow } from "../../sql/battleground_template";
import { instance_addonRow } from "../../sql/instance_addon";
import { instance_templateRow } from "../../sql/instance_template";
import { BattlegroundStatInfoBase } from "../Battleground/BattlegroundStatInfo";
import { BattlegroundBrackets } from "../Battleground/BattlegroundBracket";
import { BattlegroundSafeLoc } from "../Battleground/BattlegroundSafeLocs";
import { BattlegroundDescription } from "../Battleground/BattleroundDescriptions";
import { LFGDungeons } from "../Dungeon/LFGDungeon";
import { LFGDungeonEncounters } from "../Dungeon/LFGEncounter";
import { BoolCell } from "../Misc/BoolCell";
import { TransformedEntityID } from "../Misc/Entity";
import { MinMaxCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { MapADT } from "./MapADT";
import { MapBossBoundaries } from "./MapBossBoundary";
import { MapInstanceScriptCell } from "./MapInstance";
import { MapWorldStateUIs } from "./MapWorldStates";
import { PVEDifficulties } from "./PVEDifficulty";
export declare class Map extends TransformedEntityID<MapRow, MapPlain> {
    protected transformer(): EnumCellTransform<any>;
    protected default(): MapPlain;
    get ID(): number;
    /**
     * @note changing this will automatically update the AreaName
     * of any WorldMapArea connected to this Map via a
     * WorldMapContinent entry.
     */
    get Directory(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Type(): MapInstanceTypee<this>;
    get Name(): LocSystem<this>;
    get HordeDescription(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get AllianceDescription(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get LoadingScreen(): import("./LoadingScreen").LoadingScreenRef<this>;
    get MinimapIconScale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CorpseMap(): import("../Refs/Ref").RefNoCreate<this, Map>;
    get CorpsePos(): PositionXYCell<this>;
    get TimeofDayOverride(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Expansion(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxPlayers(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RaidOffset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AreaTable(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Tiles(): MapADT<this>;
    /**
     * TODO: Unknown flags, all flags on wowdev looks like wod+
     */
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldStateUIs(): MapWorldStateUIs;
    get Encounters(): LFGDungeonEncounters<this>;
    get InlineScripts(): _hidden.Map<this>;
}
export declare class MapPlain extends Map {
}
export declare class BattlegroundMap extends Map {
    protected bg_dbc: BattlemasterListRow;
    protected bg_sql: battleground_templateRow;
    constructor(row: MapRow, bgDbc: BattlemasterListRow, bgSql: battleground_templateRow);
    get Name(): MulticastLocCell<this>;
    get Description(): BattlegroundDescription<this>;
    get BattlegroundID(): number;
    get HolidayWorldstate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Level(): MinMaxCell<this>;
    get PlayersPerTeam(): MinMaxCell<this>;
    get HordeStart(): BattlegroundSafeLoc<this>;
    get AllianceStart(): BattlegroundSafeLoc<this>;
    get StartMaxDist(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Brackets(): BattlegroundBrackets<this>;
    get Stats(): BattlegroundStatInfoBase<this>;
    get InlineScriptsBG(): _hidden.Battleground<this>;
}
export declare class DungeonAddon extends MaybeSQLEntity<DungeonMap, instance_addonRow> {
    protected createSQL(): instance_addonRow;
    protected findSQL(): instance_addonRow;
    protected isValidSQL(sql: instance_addonRow): boolean;
    get BossCount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<DungeonMap, number, instance_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<DungeonMap, instance_addonRow>>;
}
export declare class Boundaries<T extends Map> extends CellSystem<T> {
    get(boss: number): MapBossBoundaries;
    mod(boss: number, callback: (boundaries: MapBossBoundaries) => void): T;
}
export declare class DungeonMap extends Map {
    protected sql: instance_templateRow;
    protected addon(): DungeonAddon;
    get BossCount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<DungeonMap, number, instance_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<DungeonMap, instance_addonRow>>;
    get Boundaries(): Boundaries<this>;
    constructor(row: MapRow, sql: instance_templateRow);
    get AllowMount(): BoolCell<this>;
    get Difficulties(): PVEDifficulties;
    get InlineScriptsDungeon(): _hidden.Instance<this>;
    get Script(): MapInstanceScriptCell;
    get LFGDungeons(): LFGDungeons<this>;
}
export declare class MapInstanceTypee<T extends Map> extends EnumCellTransform<T> {
    get PLAIN(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapPlain>;
    get ARENA(): import("../../../data/cell/cells/EnumCell").EnumValueTransformStatic<T, BattlegroundMap>;
    get BATTLEGROUND(): import("../../../data/cell/cells/EnumCell").EnumValueTransformStatic<T, BattlegroundMap>;
    private instance;
    get DUNGEON(): import("../../../data/cell/cells/EnumCell").EnumValueTransformStatic<T, DungeonMap>;
    get RAID(): import("../../../data/cell/cells/EnumCell").EnumValueTransformStatic<T, DungeonMap>;
}
