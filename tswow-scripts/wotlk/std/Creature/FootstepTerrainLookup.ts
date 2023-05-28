import { Table } from "../../../data/table/Table";
import { FootstepTerrainLookupQuery, FootstepTerrainLookupRow } from "../../dbc/FootstepTerrainLookup";
import { DBC } from "../../DBCFiles";
import { GroundEffectDoodadRegistry } from "../GroundEffect/GroundEffectDoodad";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";
import { TerrainTypeRegistry } from "../TerrainType/TerrainType";

export class FootstepTerrainLookup extends MainEntity<FootstepTerrainLookupRow>
{
    get Doodad() { return GroundEffectDoodadRegistry.ref(this, this.row.CreatureFootstepID); }
    get Terrain() { return TerrainTypeRegistry.ref(this, this.row.TerrainSoundID); }
    get Sound() { return SoundEntryRegistry.ref(this, this.row.SoundID); }
    get SoundSplash() { return SoundEntryRegistry.ref(this, this.row.SoundIDSplash); }
    get ID() { return this.row.ID.get(); }
}

export class FootstepTerrainLookupRegistryClass extends RegistryDynamic
    <FootstepTerrainLookup,FootstepTerrainLookupRow,FootstepTerrainLookupQuery>
{
    protected Table(): Table<any, FootstepTerrainLookupQuery, FootstepTerrainLookupRow> & { add: (id: number) => FootstepTerrainLookupRow; } {
        return DBC.FootstepTerrainLookup
    }
    protected ids(): DynamicIDGenerator {
        return Ids.FootstepTerrainLookup;
    }
    Clear(entity: FootstepTerrainLookup): void { entity
        .Doodad.set(0)
        .Sound.set(0)
        .SoundSplash.set(0)
        .Terrain.set(0)
    }

    protected FindByID(id: number): FootstepTerrainLookupRow {
        return this.Table().query({ID: id})
    }

    ID(e: FootstepTerrainLookup): number {
        return e.ID
    }
    protected EmptyQuery(): FootstepTerrainLookupQuery {
        return {}
    }
    protected Entity(r: FootstepTerrainLookupRow): FootstepTerrainLookup {
        return new FootstepTerrainLookup(r);
    }

}

export const FootstepTerrainLookupRegistry = new FootstepTerrainLookupRegistryClass();