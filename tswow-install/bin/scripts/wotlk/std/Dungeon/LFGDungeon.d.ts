import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { LfgDungeonsQuery, LfgDungeonsRow } from "../../dbc/LfgDungeons";
import { lfg_dungeon_templateRow } from "../../sql/lfg_dungeon_template";
import { AccessRequirement } from "../AccessRequirement/AccessRequirement";
import { MainEntity } from "../Misc/Entity";
import { FactionEnum } from "../Misc/FactionEnum";
import { StaticIDGenerator } from "../Misc/Ids";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { RegistryStatic } from "../Refs/Registry";
import { LFGDungeonRewards } from "./LFGDungeonRewards";
import { LFGDungeonEncounters } from "./LFGEncounter";
export declare class LFGPos extends MaybeSQLEntity<LFGDungeon, lfg_dungeon_templateRow> {
    protected createSQL(): lfg_dungeon_templateRow;
    protected findSQL(): lfg_dungeon_templateRow;
    protected isValidSQL(sql: lfg_dungeon_templateRow): boolean;
    get X(): import("../Misc/SQLDBCEntity").MaybeSQLCell<LFGDungeon, number, lfg_dungeon_templateRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<LFGDungeon, lfg_dungeon_templateRow>>;
    get Y(): import("../Misc/SQLDBCEntity").MaybeSQLCell<LFGDungeon, number, lfg_dungeon_templateRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<LFGDungeon, lfg_dungeon_templateRow>>;
    get Z(): import("../Misc/SQLDBCEntity").MaybeSQLCell<LFGDungeon, number, lfg_dungeon_templateRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<LFGDungeon, lfg_dungeon_templateRow>>;
    get O(): import("../Misc/SQLDBCEntity").MaybeSQLCell<LFGDungeon, number, lfg_dungeon_templateRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<LFGDungeon, lfg_dungeon_templateRow>>;
    setSpread(x: number, y: number, z: number, o: number): LFGDungeon;
    set(obj: {
        x: number;
        y: number;
        z: number;
        o: number;
        map?: number;
    }): LFGDungeon;
}
export declare class LFGLevels extends CellSystem<LFGDungeon> {
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, LFGDungeon>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, LFGDungeon>;
    get TargetMin(): import("../../../data/cell/cells/Cell").CellWrapper<number, LFGDungeon>;
    get Target(): import("../../../data/cell/cells/Cell").CellWrapper<number, LFGDungeon>;
    get TargetMax(): import("../../../data/cell/cells/Cell").CellWrapper<number, LFGDungeon>;
    set(min: number, max: number, targetMin: number, target: number, targetMax: number): LFGDungeon;
}
export declare enum LFGFlags {
    IS_DUNGEON = 3,
    IS_HOLIDAY = 12
}
export declare class LFGDungeon extends MainEntity<LfgDungeonsRow> {
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ID(): number;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get Difficulty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof LFGFlags>;
    get Encounters(): LFGDungeonEncounters<this>;
    get Texture(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Type(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpawnPosOverride(): LFGPos;
    get Rewards(): LFGDungeonRewards;
    get Levels(): LFGLevels;
    get Faction(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof FactionEnum>;
    get OrderIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ExpansionLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Group(): import("../Refs/Ref").RefDynamic<this, import("./LFGGroup").LFGDungeonGroup>;
    get Requirements(): AccessRequirement<this>;
}
export declare class LFGDungeons<T> extends MultiRowSystem<LFGDungeon, T> {
    protected readonly mapId: number;
    constructor(owner: T, mapId: number);
    addGet(mod: string, name: string): LFGDungeon;
    addMod(mod: string, name: string, callback: (dungeon: LFGDungeon) => void): T;
    protected getAllRows(): LFGDungeon[];
    protected isDeleted(value: LFGDungeon): boolean;
}
export declare class LFGDungeonRegistryClass extends RegistryStatic<LFGDungeon, LfgDungeonsRow, LfgDungeonsQuery> {
    protected Table(): Table<any, LfgDungeonsQuery, LfgDungeonsRow> & {
        add: (id: number) => LfgDungeonsRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: LFGDungeon): void;
    protected FindByID(id: number): LfgDungeonsRow;
    protected EmptyQuery(): LfgDungeonsQuery;
    ID(e: LFGDungeon): number;
    protected Entity(r: LfgDungeonsRow): LFGDungeon;
}
export declare const LFGDungeonRegistry: LFGDungeonRegistryClass;
