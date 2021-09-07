import { DBC } from "wotlkdata"
import { all } from "wotlkdata/query/Relations"
import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Ids } from "../Misc/Ids"
import { SoundAmbienceQuery, SoundAmbienceRow } from "wotlkdata/dbc/types/SoundAmbience";
import { MainEntity } from "../Misc/Entity";
import { SoundEntryPointer } from "./SoundEntry";
import { Ref } from "../Refs/Ref";

export function pairToRow(id1: number, id2: number) {
    let old = DBC.SoundAmbience.filter({AmbienceID:all(id1,id2)})
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

    add(soundId: number) {
        return this.set(this.freeId(), soundId);
    }

    set(id: number, value: number) {
        this.row.AmbienceID.setIndex(id,value);
        return this;
    }

    get(id: number) {
        return new SoundEntryPointer(this, this.wrapIndex(this.row.AmbienceID,id));
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

export const SoundAmbienceRegistry = {
    create() {
        return new SoundAmbience(
            DBC.SoundAmbience.add(Ids.SoundAmbience.id())
        )
            .set(0,0)
            .set(1,0)
    },

    load(id: number) {
        return new SoundAmbience(DBC.SoundAmbience.findById(id));
    },

    filter(query: SoundAmbienceQuery) {
        return DBC.SoundAmbience
            .filter(query)
            .map(x=>new SoundAmbience(x))
    },

    find(query: SoundAmbienceQuery) {
        return new SoundAmbience(DBC.SoundAmbience
            .find(query))
    }

}

export class SoundAmbienceRef<T> extends Ref<T,SoundAmbience> {
    protected create(): SoundAmbience {
        return SoundAmbienceRegistry.create();
    }
    protected clone(): SoundAmbience {
        return new SoundAmbience(
            DBC.SoundAmbience
                .findById(this.cell.get()).clone(Ids.SoundAmbience.id())
        )
    }
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: SoundAmbience): number {
        return v.ID;
    }
    protected resolve(): SoundAmbience {
        return SoundAmbienceRegistry.load(this.cell.get())
    }
}