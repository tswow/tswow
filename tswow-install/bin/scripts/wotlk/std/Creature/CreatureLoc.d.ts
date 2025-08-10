import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { CreatureTemplate } from "./CreatureTemplate";
export declare class CreatureName<T extends CreatureTemplate> extends SQLLocSystem<T> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class CreatureSubname<T extends CreatureTemplate> extends SQLLocSystem<T> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
