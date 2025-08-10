import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { item_set_namesRow } from "../../sql/item_set_names";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemSetNameRow extends MaybeSQLEntity<ItemTemplate, item_set_namesRow> {
    protected createSQL(): item_set_namesRow;
    protected findSQL(): item_set_namesRow;
    protected isValidSQL(sql: item_set_namesRow): boolean;
    get Name(): import("../Misc/SQLDBCEntity").MaybeSQLCell<ItemTemplate, string, item_set_namesRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ItemTemplate, item_set_namesRow>>;
    get InventoryType(): import("../Misc/SQLDBCEntity").MaybeSQLCell<ItemTemplate, number, item_set_namesRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ItemTemplate, item_set_namesRow>>;
}
export declare class ItemSetName extends SQLLocSystem<ItemTemplate> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
