import { Table } from "../../../data/table/Table";
import { NPCSoundsQuery, NPCSoundsRow } from "../../dbc/NPCSounds";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class NPCSounds extends MainEntity<NPCSoundsRow> {
    get ID(): number;
    get Hello(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Goodbye(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Pissed(): import("../Sound/SoundEntry").SoundEntryRef<this>;
    get Ack(): import("../Sound/SoundEntry").SoundEntryRef<this>;
}
export declare class NPCSoundsRegistryClass extends RegistryDynamic<NPCSounds, NPCSoundsRow, NPCSoundsQuery> {
    protected Table(): Table<any, NPCSoundsQuery, NPCSoundsRow> & {
        add: (id: number) => NPCSoundsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: NPCSounds): void;
    protected FindByID(id: number): NPCSoundsRow;
    ID(e: NPCSounds): number;
    protected EmptyQuery(): {};
    protected Entity(r: NPCSoundsRow): NPCSounds;
}
export declare const NPCSoundsRegistry: NPCSoundsRegistryClass;
