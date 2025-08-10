import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { ItemTemplate } from "./ItemTemplate";
export declare class ItemName extends SQLLocSystem<ItemTemplate> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class ItemDescription extends SQLLocSystem<ItemTemplate> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
