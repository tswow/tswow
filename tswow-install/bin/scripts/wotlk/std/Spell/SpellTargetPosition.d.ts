import { spell_target_positionRow } from "../../sql/spell_target_position";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
export declare class SpellTargetPosition<T> extends MaybeSQLEntity<T, spell_target_positionRow> {
    protected spell: number;
    protected effect: number;
    constructor(owner: T, spell: number, effect: number);
    protected createSQL(): spell_target_positionRow;
    protected findSQL(): spell_target_positionRow;
    protected isValidSQL(sql: spell_target_positionRow): boolean;
    get Map(): import("../Refs/Ref").RefNoCreate<T, import("../Map/Map").Map>;
    get X(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, spell_target_positionRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, spell_target_positionRow>>;
    get Y(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, spell_target_positionRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, spell_target_positionRow>>;
    get Z(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, spell_target_positionRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, spell_target_positionRow>>;
    get O(): import("../Misc/SQLDBCEntity").MaybeSQLCell<T, number, spell_target_positionRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<T, spell_target_positionRow>>;
    setSpread(map: number, x: number, y: number, z: number, o: number): T;
    set(obj: {
        x: number;
        y: number;
        z: number;
        o: number;
        map: number;
    }): T;
}
