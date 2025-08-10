import { skill_fishing_base_levelRow } from "../../sql/skill_fishing_base_level";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Area } from "./Area";
export declare class AreaFishingSkill extends MaybeSQLEntity<Area, skill_fishing_base_levelRow> {
    protected createSQL(): skill_fishing_base_levelRow;
    protected findSQL(): skill_fishing_base_levelRow;
    protected isValidSQL(sql: skill_fishing_base_levelRow): boolean;
    get Skill(): import("../Misc/SQLDBCEntity").MaybeSQLCell<Area, number, skill_fishing_base_levelRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<Area, skill_fishing_base_levelRow>>;
}
