import { playercreateinfoRow } from "../../../sql/playercreateinfo";
import { Position } from "../../Misc/Position";
import { MaybeSQLEntity } from "../../Misc/SQLDBCEntity";
import { ClassRacePair } from "./ClassRaces";
export declare class ClassRaceSpawn extends MaybeSQLEntity<ClassRacePair, playercreateinfoRow> {
    protected createSQL(): playercreateinfoRow;
    protected findSQL(): playercreateinfoRow;
    protected isValidSQL(sql: playercreateinfoRow): boolean;
    get Map(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    get X(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    get Y(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    get Z(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    get O(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    get Zone(): import("../../Misc/SQLDBCEntity").MaybeSQLCell<ClassRacePair, number, playercreateinfoRow, import("../../Misc/SQLDBCEntity").MaybeSQLEntityPublic<ClassRacePair, playercreateinfoRow>>;
    set(zone: number, pos: Position): ClassRacePair;
}
