import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { GameObjectTemplate } from "./GameObjectTemplate";
export declare class GameObjectName<T extends GameObjectTemplate> extends SQLLocSystem<T> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
