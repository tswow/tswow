import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { gameobject_template_addonRow } from "../../sql/gameobject_template_addon";
import { MinMaxCell } from "../Misc/LimitCells";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { GameObjectFlags } from "./GameObjectFlags";
import { GameObjectTemplate } from "./GameObjectTemplate";
export declare class ArtKits<T extends GameObjectTemplate> extends CellSystem<GameObjectTemplateAddon<T>> {
    add(id: number): GameObjectTemplateAddon<T>;
    protected cell(index: number): Cell<number, T>;
    get(index: number): number;
    set(index: number, id: number): T;
    forEach(callback: (id: number, index: number) => void): T;
    get length(): number;
}
export declare class GameObjectTemplateAddon<T extends GameObjectTemplate> extends MaybeSQLEntity<T, gameobject_template_addonRow> {
    static owner<T extends GameObjectTemplate>(addon: GameObjectTemplateAddon<T>): T;
    static wrapSQL<O extends GameObjectTemplate, T extends CPrim>(addon: GameObjectTemplateAddon<O>, defValue: T, safe: (sql: gameobject_template_addonRow) => Cell<T, any>): import("../Misc/SQLDBCEntity").MaybeSQLCell<O, T, gameobject_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<O, gameobject_template_addonRow>>;
    protected createSQL(): gameobject_template_addonRow;
    protected findSQL(): gameobject_template_addonRow;
    protected isValidSQL(sql: gameobject_template_addonRow): boolean;
    get ArtKits(): ArtKits<T>;
    get Faction(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, gameobject_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, gameobject_template_addonRow>>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<T, typeof GameObjectFlags>;
    get Gold(): MinMaxCell<T>;
}
