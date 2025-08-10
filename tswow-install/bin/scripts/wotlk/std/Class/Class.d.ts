import { Edit } from "../../../data/luaxml/TextFile";
import { ChrClassesRow } from "../../dbc/ChrClasses";
import { MainEntityID } from "../Misc/Entity";
import { ClassRaces } from "./ClassRaceData/ClassRaces";
import { ClassRoles } from "./ClassRoles";
import { ClassStartInventory } from "./ClassStartInventory";
import { ClassStats } from "./ClassStats";
import { ClassTalents } from "./ClassTalents";
import { ClassUISettings } from "./ClassUISettings";
export type LevelStats = {
    str: number;
    agi: number;
    sta: number;
    inte: number;
    spi: number;
};
export declare class Class extends MainEntityID<ChrClassesRow> {
    readonly UI: ClassUISettings;
    readonly BaseClass: number;
    constructor(baseClass: number, row: ChrClassesRow, tCoordsCCEdit: Edit, tCoordsWSEdit: Edit, classColorEdit: Edit, sortOrderEdit: Edit, tCoordsEdit: Edit, xmlEdit: Edit, maleDescription: Edit, femaleDescription: Edit, infoRows: Edit[], disabled: Edit);
    get Inventory(): ClassStartInventory;
    get Filename(): string;
    get ID(): number;
    get Mask(): number;
    get Stats(): ClassStats;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CinematicSequence(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RequiredExpansion(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DisplayPower(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PetNameToken(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Races(): ClassRaces;
    get TalentTrees(): ClassTalents;
    get Roles(): ClassRoles;
}
