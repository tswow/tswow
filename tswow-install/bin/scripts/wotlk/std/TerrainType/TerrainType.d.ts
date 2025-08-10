import { Table } from "../../../data/table/Table";
import { TerraintypeQuery, TerraintypeRow } from "../../dbc/Terraintype";
import { TerraintypeSoundsQuery, TerraintypeSoundsRow } from "../../dbc/TerraintypeSounds";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class TerrainTypeSound extends MainEntity<TerraintypeSoundsRow> {
    get ID(): number;
}
export declare class TerrainTypeSoundRegistryClass extends RegistryDynamic<TerrainTypeSound, TerraintypeSoundsRow, TerraintypeSoundsQuery> {
    protected Table(): Table<any, TerraintypeSoundsQuery, TerraintypeSoundsRow> & {
        add: (id: number) => TerraintypeSoundsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: TerrainTypeSound): void;
    protected FindByID(id: number): TerraintypeSoundsRow;
    ID(e: TerrainTypeSound): number;
    protected EmptyQuery(): TerraintypeSoundsQuery;
    protected Entity(r: TerraintypeSoundsRow): TerrainTypeSound;
}
export declare const TerrainTypeSoundRegistry: TerrainTypeSoundRegistryClass;
export declare class TerrainType extends MainEntity<TerraintypeRow> {
    get ID(): number;
    get Description(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get FootstepSprayRun(): import("../Spell/SpellVisualEffect").SpellVisualEffectRef<this>;
    get FootstepSprayWalk(): import("../Spell/SpellVisualEffect").SpellVisualEffectRef<this>;
    get Sound(): import("../Refs/Ref").RefDynamic<this, TerrainTypeSound>;
}
export declare class TerrainTypeRegistryClass extends RegistryDynamic<TerrainType, TerraintypeRow, TerraintypeQuery> {
    protected Table(): Table<any, TerraintypeQuery, TerraintypeRow> & {
        add: (id: number) => TerraintypeRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: TerrainType): void;
    protected FindByID(id: number): TerraintypeRow;
    ID(e: TerrainType): number;
    protected EmptyQuery(): TerraintypeQuery;
    protected Entity(r: TerraintypeRow): TerrainType;
}
export declare const TerrainTypeRegistry: TerrainTypeRegistryClass;
