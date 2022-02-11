import { DBC } from "../../DBCFiles";
import { SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow } from "../../dbc/SoundEntriesAdvanced";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class SoundEntryAdvanced extends MainEntity<SoundEntriesAdvancedRow> {
    get ID() { return this.row.ID.get(); }
    get InnerRadius2D() { return this.wrap(this.row.InnerRadius2D); }
    get TimeA() { return this.wrap(this.row.TimeA); }
    get TimeB() { return this.wrap(this.row.TimeB); }
    get TimeC() { return this.wrap(this.row.TimeC); }
    get TimeD() { return this.wrap(this.row.TimeD); }
    get RandomOffsetRange() { return this.wrap(this.row.RandomOffsetRange); }
    get Usage() { return this.wrap(this.row.Usage); }
    get TimeIntervalMin() { return this.wrap(this.row.TimeintervalMin); }
    get TimeIntervalMax() { return this.wrap(this.row.TimeintervalMax); }
    get VolumeSliderCategory() { return this.wrap(this.row.VolumeSliderCategory); }
    get DuckToSFX() { return this.wrap(this.row.DuckToSFX); }
    get DuckToMusic() { return this.wrap(this.row.DuckToMusic); }
    get DuckToAmbience() { return this.wrap(this.row.DuckToAmbience); }
    get InnerRadius() { return this.wrap(this.row.InnerRadiusOfInfluence); }
    get OuterRadius() { return this.wrap(this.row.OuterRadiusOfInfluence); }
    get TimeToDuck() { return this.wrap(this.row.TimeToDuck); }
    get TimeToUnduck() { return this.wrap(this.row.TimeToUnduck); }
    get InsideAngle() { return this.wrap(this.row.InsideAngle); }
    get OutsideAngle() { return this.wrap(this.row.OutsideAngle); }
    get OutsideVolume() { return this.wrap(this.row.OutsideVolume); }
    get OuterRadius2D() { return this.wrap(this.row.OuterRadius2D); }
}

export class SoundEntryAdvancedRegistryClass
    extends RegistryDynamic<
          SoundEntryAdvanced
        , SoundEntriesAdvancedRow
        , SoundEntriesAdvancedQuery
    >
{
    protected Table(): Table<any, SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow> & { add: (id: number) => SoundEntriesAdvancedRow; } {
        return DBC.SoundEntriesAdvanced
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SoundEntriesAdvanced
    }
    Clear(entity: SoundEntryAdvanced): void {
        // TODO: need to specify this
    }
    protected FindByID(id: number): SoundEntriesAdvancedRow {
        return DBC.SoundEntriesAdvanced.findById(id);
    }
    protected EmptyQuery(): SoundEntriesAdvancedQuery {
        return {}
    }
    ID(e: SoundEntryAdvanced): number {
        return e.ID
    }
    protected Entity(r: SoundEntriesAdvancedRow): SoundEntryAdvanced {
        return new SoundEntryAdvanced(r);
    }
}
export const SoundEntryAdvancedRegistry = new SoundEntryAdvancedRegistryClass();