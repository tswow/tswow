import { Table } from "../../../data/table/Table";
import { TerraintypeQuery, TerraintypeRow } from "../../dbc/Terraintype";
import { TerraintypeSoundsQuery, TerraintypeSoundsRow } from "../../dbc/TerraintypeSounds";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { SpellVisualEffectRegistry } from "../Spell/SpellVisualEffect";

export class TerrainTypeSound extends MainEntity<TerraintypeSoundsRow>
{
    get ID() { return this.row.ID.get(); }
}

export class TerrainTypeSoundRegistryClass extends RegistryDynamic<TerrainTypeSound,TerraintypeSoundsRow,TerraintypeSoundsQuery>
{
    protected Table(): Table<any, TerraintypeSoundsQuery, TerraintypeSoundsRow> & { add: (id: number) => TerraintypeSoundsRow; } {
        return DBC.TerraintypeSounds
    }

    protected ids(): DynamicIDGenerator {
        return Ids.TerrainTypeSounds
    }
    Clear(entity: TerrainTypeSound): void {
    }
    protected FindByID(id: number): TerraintypeSoundsRow {
        return this.Table().query({ID:id});
    }
    ID(e: TerrainTypeSound): number {
        return e.ID
    }
    protected EmptyQuery(): TerraintypeSoundsQuery {
        return {}
    }
    protected Entity(r: TerraintypeSoundsRow): TerrainTypeSound {
        return new TerrainTypeSound(r);
    }
}

export const TerrainTypeSoundRegistry = new TerrainTypeSoundRegistryClass();

export class TerrainType extends MainEntity<TerraintypeRow>
{
    get ID() { return this.row.TerrainID.get(); }
    get Description() { return this.wrap(this.row.TerrainDesc); }
    get FootstepSprayRun() { return SpellVisualEffectRegistry.ref(this,this.row.FootstepSprayRun); }
    get FootstepSprayWalk() { return SpellVisualEffectRegistry.ref(this,this.row.FootstepSprayWalk); }
    get Sound() { return TerrainTypeSoundRegistry.ref(this, this.row.SoundID); }
}

export class TerrainTypeRegistryClass extends RegistryDynamic<
    TerrainType,TerraintypeRow,TerraintypeQuery
>{
    protected Table(): Table<any, TerraintypeQuery, TerraintypeRow> & { add: (id: number) => TerraintypeRow; } {
        return DBC.Terraintype
    }
    protected ids(): DynamicIDGenerator {
        return Ids.TerrainType
    }
    Clear(entity: TerrainType): void { entity
        .Description.set('')
        .FootstepSprayRun.set(0)
        .FootstepSprayWalk.set(0)
        .Sound.set(0)
    }
    protected FindByID(id: number): TerraintypeRow {
        return this.Table().query({TerrainID: id});
    }
    ID(e: TerrainType): number {
        return e.ID
    }
    protected EmptyQuery(): TerraintypeQuery {
        return {}
    }
    protected Entity(r: TerraintypeRow): TerrainType {
        return new TerrainType(r);
    }
}

export const TerrainTypeRegistry = new TerrainTypeRegistryClass();