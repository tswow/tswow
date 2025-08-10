import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow } from "../../dbc/GameObjectDisplayInfo";
import { gameobjectQuery, gameobjectRow } from "../../sql/gameobject";
import { StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
import { GameObjectDisplay } from "./GameObjectDisplay";
import { GameObjectInstance } from "./GameObjectInstance";
export declare class GameObjectInstanceRegistryClass extends RegistryStatic<GameObjectInstance, gameobjectRow, gameobjectQuery> {
    protected Table(): Table<any, gameobjectQuery, gameobjectRow> & {
        add: (id: number) => gameobjectRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: GameObjectInstance): void;
    protected Clone(mod: string, id: string, r: GameObjectInstance, parent: GameObjectInstance): void;
    protected Entity(r: gameobjectRow): GameObjectInstance;
    protected FindByID(id: number): gameobjectRow;
    protected EmptyQuery(): gameobjectQuery;
    ID(e: GameObjectInstance): number;
}
export declare const GameObjectInstances: GameObjectInstanceRegistryClass;
export declare class GameObjectDisplayRef<T> extends RefStatic<T, GameObjectDisplay> {
    setSimple(mod: string, name: string, model: string, geobox: number): T;
}
export declare class GameObejctDisplayRegistryClass extends RegistryStatic<GameObjectDisplay, GameObjectDisplayInfoRow, GameObjectDisplayInfoQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): GameObjectDisplayRef<T>;
    protected Table(): Table<any, GameObjectDisplayInfoQuery, GameObjectDisplayInfoRow> & {
        add: (id: number) => GameObjectDisplayInfoRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: GameObjectDisplay): void;
    protected Entity(r: GameObjectDisplayInfoRow): GameObjectDisplay;
    protected FindByID(id: number): GameObjectDisplayInfoRow;
    protected EmptyQuery(): GameObjectDisplayInfoQuery;
    ID(e: GameObjectDisplay): number;
}
export declare const GameObjectDisplayRegistry: GameObejctDisplayRegistryClass;
