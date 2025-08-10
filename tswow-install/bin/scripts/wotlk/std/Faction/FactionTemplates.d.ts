import { Cell } from "../../../data/cell/cells/Cell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { FactionTemplateQuery, FactionTemplateRow } from "../../dbc/FactionTemplate";
import { ArrayRefSystemNoCreate } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { Faction } from "./Faction";
export declare enum FactionGroups {
    PLAYERS = 0,
    ALLIANCE = 1,
    HORDE = 2,
    MONSTERS = 3
}
export declare enum FactionFlags {
    ASSIST_PLAYERS = 2048,
    ATTACK_PVP_ACTIVE = 4096,
    HATES_ALL_EXCEPT_FRIENDS = 8192
}
export declare enum FactionTemplateValues {
    NEUTRAL_NON_AGGRESSIVE = 7,
    STORMWIND = 11,
    NEUTRAL_HOSTILE = 21,
    NEUTRAL_PASSIVE = 35,
    IRONFORGE = 57,
    GNOMEREGAN = 64,
    RATCHET = 69,
    UNDERCITY = 71,
    DARNASSUS = 79,
    ORGRIMMAR = 85,
    THUNDER_BLUFF = 105,
    BLOODSAIL_BUCCANEERS = 119,
    BOOTY_BAY = 121,
    DARKSPEAR_TROLLS = 126,
    GADGETZAN = 474,
    CENARION_CIRCLE = 994,
    SILVERMOON = 1604,
    EXODAR = 1639,
    SHATAR = 1741,
    KIRIN_TOR = 2007
}
export declare enum FactionTemplateGroupMask {
    PLAYERS = 1,
    ALLIANCE = 2,
    HORDE = 4,
    MONSTERS = 8
}
export declare class FactionTemplate extends MainEntity<FactionTemplateRow> {
    get ID(): number;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof FactionFlags>;
    get FriendGroup(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof FactionTemplateGroupMask>;
    get EnemyGroup(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof FactionTemplateGroupMask>;
    get FactionGroup(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof FactionTemplateGroupMask>;
    get FriendFactions(): ArrayRefSystemNoCreate<this, FactionTemplate>;
    get EnemyFactions(): ArrayRefSystemNoCreate<this, FactionTemplate>;
}
export declare class FactionTemplateRef<T> extends RefNoCreate<T, FactionTemplate> {
}
export declare class FactionTemplateRegistryClass extends RegistryRowBase<FactionTemplate, FactionTemplateRow, FactionTemplateQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): import("../Refs/Ref").RefNoCreateTT<T, FactionTemplate, typeof FactionTemplateValues>;
    protected Table(): Table<any, FactionTemplateQuery, FactionTemplateRow> & {
        add: (id: number) => FactionTemplateRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: FactionTemplate): void;
    protected FindByID(id: number): FactionTemplateRow;
    ID(e: FactionTemplate): number;
    protected EmptyQuery(): FactionTemplateQuery;
    protected Entity(r: FactionTemplateRow): FactionTemplate;
    create(faction: number): FactionTemplate;
}
export declare const FactionTemplateRegistry: FactionTemplateRegistryClass;
export declare class FactionTemplates extends MultiRowSystem<FactionTemplate, Faction> {
    protected getAllRows(): FactionTemplate[];
    protected isDeleted(value: FactionTemplate): boolean;
    addGet(): FactionTemplate;
    addMod(callback?: (faction: FactionTemplate) => void): Faction;
    addHordeGet(hostileToMonsters?: boolean): FactionTemplate;
    addAllianceGet(hostileToMonsters?: boolean): FactionTemplate;
    addNeutralPassiveGet(): FactionTemplate;
    addNeutralHostileGet(): FactionTemplate;
}
