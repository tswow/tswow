import { Table } from "../../../data/table/Table";
import { CameraShakesQuery, CameraShakesRow } from "../../dbc/CameraShakes";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare enum CameraShakeType {
    SINE = 0,
    DECAYED_SINE = 1
}
export declare class CameraShakes extends MainEntity<CameraShakesRow> {
    clear(): this;
    get ShakeType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Direction(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Ampitude(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Frequency(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Duration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Phase(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Coefficient(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ID(): number;
}
export declare class CameraShakeRegistryClass extends RegistryDynamic<CameraShakes, CameraShakesRow, CameraShakesQuery> {
    protected Table(): Table<any, CameraShakesQuery, CameraShakesRow> & {
        add: (id: number) => CameraShakesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: CameraShakes): void;
    protected FindByID(id: number): CameraShakesRow;
    protected EmptyQuery(): CameraShakesQuery;
    ID(e: CameraShakes): number;
    protected Entity(r: CameraShakesRow): CameraShakes;
}
export declare const CameraShakeRegistry: CameraShakeRegistryClass;
