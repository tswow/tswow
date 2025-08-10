import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { TalentTabQuery, TalentTabRow } from "../../dbc/TalentTab";
import { ClassIDs } from "../Class/ClassIDs";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { TalentTree } from "./TalentTree";
export declare class TalentTreeRegistryClass extends RegistryStatic<TalentTree, TalentTabRow, TalentTabQuery> {
    protected Table(): Table<any, TalentTabQuery, TalentTabRow> & {
        add: (id: number) => TalentTabRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: TalentTree): void;
    protected Entity(r: TalentTabRow): TalentTree;
    protected FindByID(id: number): TalentTabRow;
    protected EmptyQuery(): TalentTabQuery;
    ID(e: TalentTree): number;
    unlockRaces(): void;
    forClass(cls: EnumCon<keyof typeof ClassIDs>): TalentTree[];
}
export declare const TalentTreeRegistry: TalentTreeRegistryClass;
