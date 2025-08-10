import { Table } from "../../../data/table/Table";
import { SpellMissileQuery, SpellMissileRow } from "../../dbc/SpellMissile";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellMissile extends MainEntity<SpellMissileRow> {
    get ID(): number;
    get DefaultPitch(): MinMaxCell<this>;
    get DefaultSpeed(): MinMaxCell<this>;
    get RandomizeFacing(): MinMaxCell<this>;
    get RandomizePitch(): MinMaxCell<this>;
    get RandomizeSpeed(): MinMaxCell<this>;
    get CollisionRadius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Gravity(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxDuration(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings): string;
}
export declare class SpellMissileRegistryClass extends RegistryDynamic<SpellMissile, SpellMissileRow, SpellMissileQuery> {
    protected Table(): Table<any, SpellMissileQuery, SpellMissileRow> & {
        add: (id: number) => SpellMissileRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellMissile): void;
    protected FindByID(id: number): SpellMissileRow;
    protected EmptyQuery(): SpellMissileQuery;
    ID(e: SpellMissile): number;
    protected Entity(r: SpellMissileRow): SpellMissile;
}
export declare const SpellMissileRegistry: SpellMissileRegistryClass;
