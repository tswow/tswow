import { Table } from "../../../data/table/Table";
import { SoundAmbienceQuery, SoundAmbienceRow } from "../../dbc/SoundAmbience";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare function pairToRow(id1: number, id2: number): SoundAmbienceRow | SoundAmbienceRow[];
export declare class SoundAmbience extends MainEntity<SoundAmbienceRow> {
    get ID(): number;
    protected freeId(): 0 | 1;
    clear(index: number): this;
    clearAll(): this;
    add(soundId: number): this;
    set(id: number, value: number): this;
    get(id: number): import("./SoundEntry").SoundEntryRef<this>;
    setSimple(id: number, directory: string, files: string[], volume?: number, frequency?: number): this;
    addSimple(id: number, directory: string, files: string[], volume?: number, frequency?: number): this;
    setSimpleLoop(id: number, directory: string, files: string[], volume?: number, frequency?: number): this;
    addSimpleLoop(id: number, directory: string, files: string[], volume?: number, frequency?: number): this;
    get lenght(): number;
}
export declare class SoundAmbienceRegistryClass extends RegistryDynamic<SoundAmbience, SoundAmbienceRow, SoundAmbienceQuery> {
    protected Table(): Table<any, SoundAmbienceQuery, SoundAmbienceRow> & {
        add: (id: number) => SoundAmbienceRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SoundAmbience): void;
    protected Entity(r: SoundAmbienceRow): SoundAmbience;
    protected FindByID(id: number): SoundAmbienceRow;
    protected EmptyQuery(): SoundAmbienceQuery;
    ID(e: SoundAmbience): number;
}
export declare const SoundAmbienceRegistry: SoundAmbienceRegistryClass;
