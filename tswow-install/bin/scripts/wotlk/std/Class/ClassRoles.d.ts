import { player_class_rolesRow } from "../../sql/player_class_roles";
import { BoolCell } from "../Misc/BoolCell";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Class } from "./Class";
export declare class ClassRoles extends MaybeSQLEntity<Class, player_class_rolesRow> {
    protected createSQL(): player_class_rolesRow;
    protected findSQL(): player_class_rolesRow;
    protected isValidSQL(sql: player_class_rolesRow): boolean;
    get Tank(): BoolCell<Class>;
    get Healer(): BoolCell<Class>;
    get Damage(): BoolCell<Class>;
    protected get Leader(): BoolCell<Class>;
    set(tank: boolean, healer: boolean, damage: boolean): Class;
    clear(): Class;
}
