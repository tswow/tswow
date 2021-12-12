import { DBC } from "wotlkdata";
import { SoundAmbienceQuery, SoundAmbienceRow } from "wotlkdata/wotlkdata/dbc/types/SoundAmbience";
import { all } from "wotlkdata/wotlkdata/query/Relations";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "./SoundEntry";

export function pairToRow(id1: number, id2: number) {
    let old = DBC.SoundAmbience.queryAll({AmbienceID:all(id1,id2)})
    return old || DBC.SoundAmbience.add(Ids.SoundAmbience.id())
        .AmbienceID.setIndex(0,id1)
        .AmbienceID.setIndex(1,id2);
}

export class SoundAmbience extends MainEntity<SoundAmbienceRow> {
    get ID() { return this.row.ID.get(); }

    protected freeId() {
        if(this.row.AmbienceID.getIndex(0) == 0) {
            return 0;
        }

        if(this.row.AmbienceID.getIndex(1) == 0) {
            return 1;
        }

        throw new Error(`Out of space: SoundAmbience only has room for 2 values`)
    }

    clear(index: number) {
        return this.get(index).set(0)
    }

    clearAll() {
        return this.clear(0).clear(1);
    }

    add(soundId: number) {
        return this.set(this.freeId(), soundId);
    }

    set(id: number, value: number) {
        this.row.AmbienceID.setIndex(id,value);
        return this;
    }

    get(id: number) {
        return SoundEntryRegistry.ref(this, this.wrapIndex(this.row.AmbienceID,id));
    }

    setSimple(id: number, directory: string, files: string[], volume?: number, frequency?: number) {
        return this.get(id).setSimple(directory,files,volume,frequency);
    }

    addSimple(id: number, directory: string, files: string[], volume?: number, frequency?: number) {
        return this.get(id).setSimple(directory,files,volume,frequency);
    }

    setSimpleLoop(id: number, directory: string, files: string[], volume?: number, frequency?: number) {
        return this.get(id).setSimpleLoop(directory,files,volume,frequency);
    }

    addSimpleLoop(id: number, directory: string, files: string[], volume?: number, frequency?: number) {
        return this.get(id).setSimpleLoop(directory,files,volume,frequency);
    }

    get lenght() {
        return 2;
    }
}

export class SoundAmbienceRegistryClass
    extends RegistryDynamic<SoundAmbience,SoundAmbienceRow,SoundAmbienceQuery>
{
    protected Table(): Table<any, SoundAmbienceQuery, SoundAmbienceRow> & { add: (id: number) => SoundAmbienceRow; } {
        return DBC.SoundAmbience
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SoundAmbience
    }
    Clear(entity: SoundAmbience): void {
        entity.clearAll();
    }

    protected Entity(r: SoundAmbienceRow): SoundAmbience {
        return new SoundAmbience(r);
    }
    protected FindByID(id: number): SoundAmbienceRow {
        return DBC.SoundAmbience.findById(id);
    }
    protected EmptyQuery(): SoundAmbienceQuery {
        return {}
    }
    ID(e: SoundAmbience): number {
        return e.ID
    }
}

export const SoundAmbienceRegistry = new SoundAmbienceRegistryClass();