import { Cell } from "../../../data/cell/cells/Cell";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { Table } from "../../../data/table/Table";
import { page_textQuery, page_textRow } from "../../sql/page_text";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { SQLLocSystem } from "../Misc/SQLLocSystem";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
export declare class PageTextContent extends SQLLocSystem<PageText> {
    protected getMain(): Cell<string, any>;
    protected getLoc(loc: Language): Cell<string, any>;
}
export declare class PageText extends MainEntity<page_textRow> {
    get ID(): number;
    get Text(): PageTextContent;
    get NextPage(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clone(mod: string, name: string): PageText;
}
export declare class PageTextRef<T> extends RefStatic<T, PageText> {
    setSimpleLoc(mod: string, name: string, loc: loc_constructor | loc_constructor[], nextPage?: number): T;
    setSimple(mod: string, name: string, lang: Language, text: string | string[], nextPage?: number): T;
}
export declare class PageTextRegistryClass extends RegistryStatic<PageText, page_textRow, page_textQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): PageTextRef<T>;
    protected Table(): Table<any, page_textQuery, page_textRow> & {
        add: (id: number) => page_textRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: PageText): void;
    protected FindByID(id: number): page_textRow;
    protected EmptyQuery(): page_textQuery;
    ID(e: PageText): number;
    protected Entity(r: page_textRow): PageText;
    createSimpleLoc(mod: string, name: string, loc: loc_constructor | loc_constructor[], nextPage?: number): PageText;
    createSimple(mod: string, name: string, lang: Language, texts: string[] | string, nextPage?: number): PageText;
}
export declare const PageTextRegistry: PageTextRegistryClass;
