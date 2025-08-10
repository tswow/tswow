import { Table } from "../../../data/table/Table";
import { FootstepTerrainLookupQuery, FootstepTerrainLookupRow } from "../../dbc/FootstepTerrainLookup";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class FootstepTerrainLookup extends MainEntity<FootstepTerrainLookupRow> {
    get Doodad(): import("../Refs/Ref").RefStatic<this, import("../GroundEffect/GroundEffectDoodad").GroundEffectDoodad>;
    get Terrain(): import("../Refs/Ref").RefDynamic<this, import("../TerrainType/TerrainType").TerrainType>;
    get Sound(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get SoundSplash(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get ID(): number;
}
export declare class FootstepTerrainLookupRegistryClass extends RegistryDynamic<FootstepTerrainLookup, FootstepTerrainLookupRow, FootstepTerrainLookupQuery> {
    protected Table(): Table<any, FootstepTerrainLookupQuery, FootstepTerrainLookupRow> & {
        add: (id: number) => FootstepTerrainLookupRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: FootstepTerrainLookup): void;
    protected FindByID(id: number): FootstepTerrainLookupRow;
    ID(e: FootstepTerrainLookup): number;
    protected EmptyQuery(): FootstepTerrainLookupQuery;
    protected Entity(r: FootstepTerrainLookupRow): FootstepTerrainLookup;
}
export declare const FootstepTerrainLookupRegistry: FootstepTerrainLookupRegistryClass;
