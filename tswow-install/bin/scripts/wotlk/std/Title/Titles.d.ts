import { Table } from "../../../data/table/Table";
import { CharTitlesQuery, CharTitlesRow } from "../../dbc/CharTitles";
import { MainEntity } from "../Misc/Entity";
import { GenderedText } from "../Misc/GenderedText";
import { RegistryRowBase } from "../Refs/Registry";
export declare class Title extends MainEntity<CharTitlesRow> {
    get ID(): number;
    get Text(): GenderedText<this>;
}
export declare class TitleRegistryClass extends RegistryRowBase<Title, CharTitlesRow, CharTitlesQuery> {
    protected Table(): Table<any, CharTitlesQuery, CharTitlesRow> & {
        add: (id: number) => CharTitlesRow;
    };
    protected Entity(r: CharTitlesRow): Title;
    protected FindByID(id: number): CharTitlesRow;
    protected EmptyQuery(): CharTitlesQuery;
    create(mod: string, id: string): Title;
    ID(e: Title): number;
}
export declare const TitleRegistry: TitleRegistryClass;
